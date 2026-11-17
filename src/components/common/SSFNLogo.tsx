// Super Sky Fiber Net (SSFN) Official Brand Logo Component
import React from "react";
import Link from "next/link";

interface SSFNLogoProps {
  className?: string;
  variant?: "light" | "dark" | "full";
  size?: "sm" | "md" | "lg";
}

export function SSFNLogo({ className = "", variant = "dark" }: SSFNLogoProps) {
  const isDarkBg = variant === "light";

  return (
    <Link href="/" className={`inline-flex items-center gap-2.5 font-bold tracking-tight group ${className}`}>
      {/* Dynamic Fiber Wave Icon */}
      <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-[#082B55] via-[#168BDE] to-[#32D5E8] shadow-md shadow-sky-500/20 group-hover:scale-105 transition-transform duration-300">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          className="w-6 h-6 text-white stroke-[2.2]"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {/* Fiber optical signal wave */}
          <path d="M5 12.55a11 11 0 0 1 14.08 0" />
          <path d="M1.42 9a16 16 0 0 1 21.16 0" />
          <path d="M8.53 16.11a6 6 0 0 1 6.95 0" />
          <line x1="12" y1="20" x2="12.01" y2="20" strokeWidth="3" />
        </svg>
        <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#32D5E8] opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#32D5E8]"></span>
        </span>
      </div>

      {/* Brand Name Typography */}
      <div className="flex flex-col leading-none">
        <div className="flex items-center gap-1">
          <span className={`font-extrabold tracking-tight ${isDarkBg ? "text-white" : "text-[#082B55]"}`}>
            SUPER SKY
          </span>
          <span className="text-[#168BDE] font-black">FIBER</span>
        </div>
        <div className="flex items-center gap-1.5 mt-0.5">
          <span className="text-[10px] tracking-widest font-bold uppercase text-[#06B6D4]">
            SSFN • JAMSHEDPUR
          </span>
        </div>
      </div>
    </Link>
  );
}
