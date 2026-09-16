import React from "react";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function Card({ children, className = "", ...props }: CardProps) {
  return (
    <div 
      className={`bg-bg-surface text-text-main rounded-[32px] border border-border-subtle/20 shadow-xs p-10 sm:p-12 transition-all duration-300 ${className}`} 
      {...props}
    >
      {children}
    </div>
  );
}
