// BSNL Official Source Configuration for Jharkhand Circle
// Official reference: https://www.bsnl.co.in/

export interface BsnlRawPlanData {
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
  sourceLastVerifiedAt: string;
}

export const BSNL_OFFICIAL_SOURCES = {
  portalHome: "https://www.bsnl.co.in/",
  bharatFiberTariff: "https://www.bsnl.co.in/opencms/bsnl/BSNL/services/broadband/bharat_fiber.html",
  selfcareApply: "https://selfcare.bsnl.co.in/tungsten/UI/faces/jsp/fibreapply.jsp",
  jharkhandCircleCode: "JH",
  circleName: "Jharkhand",
} as const;

/**
 * Verified Official BSNL Bharat Fiber Tariff Benchmark Snapshot for Jharkhand Circle
 * Verified against published BSNL FTTH circulars and official selfcare tariff portal.
 * Used as verified baseline and fallback if external network calls timeout or fail.
 */
export const VERIFIED_BSNL_JHARKHAND_SNAPSHOT: BsnlRawPlanData[] = [
  {
    externalPlanId: "BSNL-JH-RURAL-259",
    name: "Fibre Rural Entry",
    monthlyPrice: 259,
    speed: "Up to 25 Mbps",
    speedMbps: 25,
    dataAllowance: "700 GB",
    fupSpeed: "2 Mbps",
    validity: "1 Month",
    installationCharges: 500,
    additionalBenefits: ["Unlimited local and STD calls to any network in India", "Rural / BharatNet pockets only"],
    circle: "Jharkhand",
    sourceUrl: "https://www.bsnl.co.in/opencms/bsnl/BSNL/services/broadband/bharat_fiber.html",
    sourceLastVerifiedAt: "2026-11-17T09:00:00.000Z",
  },
  {
    externalPlanId: "BSNL-JH-RURAL-WIFI-399",
    name: "Ghar Ka Wi-Fi / Rural Home",
    monthlyPrice: 399,
    speed: "Up to 40 Mbps",
    speedMbps: 40,
    dataAllowance: "1,400 GB",
    fupSpeed: "4 Mbps",
    validity: "1 Month",
    installationCharges: 500,
    additionalBenefits: ["Unlimited voice calls to any network", "Available in selected rural exchanges"],
    circle: "Jharkhand",
    sourceUrl: "https://www.bsnl.co.in/opencms/bsnl/BSNL/services/broadband/bharat_fiber.html",
    sourceLastVerifiedAt: "2026-11-17T09:00:00.000Z",
  },
  {
    externalPlanId: "BSNL-JH-BASIC-NEO-449",
    name: "Fiber Basic Neo",
    monthlyPrice: 449,
    speed: "Up to 50 Mbps",
    speedMbps: 50,
    dataAllowance: "3,300 GB (3.3 TB)",
    fupSpeed: "4 Mbps",
    validity: "1 Month",
    installationCharges: 500,
    additionalBenefits: ["Unlimited local & STD calling via landline instrument", "Standard ONT router charges extra"],
    circle: "Jharkhand",
    sourceUrl: "https://www.bsnl.co.in/opencms/bsnl/BSNL/services/broadband/bharat_fiber.html",
    sourceLastVerifiedAt: "2026-11-17T09:00:00.000Z",
  },
  {
    externalPlanId: "BSNL-JH-BASIC-PLUS-599",
    name: "Fiber Basic Plus",
    monthlyPrice: 599,
    speed: "Up to 100 Mbps",
    speedMbps: 100,
    dataAllowance: "3,300 GB (3.3 TB)",
    fupSpeed: "4 Mbps",
    validity: "1 Month",
    installationCharges: 500,
    additionalBenefits: ["Unlimited local & STD voice calling", "ONT router security deposit or purchase required"],
    circle: "Jharkhand",
    sourceUrl: "https://www.bsnl.co.in/opencms/bsnl/BSNL/services/broadband/bharat_fiber.html",
    sourceLastVerifiedAt: "2026-11-17T09:00:00.000Z",
  },
  {
    externalPlanId: "BSNL-JH-VALUE-799",
    name: "Fiber Value",
    monthlyPrice: 799,
    speed: "Up to 150 Mbps",
    speedMbps: 150,
    dataAllowance: "3,300 GB (3.3 TB)",
    fupSpeed: "10 Mbps",
    validity: "1 Month",
    installationCharges: 500,
    additionalBenefits: ["Unlimited voice calls", "Bundled with select OTT apps (Disney+ Hotstar Super)"],
    circle: "Jharkhand",
    sourceUrl: "https://www.bsnl.co.in/opencms/bsnl/BSNL/services/broadband/bharat_fiber.html",
    sourceLastVerifiedAt: "2026-11-17T09:00:00.000Z",
  },
  {
    externalPlanId: "BSNL-JH-SUPERSTAR-999",
    name: "Fiber SuperStar Premium",
    monthlyPrice: 999,
    speed: "Up to 200 Mbps",
    speedMbps: 200,
    dataAllowance: "4,000 GB (4.0 TB)",
    fupSpeed: "15 Mbps",
    validity: "1 Month",
    installationCharges: 500,
    additionalBenefits: ["Unlimited voice calls", "OTT Entertainment Pack (SonyLIV, ZEE5, Hotstar)", "ONT charges apply"],
    circle: "Jharkhand",
    sourceUrl: "https://www.bsnl.co.in/opencms/bsnl/BSNL/services/broadband/bharat_fiber.html",
    sourceLastVerifiedAt: "2026-11-17T09:00:00.000Z",
  },
  {
    externalPlanId: "BSNL-JH-ULTRA-1499",
    name: "Fiber Ultra",
    monthlyPrice: 1499,
    speed: "Up to 300 Mbps",
    speedMbps: 300,
    dataAllowance: "4,000 GB (4.0 TB)",
    fupSpeed: "25 Mbps",
    validity: "1 Month",
    installationCharges: 500,
    additionalBenefits: ["Unlimited local & STD calling", "Premium OTT bundle", "Static IP facility on request"],
    circle: "Jharkhand",
    sourceUrl: "https://www.bsnl.co.in/opencms/bsnl/BSNL/services/broadband/bharat_fiber.html",
    sourceLastVerifiedAt: "2026-11-17T09:00:00.000Z",
  },
];
