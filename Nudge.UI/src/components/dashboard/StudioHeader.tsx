// src/components/studio/StudioHeader.tsx
"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useCreator } from "@/src/context/CreatorContext";
import { useAuth } from "@/src/features/auth/hooks/use.auth.hook";
import {
  ChevronRight,
  HelpCircle,
  ShieldCheck,
  User,
  LogOut,
  ChevronDown,
  Sparkles,
} from "lucide-react";

export function StudioHeader() {
  const router = useRouter();
  const pathname = usePathname();
  const { summary, isLoading } = useCreator();
  const { logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const displayName = summary?.fullName || summary?.username || "Creator";
  const handle = summary?.username ? `@${summary.username}` : "";
  const avatarUrl = summary?.avatarPhotoUrl || "/images/avatar-placeholder.png";
  const currentStep = summary?.currentKycStep ?? 1;

  // Dynamic breadcrumb generation
  const getBreadcrumb = () => {
    if (pathname.startsWith("/kyc")) {
      const stepMatch = pathname.match(/step-(\d+)/);
      const stepNum = stepMatch ? stepMatch[1] : currentStep;
      const stepTitles: Record<string, string> = {
        "1": "Personal & Family",
        "2": "Identity & Legal Proofs",
        "3": "Residential Address",
        "4": "Channel Verification",
      };
      return {
        section: "KYC Verification",
        page: stepTitles[String(stepNum)] || `Step ${stepNum}`,
      };
    }
    if (pathname.startsWith("/nudges")) return { section: "Monetization", page: "Nudges & Chiya" };
    if (pathname.startsWith("/alerts")) return { section: "Workspace", page: "Alerts & Notifications" };
    if (pathname.startsWith("/perks")) return { section: "Membership", page: "Tiers & Perks" };
    if (pathname.startsWith("/payouts")) return { section: "Finance", page: "Payouts & Bank" };
    return { section: "Studio", page: "Overview" };
  };

  const breadcrumb = getBreadcrumb();

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    await logout();
    router.replace("/auth");
  };

  return (
    <header className="sticky top-0 z-40 bg-surface-container-lowest/85 backdrop-blur-md border-b border-outline-variant/30">
      <div className="px-4 md:px-8 h-16 flex items-center justify-between">
        
        {/* Left Brand + Dynamic Breadcrumb */}
        <div className="flex items-center gap-4">
          <Link href="/dashboard" className="flex items-center gap-2">
            <span className="font-headline-sm text-xl font-bold text-primary tracking-tight">
              Nudge
            </span>
            <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-primary-fixed text-on-primary-fixed uppercase tracking-wider">
              Studio
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-2 text-on-surface-variant text-xs pl-4 border-l border-outline-variant/40">
            <span className="hover:text-on-surface transition-colors cursor-default">
              {breadcrumb.section}
            </span>
            <ChevronRight size={14} className="text-outline" />
            <span className="text-primary font-semibold">
              {breadcrumb.page}
            </span>
          </div>
        </div>

        {/* Right Status + Profile Utilities */}
        <div className="flex items-center gap-3">
          
          {/* KYC Status Pill */}
          <Link
            href={`/kyc/step-${currentStep}`}
            className="hidden sm:flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-secondary-fixed/40 hover:bg-secondary-fixed/60 text-on-secondary-fixed text-xs font-semibold border border-secondary-container/40 transition-colors"
          >
            <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
            <span>
              {summary?.kycStatus === "verified"
                ? "KYC Verified"
                : `KYC In Progress • Step ${currentStep}/4`}
            </span>
          </Link>

          {/* Help Desk Link */}
          <Link
            href="/help"
            className="p-2 rounded-xl text-on-surface-variant hover:text-primary hover:bg-surface-container transition-colors"
            title="Help Desk & NRB Regulations"
          >
            <HelpCircle size={18} />
          </Link>

          {/* User Profile Dropdown */}
          <div ref={menuRef} className="relative pl-2 border-l border-outline-variant/40">
            <button
              type="button"
              onClick={() => setMenuOpen(!menuOpen)}
              className="flex items-center gap-2 p-1 rounded-xl hover:bg-surface-container transition-colors text-left outline-none"
            >
              {isLoading ? (
                <div className="w-8 h-8 rounded-full bg-surface-container-high animate-pulse" />
              ) : (
                <img
                  src={avatarUrl}
                  alt={displayName}
                  className="w-8 h-8 rounded-full border border-outline-variant/80 object-cover shadow-2xs"
                />
              )}
              <div className="hidden md:block text-left leading-tight">
                <div className="text-xs font-bold text-on-surface truncate max-w-[120px]">
                  {displayName}
                </div>
                <div className="text-[10px] text-on-surface-variant truncate max-w-[120px]">
                  {handle}
                </div>
              </div>
              <ChevronDown
                size={14}
                className={`hidden md:block text-outline transition-transform duration-200 ${
                  menuOpen ? "rotate-180 text-primary" : ""
                }`}
              />
            </button>

            {/* Profile Dropdown Menu */}
            {menuOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-surface-container-lowest border border-outline-variant/50 rounded-2xl shadow-xl py-2 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                <div className="px-4 py-2 border-b border-outline-variant/30">
                  <p className="text-xs font-bold text-on-surface truncate">{displayName}</p>
                  <p className="text-[11px] text-on-surface-variant truncate">{summary?.email || handle}</p>
                </div>

                <div className="py-1">
                  <Link
                    href={`/kyc/step-${currentStep}`}
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center gap-2.5 px-4 py-2 text-xs font-medium text-on-surface hover:bg-surface-container transition-colors"
                  >
                    <ShieldCheck size={16} className="text-primary" />
                    <span>KYC Verification ({summary?.kycCompletionPercentage ?? 0}%)</span>
                  </Link>
                  <Link
                    href="/dashboard"
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center gap-2.5 px-4 py-2 text-xs font-medium text-on-surface hover:bg-surface-container transition-colors"
                  >
                    <User size={16} className="text-outline" />
                    <span>Dashboard Profile</span>
                  </Link>
                </div>

                <div className="pt-1 border-t border-outline-variant/30">
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2.5 px-4 py-2 text-xs font-medium text-error hover:bg-error-container/20 transition-colors text-left"
                  >
                    <LogOut size={16} />
                    <span>Sign Out</span>
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