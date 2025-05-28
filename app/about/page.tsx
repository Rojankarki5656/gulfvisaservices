import type { Metadata } from "next"
import AboutPage from "@/components/pages/about-page"

export const metadata: Metadata = {
  title: "About Us - Gulf Visa Services | Professional Visa Processing Since 2015",
  description:
    "Learn about Gulf Visa Services - your trusted partner for visa processing in UAE, Saudi Arabia, Qatar, Kuwait, Bahrain, and Oman. Expert team with 99.8% success rate.",
  openGraph: {
    title: "About Gulf Visa Services - Professional Visa Processing",
    description: "Trusted visa processing services for Gulf countries since 2015.",
    type: "website",
  },
}

export default function Page() {
  return <AboutPage />
}
