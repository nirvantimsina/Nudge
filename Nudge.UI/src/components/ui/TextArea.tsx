"use client";

import React, { forwardRef } from "react";
import { AlertCircle } from "lucide-react";

export interface TextAreaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  hint?: string;
  error?: string;
  isRequired?: boolean;
  showCharCount?: boolean;
}

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  (
    {
      label,
      hint,
      error,
      isRequired = false,
      showCharCount = false,
      maxLength,
      id,
      className = "",
      disabled = false,
      value,
      ...props
    },
    ref
  ) => {
    const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);
    const charCount = typeof value === "string" ? value.length : 0;

    return (
      <div className="space-y-1 w-full text-left">
        {label && (
          <div className="flex items-center justify-between">
            <label
              htmlFor={inputId}
              className="block text-xs font-semibold text-on-surface"
            >
              {label} {isRequired && <span className="text-primary font-bold">*</span>}
            </label>
            {showCharCount && maxLength && (
              <span className="text-[10px] font-mono text-on-surface-variant">
                {charCount}/{maxLength}
              </span>
            )}
          </div>
        )}

        <div className="relative">
          <textarea
            ref={ref}
            id={inputId}
            disabled={disabled}
            maxLength={maxLength}
            value={value}
            className={`w-full rounded-xl text-xs transition-all placeholder:text-on-surface-variant/50 focus:outline-none p-3 min-h-[90px] resize-y ${
              disabled
                ? "bg-surface-container-high/50 border border-outline-variant/40 text-on-surface-variant/50 cursor-not-allowed"
                : error
                ? "bg-surface-container-lowest border border-error text-on-surface focus:ring-2 focus:ring-error/20"
                : "bg-surface-container-lowest border border-outline-variant text-on-surface hover:border-outline focus:border-primary focus:ring-2 focus:ring-primary/15"
            } ${className}`}
            {...props}
          />
        </div>

        {error ? (
          <p className="text-[11px] text-error flex items-center gap-1 font-medium mt-1">
            <AlertCircle size={12} className="shrink-0" />
            <span>{error}</span>
          </p>
        ) : hint ? (
          <p className="text-[11px] text-on-surface-variant mt-1 leading-normal">
            {hint}
          </p>
        ) : null}
      </div>
    );
  }
);

TextArea.displayName = "TextArea";
