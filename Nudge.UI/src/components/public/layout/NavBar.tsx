import Image from "next/image";
import Link from "next/link";

export interface NavLink {
  label: string;
  href: string;
}

export interface NavBarProps {
  logoUrl: string;
  /** Path the logo/site name link to, defaults to "/" */
  homeHref?: string;
  links?: NavLink[];
  /** Href for the "Log In" link, hidden if omitted */
  loginHref?: string;
  /** Href for the primary "Start Page" CTA */
  startPageHref?: string;
}

const DEFAULT_LINKS: NavLink[] = [
  { label: "Explore Creators", href: "#creators" },
  { label: "Features", href: "#streamers" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Resources", href: "#resources" },
];

export function NavBar({
  logoUrl,
  homeHref = "/",
  links = DEFAULT_LINKS,
  loginHref = "/login",
  startPageHref = "/start",
}: NavBarProps) {
  return (
    <header className="bg-surface sticky top-0 z-50 border-b border-outline-variant shadow-sm backdrop-blur-md bg-opacity-95">
      <div className="flex justify-between items-center w-full px-space-md md:px-margin-tablet lg:px-margin-desktop max-w-7xl mx-auto h-16">
        <div className="flex items-center gap-space-sm">
          <Link className="flex items-center gap-2 group" href={homeHref}>
            <Image
              src="/logo.svg"
              alt="Nudge Logo"
              width={32}
              height={32}
              className="w-8 h-8 object-contain group-hover:rotate-6 transition-transform duration-200"
            />
            <span className="text-headline-md font-headline-md font-bold text-primary tracking-tight">
              Nudge
            </span>
          </Link>
          <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-full text-label-sm font-label-sm bg-secondary-fixed text-on-secondary-fixed border border-secondary-container">
            नेपाल
          </span>
        </div>

        <nav className="hidden lg:flex items-center gap-space-lg">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-on-surface-variant font-label-md text-label-md hover:text-on-surface pb-1"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-space-xs sm:gap-space-sm">
          {loginHref && (
            <Link
              href={loginHref}
              className="hidden sm:inline-block px-3 py-1.5 rounded-lg text-label-md font-label-md text-on-surface hover:text-primary transition-colors"
            >
              Log In
            </Link>
          )}
          <Link
            href={startPageHref}
            className="bg-primary-container text-on-primary font-label-md text-label-md px-4 py-2 rounded-full shadow-sm hover:bg-primary transition-all duration-150 active:scale-95 inline-flex items-center gap-1.5"
          >
            <span>Start Page</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
