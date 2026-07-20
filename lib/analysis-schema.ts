import { z } from "zod";

export const analysisSchema = z.object({
  summary: z
    .string()
    .describe("Dwa zdania podsumowania w prostym języku (ELI5)"),
  action_items: z
    .array(z.string())
    .length(3)
    .describe("Trzy proste kroki do wykonania"),
  difficult_words: z
    .array(
      z.object({
        word: z.string().describe("Trudne słowo z dokumentu"),
        definition: z.string().describe("Prosta definicja tego słowa"),
      })
    )
    .describe("Trudne słowa z prostymi definicjami"),
});

export type AnalysisResult = z.infer<typeof analysisSchema>;
