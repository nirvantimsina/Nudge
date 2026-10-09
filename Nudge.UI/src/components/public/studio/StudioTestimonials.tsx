import { CheckCircle2 } from "lucide-react";
import { STUDIO_TESTIMONIALS } from "@/src/features/studio/constants/studio.constants";

export function StudioTestimonials() {
    const getAvatarBadgeClass = (accent: string) => {
        switch (accent) {
            case "primary":
                return "bg-primary/10 border-2 border-primary text-primary";
            case "tertiary":
                return "bg-tertiary/10 border-2 border-tertiary text-tertiary";
            case "secondary":
                return "bg-secondary-container/30 border-2 border-secondary text-secondary";
            default:
                return "bg-primary/10 border-2 border-primary text-primary";
        }
    };

    return (
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
                    {STUDIO_TESTIMONIALS.map((testimonial) => (
                        <div
                            key={testimonial.id}
                            className="bg-surface p-6 rounded-3xl border border-outline-variant shadow-sm flex flex-col justify-between"
                        >
                            <div>
                                <div className="flex items-center gap-3 mb-4">
                                    <div
                                        className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-headline-sm ${getAvatarBadgeClass(
                                            testimonial.accentColor
                                        )}`}
                                    >
                                        {testimonial.initials}
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-1.5">
                                            <h3 className="text-title-md font-title-md text-on-surface font-bold">
                                                {testimonial.name}
                                            </h3>
                                            <CheckCircle2
                                                size={16}
                                                className="text-tertiary fill-tertiary-fixed"
                                            />
                                        </div>
                                        <p className="text-label-sm text-on-surface-variant">
                                            {testimonial.role}
                                        </p>
                                    </div>
                                </div>
                                <p className="text-body-sm text-on-surface leading-relaxed italic mb-4 text-xs">
                                    &ldquo;{testimonial.quote}&rdquo;
                                </p>
                            </div>
                            <div className="pt-4 border-t border-outline-variant/40 flex items-center justify-between text-xs text-on-surface-variant">
                                <span className="font-semibold text-primary">
                                    {testimonial.highlightMetric}
                                </span>
                                <span>{testimonial.category}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
