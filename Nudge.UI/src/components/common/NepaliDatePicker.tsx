// src/components/common/NepaliDatePicker.tsx
"use client";

import React, { useState, useRef, useEffect, useMemo } from "react";
import {
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ArrowRightLeft,
  X,
} from "lucide-react";
import { convertAdToBs, convertBsToAd, NEPALI_MONTHS } from "@/lib/nepali-calendar";
import { CustomSelect, OptionItem } from "./CustomSelect";

interface NepaliDatePickerProps {
  dobAD?: string | null;
  dobBS?: string | null;
  onDateChange: (dates: { dobAD: string; dobBS: string }) => void;
  disabled?: boolean;
}

const WEEKDAYS_NP = ["आईत", "सोम", "मङ्गल", "बुध", "बिही", "शुक्र", "शनि"];
const WEEKDAYS_EN = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

const BS_MONTH_DAYS: Record<number, number[]> = {
  2040: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
  2041: [31, 31, 32, 31, 32, 30, 30, 29, 30, 29, 30, 30],
  2042: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
  2043: [30, 32, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
  2044: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 31],
  2045: [31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30],
  2046: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
  2047: [30, 32, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
  2048: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 31],
  2049: [31, 31, 32, 31, 32, 30, 30, 30, 29, 29, 30, 31],
  2050: [31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
  2051: [30, 32, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
  2052: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 31],
  2053: [31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30],
  2054: [31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
  2055: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
  2056: [31, 31, 32, 31, 32, 30, 30, 29, 30, 29, 30, 31],
  2057: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
  2058: [30, 32, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
  2059: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 31],
  2060: [31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 31],
  2061: [30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
  2062: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 31],
  2063: [31, 31, 32, 31, 32, 30, 30, 29, 30, 29, 30, 31],
  2064: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
  2065: [30, 32, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
  2066: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 31],
  2067: [31, 31, 32, 31, 32, 30, 30, 30, 29, 29, 30, 31],
  2068: [31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
  2069: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
  2070: [31, 31, 32, 31, 32, 30, 30, 29, 30, 29, 30, 31],
  2071: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
  2072: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
  2073: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 31],
  2074: [31, 31, 32, 31, 32, 30, 30, 30, 29, 29, 30, 31],
  2075: [31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
  2076: [31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
  2077: [31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
  2078: [31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30],
  2079: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 31],
  2080: [31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30],
  2081: [31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
  2082: [30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 30, 30],
  2083: [31, 31, 32, 31, 31, 30, 30, 30, 29, 30, 30, 30],
  2084: [31, 31, 32, 31, 31, 30, 30, 30, 29, 30, 30, 30],
  2085: [31, 32, 31, 32, 30, 31, 30, 30, 29, 30, 30, 30],
};

function parseDateParts(str?: string | null): [number, number, number] | null {
  if (!str) return null;
  // Handle formats like "2003-01-30", "2003-1-30", "2003-01-30T00:00:00"
  const clean = str.split("T")[0].replace(/\//g, "-").trim();
  const parts = clean.split("-").map((p) => parseInt(p, 10));
  if (parts.length === 3 && parts.every((n) => !isNaN(n) && n > 0)) {
    return [parts[0], parts[1], parts[2]];
  }
  return null;
}

export function NepaliDatePicker({
  dobAD,
  dobBS,
  onDateChange,
  disabled = false,
}: NepaliDatePickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeMode, setActiveMode] = useState<"BS" | "AD">("BS");
  const popoverRef = useRef<HTMLDivElement>(null);

  // BS State
  const [bsYear, setBsYear] = useState<number>(2054);
  const [bsMonth, setBsMonth] = useState<number>(8);
  const [bsDay, setBsDay] = useState<number>(14);

  // AD State
  const [adYear, setAdYear] = useState<number>(1997);
  const [adMonth, setAdMonth] = useState<number>(11);
  const [adDay, setAdDay] = useState<number>(29);

  // Compute resolved display values (if one exists, compute the other)
  const resolvedDates = useMemo(() => {
    let finalAD = dobAD ? dobAD.split("T")[0].trim() : "";
    let finalBS = dobBS ? dobBS.trim() : "";

    if (finalAD && !finalBS) {
      finalBS = convertAdToBs(finalAD) || "";
    } else if (finalBS && !finalAD) {
      finalAD = convertBsToAd(finalBS) || "";
    }

    return { finalAD, finalBS };
  }, [dobAD, dobBS]);

  // Sync internal state when props arrive or update
  useEffect(() => {
    const adParts = parseDateParts(resolvedDates.finalAD);
    if (adParts) {
      setAdYear(adParts[0]);
      setAdMonth(adParts[1]);
      setAdDay(adParts[2]);
    }

    const bsParts = parseDateParts(resolvedDates.finalBS);
    if (bsParts) {
      setBsYear(bsParts[0]);
      setBsMonth(bsParts[1]);
      setBsDay(bsParts[2]);
    }
  }, [resolvedDates.finalAD, resolvedDates.finalBS]);

  // Close on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (popoverRef.current && !popoverRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  const handleBsDateSelect = (y: number, m: number, d: number, close: boolean = false) => {
    setBsYear(y);
    setBsMonth(m);
    setBsDay(d);

    const formattedBs = `${y}-${String(m).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
    const computedAd = convertBsToAd(formattedBs);

    if (computedAd) {
      const parts = parseDateParts(computedAd);
      if (parts) {
        setAdYear(parts[0]);
        setAdMonth(parts[1]);
        setAdDay(parts[2]);
      }
    }

    onDateChange({ dobAD: computedAd || "", dobBS: formattedBs });
    if (close) setIsOpen(false);
  };

  const handleAdDateSelect = (y: number, m: number, d: number, close: boolean = false) => {
    setAdYear(y);
    setAdMonth(m);
    setAdDay(d);

    const formattedAd = `${y}-${String(m).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
    const computedBs = convertAdToBs(formattedAd);

    if (computedBs) {
      const parts = parseDateParts(computedBs);
      if (parts) {
        setBsYear(parts[0]);
        setBsMonth(parts[1]);
        setBsDay(parts[2]);
      }
    }

    onDateChange({ dobAD: formattedAd, dobBS: computedBs || "" });
    if (close) setIsOpen(false);
  };

  const bsYearOptions: OptionItem[] = Array.from({ length: 46 }, (_, i) => {
    const yr = 2085 - i;
    return { label: `${yr} BS`, value: yr };
  });

  const bsMonthOptions: OptionItem[] = NEPALI_MONTHS.map((m) => ({
    label: `${m.np} (${m.en})`,
    value: m.num,
  }));

  const adYearOptions: OptionItem[] = Array.from({ length: 46 }, (_, i) => {
    const yr = 2028 - i;
    return { label: `${yr} AD`, value: yr };
  });

  const adMonthOptions: OptionItem[] = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ].map((name, idx) => ({
    label: name,
    value: idx + 1,
  }));

  const totalDaysInBsMonth = BS_MONTH_DAYS[bsYear]?.[bsMonth - 1] ?? 30;
  const totalDaysInAdMonth = new Date(adYear, adMonth, 0).getDate();
  const firstDayOfAdMonth = new Date(adYear, adMonth - 1, 1).getDay();

  const hasValue = Boolean(resolvedDates.finalBS || resolvedDates.finalAD);

  return (
    <div ref={popoverRef} className="relative w-full">
      {/* 1. Compact Clickable Input Trigger */}
      <div
        role="button"
        tabIndex={0}
        onClick={() => !disabled && setIsOpen((prev) => !prev)}
        onKeyDown={(e) => {
          if ((e.key === "Enter" || e.key === " ") && !disabled) {
            setIsOpen((prev) => !prev);
          }
        }}
        className={`w-full flex items-center justify-between px-3.5 py-2.5 bg-surface-container-lowest border rounded-xl text-xs transition-all shadow-xs cursor-pointer select-none ${
          isOpen
            ? "border-primary ring-2 ring-primary/20"
            : "border-outline-variant hover:border-primary/50"
        } ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
      >
        <div className="flex items-center gap-2 min-w-0">
          <CalendarIcon size={16} className="text-primary shrink-0" />
          {hasValue ? (
            <div className="flex items-center gap-2 font-mono flex-wrap">
              {resolvedDates.finalBS && (
                <span className="font-bold text-on-surface">{resolvedDates.finalBS} BS</span>
              )}
              {resolvedDates.finalBS && resolvedDates.finalAD && (
                <span className="text-outline-variant">/</span>
              )}
              {resolvedDates.finalAD && (
                <span className="text-on-surface-variant">{resolvedDates.finalAD} AD</span>
              )}
            </div>
          ) : (
            <span className="text-on-surface-variant/60">Select birth date (BS / AD)...</span>
          )}
        </div>

        <div className="flex items-center gap-1.5 shrink-0 ml-2">
          {hasValue && (
            <span className="text-[10px] font-bold bg-primary-fixed text-primary px-1.5 py-0.5 rounded">
              Synced
            </span>
          )}
          <ChevronDown
            size={14}
            className={`text-on-surface-variant transition-transform duration-200 ${
              isOpen ? "rotate-180 text-primary" : ""
            }`}
          />
        </div>
      </div>

      {/* 2. Floating Popover Calendar Modal */}
      {isOpen && (
        <div className="absolute top-full left-0 mt-2 z-50 w-full sm:w-[350px] bg-surface-container-lowest border border-outline-variant/60 rounded-2xl shadow-2xl p-4 space-y-3 animate-in fade-in zoom-in-95 duration-150">
          <div className="flex items-center justify-between pb-2 border-b border-outline-variant/30">
            <div className="flex items-center bg-surface-container-low p-0.5 rounded-lg border border-outline-variant/40">
              <button
                type="button"
                onClick={() => setActiveMode("BS")}
                className={`px-2.5 py-0.5 rounded-md text-[11px] font-bold transition-all ${
                  activeMode === "BS"
                    ? "bg-surface-container-lowest text-primary shadow-xs"
                    : "text-on-surface-variant hover:text-on-surface"
                }`}
              >
                B.S. (नेपाली)
              </button>
              <button
                type="button"
                onClick={() => setActiveMode("AD")}
                className={`px-2.5 py-0.5 rounded-md text-[11px] font-bold transition-all ${
                  activeMode === "AD"
                    ? "bg-surface-container-lowest text-primary shadow-xs"
                    : "text-on-surface-variant hover:text-on-surface"
                }`}
              >
                A.D. (English)
              </button>
            </div>

            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-md text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors"
            >
              <X size={15} />
            </button>
          </div>

          {activeMode === "BS" ? (
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-2">
                <CustomSelect
                  options={bsMonthOptions}
                  value={bsMonth}
                  onChange={(val) => handleBsDateSelect(bsYear, Number(val), Math.min(bsDay, 29))}
                />
                <CustomSelect
                  options={bsYearOptions}
                  value={bsYear}
                  onChange={(val) => handleBsDateSelect(Number(val), bsMonth, Math.min(bsDay, 29))}
                />
              </div>

              <div className="p-2 rounded-xl bg-surface-container-low/40 border border-outline-variant/20">
                <div className="grid grid-cols-7 gap-1 text-center mb-1 text-[10px] font-bold text-on-surface-variant">
                  {WEEKDAYS_NP.map((d, i) => (
                    <div key={d} className={i === 6 ? "text-error" : ""}>
                      {d}
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-7 gap-1 text-center">
                  {Array.from({ length: totalDaysInBsMonth }, (_, i) => i + 1).map((dayNum) => {
                    const isSelected = bsDay === dayNum;
                    return (
                      <button
                        key={dayNum}
                        type="button"
                        onClick={() => handleBsDateSelect(bsYear, bsMonth, dayNum, true)}
                        className={`h-7 rounded-lg text-xs font-semibold flex items-center justify-center transition-all ${
                          isSelected
                            ? "bg-primary text-on-primary font-bold shadow-xs scale-105"
                            : "hover:bg-primary-fixed/30 text-on-surface"
                        }`}
                      >
                        {dayNum}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-2">
                <CustomSelect
                  options={adMonthOptions}
                  value={adMonth}
                  onChange={(val) => handleAdDateSelect(adYear, Number(val), Math.min(adDay, 28))}
                />
                <CustomSelect
                  options={adYearOptions}
                  value={adYear}
                  onChange={(val) => handleAdDateSelect(Number(val), adMonth, Math.min(adDay, 28))}
                />
              </div>

              <div className="p-2 rounded-xl bg-surface-container-low/40 border border-outline-variant/20">
                <div className="grid grid-cols-7 gap-1 text-center mb-1 text-[10px] font-bold text-on-surface-variant">
                  {WEEKDAYS_EN.map((d, i) => (
                    <div key={d} className={i === 0 ? "text-error" : ""}>
                      {d}
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-7 gap-1 text-center">
                  {Array.from({ length: firstDayOfAdMonth }).map((_, i) => (
                    <div key={`empty-${i}`} className="h-7" />
                  ))}
                  {Array.from({ length: totalDaysInAdMonth }, (_, i) => i + 1).map((dayNum) => {
                    const isSelected = adDay === dayNum;
                    return (
                      <button
                        key={dayNum}
                        type="button"
                        onClick={() => handleAdDateSelect(adYear, adMonth, dayNum, true)}
                        className={`h-7 rounded-lg text-xs font-semibold flex items-center justify-center transition-all ${
                          isSelected
                            ? "bg-primary text-on-primary font-bold shadow-xs scale-105"
                            : "hover:bg-primary-fixed/30 text-on-surface"
                        }`}
                      >
                        {dayNum}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          <div className="pt-2 border-t border-outline-variant/20 flex items-center justify-between text-[11px] font-mono">
            <span className="text-on-surface-variant flex items-center gap-1">
              <ArrowRightLeft size={11} className="text-secondary" /> Result:
            </span>
            <span className="font-bold text-primary">
              {activeMode === "BS"
                ? `${resolvedDates.finalAD || "--"} AD`
                : `${resolvedDates.finalBS || "--"} BS`}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}