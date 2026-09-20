import Link from "next/link";
import { Tv, Flag, LayoutDashboard, CheckCircle2, Landmark } from "lucide-react";

export function FeaturesPillarsNav() {
  const pillars = [
    { href: "#stream-overlays", label: "1. OBS Stream Alerts", icon: Tv, iconColor: "text-primary", bgHover: "group-hover:bg-primary-fixed" },
    { href: "#milestone-goals", label: "2. Milestone Goals", icon: Flag, iconColor: "text-secondary", bgHover: "group-hover:bg-secondary-fixed" },
    { href: "#creator-dashboard", label: "3. Studio Dashboard", icon: LayoutDashboard, iconColor: "text-tertiary", bgHover: "group-hover:bg-tertiary-fixed" },
    { href: "#verified-profile", label: "4. Verified Public Page", icon: CheckCircle2, iconColor: "text-primary", bgHover: "group-hover:bg-primary-fixed" },
    { href: "#bank-payouts", label: "5. Nepal Bank Payouts", icon: Landmark, iconColor: "text-tertiary", bgHover: "group-hover:bg-tertiary-fixed", extraCol: true },
  ];

  return (
    <div className="max-w-7xl mx-auto px-space-md md:px-margin-tablet lg:px-margin-desktop pt-space-xl pb-space-lg">
      <div className="text-center text-label-sm font-label-sm text-outline mb-space-sm tracking-wider uppercase">
        Explore Creator Architecture
      </div>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        {pillars.map((p) => {
          const Icon = p.icon;
          return (
            <Link
              key={p.href}
              href={p.href}
              className={`flex items-center gap-2 p-3 rounded-xl bg-surface-container-lowest border border-outline-variant/70 hover:border-primary transition-colors group ${
                p.extraCol ? "col-span-2 md:col-span-1" : ""
              }`}
            >
              <div className={`w-8 h-8 rounded-lg bg-surface-container flex items-center justify-center ${p.iconColor} ${p.bgHover} transition-colors`}>
                <Icon size={18} />
              </div>
              <span className="text-label-sm font-label-sm text-on-surface group-hover:text-primary transition-colors">
                {p.label}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}