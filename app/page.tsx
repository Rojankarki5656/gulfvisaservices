import type { Metadata } from "next"
import HomePage from "@/components/pages/home-page"

export const metadata: Metadata = {
  title: "Gulf Visa Services - UAE Visa Assistance | Fast & Reliable | गल्फ भिसा सेवाहरू",
  description:
    "Gulf Visa Services offers expert visa processing for UAE, Saudi Arabia, Qatar, Kuwait, Bahrain, and Oman. Fast, reliable, and hassle-free tourist, business, and work visas. UAE भिसा सेवाहरू - द्रुत र विश्वसनीय।",
  keywords: [
    "Gulf visa",
    "UAE visa",
    "Dubai visa",
    "Abu Dhabi visa",
    "Saudi Arabia visa",
    "Qatar visa",
    "Kuwait visa",
    "Bahrain visa",
    "Oman visa",
    "visa services",
    "tourist visa UAE",
    "business visa UAE",
    "work visa UAE",
    "गल्फ भिसा",
    "युएई भिसा",
    "दुबई भिसा",
    "अबु धाबी भिसा",
    "पर्यटक भिसा",
    "व्यवसायिक भिसा",
    "काम भिसा",
    "भिसा सेवाहरू"
  ],
  openGraph: {
    title: "Gulf Visa Services - UAE Visa Assistance | गल्फ भिसा सेवाहरू",
    description: "Fast, reliable visa services for UAE and Gulf countries. Apply for tourist, business, or work visas with ease. युएई र गल्फ देशहरूको लागि द्रुत भिसा सेवाहरू।",
    type: "website",
    locale: "en_US",
    alternateLocale: ["ne_NP"],
    url: "https://www.gulfvisaservice.com",
    siteName: "Gulf Visa Services",
    images: [
      {
        url: "https://www.gulfvisaservice.com/logoWeb.jpg",
        width: 1200,
        height: 630,
        alt: "Gulf Visa Services - UAE Visa Assistance"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Gulf Visa Services - UAE Visa Assistance | गल्फ भिसा सेवाहरू",
    description: "Fast, reliable UAE visa services for tourists, business, and work. Apply now! युएई भिसा सेवाहरू - द्रुत र सजिलो।",
    images: ["https://www.gulfvisaservice.com/logoWeb.jpg"]
  },
  alternates: {
    languages: {
      "en-US": "https://www.gulfvisaservice.com/en",
      "ne-NP": "https://www.gulfvisaservice.com/ne"
    }
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1
    }
  }
}

export default function Page() {
  return <HomePage />
}
