"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Sparkles,
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  Lock,
  Layers,
  Zap,
  TrendingUp,
  CreditCard,
  QrCode,
  Tv,
  BarChart3,
  Coffee,
  PlayCircle,
  Eye,
  Palette,
  Backpack,
  Headphones,
  ShoppingBag,
  Gamepad2,
  FileText,
  Radio,
  ExternalLink,
  ShieldCheck,
  XCircle,
  PiggyBank,
  MapPin,
  Camera,
  Podcast,
  Globe,
} from "lucide-react";
import { NavBar } from "@/src/components/public/layout/NavBar";
import { Footer } from "@/src/components/public/layout/Footer";
import { Button } from "@/src/components/public/common/Button";

/* -------------------------------------------------------------------------- */
/*                         INTERACTIVE THEMES CONFIG                          */
/* -------------------------------------------------------------------------- */

interface LoomTheme {
  id: string;
  name: string;
  badge: string;
  title: string;
  desc: string;
  specs: string[];
  cardClass: string;
  headerAccentClass: string;
  primaryActionClass: string;
  creatorName: string;
  creatorHandle: string;
  creatorBio: string;
  tile1Text: string;
  tile1Icon: typeof Headphones;
  tile3Text: string;
  tile3Icon: typeof ShoppingBag;
}

const LOOM_THEMES: Record<string, LoomTheme> = {
  artisanal: {
    id: "artisanal",
    name: "Himalayan Artisanal",
    badge: "Handcrafted Texture Series",
    title: "The Himalayan Artisanal Theme",
    desc: "Grounded in natural Lokta paper textures, warm valley terracotta borders, baked clay buttons, and marigold accents. Tailored for heritage storytellers, visual artists, and folk musicians.",
    specs: [
      "Subtle embossed Newari brick filigree pattern",
      "Marigold celebratory tipping micro-animations",
      "Lokta fiber paper parchment container fills",
    ],
    cardClass: "bg-surface-container-lowest border-2 border-primary-container/60 shadow-xl",
    headerAccentClass: "text-primary",
    primaryActionClass: "bg-primary-container text-on-primary",
    creatorName: "Purna Nepali",
    creatorHandle: "nudge.np/@purnanepali",
    creatorBio: "Reviving Gandharva folk strings for modern film soundtracks.",
    tile1Text: "Listen: 'Mustang Reverie' (EP)",
    tile1Icon: Headphones,
    tile3Text: "Hand-carved Lokta Sheet Music Book",
    tile3Icon: ShoppingBag,
  },
  cyber: {
    id: "cyber",
    name: "Cyber Pokhara",
    badge: "Neon Lakefront Streamer",
    title: "The Cyber Pokhara Theme",
    desc: "High-contrast dark-mode canvas accented with Fewa Lake neon cyans and electric marigold. Built for gaming streamers, tech reviewers, and digital motion animators.",
    specs: [
      "OLED pure black card surface with cyan glow borders",
      "Twitch & YouTube direct live-stream ticker integration",
      "Digital cyberpunk geometric HUD typography",
    ],
    cardClass: "bg-[#181615] text-white border-2 border-cyan-500/80 shadow-[0_0_25px_rgba(6,182,212,0.15)]",
    headerAccentClass: "text-cyan-400",
    primaryActionClass: "bg-cyan-500 text-black font-bold",
    creatorName: "Avishek Gurung",
    creatorHandle: "nudge.np/@avishek_live",
    creatorBio: "Pokhara Valorant & PUBG Pro • Daily 8 PM Live Stream 🎮",
    tile1Text: "Join My Discord Server (8,400+ Gamers)",
    tile1Icon: Gamepad2,
    tile3Text: "Custom Nepali Gaming PC Specs 2026",
    tile3Icon: Radio,
  },
  minimalist: {
    id: "minimalist",
    name: "Minimalist Storyteller",
    badge: "Editorial Clean Series",
    title: "The Minimalist Storyteller Theme",
    desc: "Refined Scandinavian clarity meets high-legibility serif typography. Generous negative space designed for long-form journalists, essayists, and minimalist architects.",
    specs: [
      "Razor-thin monochrome border lines (1px #E6E1DA)",
      "Subdued, distraction-free typographic hierarchy",
      "Substack & Medium publication feed embeds",
    ],
    cardClass: "bg-white text-zinc-900 border border-zinc-300 shadow-sm",
    headerAccentClass: "text-zinc-900",
    primaryActionClass: "bg-zinc-900 text-white font-semibold",
    creatorName: "Dr. Alisha Karki",
    creatorHandle: "nudge.np/@alishakarki",
    creatorBio: "Writing about Himalayan climate policy, water security & architecture.",
    tile1Text: "Read: 'Glacial Retreat in Solukhumbu'",
    tile1Icon: FileText,
    tile3Text: "Subscribe to My Sunday Climate Dispatch",
    tile3Icon: Globe,
  },
};

