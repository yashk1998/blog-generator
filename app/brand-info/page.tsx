"use client"

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useAuth } from '@/contexts/AuthContext'
import { useRouter } from 'next/navigation'

export default function BrandInfoPage() {
  const { user } = useAuth()
  const router = useRouter()

  const [formData, setFormData] = useState({
    brandName: '',
    brandDescription: '',
    logoUrl: '',
    websiteUrl: '',
    socialMediaLinks: '',
  })
  const [isSubmitted, setIsSubmitted] = useState(false)

  if (!user) {
    router.push('/')
    return null
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
    setIsSubmitted(true)
    setFormData({
      brandName: '',
      brandDescription: '',
      logoUrl: '',
      websiteUrl: '',
      socialMediaLinks: '',
    })
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Brand Information</h1>
      {isSubmitted && (
        <Alert className="mb-6">
          <AlertDescription>
            Brand information submitted successfully!
          </AlertDescription>
        </Alert>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="brandName">Brand Name *</Label>
          <Input
            id="brandName"
            name="brandName"
            value={formData.brandName}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <Label htmlFor="brandDescription">Brand Description *</Label>
          <Textarea
            id="brandDescription"
            name="brandDescription"
            value={formData.brandDescription}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <Label htmlFor="logoUrl">Logo URL *</Label>
          <Input
            id="logoUrl"
            name="logoUrl"
            type="url"
            value={formData.logoUrl}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <Label htmlFor="websiteUrl">Website URL *</Label>
          <Input
            id="websiteUrl"
            name="websiteUrl"
            type="url"
            value={formData.websiteUrl}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <Label htmlFor="socialMediaLinks">Social Media Links (optional)</Label>
          <Input
            id="socialMediaLinks"
            name="socialMediaLinks"
            value={formData.socialMediaLinks}
            onChange={handleInputChange}
          />
        </div>
        <Button type="submit">Submit</Button>
      </form>
    </div>
  )
}

