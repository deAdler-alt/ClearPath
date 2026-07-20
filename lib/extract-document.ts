import { extractText, getDocumentProxy } from "unpdf";

const MIN_TEXT_LENGTH = 40;

export async function extractTextFromFile(file: File): Promise<string> {
  const mimeType = file.type;
  const name = file.name.toLowerCase();

  if (mimeType === "application/pdf" || name.endsWith(".pdf")) {
    return extractTextFromPdf(file);
  }

  if (mimeType.startsWith("text/") || name.endsWith(".txt")) {
    return file.text();
  }

  if (mimeType.startsWith("image/")) {
    throw new Error(
      "Image OCR is not supported yet. Please upload a PDF or plain-text file."
    );
  }

  throw new Error(
    "Unsupported file type. Please upload a PDF or plain-text (.txt) document."
  );
}

async function extractTextFromPdf(file: File): Promise<string> {
  const buffer = await file.arrayBuffer();
  const pdf = await getDocumentProxy(new Uint8Array(buffer));
  const { text } = await extractText(pdf, { mergePages: true });
  const normalized = text.replace(/\s+/g, " ").trim();

  if (normalized.length < MIN_TEXT_LENGTH) {
    throw new Error(
      "Could not extract enough text from this PDF. It may be a scanned image — try a text-based PDF."
    );
  }

  return normalized;
}
