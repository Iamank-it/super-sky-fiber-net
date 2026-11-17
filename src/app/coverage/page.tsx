// Dedicated Coverage Areas Page
import { Metadata } from "next";
import { defaultLocalities, CoverageStatus } from "@/config/coverage";
import { db } from "@/lib/db";
import { CoverageClientView } from "./CoverageClientView";

export const metadata: Metadata = {
  title: "Coverage Areas in Jamshedpur | Super Sky Fiber Net (SSFN)",
  description:
    "Check broadband coverage in Jamshedpur: Sakchi, Bistupur, Kadma, Sonari, Telco, Mango, Adityapur, Jugsalai, Golmuri. Verify optical fiber feasibility and request same-day installation.",
};

export const revalidate = 3600;

export default async function CoveragePage() {
  let localities = defaultLocalities;

  try {
    const dbAreas = await db.coverageArea.findMany({
      orderBy: { displayOrder: "asc" },
    });

    if (dbAreas.length > 0) {
      localities = dbAreas.map((area) => ({
        id: area.id,
        name: area.localityName,
        pinCode: area.pinCode,
        city: area.city,
        status: area.status as CoverageStatus,
        landmark: area.landmark || undefined,
        description: `Optical fiber coverage status: ${area.status}. Feasibility check available.`,
        avgInstallHours:
          area.status === "AVAILABLE"
            ? "Within 4 to 8 hours"
            : area.status === "LIMITED"
            ? "24 to 48 hours"
            : "Under network rollout",
      }));
    }
  } catch {
    // Fallback to default
  }

  return <CoverageClientView localities={localities} />;
}
