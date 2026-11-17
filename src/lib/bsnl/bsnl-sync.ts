// BSNL Dynamic Plan Synchronization Engine
import { db } from "@/lib/db";
import { BsnlFetcher } from "./bsnl-fetcher";
import { BsnlParser } from "./bsnl-parser";
import { BsnlValidator } from "./bsnl-validator";
import { VERIFIED_BSNL_JHARKHAND_SNAPSHOT } from "./bsnl-source";

export interface SyncSummary {
  logId: string;
  status: "SUCCESS" | "FAILED" | "PARTIAL";
  plansFound: number;
  plansAdded: number;
  plansUpdated: number;
  plansRemoved: number;
  sourceType: string;
  errorMessage?: string;
  completedAt: Date;
}

export class BsnlSyncEngine {
  /**
   * Executes a full synchronization cycle:
   * 1. Creates a sync log in database
   * 2. Fetches tariff data with fallback
   * 3. Parses data into clean plan items
   * 4. Validates each plan with Zod
   * 5. Saves new/updated plans in BsnlPlan table
   * 6. Records diff in BsnlPlanHistory table
   * 7. Preserves previous data if fetch completely fails
   */
  static async runSync(): Promise<SyncSummary> {
    const startedAt = new Date();

    // 1. Create initial log
    const syncLog = await db.bsnlSyncLog.create({
      data: {
        startedAt,
        status: "PENDING",
      },
    });

    try {
      const fetcher = new BsnlFetcher();
      const fetchResult = await fetcher.fetchTariffData();

      // Fallback data if fetch failed
      const rawData = fetchResult.data.length > 0 ? fetchResult.data : VERIFIED_BSNL_JHARKHAND_SNAPSHOT;

      // 2. Parse plans
      const parsedPlans = BsnlParser.parsePlanList(rawData);

      // 3. Validate batch
      const validation = BsnlValidator.validateBatch(parsedPlans);

      if (validation.validPlans.length === 0) {
        throw new Error(
          `Validation failed for all plans. Details: ${JSON.stringify(validation.invalidPlans.slice(0, 2))}`
        );
      }

      let plansAdded = 0;
      let plansUpdated = 0;

      // 4. Upsert plans into database and record history
      for (const validPlan of validation.validPlans) {
        const existing = await db.bsnlPlan.findUnique({
          where: { externalPlanId: validPlan.externalPlanId },
        });

        const benefitsStr = JSON.stringify(validPlan.additionalBenefits);

        if (!existing) {
          // Add new plan
          const created = await db.bsnlPlan.create({
            data: {
              externalPlanId: validPlan.externalPlanId,
              name: validPlan.name,
              monthlyPrice: validPlan.monthlyPrice,
              speed: validPlan.speed,
              speedMbps: validPlan.speedMbps,
              dataAllowance: validPlan.dataAllowance,
              fupSpeed: validPlan.fupSpeed,
              validity: validPlan.validity,
              installationCharges: validPlan.installationCharges,
              additionalBenefits: benefitsStr,
              circle: validPlan.circle,
              sourceUrl: validPlan.sourceUrl,
              sourceLastVerifiedAt: validPlan.sourceLastVerifiedAt,
              isActive: true,
            },
          });

          await db.bsnlPlanHistory.create({
            data: {
              planId: created.id,
              previousData: "{}",
              updatedData: JSON.stringify(created),
            },
          });

          plansAdded++;
        } else {
          // Check if data changed
          const isPriceChanged = existing.monthlyPrice !== validPlan.monthlyPrice;
          const isSpeedChanged = existing.speedMbps !== validPlan.speedMbps;
          const isAllowanceChanged = existing.dataAllowance !== validPlan.dataAllowance;

          const updated = await db.bsnlPlan.update({
            where: { externalPlanId: validPlan.externalPlanId },
            data: {
              name: validPlan.name,
              monthlyPrice: validPlan.monthlyPrice,
              speed: validPlan.speed,
              speedMbps: validPlan.speedMbps,
              dataAllowance: validPlan.dataAllowance,
              fupSpeed: validPlan.fupSpeed,
              validity: validPlan.validity,
              installationCharges: validPlan.installationCharges,
              additionalBenefits: benefitsStr,
              sourceLastVerifiedAt: validPlan.sourceLastVerifiedAt,
              isActive: true,
            },
          });

          if (isPriceChanged || isSpeedChanged || isAllowanceChanged) {
            await db.bsnlPlanHistory.create({
              data: {
                planId: existing.id,
                previousData: JSON.stringify(existing),
                updatedData: JSON.stringify(updated),
              },
            });
            plansUpdated++;
          }
        }
      }

      const completedAt = new Date();
      const status = validation.invalidPlans.length > 0 ? "PARTIAL" : "SUCCESS";

      await db.bsnlSyncLog.update({
        where: { id: syncLog.id },
        data: {
          completedAt,
          status,
          plansFound: validation.validPlans.length,
          plansAdded,
          plansUpdated,
          plansRemoved: 0,
          metadata: JSON.stringify({
            sourceType: fetchResult.source,
            durationMs: fetchResult.durationMs,
            invalidCount: validation.invalidPlans.length,
          }),
        },
      });

      return {
        logId: syncLog.id,
        status,
        plansFound: validation.validPlans.length,
        plansAdded,
        plansUpdated,
        plansRemoved: 0,
        sourceType: fetchResult.source,
        errorMessage: fetchResult.error,
        completedAt,
      };
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : "BSNL Sync failed unexpectedly";
      const completedAt = new Date();

      await db.bsnlSyncLog.update({
        where: { id: syncLog.id },
        data: {
          completedAt,
          status: "FAILED",
          errorMessage,
        },
      });

      return {
        logId: syncLog.id,
        status: "FAILED",
        plansFound: 0,
        plansAdded: 0,
        plansUpdated: 0,
        plansRemoved: 0,
        sourceType: "ERROR",
        errorMessage,
        completedAt,
      };
    }
  }

  /**
   * Retrieves the latest active BSNL plans from the database, or initializes baseline if empty.
   */
  static async getActivePlans() {
    let plans = await db.bsnlPlan.findMany({
      where: { isActive: true },
      orderBy: { speedMbps: "asc" },
    });

    if (plans.length === 0) {
      // Auto seed if empty
      await this.runSync();
      plans = await db.bsnlPlan.findMany({
        where: { isActive: true },
        orderBy: { speedMbps: "asc" },
      });
    }

    return plans;
  }
}
