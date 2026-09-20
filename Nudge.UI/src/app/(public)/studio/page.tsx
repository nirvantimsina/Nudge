"use client";

import { useState, useId } from "react";
import Link from "next/link";
import {
    Rocket,
    PlayCircle,
    ShieldCheck,
    Zap,
    Lock,
    Radio,
    Volume2,
    Music,
    TrendingUp,
    CheckCircle2,
    Download,
    ChevronRight,
    Layers,
    Tv,
    Landmark,
    CreditCard,
    ArrowRight,
    Sparkles,
    RefreshCw,
    MailCheck,
    Truck,
    IdCard,
    Gauge,
    HelpCircle,
} from "lucide-react";
import { NavBar } from "@/src/components/public/layout/NavBar";
import { Footer } from "@/src/components/public/layout/Footer";
import { Button } from "@/src/components/public/common/Button";

export default function StudioPage() {
    const [monthlyEarnings, setMonthlyEarnings] = useState<number>(75000);
    const [claimHandle, setClaimHandle] = useState<string>("");
    const sliderId = useId();

    // Financial calculations: ~12% loss on Western dollar platforms
    const annualSavings = Math.round(monthlyEarnings * 0.12 * 12);
    const hoursSaved = Math.round(8 + (monthlyEarnings / 50000) * 4);

    const handleClaimSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!claimHandle.trim()) return;
        window.location.href = `/auth/register?handle=${encodeURIComponent(
            claimHandle.trim()
        )}`;
    };

    return (
        <>
            <NavBar />

            <main className="snap-start min-h-screen snap-y snap-proximity scroll-pt-6 scroll-smooth bg-background text-on-surface font-body-md selection:bg-primary selection:text-on-primary antialiased">
                {/* 1. HERO SECTION */}
                <section className="relative pt-12 pb-20 md:pt-20 md:pb-28 overflow-hidden border-b border-outline-variant/60">
                    {/* Subtle Ambient Background */}
                    <div className="absolute inset-0 bg-[radial-gradient(#dfc0b7_0.75px,transparent_0.75px),radial-gradient(#dfc0b7_0.75px,#fff9ed_0.75px)] bg-size-[30px_30px] opacity-70 pointer-events-none" />

                    <div className="max-w-7xl mx-auto px-space-md md:px-margin-tablet lg:px-margin-desktop relative z-10">
                        {/* Pill Badge */}
                        <div className="flex justify-center mb-6">
                            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-surface-container border border-outline-variant/60 shadow-xs">
                                <span className="flex h-2 w-2 relative">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
                                </span>
                                <span className="text-label-sm font-label-sm text-on-surface tracking-wider font-semibold uppercase">
                                    Introducing Nudge Studio • The Creator Operating System
                                </span>
                            </div>
                        </div>

                        {/* Headline */}
                        <div className="text-center max-w-4xl mx-auto mb-10">
                            <h1 className="text-headline-lg md:text-display-hero font-display-hero text-on-surface tracking-tight leading-tight md:leading-tight mb-6 font-bold">
                                The Operating System for Himalayan Creators.{" "}
                                <span className="text-primary italic font-serif underline decoration-secondary-container decoration-4 underline-offset-8">
                                    Run Patronage, Stream Alerts, &amp; Tax
                                </span>{" "}
                                Without the Chaos.
                            </h1>

                            <p className="text-body-md md:text-body-lg font-body-lg text-on-surface-variant max-w-3xl mx-auto leading-relaxed">
                                Patreon was never built for Nepal. Nudge Studio gives you a unified backer CRM, instant Fonepay &amp; eSewa QR triggers, automated 1% TDS filing certificates, OBS overlays with Nepali voice TTS, and recurring monthly subscriptions — all in one unified command center.
                            </p>

                            {/* Dual Action CTAs */}
                            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
                                <Link href="/start" className="w-full sm:w-auto">
                                    <Button
                                        variant="primary"
                                        size="lg"
                                        fullWidth
                                        leftIcon={<Rocket size={18} />}
                                    >
                                        Start Your Studio Free (Zero Monthly Fee)
                                    </Button>
                                </Link>
                                <Link href="#interactive-preview" className="w-full sm:w-auto">
                                    <Button
                                        variant="outline"
                                        size="lg"
                                        fullWidth
                                        leftIcon={<PlayCircle size={18} className="text-primary" />}
                                    >
                                        Explore Interactive Studio Demo
                                    </Button>
                                </Link>
                            </div>

                            {/* Trust Sub-Strip */}
                            <div className="flex flex-wrap items-center justify-center gap-y-3 gap-x-8 mt-8 text-on-surface-variant text-body-sm font-body-sm">
                                <div className="flex items-center gap-2">
                                    <ShieldCheck size={18} className="text-tertiary" />
                                    <span>Nepal Rastra Bank Directives Compliant</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Zap size={18} className="text-tertiary" />
                                    <span>Instant Fonepay Direct Clearing</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Lock size={18} className="text-secondary" />
                                    <span>0% Platform Cut Guarantee for Open Source &amp; Culture</span>
                                </div>
                            </div>
                        </div>

                        {/* 2. LAYERED WORKSPACE MOCKUP (Bento Grid) */}
                        <div
                            className="mt-30 relative rounded-3xl bg-surface-container border border-outline-variant p-3 sm:p-5 shadow-xl"
                            id="interactive-preview"
                        >
                            {/* Window Chrome Header */}
                            <div className="snap-start flex items-center justify-between pb-3 mb-4 border-b border-outline-variant/70 text-on-surface-variant text-body-sm">
                                <div className="flex items-center gap-2">
                                    <div className="flex gap-1.5">
                                        <span className="w-3 h-3 rounded-full bg-error/70 inline-block" />
                                        <span className="w-3 h-3 rounded-full bg-secondary-container inline-block" />
                                        <span className="w-3 h-3 rounded-full bg-tertiary/70 inline-block" />
                                    </div>
                                    <span className="font-mono text-label-sm text-on-surface-variant ml-2 flex items-center gap-1">
                                        studio.nudge.np/dashboard/sisanbaniya (LIVE CONNECTED)
                                    </span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className="hidden sm:inline-flex items-center gap-1.5 bg-tertiary/10 text-tertiary text-label-sm px-2.5 py-0.5 rounded-full font-medium">
                                        <span className="w-1.5 h-1.5 rounded-full bg-tertiary animate-pulse" />
                                        WebSocket Synchronized
                                    </span>
                                    <span className="text-label-sm bg-surface px-2 py-0.5 rounded border border-outline-variant font-mono">
                                        FY 2081/82
                                    </span>
                                </div>
                            </div>

                            {/* Bento Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                                {/* Column 1: Live Stream Alert Card */}
                                <div className="md:col-span-4 bg-surface rounded-2xl p-4 border border-outline-variant/80 flex flex-col justify-between">
                                    <div>
                                        <div className="flex items-center justify-between mb-3">
                                            <span className="text-label-sm font-label-sm text-primary uppercase tracking-wider flex items-center gap-1 font-bold">
                                                <Radio size={15} />
                                                OBS Overlays &amp; Alerts
                                            </span>
                                            <span className="bg-primary/10 text-primary px-2 py-0.5 rounded-full text-label-sm font-semibold">
                                                Sub-second TTS
                                            </span>
                                        </div>

                                        <div className="p-3 bg-surface-container-low rounded-xl border border-outline-variant/60 mb-3">
                                            <div className="flex items-start gap-2.5 mb-2">
                                                <div className="w-8 h-8 rounded-full bg-primary-container text-on-primary flex items-center justify-center font-bold text-label-sm shrink-0">
                                                    PK
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-body-sm font-bold text-on-surface truncate">
                                                        Pradeep Khadka sent रु 1,500
                                                    </p>
                                                    <p className="text-label-sm text-on-surface-variant font-mono text-[11px]">
                                                        Via Fonepay (Global IME)
                                                    </p>
                                                </div>
                                                <span className="text-[10px] font-bold text-tertiary bg-tertiary/10 px-2 py-0.5 rounded shrink-0">
                                                    Just now
                                                </span>
                                            </div>
                                            <div className="bg-surface p-2.5 rounded-lg border border-outline-variant/50 text-body-sm italic text-on-surface text-xs leading-snug">
                                                &ldquo;Keep documenting the Karnali trail! Sending 3 Chiya cups for the camera crew.&rdquo;
                                            </div>
                                        </div>

                                        {/* Audio Waveform */}
                                        <div className="bg-surface-container p-3 rounded-xl border border-outline-variant/50">
                                            <div className="flex items-center justify-between text-label-sm mb-2">
                                                <span className="text-on-surface font-semibold flex items-center gap-1 text-xs">
                                                    <Volume2 size={14} className="text-tertiary" />
                                                    TTS: Bansuri Chime + Devanagari Voice
                                                </span>
                                                <span className="text-tertiary font-mono text-[10px]">98% Match</span>
                                            </div>
                                            <div className="flex items-center justify-center gap-1.5 h-8 bg-surface-container-highest/40 rounded-lg px-3">
                                                {[6, 18, 10, 24, 14, 20, 8, 16, 12].map((height, i) => (
                                                    <span
                                                        key={i}
                                                        className="w-1 bg-primary rounded-full animate-pulse"
                                                        style={{
                                                            height: `${height}px`,
                                                            animationDelay: `${i * 0.15}s`,
                                                        }}
                                                    />
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mt-4 pt-3 border-t border-outline-variant/40 flex items-center justify-between text-body-sm text-on-surface-variant">
                                        <span className="flex items-center gap-1 text-xs">
                                            <Music size={14} className="text-secondary" />
                                            Chime: Singing Bowl F#
                                        </span>
                                        <span className="text-xs font-mono text-primary font-semibold">
                                            Browser Source Active
                                        </span>
                                    </div>
                                </div>

                                {/* Column 2: MRR & Backer Intelligence */}
                                <div className="md:col-span-5 bg-surface rounded-2xl p-4 border border-outline-variant/80 flex flex-col justify-between">
                                    <div>
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="text-label-sm font-label-sm text-on-surface-variant uppercase tracking-wider font-semibold">
                                                Monthly Patronage Yield
                                            </span>
                                            <span className="text-label-sm text-tertiary font-bold flex items-center gap-0.5">
                                                <TrendingUp size={14} />
                                                +24.8% this month
                                            </span>
                                        </div>

                                        <div className="flex items-baseline gap-2 mb-4">
                                            <span className="text-currency-display font-currency-display text-primary font-bold">
                                                रु 1,48,250
                                            </span>
                                            <span className="text-body-sm text-on-surface-variant">
                                                recurring MRR
                                            </span>
                                        </div>

                                        {/* Backers mini-list */}
                                        <div className="space-y-2">
                                            <div className="p-2.5 rounded-xl bg-surface-container-low border border-outline-variant/40 flex items-center justify-between">
                                                <div className="flex items-center gap-2.5">
                                                    <div className="w-8 h-8 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center font-bold text-label-sm">
                                                        AM
                                                    </div>
                                                    <div>
                                                        <p className="text-body-sm font-semibold text-on-surface leading-tight text-xs">
                                                            Aayush Man Shrestha
                                                        </p>
                                                        <p className="text-label-sm text-on-surface-variant text-[11px]">
                                                            Executive Patron • 8 mo streak
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <span className="text-xs font-bold text-primary">रु 2,500/mo</span>
                                                    <p className="text-[10px] text-tertiary flex items-center justify-end gap-0.5">
                                                        <MailCheck size={11} /> Perk Sent
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="p-2.5 rounded-xl bg-surface-container-low border border-outline-variant/40 flex items-center justify-between">
                                                <div className="flex items-center gap-2.5">
                                                    <div className="w-8 h-8 rounded-full bg-tertiary-fixed text-on-tertiary-fixed-variant flex items-center justify-center font-bold text-label-sm">
                                                        SG
                                                    </div>
                                                    <div>
                                                        <p className="text-body-sm font-semibold text-on-surface leading-tight text-xs">
                                                            Shreya Gurung
                                                        </p>
                                                        <p className="text-label-sm text-on-surface-variant text-[11px]">
                                                            Story Patron • 3 mo streak
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <span className="text-xs font-bold text-primary">रु 500/mo</span>
                                                    <p className="text-[10px] text-secondary flex items-center justify-end gap-0.5">
                                                        <Truck size={11} /> Lokta Print Pack
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mt-4 pt-3 border-t border-outline-variant/40 flex items-center justify-between text-xs">
                                        <span className="text-on-surface-variant">142 Active Himalayan Patrons</span>
                                        <button
                                            type="button"
                                            className="text-primary font-bold hover:underline flex items-center gap-0.5 cursor-pointer"
                                        >
                                            <span>View Backer CRM</span>
                                            <ChevronRight size={14} />
                                        </button>
                                    </div>
                                </div>

                                {/* Column 3: IRD 1% TDS Compliance */}
                                <div className="md:col-span-3 bg-surface rounded-2xl p-4 border border-outline-variant/80 flex flex-col justify-between">
                                    <div>
                                        <div className="flex items-center justify-between mb-3">
                                            <span className="text-label-sm font-label-sm text-tertiary uppercase tracking-wider font-bold flex items-center gap-1">
                                                <ShieldCheck size={15} />
                                                IRD Compliant
                                            </span>
                                            <span className="bg-tertiary/10 text-tertiary text-label-sm px-2 py-0.5 rounded font-bold">
                                                1% TDS
                                            </span>
                                        </div>

                                        <p className="text-xs text-on-surface font-semibold mb-0.5">
                                            Income Tax Sec 88(4)
                                        </p>
                                        <p className="text-[11px] text-on-surface-variant mb-4 leading-tight">
                                            Auto-withheld &amp; credited to Creator PAN 609214***.
                                        </p>

                                        <div className="bg-surface-container-low p-3 rounded-xl border border-outline-variant/50 space-y-2 text-xs">
                                            <div className="flex justify-between">
                                                <span className="text-on-surface-variant">Gross Earnings:</span>
                                                <span className="font-bold text-on-surface">रु 1,48,250</span>
                                            </div>
                                            <div className="flex justify-between text-tertiary">
                                                <span>Advance 1% TDS:</span>
                                                <span className="font-bold">- रु 1,482.50</span>
                                            </div>
                                            <div className="h-px bg-outline-variant/50" />
                                            <div className="flex justify-between text-on-surface font-bold">
                                                <span>Nightly Sweep:</span>
                                                <span className="text-primary">रु 1,46,767.50</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mt-4 pt-3 border-t border-outline-variant/40">
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            fullWidth
                                            leftIcon={<Download size={14} className="text-tertiary" />}
                                        >
                                            IRD TDS Certificate
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 3. FOUR CORE PILLARS */}
                <section className="snap-start py-20 md:py-28 bg-surface" id="features">
                    <div className="max-w-7xl mx-auto px-space-md md:px-margin-tablet lg:px-margin-desktop">
                        <div className="text-center max-w-3xl mx-auto mb-16">
                            <span className="text-label-sm font-label-sm uppercase tracking-widest text-primary font-bold">
                                THE CREATOR OPERATING SYSTEM
                            </span>
                            <h2 className="text-headline-md md:text-headline-lg font-headline-lg text-on-surface tracking-tight mt-2 mb-4 font-bold">
                                Engineered for the Realities of Himalayan Creators
                            </h2>
                            <p className="text-body-md text-on-surface-variant leading-relaxed">
                                No foreign exchange deductions. No international wire fees. No chasing supporters on Instagram DMs for Fonepay transaction screenshots. Everything runs on autopilot.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {/* Pillar 1: Backer CRM */}
                            <div className="bg-surface-container-lowest p-8 rounded-3xl border border-outline-variant/70 shadow-sm hover:shadow-md transition-all duration-200">
                                <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-6">
                                    <Layers size={26} />
                                </div>
                                <h3 className="text-headline-sm font-headline-sm text-on-surface mb-3 font-bold">
                                    Unified Backer CRM &amp; Supporter Intelligence
                                </h3>
                                <p className="text-body-md text-on-surface-variant mb-6 leading-relaxed">
                                    Consolidate your entire community history in one clean timeline. Track lifetime support, one-off tips, and active recurring memberships with zero manual spreadsheets.
                                </p>
                                <ul className="space-y-3.5 text-body-sm text-on-surface border-t border-outline-variant/50 pt-6">
                                    <li className="flex items-start gap-3">
                                        <CheckCircle2 size={18} className="text-tertiary shrink-0 mt-0.5" />
                                        <span><strong>1-Tap Thank-You SMS:</strong> Send personalized audio drops or SMS notes directly to backers&apos; phones without juggling messaging apps.</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <CheckCircle2 size={18} className="text-tertiary shrink-0 mt-0.5" />
                                        <span><strong>Physical Perk Fulfillment Queue:</strong> Auto-generate shipping manifests for custom handmade Lokta art prints, stickers, and Himalayan tea boxes.</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <CheckCircle2 size={18} className="text-tertiary shrink-0 mt-0.5" />
                                        <span><strong>Deep Community Insights:</strong> Identify your top 5% backer pillars, average support tenure, and cohort retention at a glance.</span>
                                    </li>
                                </ul>
                            </div>

                            {/* Pillar 2: Broadcast Studio */}
                            <div className="bg-surface-container-lowest p-8 rounded-3xl border border-outline-variant/70 shadow-sm hover:shadow-md transition-all duration-200">
                                <div className="w-12 h-12 rounded-2xl bg-secondary-container/30 text-secondary flex items-center justify-center mb-6">
                                    <Tv size={26} />
                                </div>
                                <h3 className="text-headline-sm font-headline-sm text-on-surface mb-3 font-bold">
                                    Broadcast Studio &amp; Live Stream Engine
                                </h3>
                                <p className="text-body-md text-on-surface-variant mb-6 leading-relaxed">
                                    Plug a single browser source URL into OBS Studio, vMix, or Streamlabs. Turn support pings into a celebration during YouTube, Twitch, and Facebook live broadcasts.
                                </p>
                                <ul className="space-y-3.5 text-body-sm text-on-surface border-t border-outline-variant/50 pt-6">
                                    <li className="flex items-start gap-3">
                                        <CheckCircle2 size={18} className="text-tertiary shrink-0 mt-0.5" />
                                        <span><strong>Authentic Himalayan Sound Chimes:</strong> Trigger celebratory Madal syncopations, Sarangi strings, Bansuri flutes, or singing bowls.</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <CheckCircle2 size={18} className="text-tertiary shrink-0 mt-0.5" />
                                        <span><strong>Devanagari &amp; Romanized Neural TTS:</strong> Reads backer messages aloud accurately in Nepali with strict filtering and custom minimum thresholds.</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <CheckCircle2 size={18} className="text-tertiary shrink-0 mt-0.5" />
                                        <span><strong>Sub-Second Local WebSocket:</strong> Zero-latency alerts triggering within 400 milliseconds of Fonepay QR scan completion.</span>
                                    </li>
                                </ul>
                            </div>

                            {/* Pillar 3: Automated Tax & Bank Sweeps */}
                            <div className="bg-surface-container-lowest p-8 rounded-3xl border border-outline-variant/70 shadow-sm hover:shadow-md transition-all duration-200" id="tax-compliance">
                                <div className="w-12 h-12 rounded-2xl bg-tertiary/10 text-tertiary flex items-center justify-center mb-6">
                                    <Landmark size={26} />
                                </div>
                                <h3 className="text-headline-sm font-headline-sm text-on-surface mb-3 font-bold">
                                    Automated Nepal Tax (IRD) &amp; Bank Clearing
                                </h3>
                                <p className="text-body-md text-on-surface-variant mb-6 leading-relaxed">
                                    Never stress over audits or compliance freezes. Nudge Studio automatically handles withholding tax according to Nepal Inland Revenue Department laws.
                                </p>
                                <ul className="space-y-3.5 text-body-sm text-on-surface border-t border-outline-variant/50 pt-6">
                                    <li className="flex items-start gap-3">
                                        <CheckCircle2 size={18} className="text-tertiary shrink-0 mt-0.5" />
                                        <span><strong>Section 88(4) Income Tax Act:</strong> Automatic 1% advance TDS deduction cleanly logged and credited directly against your permanent PAN.</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <CheckCircle2 size={18} className="text-tertiary shrink-0 mt-0.5" />
                                        <span><strong>1-Click IRD TDS Certificates:</strong> Generate official fiscal year audit-ready slips (FY 2080/81 &amp; 2081/82) with digital signature stamps.</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <CheckCircle2 size={18} className="text-tertiary shrink-0 mt-0.5" />
                                        <span><strong>Automated Nightly Bank Sweeps:</strong> Funds automatically clear into NIC Asia, Nabil, Global IME, Sanima, or any NCHL-IPS member bank.</span>
                                    </li>
                                </ul>
                            </div>

                            {/* Pillar 4: Recurring Memberships */}
                            <div className="bg-surface-container-lowest p-8 rounded-3xl border border-outline-variant/70 shadow-sm hover:shadow-md transition-all duration-200">
                                <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-6">
                                    <CreditCard size={26} />
                                </div>
                                <h3 className="text-headline-sm font-headline-sm text-on-surface mb-3 font-bold">
                                    Recurring Monthly Memberships &amp; Milestones
                                </h3>
                                <p className="text-body-md text-on-surface-variant mb-6 leading-relaxed">
                                    Turn sporadic views into reliable monthly livelihood. Offer structured patron tiers with automated domestic recurring authorization (e-mandate) via eSewa and mobile wallets.
                                </p>
                                <ul className="space-y-3.5 text-body-sm text-on-surface border-t border-outline-variant/50 pt-6">
                                    <li className="flex items-start gap-3">
                                        <CheckCircle2 size={18} className="text-tertiary shrink-0 mt-0.5" />
                                        <span><strong>Custom Creator Tiers:</strong> Create badges like Community Supporter (रु 100), Project Backer (रु 500), and Producer (रु 2,500) with private feeds.</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <CheckCircle2 size={18} className="text-tertiary shrink-0 mt-0.5" />
                                        <span><strong>Public Project Milestones:</strong> Real-time progress bars for camera gear, high-altitude expeditions, and podcast microphones with stream sync.</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <CheckCircle2 size={18} className="text-tertiary shrink-0 mt-0.5" />
                                        <span><strong>Native Local Currency Rails:</strong> Supporters contribute in Nepali Rupees directly through their mobile banking app without foreign cards.</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 4. COMPARISON MATRIX */}
                <section className="py-20 bg-surface-container-low border-y border-outline-variant/60" id="matrix">
                    <div className="max-w-7xl mx-auto px-space-md md:px-margin-tablet lg:px-margin-desktop">
                        <div className="text-center max-w-3xl mx-auto mb-14">
                            <span className="text-label-sm font-label-sm uppercase tracking-widest text-primary font-bold">
                                THE HARD TRUTH
                            </span>
                            <h2 className="text-headline-md md:text-headline-lg font-headline-lg text-on-surface tracking-tight mt-2 mb-4 font-bold">
                                Why Nepali Creators Are Migrating to Nudge Studio
                            </h2>
                            <p className="snap-start text-body-md text-on-surface-variant leading-relaxed">
                                Patreon drains 15-22% in currency conversion spreads and wire fees. Manual QR screenshots waste hours every week. See the comparison side-by-side.
                            </p>
                        </div>

                        {/* Table */}
                        <div className="bg-surface-container-lowest rounded-3xl border border-outline-variant overflow-hidden shadow-md">
                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="border-b border-outline-variant bg-surface-container">
                                            <th className="p-4 sm:p-5 font-headline-sm text-body-md text-on-surface w-1/4 font-bold">
                                                Key Capability
                                            </th>
                                            <th className="p-4 sm:p-5 bg-primary/10 border-x-2 border-primary text-primary font-headline-sm text-title-md w-1/3 font-bold">
                                                <div className="flex items-center gap-2">
                                                    <span>Nudge Studio</span>
                                                    <span className="text-[10px] bg-primary text-on-primary px-2 py-0.5 rounded-full font-sans font-bold">
                                                        Tailored for Nepal
                                                    </span>
                                                </div>
                                            </th>
                                            <th className="p-4 sm:p-5 text-on-surface font-title-md w-1/5 font-bold">
                                                Patreon / Western Tools
                                            </th>
                                            <th className="p-4 sm:p-5 text-on-surface font-title-md w-1/5 font-bold">
                                                Manual QR Screenshots
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-outline-variant/50 text-body-sm">
                                        <tr className="hover:bg-surface-container-low/60 transition-colors">
                                            <td className="p-4 sm:p-5 font-semibold text-on-surface">
                                                Gateway &amp; Platform Fees
                                                <p className="text-label-sm text-on-surface-variant font-normal">Effective cut from creator</p>
                                            </td>
                                            <td className="p-4 sm:p-5 bg-primary/5 border-x-2 border-primary font-bold text-tertiary">
                                                0% - 2.5% (standard interchange)
                                            </td>
                                            <td className="p-4 sm:p-5 text-error font-medium">8% - 12% + card processing</td>
                                            <td className="p-4 sm:p-5 text-on-surface-variant">0% (but high manual labor)</td>
                                        </tr>

                                        <tr className="hover:bg-surface-container-low/60 transition-colors">
                                            <td className="p-4 sm:p-5 font-semibold text-on-surface">
                                                Foreign Currency Loss
                                                <p className="text-label-sm text-on-surface-variant font-normal">NPR to USD conversion spreads</p>
                                            </td>
                                            <td className="p-4 sm:p-5 bg-primary/5 border-x-2 border-primary font-bold text-tertiary">
                                                0% Zero Loss (Native NPR Transactions)
                                            </td>
                                            <td className="p-4 sm:p-5 text-error font-medium">3% - 6% spread loss + wire fees</td>
                                            <td className="p-4 sm:p-5 text-on-surface">None</td>
                                        </tr>

                                        <tr className="hover:bg-surface-container-low/60 transition-colors">
                                            <td className="p-4 sm:p-5 font-semibold text-on-surface">
                                                Local QR Convenience
                                                <p className="text-label-sm text-on-surface-variant font-normal">Fonepay, eSewa, Khalti native</p>
                                            </td>
                                            <td className="p-4 sm:p-5 bg-primary/5 border-x-2 border-primary font-bold text-tertiary">
                                                1-Tap Instant QR across all Nepali apps
                                            </td>
                                            <td className="p-4 sm:p-5 text-error font-medium">Requires Dollar Card (95% drop-off)</td>
                                            <td className="p-4 sm:p-5 text-on-surface-variant">Manual screenshot verification</td>
                                        </tr>

                                        <tr className="hover:bg-surface-container-low/60 transition-colors">
                                            <td className="p-4 sm:p-5 font-semibold text-on-surface">
                                                Automated 1% TDS Tax Slips
                                                <p className="text-label-sm text-on-surface-variant font-normal">IRD legal compliance</p>
                                            </td>
                                            <td className="p-4 sm:p-5 bg-primary/5 border-x-2 border-primary font-bold text-tertiary">
                                                Automated Sec 88(4) IRD certificate
                                            </td>
                                            <td className="p-4 sm:p-5 text-error font-medium">No Nepal tax filing; legal liability</td>
                                            <td className="p-4 sm:p-5 text-error font-medium">Manual accountant compilation</td>
                                        </tr>

                                        <tr className="hover:bg-surface-container-low/60 transition-colors">
                                            <td className="p-4 sm:p-5 font-semibold text-on-surface">
                                                OBS Live Stream Alerts &amp; TTS
                                                <p className="text-label-sm text-on-surface-variant font-normal">Real-time alerts on live broadcast</p>
                                            </td>
                                            <td className="p-4 sm:p-5 bg-primary/5 border-x-2 border-primary font-bold text-tertiary">
                                                Nepali Voice TTS + Madal/Bansuri chimes
                                            </td>
                                            <td className="p-4 sm:p-5 text-on-surface-variant font-medium">English-only TTS, high delay</td>
                                            <td className="p-4 sm:p-5 text-error font-medium">None (streamer checks phone manually)</td>
                                        </tr>

                                        <tr className="hover:bg-surface-container-low/60 transition-colors">
                                            <td className="p-4 sm:p-5 font-semibold text-on-surface">
                                                Payout Schedule
                                                <p className="text-label-sm text-on-surface-variant font-normal">Speed to commercial bank deposit</p>
                                            </td>
                                            <td className="p-4 sm:p-5 bg-primary/5 border-x-2 border-primary font-bold text-tertiary">
                                                Daily automated nightly sweep (11:59 PM)
                                            </td>
                                            <td className="p-4 sm:p-5 text-error font-medium">Once a month with $30 wire fee</td>
                                            <td className="p-4 sm:p-5 text-on-surface">Manual wallet transfers</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 5. INTERACTIVE SAVINGS CALCULATOR */}
                <section className="snap-start py-20 bg-surface" id="calculator">
                    <div className="max-w-5xl mx-auto px-space-md md:px-margin-tablet">
                        <div className="bg-surface-container rounded-3xl border border-outline-variant p-6 sm:p-10 shadow-md">
                            <div className="text-center max-w-2xl mx-auto mb-10">
                                <span className="text-label-sm font-label-sm uppercase tracking-widest text-primary font-bold">
                                    RECOVER LOST PATRONAGE
                                </span>
                                <h2 className="text-headline-md font-headline-md text-on-surface tracking-tight mt-1 mb-3 font-bold">
                                    Calculate How Much You Save by Leaving Dollar Platforms
                                </h2>
                                <p className="text-body-sm md:text-body-md text-on-surface-variant leading-relaxed">
                                    Nepali creators lose an estimated 14% to currency spreads, foreign commissions, and manual accounting overhead.
                                </p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                                {/* Range Slider Controls */}
                                <div className="md:col-span-7 space-y-6">
                                    <div>
                                        <div className="flex justify-between items-center mb-2">
                                            <label htmlFor={sliderId} className="text-title-md font-title-md text-on-surface font-semibold">
                                                Estimated Monthly Patronage
                                            </label>
                                            <span className="text-currency-display font-currency-display text-primary font-bold">
                                                रु {monthlyEarnings.toLocaleString("en-IN")}
                                            </span>
                                        </div>

                                        <input
                                            id={sliderId}
                                            type="range"
                                            min={10000}
                                            max={500000}
                                            step={5000}
                                            value={monthlyEarnings}
                                            onChange={(e) => setMonthlyEarnings(Number(e.target.value))}
                                            className="w-full h-3 bg-surface-variant rounded-lg appearance-none cursor-pointer accent-primary"
                                        />

                                        <div className="flex justify-between text-label-sm text-on-surface-variant mt-1.5 font-mono text-xs">
                                            <span>रु 10,000/mo</span>
                                            <span>रु 2,50,000/mo</span>
                                            <span>रु 5,00,000/mo</span>
                                        </div>
                                    </div>

                                    <div className="space-y-3 pt-2">
                                        <div className="flex items-center gap-3 p-3 bg-surface rounded-xl border border-outline-variant/60">
                                            <RefreshCw size={18} className="text-tertiary shrink-0" />
                                            <span className="text-body-sm text-on-surface flex-1">
                                                Auto-withhold 1% TDS &amp; direct IRD filing
                                            </span>
                                            <span className="text-label-sm font-bold text-tertiary bg-tertiary/10 px-2 py-0.5 rounded">
                                                Included Free
                                            </span>
                                        </div>

                                        <div className="flex items-center gap-3 p-3 bg-surface rounded-xl border border-outline-variant/60">
                                            <Radio size={18} className="text-primary shrink-0" />
                                            <span className="text-body-sm text-on-surface flex-1">
                                                OBS Nepali Neural Voice &amp; Chime overlays
                                            </span>
                                            <span className="text-label-sm font-bold text-primary bg-primary/10 px-2 py-0.5 rounded">
                                                Included Free
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Calculation Summary Card */}
                                <div className="md:col-span-5 bg-surface rounded-2xl p-6 border-2 border-primary-container shadow-sm">
                                    <span className="text-label-sm font-label-sm uppercase tracking-wider text-on-surface-variant font-semibold">
                                        Annual Direct Creator Savings
                                    </span>
                                    <div className="mt-2 mb-4">
                                        <span className="text-display-hero-mobile md:text-headline-lg font-headline-lg text-primary font-bold block">
                                            रु {annualSavings.toLocaleString("en-IN")}
                                        </span>
                                        <p className="text-xs text-on-surface-variant mt-1 leading-relaxed">
                                            Retained directly in your pocket instead of lost to foreign wire fees and bank conversion charges.
                                        </p>
                                    </div>

                                    <div className="space-y-2.5 border-t border-outline-variant/60 pt-4 text-xs">
                                        <div className="flex justify-between items-center">
                                            <span className="text-on-surface-variant">Time saved per month:</span>
                                            <span className="font-bold text-on-surface">~{hoursSaved} hours</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-on-surface-variant">Dropped backer drop-off:</span>
                                            <span className="font-bold text-tertiary">Reduced by 84%</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-on-surface-variant">Tax audit compliance:</span>
                                            <span className="font-bold text-tertiary">100% Guaranteed</span>
                                        </div>
                                    </div>

                                    <Link href="/start" className="block mt-6">
                                        <Button variant="primary" size="md" fullWidth rightIcon={<ArrowRight size={16} />}>
                                            Claim Your Studio Free
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 6. VERIFIED CREATOR TESTIMONIALS */}
                <section className="py-20 bg-surface-container-lowest border-t border-outline-variant/60">
                    <div className="max-w-7xl mx-auto px-space-md md:px-margin-tablet lg:px-margin-desktop">
                        <div className="text-center max-w-3xl mx-auto mb-16">
                            <span className="snap-start text-label-sm font-label-sm uppercase tracking-widest text-primary font-bold">
                                VERIFIED REPUTATION
                            </span>
                            <h2 className="text-headline-md md:text-headline-lg font-headline-lg text-on-surface tracking-tight mt-2 mb-4 font-bold">
                                Trusted by Nepal&apos;s Leading Voices &amp; Visionaries
                            </h2>
                            <p className="text-body-md text-on-surface-variant leading-relaxed">
                                See how filmmakers, independent podcasters, and YouTube creators streamlined their community patronage with Nudge Studio.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {/* Creator 1 */}
                            <div className="bg-surface p-6 rounded-3xl border border-outline-variant shadow-sm flex flex-col justify-between">
                                <div>
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="w-12 h-12 rounded-full bg-primary/10 border-2 border-primary flex items-center justify-center font-bold text-primary text-headline-sm">
                                            SB
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-1.5">
                                                <h3 className="text-title-md font-title-md text-on-surface font-bold">
                                                    Sisan Baniya
                                                </h3>
                                                <CheckCircle2 size={16} className="text-tertiary fill-tertiary-fixed" />
                                            </div>
                                            <p className="text-label-sm text-on-surface-variant">Filmmaker &amp; Storyteller</p>
                                        </div>
                                    </div>
                                    <p className="text-body-sm text-on-surface leading-relaxed italic mb-4 text-xs">
                                        &ldquo;On Patreon, 80% of our viewers dropped off at the dollar card screen. With Nudge Studio, they just scan Fonepay from any bank app. Plus, the automated 1% TDS slip means our company tax audit takes 5 minutes instead of 3 weeks.&rdquo;
                                    </p>
                                </div>
                                <div className="pt-4 border-t border-outline-variant/40 flex items-center justify-between text-xs text-on-surface-variant">
                                    <span className="font-semibold text-primary">रु 3,40,000+ raised</span>
                                    <span>Documentary Expeditions</span>
                                </div>
                            </div>

                            {/* Creator 2 */}
                            <div className="bg-surface p-6 rounded-3xl border border-outline-variant shadow-sm flex flex-col justify-between">
                                <div>
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="w-12 h-12 rounded-full bg-tertiary/10 border-2 border-tertiary flex items-center justify-center font-bold text-tertiary text-headline-sm">
                                            KP
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-1.5">
                                                <h3 className="text-title-md font-title-md text-on-surface font-bold">
                                                    Kathmandu Podcast
                                                </h3>
                                                <CheckCircle2 size={16} className="text-tertiary fill-tertiary-fixed" />
                                            </div>
                                            <p className="text-label-sm text-on-surface-variant">Audio Network</p>
                                        </div>
                                    </div>
                                    <p className="text-body-sm text-on-surface leading-relaxed italic mb-4 text-xs">
                                        &ldquo;The automated SMS perks changed the game for us. When someone joins our monthly support tier, Nudge instantly texts them private unlisted episode links. We retired four disconnected tools on day one.&rdquo;
                                    </p>
                                </div>
                                <div className="pt-4 border-t border-outline-variant/40 flex items-center justify-between text-xs text-on-surface-variant">
                                    <span className="font-semibold text-primary">280+ Monthly Backers</span>
                                    <span>Independent Audio Journalism</span>
                                </div>
                            </div>

                            {/* Creator 3 */}
                            <div className="bg-surface p-6 rounded-3xl border border-outline-variant shadow-sm flex flex-col justify-between">
                                <div>
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="w-12 h-12 rounded-full bg-secondary-container/30 border-2 border-secondary flex items-center justify-center font-bold text-secondary text-headline-sm">
                                            HG
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-1.5">
                                                <h3 className="text-title-md font-title-md text-on-surface font-bold">
                                                    Himalayan Gamer
                                                </h3>
                                                <CheckCircle2 size={16} className="text-tertiary fill-tertiary-fixed" />
                                            </div>
                                            <p className="text-label-sm text-on-surface-variant">Twitch &amp; YouTube Streamer</p>
                                        </div>
                                    </div>
                                    <p className="text-body-sm text-on-surface leading-relaxed italic mb-4 text-xs">
                                        &ldquo;The Nepali Devanagari TTS alert is hilarious and responsive. Someone tipped with pure slang and the Bansuri flute chime went off instantly on OBS. My stream donations doubled within two weeks.&rdquo;
                                    </p>
                                </div>
                                <div className="pt-4 border-t border-outline-variant/40 flex items-center justify-between text-xs text-on-surface-variant">
                                    <span className="font-semibold text-primary">Sub-second OBS Alerts</span>
                                    <span>Live Broadcast Engine</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                {/* 7. HIGH-CONVERTING BOTTOM CLAIM CTA */}
                <section
                    className="snap-start min-h-[calc(100vh-4rem)] flex flex-col justify-center py-12 md:py-16 bg-background relative overflow-hidden border-t border-outline-variant/60"
                    id="signup"
                >
                    {/* Ambient decorative glow */}
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(188,71,34,0.06)_0%,transparent_70%)] pointer-events-none" />

                    <div className="max-w-5xl mx-auto px-space-md md:px-margin-tablet relative z-10 w-full">
                        <div className="bg-linear-to-br from-surface-container via-surface-container-low to-surface-container-high rounded-3xl border border-outline-variant p-6 sm:p-10 md:p-14 text-center shadow-xl">
                            {/* Icon Badge */}
                            <div className="inline-flex justify-center mb-5">
                                <div className="w-14 h-14 rounded-2xl bg-surface border border-outline-variant/80 shadow-xs flex items-center justify-center p-3 text-primary">
                                    <Sparkles size={28} />
                                </div>
                            </div>

                            <h2 className="text-headline-md md:text-display-hero-mobile lg:text-headline-lg font-display-hero text-on-surface tracking-tight mb-3 font-bold">
                                Ready to Upgrade to an Enterprise-Grade Studio?
                            </h2>

                            <p className="text-body-sm md:text-body-md text-on-surface-variant max-w-2xl mx-auto mb-7 leading-relaxed">
                                Set up in 60 seconds. Claim your custom creator handle{" "}
                                <span className="font-mono font-bold text-primary">nudge.np/@yourname</span>. Fully verified with Nagarik App. 0% platform fee for open source, cultural archives, and indie storytellers.
                            </p>

                            {/* Claim Form */}
                            <div className="max-w-lg mx-auto mb-6">
                                <form
                                    onSubmit={handleClaimSubmit}
                                    className="flex flex-col sm:flex-row items-center gap-2 bg-surface p-1.5 rounded-2xl sm:rounded-full border border-outline-variant shadow-sm focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20 transition-all"
                                >
                                    <div className="flex items-center flex-1 px-3 py-1.5 w-full">
                                        <span className="text-xs sm:text-sm font-mono font-bold text-outline select-none shrink-0">
                                            nudge.np/@
                                        </span>
                                        <input
                                            type="text"
                                            required
                                            value={claimHandle}
                                            onChange={(e) =>
                                                setClaimHandle(e.target.value.toLowerCase().replace(/[^a-z0-9_-]/g, ""))
                                            }
                                            placeholder="yourhandle"
                                            className="w-full border-0 p-0 pl-1 text-on-surface font-mono text-xs sm:text-sm focus:ring-0 placeholder:text-outline-variant bg-transparent focus:outline-none"
                                        />
                                    </div>
                                    <Button
                                        variant="primary"
                                        size="sm"
                                        type="submit"
                                        className="w-full sm:w-auto shrink-0 whitespace-nowrap"
                                        rightIcon={<ArrowRight size={14} />}
                                    >
                                        Claim Studio Handle
                                    </Button>
                                </form>
                            </div>

                            {/* Trust Guarantees */}
                            <div className="flex flex-wrap items-center justify-center gap-y-2 gap-x-6 text-[11px] sm:text-xs text-on-surface-variant">
                                <span className="flex items-center gap-1.5">
                                    <Lock size={13} className="text-tertiary shrink-0" />
                                    Bank-Grade 256-Bit SSL Encryption
                                </span>
                                <span className="flex items-center gap-1.5">
                                    <IdCard size={13} className="text-tertiary shrink-0" />
                                    Instant Nagarik App e-KYC
                                </span>
                                <span className="flex items-center gap-1.5">
                                    <Gauge size={13} className="text-tertiary shrink-0" />
                                    Live in Under 60 Seconds
                                </span>
                            </div>
                        </div>
                    </div>
                </section>
                <div className="snap-start">
                    <Footer />
                </div>
            </main>
        </>
    );
}