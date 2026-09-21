// src/components/common/FlagSelect.tsx
"use client";

import React, { useEffect, useState, useRef } from "react";
import { ChevronDown, Loader2 } from "lucide-react";

export interface DropdownItem {
  id: string;      // maps to backend `value`
  label: string;   // maps to backend `text`
}

interface FlagSelectProps {
  flag: string;
  value: string | null | undefined;
  onChange: (val: string) => void;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
}

export function FlagSelect({
  flag,
  value,
  onChange,
  placeholder = "Select an option...",
  disabled = false,
  required = false,
}: FlagSelectProps) {
  const [items, setItems] = useState<DropdownItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
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
          // Supports both direct List<DropdownListModel> and ErrorOr/ApiResponse wrapper
          const list = Array.isArray(raw) ? raw : raw.data || [];

          // Map: text -> label, value -> id (handling both camelCase & PascalCase)
          const normalized: DropdownItem[] = list.map((item: any) => ({
            id: String(item.value ?? item.Value ?? ""),
            label: String(item.text ?? item.Text ?? ""),
          }));

          if (isMounted) {
            setItems(normalized);
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

    if (flag) {
      fetchOptions();
    }

    return () => {
      isMounted = false;
    };
  }, [flag]);

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

  // Find selected item whether `value` holds the ID or the Label text
  const selectedItem = items.find(
    (item) => item.id === value || item.label === value
  );

  return (
    <div ref={dropdownRef} className="relative w-full">
      <div
        role="button"
        tabIndex={0}
        onClick={() => !disabled && !loading && setIsOpen((prev) => !prev)}
        onKeyDown={(e) => {
          if ((e.key === "Enter" || e.key === " ") && !disabled && !loading) {
            setIsOpen((prev) => !prev);
          }
        }}
        className={`w-full flex items-center justify-between px-3.5 py-2.5 bg-surface-container-lowest border rounded-xl text-xs transition-all shadow-xs cursor-pointer select-none ${
          isOpen
            ? "border-primary ring-2 ring-primary/20"
            : "border-outline-variant hover:border-primary/50"
        } ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
      >
        <span className={selectedItem ? "text-on-surface font-semibold truncate" : "text-outline truncate"}>
          {selectedItem ? selectedItem.label : placeholder}
        </span>

        <div className="flex items-center gap-1.5 ml-2 shrink-0">
          {loading ? (
            <Loader2 size={14} className="text-primary animate-spin" />
          ) : (
            <ChevronDown
              size={14}
              className={`text-on-surface-variant transition-transform duration-200 ${
                isOpen ? "rotate-180 text-primary" : ""
              }`}
            />
          )}
        </div>
      </div>

      {isOpen && (
        <div className="absolute top-full left-0 mt-1 z-50 w-full max-h-60 overflow-y-auto bg-surface-container-lowest border border-outline-variant/60 rounded-xl shadow-xl py-1 text-xs custom-scrollbar">
          {items.length === 0 ? (
            <div className="px-3 py-2 text-outline text-center">No options available</div>
          ) : (
            items.map((item) => {
              const isSelected = item.id === value || item.label === value;
              return (
                <button
                  type="button"
                  key={item.id || item.label}
                  onClick={() => {
                    // Pass item.label (e.g. "Kathmandu") or item.id depending on what tblcreatordocs stores
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