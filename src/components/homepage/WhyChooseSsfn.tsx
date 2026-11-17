// Why Choose SSFN Feature Breakdown Component
import React from "react";
import {
  Check,
  X,
} from "lucide-react";
import Link from "next/link";
import { siteConfig } from "@/config/site";

export function WhyChooseSsfn() {
  const comparisonPoints = [
    {
      feature: "Customer Support Model",
      ssfn: "Direct local Jamshedpur helpline & WhatsApp (+91 94711 26747) with immediate human response",
      traditional: "Multi-layered automated IVR menus with central call center queues",
    },
    {
      feature: "Installation Turnaround",
      ssfn: "Same-Day Setup (typically completed within 4 to 8 hours)",
      traditional: "Standard 3 to 7 working days waiting period",
    },
    {
      feature: "Optical Infrastructure",
      ssfn: "100% Pure GPON FTTH right to the user premises router",
      traditional: "Frequently relies on copper coaxial drop wires with weather degradation",
    },
    {
      feature: "Speed Symmetry",
      ssfn: "Equal upload and download throughput for fast cloud sync and gaming",
      traditional: "Often throttles upload bandwidth to 10-20% of download speed",
    },
    {
      feature: "Pricing Transparency",
      ssfn: "Zero hidden modem rental charges or unexpected rate changes",
      traditional: "Security deposits, router rental fees, and recurring add-on charges",
    },
    {
      feature: "Field Fault Restoration",
      ssfn: "Local field splicing teams stationed directly in Jamshedpur",
      traditional: "Third-party subcontracted technicians with slow turnaround",
    },
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-slate-50 via-white to-slate-50 border-y border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-cyan-100 text-[#082B55] text-xs font-bold uppercase tracking-wider">
            The SSFN Advantage
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#082B55] tracking-tight">
            Why Jamshedpur Chooses Super Sky Fiber Net
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            See how our local focus and modern optical engineering solve the biggest pain points
            experienced with traditional internet providers.
          </p>
        </div>

        {/* Feature Comparison Cards / Table */}
        <div className="mt-14 max-w-4xl mx-auto bg-white rounded-3xl shadow-lg border border-slate-200 overflow-hidden">
          <div className="grid grid-cols-12 bg-[#082B55] text-white p-5 text-xs sm:text-sm font-bold uppercase tracking-wider">
            <div className="col-span-4 sm:col-span-3">Feature</div>
            <div className="col-span-4 sm:col-span-5 text-cyan-300">Super Sky Fiber Net (SSFN)</div>
            <div className="col-span-4 sm:col-span-4 text-slate-400">Traditional Telecom</div>
          </div>

          <div className="divide-y divide-slate-100 text-xs sm:text-sm">
            {comparisonPoints.map((pt, idx) => (
              <div
                key={idx}
                className="grid grid-cols-12 p-4 sm:p-5 hover:bg-slate-50/80 transition-colors items-center gap-2"
              >
                <div className="col-span-12 sm:col-span-3 font-bold text-[#082B55]">
                  {pt.feature}
                </div>

                <div className="col-span-12 sm:col-span-5 bg-sky-50/50 sm:bg-transparent p-2.5 sm:p-0 rounded-xl sm:rounded-none flex items-start gap-2 text-slate-800 font-medium">
                  <Check className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span>{pt.ssfn}</span>
                </div>

                <div className="col-span-12 sm:col-span-4 flex items-start gap-2 text-slate-500 text-xs">
                  <X className="w-4 h-4 text-slate-400 flex-shrink-0 mt-0.5" />
                  <span>{pt.traditional}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Contact CTA Banner */}
        <div className="mt-12 text-center">
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 p-4 rounded-2xl bg-white border border-slate-200 shadow-sm">
            <span className="text-xs sm:text-sm text-slate-700 font-medium">
              Ready to upgrade your home or office broadband?
            </span>
            <div className="flex items-center gap-2">
              <Link
                href="/plans"
                className="px-4 py-2 rounded-xl bg-[#082B55] hover:bg-[#168BDE] text-white text-xs font-bold transition-colors"
              >
                View Plans
              </Link>
              <a
                href={siteConfig.contact.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-xl bg-[#25D366] text-white text-xs font-bold hover:bg-[#20BD5A] transition-colors"
              >
                WhatsApp Inquiry
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
