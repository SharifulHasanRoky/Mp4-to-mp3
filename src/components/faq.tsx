"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface FaqItem {
  q: string;
  a: string;
}

export function Faq({ items, title = "Frequently Asked Questions" }: { items: FaqItem[]; title?: string }) {
  return (
    <section className="mx-auto max-w-3xl">
      <h2 className="text-center text-2xl font-bold tracking-tight sm:text-3xl">
        {title}
      </h2>
      <p className="mt-3 text-center text-sm text-muted-foreground sm:text-base">
        Quick answers to the most common questions about extracting audio from
        video files.
      </p>
      <Accordion type="single" collapsible className="mt-8 w-full">
        {items.map((item, idx) => (
          <AccordionItem key={idx} value={`item-${idx}`}>
            <AccordionTrigger className="text-left text-base font-medium">
              {item.q}
            </AccordionTrigger>
            <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
              {item.a}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}
