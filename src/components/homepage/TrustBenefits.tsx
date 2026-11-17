// SSFN Trust & Benefits Section
import React from "react";
import {
  Wifi,
  Zap,
  Headphones,
  CheckCircle,
  Router,
  Clock,
  ArrowUpRight,
} from "lucide-react";

const benefits = [
  {
    icon: Wifi,
    title: "100% Pure Optical FTTH",
    description:
      "Dedicated fiber optic line drawn directly to your router. Immune to weather degradation, copper line noise, and electrical interference.",
    color: "from-sky-500 to-blue-600",
  },
  {
    icon: Zap,
    title: "Equal Upload & Download",
    description:
      "Unlike legacy cable internet, SSFN delivers true symmetric high speed. Upload 4K videos, stream on Twitch, and conduct Zoom calls with zero lag.",
    color: "from-cyan-500 to-teal-600",
  },
  {
    icon: Headphones,
    title: "Direct Jamshedpur Assistance",
    description:
      "Speak directly to our local field engineers and customer care desk in Jamshedpur (+91 94711 26747) without navigating automated robotic IVR menus.",
    color: "from-blue-600 to-indigo-700",
  },
  {
    icon: Router,
    title: "Dual-Band Wi-Fi 6 Ready",
    description:
      "Experience zero dead-zones with high-gain 2.4 GHz & 5 GHz dual-band gigabit routers supplied with our long-term subscription packages.",
    color: "from-purple-500 to-indigo-600",
  },
  {
    icon: Clock,
    title: "Prompt Same-Day Setup",
    description:
      "Our field teams in Sakchi, Bistupur, Kadma, Sonari, and Telco are equipped to provision and activate your new fiber line within 4 to 8 hours.",
    color: "from-emerald-500 to-teal-600",
  },
  {
    icon: CheckCircle,
    title: "Transparent, Honest Pricing",
    description:
      "Clear, published monthly tariffs with no hidden device fees or surprise billing charges. What you see is exactly what you get.",
    color: "from-amber-500 to-orange-600",
  },
];

export function TrustBenefits() {
  return (
    <section className="py-20 bg-slate-50 border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-sky-100 text-[#082B55] text-xs font-bold uppercase tracking-wider">
            Built for Jamshedpur
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#082B55] tracking-tight">
            Why Super Sky Fiber Net Is Built Different
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            We are not a distant telecom operator. We are your local Jamshedpur fiber broadband
            partner committed to high speeds, reliable uptime, and immediate personal service.
          </p>
        </div>

        {/* Benefits Cards Grid */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {benefits.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-3xl p-7 shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-200/80 hover:-translate-y-1.5 flex flex-col justify-between group"
              >
                <div className="space-y-4">
                  {/* Icon Box */}
                  <div
                    className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${item.color} text-white flex items-center justify-center shadow-md shadow-sky-500/10 group-hover:scale-110 transition-transform`}
                  >
                    <Icon className="w-6 h-6" />
                  </div>

                  <h3 className="text-lg font-bold text-[#082B55] tracking-tight">
                    {item.title}
                  </h3>

                  <p className="text-sm text-slate-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="pt-6 mt-4 border-t border-slate-100 flex items-center text-xs font-bold text-[#168BDE] group-hover:text-[#082B55] transition-colors">
                  <span>Learn more about our fiber network</span>
                  <ArrowUpRight className="w-4 h-4 ml-1 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
