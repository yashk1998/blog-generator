"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Brain } from 'lucide-react'
import { AuthDialog } from "@/components/auth-dialog"
import { useAuth } from '@/contexts/AuthContext'

export function Header() {
  const [showAuth, setShowAuth] = useState(false)
  const { user, logout } = useAuth()

  return (
    <>
      <header className="fixed top-0 w-full border-b bg-white/50 backdrop-blur-md z-50">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <Brain className="h-6 w-6 text-blue-600" />
            <span className="text-xl font-bold">rivsy.ai</span>
          </Link>
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="#features" className="text-sm font-medium hover:text-blue-600">
              Features
            </Link>
            <Link href="#faq" className="text-sm font-medium hover:text-blue-600">
              FAQ
            </Link>
            <Link href="#pricing" className="text-sm font-medium hover:text-blue-600">
              Pricing
            </Link>
          </nav>
          {user ? (
            <Button 
              className="bg-blue-600 hover:bg-blue-700"
              onClick={logout}
            >
              Logout
            </Button>
          ) : (
            <Button 
              className="bg-blue-600 hover:bg-blue-700"
              onClick={() => setShowAuth(true)}
            >
              Login
            </Button>
          )}
        </div>
      </header>
      <AuthDialog isOpen={showAuth} onClose={() => setShowAuth(false)} />
    </>
  )
}

