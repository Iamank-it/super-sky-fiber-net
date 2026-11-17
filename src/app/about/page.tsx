// Dedicated About Us Page
import { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { TrustBenefits } from "@/components/homepage/TrustBenefits";
import { FinalCtaSection } from "@/components/homepage/FinalCtaSection";
import {
  Target,
  Eye,
  HeartHandshake,
  Phone,
  MessageCircle,
} from "lucide-react";

export const metadata: Metadata = {
  title: "About Us | Super Sky Fiber Net (SSFN) - Jamshedpur",
  description:
    "Learn about Super Sky Fiber Net (SSFN), Jamshedpur's independent fiber broadband service provider delivering high-speed, symmetric optical connectivity with local customer support.",
};

export default function AboutPage() {
  return (
    <div className="bg-white min-h-screen">
      {/* Hero Banner */}
      <section className="bg-gradient-to-b from-[#082B55] to-[#0A3366] text-white py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/10 backdrop-blur-md text-cyan-300 text-xs font-bold uppercase tracking-wider">
            Our Story & Values
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            Connecting Jamshedpur to What Matters Most
          </h1>

          <p className="text-slate-200 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Super Sky Fiber Net (SSFN) was established to provide Jamshedpur with reliable, modern,
            and truly high-speed broadband backed by responsive, personal local service.
          </p>
        </div>
      </section>

      {/* Main Company Narrative */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-5">
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-sky-100 text-[#082B55] text-xs font-bold uppercase tracking-wider">
                Local Presence, World-Class Tech
              </div>

              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#082B55] tracking-tight">
                Born in Jamshedpur, Dedicated to Jamshedpur
              </h2>

              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                For years, broadband subscribers across Jamshedpur—from Sakchi and Bistupur to Kadma
                and Telco—faced frequent line disruptions, slow upload speeds, and distant corporate
                call centers that treated local connectivity issues like minor statistics.
              </p>

              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                <strong>Super Sky Fiber Net (SSFN)</strong> changed that paradigm. By deploying an
                advanced, 100% optical fiber-to-the-home (FTTH) network and establishing our own
                certified optical splicing and engineering teams directly in the city, we deliver
                crystal-clear connectivity with immediate same-day accountability.
              </p>

              <div className="pt-3 grid grid-cols-2 sm:grid-cols-3 gap-4">
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                  <div className="text-2xl font-black text-[#168BDE]">100%</div>
                  <div className="text-xs text-slate-600 mt-0.5">Glass Core FTTH</div>
                </div>
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                  <div className="text-2xl font-black text-[#082B55]">&lt; 8 hrs</div>
                  <div className="text-xs text-slate-600 mt-0.5">Avg Setup Time</div>
                </div>
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 col-span-2 sm:col-span-1">
                  <div className="text-2xl font-black text-emerald-600">Zero</div>
                  <div className="text-xs text-slate-600 mt-0.5">Hidden Fees</div>
                </div>
              </div>
            </div>

            {/* Mission & Vision Cards (5 Cols) */}
            <div className="lg:col-span-5 space-y-6">
              {/* Mission Card */}
              <div className="p-7 rounded-3xl bg-slate-50 border border-slate-200/90 shadow-sm space-y-3">
                <div className="w-10 h-10 rounded-2xl bg-[#082B55] text-cyan-300 flex items-center justify-center">
                  <Target className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-bold text-[#082B55]">Our Mission</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  To empower homes, educational pursuits, remote workers, and local businesses in
                  Jamshedpur with uncompromised, high-throughput optical fiber connectivity at
                  honest, transparent prices.
                </p>
              </div>

              {/* Vision Card */}
              <div className="p-7 rounded-3xl bg-slate-50 border border-slate-200/90 shadow-sm space-y-3">
                <div className="w-10 h-10 rounded-2xl bg-[#168BDE] text-white flex items-center justify-center">
                  <Eye className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-bold text-[#082B55]">Our Vision</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  To become Jharkhand&apos;s most reliable, respected, and customer-friendly internet
                  service provider by maintaining true local engineering accountability and pioneering
                  dual-band gigabit accessibility for all.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Benefits */}
      <TrustBenefits />

      {/* Direct Contact Commitment */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
            <HeartHandshake className="w-6 h-6" />
          </div>

          <h2 className="text-3xl font-extrabold text-[#082B55] tracking-tight">
            Speak Directly with Our Management & Engineering Team
          </h2>

          <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-xl mx-auto">
            We value direct communication. Whether you want to discuss coverage for your residential
            society or need custom business connectivity, we are always a phone call or WhatsApp message away.
          </p>

          <div className="pt-2 flex flex-wrap justify-center gap-4">
            <a
              href={siteConfig.contact.phoneTel}
              className="px-6 py-3.5 rounded-xl bg-[#082B55] text-white font-bold text-xs hover:bg-[#168BDE] transition-colors flex items-center gap-2"
            >
              <Phone className="w-4 h-4 text-cyan-300" />
              <span>Call Helpline: +91 94711 26747</span>
            </a>

            <a
              href={siteConfig.contact.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 rounded-xl bg-[#25D366] hover:bg-[#20BD5A] text-white font-bold text-xs transition-colors flex items-center gap-2 shadow-sm"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Chat on WhatsApp</span>
            </a>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <FinalCtaSection />
    </div>
  );
}
