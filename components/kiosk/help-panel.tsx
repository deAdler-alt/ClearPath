"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import type { AppPanel } from "@/components/kiosk/types";

interface HelpPanelProps {
  onNavigate: (panel: AppPanel) => void;
}

const faqs = [
  {
    q: "What documents can I upload?",
    a: "ClearPath supports PDF and plain-text (.txt) files. Upload medical letters, lab results, insurance documents, or legal notices. Scanned image PDFs may not work — use text-based PDFs.",
  },
  {
    q: "How does the analysis work?",
    a: "Our AI reads your document and translates complex terminology into plain English. You receive a summary, a list of action steps, and a glossary of difficult terms.",
  },
  {
    q: "Is my data stored?",
    a: "Documents are processed for analysis only. ClearPath does not permanently store your files on our servers.",
  },
  {
    q: "What languages are supported?",
    a: "ClearPath outputs results in English, designed for the EU market. Input documents can be in any language, but results are always in plain English.",
  },
];

export function HelpPanel({ onNavigate }: HelpPanelProps) {
  return (
    <div className="flex h-full flex-col">
      <div className="mb-6 border-b border-border pb-4">
        <h2 className="text-2xl font-semibold tracking-tight">Help & Guide</h2>
        <p className="mt-1 text-muted-foreground">
          Everything you need to use ClearPath
        </p>
      </div>

      <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {[
          { step: "1", title: "Upload", desc: "Drag or browse for your document" },
          { step: "2", title: "Analyze", desc: "AI processes and simplifies the text" },
          { step: "3", title: "Review", desc: "Read summary, steps, and glossary" },
        ].map((item) => (
          <div
            key={item.step}
            className="border border-border bg-card p-4"
          >
            <span className="font-mono text-xs font-semibold text-primary">
              STEP {item.step}
            </span>
            <h3 className="mt-2 font-semibold">{item.title}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{item.desc}</p>
          </div>
        ))}
      </div>

      <div className="mb-8">
        <h3 className="mb-4 text-lg font-semibold">Frequently asked questions</h3>
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, i) => (
            <AccordionItem key={i} value={`faq-${i}`}>
              <AccordionTrigger className="text-left font-medium">
                {faq.q}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                {faq.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>

      <div className="mt-auto border border-primary/20 bg-primary/5 p-6">
        <h3 className="font-semibold">Ready to start?</h3>
        <p className="mt-1 text-sm text-muted-foreground">
          Upload your first document and see ClearPath in action.
        </p>
        <Button
          className="mt-4 min-h-11"
          size="lg"
          onClick={() => onNavigate("upload")}
        >
          Upload Document
        </Button>
      </div>
    </div>
  );
}
