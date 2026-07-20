"use client";

import { FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { AppPanel } from "@/components/kiosk/types";

export interface HistoryEntry {
  id: string;
  fileName: string;
  date: string;
  summaryPreview: string;
}

interface HistoryPanelProps {
  entries: HistoryEntry[];
  onNavigate: (panel: AppPanel) => void;
  onSelectEntry: (id: string) => void;
}

export function HistoryPanel({
  entries,
  onNavigate,
  onSelectEntry,
}: HistoryPanelProps) {
  return (
    <div className="flex h-full flex-col">
      <div className="mb-6 border-b border-border pb-4">
        <h2 className="text-2xl font-semibold tracking-tight">Session History</h2>
        <p className="mt-1 text-muted-foreground">
          Documents analyzed during this session
        </p>
      </div>

      {entries.length === 0 ? (
        <div className="flex flex-1 flex-col items-center justify-center border border-dashed border-border bg-muted/30 p-12 text-center">
          <FileText className="mb-4 h-12 w-12 text-muted-foreground" />
          <h3 className="text-lg font-medium">No documents yet</h3>
          <p className="mt-2 max-w-sm text-sm text-muted-foreground">
            Upload a document to start your first analysis. Completed sessions
            will appear here.
          </p>
          <Button
            className="mt-6 min-h-11"
            size="lg"
            onClick={() => onNavigate("upload")}
          >
            Upload Document
          </Button>
        </div>
      ) : (
        <ul className="space-y-3">
          {entries.map((entry) => (
            <li key={entry.id}>
              <button
                type="button"
                onClick={() => {
                  onSelectEntry(entry.id);
                  onNavigate("results");
                }}
                className="flex w-full items-start gap-4 border border-border bg-card p-4 text-left transition-colors hover:border-primary hover:bg-primary/5"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center bg-muted">
                  <FileText className="h-5 w-5 text-primary" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <p className="font-medium truncate">{entry.fileName}</p>
                    <span className="shrink-0 text-xs text-muted-foreground font-mono">
                      {entry.date}
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
                    {entry.summaryPreview}
                  </p>
                </div>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
