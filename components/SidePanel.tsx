"use client"

import Link from 'next/link'
import { useAuth } from '@/contexts/AuthContext'
import { Button } from '@/components/ui/button'
import { Brain, FileText, User, Settings, LogOut } from 'lucide-react'

export function SidePanel() {
  const { user, logout } = useAuth()

  if (!user) return null

  return (
    <div className="w-64 h-screen bg-gray-100 p-4 fixed left-0 top-0">
      <div className="flex items-center mb-6">
        <Brain className="h-6 w-6 text-blue-600 mr-2" />
        <span className="text-xl font-bold">rivsy.ai</span>
      </div>
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-2">{user.name}</h2>
        <p className="text-sm text-gray-600">{user.email}</p>
        <p className="text-sm text-gray-600">{user.organization}</p>
        <p className="text-sm text-gray-600">Plan: {user.billingPlan}</p>
      </div>
      <nav className="space-y-2">
        <Link href="/generate-blog" className="flex items-center p-2 hover:bg-gray-200 rounded">
          <FileText className="mr-2 h-4 w-4" />
          Generate Blog
        </Link>
        <Link href="/brand-info" className="flex items-center p-2 hover:bg-gray-200 rounded">
          <User className="mr-2 h-4 w-4" />
          Brand Info
        </Link>
        <Link href="/settings" className="flex items-center p-2 hover:bg-gray-200 rounded">
          <Settings className="mr-2 h-4 w-4" />
          Settings
        </Link>
      </nav>
      <Button onClick={logout} className="mt-6 w-full">
        <LogOut className="mr-2 h-4 w-4" />
        Logout
      </Button>
    </div>
  )
}

