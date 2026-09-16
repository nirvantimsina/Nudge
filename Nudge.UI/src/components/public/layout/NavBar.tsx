"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Monitor, Spline, ChevronDown, ArrowRight, ShieldCheck } from "lucide-react";
import { Button } from "@/src/components/public/common/Button";

/* -------------------------------------------------------------------------- */
/*                          MODULAR PRODUCTS CONFIG                           */
/* -------------------------------------------------------------------------- */

export interface ProductItem {
  name: string;
  badge?: string;
  description: string;
  href: string;
  icon: React.ElementType;
  iconColor: string;
  bgLight: string;
  borderColor?: string;
}

const NUDGE_PRODUCTS: ProductItem[] = [
  {
    name: "Nudge Studio",
    badge: "Flagship",
    description: "Our flagship product for managing your digital presence.",
    href: "/studio",
    icon: Monitor,
    iconColor: "text-primary",
    bgLight: "bg-primary/10",
    borderColor: "hover:border-primary/30",
  },
  {
    name: "Nudge Loom",
    badge: "New",
    description: "The link-in-bio to guide your crowd.",
    href: "/loom",
    icon: Spline,
    iconColor: "text-secondary",
    bgLight: "bg-secondary-fixed/50",
    borderColor: "hover:border-secondary/30",
  },
];

/* -------------------------------------------------------------------------- */
/*                              NAVBAR COMPONENT                              */
/* -------------------------------------------------------------------------- */

