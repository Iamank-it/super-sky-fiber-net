// Customer Feedback & Service Quality Pledge
import React from "react";
import { MessageSquare, HeartHandshake } from "lucide-react";
import { siteConfig } from "@/config/site";

export function TestimonialsSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-slate-100 text-[#082B55] text-xs font-bold uppercase tracking-wider mb-4">
          <HeartHandshake className="w-3.5 h-3.5 text-[#168BDE]" />
          <span>Our Commitment to You</span>
        </div>

        <h2 className="text-3xl sm:text-4xl font-extrabold text-[#082B55] tracking-tight">
          Committed to Honest Service in Jamshedpur
        </h2>

        <p className="mt-4 text-slate-600 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
          At Super Sky Fiber Net, we believe in authentic relationships. Rather than displaying
          unverified marketing claims, we let our symmetric speeds, low-ping reliability, and
          same-day local support speak for themselves.
        </p>

        {/* Quality Pillars */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200/80">
            <div className="w-10 h-10 rounded-2xl bg-sky-100 text-[#168BDE] flex items-center justify-center font-bold text-sm mb-4">
              01
            </div>
            <h3 className="font-bold text-[#082B55] text-base">Direct Local Accountability</h3>
            <p className="mt-2 text-xs text-slate-600 leading-relaxed">
              When you call or WhatsApp +91 94711 26747, you talk directly with our Jamshedpur
              operations team, not an offshore support desk.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200/80">
            <div className="w-10 h-10 rounded-2xl bg-cyan-100 text-[#082B55] flex items-center justify-center font-bold text-sm mb-4">
              02
            </div>
            <h3 className="font-bold text-[#082B55] text-base">Same-Day Fault Resolution</h3>
            <p className="mt-2 text-xs text-slate-600 leading-relaxed">
              If an optical fiber cable experiences disturbance due to city roadworks or weather,
              our local field splicing team attends to it within hours.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200/80">
            <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-sm mb-4">
              03
            </div>
            <h3 className="font-bold text-[#082B55] text-base">Zero Billing Surprises</h3>
            <p className="mt-2 text-xs text-slate-600 leading-relaxed">
              Transparent monthly tariff rates without hidden equipment rental costs or artificial
              speed throttling under reasonable everyday usage.
            </p>
          </div>
        </div>

        {/* Action Bar */}
        <div className="mt-10 p-6 rounded-3xl bg-gradient-to-r from-sky-50 to-blue-50 border border-sky-100 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-left">
            <div className="text-sm font-bold text-[#082B55]">Are you an existing SSFN subscriber?</div>
            <div className="text-xs text-slate-600">
              Share your feedback or suggestions directly with our management team.
            </div>
          </div>

          <a
            href={siteConfig.contact.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 rounded-xl bg-[#082B55] hover:bg-[#168BDE] text-white text-xs font-bold transition-colors inline-flex items-center gap-2 flex-shrink-0"
          >
            <MessageSquare className="w-4 h-4 text-cyan-300" />
            <span>Send Feedback on WhatsApp</span>
          </a>
        </div>
      </div>
    </section>
  );
}
