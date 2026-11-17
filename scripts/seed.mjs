// Database Seed Script for Super Sky Fiber Net (SSFN)
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const ssfnInitialPlans = [
  {
    slug: "ssfn-starter-50",
    name: "SSFN Starter",
    speedMbps: 50,
    speedDisplay: "50 Mbps",
    monthlyPrice: 399,
    effectivePrice: 399,
    discountPercent: 0,
    dataAllowance: "Unlimited (3,300 GB)",
    fupSpeed: "4 Mbps unlimited post-FUP",
    validity: "30 Days",
    installationCharges: 500,
    routerIncluded: true,
    recommended: false,
    category: "HOME",
    displayOrder: 1,
    benefits: JSON.stringify([
      "50 Mbps Symmetric Speed (Upload & Download)",
      "3,300 GB High-Speed Monthly Data",
      "Free Installation on Quarterly & Annual Subscriptions",
      "Standard Dual-Antenna Wi-Fi Router Included",
      "Local Jamshedpur Technical Assistance",
    ]),
  },
  {
    slug: "ssfn-turbo-100",
    name: "SSFN Turbo Home",
    speedMbps: 100,
    speedDisplay: "100 Mbps",
    monthlyPrice: 499,
    effectivePrice: 449,
    discountPercent: 10,
    dataAllowance: "Unlimited (3,300 GB)",
    fupSpeed: "10 Mbps unlimited post-FUP",
    validity: "30 Days",
    installationCharges: 0,
    routerIncluded: true,
    recommended: true,
    category: "HOME",
    displayOrder: 2,
    benefits: JSON.stringify([
      "100 Mbps Equal Download & Upload Speed",
      "3,300 GB Truly High-Speed Data Allowance",
      "FREE Installation & Fiber Line Provisioning",
      "Dual-Band 5 GHz Gigabit Wi-Fi Router",
      "Ultra-Low Latency for Online Gaming & Zoom",
      "Priority Local Engineering Field Support",
    ]),
  },
  {
    slug: "ssfn-ultra-200",
    name: "SSFN Ultra Stream",
    speedMbps: 200,
    speedDisplay: "200 Mbps",
    monthlyPrice: 699,
    effectivePrice: 649,
    discountPercent: 7,
    dataAllowance: "Unlimited (3,300 GB)",
    fupSpeed: "15 Mbps unlimited post-FUP",
    validity: "30 Days",
    installationCharges: 0,
    routerIncluded: true,
    recommended: false,
    category: "STREAMING",
    displayOrder: 3,
    benefits: JSON.stringify([
      "200 Mbps High-Throughput Optical Speed",
      "3,300 GB Generous Monthly Data Cap",
      "FREE Zero-Cost Installation & Fiber Optical Drop",
      "Dual-Band 1200+ Mbps Gigabit Router",
      "Multi-Device Simultaneous Streaming without buffer",
      "Quick On-Site Support Guarantee in Jamshedpur",
    ]),
  },
  {
    slug: "ssfn-pro-300",
    name: "SSFN Pro Creator",
    speedMbps: 300,
    speedDisplay: "300 Mbps",
    monthlyPrice: 899,
    effectivePrice: 899,
    discountPercent: 0,
    dataAllowance: "Unlimited (4,000 GB)",
    fupSpeed: "20 Mbps unlimited post-FUP",
    validity: "30 Days",
    installationCharges: 0,
    routerIncluded: true,
    recommended: false,
    category: "STREAMING",
    displayOrder: 4,
    benefits: JSON.stringify([
      "300 Mbps Blazing Fast Upload & Download",
      "4,000 GB Massive High-Speed Quota",
      "FREE Installation & Premium Fiber Patch",
      "Wi-Fi 6 Capable High-Performance Gigabit ONT",
      "Dedicated Relationship Manager for Local Support",
    ]),
  },
  {
    slug: "ssfn-giga-500",
    name: "SSFN Giga Business",
    speedMbps: 500,
    speedDisplay: "500 Mbps",
    monthlyPrice: 1299,
    effectivePrice: 1299,
    discountPercent: 0,
    dataAllowance: "Unlimited (5,000 GB)",
    fupSpeed: "25 Mbps unlimited post-FUP",
    validity: "30 Days",
    installationCharges: 0,
    routerIncluded: true,
    recommended: false,
    category: "BUSINESS",
    displayOrder: 5,
    benefits: JSON.stringify([
      "500 Mbps Enterprise-Grade Fiber Connectivity",
      "5,000 GB Ultra-High Data Allowance",
      "Static IP Feasibility (Optional Add-on)",
      "99.9% Uptime Commitment with SLA",
      "Dedicated 2-Hour Response Time in Jamshedpur",
      "Custom GST Invoicing for Business Tax Credits",
    ]),
  },
];

