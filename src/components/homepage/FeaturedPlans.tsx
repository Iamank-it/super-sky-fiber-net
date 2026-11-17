// SSFN Featured Broadband Plans Component
"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ssfnPlans } from "@/config/plans";
import { NewConnectionModal } from "@/components/layout/NewConnectionModal";
import {
  Check,
  Zap,
  Star,
  ArrowRight,
  Router,
  Sparkles,
} from "lucide-react";

export function FeaturedPlans() {
  const [selectedPlan, setSelectedPlan] = useState<string>("");
  const [modalOpen, setModalOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<"ALL" | "HOME" | "STREAMING" | "BUSINESS">("ALL");

  const filteredPlans =
    activeCategory === "ALL"
      ? ssfnPlans
      : ssfnPlans.filter((p) => p.category === activeCategory);

  const handleSelectPlan = (planName: string) => {
    setSelectedPlan(planName);
    setModalOpen(true);
  };

  return (
    <section id="plans" className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-cyan-100 text-[#082B55] text-xs font-bold uppercase tracking-wider">
            Broadband Tariff Plans
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#082B55] tracking-tight">
            High-Speed Fiber Plans for Every Need
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            All plans include symmetric speeds, high-gain optical router options, and unlimited data
            with dedicated local support in Jamshedpur.
          </p>

          {/* Category Filter Tabs */}
          <div className="pt-4 flex flex-wrap justify-center gap-2">
            {[
              { id: "ALL", label: "All Plans" },
              { id: "HOME", label: "Home & Study" },
              { id: "STREAMING", label: "Family & Streaming" },
              { id: "BUSINESS", label: "Business & Creators" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveCategory(tab.id as typeof activeCategory)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                  activeCategory === tab.id
                    ? "bg-[#082B55] text-white shadow-md shadow-slate-900/10"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Long Term Value Banner */}
        <div className="mt-10 bg-gradient-to-r from-sky-50 via-cyan-50 to-blue-50 border border-sky-200/80 rounded-2xl p-4 sm:p-5 max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-center md:text-left">
            <div className="w-10 h-10 rounded-xl bg-[#168BDE] text-white flex items-center justify-center flex-shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-[#082B55]">
                Special Jamshedpur Multi-Month Perks
              </div>
              <div className="text-xs text-slate-600">
                Opt for 6 or 12 months advance to receive a <strong>FREE Gigabit Dual-Band Wi-Fi 6 Router</strong> & zero installation fee!
              </div>
            </div>
          </div>
          <Link
            href="/plans"
            className="text-xs font-bold text-[#168BDE] hover:text-[#082B55] flex items-center gap-1 whitespace-nowrap"
          >
            <span>View All Discounts</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Pricing Cards Grid */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPlans.map((plan) => {
            const isRecommended = plan.recommended;

            return (
              <div
                key={plan.slug}
                className={`relative rounded-3xl p-7 transition-all duration-300 flex flex-col justify-between ${
                  isRecommended
                    ? "bg-gradient-to-b from-[#082B55] to-[#0A3366] text-white shadow-2xl shadow-sky-900/30 scale-105 z-10 border-2 border-cyan-400"
                    : "bg-white text-slate-800 border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1"
                }`}
              >
                {/* Recommended Top Badge */}
                {isRecommended && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-amber-400 to-orange-400 text-slate-950 font-black text-[11px] uppercase tracking-wider px-4 py-1 rounded-full shadow-md flex items-center gap-1">
                    <Star className="w-3 h-3 fill-current" />
                    <span>Most Popular in Jamshedpur</span>
                  </div>
                )}

                <div>
                  {/* Plan Header */}
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
                        {plan.popularFor}
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

                  {/* Price Block */}
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

                  {/* Speed & Router Quick Badges */}
                  <div className="mt-4 pt-4 border-t border-slate-100/20 grid grid-cols-2 gap-2 text-xs">
                    <div
                      className={`p-2.5 rounded-xl ${
                        isRecommended ? "bg-white/5" : "bg-slate-50"
                      }`}
                    >
                      <div className="text-[10px] text-slate-400 font-semibold uppercase">
                        Speed
                      </div>
                      <div className="font-bold flex items-center gap-1 mt-0.5">
                        <Zap className="w-3.5 h-3.5 text-amber-400" />
                        <span>{plan.speedDisplay}</span>
                      </div>
                    </div>

                    <div
                      className={`p-2.5 rounded-xl ${
                        isRecommended ? "bg-white/5" : "bg-slate-50"
                      }`}
                    >
                      <div className="text-[10px] text-slate-400 font-semibold uppercase">
                        Router
                      </div>
                      <div className="font-bold flex items-center gap-1 mt-0.5 truncate">
                        <Router className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0" />
                        <span className="truncate">Included</span>
                      </div>
                    </div>
                  </div>

                  {/* Plan Features Checklist */}
                  <ul className="mt-6 space-y-2.5 text-xs">
                    {plan.benefits.slice(0, 5).map((b, idx) => (
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

                {/* Card CTA Button */}
                <div className="pt-8">
                  <button
                    onClick={() => handleSelectPlan(`${plan.name} (${plan.speedDisplay})`)}
                    className={`w-full py-3.5 px-4 rounded-xl font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 ${
                      isRecommended
                        ? "bg-gradient-to-r from-cyan-400 to-[#168BDE] hover:from-cyan-300 hover:to-[#0F6EB2] text-slate-950 shadow-lg shadow-cyan-500/25 font-black"
                        : "bg-[#082B55] hover:bg-[#168BDE] text-white shadow-md shadow-slate-900/10"
                    }`}
                  >
                    <span>Get {plan.speedDisplay} Connection</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* View All Plans Link */}
        <div className="mt-14 text-center">
          <Link
            href="/plans"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-sm transition-colors border border-slate-200"
          >
            <span>Compare All Plans & Detailed Specifications</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      <NewConnectionModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        preselectedPlan={selectedPlan}
      />
    </section>
  );
}
