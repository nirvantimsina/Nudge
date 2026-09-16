export type CreatorCategory =
  | "all"
  | "streamer"
  | "music"
  | "art-heritage"
  | "tech-writing";

export interface Creator {
  creatorID: string;
  slug: string;
  category: string; 
  name: string;
  description: string;
  nudgeCount: number;
  avatar: string;
  tierName: string;
}

export type CreatorListResponse = Creator[];