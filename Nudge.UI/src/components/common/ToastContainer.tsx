// src/components/common/ToastContainer.tsx
"use client";

import React, { useEffect, useState } from "react";
import { toast, ToastOptions, ToastType } from "@/lib/toast";
import {
  CheckCircle2,
  AlertCircle,
  Info,
  AlertTriangle,
  X,
} from "lucide-react";

export function ToastContainer() {
  const [toasts, setToasts] = useState<ToastOptions[]>([]);

  useEffect(() => {
    const unsubscribe = toast.subscribe((updatedToasts) => {
      setToasts(updatedToasts);
    });
    return unsubscribe;
  }, []);

  if (toasts.length === 0) return null;

  return (
    <div
      aria-live="polite"
      className="fixed bottom-5 right-5 z-[9999] flex flex-col gap-2.5 max-w-sm w-full pointer-events-none px-4 sm:px-0"
    >
      {toasts.map((t) => (
        <ToastItem key={t.id} item={t} onDismiss={() => toast.dismiss(t.id!)} />
      ))}
    </div>
  );
}

function ToastItem({
  item,
  onDismiss,
}: {
  item: ToastOptions;
  onDismiss: () => void;
}) {
  const config = getToastConfig(item.type || "info");
  const Icon = config.icon;

  return (
    <div
      className={`pointer-events-auto flex items-start gap-3 p-3.5 rounded-2xl border shadow-xl backdrop-blur-md transition-all duration-300 animate-in fade-in slide-in-from-bottom-3 ${config.containerClasses}`}
    >
      <div className={`shrink-0 mt-0.5 ${config.iconClass}`}>
        <Icon size={18} />
      </div>

      <div className="flex-1 min-w-0 pr-1">
        {item.title && (
          <h4 className="text-xs font-bold text-on-surface mb-0.5 truncate">
            {item.title}
          </h4>
        )}
        <p className="text-xs font-medium text-on-surface/90 leading-relaxed break-words">
          {item.message}
        </p>
      </div>

      <button
        type="button"
        onClick={onDismiss}
        className="shrink-0 p-1 text-on-surface-variant hover:text-on-surface hover:bg-black/5 rounded-lg transition-colors"
        aria-label="Close notification"
      >
        <X size={14} />
      </button>
    </div>
  );
}

function getToastConfig(type: ToastType) {
  switch (type) {
    case "success":
      return {
        icon: CheckCircle2,
        iconClass: "text-tertiary",
        containerClasses:
          "bg-surface-container-lowest/95 border-tertiary/30 text-on-surface ring-1 ring-tertiary/10",
      };
    case "error":
      return {
        icon: AlertCircle,
        iconClass: "text-error",
        containerClasses:
          "bg-surface-container-lowest/95 border-error/30 text-on-surface ring-1 ring-error/10",
      };
    case "warning":
      return {
        icon: AlertTriangle,
        iconClass: "text-secondary",
        containerClasses:
          "bg-surface-container-lowest/95 border-secondary/30 text-on-surface ring-1 ring-secondary/10",
      };
    case "info":
    default:
      return {
        icon: Info,
        iconClass: "text-primary",
        containerClasses:
          "bg-surface-container-lowest/95 border-primary/30 text-on-surface ring-1 ring-primary/10",
      };
  }
}