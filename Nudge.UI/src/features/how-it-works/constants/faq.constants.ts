// src/features/how-it-works/constants/faq.constants.ts
import type { FaqItem } from "../types/faq.types";

export const HOW_IT_WORKS_FAQS: FaqItem[] = [
  {
    id: "faq-1",
    question: "Do my fans in Nepal need to download an app or sign up to support me?",
    answer:
      "No! That is the core beauty of Nudge. Supporters simply click your handle link, select an amount (e.g. Rs. 100 or Rs. 500), scan the generated Fonepay/eSewa QR code from their existing mobile banking app, and tap pay. They do not need to register an account or install any third-party app.",
  },
  {
    id: "faq-2",
    question: "Can family, diaspora fans, or overseas supporters pay using international credit cards?",
    answer:
      "Yes. Nudge supports cross-border payments through Stripe and global gateway rails. Supporters in Australia, the US, Europe, or the Gulf can pay via Visa, MasterCard, and Apple Pay in USD/AUD/GBP. The amount is automatically converted into NPR and settled directly into your Nepali bank account without international wire holds.",
  },
  {
    id: "faq-3",
    question: "How does the 0% platform fee for open-source and cultural initiatives work?",
    answer:
      "As part of our commitment to Nepal's public goods, creators maintaining active open-source software libraries, documenting indigenous heritage, or preserving civic archives can qualify for the Nudge Public Goods Grant. Once approved, Nudge waives our 5% platform fee completely—you only cover standard payment gateway network charges.",
  },
  {
    id: "faq-4",
    question: "When do I receive funds in my Nepali bank account?",
    answer:
      "Payouts are batch-processed daily via ConnectIPS. Any balance exceeding Rs. 500 is automatically dispatched to your registered Nepali commercial bank account by 10:00 AM every business morning.",
  },
  {
    id: "faq-5",
    question: "How does live streaming OBS integration work?",
    answer:
      "Inside your Nudge creator dashboard, you receive a personal Browser Source widget URL. Paste this URL into OBS Studio or Streamlabs. Whenever a fan sends support or a tip, animated overlays, supporter names, and custom audio chimes immediately pop up on your live stream in real time.",
  },
];
