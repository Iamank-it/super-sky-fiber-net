// SSFN Official Website Footer
import React from "react";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { SSFNLogo } from "@/components/common/SSFNLogo";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Shield,
  CheckCircle2,
  MessageCircle,
} from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-[#051A33] text-slate-300 pt-16 pb-10 border-t border-sky-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/10">
          {/* Brand & Introduction (2 Cols) */}
          <div className="lg:col-span-2 space-y-4">
            <SSFNLogo variant="light" size="lg" />
            <p className="text-sm text-slate-300 leading-relaxed max-w-sm mt-3">
              Super Sky Fiber Net (SSFN) provides ultra-fast, symmetric optical fiber broadband
              in Jamshedpur, Jharkhand. Designed for uninterrupted 4K streaming, remote work, online
              education, and high-speed business networking.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>100% Optical FTTH</span>
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-300 text-xs font-semibold">
                <Shield className="w-3.5 h-3.5" />
                <span>Local Jamshedpur Support</span>
              </div>
            </div>

            {/* Quick Contact Action Buttons */}
            <div className="pt-3 flex flex-wrap items-center gap-3">
              <a
                href={siteConfig.contact.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20BD5A] text-white px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-sm"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp: {siteConfig.contact.phone}</span>
              </a>
              <a
                href={siteConfig.contact.phoneTel}
                className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/15 text-white px-4 py-2 rounded-xl text-xs font-bold transition-all border border-white/10"
              >
                <Phone className="w-3.5 h-3.5 text-cyan-300" />
                <span>Call Helpline</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-white text-sm font-bold tracking-wider uppercase">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="hover:text-cyan-300 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/plans" className="hover:text-cyan-300 transition-colors">
                  Broadband Plans
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-cyan-300 transition-colors">
                  Our Services
                </Link>
              </li>
              <li>
                <Link href="/coverage" className="hover:text-cyan-300 transition-colors">
                  Coverage Areas
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-cyan-300 transition-colors">
                  About SSFN
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-cyan-300 transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Key Jamshedpur Localities */}
          <div className="space-y-3">
            <h4 className="text-white text-sm font-bold tracking-wider uppercase">Service Areas</h4>
            <ul className="space-y-2 text-sm text-slate-300">
              <li>
                <Link href="/coverage" className="hover:text-cyan-300 transition-colors flex items-center justify-between">
                  <span>Sakchi (831001)</span>
                  <span className="text-[10px] text-emerald-400 font-bold">Active</span>
                </Link>
              </li>
              <li>
                <Link href="/coverage" className="hover:text-cyan-300 transition-colors flex items-center justify-between">
                  <span>Bistupur (831001)</span>
                  <span className="text-[10px] text-emerald-400 font-bold">Active</span>
                </Link>
              </li>
              <li>
                <Link href="/coverage" className="hover:text-cyan-300 transition-colors flex items-center justify-between">
                  <span>Kadma (831005)</span>
                  <span className="text-[10px] text-emerald-400 font-bold">Active</span>
                </Link>
              </li>
              <li>
                <Link href="/coverage" className="hover:text-cyan-300 transition-colors flex items-center justify-between">
                  <span>Sonari (831011)</span>
                  <span className="text-[10px] text-emerald-400 font-bold">Active</span>
                </Link>
              </li>
              <li>
                <Link href="/coverage" className="hover:text-cyan-300 transition-colors flex items-center justify-between">
                  <span>Telco Colony (831004)</span>
                  <span className="text-[10px] text-emerald-400 font-bold">Active</span>
                </Link>
              </li>
              <li>
                <Link href="/coverage" className="hover:text-cyan-300 transition-colors flex items-center justify-between">
                  <span>Mango (831012)</span>
                  <span className="text-[10px] text-amber-400 font-bold">Expanding</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Business & Support Contacts */}
          <div className="space-y-3">
            <h4 className="text-white text-sm font-bold tracking-wider uppercase">Contact Details</h4>
            <div className="space-y-2.5 text-xs text-slate-300">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
                <span>
                  Super Sky Fiber Net, Commercial Hub, Bistupur / Sakchi, Jamshedpur, Jharkhand – 831001
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                <a href={siteConfig.contact.phoneTel} className="hover:text-cyan-300 font-medium">
                  {siteConfig.contact.phone}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                <a href={siteConfig.contact.emailMailto} className="hover:text-cyan-300 break-all font-medium">
                  {siteConfig.contact.email}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                <span>{siteConfig.contact.supportHours}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Regulatory & Market Benchmark Disclaimer */}
        <div className="py-6 border-b border-white/10 text-[11px] text-slate-400 leading-relaxed space-y-1">
          <p>
            <strong>Market Benchmark & Tariff Disclaimer:</strong> Super Sky Fiber Net (SSFN) is an
            independent internet service provider operating in Jamshedpur, Jharkhand. All BSNL Bharat
            Fiber tariff information published on this site is retrieved and verified strictly as public
            market benchmarks for Jharkhand Circle. BSNL is a registered trademark of Bharat Sanchar
            Nigam Limited. SSFN is not affiliated with or endorsed by BSNL.
          </p>
        </div>

        {/* Bottom Copyright & Legal Links */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <p>© {new Date().getFullYear()} Super Sky Fiber Net (SSFN). All rights reserved.</p>
          <div className="flex items-center gap-5">
            <Link href="/privacy-policy" className="hover:text-cyan-300 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-cyan-300 transition-colors">
              Terms & Conditions
            </Link>
            <Link href="/admin" className="text-slate-400 hover:text-white transition-colors">
              Admin Portal
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
