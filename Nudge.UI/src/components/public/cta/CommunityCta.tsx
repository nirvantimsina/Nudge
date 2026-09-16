import Link from "next/link";

export interface CommunityCtaProps {
  eyebrowText?: string;
  headline?: string;
  subtext?: string;
  ctaLabel?: string;
  ctaHref?: string;
}

export function CommunityCta({
  eyebrowText = "🌺 Join 4,500+ Nepali Storytellers & Craftsmen",
  headline = "Your community already wants to help. Give them a way to.",
  subtext = "Turn your passion into sustainable craft. Set up your custom page in under a minute with full identity verification protection.",
  ctaLabel = "Start Your Page",
  ctaHref = "/start",
}: CommunityCtaProps) {
  return (
    <section className="py-space-2xl px-space-md md:px-margin-tablet lg:px-margin-desktop max-w-7xl mx-auto">
      <div className="relative rounded-3xl bg-linear-to-br from-primary via-primary-container to-secondary text-on-primary p-8 md:p-14 overflow-hidden shadow-2xl">
        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-on-primary/10 backdrop-blur-md text-xs font-semibold mb-6 border border-on-primary/20">
            <span>{eyebrowText}</span>
          </div>
          <h2 className="text-display-hero-mobile md:text-display-hero font-display-hero text-on-primary leading-tight tracking-tight mb-4">
            {headline}
          </h2>
          <p className="text-body-lg text-primary-fixed mb-8 max-w-xl mx-auto leading-relaxed">{subtext}</p>
          <Link
            href={ctaHref}
            className="inline-flex w-full sm:w-auto px-8 py-4 rounded-full bg-surface-bright hover:bg-surface text-primary font-headline-sm text-headline-sm shadow-lg hover:shadow-xl transition-all duration-150 active:scale-95 items-center justify-center gap-2 font-bold"
          >
            <span>{ctaLabel}</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
