"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useRouter } from "next/navigation";
import { BrandInfoInput } from "../types/brand";
import { useSidebar } from "@/contexts/SidebarContext";
import SidePanel from "@/components/SidePanel";

export default function BrandInfoPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const { isOpen } = useSidebar();
  const [formData, setFormData] = useState<BrandInfoInput>({
    brandName: "",
    brandDescription: "",
    logoUrl: "",
    websiteUrl: "",
    socialMediaLinks: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    const userFromStorage = localStorage.getItem("user");

    if (userFromStorage) {
      try {
        const parsedUser = JSON.parse(userFromStorage);
        console.log("Parsed User:", parsedUser);
        console.log("Parsed User.id:", parsedUser.id);

        if (parsedUser && parsedUser.id) {
          setUserId(parsedUser.id.toString());
        } else {
          console.warn("User object does not contain an 'id' field");
          setUserId(null);
        }
      } catch (error) {
        console.error("Failed to parse user from localStorage:", error);
        setUserId(null);
      }
    }
  }, []);
  console.log("userId", userId);

  if (userId === null) {
    return null;
  }

  if (userId === undefined) {
    router.push("/");
    return null;
  }

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/brand", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          userId: userId,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Something went wrong");
      }
      console.log("formData", formData);
      setIsSubmitted(true);
      setFormData({
        brandName: "",
        brandDescription: "",
        logoUrl: "",
        websiteUrl: "",
        socialMediaLinks: "",
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`container mx-auto px-4 py-8 mt-12 ${isOpen ? "ml-0 md:ml-64" : "ml-0"}`}>
      <h1 className="text-3xl font-bold mb-6">Brand Information</h1>
      {error && (
        <Alert variant="destructive" className="mb-6">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {isSubmitted && (
        <Alert className="mb-6">
          <AlertDescription>
            Brand information submitted successfully!
          </AlertDescription>
        </Alert>
      )}
      {isOpen && <SidePanel />}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="brandName">Brand Name *</Label>
          <Input
            id="brandName"
            name="brandName"
            value={formData.brandName}
            onChange={handleInputChange}
            required
            disabled={isLoading}
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
            disabled={isLoading}
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
            disabled={isLoading}
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
            disabled={isLoading}
          />
        </div>

        <div>
          <Label htmlFor="socialMediaLinks">
            Social Media Links (optional)
          </Label>
          <Input
            id="socialMediaLinks"
            name="socialMediaLinks"
            value={formData.socialMediaLinks}
            onChange={handleInputChange}
            disabled={isLoading}
          />
        </div>

        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Submitting..." : "Submit"}
        </Button>
      </form>
    </div>
  );
}
