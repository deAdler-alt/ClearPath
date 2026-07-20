import { streamObject } from "ai";
import { groq, GROQ_MODEL } from "@/lib/groq";
import { analysisSchema } from "@/lib/analysis-schema";

export const maxDuration = 30;

export async function POST(req: Request) {
  const { text } = await req.json();

  if (!text || typeof text !== "string") {
    return Response.json({ error: "No text provided for analysis" }, { status: 400 });
  }

  if (!process.env.GROQ_API_KEY) {
    return Response.json(
      { error: "GROQ_API_KEY is not configured in environment variables" },
      { status: 500 }
    );
  }

  const result = streamObject({
    model: groq(GROQ_MODEL),
    schema: analysisSchema,
    system: `You are an expert at simplifying complex medical and legal texts.
Your task is to explain the following text in plain English that a 10-year-old could understand (ELI5).
Always respond in English.
Return the result as JSON with three fields:
- "summary": exactly 2 sentences summarizing the document in plain language
- "action_items": an array of exactly 3 simple action steps (e.g. "Buy medicine X", "Schedule a doctor appointment")
- "difficult_words": an array of objects with "word" (difficult term) and "definition" (simple explanation)`,
    prompt: text,
  });

  return result.toTextStreamResponse();
}
