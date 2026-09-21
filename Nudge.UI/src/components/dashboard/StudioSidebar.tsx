"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  HeartHandshake,
  Radio,
  Sparkles,
  Landmark,
  Share2,
  Settings,
  HelpCircle,
  Menu,
} from "lucide-react";

interface StudioSidebarProps {
  user?: {
    name?: string;
    userName?: string;
    avatarUrl?: string;
    isKycVerified?: boolean;
  } | null;
  onVerifyClick?: () => void;
}

export function StudioSidebar({ user, onVerifyClick }: StudioSidebarProps) {
  const pathname = usePathname();

  const studioLinks = [
    {
      name: "Overview",
      href: "/dashboard",
      icon: LayoutDashboard,
      active: pathname === "/dashboard",
    },
    {
      name: "Nudges & Tips",
      href: "/dashboard/nudges",
      icon: HeartHandshake,
      badge: "+64",
      badgeColor: "bg-secondary-fixed text-on-secondary-fixed",
      active: pathname === "/dashboard/nudges",
    },
    {
      name: "Stream Alerts & Overlays",
      href: "/dashboard/overlays",
      icon: Radio,
      active: pathname === "/dashboard/overlays",
    },
    {
      name: "Membership Tiers",
      href: "/dashboard/tiers",
      icon: Sparkles,
      active: pathname === "/dashboard/tiers",
    },
    {
      name: "Payouts & Tax",
      href: "#verification-steps-card",
      icon: Landmark,
      badge: "Hold",
      badgeColor: "bg-error-container text-on-error-container",
      active: pathname === "/dashboard/payouts",
    },
    {
      name: "Nudge Loom (Bio)",
      href: "/dashboard/loom",
      icon: Share2,
      active: pathname === "/dashboard/loom",
    },
  ];

  const preferenceLinks = [
    {
      name: "Settings",
      href: "/dashboard/settings",
      icon: Settings,
      active: pathname === "/dashboard/settings",
    },
    {
      name: "Support & FAQ",
      href: "/support",
      icon: HelpCircle,
      active: pathname === "/support",
    },
  ];

  return (
    <aside className="w-full lg:w-64 shrink-0 bg-surface-container-lowest border-r border-outline-variant/40 flex flex-col justify-between sticky top-0 lg:h-screen z-50 shadow-xs">
      <div className="flex flex-col h-full">
        {/* Top: Brand Logo & Studio Tag */}
        <div className="h-16 px-4 border-b border-outline-variant/30 flex items-center justify-between">
          <Link href="/dashboard" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg overflow-hidden flex items-center justify-center p-1 bg-primary-fixed-dim/40 group-hover:scale-105 transition-transform duration-200">
              <Image
                src="/logo.svg"
                alt="Nudge Logo"
                width={28}
                height={28}
                className="w-full h-full object-contain"
              />
            </div>
            <div className="flex items-baseline gap-1.5">
              <span className="font-headline-md text-[22px] font-bold text-primary tracking-tight">
                Nudge
              </span>
              <span className="text-[10px] text-primary-container bg-primary-fixed px-1.5 py-0.5 rounded font-bold tracking-wider uppercase">
                Studio
              </span>
            </div>
          </Link>
          <button className="lg:hidden p-1.5 rounded-lg text-on-surface-variant hover:bg-surface-container" type="button">
            <Menu size={20} />
          </button>
        </div>

        {/* Categorized Navigation Rail */}
        <div className="flex-1 overflow-y-auto py-4 px-2 space-y-1">
          <div className="px-2.5 pb-1 text-[11px] font-bold uppercase tracking-wider text-on-surface-variant/70">
            Studio Menu
          </div>

          {studioLinks.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center justify-between px-3 py-2 rounded-xl text-sm font-semibold transition-colors ${
                  item.active
                    ? "bg-primary-fixed/40 text-primary font-bold"
                    : "text-on-surface-variant hover:text-primary hover:bg-surface-container"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon size={18} />
                  <span>{item.name}</span>
                </div>
                {item.active && <span className="w-1.5 h-1.5 rounded-full bg-primary" />}
                {item.badge && !item.active && (
                  <span className={`px-1.5 py-0.2 rounded text-[10px] font-bold uppercase ${item.badgeColor}`}>
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}

          <div className="pt-4 px-2.5 pb-1 text-[11px] font-bold uppercase tracking-wider text-on-surface-variant/70">
            Preferences
          </div>

          {preferenceLinks.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm font-semibold transition-colors ${
                  item.active
                    ? "bg-primary-fixed/40 text-primary font-bold"
                    : "text-on-surface-variant hover:text-primary hover:bg-surface-container"
                }`}
              >
                <Icon size={18} />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </div>

        {/* Bottom Creator Identity & Quick KYC Callout */}
        <div className="p-2 border-t border-outline-variant/40 bg-surface-container-low/60 m-2 rounded-xl">
          <div className="flex items-center gap-2.5 p-1.5">
            <div className="relative shrink-0">
              <div className="w-9 h-9 rounded-full bg-primary-fixed text-primary font-bold text-xs flex items-center justify-center ring-2 ring-primary-container/30">
                {user?.name ? user.name.slice(0, 2).toUpperCase() : "CR"}
              </div>
              {!user?.isKycVerified && (
                <span
                  className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-secondary-container border border-surface-container-lowest rounded-full"
                  title="Action required"
                />
              )}
            </div>
            <div className="flex flex-col min-w-0 flex-1">
              <span className="text-xs font-bold text-on-surface truncate leading-tight">
                {user?.name || "Creator"}
              </span>
              <span className="text-[11px] text-on-surface-variant truncate">
                @{user?.userName || "creator"}
              </span>
            </div>
          </div>
          <div className="mt-1 pt-1.5 border-t border-outline-variant/30 flex items-center justify-between text-[11px] px-1.5">
            <span className="text-secondary font-bold flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-secondary-container animate-pulse" />
              {user?.isKycVerified ? "Verified" : "KYC Incomplete"}
            </span>
            <button
              onClick={onVerifyClick}
              className="text-primary font-bold hover:underline"
            >
              Verify →
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
}