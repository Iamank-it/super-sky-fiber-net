// Terms and Conditions Page
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms and Conditions | Super Sky Fiber Net (SSFN)",
  description: "Terms of service, fair usage policies, and subscriber conditions for Super Sky Fiber Net in Jamshedpur.",
};

export default function TermsPage() {
  return (
    <div className="bg-white py-16 sm:py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 text-slate-700 leading-relaxed text-sm sm:text-base">
        <div className="border-b border-slate-200 pb-6">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#082B55] tracking-tight">
            Terms of Service & Fair Usage Policy
          </h1>
          <p className="text-xs text-slate-500 mt-2">
            Applicable to all Super Sky Fiber Net broadband subscribers in Jamshedpur, Jharkhand
          </p>
        </div>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-[#082B55]">1. Acceptance of Terms</h2>
          <p>
            By submitting a connection application, paying subscription charges, or utilizing broadband
            services supplied by Super Sky Fiber Net (&quot;SSFN&quot;), the customer agrees to abide by these
            terms, Indian telecommunication laws, and applicable DoT / TRAI regulations.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-[#082B55]">2. Commercial Independence & Benchmark Tariffs</h2>
          <p>
            Super Sky Fiber Net is an independent private internet service provider operating locally in
            Jamshedpur, Jharkhand. All BSNL Bharat Fiber plan details displayed on this website are
            used solely as factual, verified public reference benchmarks for Jharkhand Circle. SSFN
            maintains independent pricing, customer policies, and local support teams. BSNL is a
            registered trademark of Bharat Sanchar Nigam Limited.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-[#082B55]">3. Installation & Equipment Ownership</h2>
          <p>
            Standard fiber drop cabling and optical network terminals (ONT / Wi-Fi routers) provided
            under subscription agreements remain the property of SSFN unless explicitly purchased by
            the subscriber. In case of service termination, subscribers agree to return the optical
            terminal in undamaged working condition.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-[#082B55]">4. Fair Usage Policy (FUP)</h2>
          <p>
            To prevent network degradation and ensure consistent quality of service for all users on
            shared optical distribution hubs, our unlimited broadband plans are subject to standard
            commercial Fair Usage thresholds (3,300 GB / month for standard home plans, 4,000 GB to 5,000 GB
            for creator and business plans). Once the FUP threshold is reached during a billing cycle,
            broadband connectivity remains active without interruption at reduced post-FUP speeds
            (4 Mbps to 25 Mbps depending on tier).
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-[#082B55]">5. Prohibited Usage</h2>
          <p>
            Subscribers must not utilize SSFN broadband connectivity for illegal activities, spamming,
            distributing malicious software, running unapproved public Wi-Fi reselling without ISP
            authorization, or actions infringing upon Indian cyber laws.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-[#082B55]">6. Billing, Renewals & Support</h2>
          <p>
            Subscriptions are billed on a prepaid 30-day, quarterly, semi-annual, or annual cycle.
            Technical complaints logged through our helpline (+91 94711 26747) or WhatsApp channel
            are prioritized based on local line feasibility with target same-day resolution.
          </p>
        </section>
      </div>
    </div>
  );
}
