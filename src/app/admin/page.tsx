// Admin Portal Root Page
import { Metadata } from "next";
import { AdminDashboardClient } from "./AdminDashboardClient";

export const metadata: Metadata = {
  title: "Admin Portal | Super Sky Fiber Net (SSFN)",
  description: "Internal management portal for SSFN Jamshedpur: Enquiries, BSNL Plan Synchronization, and Tariffs.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminPage() {
  return <AdminDashboardClient />;
}
