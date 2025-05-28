import type { Metadata } from "next"
import AvailableJobsPage from "@/components/pages/available-jobs-page"

export const metadata: Metadata = {
  title: "Available Jobs in Gulf Countries - Work Opportunities | Gulf Visa Services",
  description:
    "Explore exciting job opportunities in UAE, Saudi Arabia, Qatar, Kuwait, Bahrain, and Oman. Find your dream job with competitive salaries and visa sponsorship.",
  keywords: "Gulf jobs, UAE jobs, Saudi Arabia jobs, Qatar jobs, Kuwait jobs, work visa, employment opportunities",
  openGraph: {
    title: "Available Jobs in Gulf Countries - Work Opportunities",
    description: "Find your dream job in Gulf countries with visa sponsorship and competitive salaries.",
    type: "website",
  },
}

export default function Page() {
  return <AvailableJobsPage />
}
