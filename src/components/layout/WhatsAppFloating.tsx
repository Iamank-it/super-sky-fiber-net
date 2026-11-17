// Floating WhatsApp Quick Support Component
"use client";

import React, { useState } from "react";
import { siteConfig } from "@/config/site";
import { X } from "lucide-react";

export function WhatsAppFloating() {
  const [showTooltip, setShowTooltip] = useState(true);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2 group">
      {/* Quick Greeting Bubble */}
      {showTooltip && (
        <div className="relative hidden sm:flex items-center gap-2 bg-white text-slate-800 text-xs font-medium py-2 px-3.5 rounded-2xl shadow-xl border border-sky-100 animate-bounce duration-1000 max-w-xs">
          <span>Need quick broadband in Jamshedpur? Chat with us!</span>
          <button
            onClick={() => setShowTooltip(false)}
            aria-label="Close tooltip"
            className="text-slate-400 hover:text-slate-600 transition-colors"
          >
            <X className="w-3.5 h-3.5" />
          </button>
          <div className="absolute -bottom-1.5 right-6 w-3 h-3 bg-white rotate-45 border-r border-b border-sky-100"></div>
        </div>
      )}

      {/* Floating Button */}
      <a
        href={siteConfig.contact.whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with Super Sky Fiber Net on WhatsApp"
        className="flex items-center gap-2.5 bg-[#25D366] hover:bg-[#20BD5A] text-white px-4 py-3.5 rounded-full shadow-lg shadow-emerald-500/25 transition-all duration-300 hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-emerald-300"
      >
        {/* Pulsing Dot */}
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
        </span>

        {/* WhatsApp Icon */}
        <svg
          className="w-5 h-5 fill-current"
          viewBox="0 0 24 24"
        >
          <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2M12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.15 12.04 20.15C10.56 20.15 9.11 19.76 7.85 19L7.55 18.83L4.43 19.65L5.26 16.61L5.06 16.29C4.24 14.99 3.8 13.47 3.8 11.91C3.81 7.37 7.5 3.67 12.05 3.67M9.53 7.33C9.33 7.33 9 7.41 8.74 7.69C8.47 7.97 7.73 8.67 7.73 10.09C7.73 11.51 8.77 12.88 8.91 13.07C9.06 13.26 10.96 16.19 13.86 17.44C14.55 17.74 15.09 17.92 15.51 18.05C16.2 18.27 16.83 18.24 17.33 18.17C17.88 18.08 19.04 17.47 19.28 16.78C19.53 16.09 19.53 15.5 19.45 15.37C19.38 15.25 19.2 15.18 18.92 15.04C18.65 14.9 17.3 14.24 17.05 14.15C16.8 14.06 16.62 14.01 16.43 14.29C16.25 14.57 15.73 15.18 15.57 15.37C15.42 15.55 15.26 15.58 14.99 15.44C14.71 15.3 13.82 15.01 12.77 14.07C11.95 13.34 11.4 12.44 11.23 12.16C11.07 11.89 11.21 11.74 11.35 11.6C11.48 11.47 11.64 11.26 11.78 11.1C11.92 10.94 11.96 10.82 12.05 10.64C12.15 10.45 12.1 10.29 12.03 10.15C11.96 10.01 11.41 8.65 11.18 8.09C10.95 7.55 10.72 7.63 10.55 7.62C10.39 7.61 10.2 7.61 10.02 7.61C9.83 7.61 9.53 7.33 9.53 7.33Z" />
        </svg>

        <span className="font-semibold text-sm tracking-wide hidden md:inline">
          WhatsApp Us
        </span>
      </a>
    </div>
  );
}