export function NavBar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  // Dynamic Product Context Detection
  const isStudio = pathname.startsWith("/studio");
  const isLoom = pathname.startsWith("/loom");

  return (
    <header className="bg-surface sticky top-0 z-50 border-b border-outline-variant shadow-sm backdrop-blur-md bg-opacity-95">
      <div className="flex justify-between items-center w-full px-space-md md:px-margin-tablet lg:px-margin-desktop max-w-7xl mx-auto h-16">
        
        {/* Brand identity + Dynamic Route Product Pill */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          <Link className="flex items-center gap-2 group" href="/">
            <Image
              src="/logo.svg"
              alt="Nudge Logo"
              width={30}
              height={30}
              className="w-7.5 h-7.5 object-contain group-hover:rotate-6 transition-transform duration-200"
            />
            <span className="font-headline-md font-bold text-primary text-xl tracking-tight">
              Nudge
            </span>
          </Link>

          {/* Conditional Product Badge */}
          {isStudio ? (
            <div className="flex items-center gap-2 animate-in fade-in duration-200">
              <span className="h-4 w-px bg-outline-variant" />
              <span className="bg-primary text-on-primary text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider flex items-center gap-1 shadow-xs">
                <Monitor size={11} strokeWidth={2.5} />
                Studio
              </span>
            </div>
          ) : isLoom ? (
            <div className="flex items-center gap-2 animate-in fade-in duration-200">
              <span className="h-4 w-px bg-outline-variant" />
              <span className="bg-secondary text-on-secondary text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider flex items-center gap-1 shadow-xs">
                <Spline size={11} strokeWidth={2.5} />
                Loom
              </span>
            </div>
          ) : (
            <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-secondary-fixed text-on-secondary-fixed border border-secondary-container">
              नेपाल
            </span>
          )}
        </div>

        {/* Center Nav */}
        <nav className="hidden md:flex items-center gap-6">
          <Link
            href="/"
            className={`font-label-md text-xs sm:text-sm py-1 transition-colors ${
              pathname === "/" ? "text-primary font-bold" : "text-on-surface-variant hover:text-on-surface"
            }`}
          >
            Home
          </Link>

          {/* Interactive Products Dropdown */}
          <div
            className="relative py-4"
            onMouseEnter={() => setIsOpen(true)}
            onMouseLeave={() => setIsOpen(false)}
          >
            <button
              type="button"
              className={`flex items-center gap-1 font-label-md text-xs sm:text-sm transition-colors cursor-pointer ${
                isOpen || isStudio || isLoom
                  ? "text-primary font-bold"
                  : "text-on-surface-variant hover:text-on-surface"
              }`}
            >
              <span>Products</span>
              <ChevronDown
                size={14}
                className={`transition-transform duration-200 ${isOpen ? "rotate-180 text-primary" : ""}`}
              />
            </button>

            {/* Popover */}
            {isOpen && (
              <div className="absolute top-full -left-12 w-[390px] bg-surface-container-lowest border border-outline-variant/80 rounded-2xl shadow-xl p-3 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                <div className="text-[10px] font-mono uppercase tracking-wider text-outline px-2 py-1 font-semibold">
                  Nudge Ecosystem
                </div>

                <div className="space-y-1 mt-1">
                  {NUDGE_PRODUCTS.map((product) => {
                    const Icon = product.icon;
                    const isCurrent = pathname.startsWith(product.href);

                    return (
                      <Link
                        key={product.name}
                        href={product.href}
                        onClick={() => setIsOpen(false)}
                        className={`flex items-start gap-3 p-3 rounded-xl transition-all group border ${
                          isCurrent
                            ? "bg-surface-container-low border-primary/30"
                            : "hover:bg-surface-container-low border-transparent " +
                              (product.borderColor || "hover:border-primary/20")
                        }`}
                      >
                        <div
                          className={`w-9 h-9 rounded-xl ${product.bgLight} ${product.iconColor} flex items-center justify-center shrink-0 mt-0.5 group-hover:scale-105 transition-transform`}
                        >
                          <Icon size={18} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-2">
                            <span className="text-xs font-bold text-on-surface group-hover:text-primary transition-colors truncate">
                              {product.name}
                            </span>
                            {product.badge && (
                              <span className="text-[9px] font-bold px-1.5 py-0.2 rounded-full bg-primary-fixed text-on-primary-fixed shrink-0">
                                {product.badge}
                              </span>
                            )}
                          </div>
                          <p className="text-[11px] text-on-surface-variant mt-0.5 leading-snug">
                            {product.description}
                          </p>
                        </div>
                      </Link>
                    );
                  })}
                </div>

                {/* Sub-footer */}
                <div className="mt-2 pt-2 border-t border-outline-variant/50 px-2 flex items-center justify-between text-[10px] text-outline">
                  <span className="flex items-center gap-1 text-on-surface-variant">
                    <ShieldCheck size={12} className="text-tertiary" />
                    Built for Nepal creators
                  </span>
                  <Link
                    href="/features"
                    onClick={() => setIsOpen(false)}
                    className="text-primary font-bold hover:underline flex items-center gap-0.5"
                  >
                    <span>All features</span>
                    <ArrowRight size={10} />
                  </Link>
                </div>
              </div>
            )}
          </div>

          <Link
            href="/features"
            className={`font-label-md text-xs sm:text-sm py-1 transition-colors ${
              pathname === "/features" ? "text-primary font-bold" : "text-on-surface-variant hover:text-on-surface"
            }`}
          >
            Features
          </Link>

          <Link
            href="/how-it-works"
            className={`font-label-md text-xs sm:text-sm py-1 transition-colors ${
              pathname === "/how-it-works" ? "text-primary font-bold" : "text-on-surface-variant hover:text-on-surface"
            }`}
          >
            How It Works
          </Link>
        </nav>

        {/* Action Cluster */}
        <div className="flex items-center gap-2.5">
          <Link
            href="/login"
            className="hidden sm:inline-block px-3 py-1.5 rounded-lg text-xs sm:text-sm font-semibold text-on-surface hover:text-primary transition-colors"
          >
            Log In
          </Link>
          <Link href="/start">
            <Button variant="primary" size="sm">
              Start Page
            </Button>
          </Link>
        </div>

      </div>
    </header>
  );
}