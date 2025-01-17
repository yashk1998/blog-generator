import { Inter } from 'next/font/google'
import './globals.css'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { AuthProvider } from '@/contexts/AuthContext'
import { SidePanel } from '@/components/SidePanel'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'rivsy.ai - Generate Stunning Blogs in Seconds',
  description: 'The most powerful AI blog generator. Create SEO-optimized content instantly.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <Header />
          <div className="flex">
            <SidePanel />
            <main className="flex-1 ml-64">
              {children}
            </main>
          </div>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  )
}

