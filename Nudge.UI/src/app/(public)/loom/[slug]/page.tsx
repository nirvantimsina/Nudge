// src/app/(public)/loom/[slug]/page.tsx
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CheckCircle2, Share2, ArrowUpRight, Shield, Spline } from "lucide-react";
import { loomService } from "@/src/features/loom/services/loom.service";
import { LoomIcon } from "@/src/components/loom/public/LoomIcon";
import { LoomNudgeCard } from "@/src/components/loom/public/LoomNudgeCard";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function PublicLoomPage({ params }: PageProps) {
  const { slug } = await params;
  const data = await loomService.getProfileBySlugServer(slug);

  if (!data) {
    notFound();
  }

  const sortedLinks = [...(data.linksJson || [])].sort(
    (a, b) => a.displayOrder - b.displayOrder
  );

  return (
    <div className="min-h-screen bg-surface text-on-surface flex flex-col relative selection:bg-primary-fixed selection:text-primary">
      {/* Lokta Rice Paper Texture Overlay */}
      <div
        aria-hidden="true"
        style={{ pointerEvents: "none" }}
        className="fixed inset-0 -z-10 pointer-events-none select-none opacity-40 mix-blend-multiply bg-[radial-gradient(#8c716a_0.75px,transparent_0.75px)] [background-size:24px_24px]"
      />

      {/* Header */}
      <header className="sticky top-0 z-40 bg-surface/80 backdrop-blur-md border-b border-outline-variant/40">
        <div className="max-w-4xl mx-auto px-3.5 sm:px-4 py-2 sm:py-2.5 flex items-center justify-between">
          <div className="flex items-center gap-2 sm:gap-2.5">
            <Link className="flex items-center gap-2 group focus:outline-none" href="/">
              <div className="relative w-7 h-7 sm:w-7.5 sm:h-7.5 flex items-center justify-center transition-transform duration-200 group-hover:scale-105 active:scale-95">
                <Image
                  src="/logo.svg"
                  alt="Nudge Logo"
                  width={28}
                  height={28}
                  priority
                  className="w-7 h-7 sm:w-7.5 sm:h-7.5 object-contain transition-opacity duration-200 group-hover:opacity-0"
                />
                <Image
                  src="/navbar-animation.svg"
                  alt="Nudge Logo Animated"
                  width={28}
                  height={28}
                  unoptimized
                  className="w-7 h-7 sm:w-7.5 sm:h-7.5 object-contain absolute inset-0 opacity-0 transition-opacity duration-200 group-hover:opacity-100"
                />
              </div>

              <span className="font-headline-md font-bold text-primary text-lg sm:text-xl tracking-tight transition-colors duration-200 group-hover:text-primary/90">
                Nudge
              </span>
            </Link>

            <div className="flex items-center gap-1.5 sm:gap-2 animate-in fade-in duration-200">
              <span className="h-3.5 sm:h-4 w-px bg-outline-variant" />
              <span className="bg-secondary text-on-secondary text-[9px] sm:text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider flex items-center gap-1 shadow-xs">
                <Spline size={10} strokeWidth={2.5} />
                Loom
              </span>
            </div>
          </div>

          <button
            type="button"
            className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container-low hover:bg-surface-container border border-outline-variant/60 text-xs font-medium text-on-surface transition-all cursor-pointer"
          >
            <Share2 className="w-3.5 h-3.5 text-tertiary" />
            <span className="hidden sm:inline">Share</span>
          </button>
        </div>
      </header>

      {/* Main Grid */}
      <main className="relative z-10 grow max-w-4xl mx-auto w-full px-3.5 sm:px-4 py-3 sm:py-6 md:py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5 sm:gap-6 items-start">
          {/* Profile & Compact Nudge Strip */}
          <aside className="lg:col-span-5 flex flex-col gap-2.5 sm:gap-5">
            {/* 1. Profile Bio Card (Compact) */}
            <div className="bg-surface-container-lowest rounded-xl sm:rounded-2xl p-3 sm:p-5 border border-outline-variant/40 shadow-xs sm:shadow-sm">
              <div className="flex flex-row items-center gap-3 lg:flex-col lg:items-start text-left">
                <div className="relative shrink-0">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 rounded-full overflow-hidden border-2 border-white shadow-xs sm:shadow-md ring-2 ring-primary-container/20 relative">
                    <Image
                      src={data.avatar || "/placeholder-avatar.png"}
                      alt={data.name}
                      fill
                      className="object-cover"
                      priority
                    />
                  </div>
                  {data.isVerified && (
                    <span className="absolute -bottom-0.5 -right-0.5 w-4.5 h-4.5 sm:w-5 sm:h-5 bg-tertiary text-white rounded-full flex items-center justify-center border border-white shadow-xs">
                      <CheckCircle2 className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                    </span>
                  )}
                </div>

                <div className="min-w-0 flex-1">
                  <h1 className="text-sm sm:text-base lg:text-xl font-bold text-on-surface truncate">
                    {data.name}
                  </h1>
                  <p className="text-[11px] sm:text-xs font-semibold text-primary truncate">
                    @{data.slug}
                  </p>
                </div>
              </div>

              {data.description && (
                <p className="mt-2 text-[11px] sm:text-xs md:text-sm text-on-surface-variant line-clamp-2 lg:line-clamp-none">
                  {data.description}
                </p>
              )}
            </div>

            {/* 2. Micro Nudge Strip with Popup Trigger */}
            <LoomNudgeCard
              creatorName={data.name}
              creatorSlug={data.slug}
              avatar={data.avatar}
              isVerified={data.isVerified}
              tiers={data.tiers}
            />
          </aside>

          {/* LINKS COLUMN */}
          <section className="lg:col-span-7 flex flex-col gap-2 sm:gap-3">
            <div className="flex items-center justify-between px-1">
              <h2 className="text-[11px] sm:text-xs font-bold text-on-surface-variant uppercase tracking-wider">
                Portals & Links
              </h2>
              <span className="text-[10px] sm:text-[11px] text-on-surface-variant/70">
                {sortedLinks.length} links
              </span>
            </div>

            {/* Links list */}
            <div className="flex flex-col gap-2 sm:gap-2.5">
              {sortedLinks.map((item, idx) => (
                <Link
                  key={`${item.link}-${idx}`}
                  href={item.link || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group bg-surface-container-lowest hover:bg-surface-container-low/70 active:scale-[0.99] rounded-lg sm:rounded-xl p-2.5 sm:p-3.5 md:p-4 border border-outline-variant/40 hover:border-primary-container/50 shadow-xs sm:shadow-sm transition-all flex items-center justify-between"
                >
                  <div className="flex items-center gap-2.5 sm:gap-3.5 min-w-0">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-md sm:rounded-lg bg-surface-container-low text-primary flex items-center justify-center shrink-0 group-hover:bg-primary-container group-hover:text-white transition-colors">
                      <LoomIcon iconId={item.iconId} className="w-4 h-4 sm:w-5 sm:h-5" />
                    </div>
                    <span className="font-semibold text-xs sm:text-sm text-on-surface group-hover:text-primary truncate transition-colors">
                      {item.title || item.link}
                    </span>
                  </div>
                  <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center text-on-surface-variant group-hover:text-primary group-hover:translate-x-0.5 transition-all">
                    <ArrowUpRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </div>
                </Link>
              ))}

              {sortedLinks.length === 0 && (
                <div className="p-6 sm:p-8 text-center bg-surface-container-lowest rounded-xl border border-dashed border-outline-variant/60 text-xs text-on-surface-variant">
                  No links added yet.
                </div>
              )}
            </div>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-auto border-t border-outline-variant/40 bg-surface-container-low/60 py-3 sm:py-4 px-4 text-center">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-1.5 sm:gap-2 text-[10px] sm:text-[11px] text-on-surface-variant">
          <div className="flex items-center gap-1.5">
            <span>Powered by</span>
            <strong className="text-on-surface">Nudge Loom</strong>
          </div>
          <div className="flex items-center gap-1.5 text-tertiary">
            <Shield className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            <span>Fonepay & eSewa Verified</span>
          </div>
        </div>
      </footer>
    </div>
  );
}