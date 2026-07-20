"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { BookOpen, Brain, ListChecks } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import type { AnalysisResult as AnalysisResultType } from "@/lib/analysis-schema";
import type { DeepPartial } from "ai";

interface AnalysisResultProps {
  data: DeepPartial<AnalysisResultType> | undefined;
}

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.5 },
  }),
};

export function AnalysisResult({ data }: AnalysisResultProps) {
  const [checkedItems, setCheckedItems] = useState<Record<number, boolean>>({});

  if (!data) return null;

  const toggleItem = (index: number) => {
    setCheckedItems((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  return (
    <div className="mx-auto grid w-full max-w-4xl grid-cols-1 gap-6 md:grid-cols-2">
      <motion.div
        custom={0}
        initial="hidden"
        animate="visible"
        variants={cardVariants}
        className="md:col-span-2"
      >
        <Card className="border-border/50 bg-card/80 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/10">
              <Brain className="h-5 w-5 text-blue-500" />
            </div>
            <div>
              <CardTitle>Podsumowanie</CardTitle>
              <CardDescription>W prostych słowach</CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-base leading-relaxed">
              {data.summary || "Analizuję dokument..."}
            </p>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div custom={1} initial="hidden" animate="visible" variants={cardVariants}>
        <Card className="h-full border-border/50 bg-card/80 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/10">
              <ListChecks className="h-5 w-5 text-emerald-500" />
            </div>
            <div>
              <CardTitle>Co musisz zrobić</CardTitle>
              <CardDescription>Twoja lista kroków</CardDescription>
            </div>
          </CardHeader>
          <CardContent>
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
                    className={`cursor-pointer text-sm leading-relaxed transition-all ${
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
                <li className="text-sm text-muted-foreground">Ładowanie kroków...</li>
              )}
            </ul>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div custom={2} initial="hidden" animate="visible" variants={cardVariants}>
        <Card className="h-full border-border/50 bg-card/80 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-500/10">
              <BookOpen className="h-5 w-5 text-purple-500" />
            </div>
            <div>
              <CardTitle>Słowniczek</CardTitle>
              <CardDescription>Trudne słowa wyjaśnione</CardDescription>
            </div>
          </CardHeader>
          <CardContent>
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
              <p className="text-sm text-muted-foreground">Ładowanie słowniczka...</p>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
