// Dedicated Broadband Plans Page
import { Metadata } from "next";
import { ssfnPlans, longTermDiscounts } from "@/config/plans";
import { db } from "@/lib/db";
import { PlansClientView } from "./PlansClientView";

export const metadata: Metadata = {
  title: "Broadband Plans & Pricing in Jamshedpur | Super Sky Fiber Net",
  description:
    "Explore high-speed optical fiber plans in Jamshedpur starting at ₹399/mo. Symmetric 50 to 500 Mbps speeds, unlimited data, and free dual-band Wi-Fi router options.",
};

export const revalidate = 3600;

export default async function PlansPage() {
  // Query DB plans or fallback
  let activePlans = ssfnPlans;
  let lastSyncDate = "17 Nov 2026";

  try {
    const dbPlans = await db.ssfnPlan.findMany({
      where: { isActive: true },
      orderBy: { displayOrder: "asc" },
    });

    if (dbPlans.length > 0) {
      activePlans = dbPlans.map((p) => {
        let benefits: string[] = [];
        try {
          benefits = JSON.parse(p.benefits);
        } catch {
          benefits = [];
        }
        return {
          slug: p.slug,
          name: p.name,
          tagline: `High-speed ${p.speedMbps} Mbps broadband for Jamshedpur`,
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
          routerType: "Dual-Band Gigabit Wi-Fi Router",
          recommended: p.recommended,
          category: (p.category as "HOME" | "STREAMING" | "BUSINESS") || "HOME",
          popularFor: "Home & Professional Use",
          benefits,
        };
      });
    }

    const latestBsnl = await db.bsnlPlan.findFirst({
      where: { isActive: true },
      orderBy: { sourceLastVerifiedAt: "desc" },
    });
    if (latestBsnl) {
      lastSyncDate = new Date(latestBsnl.sourceLastVerifiedAt).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
      });
    }
  } catch {
    // Graceful fallback
  }

  return (
    <PlansClientView
      plans={activePlans}
      discounts={longTermDiscounts}
      lastSyncDate={lastSyncDate}
    />
  );
}
