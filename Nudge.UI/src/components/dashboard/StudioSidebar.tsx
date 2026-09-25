// src/components/studio/StudioSidebar.tsx
"use client";

import React, { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCreator } from "@/src/context/CreatorContext";
import { MandalaWatermark } from "@/src/components/public/decorative/MandalaWatermark";
import {
  LayoutDashboard,
  Coffee,
  Bell,
  Award,
  ShieldCheck,
  Landmark,
  Scale,
  Sparkles,
  Spline,
} from "lucide-react";

export function StudioSidebar() {
  const pathname = usePathname();
  const { summary, isLoading } = useCreator();

  const displayName = summary?.fullName || summary?.username || "Creator";
  const avatarUrl = summary?.avatarPhotoUrl || "/images/avatar-placeholder.png";
  const unreadCount = summary?.unreadNotificationsCount ?? 0;
  const currentStep = summary?.currentKycStep ?? 1;

  // 3D Glass Tilt & Sheen state (High-angle 18° tilt)
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [sheen, setSheen] = useState({ x: 50, y: 50, opacity: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [isHolding, setIsHolding] = useState(false);

  // Direct DOM ref for buttery smooth 60fps Pagoda physics
  const pagodaRef = useRef<HTMLDivElement>(null);
  const holdingRef = useRef(false);
  const angleRef = useRef(0);
  const speedRef = useRef(0);
  const scaleRef = useRef(1);
  const lastTimeRef = useRef<number | null>(null);

  useEffect(() => {
    holdingRef.current = isHolding;
  }, [isHolding]);

  // Buttery Smooth Physics Loop
  useEffect(() => {
    let animId: number;

    const tick = (now: number) => {
      if (lastTimeRef.current === null) lastTimeRef.current = now;
      const dt = Math.min((now - lastTimeRef.current) / 1000, 0.05); // cap frame delta
      lastTimeRef.current = now;

      const targetScale = holdingRef.current ? 1.15 : 1;
      scaleRef.current += (targetScale - scaleRef.current) * (6 * dt);

      if (holdingRef.current) {
        // Smooth gentle acceleration up to a calm 90°/sec (1 full turn every 4s)
        speedRef.current = Math.min(speedRef.current + 120 * dt, 90);
        angleRef.current = (angleRef.current + speedRef.current * dt) % 360;
      } else {
        // Fluid deceleration and soft spring glide back to resting 0°
        if (Math.abs(speedRef.current) > 0.05 || angleRef.current > 0.1) {
          speedRef.current *= Math.pow(0.12, dt); // smooth friction

          // Find shortest path to 0°
          const shortestDelta = ((360 - angleRef.current + 180) % 360) - 180;
          angleRef.current += shortestDelta * (5 * dt) + (speedRef.current * dt);

          if (Math.abs(shortestDelta) < 0.1 && Math.abs(speedRef.current) < 0.5) {
            angleRef.current = 0;
            speedRef.current = 0;
          }
        }
      }

      // Direct GPU hardware-accelerated style mutation
      if (pagodaRef.current) {
        pagodaRef.current.style.transform = `translate3d(0,0,0) rotate(${angleRef.current.toFixed(2)}deg) scale(${scaleRef.current.toFixed(3)})`;
      }

      animId = requestAnimationFrame(tick);
    };

    animId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animId);
  }, []);

  // Pronounced Deep 3D Tilt calculation (18 degrees)
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const xPct = (x / rect.width - 0.5) * 2;
    const yPct = (y / rect.height - 0.5) * 2;

    const maxTilt = isHolding ? 10 : 18;
    setTilt({
      x: Number((-yPct * maxTilt).toFixed(2)),
      y: Number((xPct * maxTilt).toFixed(2)),
    });

    setSheen({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
      opacity: isHolding ? 0.38 : 0.22,
    });
  };

  const handleMouseEnter = () => setIsHovered(true);

  const handleMouseLeave = () => {
    setIsHovered(false);
    setIsHolding(false);
    setTilt({ x: 0, y: 0 });
    setSheen((prev) => ({ ...prev, opacity: 0 }));
  };

  const handleHoldStart = () => setIsHolding(true);
  const handleHoldEnd = () => setIsHolding(false);

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
    {
      label: "Loom",
      href: "/loom",
      icon: Spline,
      isActive: pathname.startsWith("/loom"),
    }
  ];

  return (
    <aside className="w-64 border-r border-outline-variant/30 bg-surface-container-lowest/80 backdrop-blur-xl flex flex-col justify-between p-4 h-full select-none">
      <div className="space-y-6">
        {/* Interactive 3D Glassmorphic Creator Card */}
        <div style={{ perspective: "700px" }} className="w-full">
          <div
            ref={cardRef}
            onMouseDown={handleHoldStart}
            onMouseUp={handleHoldEnd}
            onTouchStart={handleHoldStart}
            onTouchEnd={handleHoldEnd}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            style={{
              transform: isHolding
                ? `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(0.96) translateZ(-6px)`
                : `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(${isHovered ? 1.02 : 1})`,
              transformStyle: "preserve-3d",
              transition: isHolding
                ? "transform 0.08s cubic-bezier(0.1, 0.9, 0.2, 1)"
                : isHovered
                ? "transform 0.04s ease-out"
                : "transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1)",
              WebkitBackfaceVisibility: "hidden",
              backfaceVisibility: "hidden",
              WebkitFontSmoothing: "subpixel-antialiased",
            }}
            className="relative overflow-hidden rounded-2xl border border-white/60 dark:border-white/15 bg-surface-container-low/75 dark:bg-white/[0.04] shadow-md shadow-black/[0.04] hover:shadow-2xl hover:shadow-primary/20 transition-shadow duration-300 p-3.5 group cursor-pointer active:cursor-grabbing will-change-transform"
          >
            {/* Direct GPU-interpolated Mandala Pagoda (Silky smooth 90°/s) */}
            <div
              ref={pagodaRef}
              style={{
                transformOrigin: "center center",
                willChange: "transform",
              }}
              className={`pointer-events-none absolute -right-8 -bottom-8 w-36 h-36 text-primary flex items-center justify-center transition-opacity duration-300 ${
                isHolding
                  ? "opacity-55"
                  : isHovered
                  ? "opacity-30"
                  : "opacity-15"
              }`}
            >
              <MandalaWatermark />
            </div>

            {/* Dynamic Glass Specular Light Sheen */}
            <div
              className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-200"
              style={{
                opacity: sheen.opacity,
                background: `radial-gradient(circle 160px at ${sheen.x}% ${sheen.y}%, rgba(255, 255, 255, 0.95), transparent 75%)`,
              }}
            />

            {/* Subtle Gradient Backlight Orb */}
            <div
              className={`pointer-events-none absolute -right-6 -top-6 w-24 h-24 bg-primary/25 rounded-full blur-xl transition-all duration-300 ${
                isHolding ? "scale-175 opacity-100" : isHovered ? "scale-125 opacity-80" : "scale-100 opacity-60"
              }`}
            />

            {/* Content Plane */}
            <div
              className="relative z-10 space-y-3 transform-gpu"
              style={{
                WebkitFontSmoothing: "antialiased",
                transform: "translateZ(1px)",
              }}
            >
              {/* Creator Header Row */}
              <div className="flex items-center gap-3">
                <div className="relative shrink-0">
                  {isLoading ? (
                    <div className="w-11 h-11 rounded-full bg-surface-container-high animate-pulse" />
                  ) : (
                    <div className="relative">
                      <img
                        src={avatarUrl}
                        alt={displayName}
                        className={`w-11 h-11 rounded-full object-cover ring-2 ring-white/90 dark:ring-white/20 shadow-xs transition-transform duration-200 ${
                          isHolding ? "scale-95" : isHovered ? "scale-105" : "scale-100"
                        }`}
                      />
                      <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 rounded-full ring-2 ring-white dark:ring-surface-container-lowest" />
                    </div>
                  )}
                </div>

                <div className="overflow-hidden min-w-0 flex-1">
                  <div className="flex items-center gap-1.5">
                    <h3 className="text-xs font-bold text-on-surface truncate leading-snug tracking-tight">
                      {displayName}
                    </h3>
                    <Sparkles
                      size={12}
                      className={`text-secondary shrink-0 transition-all duration-300 ${
                        isHolding
                          ? "scale-125 rotate-90 opacity-100 text-primary"
                          : isHovered
                          ? "opacity-100 scale-100"
                          : "opacity-0 scale-75"
                      }`}
                    />
                  </div>
                  <p className="text-[11px] text-on-surface-variant truncate font-medium">
                    @{summary?.username || "creator"}
                  </p>
                </div>
              </div>

              {/* Status Badge Glass Strip */}
              <div className="pt-2 border-t border-outline-variant/30 flex items-center justify-between text-[11px]">
                <span className="text-on-surface-variant font-medium text-[10px] tracking-wide uppercase">
                  Payout Status
                </span>
                <div
                  className={`px-2 py-0.5 rounded-full text-[10px] font-bold tracking-wide border flex items-center gap-1.5 transition-transform duration-150 ${
                    isHolding ? "scale-95" : ""
                  } ${
                    summary?.kycStatus === "verified"
                      ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-700 dark:text-emerald-400"
                      : "bg-amber-500/10 border-amber-500/30 text-amber-700 dark:text-amber-400"
                  }`}
                >
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${
                      summary?.kycStatus === "verified"
                        ? "bg-emerald-500"
                        : "bg-amber-500 animate-pulse"
                    }`}
                  />
                  <span>{summary?.kycStatus === "verified" ? "Verified" : "Hold"}</span>
                </div>
              </div>
            </div>
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
