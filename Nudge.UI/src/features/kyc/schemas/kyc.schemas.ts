// src/features/kyc/schemas/kyc.schemas.ts
import { z } from "zod";

export const creatorInfoSchema = z.object({
  fullName: z.string().min(1, "Please enter at least your Full Name."),
  dobAd: z.string(),
  dobBs: z.string(),
  gender: z.number(),
  grandfatherName: z.string(),
  fatherName: z.string(),
  motherName: z.string(),
  spouseName: z.string().optional(),
});

// Stricter rules only enforced when the user tries to proceed to the next step
export const creatorInfoProceedSchema = creatorInfoSchema.extend({
  dobAd: z.string().min(1, "Date of birth (AD) is required."),
  dobBs: z.string().min(1, "Date of birth (BS) is required."),
  grandfatherName: z.string().min(1, "Grandfather's name is required."),
  fatherName: z.string().min(1, "Father's name is required."),
  motherName: z.string().min(1, "Mother's name is required."),
});

export const creatorDocsSchema = z.object({
  citizenshipId: z.string(),
  citizenshipIssuedDistrict: z.string(),
  citizenshipIssuedDate: z.string(),
  nid: z.string().nullable(),
  passportId: z.string().nullable(),
  passportExpiryDate: z.string().nullable(),
  panNumber: z.string().nullable(),
  avatarPhotoUrl: z.string(),
  idFrontProofUrl: z.string(),
  idBackProofUrl: z.string(),
  panDocumentUrl: z.string().nullable(),
});

export const creatorDocsProceedSchema = creatorDocsSchema.extend({
  citizenshipId: z.string().min(1, "Citizenship certificate number is required."),
  citizenshipIssuedDistrict: z.string().min(1, "Citizenship issued district is required."),
  citizenshipIssuedDate: z.string().min(1, "Citizenship issue date is required."),
  panNumber: z.string().length(9, "PAN must be exactly 9 digits."),
});

// Form-shaped variants, used by useKycStep directly (permWardNo/currentWard as number | "")
export const addressFormSchema = z.object({
  permDistrict: z.string(),
  permMunicipality: z.string(),
  permWardNo: z.union([z.number(), z.literal("")]),
  currentAddressLine: z.string(),
  currentDistrict: z.string(),
  currentWard: z.union([z.number(), z.literal("")]),
  longitude: z.string(),
  latitude: z.string(),
});

export const addressFormProceedSchema = addressFormSchema.extend({
  permDistrict: z.string().min(1, "Permanent district is required."),
  permMunicipality: z.string().min(1, "Municipality is required."),
  permWardNo: z.number({ message: "Permanent ward is required." }).min(1).max(35),
  currentAddressLine: z.string().min(1, "Current address is required."),
  currentDistrict: z.string().min(1, "Current district is required."),
  currentWard: z.number({ message: "Current ward is required." }).min(1).max(35),
});

export const creatorVerificationSchema = z.object({
  primaryPlatform: z.string(),
  channelUrl: z.string(),
  estimatedAnnualIncome: z.string(),
});

export const creatorVerificationProceedSchema = creatorVerificationSchema.extend({
  primaryPlatform: z.string().min(1, "Please select a primary platform."),
  channelUrl: z
    .string()
    .min(1, "Please provide your primary creator channel/profile URL.")
    .refine(
      (url) => {
        try {
          const parsed = new URL(url);
          return ["http:", "https:"].includes(parsed.protocol);
        } catch {
          return false;
        }
      },
      { message: "Please enter a valid URL (including https://)." }
    ),
});