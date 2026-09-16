import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: "nudge" | "outline" | "tint";
  isLoading?: boolean;
}

export function Button({ children, variant = "nudge", isLoading = false, className = "", ...props }: ButtonProps) {
  // Baseline configuration with flexible centering 
  const baseStyle = "w-full font-semibold py-3.5 px-6 rounded-2xl active:scale-[0.99] transition-all duration-200 flex items-center justify-center disabled:opacity-50 disabled:pointer-events-none text-sm tracking-wide shadow-xs cursor-pointer";

  const variants = {
    nudge: "bg-action-cta text-white hover:bg-action-hover",
    outline: "bg-transparent border border-border-subtle text-text-main hover:bg-bg-app",
    tint: "bg-action-light text-action-cta hover:opacity-90",
  };

  return (
    <button 
      className={`${baseStyle} ${variants[variant]} ${className}`} 
      disabled={isLoading} 
      {...props}
    >
      {isLoading ? (
        <span className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 bg-current rounded-full animate-pulse" />
          Processing...
        </span>
      ) : (
        children
      )}
    </button>
  );
}