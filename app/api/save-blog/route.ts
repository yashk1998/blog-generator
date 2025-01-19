import { NextResponse } from "next/server";
import connectDb from "../../lib/db";
import Blog from "../model/Blog";
import { BlogResponse } from "../../types/blog";

export async function POST(req: Request): Promise<NextResponse<BlogResponse>> {
  try {
    await connectDb();

    
    const authHeader = req.headers.get("Authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json(
        {
          success: false,
          message: "Authorization header is missing or invalid",
        },
        { status: 401 }
      );
    }

   
    const body = await req.json();
    const { userId, blogPost } = body;

    if (!userId || !blogPost || !blogPost.title || !blogPost.content) {
      return NextResponse.json(
        {
          success: false,
          message: "Missing required fields",
        },
        { status: 400 }
      );
    }

    const newBlog = await Blog.create({
      userId,
      title: blogPost.title,
      content: blogPost.content,
      createdAt: blogPost.createdAt || new Date(),
    });

    return NextResponse.json({
      success: true,
      data: newBlog,
      message: "Blog post saved successfully",
    });
  } catch (error) {
    console.error("Error saving blog post:", error);
    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error ? error.message : "Error saving blog post",
      },
      { status: 500 }
    );
  }
}
