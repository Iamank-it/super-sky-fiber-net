// Interactive Service Availability Checker Component
"use client";

import React, { useState } from "react";
import Link from "next/link";
import { defaultLocalities } from "@/config/coverage";
import { siteConfig } from "@/config/site";
import {
  MapPin,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  Loader2,
  ShieldCheck,
  MessageCircle,
} from "lucide-react";

export function CoverageCheckerSection() {
  const [formData, setFormData] = useState({
    customerName: "",
    mobileNumber: "",
    locality: "",
    pinCode: "831001",
    address: "",
    website_url: "", // honeypot
  });

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{
    success: boolean;
    status: string;
    statusLabel: string;
    message: string;
    locality: string;
    canInstantBook: boolean;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const res = await fetch("/api/availability", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setResult(data);
      } else {
        setError(data.error || "Unable to check coverage right now. Please try again.");
      }
    } catch {
      setError("Network connection issue. Please call +91 94711 26747 for instant check.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="coverage" className="py-24 bg-gradient-to-b from-white to-sky-50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Context & Verified Areas (6 Cols) */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-sky-100 text-[#082B55] text-xs font-bold uppercase tracking-wider">
              <MapPin className="w-3.5 h-3.5 text-[#168BDE]" />
              <span>Jamshedpur Coverage Feasibility</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#082B55] tracking-tight">
              Is SSFN Available in Your Area?
            </h2>

            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              We are actively expanding optical fiber lines across Jamshedpur. Enter your locality
              and contact information to verify line feasibility and get same-day installation.
            </p>

            {/* Quick List of Active Localities */}
            <div className="space-y-3 pt-2">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Key Active & Expanding Sectors:
              </div>
              <div className="flex flex-wrap gap-2">
                {[
                  { name: "Sakchi", status: "Active" },
                  { name: "Bistupur", status: "Active" },
                  { name: "Kadma", status: "Active" },
                  { name: "Sonari", status: "Active" },
                  { name: "Telco Colony", status: "Active" },
                  { name: "Mango", status: "Expanding" },
                  { name: "Adityapur", status: "Expanding" },
                  { name: "Jugsalai", status: "Expanding" },
                  { name: "Golmuri", status: "Rollout" },
                  { name: "Baridih", status: "Rollout" },
                ].map((loc, idx) => (
                  <span
                    key={idx}
                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-bold border ${
                      loc.status === "Active"
                        ? "bg-emerald-50 text-emerald-800 border-emerald-200"
                        : "bg-sky-50 text-[#082B55] border-sky-200"
                    }`}
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${
                        loc.status === "Active" ? "bg-emerald-500" : "bg-sky-500"
                      }`}
                    ></span>
                    <span>{loc.name}</span>
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-2">
              <Link
                href="/coverage"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#168BDE] hover:text-[#082B55] transition-colors"
              >
                <span>View Complete Jamshedpur Locality Directory</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Right Column: Interactive Checker Form (6 Cols) */}
          <div className="lg:col-span-6">
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-200/90 relative">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div>
                  <h3 className="text-lg font-bold text-[#082B55]">Instant Feasibility Check</h3>
                  <p className="text-xs text-slate-500">
                    Get confirmation of fiber line drop feasibility
                  </p>
                </div>
                <div className="w-10 h-10 rounded-2xl bg-sky-50 text-[#168BDE] flex items-center justify-center">
                  <MapPin className="w-5 h-5" />
                </div>
              </div>

              {result ? (
                <div className="py-6 space-y-4 animate-in fade-in">
                  <div
                    className={`p-4 rounded-2xl border flex items-start gap-3 ${
                      result.status === "AVAILABLE"
                        ? "bg-emerald-50 border-emerald-200 text-emerald-900"
                        : result.status === "LIMITED"
                        ? "bg-amber-50 border-amber-200 text-amber-900"
                        : "bg-blue-50 border-blue-200 text-blue-900"
                    }`}
                  >
                    <CheckCircle2
                      className={`w-6 h-6 flex-shrink-0 mt-0.5 ${
                        result.status === "AVAILABLE"
                          ? "text-emerald-600"
                          : result.status === "LIMITED"
                          ? "text-amber-600"
                          : "text-blue-600"
                      }`}
                    />
                    <div>
                      <div className="font-extrabold text-sm sm:text-base">
                        {result.statusLabel} ({result.locality})
                      </div>
                      <p className="text-xs mt-1 leading-relaxed">{result.message}</p>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 pt-2">
                    <a
                      href={siteConfig.contact.whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#25D366] hover:bg-[#20BD5A] text-white text-xs font-bold transition-all shadow-sm"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>Confirm on WhatsApp</span>
                    </a>

                    <button
                      onClick={() => setResult(null)}
                      className="w-full py-3 px-4 rounded-xl border border-slate-200 text-slate-700 text-xs font-bold hover:bg-slate-50 transition-colors"
                    >
                      Check Another Locality
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="mt-5 space-y-4">
                  {error && (
                    <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 flex-shrink-0" />
                      <span>{error}</span>
                    </div>
                  )}

                  {/* Honeypot hidden input */}
                  <input
                    type="text"
                    name="website_url"
                    value={formData.website_url}
                    onChange={(e) => setFormData({ ...formData, website_url: e.target.value })}
                    className="hidden"
                    tabIndex={-1}
                    autoComplete="off"
                  />

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Your Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Ankit Verma"
                        value={formData.customerName}
                        onChange={(e) =>
                          setFormData({ ...formData, customerName: e.target.value })
                        }
                        className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#168BDE]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Mobile Number <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        required
                        maxLength={10}
                        placeholder="10-digit number"
                        value={formData.mobileNumber}
                        onChange={(e) =>
                          setFormData({ ...formData, mobileNumber: e.target.value })
                        }
                        className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#168BDE]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Locality / Colony <span className="text-red-500">*</span>
                      </label>
                      <select
                        required
                        value={formData.locality}
                        onChange={(e) =>
                          setFormData({ ...formData, locality: e.target.value })
                        }
                        className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#168BDE] bg-white"
                      >
                        <option value="">Select Jamshedpur locality...</option>
                        {defaultLocalities.map((loc) => (
                          <option key={loc.id} value={loc.name}>
                            {loc.name}
                          </option>
                        ))}
                        <option value="Other Area">Other Jamshedpur Area</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        PIN Code <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        maxLength={6}
                        placeholder="e.g. 831001"
                        value={formData.pinCode}
                        onChange={(e) =>
                          setFormData({ ...formData, pinCode: e.target.value })
                        }
                        className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#168BDE]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Street / Apartment / House No. (Optional)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Near Kalimati Road, House #42"
                      value={formData.address}
                      onChange={(e) =>
                        setFormData({ ...formData, address: e.target.value })
                      }
                      className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#168BDE]"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-[#082B55] to-[#168BDE] hover:from-[#061F3D] hover:to-[#1272B7] text-white font-bold text-sm tracking-wide shadow-md shadow-sky-500/20 transition-all flex items-center justify-center gap-2 disabled:opacity-70"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Verifying Optical Drop Feasibility...</span>
                      </>
                    ) : (
                      <span>Check Service Availability</span>
                    )}
                  </button>

                  <div className="text-[11px] text-slate-500 text-center flex items-center justify-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Your contact details are kept secure and used only for feasibility verification.</span>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
