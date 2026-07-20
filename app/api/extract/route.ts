import { extractTextFromFile } from "@/lib/extract-document";

export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file");

    if (!file || !(file instanceof File)) {
      return Response.json({ error: "No file provided" }, { status: 400 });
    }

    const text = await extractTextFromFile(file);

    return Response.json({
      text,
      fileName: file.name,
      characterCount: text.length,
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to extract text from document";

    return Response.json({ error: message }, { status: 422 });
  }
}
