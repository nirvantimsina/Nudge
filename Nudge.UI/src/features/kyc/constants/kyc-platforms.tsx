// src/features/kyc/constants/kyc-platforms.tsx
import React from "react";
import { Globe } from "lucide-react";
import type { CreatorVerificationDTO } from "../types/creator-verification.types";

export interface PlatformConfig {
  id: string;
  label: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  placeholder: string;
}

export const YoutubeIcon = ({ size = 20, className = "" }: { size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
  </svg>
);

export const InstagramIcon = ({ size = 20, className = "" }: { size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

export const TikTokIcon = ({ size = 20, className = "" }: { size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 3 15.69a6.34 6.34 0 0 0 6.33 6.31 6.33 6.33 0 0 0 6.33-6.31V8.6a8.28 8.28 0 0 0 4.84 1.54v-3.4a4.85 4.85 0 0 1-.91-.05z" />
  </svg>
);

export const FacebookIcon = ({ size = 20, className = "" }: { size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);

export const TwitchIcon = ({ size = 20, className = "" }: { size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714Z" />
  </svg>
);

export const KYC_PLATFORMS: PlatformConfig[] = [
  { id: "YouTube", label: "YouTube", icon: YoutubeIcon, placeholder: "https://youtube.com/@yourchannel" },
  { id: "Instagram", label: "Instagram", icon: InstagramIcon, placeholder: "https://instagram.com/yourhandle" },
  { id: "TikTok", label: "TikTok", icon: TikTokIcon, placeholder: "https://tiktok.com/@yourhandle" },
  { id: "Facebook", label: "Facebook Page", icon: FacebookIcon, placeholder: "https://facebook.com/yourpage" },
  { id: "Twitch", label: "Twitch", icon: TwitchIcon, placeholder: "https://twitch.tv/yourhandle" },
  { id: "Website", label: "Personal Portfolio", icon: Globe, placeholder: "https://yourdomain.com" },
];

export const KYC_INCOME_BRACKETS = [
  { value: "Under NPR 200,000", label: "Under NPR 2 Lakhs / yr (Casual Creator)" },
  { value: "NPR 200,000 - 500,000", label: "NPR 2 - 5 Lakhs / yr (Emerging Creator)" },
  { value: "NPR 500,000 - 1,500,000", label: "NPR 5 - 15 Lakhs / yr (Mid-tier Creator)" },
  { value: "Above NPR 1,500,000", label: "Above NPR 15 Lakhs / yr (Professional Studio)" },
];

export const INITIAL_VERIFICATION_FORM_DATA: CreatorVerificationDTO = {
  primaryPlatform: "YouTube",
  channelUrl: "",
  estimatedAnnualIncome: "NPR 200,000 - 500,000",
};
