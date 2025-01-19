import { NextResponse } from 'next/server';
import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY
});

export async function POST(req: Request) {
  try {
    const { prompt, brandInfo } = await req.json();

    const systemPrompt = `You are a professional blog writer for ${brandInfo.brandName}. 
    Brand Description: ${brandInfo.brandDescription}
    Website: ${brandInfo.websiteUrl}
    
    Write a comprehensive, engaging blog post that aligns with the brand's voice and goals. 
    The content should be well-structured with clear headings and paragraphs.`;

    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: systemPrompt
        },
        {
          role: "user",
          content: `Write a blog post about: ${prompt}`
        }
      ],
      model: "llama-3.3-70b-versatile",
      temperature: 0.7,
      max_tokens: 2048,
    });

    const generatedContent = chatCompletion.choices[0]?.message?.content || "";

    return NextResponse.json({
      success: true,
      content: generatedContent,
      message: "Blog content generated successfully"
    });

  } catch (error) {
    console.error('Error generating blog content:', error);
    return NextResponse.json(
      {
        success: false,
        message: error instanceof Error ? error.message : 'Error generating blog content',
      },
      { status: 500 }
    );
  }
}