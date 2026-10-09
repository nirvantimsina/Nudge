"use client";

import Link from "next/link";
import { RefreshCw, Radio, ArrowRight } from "lucide-react";
import { Button } from "@/src/components/public/common/Button";
import { useEarningsCalculator } from "@/src/features/studio/hooks/useEarningsCalculator";

export function StudioEarningsCalculator() {
    const {
        monthlyEarnings,
        setMonthlyEarnings,
        annualSavings,
        hoursSaved,
        sliderId,
    } = useEarningsCalculator(75000);

    return (
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
                                    <label
                                        htmlFor={sliderId}
                                        className="text-title-md font-title-md text-on-surface font-semibold"
                                    >
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
                                <Button
                                    variant="primary"
                                    size="md"
                                    fullWidth
                                    rightIcon={<ArrowRight size={16} />}
                                >
                                    Claim Your Studio Free
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
