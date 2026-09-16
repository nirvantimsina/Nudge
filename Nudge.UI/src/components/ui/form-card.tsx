"use client";

import React from "react";
import { AlertCircle } from "lucide-react";

interface FormCardProps {
  title: string;
  subtitle?: string;
  error?: string | null;
  children: React.ReactNode;
}

export function FormCard({ title, subtitle, error, children }: FormCardProps) {
  return (
    <div className="w-full h-145 max-w-150 bg-white p-8 rounded-3xl shadow-xl shadow-neutral-200/50 border border-neutral-100 animate-in fade-in zoom-in-95 duration-200">
      <div className="text-center mb-8">
        {/* <div className="inline-flex items-center justify-center w-14 h-14 bg-amber-100 text-amber-600 rounded-2xl font-black text-2xl mb-3">
        </div> */}
        <h1 className="text-2xl font-bold text-neutral-900 tracking-tight">{title}</h1>
        {subtitle && <p className="text-sm text-neutral-500 mt-1">{subtitle}</p>}
      </div>

      {/* Global Form Errors */}
      {error && (
        <div className="mb-6 p-4 text-sm text-amber-900 bg-amber-50/70 rounded-2xl border border-amber-200 flex items-start gap-3" role="alert">
          <AlertCircle className="shrink-0 text-amber-600 mt-0.5" size={18} />
          <span className="font-medium">{error}</span>
        </div>
      )}

      {children}
    </div>
  );
}