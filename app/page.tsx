import { Hero } from "@/components/hero"
import { Features } from "@/components/features"
import { Pricing } from "@/components/pricing"
import { FAQ } from "@/components/faq"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <>
      <Hero />
      <Features />
      <FAQ />
      <Pricing />
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Get Started with rivsy.ai</h2>
          <div className="flex justify-center space-x-4">
            <Link href="/brand-info">
              <Button variant="outline">Enter Brand Info</Button>
            </Link>
            <Link href="/blog-generation">
              <Button>Generate Blog Post</Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}

