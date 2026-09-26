export interface CreatorInfoDTO {
  creatorId?: number;
  fullName: string;
  dobAd: string; // ISO date string YYYY-MM-DD
  dobBs: string; // Bikram Sambat YYYY-MM-DD
  gender: number;
  fatherName: string;
  motherName: string;
  grandfatherName: string;
  spouseName?: string | null;
}
