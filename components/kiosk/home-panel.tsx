"use client";

import { Button } from "@/components/ui/button";
import {
  FileUp,
  Clock,
  CircleHelp,
  Shield,
  Zap,
} from "lucide-react";
import type { AppPanel } from "@/components/kiosk/types";

interface HomePanelProps {
  onNavigate: (panel: AppPanel) => void;
  hasResults: boolean;
  sessionCount: number;
}

const quickActions = [
  {
    id: "upload" as const,
    title: "Analyze a Document",
    description: "Upload a medical or legal document and get a plain-English summary.",
    icon: FileUp,
    primary: true,
  },
  {
    id: "history" as const,
    title: "Session History",
    description: "Browse documents you have analyzed in this session.",
    icon: Clock,
    primary: false,
  },
  {
    id: "help" as const,
    title: "Help & Guide",
    description: "Learn how ClearPath works and what documents are supported.",
    icon: CircleHelp,
    primary: false,
  },
];

export function HomePanel({ onNavigate, hasResults, sessionCount }: HomePanelProps) {
  return (
    <div className="flex h-full flex-col">
      <div className="mb-8 border-b border-border pb-6">
        <p className="text-sm font-medium text-primary">Welcome</p>
        <h2 className="mt-1 text-3xl font-semibold tracking-tight text-foreground">
          Understand your health and rights in seconds
        </h2>
        <p className="mt-3 max-w-2xl text-base text-muted-foreground leading-relaxed">
          ClearPath translates complex medical and legal documents into plain
          English. Select an option below to get started.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 mb-8">
        {quickActions.map((action) => (
          <button
            key={action.id}
            type="button"
            onClick={() => onNavigate(action.id)}
            className={`group flex flex-col items-start gap-4 border p-6 text-left transition-all hover:border-primary hover:shadow-sm ${
              action.primary
                ? "border-primary/30 bg-primary/5"
                : "border-border bg-card hover:bg-accent/50"
            }`}
          >
            <div
              className={`flex h-12 w-12 items-center justify-center ${
                action.primary
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-foreground"
              }`}
            >
              <action.icon className="h-6 w-6" />
            </div>
            <div>
              <h3 className="text-lg font-semibold">{action.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
                {action.description}
              </p>
            </div>
            <span className="text-sm font-medium text-primary opacity-0 transition-opacity group-hover:opacity-100">
              Open →
            </span>
          </button>
        ))}
      </div>

      {hasResults && (
        <div className="mb-8 flex items-center justify-between border border-primary/20 bg-primary/5 p-4">
          <div>
            <p className="font-medium">Your latest analysis is ready</p>
            <p className="text-sm text-muted-foreground">
              View the summary, action items, and glossary from your last document.
            </p>
          </div>
          <Button onClick={() => onNavigate("results")} size="lg" className="min-h-11">
            View Results
          </Button>
        </div>
      )}

      <div className="mt-auto grid grid-cols-1 gap-4 border-t border-border pt-6 sm:grid-cols-3">
        <div className="flex items-start gap-3">
          <Shield className="mt-0.5 h-5 w-5 text-primary shrink-0" />
          <div>
            <p className="text-sm font-medium">Private & secure</p>
            <p className="text-xs text-muted-foreground mt-0.5">
              Documents are processed securely and not stored permanently.
            </p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <Zap className="mt-0.5 h-5 w-5 text-primary shrink-0" />
          <div>
            <p className="text-sm font-medium">Instant analysis</p>
            <p className="text-xs text-muted-foreground mt-0.5">
              Powered by Groq AI for near-instant plain-language results.
            </p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <Clock className="mt-0.5 h-5 w-5 text-primary shrink-0" />
          <div>
            <p className="text-sm font-medium">
              {sessionCount} session{sessionCount !== 1 ? "s" : ""} today
            </p>
            <p className="text-xs text-muted-foreground mt-0.5">
              Track your document analyses in the History panel.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
