// SSFN Main Navigation Header
"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/config/site";
import { SSFNLogo } from "@/components/common/SSFNLogo";
import { NewConnectionModal } from "./NewConnectionModal";
import {
  Phone,
  MessageCircle,
  Menu,
  X,
  ChevronRight,
  Wifi,
  MapPin,
  ShieldCheck,
} from "lucide-react";

export function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Top Announcement & Quick Contact Bar */}
      <div className="bg-[#082B55] text-white text-xs border-b border-white/10 hidden md:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-cyan-300 font-medium">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              Jamshedpur Fiber Network Active
            </span>
            <span className="text-white/40">|</span>
            <span className="text-slate-300 flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-sky-400" />
              Serving Sakchi, Bistupur, Kadma, Sonari, Mango & nearby areas
            </span>
          </div>

          <div className="flex items-center gap-5">
            <a
              href={siteConfig.contact.phoneTel}
              className="text-slate-200 hover:text-cyan-300 flex items-center gap-1.5 transition-colors font-medium"
            >
              <Phone className="w-3.5 h-3.5 text-cyan-400" />
              <span>{siteConfig.contact.phone}</span>
            </a>
            <span className="text-white/40">|</span>
            <a
              href={siteConfig.contact.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-400 hover:text-emerald-300 flex items-center gap-1.5 transition-colors font-semibold"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>WhatsApp Us</span>
            </a>
            <span className="text-white/40">|</span>
            <Link
              href="/admin"
              className="text-slate-400 hover:text-white transition-colors text-[11px]"
            >
              Portal Login
            </Link>
          </div>
        </div>
      </div>

      {/* Main Sticky Header */}
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled
            ? "bg-white/95 backdrop-blur-md shadow-md shadow-slate-200/50 py-3"
            : "bg-white py-4 border-b border-slate-100"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Logo */}
          <SSFNLogo />

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {siteConfig.navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3.5 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
                    isActive
                      ? "text-[#168BDE] bg-sky-50"
                      : "text-slate-700 hover:text-[#082B55] hover:bg-slate-50"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Desktop Right CTAs */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href={siteConfig.contact.phoneTel}
              className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-bold text-[#082B55] bg-sky-50/80 hover:bg-sky-100/80 transition-colors border border-sky-100"
            >
              <Phone className="w-3.5 h-3.5 text-[#168BDE]" />
              <span>{siteConfig.contact.phone}</span>
            </a>

            <button
              onClick={() => setModalOpen(true)}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#082B55] via-[#0E4282] to-[#168BDE] hover:from-[#061F3D] hover:to-[#1272B7] text-white font-bold text-xs uppercase tracking-wider shadow-md shadow-sky-500/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <Wifi className="w-4 h-4 text-cyan-300" />
              <span>Get New Connection</span>
            </button>
          </div>

          {/* Mobile Action & Menu Hamburger */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={() => setModalOpen(true)}
              className="px-3.5 py-2 rounded-xl bg-[#168BDE] text-white text-xs font-bold shadow-sm"
            >
              Get Fiber
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-slate-700 hover:bg-slate-100 transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 top-[65px] z-40 bg-white flex flex-col p-6 space-y-6 overflow-y-auto lg:hidden animate-in slide-in-from-top-4 duration-200">
          <div className="space-y-1">
            {siteConfig.navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center justify-between py-3 px-4 rounded-xl text-base font-bold transition-colors ${
                    isActive
                      ? "text-[#168BDE] bg-sky-50"
                      : "text-slate-800 hover:bg-slate-50"
                  }`}
                >
                  <span>{link.label}</span>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </Link>
              );
            })}
          </div>

          <div className="pt-4 border-t border-slate-100 space-y-3">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setModalOpen(true);
              }}
              className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-[#082B55] to-[#168BDE] text-white font-bold text-center text-sm shadow-md"
            >
              Apply for New Connection
            </button>

            <a
              href={siteConfig.contact.phoneTel}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl border border-slate-200 text-slate-800 font-bold text-sm bg-slate-50"
            >
              <Phone className="w-4 h-4 text-[#168BDE]" />
              <span>Call Us: +91 94711 26747</span>
            </a>

            <a
              href={siteConfig.contact.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#25D366] text-white font-bold text-sm shadow-sm"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Chat on WhatsApp</span>
            </a>
          </div>

          <div className="p-4 rounded-2xl bg-sky-50 text-xs text-slate-600 space-y-1.5">
            <div className="font-bold text-[#082B55] flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              Super Sky Fiber Net Jamshedpur
            </div>
            <p>Main Operating Hub: Bistupur / Sakchi Commercial Area, Jamshedpur - 831001</p>
            <p className="text-slate-500">Email: amitkumarsingh20798@gmail.com</p>
          </div>
        </div>
      )}

      {/* Global Connection Modal */}
      <NewConnectionModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}
