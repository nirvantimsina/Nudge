"use client";

import { useState } from "react";
import { HelpCircle, ChevronDown } from "lucide-react";

interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

const FAQ_DATA: FaqItem[] = [
  {
    id: "faq-1",
    question: "Do my supporters need a Nudge account to tip me?",
    answer: "No! Frictionless giving is our core principle. When a fan visits your nudge.np/@yourname link, they can tip using eSewa, Khalti, or mobile banking QR in literally 10 seconds without having to download an app or create an account.",
  },
  {
    id: "faq-2",
    question: "How does the OBS integration work with Facebook & YouTube Live?",
    answer: "You simply copy your secret Browser Source URL from your Nudge Creator Dashboard and paste it into OBS Studio, Streamlabs, or vMix. Any cheers received will instantly show up as animated on-screen alerts with Nepali TTS and chimes.",
  },
  {
    id: "faq-3",
    question: "How do I withdraw earnings to my Nepali bank account?",
    answer: "Simply link your bank account number and branch in your Payout Settings. You can enable automatic next-day settlement (triggered every 24 hours at 9:00 AM) or manual 1-click withdrawals whenever your balance exceeds रु ५००.",
  },
  {
    id: "faq-4",
    question: "How does Nagarik App verification protect my brand?",
    answer: "Scammers often duplicate creator handles on donation links during relief appeals or livestreams. With Nagarik App integration, your Nudge page receives a tamper-proof verified badge that locks your identity to your legal citizenship or PAN.",
  },
];

export function FeaturesFaqSection() {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <section className="py-space-3xl max-w-4xl mx-auto px-space-md md:px-margin-tablet">
      <div className="text-center mb-space-2xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-container border border-outline-variant text-on-surface-variant text-label-sm font-label-sm mb-3">
          <HelpCircle size={14} />
          <span>Got Questions?</span>
        </div>
        <h2 className="text-headline-lg font-headline-lg text-on-surface">
          Frequently Asked Questions by Nepali Creators
        </h2>
        <p className="text-body-md font-body-md text-on-surface-variant mt-2">
          Everything you need to know about setting up overlays, handling local taxes, and receiving cheers.
        </p>
      </div>

      <div className="space-y-4">
        {FAQ_DATA.map((faq) => {
          const isOpen = openId === faq.id;
          return (
            <div
              key={faq.id}
              className="border border-outline-variant rounded-2xl bg-surface-container-lowest overflow-hidden transition-all duration-200"
            >
              <button
                type="button"
                className="w-full p-5 text-left flex justify-between items-center gap-4 focus:outline-none"
                onClick={() => setOpenId(isOpen ? null : faq.id)}
              >
                <span className="text-title-md font-title-md text-on-surface font-semibold">
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
                <div className="px-5 pb-5 text-body-md font-body-md text-on-surface-variant border-t border-outline-variant/30 pt-3 leading-relaxed">
                  {faq.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}