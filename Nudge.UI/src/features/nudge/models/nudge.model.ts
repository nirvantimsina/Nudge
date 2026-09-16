export interface NudgeCreator {
  id: string;
  slug: string;
  name: string;
  firstname: string;
  bio: string;
  avatar: string;
  isVerified: boolean;
  tiers: NudgeTier[];
  recentnudge: RecentNudge | null;
}

export interface NudgeTier {
  id: string;
  label: string;
  amount: number;
  note: string;
}

export interface RecentNudge {
  displayname: string;
  amount: number;
  message: string;
  createdAt: string;
  nudgetype: string;
}

export interface CreateNudgePayload {
  creatorid: string;
  /** Present when the sender picked a preset tier */
  tierid?: string;
  /** Present when the sender picked a custom amount instead */
  amount?: number;
  userid?: number,
  displayname?: string;
  message?: string;
}

export interface CreateNudgeResult {
  id: string;
  paymentUrl: string;
}
