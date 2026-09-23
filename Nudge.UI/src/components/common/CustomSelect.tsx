// src/components/common/CustomSelect.tsx
"use client";

import React, { useState, useRef, useEffect } from "react";
import { ChevronDown, Check } from "lucide-react";

export interface OptionItem {
  label: string;
  value: string | number;
  subLabel?: string;
}

interface CustomSelectProps {
  options: OptionItem[];
  value: string | number;
  onChange: (val: string | number) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
}

export function CustomSelect({
  options,
  value,
  onChange,
  placeholder = "Select...",
  disabled = false,
  className = "",
}: CustomSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const selectedItem = options.find((opt) => opt.value === value);

  // Close when clicked outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      {/* Trigger Button */}
      <button
        type="button"
        disabled={disabled}
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl border text-xs font-semibold transition-all shadow-xs ${
          isOpen
            ? "border-primary ring-2 ring-primary/20 bg-surface-container-lowest"
            : "border-outline-variant/70 hover:border-primary/50 bg-surface-container-lowest text-on-surface"
        } ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
      >
        <span className="truncate">
          {selectedItem ? selectedItem.label : <span className="text-on-surface-variant/60">{placeholder}</span>}
        </span>
        <ChevronDown
          size={15}
          className={`text-on-surface-variant transition-transform duration-200 shrink-0 ml-1.5 ${
            isOpen ? "rotate-180 text-primary" : ""
          }`}
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-1.5 max-h-56 overflow-y-auto z-50 bg-surface-container-lowest border border-outline-variant/60 rounded-xl shadow-xl py-1 custom-scrollbar">
          {options.map((opt) => {
            const isSelected = opt.value === value;
            return (
              <button
                key={opt.value}
                type="button"
                onClick={() => {
                  onChange(opt.value);
                  setIsOpen(false);
                }}
                className={`w-full px-3 py-2 text-left text-xs flex items-center justify-between gap-2 transition-colors ${
                  isSelected
                    ? "bg-primary-fixed/40 text-primary font-bold"
                    : "text-on-surface hover:bg-surface-container-low"
                }`}
              >
                <div className="flex flex-col truncate">
                  <span className="truncate">{opt.label}</span>
                  {opt.subLabel && (
                    <span className="text-[10px] text-on-surface-variant font-normal">{opt.subLabel}</span>
                  )}
                </div>
                {isSelected && <Check size={14} className="text-primary shrink-0" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}