// Privacy Policy Page
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Super Sky Fiber Net (SSFN)",
  description: "Privacy policy and customer data protection standards for Super Sky Fiber Net (SSFN) subscribers in Jamshedpur.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-white py-16 sm:py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 text-slate-700 leading-relaxed text-sm sm:text-base">
        <div className="border-b border-slate-200 pb-6">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#082B55] tracking-tight">
            Privacy Policy
          </h1>
          <p className="text-xs text-slate-500 mt-2">
            Last Updated: November 2026 • Super Sky Fiber Net Broadband Services, Jamshedpur
          </p>
        </div>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-[#082B55]">1. Introduction & Scope</h2>
          <p>
            Super Sky Fiber Net (&quot;SSFN&quot;, &quot;we&quot;, &quot;our&quot;, or &quot;us&quot;) operates as an independent
            Internet Service Provider in Jamshedpur, Jharkhand, India. This Privacy Policy outlines
            how we collect, handle, protect, and use customer information when you browse our website
            (superskyfibernet.in) or submit connection enquiries.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-[#082B55]">2. Information We Collect</h2>
          <p>
            We collect only the minimal necessary personal information required to establish broadband
            feasibility, coordinate physical installation, and communicate technical updates:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm">
            <li><strong>Customer Name:</strong> To address you and verify service subscriber identity.</li>
            <li><strong>Mobile Number:</strong> To coordinate connection surveys, line activation, and billing.</li>
            <li><strong>Locality and PIN Code:</strong> To verify optical fiber distribution terminal feasibility.</li>
            <li><strong>Installation Address (Optional):</strong> To route drop fiber cables accurately.</li>
            <li><strong>Email Address (Optional):</strong> To send digital invoices and service notices.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-[#082B55]">3. No Sale or Misuse of Personal Data</h2>
          <p>
            We do <strong>not</strong> sell, rent, trade, or distribute your personal contact information
            to third-party advertisers, telemarketing agencies, or data aggregators. Customer information
            is strictly utilized for internet service delivery within Jamshedpur.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-[#082B55]">4. Data Security & Storage</h2>
          <p>
            Connection enquiries and customer records are stored securely in protected databases with
            strict parameterized access controls. We apply standard security practices including input
            sanitization, rate limiting against automated spam, and encrypted HTTPS transmission.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-[#082B55]">5. Regulatory Compliance</h2>
          <p>
            As a broadband telecommunications provider operating in the Republic of India, SSFN complies
            with all applicable guidelines established by the Department of Telecommunications (DoT)
            and Telecom Regulatory Authority of India (TRAI), including subscriber identity verification
            (Customer Application Form - CAF) prior to physical line activation.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-[#082B55]">6. Contact Privacy Desk</h2>
          <p>
            If you have questions regarding your data or wish to update or delete your enquiry records,
            please reach us at:
          </p>
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs sm:text-sm space-y-1">
            <div className="font-bold text-[#082B55]">Super Sky Fiber Net Privacy Desk</div>
            <div>Commercial Hub, Bistupur / Sakchi Main Road, Jamshedpur, Jharkhand – 831001</div>
            <div>Phone: +91 94711 26747 • Email: amitkumarsingh20798@gmail.com</div>
          </div>
        </section>
      </div>
    </div>
  );
}
