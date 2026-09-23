// src/components/ui/RadioGroup.tsx
"use client";

import React from "react";

export interface RadioOption<T extends string = string> {
  value: T;
  label: string;
  subLabel?: string;
  icon?: React.ReactNode;
}

interface RadioGroupProps<T extends string = string> {
  label?: string;
  isRequired?: boolean;
  options: RadioOption<T>[];
  value: T;
  onChange: (val: T) => void;
  disabled?: boolean;
  columns?: 2 | 3 | 4;
}

export function RadioGroup<T extends string = string>({
  label,
  isRequired,
  options,
  value,
  onChange,
  disabled = false,
  columns = 3,
}: RadioGroupProps<T>) {
  const colClass = {
    2: "grid-cols-1 sm:grid-cols-2",
    3: "grid-cols-1 sm:grid-cols-3",
    4: "grid-cols-2 sm:grid-cols-4",
  }[columns];

  return (
    <div className="space-y-1.5 w-full">
      {label && (
        <span className="block text-xs font-semibold text-on-surface">
          {label} {isRequired && <span className="text-primary font-bold">*</span>}
        </span>
      )}

      <div className={`grid gap-2.5 ${colClass}`}>
        {options.map((opt) => {
          const isSelected = opt.value === value;
          return (
            <label
              key={opt.value}
              className={`cursor-pointer border p-3 rounded-xl flex items-center gap-2.5 text-xs font-semibold transition-all ${
                isSelected
                  ? "border-primary bg-primary-fixed/30 text-primary font-bold shadow-2xs"
                  : "border-outline-variant hover:border-primary/50 bg-surface-container-lowest text-on-surface"
              } ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              <input
                type="radio"
                value={opt.value}
                checked={isSelected}
                disabled={disabled}
                onChange={() => onChange(opt.value)}
                className="hidden"
              />
              {opt.icon && <span className="shrink-0">{opt.icon}</span>}
              <div className="flex flex-col">
                <span>{opt.label}</span>
                {opt.subLabel && (
                  <span className="text-[10px] text-on-surface-variant font-normal">
                    {opt.subLabel}
                  </span>
                )}
              </div>
            </label>
          );
        })}
      </div>
    </div>
  );
}