// src/components/studio/StudioContainer.tsx
"use client";

import React from "react";
import { AlertCircle, LucideIcon } from "lucide-react";

interface StudioContainerProps {
  children: React.ReactNode;
  /** Max width constraint. Defaults to max-w-5xl, dashboards can use max-w-7xl or max-w-full */
  maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl" | "4xl" | "5xl" | "6xl" | "7xl" | "full";
  className?: string;
}

const maxWidthMap = {
  sm: "max-w-screen-sm",
  md: "max-w-screen-md",
  lg: "max-w-screen-lg",
  xl: "max-w-xl",
  "2xl": "max-w-2xl",
  "4xl": "max-w-4xl",
  "5xl": "max-w-5xl",
  "6xl": "max-w-6xl",
  "7xl": "max-w-7xl",
  full: "max-w-full",
};

export function StudioContainer({
  children,
  maxWidth = "5xl",
  className = "",
}: StudioContainerProps) {
  return (
    <div
      className={`w-full mx-auto px-4 lg:px-8 py-8 ${maxWidthMap[maxWidth]} ${className}`}
    >
      {children}
    </div>
  );
}

// -------------------------------------------------------------
// Sub-component: Header (Breadcrumbs, Page Title, Action Buttons)
// -------------------------------------------------------------
interface StudioHeaderProps {
  title: string;
  subtitle?: string;
  badge?: React.ReactNode;
  actions?: React.ReactNode;
  className?: string;
}

StudioContainer.Header = function StudioHeader({
  title,
  subtitle,
  badge,
  actions,
  className = "",
}: StudioHeaderProps) {
  return (
    <div
      className={`flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 ${className}`}
    >
      <div className="space-y-1">
        <div className="flex items-center gap-2 flex-wrap">
          <h1 className="font-headline-md text-headline-md font-bold text-on-surface tracking-tight">
            {title}
          </h1>
          {badge}
        </div>
        {subtitle && (
          <p className="font-body-md text-body-sm text-on-surface-variant">
            {subtitle}
          </p>
        )}
      </div>
      {actions && (
        <div className="flex items-center gap-2.5 shrink-0">{actions}</div>
      )}
    </div>
  );
};

// -------------------------------------------------------------
// Sub-component: Banner (Compliance, Notice, Alert Callouts)
// -------------------------------------------------------------
interface StudioBannerProps {
  icon?: LucideIcon;
  title: string;
  description: React.ReactNode;
  badge?: string;
  action?: React.ReactNode;
  variant?: "default" | "warning" | "error" | "tertiary";
  className?: string;
}

StudioContainer.Banner = function StudioBanner({
  icon: Icon,
  title,
  description,
  badge,
  action,
  variant = "default",
  className = "",
}: StudioBannerProps) {
  const variantStyles = {
    default:
      "bg-surface-container-low border-outline-variant text-on-surface",
    warning:
      "bg-secondary-fixed/30 border-secondary-container/50 text-on-surface",
    error: "bg-error-container/40 border-error/30 text-on-error-container",
    tertiary:
      "bg-tertiary-fixed/30 border-tertiary-container/30 text-on-tertiary-fixed",
  };

  const iconStyles = {
    default: "bg-surface-container text-primary",
    warning: "bg-secondary-fixed text-secondary",
    error: "bg-error text-on-error",
    tertiary: "bg-tertiary text-on-tertiary",
  };

  return (
    <div
      className={`p-5 rounded-2xl border flex flex-col sm:flex-row items-start gap-4 mb-6 ${variantStyles[variant]} ${className}`}
    >
      {Icon && (
        <div
          className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${iconStyles[variant]}`}
        >
          <Icon size={20} />
        </div>
      )}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <h3 className="text-sm font-bold text-on-surface">{title}</h3>
          {badge && (
            <span className="bg-primary-fixed text-on-primary-fixed font-bold text-[9px] uppercase px-2 py-0.5 rounded tracking-wider">
              {badge}
            </span>
          )}
        </div>
        <div className="text-xs text-on-surface-variant mt-1 leading-relaxed">
          {description}
        </div>
      </div>
      {action && <div className="shrink-0 self-start sm:self-auto">{action}</div>}
    </div>
  );
};

// -------------------------------------------------------------
// Sub-component: Card (Clean content panels, form groups, metric cards)
// -------------------------------------------------------------
interface StudioCardProps {
  children: React.ReactNode;
  title?: string;
  tag?: string;
  headerAction?: React.ReactNode;
  className?: string;
}

StudioContainer.Card = function StudioCard({
  children,
  title,
  tag,
  headerAction,
  className = "",
}: StudioCardProps) {
  return (
    <div
      className={`bg-surface-container-lowest p-6 md:p-8 rounded-2xl border border-outline-variant shadow-sm ${className}`}
    >
      {(title || tag || headerAction) && (
        <div className="border-b border-outline-variant pb-4 mb-6 flex justify-between items-end flex-wrap gap-2">
          <div>
            {tag && (
              <span className="text-[11px] font-bold text-primary tracking-wider uppercase block">
                {tag}
              </span>
            )}
            {title && (
              <h2 className="font-headline-sm text-lg font-bold text-on-surface">
                {title}
              </h2>
            )}
          </div>
          {headerAction}
        </div>
      )}
      {children}
    </div>
  );
};

// -------------------------------------------------------------
// Sub-component: Footer (Actions, pagination, submission controls)
// -------------------------------------------------------------
interface StudioFooterProps {
  children: React.ReactNode;
  className?: string;
}

StudioContainer.Footer = function StudioFooter({
  children,
  className = "",
}: StudioFooterProps) {
  return (
    <div
      className={`pt-6 border-t border-outline-variant flex flex-col sm:flex-row items-center justify-between gap-4 mt-6 ${className}`}
    >
      {children}
    </div>
  );
};