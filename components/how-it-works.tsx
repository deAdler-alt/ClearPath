"use client";

import { motion } from "framer-motion";
import { Brain, FileUp, ListChecks } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const steps = [
  {
    icon: FileUp,
    title: "1. Wgraj dokument",
    description:
      "Przeciągnij zdjęcie lub PDF ze skomplikowanym tekstem medycznym albo prawnym.",
  },
  {
    icon: Brain,
    title: "2. Groq AI analizuje",
    description:
      "Sztuczna inteligencja rozkłada żargon na czynniki pierwsze w ułamku sekundy.",
  },
  {
    icon: ListChecks,
    title: "3. Dostajesz plan działania",
    description:
      "Otrzymujesz proste podsumowanie, listę kroków do wykonania i słowniczek trudnych słów.",
  },
];

export function HowItWorks() {
  return (
    <section className="px-4 py-20">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
            Jak to działa?
          </h2>
          <p className="mt-4 text-muted-foreground">
            Trzy proste kroki do zrozumienia skomplikowanych dokumentów
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
            >
              <Card className="h-full border-border/50 bg-card/50 backdrop-blur-sm transition-shadow hover:shadow-lg">
                <CardHeader>
                  <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                    <step.icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{step.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {step.description}
                  </CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
