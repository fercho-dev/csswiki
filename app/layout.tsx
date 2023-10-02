import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'CSS Wiki',
  description: 'Recursos para dominar CSS',
  openGraph: {
    title: 'CSS Wiki',
    description: 'Recursos para dominar CSS',
    images: [
      // {
      //   url: 'https://images.unsplash.com/photo-1621839673705-6617adf9e890',
      //   width: 800,
      //   height: 600,
      // },
      {
        url: 'https://images.unsplash.com/photo-1621839673705-6617adf9e890',
        width: 1800,
        height: 1600,
        alt: 'CSS Wiki - Recursos para dominar CSS',
      },
    ],
    locale: 'es_MX',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
