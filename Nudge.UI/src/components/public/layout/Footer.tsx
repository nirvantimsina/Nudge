import Image from "next/image";
import Link from "next/link";

export interface FooterLinkColumn {
  title: string;
  links: { label: string; href: string }[];
}

export interface FooterProps {
  logoUrl?: string;
  paymentRails?: string[];
  columns?: FooterLinkColumn[];
  /** e.g. "© 2026 Nudge Nepal Pvt. Ltd. ..." */
  copyrightText?: string;
}

const DEFAULT_COLUMNS: FooterLinkColumn[] = [
  {
    title: "Platform",
    links: [
      { label: "Explore Creators", href: "#creators" },
      { label: "Streamer Alerts & OBS", href: "#streamers" },
      { label: "How It Works", href: "#how-it-works" },
      { label: "Start Creator Page", href: "#claim" },
    ],
  },
  {
    title: "Economics & KYC",
    links: [
      { label: "Pricing & Fees", href: "#pricing" },
      { label: "Open Source Relief", href: "#pricing" },
      { label: "Nagarik App Verification", href: "#how-it-works" },
      { label: "Global Diaspora Cards", href: "#how-it-works" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Creator Guidebook", href: "#resources" },
      { label: "OBS Browser Widgets", href: "#streamers" },
      { label: "Brand Assets & Badges", href: "#resources" },
      { label: "Tax & Dakshina FAQ", href: "#resources" },
    ],
  },
  {
    title: "Legal & Trust",
    links: [
      { label: "Community Guidelines", href: "/guidelines" },
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
      { label: "Contact & Support", href: "/support" },
    ],
  },
];

export function Footer({
  logoUrl,
  paymentRails = ["eSewa", "Khalti", "Fonepay"],
  columns = DEFAULT_COLUMNS,
  copyrightText,
}: FooterProps) {
  return (
    <footer className="bg-surface-container border-t border-outline-variant">
      <div className="w-full px-space-md md:px-margin-tablet lg:px-margin-desktop py-space-xl max-w-7xl mx-auto flex flex-col gap-space-lg">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-8 border-b border-surface-container-high">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <Image src="/logo.svg" alt="Nudge Logo" width={32} height={32} className="w-8 h-8 object-contain" />
              <span className="text-headline-sm font-headline-sm font-bold text-primary">Nudge</span>
              <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded-full text-label-sm font-label-sm bg-secondary-fixed text-on-secondary-fixed border border-secondary-container">
                नेपाल
              </span>
            </div>
            <p className="text-body-sm text-on-surface-variant mt-0.5">
              Nepal&apos;s Creator Patronage &amp; Direct Support Infrastructure
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3 text-xs font-semibold text-outline">
            <span>Verified Payment &amp; Identity Rails:</span>
            {paymentRails.map((rail) => (
              <span
                key={rail}
                className="text-on-surface font-bold bg-surface px-2.5 py-1 rounded border border-outline-variant"
              >
                {rail}
              </span>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-6 text-body-sm border-b border-surface-container-high">
          {columns.map((column) => (
            <div key={column.title} className="flex flex-col gap-2.5">
              <span className="text-label-md font-label-md font-bold text-on-surface uppercase tracking-wider">
                {column.title}
              </span>
              {column.links.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-on-surface-variant hover:text-primary transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          ))}
        </div>

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-between text-body-sm text-outline gap-2">
          <p>"© 2026 Nudge Nepal Pvt. Ltd. Empowering Himalayan storytellers & makers. Built with love in Kathmandu."</p>
          <div className="flex items-center gap-1 text-xs">
            <span>Namaste</span>
            <span>🙏</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
