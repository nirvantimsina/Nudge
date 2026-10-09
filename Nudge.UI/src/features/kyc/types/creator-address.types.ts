// src/features/kyc/types/creator-address.types.ts

export interface CreatorAddressDTO {
  permDistrict: string;
  permMunicipality: string;
  permWardNo: number;
  currentAddressLine: string;
  currentDistrict: string;
  currentWard: number;
  longitude: string;
  latitude: string;
}

export interface AddressFormData {
  permDistrict: string;
  permMunicipality: string;
  permWardNo: number | "";
  currentAddressLine: string;
  currentDistrict: string;
  currentWard: number | "";
  longitude: string;
  latitude: string;
}

export const INITIAL_ADDRESS_FORM_DATA: AddressFormData = {
  permDistrict: "",
  permMunicipality: "",
  permWardNo: "",
  currentAddressLine: "",
  currentDistrict: "",
  currentWard: "",
  longitude: "85.3114",
  latitude: "27.6841",
};

// Bridge: DTO (wire shape, nullable numbers) <-> form state (empty-string sentinel for unset)
export function dtoToAddressForm(dto: CreatorAddressDTO): AddressFormData {
  return {
    ...dto,
    permWardNo: dto.permWardNo ?? "",
    currentWard: dto.currentWard ?? "",
  };
}

export function addressFormToDto(form: AddressFormData): CreatorAddressDTO {
  return {
    ...form,
    permDistrict: form.permDistrict.trim(),
    permMunicipality: form.permMunicipality.trim(),
    permWardNo: form.permWardNo === "" ? 0 : form.permWardNo,
    currentAddressLine: form.currentAddressLine.trim(),
    currentDistrict: form.currentDistrict.trim(),
    currentWard: form.currentWard === "" ? 0 : form.currentWard,
    longitude: form.longitude?.trim() || "85.3114",
    latitude: form.latitude?.trim() || "27.6841",
  };
}
