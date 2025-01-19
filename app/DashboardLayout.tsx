"use client";

import { useSidebar } from "@/contexts/SidebarContext";
import { SidePanel } from "../components/SidePanel";

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { isOpen } = useSidebar();

  return (
    <div className="min-h-screen">
      <SidePanel />
      <main
        className={`
          transition-all duration-200 ease-in-out
          ${isOpen ? "ml-0 md:ml-64" : "ml-0"}
          mt-16 px-4 py-8
        `}
      >
        {children}
      </main>
    </div>
  );
}

export default DashboardLayout;