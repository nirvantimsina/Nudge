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

export interface LoomResponse {
  data: LoomProfileData;
  status: string;
  msg: string;
}