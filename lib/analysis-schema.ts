import { z } from "zod";

export const analysisSchema = z.object({
  summary: z
    .string()
    .describe("Two sentences summarizing the document in plain English (ELI5)"),
  action_items: z
    .array(z.string())
    .length(3)
    .describe("Three simple action steps to take"),
  difficult_words: z
    .array(
      z.object({
        word: z.string().describe("Difficult word from the document"),
        definition: z.string().describe("Simple definition of the word"),
      })
    )
    .describe("Difficult words with simple definitions"),
});

export type AnalysisResult = z.infer<typeof analysisSchema>;
