import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Gulf Visa Services | UAE, Saudi Arabia, Qatar, Kuwait, Bahrain, Oman - Fast & Trusted Visa Assistance',
  description:
    'Get fast and reliable visa services for Gulf countries including UAE, Saudi Arabia, Qatar, Kuwait, Bahrain, and Oman. Apply for work visas, job permits, and renewals with expert assistance from Nepal or abroad.',
  keywords:
    'Gulf visa, UAE visa, Saudi Arabia visa, Qatar visa, Kuwait visa, Bahrain visa, Oman visa, visa services, Gulf work visa, UAE employment visa, Saudi Arabia job visa, Qatar labor visa, Kuwait work permit, Bahrain job permit, Oman work visa agency, Visa for Gulf jobs, Skilled worker visa for UAE, Apply Gulf visa online, Fast UAE visa approval, Trusted Gulf visa agency, Work abroad from Nepal, Best visa consultancy Gulf, Nepali agent for Gulf jobs, Legal Gulf visa help, Dubai work visa, Qatar job visa from Nepal, Saudi job consultancy Nepal, Gulf visa processing expert',
  openGraph: {
    title: 'Gulf Visa Services | Trusted Visa Experts for UAE, Qatar, Saudi & More',
    description:
      'Trusted Gulf visa processing services. Apply online for UAE, Saudi, Qatar, Oman, Bahrain & Kuwait visas. Fast, secure, and affordable visa assistance.',
    type: 'website',
    locale: 'en_US',
    url: 'https://gulfvisaservice.com', // <-- Replace with your actual domain
    images: [
      {
        url: '/logoWeb.jpg',
        width: 1200,
        height: 630,
        alt: 'Gulf Visa Services Logo',
        type: 'image/png',
      },
    ],
  },
  icons: {
    icon: [
      { url: '/logoWeb.jpg', sizes: '16x16', type: 'image/png' },
      { url: '/logoWeb.jpg', sizes: '32x32', type: 'image/png' },
    ],
    apple: [{ url: '/logoWeb.jpg', sizes: '180x180', type: 'image/png' }],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  authors: [{ name: 'Your Company Name', url: 'https://gulfvisaservice.com' }],
  alternates: {
    canonical: 'https://gulfvisaservice.com', // <-- Replace with your actual canonical URL
  },
}


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
