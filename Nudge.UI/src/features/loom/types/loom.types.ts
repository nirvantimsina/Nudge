// src/features/loom/types/loom.types.ts
import type { LucideIcon } from "lucide-react";
import type { ApiResponse } from "@/src/types/api.types";

export interface LoomLinkItem {
  link: string;
  title: string;
  iconId: number;
  displayOrder: number;
}

export interface TierDto {
  id: number;
  label: string;
  amount: number;
  note?: string;
}

export interface LoomProfileData {
  avatar?: string;
  name: string;
  description?: string;
  slug: string;
  categoryName?: string;
  isVerified: boolean;
  linksJson: LoomLinkItem[];
  tiers: TierDto[];
}

export type LoomResponse = ApiResponse<LoomProfileData>;

export interface LoomTheme {
  id: string;
  name: string;
  badge: string;
  title: string;
  desc: string;
  specs: string[];
  cardClass: string;
  headerAccentClass: string;
  primaryActionClass: string;
  creatorName: string;
  creatorHandle: string;
  creatorBio: string;
  tile1Text: string;
  tile1Icon: LucideIcon;
  tile3Text: string;
  tile3Icon: LucideIcon;
}
