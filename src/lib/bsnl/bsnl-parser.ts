// BSNL Plan Parser
import { BsnlRawPlanData } from "./bsnl-source";

export interface ParsedBsnlPlan {
  externalPlanId: string;
  name: string;
  monthlyPrice: number;
  speed: string;
  speedMbps: number;
  dataAllowance: string;
  fupSpeed: string;
  validity: string;
  installationCharges: number;
  additionalBenefits: string[];
  circle: string;
  sourceUrl: string;
  sourceLastVerifiedAt: Date;
}

export class BsnlParser {
  /**
   * Normalizes speed string like "Up to 50 Mbps" or "100Mbps" into clean integer Mbps
   */
  static extractSpeedMbps(speedStr: string): number {
    const match = speedStr.match(/(\d+)\s*(?:mbps|gbps)/i);
    if (!match) return 0;
    const val = parseInt(match[1], 10);
    if (speedStr.toLowerCase().includes("gbps")) {
      return val * 1000;
    }
    return val;
  }

  /**
   * Parses raw plan items into verified and structured model records
   */
  static parsePlanList(items: BsnlRawPlanData[]): ParsedBsnlPlan[] {
    return items.map((item) => {
      const speedMbps = item.speedMbps || this.extractSpeedMbps(item.speed);
      return {
        externalPlanId: item.externalPlanId.trim(),
        name: item.name.trim(),
        monthlyPrice: Math.round(item.monthlyPrice),
        speed: item.speed.trim(),
        speedMbps,
        dataAllowance: item.dataAllowance.trim(),
        fupSpeed: item.fupSpeed?.trim() || "4 Mbps",
        validity: item.validity?.trim() || "1 Month",
        installationCharges: item.installationCharges ?? 500,
        additionalBenefits: item.additionalBenefits ?? [],
        circle: item.circle?.trim() || "Jharkhand",
        sourceUrl: item.sourceUrl,
        sourceLastVerifiedAt: new Date(item.sourceLastVerifiedAt),
      };
    });
  }
}
