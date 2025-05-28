import type { Metadata } from "next"
import ContactPage from "@/components/pages/contact-page"

export const metadata: Metadata = {
  title: "Contact Us - Gulf Visa Services | Get Expert Visa Assistance",
  description:
    "Contact Gulf Visa Services for professional visa assistance. Our expert team is ready to help you with your visa applications and job placement services.",
  keywords: "contact visa services, visa assistance, Gulf visa help, visa consultation",
  openGraph: {
    title: "Contact Gulf Visa Services - Expert Visa Assistance",
    description: "Get in touch with our visa experts for professional assistance with your visa applications.",
    type: "website",
  },
}

export default function Page() {
  return <ContactPage />
}
