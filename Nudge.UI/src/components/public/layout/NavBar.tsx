"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Monitor,
  Spline,
  ChevronDown,
  ArrowRight,
  ShieldCheck,
  LogOut,
  Sparkles,
  Menu,
  X,
} from "lucide-react";
import { Button } from "@/src/components/public/common/Button";
import { useAuth } from "@/src/features/auth/hooks/useAuth";

export interface ProductItem {
  name: string;
  badge?: string;
  description: string;
  href: string;
  icon: React.ElementType;
  iconColor: string;
  bgLight: string;
}

const NUDGE_PRODUCTS: ProductItem[] = [
  {
    name: "Nudge Studio",
    badge: "Flagship",
    description: "Our flagship product for monetizing your digital influence.",
    href: "/studio",
    icon: Monitor,
    iconColor: "text-primary",
    bgLight: "bg-primary/10",
  },
  {
    name: "Nudge Loom",
    badge: "New",
    description: "The link-in-bio to guide your crowd.",
    href: "/loom",
    icon: Spline,
    iconColor: "text-secondary",
    bgLight: "bg-secondary-fixed/50",
  },
];

const NAV_LINKS = [
  { name: "Home", href: "/" },
  { name: "Features", href: "/features" },
  { name: "How It Works", href: "/how-it-works" },
];

