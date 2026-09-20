"use client";

import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/src/features/auth/hooks/use.auth.hook";
import {
  Copy,
  Check,
  LayoutDashboard,
  Sparkles,
  LogIn,
  LogOut,
  Monitor,
  Spline,
  ArrowUp,
  RotateCw,
} from "lucide-react";

export function ContextMenu() {
  const router = useRouter();
  const { user, isAuthenticated, logout } = useAuth();

  const menuRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [selectedText, setSelectedText] = useState("");
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();

      const selection = window.getSelection()?.toString().trim() || "";
      setSelectedText(selection);

      const menuWidth = 240;
      const menuHeight = 310;
      const x =
        e.clientX + menuWidth > window.innerWidth
          ? window.innerWidth - menuWidth - 12
          : e.clientX;
      const y =
        e.clientY + menuHeight > window.innerHeight
          ? window.innerHeight - menuHeight - 12
          : e.clientY;

      setCoords({ x, y });
      setIsOpen(true);
    };

    const handlePointerDown = (e: MouseEvent) => {
      // Left-click outside closes menu; ignore right-clicks so context menu position updates smoothly
      if (
        e.button !== 2 &&
        menuRef.current &&
        !menuRef.current.contains(e.target as HTMLElement)
      ) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };

    document.addEventListener("contextmenu", handleContextMenu, true);
    document.addEventListener("pointerdown", handlePointerDown);
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("contextmenu", handleContextMenu, true);
      document.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const handleCopyAction = async () => {
    try {
      if (selectedText) {
        await navigator.clipboard.writeText(selectedText);
      } else {
        await navigator.clipboard.writeText(window.location.href);
      }
      setIsCopied(true);
      setTimeout(() => {
        setIsCopied(false);
        setIsOpen(false);
      }, 700);
    } catch (err) {
      console.error("Clipboard copy failed:", err);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setIsOpen(false);
  };

  const handleLogout = async () => {
    setIsOpen(false);
    await logout();
    router.push("/auth");
  };

  if (!isOpen) return null;

  return (
    <div
      ref={menuRef}
      style={{
        top: `${coords.y}px`,
        left: `${coords.x}px`,
      }}
      className="fixed z-[2147483640] w-60 rounded-2xl border border-outline-variant/70 bg-surface-container-lowest shadow-2xl p-1.5 select-none"
    >
      {/* SECTION 1: CLIPBOARD & CONTENT */}
      <div className="space-y-0.5">
        <button
          type="button"
          onClick={handleCopyAction}
          className="w-full flex items-center justify-between px-3 py-2 text-xs font-semibold rounded-xl text-on-surface hover:bg-surface-container transition-colors cursor-pointer"
        >
          <div className="flex items-center gap-2.5">
            {isCopied ? (
              <Check size={14} className="text-tertiary" />
            ) : (
              <Copy size={14} className="text-outline" />
            )}
            <span>{selectedText ? "Copy Selection" : "Copy Page Link"}</span>
          </div>
          <span className="text-[10px] font-mono text-outline">
            {isCopied ? "Copied!" : "⌘C"}
          </span>
        </button>
      </div>

      <div className="my-1.5 h-px bg-outline-variant/60" />

      {/* SECTION 2: AUTH-AWARE ACTIONS */}
      <div className="space-y-0.5">
        {isAuthenticated ? (
          <>
            <button
              type="button"
              onClick={() => {
                router.push("/dashboard");
                setIsOpen(false);
              }}
              className="w-full flex items-center justify-between px-3 py-2 text-xs font-bold rounded-xl text-primary hover:bg-primary/10 transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-2.5">
                <LayoutDashboard size={14} />
                <span>Go to Dashboard</span>
              </div>
              <span className="text-[10px] font-mono text-primary/80">
                {(user?.name || user?.userName || "User").slice(0, 6)}
              </span>
            </button>

            <button
              type="button"
              onClick={handleLogout}
              className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-semibold rounded-xl text-error hover:bg-error/10 transition-colors cursor-pointer"
            >
              <LogOut size={14} />
              <span>Sign Out</span>
            </button>
          </>
        ) : (
          <>
            <button
              type="button"
              onClick={() => {
                router.push("/auth?tab=signup");
                setIsOpen(false);
              }}
              className="w-full flex items-center justify-between px-3 py-2 text-xs font-bold rounded-xl bg-primary/10 text-primary hover:bg-primary/15 transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-2.5">
                <Sparkles size={14} />
                <span>Claim Your Page</span>
              </div>
              <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-primary text-on-primary font-bold">
                Free
              </span>
            </button>

            <button
              type="button"
              onClick={() => {
                router.push("/auth");
                setIsOpen(false);
              }}
              className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-semibold rounded-xl text-on-surface hover:bg-surface-container transition-colors cursor-pointer"
            >
              <LogIn size={14} className="text-outline" />
              <span>Log In</span>
            </button>
          </>
        )}
      </div>

      <div className="my-1.5 h-px bg-outline-variant/60" />

      {/* SECTION 3: PRODUCTS ECOSYSTEM */}
      <div className="space-y-0.5">
        <Link
          href="/studio"
          onClick={() => setIsOpen(false)}
          className="flex items-center justify-between px-3 py-2 text-xs font-semibold rounded-xl text-on-surface hover:bg-surface-container transition-colors"
        >
          <div className="flex items-center gap-2.5">
            <Monitor size={14} className="text-primary" />
            <span>Nudge Studio</span>
          </div>
          <span className="text-[9px] uppercase font-bold text-outline">OS</span>
        </Link>

        <Link
          href="/loom"
          onClick={() => setIsOpen(false)}
          className="flex items-center justify-between px-3 py-2 text-xs font-semibold rounded-xl text-on-surface hover:bg-surface-container transition-colors"
        >
          <div className="flex items-center gap-2.5">
            <Spline size={14} className="text-secondary" />
            <span>Nudge Loom</span>
          </div>
          <span className="text-[9px] uppercase font-bold text-outline">Bio</span>
        </Link>
      </div>

      <div className="my-1.5 h-px bg-outline-variant/60" />

      {/* SECTION 4: NAVIGATION UTILITIES */}
      <div className="space-y-0.5">
        <button
          type="button"
          onClick={scrollToTop}
          className="w-full flex items-center gap-2.5 px-3 py-1.5 text-xs font-medium rounded-xl text-on-surface-variant hover:bg-surface-container transition-colors cursor-pointer"
        >
          <ArrowUp size={13} className="text-outline" />
          <span>Scroll to Top</span>
        </button>

        <button
          type="button"
          onClick={() => window.location.reload()}
          className="w-full flex items-center gap-2.5 px-3 py-1.5 text-xs font-medium rounded-xl text-on-surface-variant hover:bg-surface-container transition-colors cursor-pointer"
        >
          <RotateCw size={13} className="text-outline" />
          <span>Reload Canvas</span>
        </button>
      </div>
    </div>
  );
}