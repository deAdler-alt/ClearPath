import { streamObject } from "ai";
import { groq, GROQ_MODEL } from "@/lib/groq";
import { analysisSchema } from "@/lib/analysis-schema";

export const maxDuration = 30;

export async function POST(req: Request) {
  const { text } = await req.json();

  if (!text || typeof text !== "string") {
    return Response.json({ error: "Brak tekstu do analizy" }, { status: 400 });
  }

  if (!process.env.GROQ_API_KEY) {
    return Response.json(
      { error: "Brak klucza GROQ_API_KEY w zmiennych środowiskowych" },
      { status: 500 }
    );
  }

  const result = streamObject({
    model: groq(GROQ_MODEL),
    schema: analysisSchema,
    system: `Jesteś ekspertem od upraszczania skomplikowanych tekstów medycznych i prawniczych.
Twoim zadaniem jest przetłumaczenie poniższego tekstu na język zrozumiały dla 10-latka (ELI5).
Odpowiadaj ZAWSZE po polsku.
Zwróć wynik w formacie JSON z trzema polami:
- "summary": dokładnie 2 zdania podsumowania w prostym języku
- "action_items": tablica dokładnie 3 prostych kroków do wykonania (np. "Kup lek X", "Umów wizytę u lekarza")
- "difficult_words": tablica obiektów z polami "word" (trudne słowo) i "definition" (prosta definicja)`,
    prompt: text,
  });

  return result.toTextStreamResponse();
}
