import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const faqs = [
  {
    question: "What exactly is rivsy.ai?",
    answer: "rivsy.ai is an insanely fast blogging platform with best practices built-in. It combines AI-powered content generation with optimized delivery for the best possible blogging experience."
  },
  {
    question: "What does rivsy.ai provide?",
    answer: "With rivsy.ai, you don't need to worry about best practices, SEO audits and managing your server. You can purely focus on writing the content. Rest all are handled by rivsy.ai automatically."
  },
  {
    question: "Can I connect my own domain?",
    answer: "Yes! For example, you can connect mysite.com/blog or blog.mywebsite.com or news.mysite.com or mywebsite.com or etc."
  },
  {
    question: "Can I use rivsy.ai in combination with my existing website/app?",
    answer: "Yes! You can use rivsy.ai with any landing page. For example, your landing page can be built with Webflow, WordPress, Wix, NextJS, React, Vue, or any other platform. Once you purchase a plan and connect your domain to rivsy.ai, instructions will be shown in the dashboard instantly."
  },
  // Add all other FAQs similarly
]

export function FAQ() {
  return (
    <section id="faq" className="py-20 bg-gray-50">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Everything you need to know about rivsy.ai
          </p>
        </div>
        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger>{faq.question}</AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  )
}

