// GET /api/plans - Fetch SSFN plans, BSNL benchmarks, and comparison matrix
import { db } from "@/lib/db";
import { ssfnPlans } from "@/config/plans";
import { BsnlComparator } from "@/lib/bsnl/bsnl-comparator";
import { jsonResponse } from "@/lib/constants";

export async function GET() {
  try {
    // 1. Get SSFN plans from database or fallback
    const dbSsfnPlans = await db.ssfnPlan.findMany({
      where: { isActive: true },
      orderBy: { displayOrder: "asc" },
    });

    // Format benefits from JSON
    const formattedSsfnPlans = (dbSsfnPlans.length > 0 ? dbSsfnPlans : ssfnPlans).map((p) => {
      let parsedBenefits: string[] = [];
      if ("benefits" in p && typeof p.benefits === "string") {
        try {
          parsedBenefits = JSON.parse(p.benefits);
        } catch {
          parsedBenefits = [];
        }
      } else if ("benefits" in p && Array.isArray(p.benefits)) {
        parsedBenefits = p.benefits;
      }

      return {
        slug: p.slug,
        name: p.name,
        tagline: "tagline" in p ? (p.tagline as string) : `High-speed ${p.speedMbps} Mbps broadband for Jamshedpur`,
        speedMbps: p.speedMbps,
        speedDisplay: p.speedDisplay,
        monthlyPrice: p.monthlyPrice,
        effectivePrice: p.effectivePrice,
        discountPercent: p.discountPercent,
        dataAllowance: p.dataAllowance,
        fupSpeed: p.fupSpeed || "4 Mbps",
        validity: p.validity,
        installationCharges: p.installationCharges,
        routerIncluded: p.routerIncluded,
        routerType: "routerType" in p ? (p.routerType as string) : "Gigabit Dual-Band Wi-Fi Router",
        recommended: p.recommended,
        category: (p.category as "HOME" | "STREAMING" | "BUSINESS") || "HOME",
        popularFor: "popularFor" in p ? (p.popularFor as string) : "Home & Professional Use",
        benefits: parsedBenefits,
      };
    });

    // 2. Get active BSNL benchmark plans
    const bsnlPlans = await db.bsnlPlan.findMany({
      where: { isActive: true },
      orderBy: { speedMbps: "asc" },
    });

    // 3. Get latest sync log
    const lastSyncLog = await db.bsnlSyncLog.findFirst({
      orderBy: { startedAt: "desc" },
    });

    // 4. Generate comparison matrix
    const comparison = BsnlComparator.generateComparisonMatrix(
      formattedSsfnPlans,
      bsnlPlans.map((b) => ({
        externalPlanId: b.externalPlanId,
        name: b.name,
        speedMbps: b.speedMbps,
        monthlyPrice: b.monthlyPrice,
        dataAllowance: b.dataAllowance,
        fupSpeed: b.fupSpeed,
        installationCharges: b.installationCharges,
        sourceLastVerifiedAt: b.sourceLastVerifiedAt,
        sourceUrl: b.sourceUrl,
      }))
    );

    return jsonResponse({
      success: true,
      plans: formattedSsfnPlans,
      bsnlBenchmarkCount: bsnlPlans.length,
      lastVerifiedAt: bsnlPlans[0]?.sourceLastVerifiedAt || new Date().toISOString(),
      lastSyncStatus: lastSyncLog?.status || "SUCCESS",
      comparisonMatrix: comparison,
      benchmarkDisclaimer:
        "Reference tariffs reflect published BSNL Bharat Fiber Jharkhand Circle schedules. SSFN is an independent broadband provider offering dedicated local field assistance in Jamshedpur.",
    });
  } catch (err: unknown) {
    console.error("GET /api/plans error:", err);
    // Return static configuration on error
    return jsonResponse({
      success: true,
      plans: ssfnPlans,
      bsnlBenchmarkCount: 0,
      lastVerifiedAt: new Date().toISOString(),
      lastSyncStatus: "FALLBACK",
      comparisonMatrix: [],
      benchmarkDisclaimer: "Reference tariffs reflect published BSNL Bharat Fiber Jharkhand Circle schedules.",
    });
  }
}
