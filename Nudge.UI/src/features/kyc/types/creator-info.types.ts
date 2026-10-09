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

export const INITIAL_CREATOR_INFO: CreatorInfoDTO = {
  fullName: "",
  dobAd: "",
  dobBs: "",
  gender: 1, // Default: 1 (Male)
  grandfatherName: "",
  fatherName: "",
  motherName: "",
  spouseName: "",
};
