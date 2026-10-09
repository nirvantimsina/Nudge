import {
    Radio,
    Volume2,
    Music,
    TrendingUp,
    Download,
    MailCheck,
    Truck,
    ShieldCheck,
    ChevronRight,
} from "lucide-react";
import { Button } from "@/src/components/public/common/Button";

export function StudioWorkspaceBento() {
    return (
        <section className="relative -mt-10 sm:-mt-16 max-w-7xl mx-auto px-space-md md:px-margin-tablet lg:px-margin-desktop z-10 pb-20">
            <div
                className="relative rounded-3xl bg-surface-container border border-outline-variant p-3 sm:p-5 shadow-xl"
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
        </section>
    );
}
