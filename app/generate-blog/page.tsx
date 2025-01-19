"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useSidebar } from "@/contexts/SidebarContext";
import SidePanel from "@/components/SidePanel";

interface BrandInfo {
  brandName: string;
  brandDescription: string;
  logoUrl: string;
  websiteUrl: string;
  socialMediaLinks?: string;
}

interface BlogPost {
  title: string;
  content: string;
  createdAt: Date;
}

export default function BlogGenerationPage() {
  const router = useRouter();

  const [topic, setTopic] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isGenerated, setIsGenerated] = useState(false);
  const [brandInfo, setBrandInfo] = useState<BrandInfo | null>(null);
  const [generatedBlog, setGeneratedBlog] = useState<BlogPost | null>(null);
  const [error, setError] = useState("");
  const [userId, setUserId] = useState<string | null>(null);
  const { isOpen } = useSidebar();

  useEffect(() => {
    const userFromStorage = localStorage.getItem("user");

    if (userFromStorage) {
      try {
        const parsedUser = JSON.parse(userFromStorage);
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

  useEffect(() => {
    if (userId === undefined) {
      router.push("/");
      return;
    }

    fetchBrandInfo();
  }, [userId]);

  const fetchBrandInfo = async () => {
    try {
      const userFromStorage = localStorage.getItem("user");
      if (!userFromStorage) {
        throw new Error("No user found in localStorage");
      }

      const parsedUser = JSON.parse(userFromStorage);
      if (!parsedUser.id) {
        throw new Error("No id found in user object");
      }

      const response = await fetch("/api/brand", {
        headers: {
          Authorization: `Bearer ${parsedUser.id}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch brand info");
      }

      const data = await response.json();
      setBrandInfo(data.data);
    } catch (error) {
      setError("Failed to load brand information");
      console.error("Error fetching brand info:", error);
    }
  };

  const generateBlogContent = async (prompt: string) => {
    if (!brandInfo) return null;

    try {
      const response = await fetch("/api/generate-blog", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userId}`,
        },
        body: JSON.stringify({
          prompt,
          brandInfo,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate blog content");
      }

      const data = await response.json();
      return {
        title: topic,
        content: data.content,
        createdAt: new Date(),
      };
    } catch (err) {
      throw new Error("Failed to generate blog content");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const blogPost = await generateBlogContent(topic);
      if (blogPost) {
        setGeneratedBlog(blogPost);
        setIsGenerated(true);

       
        await fetch("/api/save-blog", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userId}`,
          },
          body: JSON.stringify({
            userId,
            blogPost,
          }),
        });
      }
    } catch (err) {
      setError("Failed to generate blog post");
      console.error("Error generating blog:", err);
    } finally {
      setIsLoading(false);
      setTopic("");
    }
  };

  if (!userId) return null;

  return (
    <div className={`container mx-auto px-4 py-8 mt-12 ${isOpen ? "ml-0 md:ml-64" : "ml-0"}`}>
      <h1 className="text-3xl font-bold mb-6">Generate Blog Post</h1>

      {error && (
        <Alert variant="destructive" className="mb-6">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {isGenerated && (
        <Alert className="mb-6">
          <AlertDescription>Blog generated successfully!</AlertDescription>
        </Alert>
      )}
      {isOpen && <SidePanel />}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="topic">Topic, Phrases, or Keywords</Label>
          <Textarea
            id="topic"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="Enter your blog topic, key phrases, or keywords..."
            required
            className="min-h-[100px]"
          />
        </div>

        <Button
          type="submit"
          disabled={isLoading || !brandInfo}
          className="w-full md:w-auto"
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Generating...
            </>
          ) : (
            "Generate Blog"
          )}
        </Button>
      </form>

      {generatedBlog && (
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">{generatedBlog.title}</h2>
          <div className="prose max-w-none">
            {generatedBlog.content.split("\n").map((paragraph, index) => (
              <p key={index} className="mb-4">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}