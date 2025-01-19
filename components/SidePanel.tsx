"use client";

import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Brain, FileText, User, Settings, LogOut } from "lucide-react";
import { useSidebar } from "@/contexts/SidebarContext";

export function SidePanel() {
  const { user, logout } = useAuth();
  const { isOpen } = useSidebar();

  if (!user) return null;

  return (
    <aside
      className={`
        fixed left-0 top-0 h-screen
        transform transition-transform duration-200 ease-in-out
        ${isOpen ? "translate-x-0" : "-translate-x-64"}
        w-64 bg-white border-r border-gray-200 p-6 mt-16 z-30
      `}
    >
    

      <div className="mb-8 p-4 bg-gray-50 rounded-lg">
        <h2 className="text-lg font-semibold text-gray-900 mb-2">
          {user.name}
        </h2>
        <div className="space-y-1">
          <p className="text-sm text-gray-600">{user.email}</p>
          <p className="text-sm text-gray-600">{user.organization}</p>
          <div className="flex items-center mt-2">
            <div className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded">
              {user.billingPlan}
            </div>
          </div>
        </div>
      </div>

      <nav className="flex-1">
        <div className="space-y-1">
          {[
            { href: "/brand-info", icon: User, label: "Brand Info" },
            { href: "/generate-blog", icon: FileText, label: "Generate Blog" },
            { href: "/settings", icon: Settings, label: "Settings" },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 rounded-md hover:bg-gray-100 hover:text-gray-900 transition-colors"
            >
              <item.icon className="mr-3 h-4 w-4" />
              {item.label}
            </Link>
          ))}
        </div>
      </nav>

      <Button
        onClick={logout}
        variant="outline"
        className="mt-6 w-full justify-center text-gray-700 hover:text-gray-900"
      >
        <LogOut className="mr-2 h-4 w-4" />
        Logout
      </Button>
    </aside>
  );
}

export default SidePanel;