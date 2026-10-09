"use client";

import { useState } from "react";
import { Sparkles, ArrowRight, Lock, IdCard, Gauge } from "lucide-react";
import { Button } from "@/src/components/public/common/Button";

export function StudioBottomCta() {
    const [claimHandle, setClaimHandle] = useState<string>("");

    const handleClaimSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!claimHandle.trim()) return;
        window.location.href = `/auth/register?handle=${encodeURIComponent(
            claimHandle.trim()
        )}`;
    };

    return (
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
    );
}
