"use client";

import { StepIndicator } from "@/components/kiosk/step-indicator";
import { SidebarNav } from "@/components/kiosk/sidebar-nav";
import { ActionBar } from "@/components/kiosk/action-bar";
import { panelToWorkflowStep, type AppPanel } from "@/components/kiosk/types";

interface AppShellProps {
  currentPanel: AppPanel;
  unlockedPanels: Set<AppPanel>;
  onNavigate: (panel: AppPanel) => void;
  onStartOver: () => void;
  onAnalyzeAnother?: () => void;
  onContinue?: () => void;
  children: React.ReactNode;
}

export function AppShell({
  currentPanel,
  unlockedPanels,
  onNavigate,
  onStartOver,
  onAnalyzeAnother,
  onContinue,
  children,
}: AppShellProps) {
  const workflowStep = panelToWorkflowStep(currentPanel);

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-background">
      <header className="flex h-15 shrink-0 items-center justify-between border-b border-border bg-card px-4 sm:px-6 py-3">
        <button
          type="button"
          onClick={() => onNavigate("home")}
          className="flex items-center gap-3 text-left transition-opacity hover:opacity-80"
        >
          <div className="flex h-9 w-9 items-center justify-center bg-primary text-primary-foreground">
            <span className="text-sm font-bold tracking-tight">CP</span>
          </div>
          <div>
            <h1 className="text-base font-semibold leading-none tracking-tight">
              ClearPath
            </h1>
            <p className="mt-0.5 text-xs text-muted-foreground">
              Document clarity terminal
            </p>
          </div>
        </button>
        <StepIndicator currentStep={workflowStep} />
      </header>

      <div className="flex min-h-0 flex-1 flex-col lg:flex-row">
        <SidebarNav
          currentPanel={currentPanel}
          onNavigate={onNavigate}
          unlockedPanels={unlockedPanels}
        />
        <main className="flex min-h-0 flex-1 flex-col overflow-hidden bg-background">
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">{children}</div>
        </main>
      </div>

      <ActionBar
        currentPanel={currentPanel}
        onStartOver={onStartOver}
        onAnalyzeAnother={onAnalyzeAnother}
        onContinue={onContinue}
      />
    </div>
  );
}