export function NavBar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false); // Desktop products dropdown
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false); // Mobile drawer
  const [isVisible, setIsVisible] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const [hoveredNav, setHoveredNav] = useState<string | null>(null);
  const lastScrollY = useRef(0);
  const { user, isAuthenticated, logout } = useAuth();

  const isStudio = pathname.startsWith("/studio");
  const isLoom = pathname.startsWith("/loom");

  // Close menus on page navigation
  useEffect(() => {
    setIsOpen(false);
    setMobileMenuOpen(false);
  }, [pathname]);

  // Scroll visibility handler
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const delta = currentScrollY - lastScrollY.current;

      setScrolled(currentScrollY > 15);

      if (currentScrollY <= 60) {
        setIsVisible(true);
      } else if (!isOpen && !mobileMenuOpen) {
        if (delta > 8) {
          setIsVisible(false);
        } else if (delta < -8) {
          setIsVisible(true);
        }
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isOpen, mobileMenuOpen]);

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ease-in-out ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      } ${
        scrolled || mobileMenuOpen
          ? "border-b border-outline-variant/40 bg-surface/90 backdrop-blur-xl shadow-xs"
          : "border-b border-outline-variant/20 bg-surface/60 backdrop-blur-md"
      }`}
    >
      <div className="flex justify-between items-center w-full px-4 md:px-8 max-w-7xl mx-auto h-16">
        {/* Brand Identity */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          <Link className="flex items-center gap-2 group focus:outline-none" href="/">
            <div className="relative w-7.5 h-7.5 flex items-center justify-center transition-transform duration-200 group-hover:scale-105 active:scale-95">
              <Image
                src="/logo.svg"
                alt="Nudge Logo"
                width={30}
                height={30}
                priority
                className="w-7.5 h-7.5 object-contain transition-opacity duration-200 group-hover:opacity-0"
              />
              <Image
                src="/navbar-animation.svg"
                alt="Nudge Logo Animated"
                width={30}
                height={30}
                unoptimized
                className="w-7.5 h-7.5 object-contain absolute inset-0 opacity-0 transition-opacity duration-200 group-hover:opacity-100"
              />
            </div>
            <span className="font-headline-md font-bold text-primary text-xl tracking-tight transition-colors duration-200 group-hover:text-primary/90">
              Nudge
            </span>
          </Link>

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
            <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-secondary-fixed/80 backdrop-blur-xs text-on-secondary-fixed border border-secondary-container select-none">
              नेपाल
            </span>
          )}
        </div>

        {/* Desktop Nav Items */}
        <nav
          className="hidden md:flex items-center gap-1"
          onMouseLeave={() => setHoveredNav(null)}
        >
          <Link
            href="/"
            onMouseEnter={() => setHoveredNav("Home")}
            className={`relative px-3.5 py-1.5 rounded-xl font-label-md text-sm transition-colors ${
              pathname === "/"
                ? "text-primary font-bold"
                : "text-on-surface-variant hover:text-on-surface"
            }`}
          >
            {hoveredNav === "Home" && (
              <span className="absolute inset-0 bg-surface-container/60 backdrop-blur-xs rounded-xl -z-10 animate-in fade-in zoom-in-95 duration-150" />
            )}
            Home
          </Link>

          {/* Desktop Products Dropdown */}
          <div
            className="relative py-4"
            onMouseEnter={() => {
              setHoveredNav("Products");
              setIsOpen(true);
            }}
            onMouseLeave={() => setIsOpen(false)}
          >
            <button
              type="button"
              className={`relative flex items-center gap-1 px-3.5 py-1.5 rounded-xl font-label-md text-sm transition-colors cursor-pointer ${
                isOpen || isStudio || isLoom
                  ? "text-primary font-bold"
                  : "text-on-surface-variant hover:text-on-surface"
              }`}
            >
              {hoveredNav === "Products" && (
                <span className="absolute inset-0 bg-surface-container/60 backdrop-blur-xs rounded-xl -z-10 animate-in fade-in zoom-in-95 duration-150" />
              )}
              <span>Products</span>
              <ChevronDown
                size={14}
                className={`transition-transform duration-200 ${
                  isOpen ? "rotate-180 text-primary" : "text-outline"
                }`}
              />
            </button>

            {isOpen && (
              <div className="absolute top-full -left-12 w-90 pt-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                <div className="bg-surface/90 backdrop-blur-2xl border border-outline-variant/50 rounded-2xl shadow-2xl p-3">
                  <div className="text-[10px] font-mono uppercase tracking-wider text-outline px-2 py-1 font-semibold flex items-center justify-between">
                    <span>Nudge Ecosystem</span>
                    <Sparkles size={12} className="text-primary" />
                  </div>

                  <div className="space-y-1 mt-1">
                    {NUDGE_PRODUCTS.map((product) => {
                      const isCurrent = pathname.startsWith(product.href);
                      return (
                        <ProductCardItem
                          key={product.name}
                          product={product}
                          isCurrent={isCurrent}
                          onSelect={() => setIsOpen(false)}
                        />
                      );
                    })}
                  </div>

                  <div className="mt-2 pt-2 border-t border-outline-variant/30 px-2 flex items-center justify-between text-[11px] text-outline">
                    <span className="flex items-center gap-1 text-on-surface-variant">
                      <ShieldCheck size={13} className="text-tertiary" />
                      Built for Nepal creators
                    </span>
                    <Link
                      href="/features"
                      onClick={() => setIsOpen(false)}
                      className="text-primary font-bold hover:underline flex items-center gap-0.5 group"
                    >
                      <span>All features</span>
                      <ArrowRight
                        size={11}
                        className="transition-transform group-hover:translate-x-0.5"
                      />
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>

          <Link
            href="/features"
            onMouseEnter={() => setHoveredNav("Features")}
            className={`relative px-3.5 py-1.5 rounded-xl font-label-md text-sm transition-colors ${
              pathname === "/features"
                ? "text-primary font-bold"
                : "text-on-surface-variant hover:text-on-surface"
            }`}
          >
            {hoveredNav === "Features" && (
              <span className="absolute inset-0 bg-surface-container/60 backdrop-blur-xs rounded-xl -z-10 animate-in fade-in zoom-in-95 duration-150" />
            )}
            Features
          </Link>

          <Link
            href="/how-it-works"
            onMouseEnter={() => setHoveredNav("How It Works")}
            className={`relative px-3.5 py-1.5 rounded-xl font-label-md text-sm transition-colors ${
              pathname === "/how-it-works"
                ? "text-primary font-bold"
                : "text-on-surface-variant hover:text-on-surface"
            }`}
          >
            {hoveredNav === "How It Works" && (
              <span className="absolute inset-0 bg-surface-container/60 backdrop-blur-xs rounded-xl -z-10 animate-in fade-in zoom-in-95 duration-150" />
            )}
            How It Works
          </Link>
        </nav>

        {/* Action Cluster + Mobile Hamburger Trigger */}
        <div className="flex items-center gap-2">
          {isAuthenticated && user ? (
            <div className="flex items-center gap-1.5 sm:gap-2">
              <Link
                href="/dashboard"
                className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1.5 rounded-xl bg-surface-container-low/80 hover:bg-surface-container border border-outline-variant/70 text-xs font-bold text-on-surface transition-all active:scale-95 shadow-2xs group"
              >
                <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center text-[10px] font-bold group-hover:scale-105 transition-transform">
                  {(user.name || user.userName || "U").slice(0, 2).toUpperCase()}
                </div>
                <span className="hidden sm:inline">{user.name || user.userName}</span>
              </Link>
              <button
                type="button"
                onClick={logout}
                title="Log out"
                className="p-1.5 sm:p-2 rounded-xl text-outline hover:text-error hover:bg-error/10 transition-colors active:scale-90 cursor-pointer"
              >
                <LogOut size={16} />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-1.5">
              <Link
                href="/api/auth/login"
                className="hidden sm:inline-block px-3 py-1.5 rounded-lg text-xs sm:text-sm font-semibold text-on-surface hover:text-primary transition-colors active:scale-95"
              >
                Log In
              </Link>
              <Link href="/auth?tab=signup">
                <Button variant="primary" size="sm" className="active:scale-95 text-xs px-3 py-1.5">
                  Start Page
                </Button>
              </Link>
            </div>
          )}

          {/* Mobile Hamburger Toggle Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label="Toggle navigation menu"
            className="md:hidden p-2 rounded-xl bg-surface-container-low hover:bg-surface-container border border-outline-variant/60 text-on-surface active:scale-90 transition-all touch-manipulation cursor-pointer"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* ========================================================
          MOBILE NAVIGATION DRAWER
         ======================================================== */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-outline-variant/30 bg-surface/95 backdrop-blur-2xl px-4 py-4 space-y-4 animate-in slide-in-from-top-2 duration-200">
          {/* Main Navigation Links */}
          <div className="space-y-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-3 py-2 rounded-xl text-sm font-semibold transition-colors ${
                  pathname === link.href
                    ? "bg-primary/10 text-primary font-bold"
                    : "text-on-surface-variant hover:bg-surface-container"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Products Section */}
          <div className="pt-2 border-t border-outline-variant/30">
            <span className="text-[10px] font-mono uppercase tracking-wider text-outline px-3 font-semibold block mb-2">
              Products
            </span>
            <div className="space-y-1.5">
              {NUDGE_PRODUCTS.map((prod) => (
                <Link
                  key={prod.name}
                  href={prod.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-3 p-2.5 rounded-xl bg-surface-container-low border border-outline-variant/40 active:scale-98 transition-all"
                >
                  <div className={`w-8 h-8 rounded-lg ${prod.bgLight} ${prod.iconColor} flex items-center justify-center shrink-0`}>
                    <prod.icon size={16} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-on-surface">{prod.name}</span>
                      {prod.badge && (
                        <span className="text-[9px] font-bold px-1.5 py-0.2 rounded-full bg-primary/20 text-primary">
                          {prod.badge}
                        </span>
                      )}
                    </div>
                    <p className="text-[10px] text-on-surface-variant truncate">{prod.description}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Mobile Login / User Profile Strip */}
          {!isAuthenticated && (
            <div className="pt-2 border-t border-outline-variant/30">
              <Link
                href="/api/auth/login"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full block text-center py-2 px-4 rounded-xl border border-outline-variant text-xs font-bold text-on-surface hover:bg-surface-container transition active:scale-95"
              >
                Log In to Existing Account
              </Link>
            </div>
          )}
        </div>
      )}
    </header>
  );
}

function ProductCardItem({
  product,
  isCurrent,
  onSelect,
}: {
  product: ProductItem;
  isCurrent: boolean;
  onSelect: () => void;
}) {
  const cardRef = useRef<HTMLAnchorElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const Icon = product.icon;

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <Link
      ref={cardRef}
      href={product.href}
      onClick={onSelect}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
      className={`relative flex items-start gap-3 p-3 rounded-xl transition-all duration-150 overflow-hidden backdrop-blur-md border ${
        isCurrent
          ? "bg-surface-container-high/40 border-primary/40 shadow-xs"
          : "bg-surface-container-lowest/30 hover:bg-surface-container-high/35 border-outline-variant/20 hover:border-outline-variant/50"
      }`}
    >
      <div
        aria-hidden="true"
        className={`absolute inset-0 pointer-events-none transition-opacity duration-200 ${
          isHovered ? "opacity-100" : "opacity-0"
        }`}
        style={{
          background: `radial-gradient(430px circle at ${mousePos.x}px ${mousePos.y}px, rgba(var(--primary-rgb, 253, 190, 80), 0.17), transparent 250%)`,
        }}
      />

      <div
        className={`w-9 h-9 rounded-xl ${product.bgLight} ${product.iconColor} backdrop-blur-sm border border-outline-variant/20 flex items-center justify-center shrink-0 mt-0.5 transition-transform duration-200`}
      >
        <Icon size={18} />
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2">
          <span
            className={`text-xs font-bold transition-colors truncate ${
              isHovered ? "text-primary" : "text-on-surface"
            }`}
          >
            {product.name}
          </span>
          {product.badge && (
            <span className="text-[9px] font-bold px-1.5 py-0.2 rounded-full bg-primary/20 backdrop-blur-xs text-primary border border-primary/30 shrink-0">
              {product.badge}
            </span>
          )}
        </div>
        <p className="text-[11px] text-on-surface-variant/80 mt-0.5 leading-snug">
          {product.description}
        </p>
      </div>
    </Link>
  );
}