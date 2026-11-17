// Transparent Market Benchmark Comparison Component
// Compares SSFN plans with verified BSNL Bharat Fiber Jharkhand Circle tariffs
"use client";

import React, { useState } from "react";
import {
  Check,
  Zap,
  Info,
  ArrowRight,
  TrendingDown,
  Building2,
  Clock,
} from "lucide-react";
import { NewConnectionModal } from "@/components/layout/NewConnectionModal";

interface BenchmarkComparisonProps {
  lastVerifiedAt?: string;
}

export function MarketBenchmarkComparison({
  lastVerifiedAt = "17 Nov 2026",
}: BenchmarkComparisonProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState("");

  const comparisonRows = [
    {
      speedTier: "50 Mbps Tier",
      ssfn: {
        planName: "SSFN Starter",
        speed: "50 Mbps Symmetric",
        price: "₹399 / mo",
        numericPrice: 399,
        router: "Standard Wi-Fi Router Included",
        installation: "FREE on 3+ Months",
        support: "Same-day 4-8 hr local field team",
      },
      bsnl: {
        planName: "Fiber Basic Neo",
        speed: "Up to 50 Mbps",
        price: "₹449 / mo",
        numericPrice: 449,
        router: "ONT device charges / deposit extra",
        installation: "₹500 standard charge",
        support: "Centralized exchange queue",
      },
      monthlySavings: "Save ₹50/mo",
      annualSavings: "₹600/yr",
    },
    {
      speedTier: "100 Mbps Tier (Popular)",
      highlight: true,
      ssfn: {
        planName: "SSFN Turbo Home",
        speed: "100 Mbps Equal Speed",
        price: "₹449 / mo (Promo)",
        numericPrice: 449,
        router: "Dual-Band 5 GHz Gigabit Router Included",
        installation: "100% Zero Cost",
        support: "Priority local Jamshedpur response",
      },
      bsnl: {
        planName: "Fiber Basic Plus",
        speed: "Up to 100 Mbps",
        price: "₹599 / mo",
        numericPrice: 599,
        router: "Device security deposit applies",
        installation: "₹500 standard charge",
        support: "Standard telephone exchange ticketing",
      },
      monthlySavings: "Save ₹150/mo",
      annualSavings: "₹1,800/yr + Free Gigabit Router",
    },
    {
      speedTier: "200 Mbps Tier",
      ssfn: {
        planName: "SSFN Ultra Stream",
        speed: "200 Mbps Low-Latency",
        price: "₹649 / mo",
        numericPrice: 649,
        router: "High-Throughput Dual-Band Router Included",
        installation: "100% Zero Cost",
        support: "Dedicated Jamshedpur line technician",
      },
      bsnl: {
        planName: "Fiber SuperStar Premium",
        speed: "Up to 200 Mbps",
        price: "₹999 / mo",
        numericPrice: 999,
        router: "Device charges extra",
        installation: "₹500 standard charge",
        support: "Standard grievance ticketing",
      },
      monthlySavings: "Save ₹350/mo",
      annualSavings: "₹4,200/yr",
    },
  ];

  const handleOpenPlan = (name: string) => {
    setSelectedPlan(name);
    setModalOpen(true);
  };

  return (
    <section className="py-20 bg-gradient-to-b from-slate-50 to-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider">
            <TrendingDown className="w-3.5 h-3.5" />
            <span>Transparent Market Comparison</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#082B55] tracking-tight">
            Compare SSFN with Market Broadband Plans
          </h2>

          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            See how Super Sky Fiber Net compares against standard public benchmark plans in the
            Jharkhand Circle. Compare speeds, equipment inclusions, and real local support.
          </p>

          {/* Verification Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-2xl bg-slate-100 border border-slate-200 text-xs text-slate-600 font-medium">
            <Info className="w-4 h-4 text-[#168BDE]" />
            <span>
              Reference tariff: <strong>BSNL Bharat Fiber, Jharkhand Circle</strong>
            </span>
            <span className="text-slate-400">•</span>
            <span>
              Last verified: <strong>{lastVerifiedAt}</strong>
            </span>
          </div>
        </div>

        {/* Comparison Table for Large Screens / Cards for Small */}
        <div className="mt-12 overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[700px] bg-white rounded-3xl overflow-hidden shadow-lg border border-slate-200">
            <thead>
              <tr className="bg-[#082B55] text-white text-xs sm:text-sm uppercase tracking-wider">
                <th className="p-4 sm:p-5 font-bold w-1/4">Speed Tier & Savings</th>
                <th className="p-4 sm:p-5 font-bold w-3/8 bg-[#0F3563] text-cyan-300">
                  <div className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-cyan-300" />
                    <span>Super Sky Fiber Net (SSFN)</span>
                  </div>
                </th>
                <th className="p-4 sm:p-5 font-bold w-3/8 text-slate-300">
                  <div className="flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-slate-400" />
                    <span>BSNL Bharat Fiber (Jharkhand)</span>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs sm:text-sm">
              {comparisonRows.map((row, idx) => (
                <tr
                  key={idx}
                  className={`transition-colors ${
                    row.highlight
                      ? "bg-sky-50/60 font-medium hover:bg-sky-50"
                      : "hover:bg-slate-50/80"
                  }`}
                >
                  {/* Speed & Savings Column */}
                  <td className="p-4 sm:p-5 align-top">
                    <div className="font-extrabold text-slate-900 text-sm sm:text-base">
                      {row.speedTier}
                    </div>
                    <div className="mt-1 inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
                      {row.monthlySavings}
                    </div>
                    <div className="text-[11px] text-slate-500 mt-1 font-semibold">
                      Annual Savings: {row.annualSavings}
                    </div>
                  </td>

                  {/* SSFN Plan Details */}
                  <td className="p-4 sm:p-5 align-top bg-sky-50/40 border-l border-r border-sky-100 space-y-2">
                    <div className="flex items-baseline justify-between">
                      <span className="font-bold text-[#082B55] text-base">{row.ssfn.planName}</span>
                      <span className="font-black text-[#168BDE] text-base">{row.ssfn.price}</span>
                    </div>

                    <div className="space-y-1 text-xs text-slate-700">
                      <div className="flex items-center gap-1.5 text-emerald-700 font-semibold">
                        <Check className="w-3.5 h-3.5 stroke-[3] text-emerald-600" />
                        <span>{row.ssfn.speed}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-slate-600">
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span>{row.ssfn.router}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-slate-600">
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span>{row.ssfn.installation}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-sky-800 font-medium">
                        <Clock className="w-3.5 h-3.5 text-sky-600" />
                        <span>{row.ssfn.support}</span>
                      </div>
                    </div>

                    <button
                      onClick={() => handleOpenPlan(row.ssfn.planName)}
                      className="mt-3 w-full py-2 px-3 rounded-xl bg-[#082B55] hover:bg-[#168BDE] text-white text-xs font-bold tracking-wide transition-colors flex items-center justify-center gap-1.5"
                    >
                      <span>Choose SSFN</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </td>

                  {/* BSNL Reference Benchmark */}
                  <td className="p-4 sm:p-5 align-top space-y-2 text-slate-600">
                    <div className="flex items-baseline justify-between">
                      <span className="font-bold text-slate-800 text-base">{row.bsnl.planName}</span>
                      <span className="font-bold text-slate-700 text-base">{row.bsnl.price}</span>
                    </div>

                    <div className="space-y-1 text-xs text-slate-500">
                      <div>• {row.bsnl.speed}</div>
                      <div>• {row.bsnl.router}</div>
                      <div>• {row.bsnl.installation}</div>
                      <div>• {row.bsnl.support}</div>
                    </div>

                    <div className="pt-2 text-[11px] text-slate-400 italic">
                      Official Reference Benchmark (JH Circle)
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Disclaimer Note */}
        <div className="mt-6 p-4 rounded-2xl bg-slate-100 text-slate-500 text-xs leading-relaxed border border-slate-200">
          <strong>Important Notice:</strong> Super Sky Fiber Net is an independent private broadband
          service provider. BSNL tariffs shown above represent verified public market benchmarks for
          Jharkhand Circle (exclusive of 18% GST). BSNL is a registered trademark of Bharat Sanchar
          Nigam Limited. SSFN pricing is configured independently based on local fiber infrastructure
          costs and customer support quality.
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
