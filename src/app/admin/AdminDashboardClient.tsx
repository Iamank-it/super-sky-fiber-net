"use client";

import React, { useState, useEffect, useCallback } from "react";
import {
  Lock,
  LogOut,
  RefreshCw,
  Users,
  CheckCircle2,
  AlertCircle,
  MapPin,
  Search,
  DollarSign,
  Activity,
} from "lucide-react";
import { STATUS_COLORS } from "@/lib/constants";

interface EnquiryItem {
  id: string;
  customerName: string;
  mobileNumber: string;
  email?: string;
  locality: string;
  pinCode: string;
  enquiryType: string;
  selectedPlan?: string;
  status: string;
  createdAt: string;
}

interface BsnlPlanItem {
  id: string;
  name: string;
  speed: string;
  monthlyPrice: number;
  dataAllowance: string;
  fupSpeed?: string;
  circle: string;
  sourceLastVerifiedAt: string;
}

interface SyncLogItem {
  id: string;
  status: string;
  plansFound: number;
  plansAdded: number;
  plansUpdated: number;
  startedAt: string;
}

interface SsfnPlanItem {
  id: string;
  name: string;
  speedDisplay: string;
  dataAllowance: string;
  monthlyPrice: number;
  effectivePrice: number;
  recommended: boolean;
  isActive: boolean;
}

interface CoverageAreaItem {
  id: string;
  localityName: string;
  pinCode: string;
  status: string;
  landmark?: string;
}

