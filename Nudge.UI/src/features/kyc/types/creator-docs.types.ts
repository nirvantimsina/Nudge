export interface CreatorDocsDTO {
    citizenshipId: string,
    citizenshipIssuedDistrict: string,
    citizenshipIssuedDate: string,
    nid: string | null,
    passportId: string | null,
    passportExpiryDate: string | null,
    panNumber: string | null,
    avatarPhotoUrl: string,
    idFrontProofUrl: string,
    idBackProofUrl: string,
    panDocumentUrl: string | null,
}
