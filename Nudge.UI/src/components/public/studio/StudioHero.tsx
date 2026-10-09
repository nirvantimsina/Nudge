import Link from "next/link";
import { Rocket, PlayCircle, ShieldCheck, Zap, Lock } from "lucide-react";
import { Button } from "@/src/components/public/common/Button";

export function StudioHero() {
    return (
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
            </div>
        </section>
    );
}
