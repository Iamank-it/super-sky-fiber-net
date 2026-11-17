// SSFN Hero Section Component
"use client";

import React, { useState } from "react";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { NewConnectionModal } from "@/components/layout/NewConnectionModal";
import {
  Wifi,
  Zap,
  ShieldCheck,
  MapPin,
  ArrowRight,
  MessageCircle,
  Activity,
  Sparkles,
} from "lucide-react";

export function HeroSection() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#082B55] via-[#0A3366] to-[#0D3E78] text-white pt-12 pb-20 lg:pt-20 lg:pb-28">
      {/* Background Decorative Optical Network Mesh */}
      <div className="absolute inset-0 opacity-15 pointer-events-none">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id="grad1" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#32D5E8" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#082B55" stopOpacity="0" />
            </radialGradient>
          </defs>
          <circle cx="10%" cy="20%" r="300" fill="url(#grad1)" />
          <circle cx="90%" cy="70%" r="400" fill="url(#grad1)" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Value Proposition & CTAs (7 Cols) */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Local Trust Pill */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-cyan-400/30 text-cyan-300 text-xs sm:text-sm font-semibold shadow-inner">
              <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-ping"></span>
              <MapPin className="w-4 h-4 text-cyan-300" />
              <span>Jamshedpur&apos;s Dedicated Fiber Broadband Network</span>
            </div>

            {/* Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1]">
              Jamshedpur, Get Connected to{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-sky-300 to-white">
                Better Internet.
              </span>
            </h1>

            {/* Supporting Description */}
            <p className="text-base sm:text-lg text-slate-200 leading-relaxed max-w-2xl mx-auto lg:mx-0">
              {siteConfig.heroDescription} Pure optical fiber to your doorstep with symmetric speeds,
              low-ping gaming, and prompt same-day local Jamshedpur engineering support.
            </p>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 sm:gap-4">
              <button
                onClick={() => setModalOpen(true)}
                className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-gradient-to-r from-[#168BDE] to-[#06B6D4] hover:from-[#1272B7] hover:to-[#0891B2] text-white font-bold text-sm tracking-wide shadow-lg shadow-cyan-500/25 transition-all hover:scale-[1.02] flex items-center justify-center gap-2"
              >
                <Wifi className="w-4 h-4" />
                <span>Get New Connection</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <Link
                href="/plans"
                className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-white/10 hover:bg-white/15 text-white font-bold text-sm border border-white/20 transition-all text-center"
              >
                Explore Broadband Plans
              </Link>

              <a
                href={siteConfig.contact.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-5 py-3.5 rounded-xl bg-[#25D366]/20 hover:bg-[#25D366]/30 text-emerald-300 font-bold text-sm border border-emerald-400/30 transition-all flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400" />
                <span>WhatsApp Us</span>
              </a>
            </div>

            {/* Quick Benefits Bar */}
            <div className="pt-4 grid grid-cols-2 sm:grid-cols-3 gap-3 text-left">
              <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
                <Zap className="w-5 h-5 text-amber-300 flex-shrink-0" />
                <div>
                  <div className="text-xs font-bold text-white">Up to 500 Mbps</div>
                  <div className="text-[11px] text-slate-300">Symmetric Speed</div>
                </div>
              </div>

              <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
                <ShieldCheck className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                <div>
                  <div className="text-xs font-bold text-white">Same-Day Setup</div>
                  <div className="text-[11px] text-slate-300">Local Jamshedpur Team</div>
                </div>
              </div>

              <div className="col-span-2 sm:col-span-1 flex items-center gap-2.5 p-3 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
                <Activity className="w-5 h-5 text-cyan-300 flex-shrink-0" />
                <div>
                  <div className="text-xs font-bold text-white">Ultra-Low Ping</div>
                  <div className="text-[11px] text-slate-300">Lag-Free Gaming</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Fiber Speed Hub (5 Cols) */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md bg-gradient-to-b from-[#0F3563] to-[#082B55] p-6 sm:p-8 rounded-3xl border border-cyan-400/20 shadow-2xl shadow-cyan-900/50">
              {/* Top Card Badge */}
              <div className="flex items-center justify-between pb-6 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse"></div>
                  <span className="text-xs font-bold uppercase tracking-wider text-cyan-300">
                    SSFN Live Optical Gateway
                  </span>
                </div>
                <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-cyan-400/10 text-cyan-300 border border-cyan-400/20 font-mono">
                  FTTH GPON
                </span>
              </div>

              {/* Speed Meter Simulation */}
              <div className="py-8 text-center relative">
                <div className="inline-block relative">
                  <span className="text-6xl sm:text-7xl font-black tracking-tight text-white">
                    300
                  </span>
                  <span className="text-xl sm:text-2xl font-bold text-cyan-300 ml-1">Mbps</span>
                </div>
                <p className="text-xs text-slate-300 mt-2">
                  Tested Real-Time Throughput • Symmetric Optical Link
                </p>

                {/* Speed Progress Bar */}
                <div className="w-full bg-white/10 h-2.5 rounded-full mt-4 overflow-hidden p-0.5">
                  <div className="bg-gradient-to-r from-sky-400 via-cyan-300 to-emerald-400 h-full rounded-full w-[85%] animate-pulse"></div>
                </div>
              </div>

              {/* Network Stats Grid */}
              <div className="grid grid-cols-3 gap-2.5 pt-4 text-center border-t border-white/10">
                <div className="bg-white/5 p-2.5 rounded-xl border border-white/5">
                  <div className="text-xs text-slate-300">Latency / Ping</div>
                  <div className="text-sm font-bold text-emerald-400 mt-0.5">3 ~ 6 ms</div>
                </div>
                <div className="bg-white/5 p-2.5 rounded-xl border border-white/5">
                  <div className="text-xs text-slate-300">Data Quota</div>
                  <div className="text-sm font-bold text-cyan-300 mt-0.5">Unlimited</div>
                </div>
                <div className="bg-white/5 p-2.5 rounded-xl border border-white/5">
                  <div className="text-xs text-slate-300">Router</div>
                  <div className="text-sm font-bold text-sky-300 mt-0.5">Dual-Band</div>
                </div>
              </div>

              {/* Promotional Ribbon inside Card */}
              <div className="mt-5 p-3.5 rounded-2xl bg-gradient-to-r from-sky-600/30 to-cyan-500/20 border border-cyan-400/30 flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-white flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                    Special Jamshedpur Welcome Offer
                  </div>
                  <div className="text-[11px] text-cyan-200">
                    Plans starting at just ₹399/mo with Free Setup
                  </div>
                </div>
                <button
                  onClick={() => setModalOpen(true)}
                  className="px-3 py-1.5 rounded-xl bg-white text-[#082B55] font-bold text-xs hover:bg-cyan-50 transition-colors"
                >
                  Apply
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <NewConnectionModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </section>
  );
}
