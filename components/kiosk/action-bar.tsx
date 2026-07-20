"use client";

import { Button } from "@/components/ui/button";
import type { AppPanel } from "@/components/kiosk/types";

interface ActionBarProps {
  currentPanel: AppPanel;
  onStartOver: () => void;
  onAnalyzeAnother?: () => void;
  onContinue?: () => void;
}

export function ActionBar({
  currentPanel,
  onStartOver,
  onAnalyzeAnother,
  onContinue,
}: ActionBarProps) {
  const showContinue = currentPanel === "home" && onContinue;
  const showAnalyzeAnother = currentPanel === "results" && onAnalyzeAnother;

  return (
    <footer className="flex h-16 shrink-0 items-center justify-between border-t border-border bg-card px-4 sm:px-6">
      <Button
        variant="outline"
        size="lg"
        onClick={onStartOver}
        className="min-h-11 font-medium"
      >
        {currentPanel === "home" ? "Reset Session" : "Start Over"}
      </Button>

      <div className="font-mono text-xs text-muted-foreground capitalize">
        {currentPanel === "home"
          ? "Home"
          : currentPanel === "history"
            ? "History"
            : currentPanel === "help"
              ? "Help"
              : `Step ${
                  currentPanel === "upload"
                    ? "1"
                    : currentPanel === "analysis"
                      ? "2"
                      : "3"
                } of 3`}
      </div>

      {showContinue ? (
        <Button size="lg" onClick={onContinue} className="min-h-11 font-medium">
          Upload Document →
        </Button>
      ) : showAnalyzeAnother ? (
        <Button size="lg" onClick={onAnalyzeAnother} className="min-h-11 font-medium">
          Analyze Another
        </Button>
      ) : currentPanel === "upload" ? (
        <div className="hidden sm:block text-xs text-muted-foreground">
          Tap the drop zone or browse files
        </div>
      ) : (
        <div className="w-[120px]" />
      )}
    </footer>
  );
}
