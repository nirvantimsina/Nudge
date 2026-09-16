"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { Copy, Share2, Sparkles, ExternalLink, QrCode } from "lucide-react";

export interface MenuItem {
  label: string;
  icon?: React.ReactNode;
  action: () => void;
  shortcut?: string;
  danger?: boolean;
  divider?: boolean;
}

interface ContextMenuProps {
  children: React.ReactNode;
  items?: MenuItem[];
}

export function ContextMenu({ children, items }: ContextMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const menuRef = useRef<HTMLDivElement>(null);

  // Default menu actions if none are passed
  const defaultItems: MenuItem[] = [
    {
      label: "Copy Creator Link",
      icon: <Copy size={14} />,
      action: () => navigator.clipboard.writeText(window.location.href),
      shortcut: "⌘C",
    },
    {
      label: "Share via QR",
      icon: <QrCode size={14} />,
      action: () => alert("QR Generator triggered"),
    },
    {
      label: "Nudge Creator (Rs. 100)",
      icon: <Sparkles size={14} className="text-primary" />,
      action: () => alert("Direct tip flow initiated"),
      divider: true,
    },
    {
      label: "Explore Nudge Loom",
      icon: <ExternalLink size={14} />,
      action: () => window.open("/loom", "_blank"),
    },
  ];

  const menuItems = items || defaultItems;

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();

    const menuWidth = 220;
    const menuHeight = 260;

    // Viewport overflow boundary guards
    let x = e.clientX;
    let y = e.clientY;

    if (x + menuWidth > window.innerWidth) {
      x = window.innerWidth - menuWidth - 12;
    }
    if (y + menuHeight > window.innerHeight) {
      y = window.innerHeight - menuHeight - 12;
    }

    setPosition({ x, y });
    setIsOpen(true);
  };

  const closeMenu = useCallback(() => setIsOpen(false), []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeMenu();
    };

    if (isOpen) {
      document.addEventListener("click", closeMenu);
      document.addEventListener("contextmenu", closeMenu);
      document.addEventListener("keydown", handleKeyDown);
      window.addEventListener("scroll", closeMenu, { passive: true });
    }

    return () => {
      document.removeEventListener("click", closeMenu);
      document.removeEventListener("contextmenu", closeMenu);
      document.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("scroll", closeMenu);
    };
  }, [isOpen, closeMenu]);

  return (
    <div onContextMenu={handleContextMenu} className="relative w-full">
      {children}

      {isOpen && (
        <div
          ref={menuRef}
          style={{ top: `${position.y}px`, left: `${position.x}px` }}
          className="fixed z-[100] w-56 rounded-2xl bg-surface-container-lowest/95 border border-outline-variant/80 p-1.5 shadow-2xl backdrop-blur-md animate-in fade-in zoom-in-95 duration-100 select-none"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="px-2.5 py-1 text-[10px] font-mono uppercase tracking-wider text-outline">
            Nudge Actions
          </div>

          <div className="space-y-0.5">
            {menuItems.map((item, index) => (
              <React.Fragment key={index}>
                <button
                  type="button"
                  onClick={() => {
                    item.action();
                    closeMenu();
                  }}
                  className={`flex w-full items-center justify-between px-2.5 py-2 text-xs font-semibold rounded-xl transition-colors cursor-pointer ${
                    item.danger
                      ? "text-error hover:bg-error-container/20"
                      : "text-on-surface hover:bg-surface-container hover:text-primary"
                  }`}
                >
                  <span className="flex items-center gap-2">
                    {item.icon && <span className="shrink-0">{item.icon}</span>}
                    <span>{item.label}</span>
                  </span>
                  {item.shortcut && (
                    <span className="font-mono text-[10px] text-outline opacity-70">
                      {item.shortcut}
                    </span>
                  )}
                </button>
                {item.divider && (
                  <div className="my-1 border-t border-outline-variant/40" />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}