export default function LoomPage() {
  const [claimHandle, setClaimHandle] = useState("");
  const [activeTheme, setActiveTheme] = useState<string>("artisanal");

  const currentTheme = LOOM_THEMES[activeTheme] ?? LOOM_THEMES.artisanal;

  const handleClaimSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!claimHandle.trim()) return;
    const cleanHandle = claimHandle.trim().toLowerCase().replace(/[^a-z0-9_-]/g, "");
    window.location.href = `/auth/register?handle=${encodeURIComponent(cleanHandle)}`;
  };

  return (
    <>
      <NavBar />

    {/* Remove h-[calc(100vh-4rem)] and overflow-y-auto; use min-h-screen and pt-16 */}
    <main className="snap-start relative min-h-screen bg-background text-on-surface font-body-md antialiased selection:bg-primary-fixed selection:text-on-primary-fixed">
      {/* Texture now extends to top: 0 behind the glass navbar */}
      <div className="absolute inset-0 bg-[radial-gradient(#bc4722_0.75px,transparent_0.75px),radial-gradient(#dfc0b7_0.75px,#fff9ed_0.75px)] bg-size-[30px_30px] opacity-25 pointer-events-none" />

      {/* 1. HERO SECTION (Full screen minus navbar offset) */}
      <section className="relative min-h-[calc(100vh-4rem)] flex flex-col justify-center items-center py-12 max-w-7xl mx-auto px-space-md md:px-margin-tablet lg:px-margin-desktop">
        <div className="text-center max-w-3xl mx-auto">
          {/* Trust pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-surface-container-high border border-outline-variant/70 mb-6 shadow-xs">
            <span className="flex h-2 w-2 rounded-full bg-tertiary" />
            <span className="text-label-sm font-label-sm text-on-surface-variant font-medium">
              100% Free for Nudge Creators • Zero Platform Cut • Native Fonepay &amp; eSewa Support
            </span>
          </div>

            <h1 className="text-display-hero-mobile md:text-display-hero font-display-hero text-on-surface tracking-tight mb-6 font-bold leading-tight">
              Every Thread of Your Digital Presence.{" "}
              <span className="text-primary-container underline decoration-secondary-container decoration-4 underline-offset-8">
                Woven Into One
              </span>{" "}
              Beautiful Link.
            </h1>

            <p className="text-body-md md:text-body-lg font-body-lg text-on-surface-variant max-w-2xl mx-auto mb-8 leading-relaxed">
              The artisanal link-in-bio crafted for Himalayan creators. Unify your YouTube docs, TikTok clips, Spotify playlists, and instant{" "}
              <strong className="text-on-surface font-bold">Fonepay, eSewa &amp; Khalti tips</strong> in one blazing-fast digital home.
            </p>

            {/* Handle Reservation Form */}
            <div
              className="max-w-xl mx-auto bg-surface-container-lowest p-2 rounded-2xl border-2 border-primary-container shadow-md transition-all hover:shadow-lg focus-within:ring-4 focus-within:ring-primary-container/20"
              id="claim-handle"
            >
              <form onSubmit={handleClaimSubmit} className="flex flex-col sm:flex-row items-center gap-2">
                <div className="flex items-center flex-1 px-3 py-2 w-full">
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
                    className="w-full border-0 p-0 pl-1 text-on-surface font-title-md text-sm sm:text-base focus:ring-0 placeholder:text-outline-variant bg-transparent focus:outline-none"
                  />
                </div>
                <Button variant="primary" size="md" type="submit" rightIcon={<ArrowRight size={16} />}>
                  Claim Loom Link
                </Button>
              </form>
            </div>

            <p className="mt-3 text-label-sm font-label-sm text-on-surface-variant">
              Takes 30 seconds. Connects automatically to your existing Nudge Creator wallet.
            </p>
          </div>
        </section>

        {/* 2. DUAL-DISPLAY PREVIEW (Phone Simulator + Studio Canvas) */}
        <section className="relative min-h-[calc(100vh-4rem)] flex flex-col justify-center py-16 max-w-7xl mx-auto px-space-md md:px-margin-tablet lg:px-margin-desktop border-t border-outline-variant/40" id="overview">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Phone Screen Simulator */}
            <div className="snap-start lg:col-span-6 flex justify-center">
              <div className="relative w-full max-w-90 bg-[#1a1715] rounded-[48px] p-3 shadow-2xl ring-1 ring-white/20">
                {/* Phone Notch */}
                <div className="absolute top-6 left-1/2 -translate-x-1/2 w-28 h-5 bg-black rounded-full z-30 flex items-center justify-end px-3">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#111] ring-1 ring-zinc-800" />
                </div>

                {/* Inner Screen */}
                <div className="relative rounded-[40px] overflow-hidden bg-surface-bright text-on-surface border border-outline-variant/40 transition-all duration-300 min-h-[640px] flex flex-col justify-between">
                  {/* Top Header Banner */}
                  <div className="h-28 bg-gradient-to-br from-primary-container via-surface-tint to-secondary-container relative overflow-hidden flex items-end p-4">
                    <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full border-4 border-white/20" />
                    <span className="text-[10px] font-mono font-bold text-on-primary/90 bg-black/40 px-2 py-0.5 rounded-full backdrop-blur-xs">
                      nudge.np/@aayush_visuals
                    </span>
                  </div>

                  {/* Profile Section */}
                  <div className="px-5 -mt-10 relative z-10 flex flex-col items-center text-center">
                    <div className="relative">
                      <div className="w-20 h-20 rounded-full bg-primary/20 border-4 border-surface-container-lowest flex items-center justify-center text-primary font-bold text-xl shadow-md">
                        AS
                      </div>
                      <span className="absolute bottom-0 right-0 bg-tertiary text-on-tertiary rounded-full p-0.5 ring-2 ring-surface-container-lowest">
                        <CheckCircle2 size={14} />
                      </span>
                    </div>

                    <h3 className="font-headline-sm text-base text-on-surface mt-2 font-bold">
                      Aayush Shrestha
                    </h3>
                    <p className="text-[11px] text-on-surface-variant max-w-[260px] line-clamp-2 leading-tight mt-0.5">
                      Documenting Himalayan trails, Newar heritage &amp; street photography. Kathmandu, Nepal 🇳🇵
                    </p>

                    {/* Social links */}
                    <div className="flex items-center gap-2 mt-2.5 text-on-surface-variant">
                      <span className="p-1.5 rounded-full bg-surface-container hover:text-primary transition-colors cursor-pointer">
                        <Camera size={14} />
                      </span>
                      <span className="p-1.5 rounded-full bg-surface-container hover:text-primary transition-colors cursor-pointer">
                        <PlayCircle size={14} />
                      </span>
                      <span className="p-1.5 rounded-full bg-surface-container hover:text-primary transition-colors cursor-pointer">
                        <Podcast size={14} />
                      </span>
                      <span className="p-1.5 rounded-full bg-surface-container hover:text-primary transition-colors cursor-pointer">
                        <Globe size={14} />
                      </span>
                    </div>
                  </div>

                  {/* Dynamic Blocks Stack */}
                  <div className="p-4 flex-1 flex flex-col gap-2.5 overflow-y-auto max-h-[360px]">
                    {/* In-Bio Direct Support Tile */}
                    <div className="bg-surface-container-lowest border border-primary-container/40 rounded-2xl p-3 shadow-xs text-left relative">
                      <div className="flex items-center justify-between mb-1.5">
                        <div className="flex items-center gap-1.5">
                          <Coffee size={16} className="text-primary-container" />
                          <span className="text-xs font-bold text-on-surface">Send Chiya / Support</span>
                        </div>
                        <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-secondary-container/50 text-on-secondary-container">
                          Instant Fonepay
                        </span>
                      </div>
                      <p className="text-[11px] text-on-surface-variant mb-2 leading-tight">
                        Fuel my next Mustang expedition directly with Nepali mobile wallets.
                      </p>
                      <div className="flex items-center gap-1.5">
                        <button className="flex-1 py-1 px-1.5 rounded-lg bg-surface-container border border-outline-variant text-[11px] font-bold hover:border-primary-container transition-colors">
                          Rs. 100
                        </button>
                        <button className="flex-1 py-1 px-1.5 rounded-lg bg-primary-container text-on-primary text-[11px] font-bold shadow-xs">
                          Rs. 300
                        </button>
                        <button className="flex-1 py-1 px-1.5 rounded-lg bg-surface-container border border-outline-variant text-[11px] font-bold hover:border-primary-container transition-colors">
                          Rs. 500
                        </button>
                      </div>
                    </div>

                    {/* YouTube Video Embed Preview */}
                    <div className="bg-surface-container-lowest border border-outline-variant/60 rounded-2xl p-2 flex items-center gap-2.5 shadow-xs hover:border-primary-container transition-colors cursor-pointer">
                      <div className="w-12 h-12 rounded-xl bg-surface-container flex items-center justify-center text-primary shrink-0 relative overflow-hidden">
                        <PlayCircle size={22} />
                      </div>
                      <div className="flex-1 min-w-0 text-left">
                        <span className="text-[9px] font-bold text-primary block uppercase">
                          Latest Documentary
                        </span>
                        <h4 className="text-xs font-bold text-on-surface truncate">
                          Lost Monasteries of Lo Manthang
                        </h4>
                        <span className="text-[10px] text-on-surface-variant flex items-center gap-1">
                          <Eye size={10} /> 42k views • YouTube
                        </span>
                      </div>
                    </div>

                    {/* Presets Link */}
                    <div className="bg-surface-container-lowest border border-outline-variant/60 rounded-2xl p-2.5 flex items-center justify-between shadow-xs hover:border-primary-container transition-colors cursor-pointer">
                      <div className="flex items-center gap-2 text-left">
                        <Palette size={18} className="text-secondary" />
                        <div>
                          <div className="text-xs font-bold text-on-surface">Himalaya Tones Preset Pack</div>
                          <div className="text-[10px] text-on-surface-variant">12 presets for mobile &amp; desktop</div>
                        </div>
                      </div>
                      <ExternalLink size={14} className="text-outline" />
                    </div>

                    {/* Gear Guide Link */}
                    <div className="bg-surface-container-lowest border border-outline-variant/60 rounded-2xl p-2.5 flex items-center justify-between shadow-xs hover:border-primary-container transition-colors cursor-pointer">
                      <div className="flex items-center gap-2 text-left">
                        <Backpack size={18} className="text-tertiary" />
                        <div>
                          <div className="text-xs font-bold text-on-surface">Camera Gear 2026</div>
                          <div className="text-[10px] text-on-surface-variant">Sony FX3 &amp; Mountain Rig</div>
                        </div>
                      </div>
                      <ExternalLink size={14} className="text-outline" />
                    </div>
                  </div>

                  {/* Watermark Footer */}
                  <div className="py-2 text-center border-t border-outline-variant/30 bg-surface-container/60">
                    <span className="text-[10px] text-outline font-medium">
                      Woven with <strong className="text-primary font-bold">Nudge Loom</strong> 🇳🇵
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Studio Features Overview */}
            <div className="lg:col-span-6 flex flex-col gap-5 text-left">
              <div className="inline-flex items-center gap-2 text-primary font-label-md text-xs font-bold uppercase tracking-wider">
                <Layers size={18} />
                <span>The Loom Creator Canvas</span>
              </div>

              <h2 className="text-headline-md md:text-headline-lg font-headline-lg text-on-surface font-bold">
                Control Every Pixel. <br />
                Without Writing Code.
              </h2>

              <p className="text-body-md text-on-surface-variant leading-relaxed">
                Standard bio links lock basic colors and fonts behind $10/month subscription gates. Nudge Loom gives Nepali artists, streamers, and storytellers aesthetic freedom right in the browser.
              </p>

              {/* Bento Grid Features */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
                <div className="bg-surface-container-lowest border border-outline-variant/70 rounded-2xl p-4 shadow-xs">
                  <div className="flex items-center gap-2.5 mb-1.5">
                    <div className="p-2 rounded-xl bg-primary-fixed text-on-primary-fixed">
                      <Palette size={18} />
                    </div>
                    <h4 className="font-title-md text-sm font-bold text-on-surface">
                      Himalayan Paper Themes
                    </h4>
                  </div>
                  <p className="text-xs text-on-surface-variant leading-relaxed">
                    Lokta paper grains, terracotta clay, Annapurna night, and modern minimalist editorial styling.
                  </p>
                </div>

                <div className="bg-surface-container-lowest border border-outline-variant/70 rounded-2xl p-4 shadow-xs">
                  <div className="flex items-center gap-2.5 mb-1.5">
                    <div className="p-2 rounded-xl bg-secondary-fixed text-on-secondary-fixed">
                      <QrCode size={18} />
                    </div>
                    <h4 className="font-title-md text-sm font-bold text-on-surface">
                      Fonepay QR Bio-Tile
                    </h4>
                  </div>
                  <p className="text-xs text-on-surface-variant leading-relaxed">
                    Embed your personal merchant QR code so followers can scan or 1-tap pay on mobile without app jumps.
                  </p>
                </div>

                <div className="bg-surface-container-lowest border border-outline-variant/70 rounded-2xl p-4 shadow-xs">
                  <div className="flex items-center gap-2.5 mb-1.5">
                    <div className="p-2 rounded-xl bg-tertiary-fixed text-on-tertiary-fixed">
                      <Tv size={18} />
                    </div>
                    <h4 className="font-title-md text-sm font-bold text-on-surface">
                      OBS Stream Ticker Sync
                    </h4>
                  </div>
                  <p className="text-xs text-on-surface-variant leading-relaxed">
                    Broadcast real-time milestone goals, recent tips, and top patrons directly onto your Twitch or YouTube live stream.
                  </p>
                </div>

                <div className="bg-surface-container-lowest border border-outline-variant/70 rounded-2xl p-4 shadow-xs">
                  <div className="flex items-center gap-2.5 mb-1.5">
                    <div className="p-2 rounded-xl bg-surface-variant text-on-surface-variant">
                      <BarChart3 size={18} />
                    </div>
                    <h4 className="font-title-md text-sm font-bold text-on-surface">
                      Diaspora Analytics
                    </h4>
                  </div>
                  <p className="text-xs text-on-surface-variant leading-relaxed">
                    Track clicks by city (Kathmandu, Pokhara, Sydney, Dallas) and conversion rates without privacy violations.
                  </p>
                </div>
              </div>

              <div className="pt-2">
                <a
                  href="#themes"
                  className="inline-flex items-center gap-1.5 text-primary font-bold text-xs hover:underline"
                >
                  <span>Explore the live theme switcher below</span>
                  <ArrowRight size={14} />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* 3. 'WHY LOOM?' FOUR VALUE PILLARS */}
        <section className="snap-start py-20 bg-surface-container border-y border-outline-variant/50 relative" id="value-pillars">
          <div className="max-w-7xl mx-auto px-space-md md:px-margin-tablet lg:px-margin-desktop">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <span className="text-label-md font-label-md text-primary uppercase tracking-widest font-bold">
                The Four Threads
              </span>
              <h2 className="text-headline-lg font-headline-lg text-on-surface mt-2 mb-4 font-bold">
                Why Nepali Creators Prefer Nudge Loom
              </h2>
              <p className="text-body-md font-body-md text-on-surface-variant leading-relaxed">
                Foreign bio link tools treat Nepal as an unsupported afterthought. Loom is architected around local payment rails, Himalayan storytelling, and zero platform exploitation.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
              {/* Thread 1 */}
              <div className="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant flex flex-col justify-between shadow-sm">
                <div>
                  <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-4">
                    <Layers size={24} />
                  </div>
                  <span className="text-[10px] font-mono font-bold text-primary uppercase tracking-wider">
                    Thread 01
                  </span>
                  <h3 className="text-title-md font-title-md text-on-surface font-bold mt-1 mb-2">
                    Unify Your Digital Identity
                  </h3>
                  <p className="text-xs text-on-surface-variant leading-relaxed">
                    One single URL to anchor your Instagram bio, TikTok profile, YouTube description, Substack, and GitHub without third-party redirect cookies.
                  </p>
                </div>
                <div className="mt-6 pt-3 border-t border-outline-variant/40 flex items-center gap-1.5 text-xs text-tertiary font-semibold">
                  <Zap size={14} />
                  <span>Sub-50ms Kathmandu edge loading</span>
                </div>
              </div>

              {/* Thread 2 */}
              <div className="bg-surface-container-lowest p-6 rounded-2xl border-2 border-primary-container flex flex-col justify-between shadow-md relative">
                <span className="absolute -top-3 right-4 px-2.5 py-0.5 rounded-full bg-primary-container text-on-primary text-[10px] font-bold">
                  The Gamechanger
                </span>
                <div>
                  <div className="w-12 h-12 rounded-xl bg-primary-container text-on-primary flex items-center justify-center mb-4 shadow-xs">
                    <CreditCard size={24} />
                  </div>
                  <span className="text-[10px] font-mono font-bold text-primary-container uppercase tracking-wider">
                    Thread 02
                  </span>
                  <h3 className="text-title-md font-title-md text-on-surface font-bold mt-1 mb-2">
                    Native In-Bio Patronage
                  </h3>
                  <p className="text-xs text-on-surface-variant leading-relaxed">
                    Unlike Linktree or Beacons which force followers to external US-only payment screens, your audience can support you with eSewa, Fonepay, or Khalti directly inside your bio.
                  </p>
                </div>
                <div className="mt-6 pt-3 border-t border-outline-variant/40 flex items-center gap-1.5 text-xs text-primary font-semibold">
                  <CheckCircle2 size={14} />
                  <span>3.4x higher tipping conversion</span>
                </div>
              </div>

              {/* Thread 3 */}
              <div className="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant flex flex-col justify-between shadow-sm">
                <div>
                  <div className="w-12 h-12 rounded-xl bg-secondary-fixed text-secondary flex items-center justify-center mb-4">
                    <PiggyBank size={24} />
                  </div>
                  <span className="text-[10px] font-mono font-bold text-secondary uppercase tracking-wider">
                    Thread 03
                  </span>
                  <h3 className="text-title-md font-title-md text-on-surface font-bold mt-1 mb-2">
                    Zero Platform Taxes
                  </h3>
                  <p className="text-xs text-on-surface-variant leading-relaxed">
                    100% Free forever for Nudge creators. No paying $120/year to unlock custom themes, video embeds, or remove foreign branding logos.
                  </p>
                </div>
                <div className="mt-6 pt-3 border-t border-outline-variant/40 flex items-center gap-1.5 text-xs text-tertiary font-semibold">
                  <CheckCircle2 size={14} />
                  <span>Rs. 0 subscription fee</span>
                </div>
              </div>

              {/* Thread 4 */}
              <div className="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant flex flex-col justify-between shadow-sm">
                <div>
                  <div className="w-12 h-12 rounded-xl bg-tertiary-fixed text-tertiary flex items-center justify-center mb-4">
                    <BarChart3 size={24} />
                  </div>
                  <span className="text-[10px] font-mono font-bold text-tertiary uppercase tracking-wider">
                    Thread 04
                  </span>
                  <h3 className="text-title-md font-title-md text-on-surface font-bold mt-1 mb-2">
                    Real-Time Analytics
                  </h3>
                  <p className="text-xs text-on-surface-variant leading-relaxed">
                    Know where your traffic thrives. Clear geographical breakdown across Nepali cities and diaspora hubs (Sydney, London, Dallas, Tokyo).
                  </p>
                </div>
                <div className="mt-6 pt-3 border-t border-outline-variant/40 flex items-center gap-1.5 text-xs text-tertiary font-semibold">
                  <MapPin size={14} />
                  <span>Privacy-first diaspora tracking</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 4. INTERACTIVE THEME SWITCHER */}
        <section className="py-20 max-w-7xl mx-auto px-space-md md:px-margin-tablet lg:px-margin-desktop" id="themes">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6 text-left">
            <div>
              <span className="snap-start text-label-md font-label-md text-primary font-bold uppercase tracking-wider">
                Atmospheric Design
              </span>
              <h2 className="text-headline-lg font-headline-lg text-on-surface mt-1 font-bold">
                Pick a Canvas Aesthetic. Or Weave Your Own.
              </h2>
              <p className="text-body-md font-body-md text-on-surface-variant max-w-xl mt-2 leading-relaxed">
                Toggle through live styles to see how your links, chiya pledges, and avatars adapt to your creative identity.
              </p>
            </div>

            {/* Theme Selector Pills */}
            <div className="flex items-center gap-1.5 bg-surface-container-high p-1 rounded-full border border-outline-variant/60 w-fit">
              {Object.values(LOOM_THEMES).map((th) => (
                <button
                  key={th.id}
                  type="button"
                  onClick={() => setActiveTheme(th.id)}
                  className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${activeTheme === th.id
                      ? "bg-primary-container text-on-primary shadow-xs"
                      : "text-on-surface-variant hover:text-on-surface"
                    }`}
                >
                  {th.name}
                </button>
              ))}
            </div>
          </div>

          {/* Interactive Simulation Frame */}
          <div className="rounded-3xl border border-outline-variant bg-[#fff9ed] p-6 sm:p-10 transition-all duration-300 relative overflow-hidden shadow-inner">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10 text-left">
              {/* Left: Theme Details */}
              <div className="lg:col-span-5 space-y-4">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-[10px] font-bold bg-primary-fixed text-on-primary-fixed">
                  {currentTheme.badge}
                </span>
                <h3 className="text-2xl font-bold text-on-surface">
                  {currentTheme.title}
                </h3>
                <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
                  {currentTheme.desc}
                </p>

                <ul className="space-y-2 pt-1 text-xs text-on-surface">
                  {currentTheme.specs.map((spec, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <CheckCircle2 size={16} className="text-primary shrink-0" />
                      <span>{spec}</span>
                    </li>
                  ))}
                </ul>

                <div className="pt-3">
                  <Link href="#claim-handle">
                    <Button variant="primary" size="sm" rightIcon={<ArrowUpRight size={14} />}>
                      Use this theme for free
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Right: Simulated Rendered Card */}
              <div className="lg:col-span-7 flex justify-center">
                <div className={`w-full max-w-md rounded-3xl p-6 transition-all duration-300 ${currentTheme.cardClass}`}>
                  {/* Mini Profile Header */}
                  <div className="flex items-center gap-3.5 mb-5">
                    <div className="w-14 h-14 rounded-2xl bg-primary/20 border border-outline-variant flex items-center justify-center font-bold text-base shrink-0">
                      {currentTheme.creatorName.slice(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <h4 className="font-bold text-base">{currentTheme.creatorName}</h4>
                        <CheckCircle2 size={15} className="text-tertiary fill-tertiary-fixed" />
                      </div>
                      <p className={`text-xs font-mono font-semibold ${currentTheme.headerAccentClass}`}>
                        {currentTheme.creatorHandle}
                      </p>
                      <p className="text-xs text-on-surface-variant mt-0.5 leading-snug">
                        {currentTheme.creatorBio}
                      </p>
                    </div>
                  </div>

                  {/* Links Inside Theme Card */}
                  <div className="space-y-2.5 text-xs">
                    <div className="p-3 rounded-xl bg-surface-container/60 border border-outline-variant/60 flex items-center justify-between hover:scale-[1.01] transition-transform cursor-pointer">
                      <div className="flex items-center gap-2.5">
                        <currentTheme.tile1Icon size={16} className="text-primary shrink-0" />
                        <span className="font-semibold">{currentTheme.tile1Text}</span>
                      </div>
                      <ArrowRight size={14} className="text-outline" />
                    </div>

                    <div className={`p-3 rounded-xl flex items-center justify-between hover:scale-[1.01] transition-transform cursor-pointer shadow-sm ${currentTheme.primaryActionClass}`}>
                      <div className="flex items-center gap-2.5">
                        <Coffee size={16} />
                        <div>
                          <div className="font-bold">Support My Creative Work</div>
                          <div className="text-[10px] opacity-85">Instant Fonepay / eSewa Support</div>
                        </div>
                      </div>
                      <span className="px-2 py-0.5 rounded bg-black/20 text-[10px] font-bold">Nudge</span>
                    </div>

                    <div className="p-3 rounded-xl bg-surface-container/60 border border-outline-variant/60 flex items-center justify-between hover:scale-[1.01] transition-transform cursor-pointer">
                      <div className="flex items-center gap-2.5">
                        <currentTheme.tile3Icon size={16} className="text-secondary shrink-0" />
                        <span className="font-semibold">{currentTheme.tile3Text}</span>
                      </div>
                      <ArrowRight size={14} className="text-outline" />
                    </div>
                  </div>

                  {/* Card Security Strip */}
                  <div className="mt-4 pt-3 border-t border-outline-variant/30 flex items-center justify-between text-[11px] text-on-surface-variant">
                    <span className="flex items-center gap-1">
                      <ShieldCheck size={13} className="text-tertiary" />
                      <span>Encrypted Rails</span>
                    </span>
                    <span className="font-semibold text-primary font-mono">NRB Compliant</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 5. COMPARISON MATRIX */}
        <section className="py-20 bg-surface-container-low border-y border-outline-variant/60" id="comparison">
          <div className="max-w-7xl mx-auto px-space-md md:px-margin-tablet lg:px-margin-desktop">
            <div className="text-center max-w-3xl mx-auto mb-14">
              <span className="snap-start text-label-md font-label-md text-primary font-bold uppercase tracking-wider">
                Unmatched Value
              </span>
              <h2 className="text-headline-lg font-headline-lg text-on-surface mt-1 font-bold">
                Loom vs Standard Foreign Bio Links
              </h2>
              <p className="text-body-md font-body-md text-on-surface-variant mt-2 leading-relaxed">
                Why pay foreign subscription fees when Nudge Loom builds local banking, cultural design, and community patronage into the foundational layer for free?
              </p>
            </div>

            {/* Table */}
            <div className="overflow-x-auto rounded-3xl border border-outline-variant bg-surface-container-lowest shadow-sm">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-outline-variant bg-surface-container">
                    <th className="p-4 md:p-5 text-sm font-bold text-on-surface w-2/5">Feature / Capability</th>
                    <th className="p-4 md:p-5 text-sm font-bold text-primary bg-primary-fixed/40 w-1/4 border-x border-outline-variant">
                      <div className="flex items-center gap-1.5">
                        <Sparkles size={16} />
                        <span>Nudge Loom</span>
                      </div>
                    </th>
                    <th className="p-4 md:p-5 text-sm font-semibold text-on-surface-variant">Linktree</th>
                    <th className="p-4 md:p-5 text-sm font-semibold text-on-surface-variant">Beacons.ai</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant/50 text-xs sm:text-sm">
                  <tr className="hover:bg-surface-container/30 transition-colors">
                    <td className="p-4 md:p-5">
                      <div className="font-bold text-on-surface">Integrated Local Payment Rails</div>
                      <div className="text-xs text-on-surface-variant">Instant Fonepay, eSewa, Khalti &amp; mobile banking</div>
                    </td>
                    <td className="p-4 md:p-5 bg-primary-fixed/20 border-x border-outline-variant font-bold text-tertiary">
                      <div className="flex items-center gap-1.5">
                        <CheckCircle2 size={16} />
                        <span>Native 1-Tap Checkout</span>
                      </div>
                    </td>
                    <td className="p-4 md:p-5 text-error">
                      <div className="flex items-center gap-1.5">
                        <XCircle size={16} />
                        <span>None (Stripe / PayPal only)</span>
                      </div>
                    </td>
                    <td className="p-4 md:p-5 text-error">
                      <div className="flex items-center gap-1.5">
                        <XCircle size={16} />
                        <span>None (Stripe only)</span>
                      </div>
                    </td>
                  </tr>

                  <tr className="hover:bg-surface-container/30 transition-colors">
                    <td className="p-4 md:p-5">
                      <div className="font-bold text-on-surface">Creator Platform Fee</div>
                      <div className="text-xs text-on-surface-variant">Monthly cost to unlock video embeds, colors &amp; analytics</div>
                    </td>
                    <td className="p-4 md:p-5 bg-primary-fixed/20 border-x border-outline-variant font-bold text-tertiary">
                      <div className="flex items-center gap-1.5">
                        <CheckCircle2 size={16} />
                        <span>100% Free Forever</span>
                      </div>
                    </td>
                    <td className="p-4 md:p-5 text-on-surface-variant">
                      $5 to $24 / mo (Rs. 700 - 3,200/mo)
                    </td>
                    <td className="p-4 md:p-5 text-on-surface-variant">
                      $10 to $30 / month
                    </td>
                  </tr>

                  <tr className="hover:bg-surface-container/30 transition-colors">
                    <td className="p-4 md:p-5">
                      <div className="font-bold text-on-surface">Artisanal Custom Branding</div>
                      <div className="text-xs text-on-surface-variant">Lokta textures, custom cards, zero forced watermarks</div>
                    </td>
                    <td className="p-4 md:p-5 bg-primary-fixed/20 border-x border-outline-variant font-bold text-tertiary">
                      <div className="flex items-center gap-1.5">
                        <CheckCircle2 size={16} />
                        <span>Fully Unlocked for Everyone</span>
                      </div>
                    </td>
                    <td className="p-4 md:p-5 text-error">
                      <div className="flex items-center gap-1.5">
                        <Lock size={15} />
                        <span>Paid Pro Tier Only</span>
                      </div>
                    </td>
                    <td className="p-4 md:p-5 text-error">
                      <div className="flex items-center gap-1.5">
                        <Lock size={15} />
                        <span>Paid Tier Only</span>
                      </div>
                    </td>
                  </tr>

                  <tr className="hover:bg-surface-container/30 transition-colors">
                    <td className="p-4 md:p-5">
                      <div className="font-bold text-on-surface">Nepal Rastra Bank &amp; TDS Compliance</div>
                      <div className="text-xs text-on-surface-variant">Automatic withholding certificate generation &amp; PAN credit</div>
                    </td>
                    <td className="p-4 md:p-5 bg-primary-fixed/20 border-x border-outline-variant font-bold text-tertiary">
                      <div className="flex items-center gap-1.5">
                        <CheckCircle2 size={16} />
                        <span>Automated IRD Reports</span>
                      </div>
                    </td>
                    <td className="p-4 md:p-5 text-outline">Unsupported</td>
                    <td className="p-4 md:p-5 text-outline">Unsupported</td>
                  </tr>

                  <tr className="hover:bg-surface-container/30 transition-colors">
                    <td className="p-4 md:p-5">
                      <div className="font-bold text-on-surface">OBS Browser Source Live Sync</div>
                      <div className="text-xs text-on-surface-variant">Show bio link supporters on your live broadcasts</div>
                    </td>
                    <td className="p-4 md:p-5 bg-primary-fixed/20 border-x border-outline-variant font-bold text-tertiary">
                      <div className="flex items-center gap-1.5">
                        <CheckCircle2 size={16} />
                        <span>Instant Widget Included</span>
                      </div>
                    </td>
                    <td className="p-4 md:p-5 text-error">
                      <div className="flex items-center gap-1.5">
                        <XCircle size={16} />
                        <span>No Stream Overlay</span>
                      </div>
                    </td>
                    <td className="p-4 md:p-5 text-on-surface-variant">Requires 3rd party Zapier</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="mt-6 text-xs text-on-surface-variant text-center">
              All Nudge Loom accounts include unlimited links, custom thumbnails, and automatic currency conversion for diaspora patrons.
            </p>
          </div>
        </section>

        {/* 6. CREATOR TESTIMONIALS */}
        <section className="snap-start py-20 max-w-7xl mx-auto px-space-md md:px-margin-tablet lg:px-margin-desktop" id="showcase">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-label-md font-label-md text-primary font-bold uppercase tracking-wider">
              Woven Across Nepal
            </span>
            <h2 className="text-headline-lg font-headline-lg text-on-surface mt-1 font-bold">
              Loved by Filmmakers, Podcasters &amp; Independent Makers
            </h2>
            <p className="text-body-md font-body-md text-on-surface-variant mt-2 leading-relaxed">
              From Kathmandu tech builders to Pokhara adventure vloggers, see how Himalayan creators anchor their bio traffic.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            {/* Creator 1 */}
            <div className="bg-surface-container-lowest p-6 rounded-3xl border border-outline-variant/70 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-primary/15 text-primary font-bold flex items-center justify-center shrink-0">
                    SB
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-on-surface">Shreya Bajracharya</h4>
                    <p className="text-xs font-mono font-bold text-primary">nudge.np/@shreyatalks</p>
                    <span className="text-[11px] text-on-surface-variant">Host, &apos;Kathmandu Uncut&apos; Podcast</span>
                  </div>
                </div>
                <p className="text-xs text-on-surface italic mb-4 leading-relaxed">
                  &ldquo;Putting my Loom link on Instagram boosted my monthly chiya tips by 280%. Listeners in Sydney and Pokhara don&apos;t need an account—they just tap, scan Fonepay or Apple Pay, and support the show in seconds.&rdquo;
                </p>
              </div>
              <div className="pt-3 border-t border-outline-variant/40 flex items-center justify-between text-xs text-on-surface-variant">
                <span>24.8k monthly clicks</span>
                <span className="text-tertiary font-bold flex items-center gap-1">
                  <TrendingUp size={14} /> +340% tips
                </span>
              </div>
            </div>

            {/* Creator 2 */}
            <div className="bg-surface-container-lowest p-6 rounded-3xl border-2 border-primary-container shadow-sm flex flex-col justify-between relative">
              <div className="absolute -top-3 right-4 px-2.5 py-0.5 rounded-full bg-secondary-container text-on-secondary-container text-[10px] font-bold">
                Featured Creator
              </div>
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-primary-container text-on-primary font-bold flex items-center justify-center shrink-0">
                    SK
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-on-surface">Sujan Karmacharya</h4>
                    <p className="text-xs font-mono font-bold text-primary">nudge.np/@sujan_visuals</p>
                    <span className="text-[11px] text-on-surface-variant">High-Altitude Cinematographer</span>
                  </div>
                </div>
                <p className="text-xs text-on-surface italic mb-4 leading-relaxed">
                  &ldquo;I canceled my $15 Linktree Pro subscription the morning Loom launched. Loom&apos;s Himalayan Lokta paper theme matches my visual brand completely, and I can showcase YouTube docs right at the top.&rdquo;
                </p>
              </div>
              <div className="pt-3 border-t border-outline-variant/40 flex items-center justify-between text-xs text-on-surface-variant">
                <span>61.2k monthly clicks</span>
                <span className="text-tertiary font-bold flex items-center gap-1">
                  <PiggyBank size={14} /> Saved $180/yr
                </span>
              </div>
            </div>

            {/* Creator 3 */}
            <div className="bg-surface-container-lowest p-6 rounded-3xl border border-outline-variant/70 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-tertiary/15 text-tertiary font-bold flex items-center justify-center shrink-0">
                    NT
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-on-surface">Nitesh Thapa</h4>
                    <p className="text-xs font-mono font-bold text-primary">nudge.np/@nitesh_code</p>
                    <span className="text-[11px] text-on-surface-variant">Tech Educator &amp; Open Source Dev</span>
                  </div>
                </div>
                <p className="text-xs text-on-surface italic mb-4 leading-relaxed">
                  &ldquo;The OBS Stream Ticker sync is incredible. When I livestream coding workshops on YouTube, my students scan the QR on my Loom link and the donation alert triggers on my stream in real time.&rdquo;
                </p>
              </div>
              <div className="pt-3 border-t border-outline-variant/40 flex items-center justify-between text-xs text-on-surface-variant">
                <span>18.3k monthly clicks</span>
                <span className="text-tertiary font-bold flex items-center gap-1">
                  <Radio size={14} /> Live OBS alerts
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* 7. HIGH-CONVERTING BOTTOM CTA BANNER */}
        <section className="snap-start py-16 bg-gradient-to-br from-primary via-surface-tint to-primary-container text-on-primary relative overflow-hidden">
          <div className="max-w-5xl mx-auto px-space-md md:px-margin-tablet text-center relative z-10">
            <span className="inline-block px-3 py-1 rounded-full bg-black/20 text-xs font-bold uppercase tracking-wider mb-4">
              Start in 30 Seconds
            </span>

            <h2 className="text-display-hero-mobile md:text-display-hero font-display-hero font-bold tracking-tight mb-4 text-white">
              Weave Your Online Presence Today.
            </h2>

            <p className="text-sm md:text-base text-white/90 max-w-2xl mx-auto mb-8 leading-relaxed">
              Join thousands of Nepali creators who turned their bio into an artisanal canvas with native 1-tap Fonepay and eSewa patronage.
            </p>

            <div className="max-w-md mx-auto bg-surface-container-lowest p-2 rounded-2xl border-2 border-white/40 shadow-2xl">
              <form onSubmit={handleClaimSubmit} className="flex flex-col sm:flex-row items-center gap-2">
                <div className="flex items-center flex-1 px-3 py-2 w-full text-left">
                  <span className="text-xs font-mono font-bold text-outline select-none shrink-0">
                    nudge.np/@
                  </span>
                  <input
                    type="text"
                    required
                    value={claimHandle}
                    onChange={(e) =>
                      setClaimHandle(e.target.value.toLowerCase().replace(/[^a-z0-9_-]/g, ""))
                    }
                    placeholder="claimyourname"
                    className="w-full border-0 p-0 pl-1 text-on-surface font-title-md text-xs sm:text-sm focus:ring-0 placeholder:text-outline-variant bg-transparent focus:outline-none"
                  />
                </div>
                <Button variant="primary" size="sm" type="submit" rightIcon={<ArrowUpRight size={14} />}>
                  Claim Free
                </Button>
              </form>
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-6 text-xs text-white/85">
              <span className="flex items-center gap-1">
                <CheckCircle2 size={14} /> Zero Setup Fees
              </span>
              <span className="flex items-center gap-1">
                <CheckCircle2 size={14} /> No Credit Card Required
              </span>
              <span className="flex items-center gap-1">
                <CheckCircle2 size={14} /> Instant Handle Activation
              </span>
            </div>
          </div>
        </section>

        {/* 8. FOOTER WRAPPER */}
        <div className="snap-start">
          <Footer />
        </div>
      </main>
    </>
  );
}