const coverageAreas = [
  { localityName: "Sakchi", pinCode: "831001", city: "Jamshedpur", status: "AVAILABLE", landmark: "Near Sakchi Market & Kalimati Road", displayOrder: 1 },
  { localityName: "Bistupur", pinCode: "831001", city: "Jamshedpur", status: "AVAILABLE", landmark: "Main Road & Gopal Maidan", displayOrder: 2 },
  { localityName: "Kadma", pinCode: "831005", city: "Jamshedpur", status: "AVAILABLE", landmark: "Farm Area & Rankini Mandir Road", displayOrder: 3 },
  { localityName: "Sonari", pinCode: "831011", city: "Jamshedpur", status: "AVAILABLE", landmark: "Near Aerodrome & Kagalnagar", displayOrder: 4 },
  { localityName: "Telco Colony", pinCode: "831004", city: "Jamshedpur", status: "AVAILABLE", landmark: "Telco Town & Plaza Area", displayOrder: 5 },
  { localityName: "Mango", pinCode: "831012", city: "Jamshedpur", status: "LIMITED", landmark: "Dimna Road & Old Purulia Road", displayOrder: 6 },
  { localityName: "Adityapur", pinCode: "831013", city: "Jamshedpur", status: "LIMITED", landmark: "Housing Colony Phase 1 & 2", displayOrder: 7 },
  { localityName: "Jugsalai", pinCode: "831006", city: "Jamshedpur", status: "LIMITED", landmark: "Station Road & Gwala Patti Area", displayOrder: 8 },
  { localityName: "Golmuri", pinCode: "831003", city: "Jamshedpur", status: "COMING_SOON", landmark: "Near Golmuri Market", displayOrder: 9 },
  { localityName: "Baridih", pinCode: "831017", city: "Jamshedpur", status: "COMING_SOON", landmark: "Birsanagar & Vijaya Gardens vicinity", displayOrder: 10 },
  { localityName: "Sidhgora", pinCode: "831009", city: "Jamshedpur", status: "COMING_SOON", landmark: "Near Town Hall", displayOrder: 11 },
  { localityName: "Burmamines", pinCode: "831007", city: "Jamshedpur", status: "COMING_SOON", landmark: "Near Station approach", displayOrder: 12 },
];

const bsnlBaselinePlans = [
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
    additionalBenefits: JSON.stringify(["Unlimited local and STD calls to any network in India", "Rural / BharatNet pockets only"]),
    circle: "Jharkhand",
    sourceUrl: "https://www.bsnl.co.in/opencms/bsnl/BSNL/services/broadband/bharat_fiber.html",
    sourceLastVerifiedAt: new Date(),
    isActive: true,
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
    additionalBenefits: JSON.stringify(["Unlimited voice calls to any network", "Available in selected rural exchanges"]),
    circle: "Jharkhand",
    sourceUrl: "https://www.bsnl.co.in/opencms/bsnl/BSNL/services/broadband/bharat_fiber.html",
    sourceLastVerifiedAt: new Date(),
    isActive: true,
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
    additionalBenefits: JSON.stringify(["Unlimited local & STD calling via landline instrument", "Standard ONT router charges extra"]),
    circle: "Jharkhand",
    sourceUrl: "https://www.bsnl.co.in/opencms/bsnl/BSNL/services/broadband/bharat_fiber.html",
    sourceLastVerifiedAt: new Date(),
    isActive: true,
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
    additionalBenefits: JSON.stringify(["Unlimited local & STD voice calling", "ONT router security deposit or purchase required"]),
    circle: "Jharkhand",
    sourceUrl: "https://www.bsnl.co.in/opencms/bsnl/BSNL/services/broadband/bharat_fiber.html",
    sourceLastVerifiedAt: new Date(),
    isActive: true,
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
    additionalBenefits: JSON.stringify(["Unlimited voice calls", "Bundled with select OTT apps (Disney+ Hotstar Super)"]),
    circle: "Jharkhand",
    sourceUrl: "https://www.bsnl.co.in/opencms/bsnl/BSNL/services/broadband/bharat_fiber.html",
    sourceLastVerifiedAt: new Date(),
    isActive: true,
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
    additionalBenefits: JSON.stringify(["Unlimited voice calls", "OTT Entertainment Pack (SonyLIV, ZEE5, Hotstar)", "ONT charges apply"]),
    circle: "Jharkhand",
    sourceUrl: "https://www.bsnl.co.in/opencms/bsnl/BSNL/services/broadband/bharat_fiber.html",
    sourceLastVerifiedAt: new Date(),
    isActive: true,
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
    additionalBenefits: JSON.stringify(["Unlimited local & STD calling", "Premium OTT bundle", "Static IP facility on request"]),
    circle: "Jharkhand",
    sourceUrl: "https://www.bsnl.co.in/opencms/bsnl/BSNL/services/broadband/bharat_fiber.html",
    sourceLastVerifiedAt: new Date(),
    isActive: true,
  },
];

async function seed() {
  console.log("🌱 Starting SSFN database seed...");

  // Seed SSFN Plans
  console.log("  -> Seeding SSFN plans...");
  for (const plan of ssfnInitialPlans) {
    await prisma.ssfnPlan.upsert({
      where: { slug: plan.slug },
      update: plan,
      create: plan,
    });
  }

  // Seed Coverage Areas
  console.log("  -> Seeding Jamshedpur coverage areas...");
  for (const area of coverageAreas) {
    const existing = await prisma.coverageArea.findFirst({
      where: { localityName: area.localityName, pinCode: area.pinCode },
    });
    if (!existing) {
      await prisma.coverageArea.create({ data: area });
    } else {
      await prisma.coverageArea.update({
        where: { id: existing.id },
        data: area,
      });
    }
  }

  // Seed BSNL Benchmark Plans
  console.log("  -> Seeding BSNL Jharkhand Circle benchmark tariffs...");
  for (const bsnl of bsnlBaselinePlans) {
    await prisma.bsnlPlan.upsert({
      where: { externalPlanId: bsnl.externalPlanId },
      update: bsnl,
      create: bsnl,
    });
  }

  // Create initial successful sync log
  await prisma.bsnlSyncLog.create({
    data: {
      status: "SUCCESS",
      plansFound: bsnlBaselinePlans.length,
      plansAdded: bsnlBaselinePlans.length,
      plansUpdated: 0,
      plansRemoved: 0,
      completedAt: new Date(),
      metadata: JSON.stringify({ note: "Initial verified Jharkhand Circle benchmark seeded" }),
    },
  });

  console.log("✅ Database successfully seeded with SSFN plans, Jamshedpur coverage localities, and BSNL benchmarks!");
}

seed()
  .catch((e) => {
    console.error("❌ Error seeding database:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
