// Interactive New Connection Application Modal
"use client";

import React, { useState, useEffect } from "react";
import { siteConfig } from "@/config/site";
import { defaultLocalities } from "@/config/coverage";
import { X, CheckCircle2, AlertCircle, Loader2, Phone, Sparkles } from "lucide-react";

interface NewConnectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedPlan?: string;
}

export function NewConnectionModal({
  isOpen,
  onClose,
  preselectedPlan = "",
}: NewConnectionModalProps) {
  const [formData, setFormData] = useState({
    customerName: "",
    mobileNumber: "",
    email: "",
    locality: "",
    pinCode: "831001",
    address: "",
    selectedPlan: preselectedPlan,
    message: "",
    website_url: "", // honeypot
  });

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<"IDLE" | "SUCCESS" | "ERROR">("IDLE");
  const [feedbackMessage, setFeedbackMessage] = useState("");

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus("IDLE");
    setFeedbackMessage("");

    try {
      const res = await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setStatus("SUCCESS");
        setFeedbackMessage(data.message || "Enquiry submitted successfully!");
      } else {
        setStatus("ERROR");
        setFeedbackMessage(data.error || "Unable to submit enquiry. Please try again.");
      }
    } catch {
      setStatus("ERROR");
      setFeedbackMessage("Network error. Please call +91 94711 26747 for immediate assistance.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-sky-100 overflow-hidden">
        {/* Header Ribbon */}
        <div className="bg-gradient-to-r from-[#082B55] via-[#168BDE] to-[#082B55] p-6 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 text-white/80 hover:text-white hover:bg-white/10 p-1.5 rounded-full transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 text-xs font-semibold text-cyan-200 mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Fast Jamshedpur Connection</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold tracking-tight">Get New SSFN Fiber Connection</h3>
          <p className="text-sm text-sky-100 mt-1">
            Same-day installation feasible across major Jamshedpur localities.
          </p>
        </div>

        {/* Modal Body */}
        <div className="p-6 max-h-[80vh] overflow-y-auto">
          {status === "SUCCESS" ? (
            <div className="py-8 text-center space-y-4">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h4 className="text-xl font-bold text-slate-900">Request Received!</h4>
              <p className="text-slate-600 text-sm max-w-sm mx-auto">{feedbackMessage}</p>
              <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-center">
                <a
                  href={siteConfig.contact.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20BD5A] text-white px-5 py-2.5 rounded-xl font-semibold text-sm transition-all"
                >
                  Message us on WhatsApp
                </a>
                <button
                  onClick={onClose}
                  className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 font-semibold text-sm transition-all"
                >
                  Close Window
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {status === "ERROR" && (
                <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 flex items-start gap-2.5 text-red-700 text-xs sm:text-sm">
                  <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5 text-red-500" />
                  <span>{feedbackMessage}</span>
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
                    Your Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Rahul Sharma"
                    value={formData.customerName}
                    onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#168BDE] focus:border-transparent"
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
                    placeholder="10-digit number (e.g. 9471126747)"
                    value={formData.mobileNumber}
                    onChange={(e) => setFormData({ ...formData, mobileNumber: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#168BDE] focus:border-transparent"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Jamshedpur Locality <span className="text-red-500">*</span>
                  </label>
                  <select
                    required
                    value={formData.locality}
                    onChange={(e) => setFormData({ ...formData, locality: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#168BDE] focus:border-transparent bg-white"
                  >
                    <option value="">Select your area...</option>
                    {defaultLocalities.map((loc) => (
                      <option key={loc.id} value={loc.name}>
                        {loc.name} ({loc.status === "AVAILABLE" ? "Active" : loc.status})
                      </option>
                    ))}
                    <option value="Other Area">Other Area in Jamshedpur</option>
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
                    onChange={(e) => setFormData({ ...formData, pinCode: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#168BDE] focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Preferred Broadband Plan
                </label>
                <select
                  value={formData.selectedPlan}
                  onChange={(e) => setFormData({ ...formData, selectedPlan: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#168BDE] focus:border-transparent bg-white"
                >
                  <option value="">Need guidance choosing best plan</option>
                  <option value="SSFN Starter 50 Mbps (₹399/mo)">SSFN Starter — 50 Mbps (₹399/mo)</option>
                  <option value="SSFN Turbo 100 Mbps (₹449/mo - Recommended)">
                    SSFN Turbo — 100 Mbps (₹449/mo - Recommended)
                  </option>
                  <option value="SSFN Ultra 200 Mbps (₹649/mo)">SSFN Ultra — 200 Mbps (₹649/mo)</option>
                  <option value="SSFN Pro 300 Mbps (₹899/mo)">SSFN Pro — 300 Mbps (₹899/mo)</option>
                  <option value="SSFN Giga 500 Mbps (₹1299/mo)">SSFN Giga — 500 Mbps (₹1,299/mo)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Installation Address / Colony Name (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Flat 302, Green Valley Apartments, Near Market"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#168BDE] focus:border-transparent"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-[#082B55] to-[#168BDE] hover:from-[#061F3D] hover:to-[#1272B7] text-white font-bold text-sm tracking-wide shadow-md shadow-sky-500/20 transition-all flex items-center justify-center gap-2 disabled:opacity-70"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Processing Connection Request...</span>
                  </>
                ) : (
                  <span>Submit Connection Request</span>
                )}
              </button>

              <div className="pt-2 text-center">
                <span className="text-xs text-slate-500">
                  Prefer direct phone call?{" "}
                  <a
                    href={siteConfig.contact.phoneTel}
                    className="text-[#168BDE] font-semibold hover:underline inline-flex items-center gap-1"
                  >
                    <Phone className="w-3 h-3" />
                    +91 94711 26747
                  </a>
                </span>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
