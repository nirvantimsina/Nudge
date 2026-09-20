"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Bolt,
  Eye,
  Palette,
  HeartHandshake,
  Fingerprint,
  Sliders,
  Landmark,
  Compass,
  QrCode,
  MessageSquare,
  Ban,
  CheckCircle2,
  Receipt,
  FileText,
  ChevronDown,
  ArrowRight,
  Headphones,
  ShieldCheck,
  CreditCard,
  Tv,
} from "lucide-react";
import { NavBar } from "@/src/components/public/layout/NavBar";
import { Footer } from "@/src/components/public/layout/Footer";
import { Button } from "@/src/components/public/common/Button";

/* -------------------------------------------------------------------------- */
/*                         CONFIGURABLE FAQ ITEMS                             */
/* -------------------------------------------------------------------------- */

interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

const FAQ_ITEMS: FaqItem[] = [
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

/* -------------------------------------------------------------------------- */
/*                          MAIN HOW IT WORKS PAGE                            */
/* -------------------------------------------------------------------------- */

export default function HowItWorksPage() {
  const [activeJourney, setActiveJourney] = useState<"creators" | "supporters">("creators");
  const [openFaqId, setOpenFaqId] = useState<string | null>(null);

  const toggleFaq = (id: string) => {
    setOpenFaqId((prev) => (prev === id ? null : id));
  };

  return (
    <>
      <NavBar />

      <main className="snap-start relative h-[calc(100vh-4rem)] overflow-y-auto snap-y snap-proximity scroll-pt-6 scroll-smooth bg-background text-on-surface font-body-md antialiased selection:bg-primary-fixed selection:text-on-primary-fixed">
        {/* 1. HERO SECTION */}
        <section className="relative pt-12 pb-16 md:pt-space-xl md:pb-24 overflow-hidden border-b border-outline-variant/50">
          {/* Ambient Glow */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(188,71,34,0.08)_0%,rgba(253,190,80,0.05)_45%,transparent_70%)] pointer-events-none" />

          <div className="max-w-7xl mx-auto px-space-md md:px-margin-tablet lg:px-margin-desktop text-center relative z-10">
            {/* Pill */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface-container border border-outline-variant/60 text-secondary mb-6 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-secondary-container animate-pulse" />
              <span className="text-label-sm font-label-sm uppercase tracking-wider text-on-secondary-container font-semibold">
                Built for the Nepali Creator Economy
              </span>
            </div>

            <h1 className="text-display-hero-mobile md:text-display-hero font-display-hero text-on-surface max-w-4xl mx-auto tracking-tight mb-6">
              Simple, transparent patronage for Nepali{" "}
              <span className="text-primary underline decoration-secondary-container decoration-4 underline-offset-8">
                storytellers, podcasters, creators, and developers
              </span>.
            </h1>

            <p className="text-body-lg font-body-lg text-on-surface-variant max-w-2xl mx-auto mb-10 leading-relaxed">
              The frictionless 3-step loop: Creators set up in 60s, fans support via{" "}
              <span className="text-tertiary font-bold">eSewa / Khalti / Fonepay</span> or diaspora cards,
              and payouts hit Nepali bank accounts automatically with zero friction.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14">
              <Link href="/start">
                <Button variant="primary" size="lg" rightIcon={<Bolt size={18} />}>
                  Start Your Page
                </Button>
              </Link>
              <Link href="#payment-comparison">
                <Button variant="outline" size="lg" leftIcon={<Eye size={18} className="text-outline" />}>
                  Explore Clearance Rails
                </Button>
              </Link>
            </div>

            {/* 3-Step Overview Strip */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto pt-6 text-left">
              <div className="bg-surface-container-lowest rounded-2xl p-6 border border-outline-variant/60 shadow-sm flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-surface-container text-primary flex items-center justify-center font-headline-sm font-bold shrink-0">
                  1
                </div>
                <div>
                  <h3 className="font-title-md text-title-md text-on-surface mb-1 font-bold">
                    Set Up in 60 Seconds
                  </h3>
                  <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                    Claim your custom handle and verify via Nagarik App with zero physical paperwork.
                  </p>
                </div>
              </div>

              <div className="bg-surface-container-lowest rounded-2xl p-6 border border-outline-variant/60 shadow-sm flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-surface-container text-primary flex items-center justify-center font-headline-sm font-bold shrink-0">
                  2
                </div>
                <div>
                  <h3 className="font-title-md text-title-md text-on-surface mb-1 font-bold">
                    1-Tap Fan Support
                  </h3>
                  <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                    Fans contribute directly using any local mobile banking app or overseas Visa/Mastercard.
                  </p>
                </div>
              </div>

              <div className="bg-surface-container-lowest rounded-2xl p-6 border border-outline-variant/60 shadow-sm flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-surface-container text-primary flex items-center justify-center font-headline-sm font-bold shrink-0">
                  3
                </div>
                <div>
                  <h3 className="font-title-md text-title-md text-on-surface mb-1 font-bold">
                    Auto Bank Settlement
                  </h3>
                  <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                    Funds clear daily directly to your Nepali commercial bank account with automated statements.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 2. INTERACTIVE CREATOR VS SUPPORTER JOURNEY */}
        <section className="py-16 md:py-24 bg-surface-container-low" id="flow-segment">
          <div className="max-w-7xl mx-auto px-space-md md:px-margin-tablet lg:px-margin-desktop">
            <div className="snap-start text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-headline-lg font-headline-lg text-on-surface mb-4">
                Choose Your Journey
              </h2>
              <p className="text-body-md font-body-md text-on-surface-variant leading-relaxed">
                Explore how Nudge creates a seamless bridge of mutual uplift between digital patrons and Nepali content architects.
              </p>

              {/* Segmented Journey Control */}
              <div className="inline-flex p-1.5 mt-8 bg-surface-container-high rounded-full border border-outline-variant/70 shadow-inner">
                <button
                  type="button"
                  onClick={() => setActiveJourney("creators")}
                  className={`px-6 py-2.5 rounded-full font-label-md text-label-md transition-all duration-200 flex items-center gap-2 cursor-pointer ${
                    activeJourney === "creators"
                      ? "bg-primary-container text-on-primary shadow-sm"
                      : "text-on-surface-variant hover:text-on-surface"
                  }`}
                >
                  <Palette size={18} />
                  <span>For Creators &amp; Makers</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveJourney("supporters")}
                  className={`px-6 py-2.5 rounded-full font-label-md text-label-md transition-all duration-200 flex items-center gap-2 cursor-pointer ${
                    activeJourney === "supporters"
                      ? "bg-primary-container text-on-primary shadow-sm"
                      : "text-on-surface-variant hover:text-on-surface"
                  }`}
                >
                  <HeartHandshake size={18} />
                  <span>For Supporters &amp; Fans</span>
                </button>
              </div>
            </div>

            {/* Tab 1: Creators Flow */}
            {activeJourney === "creators" && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 animate-in fade-in duration-200">
                <div className="bg-surface-container-lowest p-8 border border-outline-variant flex flex-col justify-between shadow-sm relative group hover:border-primary transition-colors rounded-2xl">
                  <div className="absolute top-6 right-6 px-2.5 py-1 rounded-full bg-surface-container text-xs font-bold text-primary font-mono">
                    STEP 01
                  </div>
                  <div>
                    <div className="w-14 h-14 rounded-2xl bg-surface-container-low border border-outline-variant flex items-center justify-center text-primary mb-6">
                      <Fingerprint size={28} />
                    </div>
                    <h3 className="text-headline-sm font-headline-sm text-on-surface mb-3 font-bold">
                      Claim Handle &amp; Instant KYC
                    </h3>
                    <p className="text-body-md font-body-md text-on-surface-variant mb-6 leading-relaxed">
                      Reserve your custom identity <code className="text-primary font-semibold bg-surface-container px-2 py-0.5 rounded text-xs">nudge.np/@yourhandle</code>. Fast-track official verification through Nepal&apos;s native Nagarik App API in under 2 minutes.
                    </p>
                  </div>
                  <div className="pt-4 border-t border-surface-container flex items-center gap-3">
                    <ShieldCheck size={18} className="text-tertiary shrink-0" />
                    <span className="text-label-sm font-label-sm text-on-surface-variant font-medium">
                      Instant National ID Integration
                    </span>
                  </div>
                </div>

                <div className="bg-surface-container-lowest p-8 border border-outline-variant flex flex-col justify-between shadow-sm relative group hover:border-primary transition-colors rounded-2xl">
                  <div className="absolute top-6 right-6 px-2.5 py-1 rounded-full bg-surface-container text-xs font-bold text-primary font-mono">
                    STEP 02
                  </div>
                  <div>
                    <div className="w-14 h-14 rounded-2xl bg-surface-container-low border border-outline-variant flex items-center justify-center text-secondary mb-6">
                      <Sliders size={28} />
                    </div>
                    <h3 className="text-headline-sm font-headline-sm text-on-surface mb-3 font-bold">
                      Configure Tiers &amp; Overlays
                    </h3>
                    <p className="text-body-md font-body-md text-on-surface-variant mb-6 leading-relaxed">
                      Design custom contribution tiers, set community goals for documentary projects or coding libraries, and embed real-time alert widgets into OBS Studio or Streamlabs.
                    </p>
                  </div>
                  <div className="pt-4 border-t border-surface-container flex items-center gap-3">
                    <Tv size={18} className="text-primary shrink-0" />
                    <span className="text-label-sm font-label-sm text-on-surface-variant font-medium">
                      Native OBS Browser Source URL
                    </span>
                  </div>
                </div>

                <div className="bg-surface-container-lowest p-8 border border-outline-variant flex flex-col justify-between shadow-sm relative group hover:border-primary transition-colors rounded-2xl">
                  <div className="absolute top-6 right-6 px-2.5 py-1 rounded-full bg-surface-container text-xs font-bold text-primary font-mono">
                    STEP 03
                  </div>
                  <div>
                    <div className="w-14 h-14 rounded-2xl bg-surface-container-low border border-outline-variant flex items-center justify-center text-tertiary mb-6">
                      <Landmark size={28} />
                    </div>
                    <h3 className="text-headline-sm font-headline-sm text-on-surface mb-3 font-bold">
                      Direct Bank Settlements
                    </h3>
                    <p className="text-body-md font-body-md text-on-surface-variant mb-6 leading-relaxed">
                      Keep the lion&apos;s share of your patronage. Benefit from an exceptional <strong className="text-tertiary font-bold">0% platform fee</strong> for verified open-source engineers, cultural archives, and relief initiatives (5% flat standard for creators).
                    </p>
                  </div>
                  <div className="pt-4 border-t border-surface-container flex items-center gap-3">
                    <CheckCircle2 size={18} className="text-tertiary shrink-0" />
                    <span className="text-label-sm font-label-sm text-on-surface-variant font-medium">
                      Zero hidden FX conversion markups
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Tab 2: Supporters Flow */}
            {activeJourney === "supporters" && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 animate-in fade-in duration-200">
                <div className="bg-surface-container-lowest p-8 border border-outline-variant flex flex-col justify-between shadow-sm relative group hover:border-secondary transition-colors rounded-2xl">
                  <div className="absolute top-6 right-6 px-2.5 py-1 rounded-full bg-surface-container text-xs font-bold text-secondary font-mono">
                    FAN 01
                  </div>
                  <div>
                    <div className="w-14 h-14 rounded-2xl bg-surface-container-low border border-outline-variant flex items-center justify-center text-secondary mb-6">
                      <Compass size={28} />
                    </div>
                    <h3 className="text-headline-sm font-headline-sm text-on-surface mb-3 font-bold">
                      Discover Authentic Talent
                    </h3>
                    <p className="text-body-md font-body-md text-on-surface-variant mb-6 leading-relaxed">
                      Find your favorite Nepali podcasters, indie folk musicians, GitHub developers, and investigative reporters directly from social bios or our curated creator directory.
                    </p>
                  </div>
                  <div className="pt-4 border-t border-surface-container flex items-center gap-3">
                    <Eye size={18} className="text-secondary shrink-0" />
                    <span className="text-label-sm font-label-sm text-on-surface-variant font-medium">
                      Curated Kathmandu &amp; Regional Feed
                    </span>
                  </div>
                </div>

                <div className="bg-surface-container-lowest p-8 border border-outline-variant flex flex-col justify-between shadow-sm relative group hover:border-secondary transition-colors rounded-2xl">
                  <div className="absolute top-6 right-6 px-2.5 py-1 rounded-full bg-surface-container text-xs font-bold text-secondary font-mono">
                    FAN 02
                  </div>
                  <div>
                    <div className="w-14 h-14 rounded-2xl bg-surface-container-low border border-outline-variant flex items-center justify-center text-tertiary mb-6">
                      <QrCode size={28} />
                    </div>
                    <h3 className="text-headline-sm font-headline-sm text-on-surface mb-3 font-bold">
                      1-Tap Scan &amp; Send
                    </h3>
                    <p className="text-body-md font-body-md text-on-surface-variant mb-6 leading-relaxed">
                      No registration required. Scan via Fonepay / eSewa / Khalti from Nepal, or pay using Apple Pay and diaspora international cards if you&apos;re cheering from Sydney, Dallas, or London.
                    </p>
                  </div>
                  <div className="pt-4 border-t border-surface-container flex items-center gap-3">
                    <Bolt size={18} className="text-tertiary shrink-0" />
                    <span className="text-label-sm font-label-sm text-on-surface-variant font-medium">
                      Frictionless guest checkouts
                    </span>
                  </div>
                </div>

                <div className="bg-surface-container-lowest p-8 border border-outline-variant flex flex-col justify-between shadow-sm relative group hover:border-secondary transition-colors rounded-2xl">
                  <div className="absolute top-6 right-6 px-2.5 py-1 rounded-full bg-surface-container text-xs font-bold text-secondary font-mono">
                    FAN 03
                  </div>
                  <div>
                    <div className="w-14 h-14 rounded-2xl bg-surface-container-low border border-outline-variant flex items-center justify-center text-primary mb-6">
                      <MessageSquare size={28} />
                    </div>
                    <h3 className="text-headline-sm font-headline-sm text-on-surface mb-3 font-bold">
                      Leave an Encouraging Note
                    </h3>
                    <p className="text-body-md font-body-md text-on-surface-variant mb-6 leading-relaxed">
                      Add a personal message to your contribution. Watch your tribute illuminate their OBS live stream overlay in real time with natural voice narration.
                    </p>
                  </div>
                  <div className="pt-4 border-t border-surface-container flex items-center gap-3">
                    <HeartHandshake size={18} className="text-primary shrink-0" />
                    <span className="text-label-sm font-label-sm text-on-surface-variant font-medium">
                      Real-time broadcast alerts
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* 3. SETTLEMENT COMPARISON SECTION */}
        <section className="py-12 md:py-space-2xl bg-surface" id="payment-comparison">
          <div className="max-w-7xl mx-auto px-space-md md:px-margin-tablet lg:px-margin-desktop">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-container text-xs font-bold text-primary mb-3 font-mono">
                CLEARANCE ARCHITECTURE
              </div>
              <h2 className="text-headline-lg font-headline-lg text-on-surface mb-4">
                Why Nepali Creators Leave Western Platforms
              </h2>
              <p className="snap-start text-body-md font-body-md text-on-surface-variant mt-7 leading-relaxed">
                International patronage platforms were never engineered for South Asia. See how Nudge transforms the settlement corridor.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
              {/* The Old Way */}
              <div className="bg-surface-container-lowest p-8 border border-outline-variant/60 relative overflow-hidden flex flex-col justify-between rounded-2xl">
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-error/5 rounded-full blur-2xl pointer-events-none" />
                <div>
                  <div className="flex items-center justify-between pb-6 border-b border-surface-container">
                    <div className="flex items-center gap-3">
                      <span className="w-10 h-10 rounded-full bg-error-container text-error flex items-center justify-center">
                        <Ban size={20} />
                      </span>
                      <div>
                        <h3 className="font-title-md text-title-md text-on-surface font-bold">
                          The Legacy Friction Way
                        </h3>
                        <p className="font-body-sm text-body-sm text-on-surface-variant">
                          Patreon / PayPal / International Wire
                        </p>
                      </div>
                    </div>
                    <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 bg-error-container text-on-error-container rounded-full">
                      High Leakage
                    </span>
                  </div>

                  <div className="py-6 space-y-4">
                    <div className="flex items-start gap-4 text-on-surface-variant">
                      <Ban size={18} className="text-error mt-0.5 shrink-0" />
                      <div>
                        <strong className="text-on-surface text-body-md block mb-0.5">
                          Domestic Fan Friction:
                        </strong>
                        <p className="text-body-sm leading-relaxed">
                          Local fans inside Nepal cannot pay via Fonepay or domestic debit cards due to strict foreign exchange card constraints.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4 text-on-surface-variant">
                      <Ban size={18} className="text-error mt-0.5 shrink-0" />
                      <div>
                        <strong className="text-on-surface text-body-md block mb-0.5">
                          Predatory Intermediary Cuts:
                        </strong>
                        <p className="text-body-sm leading-relaxed">
                          8% to 12% lost in platform take rates, Payoneer withdrawal cuts, and correspondent bank fees.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4 text-on-surface-variant">
                      <Ban size={18} className="text-error mt-0.5 shrink-0" />
                      <div>
                        <strong className="text-on-surface text-body-md block mb-0.5">
                          Painful Settlement Delays:
                        </strong>
                        <p className="text-body-sm leading-relaxed">
                          Payout holds lasting 14 to 30 days, manual wire slips, and unpredictable bank inquiries for foreign remittance classification.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-surface-container-high border border-outline-variant text-center">
                  <span className="text-xs text-on-surface-variant font-medium">Net Creator Proceeds:</span>
                  <div className="text-headline-sm font-headline-sm text-error font-bold mt-0.5">
                    ~ Rs. 840 per Rs. 1,000 Contributed
                  </div>
                </div>
              </div>

              {/* The Nudge Way */}
              <div className="bg-surface-container-lowest p-8 border-2 border-primary-container shadow-md relative overflow-hidden flex flex-col justify-between rounded-2xl">
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-secondary-container/10 rounded-full blur-2xl pointer-events-none" />
                <div>
                  <div className="flex items-center justify-between pb-6 border-b border-surface-container">
                    <div className="flex items-center gap-3">
                      <span className="w-10 h-10 rounded-full bg-primary-container text-on-primary flex items-center justify-center">
                        <Bolt size={20} />
                      </span>
                      <div>
                        <h3 className="font-title-md text-title-md text-on-surface font-bold">
                          The Nudge High-Velocity Loop
                        </h3>
                        <p className="font-body-sm text-body-sm text-tertiary font-medium">
                          Fonepay · eSewa · Khalti · Direct NRB Clearance
                        </p>
                      </div>
                    </div>
                    <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 bg-tertiary-fixed text-on-tertiary-fixed-variant rounded-full">
                      Instant Access
                    </span>
                  </div>

                  <div className="py-6 space-y-4">
                    <div className="flex items-start gap-4 text-on-surface-variant">
                      <CheckCircle2 size={18} className="text-tertiary mt-0.5 shrink-0" />
                      <div>
                        <strong className="text-on-surface text-body-md block mb-0.5">
                          10-Second Domestic QR Clearance:
                        </strong>
                        <p className="text-body-sm leading-relaxed">
                          Every Nepali mobile banking app (NIC Asia MoBank, Global Smart Plus, etc.) clears within seconds via interoperable NepalPay / Fonepay rails.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4 text-on-surface-variant">
                      <CheckCircle2 size={18} className="text-tertiary mt-0.5 shrink-0" />
                      <div>
                        <strong className="text-on-surface text-body-md block mb-0.5">
                          Global Diaspora Card Processing:
                        </strong>
                        <p className="text-body-sm leading-relaxed">
                          Nepalis in the US, UK, Australia, and Gulf pay with international credit/debit cards with live automated NPR settlement.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4 text-on-surface-variant">
                      <CheckCircle2 size={18} className="text-tertiary mt-0.5 shrink-0" />
                      <div>
                        <strong className="text-on-surface text-body-md block mb-0.5">
                          Transparent Low Take Rate:
                        </strong>
                        <p className="text-body-sm leading-relaxed">
                          0% for open-source &amp; cultural archives, 5% standard flat. No wire fees, no minimum balance lockups.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-surface-container border border-primary/20 text-center">
                  <span className="text-xs text-on-surface-variant font-medium">Net Creator Proceeds:</span>
                  <div className="text-headline-sm font-headline-sm text-primary font-bold mt-0.5">
                    Rs. 950 - Rs. 1,000 per Rs. 1,000 Contributed
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 4. PAYOUTS & COMPLIANCE SECTION */}
        <section className="snap-start py-16 md:py-22 bg-surface-container-low border-y border-outline-variant/60">
          <div className="max-w-7xl mx-auto px-space-md md:px-margin-tablet lg:px-margin-desktop">
            <div className="bg-surface-container-lowest rounded-2xl p-8 md:p-12 border border-outline-variant shadow-sm">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-7 space-y-5">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface-container text-xs font-bold text-tertiary font-mono">
                    <ShieldCheck size={14} />
                    <span>RELIABLE &amp; TRANSPARENT PAYOUTS</span>
                  </div>
                  <h2 className="text-headline-md md:text-headline-lg font-headline-md md:font-headline-lg text-on-surface leading-tight font-bold">
                    Standard Weekly &amp; On-Demand Bank Transfers
                  </h2>
                  <p className="text-body-md font-body-md text-on-surface-variant leading-relaxed">
                    Disbursements are processed in weekly scheduled batches every Sunday, with optional on-demand withdrawals available once minimum thresholds are met. Funds transfer directly to licensed commercial Nepali bank accounts or linked domestic digital wallets (eSewa / Khalti).
                  </p>

                  <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-5 rounded-xl bg-surface-container-low border border-outline-variant/60 flex flex-col justify-start">
                      <div className="flex items-center gap-2 text-on-surface font-title-md mb-2 font-bold">
                        <Receipt size={20} className="text-primary" />
                        <span>Earnings Summary</span>
                      </div>
                      <p className="text-body-sm font-body-sm text-on-surface-variant leading-relaxed">
                        Download clean CSV and monthly transaction reports ready for your local tax filings or personal records.
                      </p>
                    </div>

                    <div className="p-5 rounded-xl bg-surface-container-low border border-outline-variant/60 flex flex-col justify-start">
                      <div className="flex items-center gap-2 text-on-surface font-title-md mb-2 font-bold">
                        <FileText size={20} className="text-tertiary" />
                        <span>Digital Invoicing</span>
                      </div>
                      <p className="text-body-sm font-body-sm text-on-surface-variant leading-relaxed">
                        Clear receipts for every contribution received domestically or from diaspora supporters abroad.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-5 flex flex-col items-center justify-center p-8 bg-surface-container rounded-2xl border border-outline-variant text-center">
                  <div className="w-16 h-16 rounded-full bg-primary-container text-on-primary flex items-center justify-center mb-4 shadow-sm">
                    <Landmark size={30} />
                  </div>
                  <h3 className="font-headline-sm text-headline-sm text-on-surface mb-2 font-bold">
                    Secure Direct Settlements
                  </h3>
                  <p className="text-body-sm font-body-sm text-on-surface-variant mb-6 max-w-xs leading-relaxed">
                    Electronic batch clearance to major Nepali commercial banks and interoperable domestic wallets.
                  </p>
                  <div className="w-full flex flex-wrap items-center justify-center gap-2 pt-4 border-t border-outline-variant/60">
                    <span className="px-3 py-1.5 bg-surface-container-lowest rounded-lg text-xs font-bold text-on-surface border border-outline-variant">
                      eSewa
                    </span>
                    <span className="px-3 py-1.5 bg-surface-container-lowest rounded-lg text-xs font-bold text-on-surface border border-outline-variant">
                      Khalti
                    </span>
                    <span className="px-3 py-1.5 bg-surface-container-lowest rounded-lg text-xs font-bold text-on-surface border border-outline-variant">
                      Fonepay
                    </span>
                    <span className="px-3 py-1.5 bg-surface-container-lowest rounded-lg text-xs font-bold text-on-surface border border-outline-variant">
                      ConnectIPS
                    </span>
                    <span className="px-3 py-1.5 bg-surface-container-lowest rounded-lg text-xs font-bold text-on-surface border border-outline-variant">
                      Global Cards
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 5. CONFIGURABLE FAQS (ACCORDION) */}
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
              {FAQ_ITEMS.map((faq) => {
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

        {/* 6. BOTTOM CTA BANNER */}
        <section className="py-16 md:py-24 bg-surface-container-high border-t border-outline-variant relative overflow-hidden">
          <div className="snap-start max-w-7xl mx-auto px-space-md md:px-margin-tablet lg:px-margin-desktop relative z-10 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary text-on-primary mb-6 shadow-md">
              <Bolt size={32} />
            </div>

            <h2 className="text-display-hero-mobile md:text-headline-lg font-headline-lg text-on-surface max-w-2xl mx-auto mb-4 font-bold">
              Join 4,500+ Nepali Creators. Set up your page today.
            </h2>

            <p className="text-body-lg font-body-lg text-on-surface-variant max-w-xl mx-auto mb-8 leading-relaxed">
              Turn community appreciation into sustainable livelihood. Free setup, no credit card required, verified in minutes.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/start">
                <Button variant="primary" size="lg" rightIcon={<ArrowRight size={18} />}>
                  Claim Your Nudge Page
                </Button>
              </Link>
              <Link href="/support">
                <Button variant="outline" size="lg" leftIcon={<Headphones size={18} />}>
                  Contact Creator Support
                </Button>
              </Link>
            </div>

            <p className="text-body-sm font-body-sm text-on-surface-variant mt-6">
              Takes only 60 seconds · Zero monthly subscription fees · 100% compliant with Nepal Rastra Bank
            </p>
          </div>
        </section>
      
      <Footer />
      </main>
    </>
  );
}