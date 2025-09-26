import Header from '@/components/layout/Header'
import { MantineProvider } from '@mantine/core'
import '@mantine/core/styles.css'
import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'へんしんマジック・キッチン',
  description: '苦手な食べ物を、魔法のレシピで大好きに変えよう！',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='ja'>
      <head></head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <MantineProvider>
          <Header />
          {children}
        </MantineProvider>
      </body>
    </html>
  )
}
