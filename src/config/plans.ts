export interface PlanBenefit {
  text: string;
  highlight?: boolean;
}

export interface PlanConfig {
  slug: string;
  name: string;
  tagline: string;
  speedMbps: number;
  speedDisplay: string;
  monthlyPrice: number;
  effectivePrice: number; // Discounted or promotional price
  discountPercent: number;
  dataAllowance: string;
  fupSpeed: string;
  validity: string;
  installationCharges: number; // 0 means Free
  routerIncluded: boolean;
  routerType: string;
  recommended: boolean;
  category: "HOME" | "STREAMING" | "BUSINESS";
  popularFor: string;
  benefits: string[];
}

export const ssfnPlans: PlanConfig[] = [
  {
    slug: "ssfn-starter-50",
    name: "SSFN Starter",
    tagline: "Ideal for daily browsing, social media, and online classes",
    speedMbps: 50,
    speedDisplay: "50 Mbps",
    monthlyPrice: 399,
    effectivePrice: 399,
    discountPercent: 0,
    dataAllowance: "Unlimited (3,300 GB)",
    fupSpeed: "4 Mbps unlimited post-FUP",
    validity: "30 Days",
    installationCharges: 500, // Waived on 3+ months advance
    routerIncluded: true,
    routerType: "High-Gain Wi-Fi Router",
    recommended: false,
    category: "HOME",
    popularFor: "1-3 Devices, Students, Work from Home essentials",
    benefits: [
      "50 Mbps Symmetric Speed (Upload & Download)",
      "3,300 GB High-Speed Monthly Data",
      "Free Installation on Quarterly & Annual Subscriptions",
      "Standard Dual-Antenna Wi-Fi Router Included",
      "Local Jamshedpur Technical Assistance",
      "Zero Throttling on Work & Video Apps",
    ],
  },
  {
    slug: "ssfn-turbo-100",
    name: "SSFN Turbo Home",
    tagline: "Our most popular package for HD streaming and multi-device homes",
    speedMbps: 100,
    speedDisplay: "100 Mbps",
    monthlyPrice: 499,
    effectivePrice: 449, // Promotional introductory price
    discountPercent: 10,
    dataAllowance: "Unlimited (3,300 GB)",
    fupSpeed: "10 Mbps unlimited post-FUP",
    validity: "30 Days",
    installationCharges: 0, // Free
    routerIncluded: true,
    routerType: "Dual-Band Gigabit AC/AX Wi-Fi Router",
    recommended: true, // Recommended plan
    category: "HOME",
    popularFor: "Family homes, 4K Smart TVs, Zoom calls, Gaming",
    benefits: [
      "100 Mbps Equal Download & Upload Speed",
      "3,300 GB Truly High-Speed Data Allowance",
      "FREE Installation & Fiber Line Provisioning",
      "Dual-Band 5 GHz Gigabit Wi-Fi Router",
      "Ultra-Low Latency for Online Gaming & Zoom",
      "Priority Local Engineering Field Support",
      "Special Promotional Rate: ₹449/mo on Semi-Annual opt-in",
    ],
  },
  {
    slug: "ssfn-ultra-200",
    name: "SSFN Ultra Stream",
    tagline: "Power plan for 4K binge-watching, content downloads and tech families",
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
    routerType: "Next-Gen Dual-Band Gigabit Optical Router",
    recommended: false,
    category: "STREAMING",
    popularFor: "Multiple 4K Screens, Heavy Gamers, Tech Creators",
    benefits: [
      "200 Mbps High-Throughput Optical Speed",
      "3,300 GB Generous Monthly Data Cap",
      "FREE Zero-Cost Installation & Fiber Optical Drop",
      "Dual-Band 1200+ Mbps Gigabit Router",
      "Multi-Device Simultaneous Streaming without buffer",
      "Priority Network Queue with Ping Optimization",
      "Quick On-Site Support Guarantee in Jamshedpur",
    ],
  },
  {
    slug: "ssfn-pro-300",
    name: "SSFN Pro Creator",
    tagline: "Engineered for creators, developers, streamers, and heavy users",
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
    routerType: "High-Performance Wi-Fi 6 Gigabit ONT",
    recommended: false,
    category: "STREAMING",
    popularFor: "Live Streaming, YouTube Creators, CAD/Cloud Engineers",
    benefits: [
      "300 Mbps Blazing Fast Upload & Download",
      "4,000 GB Massive High-Speed Quota",
      "FREE Installation & Premium Fiber Patch",
      "Wi-Fi 6 Capable High-Performance Gigabit ONT",
      "Unrestricted P2P and Cloud Backup Speeds",
      "Dedicated Relationship Manager for Local Support",
    ],
  },
  {
    slug: "ssfn-giga-500",
    name: "SSFN Giga Business",
    tagline: "Commercial grade connectivity for offices, cafes, clinics & teams",
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
    routerType: "Enterprise Dual-Band Mesh-Ready Optical Gateway",
    recommended: false,
    category: "BUSINESS",
    popularFor: "Offices, Retail, Clinics, Multi-user Workspaces",
    benefits: [
      "500 Mbps Enterprise-Grade Fiber Connectivity",
      "5,000 GB Ultra-High Data Allowance",
      "Static IP Feasibility (Optional Add-on)",
      "99.9% Uptime Commitment with SLA",
      "Zero-Buffer Support for 25+ Active Devices",
      "Dedicated 2-Hour Response Time in Jamshedpur",
      "Custom GST Invoicing for Business Tax Credits",
    ],
  },
];

export const longTermDiscounts = [
  {
    duration: "3 Months (Quarterly)",
    benefit: "100% Free Standard Installation & Fiber Setup",
    discountBadge: "Save ₹500",
  },
  {
    duration: "6 Months (Semi-Annual)",
    benefit: "Free Dual-Band Wi-Fi 6 Ready Router + Free Installation + 5% Bill Rebate",
    discountBadge: "Most Popular Value",
  },
  {
    duration: "12 Months (Annual)",
    benefit: "Pay for 11 Months, Get 12th Month Completely FREE + Complimentary Router",
    discountBadge: "1 Month Free",
  },
];
