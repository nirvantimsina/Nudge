// src/app/kyc/step-3/page.tsx
"use client";

import React, { useMemo, useState } from "react";
import { useCreator } from "@/src/context/CreatorContext";
import { KycStepContainer } from "@/src/components/kyc/KycStepContainer";
import { toast } from "@/lib/toast";
import { MapPin, Info, BadgeCheck, AlertCircle, Navigation } from "lucide-react";
import { FlagSelect } from "@/src/components/common/FlagSelect";
import { ALL_DISTRICTS, getLocalBodiesByDistrict, getLocationMetadata } from "@/lib/nepalGeo";
import { kycService } from "@/src/features/kyc/services/kyc.service";
import { addressFormSchema, addressFormProceedSchema } from "@/src/features/kyc/schemas/kyc.schemas";
import { CreatorAddressDTO } from "@/src/features/kyc/types/creator-address.types";
import { useKycStep } from "@/src/features/kyc/hooks/useKycStep";
import Loading from "@/src/app/loading";

interface AddressFormData {
  permDistrict: string;
  permMunicipality: string;
  permWardNo: number | "";
  currentAddressLine: string;
  currentDistrict: string;
  currentWard: number | "";
  longitude: string;
  latitude: string;
}

const INITIAL_FORM_DATA: AddressFormData = {
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
function dtoToForm(dto: CreatorAddressDTO): AddressFormData {
  return {
    ...dto,
    permWardNo: dto.permWardNo ?? "",
    currentWard: dto.currentWard ?? "",
  };
}

function formToDto(form: AddressFormData): CreatorAddressDTO {
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

export default function KycStepThreePage() {
  const { summary, isLocked } = useCreator();
  const isVerified = summary?.isVerified ?? false;
  const [isSameAddress, setIsSameAddress] = useState(false);

  const { formData, setFormData, isLoading, isSubmitting, errorMsg, submit } = useKycStep<AddressFormData>({
    load: async () => {
      const dto = await kycService.getCreatorAddress();
      return dto ? dtoToForm(dto) : null;
    },
    save: (form) => kycService.saveCreatorAddress(formToDto(form)),
    initial: INITIAL_FORM_DATA,
    draftSchema: addressFormSchema,
    proceedSchema: addressFormProceedSchema,
    nextRoute: "/kyc/step-4",
  });

  const permPalikaOptions = useMemo(() => getLocalBodiesByDistrict(formData.permDistrict), [formData.permDistrict]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const updated = {
        ...prev,
        [name]: name.includes("Ward") ? (value === "" ? "" : Number(value)) : value,
      };
      if (isSameAddress && name === "permWardNo") {
        updated.currentWard = updated.permWardNo;
        updated.currentAddressLine = `Ward ${updated.permWardNo || ""}, ${updated.permMunicipality}, ${updated.permDistrict}, Nepal`;
      }
      return updated;
    });
  };

  const handleToggleSameAddress = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    setIsSameAddress(checked);
    if (checked) {
      setFormData((prev) => ({
        ...prev,
        currentDistrict: prev.permDistrict,
        currentWard: prev.permWardNo,
        currentAddressLine:
          prev.permMunicipality && prev.permDistrict
            ? `Ward ${prev.permWardNo || ""}, ${prev.permMunicipality}, ${prev.permDistrict}, Nepal`
            : prev.currentAddressLine,
      }));
    }
  };

  const handleAutoDetectGps = () => {
    if (!navigator.geolocation) {
      toast.error("Geolocation is not supported by your browser.");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setFormData((p) => ({
          ...p,
          latitude: pos.coords.latitude.toFixed(4),
          longitude: pos.coords.longitude.toFixed(4),
        }));
        toast.success("GPS Location detected!");
      },
      () => {
        toast.error("Could not access location. Please check browser permissions.");
      }
    );
  };

  const isCurrentAddressLocked = isLocked || isSameAddress;

  if (isLoading) {
    return <Loading />;
  }

  return (
    <KycStepContainer
      currentStep={3}
      isVerified={isVerified}
      isLocked={isLocked}
      bannerTitle="Nepal Local Governance Act Compliance"
      bannerBadge="Permanent & Current Residence"
      bannerDescription="To disburse creator tip payouts above NPR 20,000/month, Nepal Rastra Bank directives mandate full local level (Palika and Ward) mapping matching your Citizenship Certificate (Nagarikta Pramanpatra)."
      errorMessage={errorMsg}
      isSubmitting={isSubmitting}
      backHref="/kyc/step-2"
      nextLabel="Save & Proceed to Step 4"
      onSaveDraft={() => submit(undefined, false)}
      onSubmit={(e) => submit(e, true)}
    >
      <div className="space-y-6">
        {errorMsg && (
          <div className="p-4 rounded-xl bg-error-container/60 border border-error/30 text-on-error-container text-xs flex items-center gap-2">
            <AlertCircle size={16} className="text-error shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Section A: Permanent Address */}
        <div className="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-outline-variant/60 pb-3">
            <div className="flex items-center gap-2">
              <BadgeCheck size={18} className="text-primary" />
              <h2 className="text-sm font-bold text-on-surface">Section A: Permanent Address (स्थायी ठेगाना)</h2>
            </div>
            <span className="text-[11px] font-semibold bg-surface-container px-2.5 py-0.5 rounded-full text-on-surface-variant">
              As stated in Citizenship
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            <div className="md:col-span-5 space-y-1">
              <label className="text-xs font-semibold text-on-surface flex justify-between">
                <span>Permanent District (जिल्ला) *</span>
              </label>
              <FlagSelect
                disabled={isLocked}
                items={ALL_DISTRICTS}
                value={formData.permDistrict}
                placeholder="Select Permanent District"
                onChange={(val: string) => {
                  const cleanDistrict = val.split("(")[0].trim();
                  const meta = getLocationMetadata(cleanDistrict);
                  setFormData((prev) => {
                    const updated = {
                      ...prev,
                      permDistrict: cleanDistrict,
                      permMunicipality: "",
                      latitude: meta?.lat ?? prev.latitude,
                      longitude: meta?.lon ?? prev.longitude,
                    };
                    if (isSameAddress) {
                      updated.currentDistrict = cleanDistrict;
                      updated.currentAddressLine = `Ward ${prev.permWardNo || ""}, ${cleanDistrict}, Nepal`;
                    }
                    return updated;
                  });
                }}
              />
            </div>

            <div className="md:col-span-5 space-y-1">
              <label className="text-xs font-semibold text-on-surface flex justify-between">
                <span>Municipality / Gaunpalika (नगरपालिका / गा.पा.) *</span>
              </label>
              <FlagSelect
                disabled={isLocked || !formData.permDistrict}
                items={permPalikaOptions}
                value={formData.permMunicipality}
                placeholder={
                  !formData.permDistrict ? "Select District First" : permPalikaOptions.length === 0 ? "No Palikas Found" : "Select Palika / Municipality"
                }
                onChange={(val: string) => {
                  const cleanPalika = val.split("(")[0].trim();
                  const meta = getLocationMetadata(cleanPalika);
                  setFormData((prev) => {
                    const updated = {
                      ...prev,
                      permMunicipality: cleanPalika,
                      latitude: meta?.lat ?? prev.latitude,
                      longitude: meta?.lon ?? prev.longitude,
                    };
                    if (isSameAddress) {
                      updated.currentAddressLine = `Ward ${prev.permWardNo || ""}, ${cleanPalika}, ${prev.permDistrict}, Nepal`;
                    }
                    return updated;
                  });
                }}
              />
            </div>

            <div className="md:col-span-2 space-y-1">
              <label className="text-xs font-semibold text-on-surface flex justify-between">
                <span>Ward (वडा) *</span>
                <span className="text-outline text-[10px]">1-35</span>
              </label>
              <input
                type="number"
                min={1}
                max={35}
                name="permWardNo"
                disabled={isLocked}
                value={formData.permWardNo}
                onChange={handleChange}
                placeholder="e.g. 16"
                className={`w-full rounded-xl px-3.5 py-2.5 text-xs transition-colors focus:outline-none ${
                  isLocked
                    ? "bg-surface-container-low/70 border border-outline-variant/60 text-on-surface/70 cursor-not-allowed select-none shadow-none"
                    : "bg-surface-container-lowest border border-outline-variant text-on-surface focus:border-primary focus:ring-1 focus:ring-primary shadow-xs"
                }`}
              />
            </div>
          </div>

          <div className="flex items-center gap-2 p-2.5 rounded-xl bg-surface-container-low text-on-surface-variant text-xs">
            <Info size={15} className="text-secondary shrink-0" />
            <span>Must match the permanent address printed on the Citizenship Card uploaded in Step 2.</span>
          </div>
        </div>

        {/* Section B: Current / Operational Studio Address */}
        <div className="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-outline-variant/60 pb-3 gap-2">
            <div className="flex items-center gap-2">
              <MapPin size={18} className="text-primary" />
              <h2 className="text-sm font-bold text-on-surface">Section B: Current / Studio Address (हालको ठेगाना)</h2>
            </div>

            <label className={`inline-flex items-center gap-2 select-none ${isLocked ? "cursor-not-allowed opacity-75" : "cursor-pointer"}`}>
              <input
                type="checkbox"
                disabled={isLocked}
                checked={isSameAddress}
                onChange={handleToggleSameAddress}
                className="sr-only peer"
              />
              <div className="w-10 h-5 bg-surface-container-high peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-outline-variant after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-primary relative" />
              <span className="text-xs font-semibold text-on-surface">Same as Permanent Address</span>
            </label>
          </div>

          <p className="text-xs text-on-surface-variant leading-relaxed">
            Where you host streams, pack patron rewards, or maintain your creative workspace. Official correspondence and tax clearances will reach this location.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-7 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-on-surface">Current District *</label>
                  <FlagSelect
                    disabled={isCurrentAddressLocked}
                    items={ALL_DISTRICTS}
                    value={formData.currentDistrict}
                    placeholder="Select Current District"
                    onChange={(val: string) => {
                      const cleanDistrict = val.split("(")[0].trim();
                      setFormData((prev) => ({ ...prev, currentDistrict: cleanDistrict }));
                    }}
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-on-surface">Current Ward *</label>
                  <input
                    type="number"
                    min={1}
                    max={35}
                    name="currentWard"
                    disabled={isCurrentAddressLocked}
                    value={formData.currentWard}
                    onChange={handleChange}
                    placeholder="e.g. 3"
                    className={`w-full rounded-xl px-3.5 py-2.5 text-xs transition-colors focus:outline-none ${
                      isCurrentAddressLocked
                        ? "bg-surface-container-low/70 border border-outline-variant/60 text-on-surface/70 cursor-not-allowed select-none shadow-none"
                        : "bg-surface-container-lowest border border-outline-variant text-on-surface focus:border-primary focus:ring-1 focus:ring-primary shadow-xs"
                    }`}
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-on-surface">Full Current Address Line (टोल / सडक / घर नं.) *</label>
                <textarea
                  name="currentAddressLine"
                  disabled={isCurrentAddressLocked}
                  value={formData.currentAddressLine}
                  onChange={handleChange}
                  rows={3}
                  placeholder="E.g., Jhamsikhel Ward-3, Sanepa Road, Near British School, Lalitpur"
                  className={`w-full rounded-xl px-3.5 py-2.5 text-xs transition-colors focus:outline-none resize-none ${
                    isCurrentAddressLocked
                      ? "bg-surface-container-low/70 border border-outline-variant/60 text-on-surface/70 cursor-not-allowed select-none shadow-none"
                      : "bg-surface-container-lowest border border-outline-variant text-on-surface focus:border-primary focus:ring-1 focus:ring-primary shadow-xs"
                  }`}
                />
                <span className="text-[11px] text-on-surface-variant block">
                  Include popular landmark or chowk for physical courier gifts from patrons.
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[11px] font-semibold text-on-surface">Latitude</label>
                  <input
                    type="text"
                    name="latitude"
                    disabled={isLocked}
                    value={formData.latitude}
                    onChange={handleChange}
                    className={`w-full rounded-xl px-3 py-2 text-xs transition-colors focus:outline-none ${
                      isLocked
                        ? "bg-surface-container-low/70 border border-outline-variant/60 text-on-surface/70 cursor-not-allowed select-none"
                        : "bg-surface-container-lowest border border-outline-variant text-on-surface focus:border-primary focus:ring-1 focus:ring-primary"
                    }`}
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[11px] font-semibold text-on-surface">Longitude</label>
                  <input
                    type="text"
                    name="longitude"
                    disabled={isLocked}
                    value={formData.longitude}
                    onChange={handleChange}
                    className={`w-full rounded-xl px-3 py-2 text-xs transition-colors focus:outline-none ${
                      isLocked
                        ? "bg-surface-container-low/70 border border-outline-variant/60 text-on-surface/70 cursor-not-allowed select-none"
                        : "bg-surface-container-lowest border border-outline-variant text-on-surface focus:border-primary focus:ring-1 focus:ring-primary"
                    }`}
                  />
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 flex flex-col gap-2">
              <div className="flex items-center justify-between text-xs font-semibold text-on-surface">
                <span>Pinpoint Geolocation</span>
                <span className="text-[11px] text-tertiary font-bold flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-tertiary animate-pulse" /> GPS Coordinates
                </span>
              </div>

              <div className="relative rounded-2xl overflow-hidden border border-outline-variant bg-surface-container h-56 lg:h-full min-h-[220px] flex items-center justify-center">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCuH_-YnyiLmksiNaymkgRqJHLRJyJiayqoJu3OicUkWApCLeZA3PumFJvqy2x37RTUGCTUJHxuRf2AGK-LG8KE8OByleVzIwqlvtoq1OTKVuRSZMnN8lx6nSQo7BtIGXVa4sQDHJSmHJsNUIuKp3QfOo3N5s2o60e2VeS-xkbQIc-Qz0GZnA2AYsBbFXpzuF0LN_AnVP98pMOK5MI2ncuaWko4JGBBunHPHeaJoeW_FZ9zz3lmhlYe"
                  alt="Kathmandu Valley Map"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex flex-col justify-between p-3 pointer-events-none">
                  <div className="self-end bg-surface-container-lowest/90 backdrop-blur px-2.5 py-0.5 rounded-md text-[11px] font-mono border border-outline-variant/60 shadow-xs">
                    {formData.latitude}° N, {formData.longitude}° E
                  </div>
                  <div className="flex items-center gap-2 text-white">
                    <div className="w-7 h-7 rounded-full bg-primary text-white flex items-center justify-center shadow-lg border-2 border-white">
                      <MapPin size={15} />
                    </div>
                    <div>
                      <div className="text-xs font-bold leading-tight">
                        {formData.currentDistrict || formData.permDistrict || "Nepal"} (Ward {formData.currentWard || formData.permWardNo || 1})
                      </div>
                      <div className="text-[10px] text-white/80">Creator Studio Hub</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between text-[11px] text-on-surface-variant px-1">
                <span>
                  Delivery Hub: <strong>{formData.currentDistrict || "Local"} Beat</strong>
                </span>
                {!isLocked && (
                  <button
                    type="button"
                    className="text-primary font-semibold hover:underline inline-flex items-center gap-1 cursor-pointer"
                    onClick={handleAutoDetectGps}
                  >
                    <Navigation size={12} />
                    Auto-Detect GPS
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </KycStepContainer>
  );
}