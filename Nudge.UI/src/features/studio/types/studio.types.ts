export interface StudioTestimonial {
    id: string;
    initials: string;
    name: string;
    role: string;
    quote: string;
    highlightMetric: string;
    category: string;
    accentColor: "primary" | "tertiary" | "secondary";
}

export interface StudioComparisonRow {
    feature: string;
    subtext: string;
    nudge: string;
    patreon: string;
    manualQr: string;
}

export interface StudioPillarItem {
    bold: string;
    text: string;
}

export interface StudioPillar {
    id: string;
    title: string;
    description: string;
    anchorId?: string;
    iconType: "layers" | "tv" | "landmark" | "credit-card";
    points: StudioPillarItem[];
}