export function AdminDashboardClient() {
  const [adminKey, setAdminKey] = useState<string>("");
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [authError, setAuthError] = useState<string>("");

  const [activeTab, setActiveTab] = useState<
    "OVERVIEW" | "ENQUIRIES" | "BSNL_SYNC" | "PLANS" | "COVERAGE"
  >("OVERVIEW");

  // Data states
  const [enquiries, setEnquiries] = useState<EnquiryItem[]>([]);
  const [enquiryCounts, setEnquiryCounts] = useState<{ all?: number; new?: number }>({ all: 0, new: 0 });
  const [enquiryFilter, setEnquiryFilter] = useState<string>("ALL");
  const [enquirySearch, setEnquirySearch] = useState<string>("");

  const [syncLogs, setSyncLogs] = useState<SyncLogItem[]>([]);
  const [bsnlPlans, setBsnlPlans] = useState<BsnlPlanItem[]>([]);
  const [isSyncing, setIsSyncing] = useState<boolean>(false);
  const [syncFeedback, setSyncFeedback] = useState<string>("");

  const [ssfnPlans, setSsfnPlans] = useState<SsfnPlanItem[]>([]);
  const [coverageAreas, setCoverageAreas] = useState<CoverageAreaItem[]>([]);

  const [loading, setLoading] = useState<boolean>(false);

  const loadAllData = useCallback(async (key: string) => {
    setLoading(true);
    try {
      const enqRes = await fetch(`/api/admin/enquiries?status=${enquiryFilter}&q=${enquirySearch}`, {
        headers: { Authorization: `Bearer ${key}` },
      });
      if (enqRes.ok) {
        const enqData = await enqRes.json();
        setEnquiries(enqData.enquiries || []);
        setEnquiryCounts(enqData.counts || {});
      }

      const syncRes = await fetch("/api/admin/plan-sync", {
        headers: { Authorization: `Bearer ${key}` },
      });
      if (syncRes.ok) {
        const syncData = await syncRes.json();
        setSyncLogs(syncData.logs || []);
        setBsnlPlans(syncData.activePlans || []);
      }

      const plansRes = await fetch("/api/admin/plans", {
        headers: { Authorization: `Bearer ${key}` },
      });
      if (plansRes.ok) {
        const plansData = await plansRes.json();
        setSsfnPlans(plansData.plans || []);
      }

      const covRes = await fetch("/api/admin/coverage", {
        headers: { Authorization: `Bearer ${key}` },
      });
      if (covRes.ok) {
        const covData = await covRes.json();
        setCoverageAreas(covData.areas || []);
      }
    } catch (err) {
      console.error("Error loading admin data:", err);
    } finally {
      setLoading(false);
    }
  }, [enquiryFilter, enquirySearch]);

  const verifyKey = useCallback(async (key: string) => {
    setLoading(true);
    setAuthError("");
    try {
      const res = await fetch("/api/admin/enquiries?status=ALL", {
        headers: { Authorization: `Bearer ${key}` },
      });
      if (res.ok) {
        setIsAuthenticated(true);
        localStorage.setItem("ssfn_admin_key", key);
        loadAllData(key);
      } else {
        setIsAuthenticated(false);
        setAuthError("Invalid administrative key. Please try again.");
      }
    } catch {
      setAuthError("Failed to connect to administrative server.");
    } finally {
      setLoading(false);
    }
  }, [loadAllData]);

  // Check saved admin key in localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("ssfn_admin_key");
    if (saved) {
      setTimeout(() => {
        verifyKey(saved);
      }, 0);
    }
  }, [verifyKey]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!adminKey.trim()) return;
    verifyKey(adminKey.trim());
  };

  const handleLogout = () => {
    localStorage.removeItem("ssfn_admin_key");
    setIsAuthenticated(false);
    setAdminKey("");
  };

  const handleTriggerSync = async () => {
    setIsSyncing(true);
    setSyncFeedback("");
    try {
      const res = await fetch("/api/admin/plan-sync", {
        method: "POST",
        headers: { Authorization: `Bearer ${adminKey}` },
      });
      const data = await res.json();
      setSyncFeedback(data.message || "BSNL synchronization completed.");
      const syncRes = await fetch("/api/admin/plan-sync", {
        headers: { Authorization: `Bearer ${adminKey}` },
      });
      if (syncRes.ok) {
        const syncData = await syncRes.json();
        setSyncLogs(syncData.logs || []);
        setBsnlPlans(syncData.activePlans || []);
      }
    } catch {
      setSyncFeedback("Sync request failed. Using preserved snapshot.");
    } finally {
      setIsSyncing(false);
    }
  };

  const handleUpdateEnquiryStatus = async (id: string, newStatus: string) => {
    try {
      const res = await fetch("/api/admin/enquiries", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${adminKey}`,
        },
        body: JSON.stringify({ id, status: newStatus }),
      });
      if (res.ok) {
        setEnquiries((prev) =>
          prev.map((item) => (item.id === id ? { ...item, status: newStatus } : item))
        );
      }
    } catch (err) {
      console.error("Failed to update enquiry status:", err);
    }
  };

  const handleUpdatePlan = async (id: string, updates: Record<string, string | number | boolean>) => {
    try {
      const res = await fetch("/api/admin/plans", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${adminKey}`,
        },
        body: JSON.stringify({ id, ...updates }),
      });
      if (res.ok) {
        const data = await res.json();
        setSsfnPlans((prev) =>
          prev.map((item) => (item.id === id ? { ...item, ...data.plan } : item))
        );
      }
    } catch (err) {
      console.error("Failed to update plan:", err);
    }
  };

  const handleUpdateCoverage = async (id: string, newStatus: string) => {
    try {
      const res = await fetch("/api/admin/coverage", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${adminKey}`,
        },
        body: JSON.stringify({ id, status: newStatus }),
      });
      if (res.ok) {
        setCoverageAreas((prev) =>
          prev.map((item) => (item.id === id ? { ...item, status: newStatus } : item))
        );
      }
    } catch (err) {
      console.error("Failed to update coverage:", err);
    }
  };

  // 1. Auth Gate View
  if (!isAuthenticated) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center p-4 bg-slate-50">
        <div className="w-full max-w-md bg-white rounded-3xl shadow-xl border border-slate-200 p-8 space-y-6">
          <div className="w-12 h-12 rounded-2xl bg-[#082B55] text-cyan-300 flex items-center justify-center mx-auto shadow-md">
            <Lock className="w-6 h-6" />
          </div>

          <div className="text-center space-y-1">
            <h1 className="text-2xl font-extrabold text-[#082B55]">SSFN Admin Portal</h1>
            <p className="text-xs text-slate-500">
              Jamshedpur Broadband Operations & Plan Management
            </p>
          </div>

          {authError && (
            <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{authError}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Admin Secret Key
              </label>
              <input
                type="password"
                required
                value={adminKey}
                onChange={(e) => setAdminKey(e.target.value)}
                placeholder="Enter administrative passcode..."
                className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#168BDE]"
              />
              <p className="text-[11px] text-slate-400 mt-1">
                Default local key: <code className="bg-slate-100 px-1 py-0.5 rounded">ssfn-jamshedpur-admin-2026</code>
              </p>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 px-4 rounded-xl bg-[#082B55] hover:bg-[#168BDE] text-white font-bold text-xs uppercase tracking-wider transition-all disabled:opacity-70 shadow-md"
            >
              {loading ? "Authenticating..." : "Access Admin Portal"}
            </button>
          </form>
        </div>
      </div>
    );
  }

  // 2. Authenticated Admin Dashboard
  return (
    <div className="min-h-screen bg-slate-100">
      <header className="bg-[#082B55] text-white py-4 px-4 sm:px-6 lg:px-8 border-b border-white/10 sticky top-0 z-30 shadow-md">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="font-extrabold text-base tracking-tight text-white">
              SSFN ADMIN
            </span>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-cyan-400/20 text-cyan-300 font-mono border border-cyan-400/30">
              JAMSHEDPUR OPERATIONS
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => loadAllData(adminKey)}
              disabled={loading}
              className="p-2 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs transition-colors flex items-center gap-1.5"
              title="Refresh Data"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
              <span className="hidden sm:inline">Refresh</span>
            </button>

            <button
              onClick={handleLogout}
              className="px-3 py-1.5 rounded-xl bg-red-500/20 hover:bg-red-500/30 text-red-200 text-xs font-semibold transition-colors flex items-center gap-1"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </header>

      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex overflow-x-auto gap-2 py-2">
          {[
            { id: "OVERVIEW", label: "Overview KPIs", icon: Activity },
            { id: "ENQUIRIES", label: `Customer Enquiries (${enquiryCounts.all || 0})`, icon: Users },
            { id: "BSNL_SYNC", label: `BSNL Sync Engine (${bsnlPlans.length} Plans)`, icon: RefreshCw },
            { id: "PLANS", label: `SSFN Plans (${ssfnPlans.length})`, icon: DollarSign },
            { id: "COVERAGE", label: `Coverage Localities (${coverageAreas.length})`, icon: MapPin },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                  isActive
                    ? "bg-[#082B55] text-white shadow-sm"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* TAB 1: OVERVIEW */}
        {activeTab === "OVERVIEW" && (
          <div className="space-y-8 animate-in fade-in">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
                <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Total Customer Enquiries
                </div>
                <div className="text-3xl font-black text-[#082B55] mt-2">
                  {enquiryCounts.all || 0}
                </div>
                <div className="text-xs text-slate-500 mt-1">
                  New / Unaddressed: <strong>{enquiryCounts.new || 0}</strong>
                </div>
              </div>

              <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
                <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  BSNL Jharkhand Benchmarks
                </div>
                <div className="text-3xl font-black text-[#168BDE] mt-2">
                  {bsnlPlans.length} Plans
                </div>
                <div className="text-xs text-slate-500 mt-1">
                  Last Sync: <strong>{syncLogs[0]?.status || "SUCCESS"}</strong>
                </div>
              </div>

              <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
                <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Active SSFN Broadband Plans
                </div>
                <div className="text-3xl font-black text-emerald-600 mt-2">
                  {ssfnPlans.filter((p) => p.isActive).length} Plans
                </div>
                <div className="text-xs text-slate-500 mt-1">
                  Speeds from 50 to 500 Mbps
                </div>
              </div>

              <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
                <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Jamshedpur Localities
                </div>
                <div className="text-3xl font-black text-purple-700 mt-2">
                  {coverageAreas.length} Areas
                </div>
                <div className="text-xs text-slate-500 mt-1">
                  Active FTTH: <strong>{coverageAreas.filter((c) => c.status === "AVAILABLE").length}</strong>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div className="font-bold text-[#082B55]">BSNL Sync Engine Snapshot</div>
                  <span className="text-xs font-mono text-slate-500">Auto Daily 24h</span>
                </div>

                <div className="text-xs text-slate-600 leading-relaxed">
                  Monitors official BSNL Bharat Fiber tariffs for Jharkhand Circle and updates public
                  comparison benchmarks while preserving SSFN pricing autonomy.
                </div>

                {syncFeedback && (
                  <div className="p-3 rounded-xl bg-sky-50 border border-sky-200 text-xs text-sky-800 font-medium">
                    {syncFeedback}
                  </div>
                )}

                <div className="flex items-center gap-3 pt-2">
                  <button
                    onClick={handleTriggerSync}
                    disabled={isSyncing}
                    className="px-4 py-2.5 rounded-xl bg-[#082B55] hover:bg-[#168BDE] text-white font-bold text-xs transition-colors flex items-center gap-2 disabled:opacity-70"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? "animate-spin" : ""}`} />
                    <span>{isSyncing ? "Synchronizing..." : "Trigger Manual BSNL Sync"}</span>
                  </button>

                  <button
                    onClick={() => setActiveTab("BSNL_SYNC")}
                    className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 font-bold text-xs hover:bg-slate-50 transition-colors"
                  >
                    View Sync Logs
                  </button>
                </div>
              </div>

              <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div className="font-bold text-[#082B55]">Recent Customer Enquiries</div>
                  <button
                    onClick={() => setActiveTab("ENQUIRIES")}
                    className="text-xs text-[#168BDE] font-bold hover:underline"
                  >
                    View All ({enquiries.length})
                  </button>
                </div>

                {enquiries.length === 0 ? (
                  <div className="py-6 text-center text-xs text-slate-500">
                    No enquiries recorded yet.
                  </div>
                ) : (
                  <div className="space-y-2.5">
                    {enquiries.slice(0, 4).map((enq) => (
                      <div
                        key={enq.id}
                        className="p-3 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between text-xs"
                      >
                        <div>
                          <div className="font-bold text-[#082B55]">{enq.customerName}</div>
                          <div className="text-slate-500">
                            {enq.mobileNumber} • {enq.locality} (PIN: {enq.pinCode})
                          </div>
                        </div>

                        <span
                          className={`px-2.5 py-1 rounded-full text-[10px] font-bold border ${
                            STATUS_COLORS[enq.status]?.bg || "bg-slate-50"
                          } ${STATUS_COLORS[enq.status]?.text || "text-slate-700"} ${
                            STATUS_COLORS[enq.status]?.border || "border-slate-200"
                          }`}
                        >
                          {enq.status}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: ENQUIRIES */}
        {activeTab === "ENQUIRIES" && (
          <div className="space-y-6 animate-in fade-in">
            <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto">
                {["ALL", "NEW", "CONTACTED", "IN_PROGRESS", "RESOLVED", "CLOSED"].map((st) => (
                  <button
                    key={st}
                    onClick={() => setEnquiryFilter(st)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                      enquiryFilter === st
                        ? "bg-[#082B55] text-white shadow-sm"
                        : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>

              <div className="relative w-full md:w-72">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search name, phone, locality..."
                  value={enquirySearch}
                  onChange={(e) => setEnquirySearch(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#168BDE]"
                />
              </div>
            </div>

            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold uppercase tracking-wider">
                      <th className="p-4">Customer</th>
                      <th className="p-4">Contact</th>
                      <th className="p-4">Locality / PIN</th>
                      <th className="p-4">Type / Plan</th>
                      <th className="p-4">Status Action</th>
                      <th className="p-4">Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {enquiries.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="p-8 text-center text-slate-400">
                          No matching customer enquiries found.
                        </td>
                      </tr>
                    ) : (
                      enquiries.map((enq) => (
                        <tr key={enq.id} className="hover:bg-slate-50/80 transition-colors">
                          <td className="p-4 font-bold text-[#082B55]">{enq.customerName}</td>
                          <td className="p-4">
                            <a
                              href={`tel:${enq.mobileNumber}`}
                              className="text-[#168BDE] font-semibold hover:underline"
                            >
                              {enq.mobileNumber}
                            </a>
                            {enq.email && (
                              <div className="text-slate-400 text-[10px]">{enq.email}</div>
                            )}
                          </td>
                          <td className="p-4">
                            <div className="font-semibold text-slate-800">{enq.locality}</div>
                            <div className="text-slate-400 text-[10px]">PIN: {enq.pinCode}</div>
                          </td>
                          <td className="p-4">
                            <span className="px-2 py-0.5 rounded-md bg-sky-50 text-[#082B55] font-mono text-[10px] border border-sky-100">
                              {enq.enquiryType}
                            </span>
                            {enq.selectedPlan && (
                              <div className="text-slate-500 text-[10px] mt-0.5">
                                {enq.selectedPlan}
                              </div>
                            )}
                          </td>
                          <td className="p-4">
                            <select
                              value={enq.status}
                              onChange={(e) =>
                                handleUpdateEnquiryStatus(enq.id, e.target.value)
                              }
                              className="px-2 py-1 text-xs rounded-lg border border-slate-200 font-semibold focus:outline-none focus:ring-2 focus:ring-[#168BDE] bg-white"
                            >
                              <option value="NEW">NEW</option>
                              <option value="CONTACTED">CONTACTED</option>
                              <option value="IN_PROGRESS">IN_PROGRESS</option>
                              <option value="RESOLVED">RESOLVED</option>
                              <option value="CLOSED">CLOSED</option>
                            </select>
                          </td>
                          <td className="p-4 text-slate-400 text-[11px] whitespace-nowrap">
                            {new Date(enq.createdAt).toLocaleDateString("en-IN", {
                              day: "numeric",
                              month: "short",
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: BSNL SYNC ENGINE */}
        {activeTab === "BSNL_SYNC" && (
          <div className="space-y-8 animate-in fade-in">
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="space-y-1">
                <h3 className="text-lg font-bold text-[#082B55]">
                  BSNL Dynamic Plan Synchronization Engine
                </h3>
                <p className="text-xs text-slate-500">
                  Target Circle: <strong>Jharkhand (JH)</strong> • Source: Official BSNL Bharat Fiber Portal
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={handleTriggerSync}
                  disabled={isSyncing}
                  className="px-5 py-2.5 rounded-xl bg-[#082B55] hover:bg-[#168BDE] text-white font-bold text-xs transition-colors flex items-center gap-2 shadow-sm disabled:opacity-70"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? "animate-spin" : ""}`} />
                  <span>{isSyncing ? "Synchronizing..." : "Trigger Manual Sync"}</span>
                </button>
              </div>
            </div>

            {syncFeedback && (
              <div className="p-4 rounded-2xl bg-sky-50 border border-sky-200 text-xs text-sky-800 font-medium flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-sky-600 flex-shrink-0" />
                <span>{syncFeedback}</span>
              </div>
            )}

            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div className="font-bold text-[#082B55]">Active BSNL Jharkhand Benchmark Tariffs</div>
                <span className="text-xs text-slate-500">{bsnlPlans.length} verified plans</span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold uppercase tracking-wider">
                      <th className="p-3">Plan Name</th>
                      <th className="p-3">Speed</th>
                      <th className="p-3">Price / Mo</th>
                      <th className="p-3">Data Cap</th>
                      <th className="p-3">Post-FUP</th>
                      <th className="p-3">Circle</th>
                      <th className="p-3">Verified At</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {bsnlPlans.map((bp) => (
                      <tr key={bp.id} className="hover:bg-slate-50">
                        <td className="p-3 font-bold text-[#082B55]">{bp.name}</td>
                        <td className="p-3 font-semibold text-[#168BDE]">{bp.speed}</td>
                        <td className="p-3 font-black text-slate-800">₹{bp.monthlyPrice}</td>
                        <td className="p-3 text-slate-600">{bp.dataAllowance}</td>
                        <td className="p-3 text-slate-500">{bp.fupSpeed || "4 Mbps"}</td>
                        <td className="p-3 font-mono text-[10px]">{bp.circle}</td>
                        <td className="p-3 text-slate-400 text-[11px]">
                          {new Date(bp.sourceLastVerifiedAt).toLocaleDateString("en-IN", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          })}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 space-y-4">
              <div className="font-bold text-[#082B55]">Synchronization History Logs</div>
              <div className="space-y-2">
                {syncLogs.map((log) => (
                  <div
                    key={log.id}
                    className="p-3 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between text-xs"
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className={`px-2 py-0.5 rounded-md font-mono text-[10px] font-bold ${
                          log.status === "SUCCESS"
                            ? "bg-emerald-100 text-emerald-800"
                            : log.status === "PARTIAL"
                            ? "bg-amber-100 text-amber-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {log.status}
                      </span>
                      <span className="text-slate-700 font-medium">
                        Plans Found: {log.plansFound} • Added: {log.plansAdded} • Updated: {log.plansUpdated}
                      </span>
                    </div>

                    <div className="text-slate-400 text-[11px]">
                      {new Date(log.startedAt).toLocaleString("en-IN")}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: SSFN PLANS & PRICING */}
        {activeTab === "PLANS" && (
          <div className="space-y-6 animate-in fade-in">
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div>
                  <h3 className="text-lg font-bold text-[#082B55]">SSFN Plan Catalogue & Pricing</h3>
                  <p className="text-xs text-slate-500">
                    Independently manage SSFN monthly tariffs, promotional rates, and recommended badges.
                  </p>
                </div>
              </div>

              <div className="mt-6 space-y-4">
                {ssfnPlans.map((plan) => (
                  <div
                    key={plan.id}
                    className="p-5 rounded-2xl border border-slate-200 bg-slate-50 flex flex-col md:flex-row items-center justify-between gap-4"
                  >
                    <div className="space-y-1 w-full md:w-1/3">
                      <div className="flex items-center gap-2">
                        <span className="font-extrabold text-[#082B55] text-base">{plan.name}</span>
                        {plan.recommended && (
                          <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 text-[10px] font-bold">
                            Recommended
                          </span>
                        )}
                        {!plan.isActive && (
                          <span className="px-2 py-0.5 rounded-full bg-red-100 text-red-800 text-[10px] font-bold">
                            Inactive
                          </span>
                        )}
                      </div>
                      <div className="text-xs text-slate-500">
                        Speed: <strong>{plan.speedDisplay}</strong> • Cap: {plan.dataAllowance}
                      </div>
                    </div>

                    <div className="flex items-center gap-3 text-xs w-full md:w-auto">
                      <div>
                        <label className="block text-[10px] text-slate-500 font-semibold mb-1">
                          Standard Price (₹)
                        </label>
                        <input
                          type="number"
                          value={plan.monthlyPrice}
                          onChange={(e) =>
                            handleUpdatePlan(plan.id, { monthlyPrice: parseFloat(e.target.value) || 0 })
                          }
                          className="w-24 px-2 py-1.5 rounded-lg border border-slate-200 bg-white font-bold"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] text-slate-500 font-semibold mb-1">
                          Effective / Promo (₹)
                        </label>
                        <input
                          type="number"
                          value={plan.effectivePrice}
                          onChange={(e) =>
                            handleUpdatePlan(plan.id, { effectivePrice: parseFloat(e.target.value) || 0 })
                          }
                          className="w-24 px-2 py-1.5 rounded-lg border border-slate-200 bg-white font-bold text-emerald-700"
                        />
                      </div>
                    </div>

                    <div className="flex items-center gap-3 w-full md:w-auto justify-end">
                      <button
                        onClick={() => handleUpdatePlan(plan.id, { recommended: !plan.recommended })}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-colors ${
                          plan.recommended
                            ? "bg-amber-100 text-amber-800 border-amber-300"
                            : "bg-white text-slate-600 border-slate-200"
                        }`}
                      >
                        {plan.recommended ? "★ Recommended" : "Mark Popular"}
                      </button>

                      <button
                        onClick={() => handleUpdatePlan(plan.id, { isActive: !plan.isActive })}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-colors ${
                          plan.isActive
                            ? "bg-emerald-100 text-emerald-800 border-emerald-300"
                            : "bg-slate-200 text-slate-600 border-slate-300"
                        }`}
                      >
                        {plan.isActive ? "Active" : "Disabled"}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: COVERAGE LOCALITIES */}
        {activeTab === "COVERAGE" && (
          <div className="space-y-6 animate-in fade-in">
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div>
                  <h3 className="text-lg font-bold text-[#082B55]">Jamshedpur Coverage Area Management</h3>
                  <p className="text-xs text-slate-500">
                    Control active, limited, or rollout statuses shown to public visitors.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {coverageAreas.map((area) => (
                  <div
                    key={area.id}
                    className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="font-bold text-[#082B55] text-base">{area.localityName}</div>
                        <div className="text-[11px] text-slate-500">PIN: {area.pinCode}</div>
                      </div>
                    </div>

                    {area.landmark && (
                      <div className="text-xs text-slate-600 italic">{area.landmark}</div>
                    )}

                    <div className="pt-2">
                      <label className="block text-[10px] text-slate-500 font-semibold mb-1">
                        Service Availability Status
                      </label>
                      <select
                        value={area.status}
                        onChange={(e) => handleUpdateCoverage(area.id, e.target.value)}
                        className="w-full px-2 py-1.5 text-xs font-bold rounded-lg border border-slate-200 bg-white"
                      >
                        <option value="AVAILABLE">AVAILABLE (Active FTTH)</option>
                        <option value="LIMITED">LIMITED (Selective Coverage)</option>
                        <option value="COMING_SOON">COMING_SOON (Rollout in Progress)</option>
                        <option value="NOT_SERVICEABLE">NOT_SERVICEABLE</option>
                      </select>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
