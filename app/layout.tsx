import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://gulfvisaservice.com'),
  title: 'Gulf Visa Services | UAE, Saudi Arabia, Qatar, Kuwait, Bahrain, Oman - Fast & Trusted Visa Assistance',
  description:
    'Get fast, reliable visa services for Gulf countries including UAE, Saudi Arabia, Qatar, Kuwait, Bahrain, and Oman. Apply online for job visas, work permits, and renewals. Trusted Gulf visa agency from Nepal to Gulf.',
  keywords:
    'Gulf visa, UAE visa, Saudi Arabia visa, Qatar visa, Kuwait visa, Bahrain visa, Oman visa, visa services, Gulf work visa, UAE employment visa, Saudi Arabia job visa, Qatar labor visa, Kuwait work permit, Bahrain job permit, Oman work visa agency, Visa for Gulf jobs, Skilled worker visa for UAE, Apply Gulf visa online, Fast UAE visa approval, Trusted Gulf visa agency, Work abroad from Nepal, Best visa consultancy Gulf, Nepali agent for Gulf jobs, Legal Gulf visa help, Dubai work visa, Qatar job visa from Nepal, Saudi job consultancy Nepal, Gulf visa processing expert, visa agent Nepal, job demand Gulf, latest Gulf demand, visa assistance Nepal, apply for Qatar demand, Qatar visa 2025, visa service Nepal, Bahrain visa latest, Oman visa from Nepal, free visa Qatar, direct visa service, manpower Nepal Gulf',
  openGraph: {
    title: 'Gulf Visa Services | Trusted Visa Experts for UAE, Qatar, Saudi & More',
    description:
      'Trusted Gulf visa processing services. Apply online for UAE, Saudi, Qatar, Oman, Bahrain & Kuwait visas. Fast, secure, and affordable visa assistance.',
    type: 'website',
    locale: 'en_US',
    url: 'https://gulfvisaservice.com',
    siteName: 'Gulf Visa Services',
    images: [
      {
        url: 'https://gulfvisaservice.com/logoWeb.jpg',
        width: 1200,
        height: 630,
        alt: 'Gulf Visa Services Logo',
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Gulf Visa Services | Apply for UAE, Qatar, Saudi Arabia & More',
    description:
      'Fast & reliable visa support for Gulf countries. Apply online for job permits in UAE, Qatar, Saudi Arabia, Oman, Bahrain & Kuwait. 100% trusted from Nepal.',
    images: ['https://gulfvisaservice.com/logoWeb.jpg'],
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
  authors: [{ name: 'Gulf Visa Services', url: 'https://gulfvisaservice.com' }],
  alternates: {
    canonical: 'https://gulfvisaservice.com',
  },
  verification: {
    google: 'llqQ9C6BOnJ4W_lC-O4JmQXSAsIfFWY0Dy2gjfieBNQ',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        {/* Favicon for browsers and Google Search */}
        <link rel="icon" href="/logoWeb.jpg" sizes="32x32" type="image/png" />
        <link rel="icon" href="/logoWeb.jpg" sizes="16x16" type="image/png" />
        {/* Apple Touch Icon */}
        <link rel="apple-touch-icon" href="/logoWeb.jpg" sizes="180x180" type="image/png" />
      </head>
      <body className="min-h-screen bg-white text-black antialiased">
        {children}
      </body>
    </html>
  )
}
