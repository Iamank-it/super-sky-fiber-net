// SSFN Final Conversion CTA Section
"use client";

import React, { useState } from "react";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { NewConnectionModal } from "@/components/layout/NewConnectionModal";
import { Wifi, MessageCircle, ArrowRight, Sparkles } from "lucide-react";

export function FinalCtaSection() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <section className="py-20 bg-gradient-to-r from-[#082B55] via-[#0E4282] to-[#168BDE] text-white relative overflow-hidden">
      {/* Decorative Optical Glows */}
      <div className="absolute top-0 right-0 -mt-12 -mr-12 w-96 h-96 bg-cyan-400/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 -mb-12 -ml-12 w-96 h-96 bg-sky-300/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-6">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/10 backdrop-blur-md text-cyan-300 text-xs font-bold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Switch to Super Sky Fiber Net Today</span>
        </div>

        <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
          Ready to Experience Better Connectivity in Jamshedpur?
        </h2>

        <p className="text-slate-200 text-sm sm:text-lg max-w-2xl mx-auto leading-relaxed">
          Upgrade your home or office to ultra-fast optical fiber. Enjoy same-day installation,
          complimentary dual-band gigabit routers, and direct local technical support.
        </p>

        {/* Buttons */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
          <button
            onClick={() => setModalOpen(true)}
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white text-[#082B55] hover:bg-cyan-50 font-extrabold text-sm tracking-wide shadow-xl shadow-slate-950/20 transition-all hover:scale-105 flex items-center justify-center gap-2"
          >
            <Wifi className="w-4 h-4 text-[#168BDE]" />
            <span>Get a New Connection</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <a
            href={siteConfig.contact.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-7 py-4 rounded-xl bg-[#25D366] hover:bg-[#20BD5A] text-white font-bold text-sm shadow-lg shadow-emerald-950/20 transition-all flex items-center justify-center gap-2"
          >
            <MessageCircle className="w-4 h-4" />
            <span>WhatsApp: {siteConfig.contact.phone}</span>
          </a>

          <Link
            href="/contact"
            className="w-full sm:w-auto px-6 py-4 rounded-xl bg-white/10 hover:bg-white/15 text-white font-bold text-sm border border-white/20 transition-all"
          >
            Contact Our Team
          </Link>
        </div>

        <div className="pt-2 text-xs text-sky-200">
          Serving Sakchi • Bistupur • Kadma • Sonari • Telco • Mango • Adityapur & Greater Jamshedpur
        </div>
      </div>

      <NewConnectionModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </section>
  );
}
