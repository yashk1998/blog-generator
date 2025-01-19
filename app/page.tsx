"use client"
import { Hero } from "@/components/hero";
import { Features } from "@/components/features";
import { Pricing } from "@/components/pricing";
import { FAQ } from "@/components/faq";
import { useEffect } from "react";
import { DashboardLayout } from "./DashboardLayout";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "@/redux/authSlice";
import { useRouter } from "next/navigation";

export default function Home() {
  const dispatch = useDispatch();
  const router = useRouter();
  const user = useSelector((state: any) => state.auth.user);
  useEffect(() => {
    if (user) {
      router.push("/");
    }
  }, [user, router]);

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
