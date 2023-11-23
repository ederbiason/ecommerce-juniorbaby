import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Toaster } from '@/components/ui/toaster'
import { LayoutProvider } from '@/providers/LayoutProvider'
import { StoreProvider } from '@/providers/StoreProvider'

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
        <main className="">
          <StoreProvider>
            <LayoutProvider>
              {children}
            </LayoutProvider>
          </StoreProvider>
  
          <Toaster  />
        </main>
      </body>
    </html>
  )
}
