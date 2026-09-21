"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Search,
  Radio,
  Bell,
  ExternalLink,
  LogOut,
  ChevronDown,
  User,
} from "lucide-react";

interface StudioHeaderProps {
  user?: {
    name?: string;
    userName?: string;
  } | null;
  onLogout: () => Promise<void>;
}

export function StudioHeader({ user, onLogout }: StudioHeaderProps) {
  const [profileDropdown, setProfileDropdown] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-surface-container-lowest/95 backdrop-blur-md border-b border-outline-variant/40 shadow-xs transition-all duration-200">
      <div className="w-full px-4 md:px-8 lg:px-12 h-16 flex items-center justify-between gap-4">
        {/* Left: Breadcrumbs */}
        <div className="flex items-center gap-2">
          <span className="text-[11px] uppercase tracking-wider text-on-surface-variant font-bold">
            Studio
          </span>
          <span className="text-on-surface-variant/60 text-xs">/</span>
          <span className="text-sm md:text-base font-bold text-on-surface">
            Dashboard Overview
          </span>
        </div>

        {/* Right: Search, Live Pill, Notifications, Public Page, Profile */}
        <div className="flex items-center gap-2 md:gap-3">
          {/* Search Command Bar */}
          <div className="hidden md:flex items-center relative w-64">
            <Search className="absolute left-2.5 text-on-surface-variant/70" size={16} />
            <input
              type="text"
              placeholder="Search patrons, txns..."
              className="w-full bg-surface-container-low border border-outline-variant/60 rounded-full pl-8 pr-8 py-1.5 text-xs text-on-surface placeholder:text-on-surface-variant/60 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary"
            />
            <span className="absolute right-2 px-1.5 py-0.2 rounded border border-outline-variant/40 bg-surface-container-lowest text-[10px] font-mono text-on-surface-variant/80">
              ⌘K
            </span>
          </div>

          {/* OBS Live Connected Badge */}
          <div
            className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-tertiary-fixed/30 border border-tertiary/20 text-tertiary text-xs font-semibold"
            title="Kathmandu cluster connected"
          >
            <span className="w-2 h-2 rounded-full bg-tertiary animate-pulse" />
            <span>Live Connected</span>
          </div>

          {/* Notification Bell */}
          <button
            aria-label="View notifications"
            className="relative p-2 rounded-full text-on-surface-variant hover:bg-surface-container transition-colors"
          >
            <Bell size={18} />
            <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-error text-on-error text-[10px] flex items-center justify-center font-bold">
              3
            </span>
          </button>

          {/* Quick Public Page Shortcut */}
          <Link
            href={`/@${user?.userName || ""}`}
            target="_blank"
            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full border border-outline-variant/60 hover:bg-surface-container text-on-surface text-xs font-semibold transition-colors"
          >
            <span>Public Page</span>
            <ExternalLink size={13} />
          </Link>

          {/* Profile & Logout Dropdown */}
          <div className="relative">
            <button
              onClick={() => setProfileDropdown(!profileDropdown)}
              className="flex items-center gap-1.5 pl-1.5 pr-2 py-1 rounded-full bg-surface-container-low hover:bg-surface-container border border-outline-variant/50 transition-colors"
            >
              <div className="w-7 h-7 rounded-full bg-primary-fixed text-primary font-bold text-xs flex items-center justify-center">
                {user?.name ? user.name.slice(0, 2).toUpperCase() : "CR"}
              </div>
              <ChevronDown size={14} className="text-on-surface-variant" />
            </button>

            {profileDropdown && (
              <div className="absolute right-0 mt-2 w-48 rounded-xl bg-surface-container-lowest border border-outline-variant/60 shadow-xl py-1 z-50">
                <div className="px-3 py-2 border-b border-outline-variant/30">
                  <p className="text-xs font-bold text-on-surface truncate">{user?.name || "Creator"}</p>
                  <p className="text-[10px] text-on-surface-variant font-mono truncate">@{user?.userName || "user"}</p>
                </div>
                <Link
                  href="/dashboard/profile"
                  onClick={() => setProfileDropdown(false)}
                  className="flex items-center gap-2 px-3 py-2 text-xs text-on-surface hover:bg-surface-container"
                >
                  <User size={14} />
                  Profile
                </Link>
                <button
                  onClick={async () => {
                    setProfileDropdown(false);
                    await onLogout();
                  }}
                  className="w-full flex items-center gap-2 px-3 py-2 text-xs text-error font-semibold hover:bg-error-container/40"
                >
                  <LogOut size={14} />
                  Sign Out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}