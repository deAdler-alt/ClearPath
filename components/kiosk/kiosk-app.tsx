"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useObject } from "@ai-sdk/react";
import { AppShell } from "@/components/kiosk/app-shell";
import { HomePanel } from "@/components/kiosk/home-panel";
import { HistoryPanel, type HistoryEntry } from "@/components/kiosk/history-panel";
import { HelpPanel } from "@/components/kiosk/help-panel";
import type { AppPanel } from "@/components/kiosk/types";
import { DocumentUploader } from "@/components/document-uploader";
import { AnalysisResult } from "@/components/analysis-result";
import { AnalysisSkeleton } from "@/components/analysis-skeleton";
import { analysisSchema } from "@/lib/analysis-schema";
import { SAMPLE_MEDICAL_TEXT } from "@/lib/sample-text";

type AppState = "idle" | "uploading" | "analyzing" | "done";

export function KioskApp() {
  const [currentPanel, setCurrentPanel] = useState<AppPanel>("home");
  const [appState, setAppState] = useState<AppState>("idle");
  const [lastFileName, setLastFileName] = useState<string>("document.pdf");
  const [history, setHistory] = useState<HistoryEntry[]>([]);

  const { object, submit, isLoading, error, clear } = useObject({
    api: "/api/analyze",
    schema: analysisSchema,
  });

  const hasResults = appState === "done" && !!object?.summary;

  const unlockedPanels = useMemo(() => {
    const panels = new Set<AppPanel>(["home", "upload", "help", "history"]);
    if (appState === "analyzing" || appState === "done") {
      panels.add("analysis");
    }
    if (appState === "done" && object) {
      panels.add("results");
    }
    return panels;
  }, [appState, object]);

  const handleUploadComplete = useCallback(
    (fileName: string) => {
      setLastFileName(fileName);
      setAppState("analyzing");
      setCurrentPanel("analysis");
      submit({ text: SAMPLE_MEDICAL_TEXT });
    },
    [submit]
  );

  useEffect(() => {
    if (appState === "analyzing" && object && !isLoading && object.summary) {
      setAppState("done");
      setCurrentPanel("results");

      setHistory((prev) => {
        const entry: HistoryEntry = {
          id: `${Date.now()}`,
          fileName: lastFileName,
          date: new Date().toLocaleTimeString("en-GB", {
            hour: "2-digit",
            minute: "2-digit",
          }),
          summaryPreview: object.summary ?? "Analysis complete",
        };
        return [entry, ...prev.filter((e) => e.fileName !== lastFileName)].slice(0, 10);
      });
    }
  }, [appState, object, isLoading, lastFileName]);

  const handleNavigate = (panel: AppPanel) => {
    if (unlockedPanels.has(panel)) {
      setCurrentPanel(panel);
    }
  };

  const handleStartOver = () => {
    clear();
    setAppState("idle");
    setCurrentPanel("home");
    setLastFileName("document.pdf");
  };

  const handleAnalyzeAnother = () => {
    clear();
    setAppState("idle");
    setCurrentPanel("upload");
  };

  const showSkeleton = currentPanel === "analysis" && isLoading && !object;
  const showResults =
    currentPanel === "results" && object && (appState === "done" || !!object.summary);

  return (
    <AppShell
      currentPanel={currentPanel}
      unlockedPanels={unlockedPanels}
      onNavigate={handleNavigate}
      onStartOver={handleStartOver}
      onAnalyzeAnother={handleAnalyzeAnother}
      onContinue={() => setCurrentPanel("upload")}
    >
      {currentPanel === "home" && (
        <HomePanel
          onNavigate={handleNavigate}
          hasResults={hasResults}
          sessionCount={history.length}
        />
      )}

      {currentPanel === "upload" && (
        <DocumentUploader onUploadComplete={handleUploadComplete} />
      )}

      {currentPanel === "analysis" && showSkeleton && <AnalysisSkeleton />}

      {currentPanel === "analysis" && !showSkeleton && appState === "analyzing" && (
        <AnalysisSkeleton />
      )}

      {showResults && <AnalysisResult data={object} />}

      {currentPanel === "results" && !object && (
        <div className="flex flex-1 flex-col items-center justify-center border border-dashed border-border p-12 text-center">
          <p className="text-lg font-medium">No results yet</p>
          <p className="mt-2 text-sm text-muted-foreground">
            Upload a document to see your analysis here.
          </p>
        </div>
      )}

      {currentPanel === "history" && (
        <HistoryPanel
          entries={history}
          onNavigate={handleNavigate}
          onSelectEntry={() => setCurrentPanel("results")}
        />
      )}

      {currentPanel === "help" && <HelpPanel onNavigate={handleNavigate} />}

      {error && (
        <div className="mt-4 border border-destructive/40 bg-destructive/10 p-4 text-sm text-destructive">
          {error.message.includes("GROQ_API_KEY")
            ? "GROQ_API_KEY is missing. Add it to .env.local and restart the server."
            : `Analysis error: ${error.message}`}
        </div>
      )}
    </AppShell>
  );
}
