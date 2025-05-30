import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Gulf Visa Services - Professional Visa Assistance for UAE, Saudi Arabia, Qatar',
  keywords:
    'Gulf visa, UAE visa, Saudi Arabia visa, Qatar visa, Kuwait visa, Bahrain visa, Oman visa, visa services',
  openGraph: {
    title: 'Gulf Visa Services - Professional Visa Assistance',
    description: 'Expert visa services for Gulf countries. Fast, reliable visa processing.',
    type: 'website',
    locale: 'en_US',
  },
  icons: {
    icon: [
      { url: '/logoWeb.jpg', sizes: '16x16', type: 'image/png' },
      { url: '/logoWeb.jpg', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/logoWeb.jpg', sizes: '180x180', type: 'image/png' },
    ],
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
