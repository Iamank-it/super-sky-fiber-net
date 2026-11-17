// SSFN Broadband Services Showcase Component
import React from "react";
import Link from "next/link";
import {
  Home,
  Building,
  Wifi,
  Video,
  Wrench,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";

const services = [
  {
    icon: Home,
    title: "Home Fiber Broadband",
    tagline: "Designed for families, online students & remote professionals",
    description:
      "Buffer-free 4K video streaming, high-definition Zoom classes, and lag-free gaming. Experience symmetric speeds with zero peak-hour slowdowns.",
    features: [
      "50 Mbps to 300 Mbps speed tiers",
      "Unlimited monthly data (3,300 GB)",
      "Zero buffering on Prime, Netflix & Hotstar",
      "Parental control compatible",
    ],
    ctaText: "Explore Home Plans",
    ctaLink: "/plans",
  },
  {
    icon: Wifi,
    title: "Whole-Home Gigabit Wi-Fi",
    tagline: "Full-coverage wireless with zero dead spots",
    description:
      "Dual-band 2.4 GHz and 5 GHz gigabit Wi-Fi setups engineered to penetrate concrete walls and cover multiple rooms or duplex residences across Jamshedpur.",
    features: [
      "Dual-Band AC/AX Gigabit Routers",
      "Seamless multi-story coverage",
      "Support for 20+ concurrent smart devices",
      "Low packet-loss configuration",
    ],
    ctaText: "Check Router Options",
    ctaLink: "/services",
  },
  {
    icon: Building,
    title: "Commercial & Business Broadband",
    tagline: "Robust connectivity for offices, clinics, retail & co-working",
    description:
      "Keep your business running without connectivity blackouts. High uptime, priority routing, GST invoicing, and rapid on-site technician response.",
    features: [
      "Speeds up to 500 Mbps",
      "Static IP feasibility on request",
      "Dedicated relationship manager",
      "Priority 2-hour response SLA",
    ],
    ctaText: "Inquire for Business",
    ctaLink: "/contact",
  },
  {
    icon: Video,
    title: "CCTV & Smart Surveillance Links",
    tagline: "Continuous live streaming for home & shop security cameras",
    description:
      "High upstream bandwidth ensures your HD/4K IP surveillance cameras upload live footage smoothly to cloud and mobile apps with zero dropouts.",
    features: [
      "High symmetric upload throughput",
      "Static IP support for NVR/DVR access",
      "24/7 continuous optical connection",
      "Local setup assistance",
    ],
    ctaText: "Learn More",
    ctaLink: "/services",
  },
  {
    icon: Wrench,
    title: "Professional Fiber Installation & Splicing",
    tagline: "Same-day deployment by local Jamshedpur field technicians",
    description:
      "Our certified optical cable engineers handle neat cabling, optical fusion splicing, signal dBm testing, and optimal router placement in your premises.",
    features: [
      "4-to-8 hour installation turnaround",
      "Neat indoor fiber routing",
      "Optical signal power calibration",
      "Full Wi-Fi signal testing before sign-off",
    ],
    ctaText: "Check Locality Feasibility",
    ctaLink: "/coverage",
  },
  {
    icon: ShieldCheck,
    title: "Local On-Call Engineering Helpdesk",
    tagline: "Direct contact with real local technicians in Jamshedpur",
    description:
      "No waiting in endless automated phone queues. Speak directly to our local support helpline or reach us immediately on WhatsApp for instant assistance.",
    features: [
      "Direct phone helpline: +91 94711 26747",
      "WhatsApp interactive support desk",
      "Rapid on-site line restoration",
      "Local spare parts and equipment inventory",
    ],
    ctaText: "Contact Support",
    ctaLink: "/contact",
  },
];

export function ServicesSection() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-sky-100 text-[#082B55] text-xs font-bold uppercase tracking-wider">
            Our Offerings
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#082B55] tracking-tight">
            Comprehensive Fiber Broadband Services in Jamshedpur
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            From single-user student connections to high-capacity office networks, Super Sky Fiber
            Net delivers customized connectivity solutions.
          </p>
        </div>

        {/* Services Grid */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((svc, idx) => {
            const Icon = svc.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-3xl p-7 border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-sky-300 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-sky-50 text-[#168BDE] flex items-center justify-center group-hover:bg-[#082B55] group-hover:text-cyan-300 transition-colors shadow-sm">
                    <Icon className="w-6 h-6" />
                  </div>

                  <h3 className="text-xl font-bold text-[#082B55] mt-5 tracking-tight">
                    {svc.title}
                  </h3>
                  <div className="text-xs font-semibold text-[#168BDE] mt-1">
                    {svc.tagline}
                  </div>

                  <p className="text-sm text-slate-600 mt-3 leading-relaxed">
                    {svc.description}
                  </p>

                  <ul className="mt-5 space-y-2 text-xs text-slate-700">
                    {svc.features.map((f, fIdx) => (
                      <li key={fIdx} className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-500"></span>
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-6 mt-6 border-t border-slate-100">
                  <Link
                    href={svc.ctaLink}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#082B55] group-hover:text-[#168BDE] transition-colors"
                  >
                    <span>{svc.ctaText}</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
