import type { Metadata } from "next"
import VisaTypesPage from "@/components/pages/visa-types-page"

export const metadata: Metadata = {
  title: "Visa Types - Tourist, Business, Work Visas for Gulf Countries",
  description:
    "Explore different visa types for Gulf countries: Tourist visas, Business visas, Work visas, Transit visas, and more. Fast processing for UAE, Saudi Arabia, Qatar, Kuwait, Bahrain, Oman.",
  openGraph: {
    title: "Gulf Countries Visa Types - Tourist, Business, Work Visas",
    description: "Complete guide to visa types for Gulf countries with fast processing.",
    type: "website",
  },
}

export default function Page() {
  return <VisaTypesPage />
}
