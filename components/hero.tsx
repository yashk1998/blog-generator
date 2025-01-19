"use client"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, CheckCircle2 } from 'lucide-react'
import { useRouter } from 'next/navigation'

export function Hero() {
  const router = useRouter()
  return (
    <section className="pt-24 pb-12 md:pt-32 md:pb-20">
      <div className="container flex flex-col items-center text-center">
        <Badge variant="secondary" className="mb-4">
          🚀 Powered by Advanced AI
        </Badge>
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
          Create Amazing Blog Posts<br />
          <span className="text-blue-600">in Seconds</span>
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-muted-foreground sm:text-xl">
          rivsy.ai is your AI-powered writing assistant. Generate SEO-optimized, engaging blog posts
          with just a few clicks. No more writer's block.
        </p>
        <Button 
          size="lg" 
          className="mt-8 h-12 bg-blue-600 hover:bg-blue-700"
          onClick={() => router.push('#features')}
        >
          Learn More
          <ArrowRight className="ml-2 h-5 w-4" />
        </Button>
        <div className="mt-8 flex flex-wrap justify-center gap-x-8 gap-y-4 text-sm text-muted-foreground">
          {['No credit card required', 'Free trial available', 'Cancel anytime'].map((text) => (
            <div key={text} className="flex items-center">
              <CheckCircle2 className="mr-2 h-4 w-4 text-blue-600" />
              {text}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

