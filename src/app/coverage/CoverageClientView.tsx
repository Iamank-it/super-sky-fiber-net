"use client";

import React, { useState } from "react";
import { LocalityItem, coverageStatusConfig } from "@/config/coverage";
import { NewConnectionModal } from "@/components/layout/NewConnectionModal";
import { CoverageCheckerSection } from "@/components/homepage/CoverageCheckerSection";
import {
  MapPin,
  Search,
  Clock,
  Wifi,
  Filter,
} from "lucide-react";

interface CoverageClientViewProps {
  localities: LocalityItem[];
}

export function CoverageClientView({ localities }: CoverageClientViewProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("ALL");
  const [modalOpen, setModalOpen] = useState(false);

  const filtered = localities.filter((loc) => {
    const matchesSearch =
      loc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      loc.pinCode.includes(searchTerm) ||
      (loc.landmark && loc.landmark.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesStatus = statusFilter === "ALL" || loc.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const handleBookLocality = (_localityName: string) => {
    setModalOpen(true);
  };

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Hero Banner */}
      <section className="bg-gradient-to-b from-[#082B55] to-[#0A3366] text-white py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/10 backdrop-blur-md text-cyan-300 text-xs font-bold uppercase tracking-wider">
            <MapPin className="w-3.5 h-3.5" />
            <span>Serviceable Locations Directory</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            SSFN Fiber Coverage in Jamshedpur
          </h1>

          <p className="text-slate-200 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Verify active optical fiber serviceability across residential colonies, apartments,
            and commercial markets in Jamshedpur and surrounding sectors.
          </p>

          {/* Search Box */}
          <div className="max-w-xl mx-auto mt-6 pt-2">
            <div className="relative">
              <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by locality name (e.g. Sakchi, Kadma) or PIN (e.g. 831001)..."
                className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-white text-slate-800 placeholder-slate-400 text-sm font-medium shadow-xl focus:outline-none focus:ring-4 focus:ring-cyan-300/30 border border-slate-200"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Main Filter & Grid Container */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Status Filter Tabs */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-8 border-b border-slate-200">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-slate-500" />
            <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              Filter by Status:
            </span>
          </div>

          <div className="flex flex-wrap gap-2">
            {[
              { id: "ALL", label: `All Areas (${localities.length})` },
              {
                id: "AVAILABLE",
                label: `Service Available (${localities.filter((l) => l.status === "AVAILABLE").length})`,
              },
              {
                id: "LIMITED",
                label: `Limited Availability (${localities.filter((l) => l.status === "LIMITED").length})`,
              },
              {
                id: "COMING_SOON",
                label: `Rollout in Progress (${localities.filter((l) => l.status === "COMING_SOON").length})`,
              },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setStatusFilter(tab.id)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  statusFilter === tab.id
                    ? "bg-[#082B55] text-white shadow-sm"
                    : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-100"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Localities Cards Grid */}
        {filtered.length === 0 ? (
          <div className="py-20 text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-slate-200 text-slate-500 flex items-center justify-center mx-auto">
              <Search className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-800">No matching locality found</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Don&apos;t see your specific apartment or colony? We may still be able to extend an optical
              drop line to your premises.
            </p>
            <button
              onClick={() => handleBookLocality(searchTerm || "Jamshedpur Area")}
              className="px-5 py-2.5 rounded-xl bg-[#082B55] text-white font-bold text-xs hover:bg-[#168BDE] transition-colors"
            >
              Request Custom Feasibility Check
            </button>
          </div>
        ) : (
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((loc) => {
              const meta = coverageStatusConfig[loc.status] || coverageStatusConfig.AVAILABLE;

              return (
                <div
                  key={loc.id}
                  className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-xl font-extrabold text-[#082B55] tracking-tight">
                          {loc.name}
                        </h3>
                        <div className="text-xs text-slate-500 font-mono mt-0.5">
                          PIN: {loc.pinCode} • Jamshedpur
                        </div>
                      </div>

                      <span
                        className={`px-3 py-1 rounded-full text-xs font-bold border ${meta.badgeClass}`}
                      >
                        {meta.label}
                      </span>
                    </div>

                    {loc.landmark && (
                      <div className="text-xs text-slate-600 flex items-start gap-1.5 pt-1">
                        <MapPin className="w-3.5 h-3.5 text-cyan-600 flex-shrink-0 mt-0.5" />
                        <span>{loc.landmark}</span>
                      </div>
                    )}

                    <p className="text-xs text-slate-600 leading-relaxed pt-1">
                      {loc.description}
                    </p>

                    <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center gap-2 text-[11px] text-slate-700">
                      <Clock className="w-3.5 h-3.5 text-[#168BDE]" />
                      <span>
                        Installation Window: <strong>{loc.avgInstallHours}</strong>
                      </span>
                    </div>
                  </div>

                  <div className="pt-5 mt-4 border-t border-slate-100 flex items-center justify-between gap-3">
                    <button
                      onClick={() => handleBookLocality(loc.name)}
                      className="w-full py-2.5 px-4 rounded-xl bg-[#082B55] hover:bg-[#168BDE] text-white font-bold text-xs transition-colors flex items-center justify-center gap-2"
                    >
                      <Wifi className="w-3.5 h-3.5 text-cyan-300" />
                      <span>
                        {loc.status === "AVAILABLE"
                          ? "Book Connection"
                          : loc.status === "LIMITED"
                          ? "Check Street Feasibility"
                          : "Pre-Register Address"}
                      </span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* Interactive Verification Form */}
      <CoverageCheckerSection />

      <NewConnectionModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        preselectedPlan=""
      />
    </div>
  );
}
