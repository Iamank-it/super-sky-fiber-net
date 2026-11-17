export type CoverageStatus = "AVAILABLE" | "LIMITED" | "COMING_SOON" | "NOT_SERVICEABLE";

export interface LocalityItem {
  id: string;
  name: string;
  pinCode: string;
  city: string;
  status: CoverageStatus;
  landmark?: string;
  description: string;
  avgInstallHours: string;
}

export const coverageStatusConfig: Record<
  CoverageStatus,
  { label: string; badgeClass: string; description: string; canInstantBook: boolean }
> = {
  AVAILABLE: {
    label: "Service Available",
    badgeClass: "bg-emerald-50 text-emerald-700 border-emerald-200",
    description: "Active high-speed optical fiber backbone available. Same-day installation.",
    canInstantBook: true,
  },
  LIMITED: {
    label: "Limited Availability",
    badgeClass: "bg-amber-50 text-amber-700 border-amber-200",
    description: "Service available in select residential colonies & main roads. Feasibility check required.",
    canInstantBook: true,
  },
  COMING_SOON: {
    label: "Fiber Rollout in Progress",
    badgeClass: "bg-blue-50 text-blue-700 border-blue-200",
    description: "Optical cabling underway. Pre-register for priority installation & launch offers.",
    canInstantBook: false,
  },
  NOT_SERVICEABLE: {
    label: "Not Currently Serviceable",
    badgeClass: "bg-slate-100 text-slate-700 border-slate-200",
    description: "Outside our current fiber distribution reach. Register your interest for future expansions.",
    canInstantBook: false,
  },
};

export const defaultLocalities: LocalityItem[] = [
  {
    id: "sakchi",
    name: "Sakchi",
    pinCode: "831001",
    city: "Jamshedpur",
    status: "AVAILABLE",
    landmark: "Near Sakchi Market & Kalimati Road",
    description: "Full fiber coverage across residential blocks, commercial markets, and apartments.",
    avgInstallHours: "Within 4 to 8 hours",
  },
  {
    id: "bistupur",
    name: "Bistupur",
    pinCode: "831001",
    city: "Jamshedpur",
    status: "AVAILABLE",
    landmark: "Main Road, Gopal Maidan & Diagonal Road",
    description: "Enterprise and residential high-density fiber rings fully operational.",
    avgInstallHours: "Within 4 to 6 hours",
  },
  {
    id: "kadma",
    name: "Kadma",
    pinCode: "831005",
    city: "Jamshedpur",
    status: "AVAILABLE",
    landmark: "Uliyan, Farm Area & Rankini Mandir Road",
    description: "High reliability residential fiber networks with local distribution hubs.",
    avgInstallHours: "Same Day (4 to 8 hours)",
  },
  {
    id: "sonari",
    name: "Sonari",
    pinCode: "831011",
    city: "Jamshedpur",
    status: "AVAILABLE",
    landmark: "Near Aerodrome & Kagalnagar",
    description: "Complete FTTH connectivity for housing societies and individual bungalows.",
    avgInstallHours: "Same Day (4 to 8 hours)",
  },
  {
    id: "telco",
    name: "Telco Colony",
    pinCode: "831004",
    city: "Jamshedpur",
    status: "AVAILABLE",
    landmark: "Telco Town & Plaza Area",
    description: "Dedicated fiber feeder lines serving residential and commercial quarters.",
    avgInstallHours: "Within 6 to 12 hours",
  },
  {
    id: "mango",
    name: "Mango",
    pinCode: "831012",
    city: "Jamshedpur",
    status: "LIMITED",
    landmark: "Dimna Road & Old Purulia Road",
    description: "Active coverage on main thoroughfares; branch feeder expansion underway.",
    avgInstallHours: "24 to 48 hours",
  },
  {
    id: "adityapur",
    name: "Adityapur",
    pinCode: "831013",
    city: "Jamshedpur",
    status: "LIMITED",
    landmark: "Adityapur Industrial Area & Housing Colony Phase 1 & 2",
    description: "High-speed business and residential fiber clusters actively expanding.",
    avgInstallHours: "24 to 48 hours",
  },
  {
    id: "jugsalai",
    name: "Jugsalai",
    pinCode: "831006",
    city: "Jamshedpur",
    status: "LIMITED",
    landmark: "Station Road & Gwala Patti Area",
    description: "Select coverage in commercial corridors; feasibility survey needed for interior lanes.",
    avgInstallHours: "24 to 48 hours",
  },
  {
    id: "golmuri",
    name: "Golmuri",
    pinCode: "831003",
    city: "Jamshedpur",
    status: "COMING_SOON",
    landmark: "Near Golmuri Market & Tinplate Area",
    description: "Optical cabling currently in progress. Pre-bookings open.",
    avgInstallHours: "Expected rollout within 2-3 weeks",
  },
  {
    id: "baridih",
    name: "Baridih",
    pinCode: "831017",
    city: "Jamshedpur",
    status: "COMING_SOON",
    landmark: "Birsanagar & Vijaya Gardens vicinity",
    description: "Fiber backbone route survey completed. Network laying underway.",
    avgInstallHours: "Expected rollout within 3-4 weeks",
  },
  {
    id: "sidhgora",
    name: "Sidhgora",
    pinCode: "831009",
    city: "Jamshedpur",
    status: "COMING_SOON",
    landmark: "Near Town Hall & Cinema Hall",
    description: "Pre-registration available. Priority hook-ups for advance registrants.",
    avgInstallHours: "Expected rollout within 3 weeks",
  },
  {
    id: "burmamines",
    name: "Burmamines",
    pinCode: "831007",
    city: "Jamshedpur",
    status: "COMING_SOON",
    landmark: "Near Station approach & Carrier colony",
    description: "Under fiber feasibility survey. Pre-register your address.",
    avgInstallHours: "Expected rollout within 4 weeks",
  },
];
