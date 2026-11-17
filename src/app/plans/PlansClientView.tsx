"use client";

import React, { useState } from "react";
import { PlanConfig } from "@/config/plans";
import { siteConfig } from "@/config/site";
import { NewConnectionModal } from "@/components/layout/NewConnectionModal";
import { MarketBenchmarkComparison } from "@/components/homepage/MarketBenchmarkComparison";
import {
  Check,
  Star,
  ArrowRight,
  Sparkles,
  Phone,
  MessageCircle,
} from "lucide-react";

interface PlansClientViewProps {
  plans: PlanConfig[];
  discounts: Array<{ duration: string; benefit: string; discountBadge: string }>;
  lastSyncDate: string;
}

export function PlansClientView({ plans, discounts, lastSyncDate }: PlansClientViewProps) {
  const [selectedPlan, setSelectedPlan] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<"ALL" | "HOME" | "STREAMING" | "BUSINESS">("ALL");

  const filteredPlans =
    activeCategory === "ALL" ? plans : plans.filter((p) => p.category === activeCategory);

  const handleOpenPlan = (name: string) => {
    setSelectedPlan(name);
    setModalOpen(true);
  };

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Page Hero Header */}
      <section className="bg-gradient-to-b from-[#082B55] to-[#0A3366] text-white py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/10 backdrop-blur-md text-cyan-300 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Jamshedpur Fiber Broadband Tariffs</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            High-Speed Fiber Plans Built for Pure Performance
          </h1>

          <p className="text-slate-200 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Ultra-fast symmetric upload & download speeds, generous 3,300+ GB data allowances, and
            complimentary dual-band gigabit Wi-Fi routers with zero hidden costs.
          </p>

          {/* Category Tabs */}
          <div className="pt-6 flex flex-wrap justify-center gap-2">
            {[
              { id: "ALL", label: "All Speed Tiers" },
              { id: "HOME", label: "Home & Student (50-100 Mbps)" },
              { id: "STREAMING", label: "4K Family & Creator (200-300 Mbps)" },
              { id: "BUSINESS", label: "Commercial Enterprise (500 Mbps)" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveCategory(tab.id as typeof activeCategory)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                  activeCategory === tab.id
                    ? "bg-cyan-400 text-slate-950 font-black shadow-lg shadow-cyan-400/20"
                    : "bg-white/10 text-white hover:bg-white/20"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Main Plans Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPlans.map((plan) => {
            const isRecommended = plan.recommended;

            return (
              <div
                key={plan.slug}
                className={`relative rounded-3xl p-7 flex flex-col justify-between transition-all duration-300 ${
                  isRecommended
                    ? "bg-gradient-to-b from-[#082B55] to-[#0A3366] text-white shadow-2xl shadow-sky-950/40 border-2 border-cyan-400 scale-[1.02]"
                    : "bg-white text-slate-800 border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1"
                }`}
              >
                {isRecommended && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-amber-400 to-orange-400 text-slate-950 font-black text-[11px] uppercase tracking-wider px-4 py-1 rounded-full shadow-md flex items-center gap-1">
                    <Star className="w-3 h-3 fill-current" />
                    <span>Best Value in Jamshedpur</span>
                  </div>
                )}

                <div>
                  <div className="flex items-start justify-between">
                    <div>
                      <h3
                        className={`text-xl font-extrabold tracking-tight ${
                          isRecommended ? "text-white" : "text-[#082B55]"
                        }`}
                      >
                        {plan.name}
                      </h3>
                      <p
                        className={`text-xs mt-1 ${
                          isRecommended ? "text-cyan-200" : "text-slate-500"
                        }`}
                      >
                        {plan.tagline}
                      </p>
                    </div>

                    <div
                      className={`text-right px-3 py-1.5 rounded-xl font-mono text-xs font-bold ${
                        isRecommended
                          ? "bg-white/10 text-cyan-300 border border-cyan-400/30"
                          : "bg-sky-50 text-[#168BDE] border border-sky-100"
                      }`}
                    >
                      {plan.speedDisplay}
                    </div>
                  </div>

                  {/* Price */}
                  <div className="mt-6 flex items-baseline gap-2">
                    <span className="text-4xl font-black tracking-tight">
                      ₹{plan.effectivePrice}
                    </span>
                    <span
                      className={`text-xs font-medium ${
                        isRecommended ? "text-slate-300" : "text-slate-500"
                      }`}
                    >
                      / month + GST
                    </span>

                    {plan.discountPercent > 0 && (
                      <span className="text-xs px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-400/30">
                        {plan.discountPercent}% OFF
                      </span>
                    )}
                  </div>

                  {/* Quick specs */}
                  <div className="mt-4 pt-4 border-t border-slate-100/20 grid grid-cols-2 gap-2 text-xs">
                    <div
                      className={`p-2.5 rounded-xl ${
                        isRecommended ? "bg-white/5" : "bg-slate-50"
                      }`}
                    >
                      <div className="text-[10px] text-slate-400 font-semibold uppercase">
                        Data Cap
                      </div>
                      <div className="font-bold mt-0.5">{plan.dataAllowance}</div>
                    </div>

                    <div
                      className={`p-2.5 rounded-xl ${
                        isRecommended ? "bg-white/5" : "bg-slate-50"
                      }`}
                    >
                      <div className="text-[10px] text-slate-400 font-semibold uppercase">
                        Router
                      </div>
                      <div className="font-bold mt-0.5 truncate">{plan.routerType}</div>
                    </div>
                  </div>

                  {/* Features */}
                  <ul className="mt-6 space-y-2.5 text-xs">
                    {plan.benefits.map((b, idx) => (
                      <li key={idx} className="flex items-start gap-2.5">
                        <div
                          className={`w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                            isRecommended
                              ? "bg-cyan-400/20 text-cyan-300"
                              : "bg-emerald-100 text-emerald-600"
                          }`}
                        >
                          <Check className="w-2.5 h-2.5 stroke-[3]" />
                        </div>
                        <span
                          className={
                            isRecommended ? "text-slate-200" : "text-slate-600"
                          }
                        >
                          {b}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-8">
                  <button
                    onClick={() => handleOpenPlan(`${plan.name} (${plan.speedDisplay})`)}
                    className={`w-full py-3.5 px-4 rounded-xl font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 ${
                      isRecommended
                        ? "bg-gradient-to-r from-cyan-400 to-[#168BDE] hover:from-cyan-300 hover:to-[#0F6EB2] text-slate-950 shadow-lg shadow-cyan-500/25 font-black"
                        : "bg-[#082B55] hover:bg-[#168BDE] text-white shadow-md shadow-slate-900/10"
                    }`}
                  >
                    <span>Enquire for {plan.speedDisplay}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Multi-Month Advance Subscription Incentives */}
        <div className="mt-16 bg-white rounded-3xl p-8 border border-slate-200 shadow-sm">
          <div className="max-w-3xl mx-auto text-center space-y-3 mb-10">
            <h3 className="text-2xl font-extrabold text-[#082B55]">
              Advance Billing Incentives & Free Equipment
            </h3>
            <p className="text-xs sm:text-sm text-slate-600">
              Save more when subscribing for 3, 6, or 12 months in Jamshedpur.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {discounts.map((item, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col justify-between space-y-4"
              >
                <div>
                  <span className="inline-block px-3 py-1 rounded-full bg-[#168BDE]/10 text-[#168BDE] text-xs font-bold mb-3">
                    {item.discountBadge}
                  </span>
                  <div className="font-extrabold text-base text-[#082B55]">{item.duration}</div>
                  <p className="text-xs text-slate-600 mt-2 leading-relaxed">{item.benefit}</p>
                </div>

                <button
                  onClick={() => handleOpenPlan(`Advance ${item.duration} Plan`)}
                  className="w-full py-2.5 rounded-xl border border-[#082B55] text-[#082B55] hover:bg-[#082B55] hover:text-white font-bold text-xs transition-colors"
                >
                  Choose {item.duration}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Market Benchmark Section */}
        <div className="mt-16">
          <MarketBenchmarkComparison lastVerifiedAt={lastSyncDate} />
        </div>

        {/* Dedicated Help Block */}
        <div className="mt-16 bg-gradient-to-r from-sky-50 to-blue-50 border border-sky-200 rounded-3xl p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <h4 className="text-xl font-bold text-[#082B55]">
              Need help deciding which speed is right for you?
            </h4>
            <p className="text-xs sm:text-sm text-slate-600">
              Tell our local Jamshedpur team about your devices and daily usage. We will recommend
              the most economical package with zero upsell pressure.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href={siteConfig.contact.phoneTel}
              className="px-5 py-3 rounded-xl bg-[#082B55] text-white font-bold text-xs hover:bg-[#168BDE] transition-colors flex items-center gap-2"
            >
              <Phone className="w-4 h-4 text-cyan-300" />
              <span>Call +91 94711 26747</span>
            </a>

            <a
              href={siteConfig.contact.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3 rounded-xl bg-[#25D366] text-white font-bold text-xs hover:bg-[#20BD5A] transition-colors flex items-center gap-2 shadow-sm"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp Advice</span>
            </a>
          </div>
        </div>
      </section>

      <NewConnectionModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        preselectedPlan={selectedPlan}
      />
    </div>
  );
}
