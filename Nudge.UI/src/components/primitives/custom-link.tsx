import Link, { LinkProps } from "next/link";
import React from "react";

interface CustomLinkProps extends LinkProps {
  children: React.ReactNode;
  variant?: "brand" | "nav" | "subtle";
  className?: string;
}

export function CustomLink({ children, variant = "brand", className = "", ...props }: CustomLinkProps) {
  const baseStyle = "font-medium transition-all duration-200 text-sm tracking-tight inline-block";
  
  const variants = {
    brand: "text-action-cta hover:text-action-hover underline decoration-action-cta/30 underline-offset-4 hover:decoration-action-hover",
    nav: "text-text-main hover:text-action-cta",
    subtle: "text-text-muted hover:text-text-main text-xs",
  };

  return (
    <Link className={`${baseStyle} ${variants[variant]} ${className}`} {...props}>
      {children}
    </Link>
  );
}
