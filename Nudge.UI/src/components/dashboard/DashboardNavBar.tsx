"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { 
  LayoutDashboard, 
  HandCoins, 
  Cast, 
  Layers, 
  Landmark, 
  Settings, 
  Radio, 
  Bell, 
  ExternalLink, 
  LogOut, 
  User, 
  CheckCircle2, 
  Copy, 
  Check,
  ChevronDown
} from "lucide-react";

interface DashboardNavBarProps {
  user?: {
    name?: string;
    userName?: string;
    avatarUrl?: string;
    isKycVerified?: boolean;
    roleId?: number;
  } | null;
  onLogout: () => Promise<void>;
}

export function DashboardNavBar({ user, onLogout }: DashboardNavBarProps) {
  const router = useRouter();
  const [copied, setCopied] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const publicUrl = `https://nudge.np/@${user?.userName || "creator"}`;

  const copyPublicUrl = () => {
    navigator.clipboard.writeText(publicUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <header className="bg-surface border-b border-outline-variant/60 shadow-xs sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Brand & Main Navigation */}
        <div className="flex items-center gap-6">
          <Link href="/dashboard" className="flex items-center gap-2 group">
            <div className="relative w-8 h-8 flex items-center justify-center">
              <Image
                src="/logo.svg"
                alt="Nudge Logo"
                width={32}
                height={32}
                className="w-8 h-8 object-contain group-hover:scale-105 transition-transform"
              />
            </div>
            <span className="font-headline-md font-bold text-primary text-xl tracking-tight">Nudge</span>
            <span className="text-[10px] font-bold uppercase tracking-wider bg-primary-fixed text-primary px-1.5 py-0.5 rounded ml-1">
              Studio
            </span>
          </Link>

          {/* Primary Top Navigation Tabs */}
          <nav className="hidden md:flex items-center gap-5">
            <Link
              href="/dashboard"
              className="border-b-2 border-primary text-primary font-semibold text-[14px] pb-1 flex items-center gap-1.5"
            >
              <LayoutDashboard size={17} />
              Overview
            </Link>
            <Link
              href="/dashboard/nudges"
              className="text-on-surface-variant font-medium text-[14px] hover:text-primary transition-colors pb-1 flex items-center gap-1.5"
            >
              <HandCoins size={17} />
              Nudges
            </Link>
            <Link
              href="/dashboard/overlays"
              className="text-on-surface-variant font-medium text-[14px] hover:text-primary transition-colors pb-1 flex items-center gap-1.5"
            >
              <Cast size={17} />
              Stream Overlays
            </Link>
            <Link
              href="/dashboard/tiers"
              className="text-on-surface-variant font-medium text-[14px] hover:text-primary transition-colors pb-1 flex items-center gap-1.5"
            >
              <Layers size={17} />
              Tiers Management
            </Link>
            <Link
              href="/dashboard/payouts"
              className="text-on-surface-variant font-medium text-[14px] hover:text-primary transition-colors pb-1 flex items-center gap-1.5"
            >
              <Landmark size={17} />
              Payouts &amp; Tax
            </Link>
          </nav>
        </div>

        {/* Right Utility: Public Link, OBS Status, Profile Dropdown */}
        <div className="flex items-center gap-3">
          {/* OBS Live Indicator */}
          <div className="hidden lg:flex items-center gap-1.5 px-3 py-1 bg-tertiary-fixed/40 text-tertiary border border-tertiary/20 rounded-full text-xs font-semibold">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-tertiary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-tertiary"></span>
            </span>
            <span>OBS Connected</span>
          </div>

          {/* Quick Public Page Button */}
          <Link
            href={`/@${user?.userName || ""}`}
            target="_blank"
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-outline-variant/60 hover:bg-surface-container text-on-surface text-xs font-semibold transition-colors"
          >
            <span>Public Page</span>
            <ExternalLink size={13} />
          </Link>

          {/* Notifications */}
          <button
            aria-label="View notifications"
            className="relative p-2 rounded-full text-on-surface-variant hover:bg-surface-container transition-colors"
          >
            <Bell size={18} />
            <span className="absolute top-1 right-1 w-3.5 h-3.5 rounded-full bg-error text-on-error text-[9px] flex items-center justify-center font-bold">
              3
            </span>
          </button>

          {/* User Profile Pill & Dropdown */}
          <div className="relative">
            <button
              onClick={() => setProfileOpen(!profileOpen)}
              className="flex items-center gap-2 bg-surface-container-low border border-outline-variant/60 rounded-full pl-1.5 pr-2.5 py-1 hover:bg-surface-container transition-all"
            >
              <div className="w-7 h-7 rounded-full bg-primary-fixed text-primary font-bold text-xs flex items-center justify-center ring-1 ring-primary/20">
                {user?.name ? user.name.slice(0, 2).toUpperCase() : "CR"}
              </div>
              <div className="hidden sm:flex flex-col text-left">
                <span className="text-xs font-semibold text-on-surface leading-tight max-w-[100px] truncate">
                  {user?.name || user?.userName || "Creator"}
                </span>
                <span className="text-[10px] text-tertiary flex items-center gap-0.5">
                  <CheckCircle2 size={10} />
                  {user?.isKycVerified ? "Verified" : "KYC Pending"}
                </span>
              </div>
              <ChevronDown size={14} className="text-on-surface-variant" />
            </button>

            {/* Profile Dropdown Menu */}
            {profileOpen && (
              <div className="absolute right-0 mt-2 w-56 rounded-2xl bg-surface-container-lowest border border-outline-variant/60 shadow-xl py-2 z-50">
                <div className="px-3.5 py-2 border-b border-outline-variant/30">
                  <p className="text-xs font-bold text-on-surface truncate">{user?.name || "Creator Studio"}</p>
                  <p className="text-[11px] text-on-surface-variant font-mono truncate">@{user?.userName || "user"}</p>
                  <button
                    onClick={copyPublicUrl}
                    className="mt-1.5 text-[11px] text-primary flex items-center gap-1 font-semibold hover:underline"
                  >
                    {copied ? <Check size={12} className="text-tertiary" /> : <Copy size={12} />}
                    <span>{copied ? "Link Copied!" : "Copy Public Link"}</span>
                  </button>
                </div>

                <div className="py-1">
                  <Link
                    href="/dashboard/settings"
                    onClick={() => setProfileOpen(false)}
                    className="flex items-center gap-2.5 px-3.5 py-2 text-xs text-on-surface hover:bg-surface-container transition-colors"
                  >
                    <Settings size={15} className="text-on-surface-variant" />
                    Settings &amp; Preferences
                  </Link>
                  <Link
                    href="/dashboard/profile"
                    onClick={() => setProfileOpen(false)}
                    className="flex items-center gap-2.5 px-3.5 py-2 text-xs text-on-surface hover:bg-surface-container transition-colors"
                  >
                    <User size={15} className="text-on-surface-variant" />
                    Edit Creator Profile
                  </Link>
                </div>

                <div className="pt-1 border-t border-outline-variant/30">
                  <button
                    onClick={async () => {
                      setProfileOpen(false);
                      await onLogout();
                    }}
                    className="w-full flex items-center gap-2.5 px-3.5 py-2 text-xs text-error font-semibold hover:bg-error-container/40 transition-colors"
                  >
                    <LogOut size={15} />
                    Sign Out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

