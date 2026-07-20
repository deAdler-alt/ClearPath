"use client";

import { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import type { AnalysisResult as AnalysisResultType } from "@/lib/analysis-schema";
import type { DeepPartial } from "ai";

interface AnalysisResultProps {
  data: DeepPartial<AnalysisResultType> | undefined;
}

export function AnalysisResult({ data }: AnalysisResultProps) {
  const [checkedItems, setCheckedItems] = useState<Record<number, boolean>>({});

  if (!data) return null;

  const toggleItem = (index: number) => {
    setCheckedItems((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  return (
    <div className="flex h-full flex-col">
      <div className="mb-6 border-b border-border pb-4">
        <h2 className="text-2xl font-semibold tracking-tight">Analysis Results</h2>
        <p className="mt-1 text-muted-foreground">
          Your document explained in plain English
        </p>
      </div>

      <div className="grid flex-1 grid-cols-1 gap-4 md:grid-cols-2">
        <div className="border border-border bg-card p-5 md:col-span-2">
          <h3 className="mb-1 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
            Summary
          </h3>
          <p className="text-base leading-relaxed">
            {data.summary || "Analyzing document..."}
          </p>
        </div>

        <div className="border border-border bg-card p-5">
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
            What you need to do
          </h3>
          <ul className="space-y-3">
            {(data.action_items ?? []).map((item, index) => (
              <li key={index} className="flex items-start gap-3">
                <Checkbox
                  id={`action-${index}`}
                  checked={checkedItems[index] ?? false}
                  onCheckedChange={() => toggleItem(index)}
                  className="mt-0.5"
                />
                <label
                  htmlFor={`action-${index}`}
                  className={`cursor-pointer text-sm leading-relaxed ${
                    checkedItems[index]
                      ? "text-muted-foreground line-through"
                      : ""
                  }`}
                >
                  {item || "..."}
                </label>
              </li>
            ))}
            {(!data.action_items || data.action_items.length === 0) && (
              <li className="text-sm text-muted-foreground">Loading steps...</li>
            )}
          </ul>
        </div>

        <div className="border border-border bg-card p-5">
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
            Glossary
          </h3>
          {(data.difficult_words ?? []).length > 0 ? (
            <Accordion type="single" collapsible className="w-full">
              {data.difficult_words!.map((entry, index) => (
                <AccordionItem key={index} value={`word-${index}`}>
                  <AccordionTrigger className="text-sm font-medium">
                    {entry?.word || "..."}
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-muted-foreground">
                    {entry?.definition || "..."}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          ) : (
            <p className="text-sm text-muted-foreground">Loading glossary...</p>
          )}
        </div>
      </div>
    </div>
  );
}
