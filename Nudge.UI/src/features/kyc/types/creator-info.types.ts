export interface CreatorInfoDTO {
  creatorId?: number;
  fullName: string;
  dobAD: string; // ISO date string YYYY-MM-DD
  dobBS: string; // Bikram Sambat YYYY-MM-DD
  gender: number;
  fatherName: string;
  motherName: string;
  grandfatherName: string;
  spouseName?: string | null;
}

export interface CreatorInfoResponse {
  creatorId: number;
  fullName: string;
  dobAD: string;
  dobBS: string;
  gender: number;
  fatherName: string;
  motherName: string;
  grandfatherName: string;
  spouseName?: string | null;
  createdAt: string;
  updatedAt: string;
  isActive: boolean;
}