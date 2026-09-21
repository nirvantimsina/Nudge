export interface ApiResponse<T> {
  data: T;
  status: string;
  msg: string;
}

export interface NudgeCreator {
  id: number;
  slug: string;
  name: string;
  firstName: string;
  bio: string;
  avatar: string;
  isVerified: boolean;
  tiers: NudgeTier[];
  recentNudge: RecentNudge | null;
}

export interface NudgeTier {
  id: number;
  label: string;
  amount: number;
  note: string;
}

export interface RecentNudge {
  displayName: string;
  amount: number;
  message: string;
  createdAt: string;
  nudgeType: string;
}

export interface CreateNudgePayload {
  creatorId: number | string;
  tierId?: number | string;
  amount?: number;
  userId?: number;
  displayName?: string;
  message?: string;
}

export interface CreateNudgeResult {
  id: string;
  paymentUrl: string;
}