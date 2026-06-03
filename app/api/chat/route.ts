import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";
import { client } from "@/sanity/lib/client";
import {
  PROFILE_QUERY,
  ALL_EXPERIENCE_QUERY,
  ALL_PROJECTS_QUERY,
  ALL_SKILLS_QUERY,
  ALL_EDUCATION_QUERY,
  ALL_SERVICES_QUERY,
} from "@/sanity/lib/queries";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GENERATIVE_AI_API_KEY || "");

// Using stable gemini-1.5-flash model
const MODEL_NAME = "gemini-1.5-flash";

async function getKagisoContext() {
  try {
    const [profile, experience, projects, skills, education, services] = await Promise.all([
      client.fetch(PROFILE_QUERY),
      client.fetch(ALL_EXPERIENCE_QUERY),
      client.fetch(ALL_PROJECTS_QUERY),
      client.fetch(ALL_SKILLS_QUERY),
      client.fetch(ALL_EDUCATION_QUERY),
      client.fetch(ALL_SERVICES_QUERY),
    ]);

    return {
      profile,
      experience,
      projects,
      skills,
      education,
      services,
    };
  } catch (error) {
    console.error("Error fetching data from Sanity:", error);
    return null;
  }
}

function buildSystemPrompt(context: any) {
  const profile = context?.profile;
  const experience = context?.experience;
  const projects = context?.projects;
  const skills = context?.skills;
  const education = context?.education;
  const services = context?.services;

  const profileStr = profile
    ? `
PROFILE:
- Name: ${profile.name || "Kagiso Nyokolodi"}
- Title: ${profile.title || "Principal Frontend Engineer & AI Product Engineering"}
- Email: ${profile.email || "knyokolodi@gmail.com"}
- Phone: ${profile.phone || "+27 72 382 8823"}
- Location: ${profile.location || "South Africa"}
- Bio: ${profile.description || ""}
- Resume Link: ${profile.resumeUrl || ""}
`
    : `
PROFILE:
- Name: Kagiso Nyokolodi
- Title: Principal Frontend Engineer & AI Product Engineering
- Email: knyokolodi@gmail.com
- Phone: +27 72 382 8823
- Location: South Africa
- Bio: Principal Frontend Engineer & AI Product Engineering at Nawiri Group (2022 - Present), specializing in designing and building scalable, high-performance systems.
`;

  const experienceStr = (experience && experience.length > 0)
    ? `WORK EXPERIENCE:
${experience.map((exp: any) => `- ${exp.position} at ${exp.company} (${exp.duration})`).join("\n")}`
    : `WORK EXPERIENCE:
- Principal Frontend Engineer & AI Product Engineering at Nawiri Group (2022 - Present)
- Principal Frontend Engineer & AI Product Engineering at NTT (July 2020 – 2022)
- Senior Software Engineer at Dimension Data (October 2018 – March 2020)
- Software Developer at XPERTEK (September 2015 – September 2018)
- Web & Mobile Developer at IntelliLab (April 2013 – August 2015)`;

  const projectsStr = (projects && projects.length > 0)
    ? `PROJECTS:
${projects.map((proj: any) => `- **${proj.title}** (${proj.category || 'Portfolio Project'}): ${proj.description || ''}
  Tech Stack: ${proj.techStack?.join(', ') || 'React, TypeScript'}
  GitHub: ${proj.github || 'N/A'}
  Live Link: ${proj.live || 'N/A'}`).join("\n\n")}`
    : `PROJECTS:
1. Healthcare Patient Management (Full Stack)
   - Tech: Next.js, TypeScript, Tailwind CSS, Appwrite, Twilio, Shadcn UI
   - Features: Patient registration, appointment booking, SMS notifications, admin scheduling.
2. Ecommerce Website (Frontend)
   - Tech: React, Tailwind CSS, Redux
   - Features: Modern product filtering, shopping cart, checkout flow.
3. Shuttle Client Web App (Full Stack)
   - Tech: React, Node.js, Express, PostgreSQL
   - Features: Transportation booking and management system.
4. Cine-Scope (Full Stack)
   - Tech: React, Next.js, TMDB API, Tailwind CSS
   - Features: Movie database and recommendation platform.`;

  const skillsStr = (skills && skills.length > 0)
    ? `SKILLS:
- ${skills.map((s: any) => s.title).join(", ")}`
    : `SKILLS:
Frontend: React, Next.js, Angular, Vue.js, TypeScript, JavaScript, HTML5, CSS3, Tailwind CSS
Backend: Node.js, Express.js, Nest.js, Ruby on Rails
Databases: PostgreSQL, MongoDB, MySQL, Prisma
Tools: GraphQL, Git, Agile, REST APIs`;

  const educationStr = (education && education.length > 0)
    ? `EDUCATION:
${education.map((edu: any) => `- ${edu.degree} from ${edu.institution} (${edu.duration})`).join("\n")}`
    : `EDUCATION:
- BTECH IT Web and Multimedia from Tshwane University of Technology (2018)
- National Diploma IT Web and Multimedia from Tshwane University of Technology (2013)`;

  const servicesStr = (services && services.length > 0)
    ? `SERVICES OFFERED:
${services.map((ser: any) => `- **${ser.title}**: ${ser.description || ''}`).join("\n")}`
    : `SERVICES OFFERED:
- Web Development: Creating modern, high-performance web applications.
- Frontend Engineering: Designing scalable, clean user interfaces and systems.
- AI Integration: Bringing machine learning and AI functionality to standard web apps.`;

  return `You are an AI assistant for Kagiso Nyokolodi, a highly experienced software engineer with over 10 years of industry experience. Your purpose is to answer questions about Kagiso's professional profile, skills, experience, projects, and availability.

PERSONAL INFORMATION & BIO:
${profileStr}

WORK EXPERIENCE:
${experienceStr}

PROJECTS & CASE STUDIES:
${projectsStr}

TECHNICAL SKILLS:
${skillsStr}

EDUCATION & CREDENTIALS:
${educationStr}

SERVICES OFFERED:
${servicesStr}

RESPONSE STYLE & FORMATTING:
- Be professional, friendly, helpful, and concise.
- Use markdown formatting in your responses:
  - Use **bold** for emphasis on key skills or technology terms.
  - Use bullet points (\`- \`) for lists.
  - Use backticks (\`code\`) for technology names.
  - Use [text](url) for clickable links (e.g. GitHub or LinkedIn).
- Highlight Kagiso's expertise and focus on delivering clean, maintainable code.
- If asked about specific technologies, elaborate on his experience using them.
- For availability, hiring, or collaboration inquiries, suggest reaching out via the contact form on the contact page.
- If asked about something not covered above, politely say you don't have that specific info but can help with general questions.

CO-NAVIGATION & DYNAMIC SUGGESTIONS (CRITICAL):
You can trigger navigation actions in the user's browser, and you should suggest 2-3 relevant follow-up questions for the next turn.
To do this, you MUST append a special single-line JSON metadata block at the VERY END of your response (after all text and empty lines).

The format MUST be EXACTLY:
[METADATA: {"action": {"type": "navigate", "path": "/path"}, "suggestions": ["Question 1", "Question 2"]}]

Choose one of the following paths if the user is interested in that topic:
- Projects / Portfolio: "/projects"
- Experience / Work history: "/work"
- Services offered: "/services"
- Contact info / Hiring: "/contact"
- Case studies: "/case-studies"

If no navigation is needed, omit the "action" key or set it to null:
[METADATA: {"action": null, "suggestions": ["Question 1", "Question 2"]}]

Suggestions should be short, engaging queries that the user might want to ask next (e.g., "Tell me about his React experience", "How can I hire Kagiso?").

IMPORTANT: The metadata block MUST be on its own line at the end of the message. Do not explain the metadata block to the user. Do not include it inside markdown code blocks. Always include 2-3 suggestions in the metadata block.
`;
}

