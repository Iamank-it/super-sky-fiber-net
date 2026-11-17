// Dedicated Our Services Page
import { Metadata } from "next";
import { ServicesSection } from "@/components/homepage/ServicesSection";
import { TrustBenefits } from "@/components/homepage/TrustBenefits";
import { FinalCtaSection } from "@/components/homepage/FinalCtaSection";
import { siteConfig } from "@/config/site";
import {
  CheckCircle2,
  Phone,
  MessageCircle,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Broadband Services & Optical Fiber Solutions in Jamshedpur | SSFN",
  description:
    "Super Sky Fiber Net provides residential FTTH broadband, enterprise business networking, dual-band Wi-Fi setups, CCTV links, and fast optical fiber splicing in Jamshedpur.",
};

export default function ServicesPage() {
  return (
    <div className="bg-white min-h-screen">
      {/* Hero Banner */}
      <section className="bg-gradient-to-b from-[#082B55] to-[#0A3366] text-white py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/10 backdrop-blur-md text-cyan-300 text-xs font-bold uppercase tracking-wider">
            Fiber Infrastructure Solutions
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            End-to-End Fiber Internet Services in Jamshedpur
          </h1>

          <p className="text-slate-200 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            From single-room apartments to multi-story business complexes, we design, deploy, and
            maintain cutting-edge optical fiber connectivity with dedicated local field support.
          </p>

          <div className="pt-4 flex flex-wrap justify-center gap-3">
            <a
              href={siteConfig.contact.phoneTel}
              className="px-5 py-2.5 rounded-xl bg-white text-[#082B55] font-bold text-xs hover:bg-cyan-50 transition-colors flex items-center gap-2"
            >
              <Phone className="w-4 h-4 text-[#168BDE]" />
              <span>Call Helpline: +91 94711 26747</span>
            </a>
            <a
              href={siteConfig.contact.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-xl bg-[#25D366] hover:bg-[#20BD5A] text-white font-bold text-xs transition-colors flex items-center gap-2"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp Direct</span>
            </a>
          </div>
        </div>
      </section>

      {/* Main Services Breakdown */}
      <ServicesSection />

      {/* Technical Infrastructure Detail */}
      <section className="py-20 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-5">
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-sky-100 text-[#082B55] text-xs font-bold uppercase tracking-wider">
                Network Quality Guarantee
              </div>

              <h2 className="text-3xl font-extrabold text-[#082B55] tracking-tight">
                Industrial-Grade Fiber Infrastructure Deployed in Jamshedpur
              </h2>

              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                Super Sky Fiber Net utilizes single-mode G.652D optical fibers, high-density optical
                distribution frames (ODF), and carrier-grade GPON OLT hardware. Every subscriber drop
                undergoes optical power loss (dBm) verification before handover.
              </p>

              <div className="space-y-3 pt-2">
                {[
                  "Dual-path redundant backbone links across Sakchi & Bistupur hubs",
                  "Optical time-domain reflectometer (OTDR) testing for precision splicing",
                  "Carrier-grade NAT with optimized routing for gaming and videoconferencing",
                  "Dedicated power backup on local aggregation nodes for continuous uptime",
                ].map((pt, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700 text-sm font-medium">{pt}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Visual Specs Card */}
            <div className="bg-white rounded-3xl p-8 shadow-xl border border-slate-200 space-y-6">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div className="font-bold text-[#082B55] text-lg">Network Specification Summary</div>
                <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
                  99.9% Uptime SLA
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4 text-xs">
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                  <div className="text-slate-500 font-semibold">Optical Medium</div>
                  <div className="text-sm font-bold text-slate-900 mt-1">100% Glass Core Fiber</div>
                </div>
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                  <div className="text-slate-500 font-semibold">Throughput Symmetry</div>
                  <div className="text-sm font-bold text-slate-900 mt-1">1:1 Upload / Download</div>
                </div>
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                  <div className="text-slate-500 font-semibold">Average Local Ping</div>
                  <div className="text-sm font-bold text-slate-900 mt-1">3 ms ~ 8 ms</div>
                </div>
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                  <div className="text-slate-500 font-semibold">Fault Resolution</div>
                  <div className="text-sm font-bold text-slate-900 mt-1">Same-Day Guarantee</div>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-sky-50 border border-sky-100 text-xs text-slate-600 leading-relaxed">
                Need a dedicated leased line, multi-office point-to-point network, or custom commercial
                bandwidth package? Call our engineering desk directly at{" "}
                <strong className="text-[#082B55]">+91 94711 26747</strong>.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Benefits */}
      <TrustBenefits />

      {/* Final CTA */}
      <FinalCtaSection />
    </div>
  );
}
