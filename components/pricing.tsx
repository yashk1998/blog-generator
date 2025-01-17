"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Check, X } from 'lucide-react'

const plans = [
  {
    name: "BASIC",
    price: 29,
    description: "For individuals",
    features: [
      { name: "Connect your domain", included: true },
      { name: "1 Team member", included: true },
      { name: "< 100,000 pageviews/mo", included: true },
      { name: "< 300 posts", included: true },
      { name: "Subdirectory hosting", included: true },
      { name: "Remove rivsy.ai branding", included: true },
      { name: "Free SSL & CDN", included: true },
      { name: "Schedule Posts", included: false },
      { name: "Privacy-friendly Analytics", included: false },
      { name: "Collaborative review of posts", included: false },
      { name: "AI Helper", included: false },
      { name: "Zapier integration", included: false },
    ],
  },
  {
    name: "PRO",
    price: 49,
    description: "Auto-SEO optimized",
    popular: true,
    features: [
      { name: "Connect your domain", included: true },
      { name: "upto 5 Team members", included: true },
      { name: "< 100,000 pageviews/mo", included: true },
      { name: "< 1000 posts", included: true },
      { name: "Subdirectory hosting", included: true },
      { name: "Remove rivsy.ai branding", included: true },
      { name: "Free SSL & CDN", included: true },
      { name: "Schedule Posts", included: true },
      { name: "Privacy-friendly Analytics", included: true },
      { name: "Collaborative review of posts", included: true },
      { name: "AI Helper", included: false },
      { name: "Zapier integration", included: false },
    ],
  },
  {
    name: "SUPER",
    price: 99,
    description: "AI and Power features",
    features: [
      { name: "Connect your domain", included: true },
      { name: "upto 10 Team members", included: true },
      { name: "< 100,000 pageviews/mo", included: true },
      { name: "< 10,000 posts", included: true },
      { name: "Subdirectory hosting", included: true },
      { name: "Remove rivsy.ai branding", included: true },
      { name: "Free SSL & CDN", included: true },
      { name: "Schedule Posts", included: true },
      { name: "Privacy-friendly Analytics", included: true },
      { name: "Collaborative review of posts", included: true },
      { name: "AI Helper", included: true },
      { name: "Zapier integration", included: true },
    ],
  },
]

export function Pricing() {
  const [isYearly, setIsYearly] = useState(false)

  return (
    <section id="pricing" className="py-20">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            Start with 7-day free trial
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            No credit card needed. Cancel at anytime.
          </p>
        </div>

        <div className="flex justify-center gap-4 mb-8">
          <Button
            variant={isYearly ? "outline" : "default"}
            className="relative"
            onClick={() => setIsYearly(false)}
          >
            Monthly
          </Button>
          <Button
            variant={isYearly ? "default" : "outline"}
            className="relative"
            onClick={() => setIsYearly(true)}
          >
            Yearly
            <Badge variant="secondary" className="absolute -right-12 -top-3">
              Save 10%
            </Badge>
          </Button>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {plans.map((plan) => {
            const price = isYearly ? plan.price * 0.9 : plan.price
            return (
              <Card
                key={plan.name}
                className={`relative ${
                  plan.popular ? "border-blue-600 shadow-lg" : ""
                }`}
              >
                {plan.popular && (
                  <Badge
                    className="absolute -top-3 left-1/2 -translate-x-1/2"
                    variant="default"
                  >
                    MOST POPULAR
                  </Badge>
                )}
                <CardHeader>
                  <CardTitle>{plan.name}</CardTitle>
                  <CardDescription>{plan.description}</CardDescription>
                  <div className="mt-4">
                    <span className="text-4xl font-bold">${price}</span>
                    <span className="text-muted-foreground">/month</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <Button
                    className="w-full mb-6"
                    variant={plan.popular ? "default" : "outline"}
                  >
                    Start free trial
                  </Button>
                  <ul className="space-y-3">
                    {plan.features.map((feature) => (
                      <li
                        key={feature.name}
                        className="flex items-center text-sm gap-2"
                      >
                        {feature.included ? (
                          <Check className="h-4 w-4 text-green-500" />
                        ) : (
                          <X className="h-4 w-4 text-red-500" />
                        )}
                        {feature.name}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}

