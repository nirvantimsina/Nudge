// src/components/studio/StudioSidebar.tsx
"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCreator } from "@/src/context/CreatorContext";
import {
  LayoutDashboard,
  Coffee,
  Bell,
  Award,
  ShieldCheck,
  Landmark,
  Scale,
  Sparkles,
} from "lucide-react";

export function StudioSidebar() {
  const pathname = usePathname();
  const { summary, isLoading } = useCreator();

  const displayName = summary?.fullName || summary?.username || "Creator";
  const avatarUrl = summary?.avatarPhotoUrl || "/images/avatar-placeholder.png";
  const unreadCount = summary?.unreadNotificationsCount ?? 0;
  const currentStep = summary?.currentKycStep ?? 1;

  const navItems = [
    {
      label: "Overview",
      href: "/dashboard",
      icon: LayoutDashboard,
      isActive: pathname === "/dashboard" || pathname === "/",
    },
    {
      label: "Nudges & Chiya",
      href: "/nudges",
      icon: Coffee,
      isActive: pathname.startsWith("/nudges"),
    },
    {
      label: "Alerts",
      href: "/alerts",
      icon: Bell,
      badge: unreadCount > 0 ? unreadCount : undefined,
      isActive: pathname.startsWith("/alerts"),
    },
    {
      label: "Tiers & Perks",
      href: "/perks",
      icon: Award,
      isActive: pathname.startsWith("/perks"),
    },
    {
      label: "KYC Verification",
      href: `/kyc/step-${currentStep}`,
      icon: ShieldCheck,
      stepBadge: `Step ${currentStep}`,
      isActive: pathname.startsWith("/kyc"),
    },
    {
      label: "Payouts & Bank",
      href: "/payouts",
      icon: Landmark,
      statusBadge: summary?.kycStatus === "verified" ? "Ready" : "Hold",
      isActive: pathname.startsWith("/payouts"),
    },
  ];

  return (
    <aside className="w-64 border-r border-outline-variant/30 bg-surface-container-lowest/80 backdrop-blur-md flex flex-col justify-between p-4 h-full select-none">
      <div className="space-y-6">
        {/* Creator Snapshot Card */}
        <div className="p-3.5 rounded-2xl bg-surface-container-low/70 border border-outline-variant/40 shadow-xs hover:border-primary/40 transition-all">
          <div className="flex items-center gap-3">
            {isLoading ? (
              <div className="w-11 h-11 rounded-full bg-surface-container-high animate-pulse shrink-0" />
            ) : (
              <img
                src={avatarUrl}
                alt={displayName}
                className="w-11 h-11 rounded-full object-cover border-2 border-primary-container/20 shadow-xs shrink-0"
              />
            )}
            <div className="overflow-hidden min-w-0 flex-1">
              <h3 className="text-xs font-bold text-on-surface truncate leading-snug">
                {displayName}
              </h3>
              <p className="text-[11px] text-on-surface-variant truncate font-medium">
                @{summary?.username || "creator"}
              </p>
            </div>
          </div>

          <div className="mt-3 pt-2.5 border-t border-outline-variant/30 flex items-center justify-between text-[11px]">
            <span className="text-on-surface-variant font-medium">Payout Status</span>
            <span
              className={`font-semibold flex items-center gap-1.5 ${
                summary?.kycStatus === "verified"
                  ? "text-tertiary"
                  : "text-secondary"
              }`}
            >
              <span
                className={`w-1.5 h-1.5 rounded-full ${
                  summary?.kycStatus === "verified"
                    ? "bg-tertiary"
                    : "bg-secondary animate-pulse"
                }`}
              />
              {summary?.kycStatus === "verified" ? "Verified" : "Verification Hold"}
            </span>
          </div>
        </div>

        {/* Navigation Section */}
        <div className="space-y-1.5">
          <div className="px-2.5 text-[10px] font-bold uppercase tracking-wider text-outline">
            Studio Menu
          </div>
          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`group flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all duration-150 ${
                    item.isActive
                      ? "bg-primary text-on-primary shadow-sm shadow-primary/20"
                      : "text-on-surface-variant hover:text-on-surface hover:bg-surface-container"
                  }`}
                >
                  <Icon
                    size={17}
                    className={`transition-transform duration-150 group-hover:scale-105 shrink-0 ${
                      item.isActive ? "text-on-primary" : "text-outline"
                    }`}
                  />
                  <span className="truncate">{item.label}</span>

                  {/* Notification Badge */}
                  {item.badge !== undefined && (
                    <span
                      className={`ml-auto text-[10px] font-bold px-1.5 py-0.5 rounded-full ${
                        item.isActive
                          ? "bg-white text-primary"
                          : "bg-primary text-on-primary"
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}

                  {/* KYC Step Counter */}
                  {item.stepBadge && (
                    <span
                      className={`ml-auto text-[10px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wider ${
                        item.isActive
                          ? "bg-white/20 text-on-primary"
                          : "bg-primary-fixed text-on-primary-fixed"
                      }`}
                    >
                      {item.stepBadge}
                    </span>
                  )}

                  {/* Payout Status Badge */}
                  {item.statusBadge && (
                    <span
                      className={`ml-auto text-[10px] font-semibold px-2 py-0.5 rounded-md ${
                        item.isActive
                          ? "bg-white/20 text-on-primary"
                          : "bg-surface-container-high text-on-surface-variant"
                      }`}
                    >
                      {item.statusBadge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Compliance & Trust Card */}
      <div className="mt-auto pt-4 border-t border-outline-variant/30">
        <div className="p-3 rounded-2xl bg-surface-container-low/50 border border-outline-variant/30 text-center space-y-1.5">
          <div className="flex justify-center items-center gap-1.5 text-tertiary">
            <Scale size={15} />
            <span className="text-[10px] font-bold tracking-wider uppercase">
              NRB & IRD Compliant
            </span>
          </div>
          <p className="text-[11px] text-on-surface-variant leading-relaxed">
            Meets Nepal Rastra Bank payment regulations & TDS requirements.
          </p>
        </div>
      </div>
    </aside>
  );
}