import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Sparkles, Search, Zap, Clock, Layout, Share2 } from 'lucide-react'

const features = [
  {
    title: 'AI-Powered Writing',
    description: 'Advanced AI algorithms generate high-quality, original content tailored to your needs.',
    icon: Sparkles,
  },
  {
    title: 'SEO Optimization',
    description: 'Built-in SEO tools ensure your content ranks well in search engines.',
    icon: Search,
  },
  {
    title: 'Lightning Fast',
    description: 'Generate complete blog posts in seconds, not hours.',
    icon: Zap,
  },
  {
    title: 'Save Time',
    description: 'Focus on what matters while we handle the content creation.',
    icon: Clock,
  },
  {
    title: 'Beautiful Formatting',
    description: 'Your posts are automatically formatted for maximum readability.',
    icon: Layout,
  },
  {
    title: 'Easy Sharing',
    description: 'Share your content directly to social media or export in multiple formats.',
    icon: Share2,
  },
]

export function Features() {
  return (
    <section id="features" className="py-20 bg-gray-50">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            Everything You Need to Create<br />
            <span className="text-blue-600">Amazing Content</span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Powerful features to help you create content that stands out
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon
            return (
              <Card key={feature.title} className="border-2 hover:border-blue-600/20 transition-colors">
                <CardHeader>
                  <Icon className="h-10 w-10 text-blue-600" />
                  <CardTitle className="mt-4">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{feature.description}</CardDescription>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}