export async function POST(req: Request) {
  try {
    if (!process.env.GOOGLE_GENERATIVE_AI_API_KEY) {
      return NextResponse.json(
        { error: "Missing Gemini API key" },
        { status: 500 }
      );
    }

    const { messages } = await req.json();

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { error: "Messages array is required and cannot be empty" },
        { status: 400 }
      );
    }

    const latestMessage = messages[messages.length - 1];
    if (latestMessage.role !== "user") {
      return NextResponse.json(
        { error: "Latest message must be from user" },
        { status: 400 }
      );
    }

    // Fetch up-to-date data from Sanity CMS
    const sanityContext = await getKagisoContext();
    const systemPrompt = buildSystemPrompt(sanityContext);

    // Get model instance with system instructions
    const model = genAI.getGenerativeModel({
      model: MODEL_NAME,
      systemInstruction: systemPrompt,
    });

    // Formulate history from previous messages (excluding the last one which we send as prompt)
    const history = messages.slice(0, -1).map((msg: any) => ({
      role: msg.role === "user" ? "user" : "model",
      parts: [{ text: msg.content }],
    }));

    // Start chat session with multi-turn history
    const chat = model.startChat({ history });

    // Send latest query
    const result = await chat.sendMessage(latestMessage.content);
    const text = result.response.text();

    return NextResponse.json({
      message: {
        role: "assistant",
        content: text,
      },
    });
  } catch (error) {
    console.error("Gemini API error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "There was an error processing your request" },
      { status: 500 }
    );
  }
}
