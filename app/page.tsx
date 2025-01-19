import { Hero } from "@/components/hero";
import { Features } from "@/components/features";
import { Pricing } from "@/components/pricing";
import { FAQ } from "@/components/faq";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { DashboardLayout } from "./DashboardLayout";
import { useSidebar } from "@/contexts/SidebarContext";
import SidePanel from "@/components/SidePanel";

export default function Home() {
  return (
    <>
      <DashboardLayout>
        <Hero />
        <Features />
        <FAQ />
        <Pricing />
      </DashboardLayout>
    </>
  );
}
