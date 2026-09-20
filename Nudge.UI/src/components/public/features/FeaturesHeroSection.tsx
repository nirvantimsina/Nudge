import Link from "next/link";
import { Button } from "@/src/components/public/common/Button"
import { Rocket, PlayCircle } from "lucide-react";

export function FeaturesHeroSection() {
  return (
    <section className="relative overflow-hidden pt-space-3xl pb-space-3xl border-b border-outline-variant/50">
      <div className="max-w-7xl mx-auto px-space-md md:px-margin-tablet lg:px-margin-desktop relative z-10">
        <div className="max-w-4xl mx-auto text-center flex flex-col items-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-surface-container-high border border-outline-variant/60 text-primary mb-space-lg shadow-sm">
            <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse" />
            <span className="text-label-sm font-label-sm tracking-wide text-on-surface-variant">
              Creator Toolkit &amp; Features • Built for Himalayan Storytellers &amp; Streamers
            </span>
          </div>

          {/* Heading */}
          <h1 className="text-display-hero-mobile md:text-display-hero font-display-hero text-on-surface tracking-tight mb-space-lg">
            Every tool you need to turn your passion into{" "}
            <span className="text-primary underline decoration-secondary-container decoration-4 underline-offset-8">
              sustainable independence
            </span>
            .
          </h1>

          {/* Subheading */}
          <p className="text-body-lg font-body-lg text-on-surface-variant max-w-2xl mb-space-xl leading-relaxed">
            From real-time OBS live stream cheers and natural Nepali TTS to milestone goals and
            zero-hassle local bank payouts — built specifically for creators living and working in Nepal.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center gap-space-md w-full sm:w-auto">
            <Link href="#claim-handle" className="w-full sm:w-auto">
              <Button variant="primary" size="lg" fullWidth rightIcon={<Rocket size={16} />}>
                Claim Your Creator Page (Free)
              </Button>
            </Link>
            
            <Link href="#stream-overlays" className="w-full sm:w-auto">
              <Button variant="outline" size="lg" fullWidth leftIcon={<PlayCircle size={18} className="text-secondary" />}>
                Watch 2-Min Platform Tour
              </Button>
            </Link>
          </div>

          {/* Stats Bar */}
          <div className="mt-space-2xl grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-8 pt-space-lg border-t border-outline-variant/40 w-full max-w-3xl">
            <div className="flex flex-col items-center">
              <span className="text-currency-display font-currency-display text-primary">रु. ४.२ करोड+</span>
              <span className="text-body-sm font-body-sm text-on-surface-variant">Paid to Nepali Creators</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-currency-display font-currency-display text-on-surface">४,५००+</span>
              <span className="text-body-sm font-body-sm text-on-surface-variant">Active Storytellers</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-currency-display font-currency-display text-on-surface">१-ट्याप</span>
              <span className="text-body-sm font-body-sm text-on-surface-variant">eSewa / Khalti Support</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-currency-display font-currency-display text-tertiary">२४ घण्टा</span>
              <span className="text-body-sm font-body-sm text-on-surface-variant">Nepal Bank Settlement</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}