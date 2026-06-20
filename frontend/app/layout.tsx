import type { Metadata } from 'next'
import { Inter, Space_Grotesk, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import { AppShell } from '@/components/layout/AppShell'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const space = Space_Grotesk({ subsets: ['latin'], variable: '--font-space' })
const mono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono' })

export const metadata: Metadata = {
  title: 'UrbanX — AI-Powered Pedestrian-Friendly Urban Redesign',
  description:
    'Analyze Indian city streets and generate pedestrian-friendly redesigns meeting international standards. Built for safer, walkable, monsoon-resilient cities.',
  keywords: ['urban planning', 'pedestrian', 'Indian cities', 'street redesign', 'accessibility', 'Vision Zero'],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${space.variable} ${mono.variable}`}>
      <body>
        <AppShell>{children}</AppShell>
      </body>
    </html>
  )
}
