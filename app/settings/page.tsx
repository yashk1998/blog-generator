"use client"

import { useAuth } from '@/contexts/AuthContext'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useSidebar } from "@/contexts/SidebarContext";
import SidePanel from "@/components/SidePanel";

export default function SettingsPage() {
  const { user } = useAuth()
  const router = useRouter()
  const { isOpen } = useSidebar();

  if (!user) {
    router.push('/')
    return null
  }

  return (
    <div className={`container mx-auto px-4 py-8 mt-12 ${isOpen ? "ml-0 md:ml-64" : "ml-0"}`}>
      <h1 className="text-3xl font-bold mb-6">Settings</h1>
      {isOpen && <SidePanel />}
      <form className="space-y-4">
        <div>
          <Label htmlFor="name">Name</Label>
          <Input id="name" defaultValue={user.name} />
        </div>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input id="email" defaultValue={user.email} type="email" />
        </div>
        <div>
          <Label htmlFor="organization">Organization</Label>
          <Input id="organization" defaultValue={user.organization} />
        </div>
        <div>
          <Label htmlFor="billingPlan">Billing Plan</Label>
          <Input id="billingPlan" defaultValue={user.billingPlan} disabled />
        </div>
        <Button type="submit">Save Changes</Button>
      </form>
    </div>
  )
}

