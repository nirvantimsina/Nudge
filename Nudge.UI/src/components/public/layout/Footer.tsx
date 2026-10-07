"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";

export interface FooterLinkColumn {
  title: string;
  links: { label: string; href: string }[];
}

export interface FooterProps {
  paymentRails?: string[];
  columns?: FooterLinkColumn[];
  instagramUrl?: string;
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
      { label: "Global Diaspora Cards", href: "#how-it-works" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Creator Guidebook", href: "#resources" },
      { label: "OBS Browser Widgets", href: "#streamers" },
      { label: "Brand Assets & Badges", href: "#resources" },
      { label: "Taxes & FAQ", href: "#resources" },
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

const InstagramIcon = ({ size = 18, className = "" }: { size?: number; className?: string }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

export function Footer({
  paymentRails = ["eSewa", "Khalti", "Fonepay", "Stripe", "Visa", "Mastercard"],
  columns = DEFAULT_COLUMNS,
  instagramUrl = "https://instagram.com/nudgenepal",
  copyrightText = "© 2026 Oyester Technologies. Engineering platforms for connected business operations.",
}: FooterProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <footer className="relative w-full h-screen max-h-screen bg-surface-container border-t border-outline-variant/60 flex flex-col justify-between overflow-hidden select-none">
      <div className="w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 py-6 flex flex-col justify-between h-full">
        {/* 1. Top Section: Header brand & payment rail chips */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-outline-variant/30">
          <div className="flex items-center gap-3">
            <Image
              src="/logo.svg"
              alt="Nudge Logo"
              width={34}
              height={34}
              className="w-8 h-8 sm:w-9 sm:h-9 object-contain shrink-0"
            />
            <div className="flex items-center gap-2">
              <span className="text-xl sm:text-2xl font-black tracking-tight text-primary font-headline-sm">
                Nudge
              </span>
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold bg-secondary-fixed text-on-secondary-fixed border border-secondary-container">
                नेपाल
              </span>
            </div>
            <span className="hidden md:inline-block text-outline-variant">|</span>
            <p className="hidden md:block text-xs text-on-surface-variant">
              Nepal&apos;s Creator Patronage &amp; Direct Support Infrastructure
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="text-outline text-[11px]">Rails:</span>
            {paymentRails.map((rail) => (
              <span
                key={rail}
                className="text-on-surface font-semibold bg-surface-container-lowest px-2.5 py-1 rounded-md border border-outline-variant/60 shadow-2xs text-[11px]"
              >
                {rail}
              </span>
            ))}
          </div>
        </div>

        {/* 2. Middle Section: Condensed Links Matrix with Animated Underline */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-2">
          {columns.map((column) => (
            <div key={column.title} className="flex flex-col gap-1.5">
              <span className="text-[11px] font-bold text-on-surface uppercase tracking-wider">
                {column.title}
              </span>
              <ul className="space-y-1">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="group relative inline-block text-xs text-on-surface-variant hover:text-on-surface transition-colors py-0.5"
                    >
                      <span>{link.label}</span>
                      {/* Animated sliding underline */}
                      <span
                        aria-hidden="true"
                        className="absolute bottom-0 left-0 h-[1.5px] w-0 bg-primary transition-all duration-300 ease-out group-hover:w-full"
                      />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* 3. Huge Watermark Centerpiece with Radius Radial Spotlight Gradient */}
        <div
          ref={containerRef}
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="relative w-full flex items-center justify-center overflow-hidden py-1 cursor-default"
        >
          {/* Base Layer: Soft Watermark Gray */}
          <span className="text-[21vw] font-black leading-none tracking-tighter font-headline-sm text-on-surface/[0.06]">
            Nudge
          </span>

          {/* Overlay Layer: Active Circular Gradient (180px radius mask) */}
          <span
            aria-hidden="true"
            className={`absolute inset-0 flex items-center justify-center text-[21vw] font-black leading-none tracking-tighter font-headline-sm pointer-events-none text-transparent bg-clip-text bg-gradient-to-r from-amber-500 via-rose-500 to-indigo-500 transition-opacity duration-300 ${isHovered ? "opacity-100" : "opacity-0"
              }`}
            style={{
              WebkitMaskImage: `radial-gradient(180px circle at ${mousePos.x}px ${mousePos.y}px, black 0%, black 45%, transparent 100%)`,
              maskImage: `radial-gradient(180px circle at ${mousePos.x}px ${mousePos.y}px, black 0%, black 45%, transparent 100%)`,
            }}
          >
            Nudge
          </span>
        </div>

        {/* 4. Bottom Section: Instagram Link on Left & Copyright on Right */}
        <div className="pt-3 border-t border-outline-variant/30 flex flex-row items-center justify-between gap-4">
          <Link
            href={instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-outline-variant/60 bg-surface-container-low hover:bg-surface-container-lowest text-on-surface hover:text-primary transition-all shadow-2xs group"
            aria-label="Follow Nudge on Instagram"
          >
            <InstagramIcon
              size={16}
              className="text-primary group-hover:scale-110 transition-transform duration-200"
            />
            <span className="font-semibold text-xs">Follow on Instagram</span>
          </Link>

          <p className="text-outline text-[11px] sm:text-xs text-right">
            {copyrightText}
          </p>
        </div>
      </div>
    </footer>
  );
}