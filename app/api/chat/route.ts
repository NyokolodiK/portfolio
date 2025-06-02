import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export async function POST(req: Request) {
  try {
    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json(
        { error: "Missing Gemini API key" },
        { status: 500 }
      );
    }

    const { messages } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: "Messages array is required" },
        { status: 400 }
      );
    }

    const systemMessage = {
      role: "system",
      content: `You are an AI assistant for Kagiso Nyokolodi, a Senior Software Engineer.
      Answer questions about Kagiso, his skills, projects, and experience based on the following information:

      - Works as a Senior Software Engineer
      - Specializes in designing and building scalable systems
      - Leads teams and mentors peers
      - Focuses on delivering efficient, high-quality software solutions
      - Has experience with Next.js, React, TypeScript, and other modern web technologies
      - Portfolio projects include:
        1. Healthcare Patient Management (Full Stack)
        2. Ecommerce Website (Frontend)
        3. Shuttle Client Web App (Full Stack)
        4. Cine-Scope (Full Stack)

      Be professional, concise, and helpful. If asked about something not in this context, you can politely say you don't have that specific information.`
    };

    const userMessage = messages.findLast(msg => msg.role === "user");

    if (!userMessage) {
      return NextResponse.json(
        { error: "At least one user message is required" },
        { status: 400 }
      );
    }

    const enhancedUserPrompt = `${systemMessage.content}\n\nUser message: ${userMessage.content}`;
    const { response } = await model.generateContent(enhancedUserPrompt);
    const text = response.text();

    return NextResponse.json({
      message: {
        role: "assistant",
        content: text
      },
    });
  } catch (error) {
    console.error('Gemini API error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "There was an error processing your request" },
      { status: 500 }
    );
  }
}
