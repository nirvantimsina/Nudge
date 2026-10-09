export interface CreatorDocsDTO {
  citizenshipId: string;
  citizenshipIssuedDistrict: string;
  citizenshipIssuedDate: string;
  nid: string | null;
  passportId: string | null;
  passportExpiryDate: string | null;
  panNumber: string | null;
  avatarPhotoUrl: string;
  idFrontProofUrl: string;
  idBackProofUrl: string;
  panDocumentUrl: string | null;
}

export const INITIAL_CREATOR_DOCS: CreatorDocsDTO = {
  citizenshipId: "",
  citizenshipIssuedDistrict: "",
  citizenshipIssuedDate: "",
  nid: null,
  passportId: null,
  passportExpiryDate: null,
  panNumber: null,
  avatarPhotoUrl: "",
  idFrontProofUrl: "",
  idBackProofUrl: "",
  panDocumentUrl: null,
};
