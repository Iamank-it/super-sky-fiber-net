// SSFN vs BSNL Tariff Comparator
import { PlanConfig } from "@/config/plans";

export interface PlanComparisonRow {
  ssfnPlan: PlanConfig;
  bsnlBenchmark: {
    externalPlanId: string;
    name: string;
    speedMbps: number;
    monthlyPrice: number;
    dataAllowance: string;
    fupSpeed: string;
    installationCharges: number;
    routerIncluded: boolean;
    sourceLastVerifiedAt: string;
    sourceUrl: string;
  } | null;
  monthlySavings: number;
  annualSavings: number;
  ssfnAdvantages: string[];
}

export class BsnlComparator {
  /**
   * Matches an SSFN plan to the closest equivalent BSNL plan by speed tier
   */
  static matchEquivalentBsnlPlan(
    ssfnPlan: PlanConfig,
    bsnlPlans: Array<{
      externalPlanId: string;
      name: string;
      speedMbps: number;
      monthlyPrice: number;
      dataAllowance: string;
      fupSpeed: string | null;
      installationCharges: number;
      sourceLastVerifiedAt: Date | string;
      sourceUrl: string;
    }>
  ) {
    if (!bsnlPlans.length) return null;

    // Find plan with closest speed
    const sorted = [...bsnlPlans].sort((a, b) => {
      const diffA = Math.abs(a.speedMbps - ssfnPlan.speedMbps);
      const diffB = Math.abs(b.speedMbps - ssfnPlan.speedMbps);
      return diffA - diffB;
    });

    const match = sorted[0];
    if (!match) return null;

    return {
      externalPlanId: match.externalPlanId,
      name: match.name,
      speedMbps: match.speedMbps,
      monthlyPrice: match.monthlyPrice,
      dataAllowance: match.dataAllowance,
      fupSpeed: match.fupSpeed || "4 Mbps",
      installationCharges: match.installationCharges,
      routerIncluded: false, // BSNL typically charges security deposit or device purchase
      sourceLastVerifiedAt:
        typeof match.sourceLastVerifiedAt === "string"
          ? match.sourceLastVerifiedAt
          : match.sourceLastVerifiedAt.toISOString(),
      sourceUrl: match.sourceUrl,
    };
  }

  /**
   * Generates complete comparative breakdown for all SSFN plans
   */
  static generateComparisonMatrix(
    ssfnPlansList: PlanConfig[],
    bsnlPlansList: Array<{
      externalPlanId: string;
      name: string;
      speedMbps: number;
      monthlyPrice: number;
      dataAllowance: string;
      fupSpeed: string | null;
      installationCharges: number;
      sourceLastVerifiedAt: Date | string;
      sourceUrl: string;
    }>
  ): PlanComparisonRow[] {
    return ssfnPlansList.map((ssfn) => {
      const bsnl = this.matchEquivalentBsnlPlan(ssfn, bsnlPlansList);
      const monthlySavings = bsnl ? Math.max(0, bsnl.monthlyPrice - ssfn.effectivePrice) : 0;
      const annualSavings = monthlySavings * 12;

      const advantages: string[] = [
        "Local Jamshedpur Engineering Team with 4-8 hr same-day turnaround",
        ssfn.routerIncluded
          ? "High-Performance Dual-Band Gigabit Router included"
          : "Standard router options available",
        `Save ₹${monthlySavings}/month compared to standard benchmark`,
        "Direct WhatsApp & Telephone Support with zero IVR queues",
      ];

      return {
        ssfnPlan: ssfn,
        bsnlBenchmark: bsnl,
        monthlySavings,
        annualSavings,
        ssfnAdvantages: advantages,
      };
    });
  }
}
