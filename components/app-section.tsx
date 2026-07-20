"use client";

import { useCallback, useEffect, useState } from "react";
import { useObject } from "@ai-sdk/react";
import { motion } from "framer-motion";
import { DocumentUploader } from "@/components/document-uploader";
import { AnalysisResult } from "@/components/analysis-result";
import { AnalysisSkeleton } from "@/components/analysis-skeleton";
import { analysisSchema } from "@/lib/analysis-schema";
import { SAMPLE_MEDICAL_TEXT } from "@/lib/sample-text";

type AppState = "upload" | "analyzing" | "results";

export function AppSection() {
  const [appState, setAppState] = useState<AppState>("upload");

  const { object, submit, isLoading, error } = useObject({
    api: "/api/analyze",
    schema: analysisSchema,
  });

  const handleUploadComplete = useCallback(() => {
    setAppState("analyzing");
    submit({ text: SAMPLE_MEDICAL_TEXT });
  }, [submit]);

  useEffect(() => {
    if (appState === "analyzing" && object && !isLoading) {
      setAppState("results");
    }
  }, [appState, object, isLoading]);

  const showResults = appState === "results" || (appState === "analyzing" && !!object);
  const showSkeleton = appState === "analyzing" && isLoading && !object;

  return (
    <section id="app-section" className="px-4 py-20">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
            Przeanalizuj swój dokument
          </h2>
          <p className="mt-4 text-muted-foreground">
            Wgraj dokument, a ClearPath wyjaśni go w prostym języku
          </p>
        </motion.div>

        {appState === "upload" && (
          <DocumentUploader onUploadComplete={handleUploadComplete} />
        )}

        {showSkeleton && <AnalysisSkeleton />}

        {showResults && object && <AnalysisResult data={object} />}

        {error && (
          <div className="mx-auto mt-6 max-w-2xl rounded-lg border border-destructive/50 bg-destructive/10 p-4 text-center text-sm text-destructive">
            {error.message.includes("GROQ_API_KEY")
              ? "Brak klucza GROQ_API_KEY. Dodaj go do pliku .env.local i zrestartuj serwer."
              : `Błąd analizy: ${error.message}`}
          </div>
        )}

        {appState === "results" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-8 text-center"
          >
            <button
              onClick={() => {
                setAppState("upload");
              }}
              className="text-sm text-muted-foreground underline-offset-4 hover:underline"
            >
              Przeanalizuj kolejny dokument
            </button>
          </motion.div>
        )}
      </div>
    </section>
  );
}
