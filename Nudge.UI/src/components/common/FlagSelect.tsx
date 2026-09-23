"use client";

import React, { useEffect, useState, useRef } from "react";
import { ChevronDown, Loader2 } from "lucide-react";

export interface DropdownItem {
  id: string;      // maps to value/identifier
  label: string;   // maps to display text
}

interface FlagSelectProps {
  flag?: string;                            // Optional when `items` is provided
  items?: DropdownItem[];                   // Pass static/client JSON items directly
  value: string | null | undefined;
  onChange: (val: string) => void;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
}

export function FlagSelect({
  flag,
  items: controlledItems,
  value,
  onChange,
  placeholder = "Select an option...",
  disabled = false,
  required = false,
}: FlagSelectProps) {
  const [fetchedItems, setFetchedItems] = useState<DropdownItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // If controlled items are passed, prioritize them over network fetching
  const isControlled = Array.isArray(controlledItems);
  const items = isControlled ? controlledItems : fetchedItems;

  useEffect(() => {
    // Skip API request if items are provided via props or if flag is absent
    if (isControlled || !flag) return;

    let isMounted = true;

    const fetchOptions = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/Dropdown/${flag}`, {
          method: "GET",
          headers: { Accept: "application/json" },
          credentials: "include",
        });

        if (res.ok) {
          const raw = await res.json();
          const list = Array.isArray(raw) ? raw : raw.data || [];

          const normalized: DropdownItem[] = list.map((item: any) => ({
            id: String(item.value ?? item.Value ?? ""),
            label: String(item.text ?? item.Text ?? ""),
          }));

          if (isMounted) {
            setFetchedItems(normalized);
          }
        } else {
          console.error(`Failed to load dropdown for flag: ${flag} (${res.status})`);
        }
      } catch (err) {
        console.error(`Error loading dropdown for flag: ${flag}`, err);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchOptions();

    return () => {
      isMounted = false;
    };
  }, [flag, isControlled]);

  // Click outside to close
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Match current selected item by label or id
  const selectedItem = items.find(
    (item) => item.id === value || item.label.toLowerCase() === (value || "").toLowerCase()
  );

  return (
    <div ref={dropdownRef} className="relative w-full">
      <div
        role="button"
        tabIndex={disabled ? -1 : 0}
        aria-disabled={disabled}
        onClick={() => !disabled && !loading && setIsOpen((prev) => !prev)}
        onKeyDown={(e) => {
          if ((e.key === "Enter" || e.key === " ") && !disabled && !loading) {
            e.preventDefault();
            setIsOpen((prev) => !prev);
          }
        }}
        className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs transition-all select-none ${
          disabled
            ? "bg-surface-container-low/70 border border-outline-variant/60 text-on-surface/70 cursor-not-allowed shadow-none"
            : isOpen
            ? "bg-surface-container-lowest border border-primary ring-2 ring-primary/20 cursor-pointer shadow-xs"
            : "bg-surface-container-lowest border border-outline-variant hover:border-primary/50 cursor-pointer shadow-xs"
        }`}
      >
        <span
          className={`truncate ${
            disabled
              ? "text-on-surface/70 font-semibold"
              : selectedItem
              ? "text-on-surface font-semibold"
              : value
              ? "text-on-surface font-semibold"
              : "text-on-surface-variant/50"
          }`}
        >
          {selectedItem ? selectedItem.label : value ? value : placeholder}
        </span>

        <div className="flex items-center gap-1.5 ml-2 shrink-0">
          {loading ? (
            <Loader2 size={14} className="text-primary animate-spin" />
          ) : (
            <ChevronDown
              size={14}
              className={`transition-transform duration-200 ${
                disabled
                  ? "text-on-surface-variant/40"
                  : isOpen
                  ? "rotate-180 text-primary"
                  : "text-on-surface-variant"
              }`}
            />
          )}
        </div>
      </div>

      {isOpen && !disabled && (
        <div className="absolute top-full left-0 mt-1 z-50 w-full max-h-60 overflow-y-auto bg-surface-container-lowest border border-outline-variant/60 rounded-xl shadow-xl py-1 text-xs custom-scrollbar">
          {items.length === 0 ? (
            <div className="px-3 py-2 text-on-surface-variant/60 text-center">No options available</div>
          ) : (
            items.map((item, index) => {
              const isSelected = item.id === value || item.label === value;
              return (
                <button
                  type="button"
                  key={`${item.id}-${index}`}
                  onClick={() => {
                    onChange(item.label);
                    setIsOpen(false);
                  }}
                  className={`w-full text-left px-3.5 py-2 hover:bg-surface-container transition-colors ${
                    isSelected ? "bg-primary-fixed/40 text-primary font-bold" : "text-on-surface"
                  }`}
                >
                  {item.label}
                </button>
              );
            })
          )}
        </div>
      )}
    </div>
  );
}
