// Dedicated Contact Us Page
import { Metadata } from "next";
import { ContactClientView } from "./ContactClientView";

export const metadata: Metadata = {
  title: "Contact Us | Super Sky Fiber Net (SSFN) - Jamshedpur",
  description:
    "Get in touch with Super Sky Fiber Net in Jamshedpur. Call +91 94711 26747, chat on WhatsApp, or visit our local office in Bistupur / Sakchi for broadband connection and technical support.",
};

export default function ContactPage() {
  return <ContactClientView />;
}
