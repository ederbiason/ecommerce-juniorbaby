import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Navbar } from '@/components/Navbar'
import { Toaster } from '@/components/ui/toaster'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Estoque',
  description: 'Homepage do aplicativo de gerenciamento de estoque',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main className="h-full flex flex-col justify-center items-center">
          <Navbar />
          {children}
          <Toaster  />
        </main>
      </body>
    </html>
  )
}
