"use client";

import { cn } from "@/lib/utils";
import { NAV_ITEMS, type AppPanel } from "@/components/kiosk/types";

interface SidebarNavProps {
  currentPanel: AppPanel;
  onNavigate: (panel: AppPanel) => void;
  unlockedPanels: Set<AppPanel>;
}

export function SidebarNav({
  currentPanel,
  onNavigate,
  unlockedPanels,
}: SidebarNavProps) {
  const mainItems = NAV_ITEMS.filter((item) => item.section === "main");
  const toolItems = NAV_ITEMS.filter((item) => item.section === "tools");

  const renderItem = (item: (typeof NAV_ITEMS)[number]) => {
    const Icon = item.icon;
    const isActive = item.id === currentPanel;
    const isUnlocked = unlockedPanels.has(item.id);

    return (
      <li key={item.id}>
        <button
          type="button"
          disabled={!isUnlocked}
          onClick={() => isUnlocked && onNavigate(item.id)}
          className={cn(
            "flex w-full items-start gap-3 border px-3 py-3 text-left transition-colors",
            isActive
              ? "border-primary bg-primary/10 shadow-sm"
              : "border-transparent hover:bg-accent/60",
            !isUnlocked && "cursor-not-allowed opacity-40",
            isUnlocked && !isActive && "hover:border-border"
          )}
        >
          <Icon
            className={cn(
              "mt-0.5 h-4 w-4 shrink-0",
              isActive ? "text-primary" : "text-muted-foreground",
              item.id === "analysis" && isActive && "animate-spin"
            )}
          />
          <div>
            <p
              className={cn(
                "text-sm font-medium",
                isActive ? "text-foreground" : "text-muted-foreground"
              )}
            >
              {item.label}
            </p>
            <p className="mt-0.5 text-xs text-muted-foreground">
              {item.description}
            </p>
          </div>
        </button>
      </li>
    );
  };

  return (
    <aside className="flex w-full flex-col border-r border-border bg-card lg:w-60">
      <div className="border-b border-border px-4 py-3">
        <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
          Navigation
        </p>
      </div>

      <nav className="flex-1 overflow-y-auto p-2">
        <ul className="space-y-1">{mainItems.map(renderItem)}</ul>

        <div className="my-3 border-t border-border" />

        <p className="mb-2 px-3 font-mono text-xs uppercase tracking-wider text-muted-foreground">
          Tools
        </p>
        <ul className="space-y-1">{toolItems.map(renderItem)}</ul>
      </nav>
    </aside>
  );
}
