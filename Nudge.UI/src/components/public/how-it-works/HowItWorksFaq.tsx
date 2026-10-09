// src/components/public/how-it-works/HowItWorksFaq.tsx
"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import { HOW_IT_WORKS_FAQS } from "@/src/features/how-it-works/constants/faq.constants";

export function HowItWorksFaq() {
  const [openFaqId, setOpenFaqId] = useState<string | null>(null);

  const toggleFaq = (id: string) => {
    setOpenFaqId((prev) => (prev === id ? null : id));
  };

  return (
    <section className="snap-start py-16 md:py-24 mb-10 bg-surface" id="faqs">
      <div className="max-w-4xl mx-auto px-space-md md:px-margin-tablet">
        <div className="text-center mb-12">
          <h2 className="text-headline-lg font-headline-lg text-on-surface mb-3 font-bold">
            Frequently Asked Questions
          </h2>
          <p className="text-body-md font-body-md text-on-surface-variant leading-relaxed">
            Have questions about fees, international patrons, or banking? Here are the straightforward facts.
          </p>
        </div>

        <div className="space-y-4">
          {HOW_IT_WORKS_FAQS.map((faq) => {
            const isOpen = openFaqId === faq.id;
            return (
              <div
                key={faq.id}
                className="bg-surface-container-lowest rounded-2xl border border-outline-variant overflow-hidden transition-all duration-200"
              >
                <button
                  type="button"
                  className="w-full px-6 py-5 text-left flex justify-between items-center hover:bg-surface-container-low transition-colors cursor-pointer gap-4"
                  onClick={() => toggleFaq(faq.id)}
                >
                  <span className="font-title-md text-title-md text-on-surface font-semibold">
                    {faq.question}
                  </span>
                  <ChevronDown
                    size={20}
                    className={`text-primary shrink-0 transition-transform duration-200 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-6 pb-6 text-body-md font-body-md text-on-surface-variant leading-relaxed border-t border-outline-variant/30 pt-4">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
