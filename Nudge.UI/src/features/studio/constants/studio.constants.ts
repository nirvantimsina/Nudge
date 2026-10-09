import { StudioComparisonRow, StudioPillar, StudioTestimonial } from "../types/studio.types";

export const STUDIO_COMPARISON_ROWS: StudioComparisonRow[] = [
    {
        feature: "Gateway & Platform Fees",
        subtext: "Effective cut from creator",
        nudge: "0% - 2.5% (standard interchange)",
        patreon: "8% - 12% + card processing",
        manualQr: "0% (but high manual labor)",
    },
    {
        feature: "Foreign Currency Loss",
        subtext: "NPR to USD conversion spreads",
        nudge: "0% Zero Loss (Native NPR Transactions)",
        patreon: "3% - 6% spread loss + wire fees",
        manualQr: "None",
    },
    {
        feature: "Local QR Convenience",
        subtext: "Fonepay, eSewa, Khalti native",
        nudge: "1-Tap Instant QR across all Nepali apps",
        patreon: "Requires Dollar Card (95% drop-off)",
        manualQr: "Manual screenshot verification",
    },
    {
        feature: "Automated 1% TDS Tax Slips",
        subtext: "IRD legal compliance",
        nudge: "Automated Sec 88(4) IRD certificate",
        patreon: "No Nepal tax filing; legal liability",
        manualQr: "Manual accountant compilation",
    },
    {
        feature: "OBS Live Stream Alerts & TTS",
        subtext: "Real-time alerts on live broadcast",
        nudge: "Nepali Voice TTS + Madal/Bansuri chimes",
        patreon: "English-only TTS, high delay",
        manualQr: "None (streamer checks phone manually)",
    },
    {
        feature: "Payout Schedule",
        subtext: "Speed to commercial bank deposit",
        nudge: "Daily automated nightly sweep (11:59 PM)",
        patreon: "Once a month with $30 wire fee",
        manualQr: "Manual wallet transfers",
    },
];

export const STUDIO_TESTIMONIALS: StudioTestimonial[] = [
    {
        id: "sisan-baniya",
        initials: "SB",
        name: "Sisan Baniya",
        role: "Filmmaker & Storyteller",
        quote: "On Patreon, 80% of our viewers dropped off at the dollar card screen. With Nudge Studio, they just scan Fonepay from any bank app. Plus, the automated 1% TDS slip means our company tax audit takes 5 minutes instead of 3 weeks.",
        highlightMetric: "रु 3,40,000+ raised",
        category: "Documentary Expeditions",
        accentColor: "primary",
    },
    {
        id: "kathmandu-podcast",
        initials: "KP",
        name: "Kathmandu Podcast",
        role: "Audio Network",
        quote: "The automated SMS perks changed the game for us. When someone joins our monthly support tier, Nudge instantly texts them private unlisted episode links. We retired four disconnected tools on day one.",
        highlightMetric: "280+ Monthly Backers",
        category: "Independent Audio Journalism",
        accentColor: "tertiary",
    },
    {
        id: "himalayan-gamer",
        initials: "HG",
        name: "Himalayan Gamer",
        role: "Twitch & YouTube Streamer",
        quote: "The Nepali Devanagari TTS alert is hilarious and responsive. Someone tipped with pure slang and the Bansuri flute chime went off instantly on OBS. My stream donations doubled within two weeks.",
        highlightMetric: "Sub-second OBS Alerts",
        category: "Live Broadcast Engine",
        accentColor: "secondary",
    },
];

export const STUDIO_PILLARS: StudioPillar[] = [
    {
        id: "backer-crm",
        title: "Unified Backer CRM & Supporter Intelligence",
        description: "Consolidate your entire community history in one clean timeline. Track lifetime support, one-off tips, and active recurring memberships with zero manual spreadsheets.",
        iconType: "layers",
        points: [
            {
                bold: "1-Tap Thank-You SMS:",
                text: "Send personalized audio drops or SMS notes directly to backers' phones without juggling messaging apps.",
            },
            {
                bold: "Physical Perk Fulfillment Queue:",
                text: "Auto-generate shipping manifests for custom handmade Lokta art prints, stickers, and Himalayan tea boxes.",
            },
            {
                bold: "Deep Community Insights:",
                text: "Identify your top 5% backer pillars, average support tenure, and cohort retention at a glance.",
            },
        ],
    },
    {
        id: "broadcast-studio",
        title: "Broadcast Studio & Live Stream Engine",
        description: "Plug a single browser source URL into OBS Studio, vMix, or Streamlabs. Turn support pings into a celebration during YouTube, Twitch, and Facebook live broadcasts.",
        iconType: "tv",
        points: [
            {
                bold: "Authentic Himalayan Sound Chimes:",
                text: "Trigger celebratory Madal syncopations, Sarangi strings, Bansuri flutes, or singing bowls.",
            },
            {
                bold: "Devanagari & Romanized Neural TTS:",
                text: "Reads backer messages aloud accurately in Nepali with strict filtering and custom minimum thresholds.",
            },
            {
                bold: "Sub-Second Local WebSocket:",
                text: "Zero-latency alerts triggering within 400 milliseconds of Fonepay QR scan completion.",
            },
        ],
    },
    {
        id: "tax-compliance",
        anchorId: "tax-compliance",
        title: "Automated Nepal Tax (IRD) & Bank Clearing",
        description: "Never stress over audits or compliance freezes. Nudge Studio automatically handles withholding tax according to Nepal Inland Revenue Department laws.",
        iconType: "landmark",
        points: [
            {
                bold: "Section 88(4) Income Tax Act:",
                text: "Automatic 1% advance TDS deduction cleanly logged and credited directly against your permanent PAN.",
            },
            {
                bold: "1-Click IRD TDS Certificates:",
                text: "Generate official fiscal year audit-ready slips (FY 2080/81 & 2081/82) with digital signature stamps.",
            },
            {
                bold: "Automated Nightly Bank Sweeps:",
                text: "Funds automatically clear into NIC Asia, Nabil, Global IME, Sanima, or any NCHL-IPS member bank.",
            },
        ],
    },
    {
        id: "recurring-memberships",
        title: "Recurring Monthly Memberships & Milestones",
        description: "Turn sporadic views into reliable monthly livelihood. Offer structured patron tiers with automated domestic recurring authorization (e-mandate) via eSewa and mobile wallets.",
        iconType: "credit-card",
        points: [
            {
                bold: "Custom Creator Tiers:",
                text: "Create badges like Community Supporter (रु 100), Project Backer (रु 500), and Producer (रु 2,500) with private feeds.",
            },
            {
                bold: "Public Project Milestones:",
                text: "Real-time progress bars for camera gear, high-altitude expeditions, and podcast microphones with stream sync.",
            },
            {
                bold: "Native Local Currency Rails:",
                text: "Supporters contribute in Nepali Rupees directly through their mobile banking app without foreign cards.",
            },
        ],
    },
];
