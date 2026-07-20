"use client";

import { Skeleton } from "@/components/ui/skeleton";

interface AnalysisSkeletonProps {
  status?: string;
}

export function AnalysisSkeleton({
  status = "Analyzing your document...",
}: AnalysisSkeletonProps) {
  return (
    <div className="flex h-full flex-col">
      <div className="mb-6 border-b border-border pb-4">
        <h2 className="text-2xl font-semibold tracking-tight">{status}</h2>
        <p className="mt-1 font-mono text-sm text-muted-foreground">
          Processing — please wait
        </p>
      </div>

      <div className="grid flex-1 grid-cols-1 gap-4 md:grid-cols-2">
        <div className="border border-border bg-card p-4 md:col-span-2">
          <Skeleton className="mb-3 h-5 w-24" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
            <Skeleton className="h-4 w-4/6" />
          </div>
        </div>

        <div className="border border-border bg-card p-4">
          <Skeleton className="mb-3 h-5 w-40" />
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center gap-3">
                <Skeleton className="h-5 w-5" />
                <Skeleton className="h-4 flex-1" />
              </div>
            ))}
          </div>
        </div>

        <div className="border border-border bg-card p-4">
          <Skeleton className="mb-3 h-5 w-32" />
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="space-y-1">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-3 w-full" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
