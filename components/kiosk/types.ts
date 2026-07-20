import {
  CircleHelp,
  Clock,
  FileUp,
  Home,
  ListChecks,
  Loader2,
} from "lucide-react";

export type AppPanel = "home" | "upload" | "analysis" | "results" | "history" | "help";

export type WorkflowStep = "upload" | "analysis" | "results";

export const WORKFLOW_STEPS: {
  id: WorkflowStep;
  label: string;
  description: string;
}[] = [
  {
    id: "upload",
    label: "Upload",
    description: "Select a medical or legal document",
  },
  {
    id: "analysis",
    label: "Analysis",
    description: "Document is being processed",
  },
  {
    id: "results",
    label: "Results",
    description: "Review your plain-language summary",
  },
];

export const NAV_ITEMS: {
  id: AppPanel;
  label: string;
  description: string;
  icon: typeof Home;
  section: "main" | "tools";
}[] = [
  {
    id: "home",
    label: "Home",
    description: "Welcome and quick actions",
    icon: Home,
    section: "main",
  },
  {
    id: "upload",
    label: "Upload",
    description: "Add a new document",
    icon: FileUp,
    section: "main",
  },
  {
    id: "analysis",
    label: "Analysis",
    description: "Processing status",
    icon: Loader2,
    section: "main",
  },
  {
    id: "results",
    label: "Results",
    description: "Plain-language summary",
    icon: ListChecks,
    section: "main",
  },
  {
    id: "history",
    label: "History",
    description: "Past document sessions",
    icon: Clock,
    section: "tools",
  },
  {
    id: "help",
    label: "Help",
    description: "How to use ClearPath",
    icon: CircleHelp,
    section: "tools",
  },
];

export function panelToWorkflowStep(panel: AppPanel): WorkflowStep | null {
  if (panel === "upload" || panel === "analysis" || panel === "results") {
    return panel;
  }
  return null;
}

export function getWorkflowIndex(step: WorkflowStep): number {
  return WORKFLOW_STEPS.findIndex((s) => s.id === step);
}
