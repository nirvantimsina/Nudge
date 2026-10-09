import { Layers, Tv, Landmark, CreditCard, CheckCircle2 } from "lucide-react";
import { STUDIO_PILLARS } from "@/src/features/studio/constants/studio.constants";

export function StudioPillars() {
    const renderIcon = (type: string) => {
        switch (type) {
            case "layers":
                return <Layers size={26} />;
            case "tv":
                return <Tv size={26} />;
            case "landmark":
                return <Landmark size={26} />;
            case "credit-card":
                return <CreditCard size={26} />;
            default:
                return <Layers size={26} />;
        }
    };

    const getIconWrapperClass = (type: string) => {
        switch (type) {
            case "layers":
                return "bg-primary/10 text-primary";
            case "tv":
                return "bg-secondary-container/30 text-secondary";
            case "landmark":
                return "bg-tertiary/10 text-tertiary";
            case "credit-card":
                return "bg-primary/10 text-primary";
            default:
                return "bg-primary/10 text-primary";
        }
    };

    return (
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
                    {STUDIO_PILLARS.map((pillar) => (
                        <div
                            key={pillar.id}
                            id={pillar.anchorId}
                            className="bg-surface-container-lowest p-8 rounded-3xl border border-outline-variant/70 shadow-sm hover:shadow-md transition-all duration-200"
                        >
                            <div
                                className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-6 ${getIconWrapperClass(
                                    pillar.iconType
                                )}`}
                            >
                                {renderIcon(pillar.iconType)}
                            </div>
                            <h3 className="text-headline-sm font-headline-sm text-on-surface mb-3 font-bold">
                                {pillar.title}
                            </h3>
                            <p className="text-body-md text-on-surface-variant mb-6 leading-relaxed">
                                {pillar.description}
                            </p>
                            <ul className="space-y-3.5 text-body-sm text-on-surface border-t border-outline-variant/50 pt-6">
                                {pillar.points.map((pt, idx) => (
                                    <li key={idx} className="flex items-start gap-3">
                                        <CheckCircle2 size={18} className="text-tertiary shrink-0 mt-0.5" />
                                        <span>
                                            <strong>{pt.bold}</strong> {pt.text}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
