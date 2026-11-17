// SSFN Frequently Asked Questions Accordion Component
"use client";

import React, { useState } from "react";
import { siteConfig } from "@/config/site";
import { ChevronDown, HelpCircle, Phone, MessageCircle } from "lucide-react";

interface FaqItem {
  question: string;
  answer: string;
}

const faqs: FaqItem[] = [
  {
    question: "How can I get a new SSFN broadband connection?",
    answer:
      "Getting connected is simple! Fill out our online connection form on this website with your locality and contact number, or message us directly on WhatsApp at +91 94711 26747. Our local Jamshedpur representative will verify your location, arrange line feasibility, and schedule installation at your preferred time.",
  },
  {
    question: "Which broadband plans are currently available in Jamshedpur?",
    answer:
      "We offer speeds from 50 Mbps up to 500 Mbps. Our most popular plan is the SSFN Turbo 100 Mbps (at ₹449/mo on semi-annual opt-in), which offers equal upload and download speeds, dual-band Wi-Fi router options, and unlimited monthly data (3,300 GB). Explore our 'Broadband Plans' page for full details.",
  },
  {
    question: "How long does the installation take?",
    answer:
      "In active service localities such as Sakchi, Bistupur, Kadma, Sonari, and Telco, installation is typically completed within 4 to 8 hours from confirmation. Our local engineers handle neat internal fiber routing, optical signal testing, and complete Wi-Fi setup before handing over.",
  },
  {
    question: "Is a Wi-Fi router included with the plan?",
    answer:
      "Yes! High-speed dual-antenna and dual-band Gigabit Wi-Fi routers (2.4 GHz + 5 GHz) are included with our quarterly, semi-annual, and annual subscription packages with zero equipment rental fees. For monthly billing, standard router options are available.",
  },
  {
    question: "How can I contact technical support if I need assistance?",
    answer:
      "You can call our direct customer helpline at +91 94711 26747 during business hours (9:00 AM – 8:30 PM), or message our active WhatsApp desk at any time. Our network operations team actively monitors fiber nodes 24/7.",
  },
  {
    question: "How can I check service availability in my colony or apartment?",
    answer:
      "Simply use the 'Check Availability' tool on our website by entering your locality and PIN code (e.g. 831001, 831005, 831011). Alternatively, send your location pin to our WhatsApp number, and our survey team will confirm nearest fiber distribution terminal feasibility within minutes.",
  },
  {
    question: "What should I do if my internet stops working?",
    answer:
      "First, check if the power and optical 'PON' light on your router is steady green. If the 'LOS' (Loss of Signal) red light is blinking, an external fiber line may be disrupted. Simply text or call us at +91 94711 26747 with your registered mobile number, and our local field splicing technician will be dispatched promptly.",
  },
];

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="py-24 bg-slate-50 border-b border-slate-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-14">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-sky-100 text-[#082B55] text-xs font-bold uppercase tracking-wider">
            <HelpCircle className="w-3.5 h-3.5 text-[#168BDE]" />
            <span>Got Questions?</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#082B55] tracking-tight">
            Frequently Asked Questions
          </h2>

          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Everything you need to know about Super Sky Fiber Net&apos;s connection process, plans,
            installation, and customer support in Jamshedpur.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-3.5">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden transition-all duration-200"
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full text-left p-5 flex items-center justify-between gap-4 font-bold text-slate-800 text-sm sm:text-base hover:text-[#168BDE] transition-colors"
                  aria-expanded={isOpen}
                >
                  <span>{faq.question}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-slate-400 flex-shrink-0 transition-transform duration-200 ${
                      isOpen ? "rotate-180 text-[#168BDE]" : ""
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-slate-600 text-xs sm:text-sm leading-relaxed border-t border-slate-100 animate-in fade-in duration-200">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Quick Contact Footer */}
        <div className="mt-12 text-center text-xs text-slate-500">
          Still have an unaddressed question?{" "}
          <a
            href={siteConfig.contact.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#168BDE] font-bold hover:underline inline-flex items-center gap-1"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            Chat with our local team on WhatsApp
          </a>{" "}
          or call{" "}
          <a
            href={siteConfig.contact.phoneTel}
            className="text-[#082B55] font-bold hover:underline inline-flex items-center gap-1"
          >
            <Phone className="w-3 h-3" />
            +91 94711 26747
          </a>
        </div>
      </div>
    </section>
  );
}
