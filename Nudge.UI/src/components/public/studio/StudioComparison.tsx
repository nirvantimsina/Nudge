import { STUDIO_COMPARISON_ROWS } from "@/src/features/studio/constants/studio.constants";

export function StudioComparison() {
    return (
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
                                {STUDIO_COMPARISON_ROWS.map((row, idx) => (
                                    <tr key={idx} className="hover:bg-surface-container-low/60 transition-colors">
                                        <td className="p-4 sm:p-5 font-semibold text-on-surface">
                                            {row.feature}
                                            <p className="text-label-sm text-on-surface-variant font-normal">
                                                {row.subtext}
                                            </p>
                                        </td>
                                        <td className="p-4 sm:p-5 bg-primary/5 border-x-2 border-primary font-bold text-tertiary">
                                            {row.nudge}
                                        </td>
                                        <td className="p-4 sm:p-5 text-error font-medium">
                                            {row.patreon}
                                        </td>
                                        <td className="p-4 sm:p-5 text-on-surface-variant">
                                            {row.manualQr}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </section>
    );
}
