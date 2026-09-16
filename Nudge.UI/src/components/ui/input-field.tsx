"use client";

import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  name: string;
  error?: string | null;
  tabIndex?: number; // 🚀 Explicitly accept tabIndex
}

export function InputField({ label, name, type = "text", error, tabIndex, className = "", ...props }: InputFieldProps) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const isPasswordType = type === "password";
  const resolvedType = isPasswordType && isPasswordVisible ? "text" : type;

  return (
    <div className={`w-full ${className}`}>
      <label className="block text-xs font-semibold text-neutral-600 uppercase tracking-wider mb-2">
        {label}
      </label>
      <div className="relative">
        <input
          name={name}
          type={resolvedType}
          tabIndex={tabIndex} // 🚀 PINS IT DIRECTLY TO THE HTML INPUT TAG
          className={`w-full px-4 py-3 rounded-2xl bg-neutral-50 border text-neutral-900 placeholder-neutral-400 focus:bg-white focus:outline-none transition-all duration-200 text-sm ${
            error 
              ? "border-red-400 focus:border-red-500 focus:ring-4 focus:ring-red-500/10" 
              : "border-neutral-200 focus:border-amber-500 focus:ring-4 focus:ring-amber-500/10"
          } ${isPasswordType ? "pr-12" : ""}`}
          {...props}
        />

        {isPasswordType && (
          <button
            type="button"
            // 🚀 Also block the eye icon button from being tabbed when hidden!
            tabIndex={tabIndex} 
            onClick={() => setIsPasswordVisible(!isPasswordVisible)}
            className="absolute inset-y-0 right-0 pr-4 flex items-center text-neutral-400 hover:text-neutral-600 focus:outline-none transition-colors"
          >
            {isPasswordVisible ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        )}
      </div>
      
      {error && (
        <p className="mt-1.5 text-xs text-red-600 font-medium pl-1">
          {error}
        </p>
      )}
    </div>
  );
}
