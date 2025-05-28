import type { Metadata } from "next"
import HomePage from "@/components/pages/home-page"

export const metadata: Metadata = {
  title: "Gulf Visa Services - Professional Visa Assistance for UAE, Saudi Arabia, Qatar",
  description:
    "Expert visa services for Gulf countries. Fast, reliable visa processing for UAE, Saudi Arabia, Qatar, Kuwait, Bahrain, and Oman. Tourist, business, and work visas.",
  keywords: "Gulf visa, UAE visa, Saudi Arabia visa, Qatar visa, Kuwait visa, Bahrain visa, Oman visa, visa services",
  openGraph: {
    title: "Gulf Visa Services - Professional Visa Assistance",
    description: "Expert visa services for Gulf countries. Fast, reliable visa processing.",
    type: "website",
    locale: "en_US",
  },
}

export default function Page() {
  return <HomePage />
}
