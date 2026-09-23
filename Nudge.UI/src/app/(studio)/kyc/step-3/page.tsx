"use client";

import React, { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { useCreator } from "@/src/context/CreatorContext";
import { KycStepContainer } from "@/src/components/kyc/KycStepContainer";
import { toast } from "@/lib/toast";
import { MapPin, Info, BadgeCheck } from "lucide-react";
import { FlagSelect } from "@/src/components/common/FlagSelect";
import {
  ALL_DISTRICTS,
  getLocalBodiesByDistrict,
  getLocationMetadata,
} from "@/lib/nepalGeo";

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

export default function KycStepThreePage() {
  const router = useRouter();
  const { summary, refreshSummary } = useCreator();
  const isVerified = summary?.isVerified ?? false;

  const [formData, setFormData] = useState<AddressFormData>({
    permDistrict: "",
    permMunicipality: "",
    permWardNo: "",
    currentAddressLine: "",
    currentDistrict: "",
    currentWard: "",
    longitude: "",
    latitude: "",
  });

  const [isSameAddress, setIsSameAddress] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Dynamic memoized Palikas strictly for the selected district
  const permPalikaOptions = useMemo(() => {
    return getLocalBodiesByDistrict(formData.permDistrict);
  }, [formData.permDistrict]);

  // Hydrate saved record on mount
  // Inside useEffect (Hydration)
useEffect(() => {
  let isMounted = true;

  async function loadSavedAddress() {
    try {
      const res = await fetch("/api/KYC/CreatorAddress", {
        headers: { Accept: "application/json" },
        credentials: "include",
      });

      // Avoid parsing empty bodies or 204/404 responses
      if (!res.ok || res.status === 204) return;

      const text = await res.text();
      if (!text || !text.trim()) return;

      const json = JSON.parse(text);
      const d = json.data || json;

      if (d && isMounted && (d.permDistrict || d.currentDistrict)) {
        setFormData({
          permDistrict: d.permDistrict || d.permdistrict || "",
          permMunicipality: d.permMunicipality || d.permmunicipality || "",
          permWardNo: d.permWardNo ?? d.permwardno ?? "",
          currentAddressLine: d.currentAddressLine || d.currentaddressline || "",
          currentDistrict: d.currentDistrict || d.currentdistrict || "",
          currentWard: d.currentWard ?? d.currentward ?? "",
          longitude: d.longitude,
          latitude: d.latitude,
        });
      }
    } catch (err) {
      console.warn("No existing address record or failed to parse:", err);
    }
  }

  loadSavedAddress();
  return () => {
    isMounted = false;
  };
}, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name.includes("Ward") ? (value === "" ? "" : Number(value)) : value,
    }));
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

  const handleSubmit = async (e?: React.FormEvent, proceedToNext: boolean = false) => {
    if (e) e.preventDefault();
    setErrorMsg(null);

    if (proceedToNext) {
      if (
        !formData.permDistrict.trim() ||
        !formData.permMunicipality.trim() ||
        formData.permWardNo === "" ||
        !formData.currentAddressLine.trim() ||
        !formData.currentDistrict.trim() ||
        formData.currentWard === ""
      ) {
        toast.error("Please fill in all mandatory address fields (*)");
        return;
      }
    }

    setIsSubmitting(true);
    try {
      const res = await fetch("/api/KYC/CreatorAddress", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          permDistrict: formData.permDistrict.trim(),
          permMunicipality: formData.permMunicipality.trim(),
          permWardNo: Number(formData.permWardNo) || 1,
          currentAddressLine: formData.currentAddressLine.trim(),
          currentDistrict: formData.currentDistrict.trim(),
          currentWard: Number(formData.currentWard) || 1,
          longitude: formData.longitude?.trim() || "",
          latitude: formData.latitude?.trim() || "",
        }),
      });

      const rawText = await res.text();
      let resData: any = {};
      if (rawText && rawText.trim()) {
        try {
          resData = JSON.parse(rawText);
        } catch {
          resData = { msg: rawText };
        }
      }

      const isSuccess =
        res.ok &&
        (resData.status === 0 ||
          resData.status === "0" ||
          resData.statusCode === 200);

      if (!isSuccess) {
        throw new Error(
          resData.msg ||
          resData.message ||
          resData.title ||
          "Failed to save address details."
        );
      }

      await refreshSummary();

      if (proceedToNext) {
        toast.success("Address verified & saved!");
        router.push("/kyc/step-4");
      } else {
        toast.success("Address draft saved.");
      }
    } catch (err: any) {
      setErrorMsg(err.message || "Failed to save details. Please try again.");
      toast.error(err.message || "Failed to save details.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <KycStepContainer
      currentStep={3}
      isVerified={isVerified}
      bannerTitle="Nepal Local Governance Act Compliance"
      bannerBadge="Permanent & Current Residence"
      bannerDescription="To disburse creator tip payouts above NPR 20,000/month, Nepal Rastra Bank directives mandate full local level (Palika and Ward) mapping matching your Citizenship Certificate (Nagarikta Pramanpatra)."
      errorMessage={errorMsg}
      isSubmitting={isSubmitting}
      backHref="/kyc/step-2"
      nextHref="/kyc/step-4"
      nextLabel="Save & Proceed to Step 4"
      onSaveDraft={() => handleSubmit(undefined, false)}
      onSubmit={(e) => handleSubmit(e, true)}
    >

      {/* Section A: Permanent Address */}
      <div className="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-outline-variant/60 pb-3">
          <div className="flex items-center gap-2">
            <BadgeCheck size={18} className="text-primary" />
            <h2 className="text-sm font-bold text-on-surface">
              Section A: Permanent Address (स्थायी ठेगाना)
            </h2>
          </div>
          <span className="text-[11px] font-semibold bg-surface-container px-2.5 py-0.5 rounded-full text-on-surface-variant">
            As stated in Citizenship
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          {/* Permanent District */}
          <div className="md:col-span-5 space-y-1">
            <label className="text-xs font-semibold text-on-surface flex justify-between">
              <span>Permanent District (जिल्ला) *</span>
              <span className="text-outline text-[10px]">permdistrict</span>
            </label>
            <FlagSelect
              disabled={isVerified}
              items={ALL_DISTRICTS}
              value={formData.permDistrict}
              placeholder="Select Permanent District"
              onChange={(val: string) => {
                const cleanDistrict = val.split("(")[0].trim();
                const meta = getLocationMetadata(cleanDistrict);

                setFormData((prev) => ({
                  ...prev,
                  permDistrict: cleanDistrict,
                  permMunicipality: "", // Reset child selection
                  latitude: meta?.lat ?? prev.latitude,
                  longitude: meta?.lon ?? prev.longitude,
                }));
              }}
            />
          </div>

          {/* Permanent Palika / Local Body */}
          <div className="md:col-span-5 space-y-1">
            <label className="text-xs font-semibold text-on-surface flex justify-between">
              <span>Municipality / Gaunpalika (नगरपालिका / गा.पा.) *</span>
              <span className="text-outline text-[10px]">permmunicipality</span>
            </label>
            <FlagSelect
              disabled={isVerified || !formData.permDistrict}
              items={permPalikaOptions}
              value={formData.permMunicipality}
              placeholder={
                !formData.permDistrict
                  ? "Select District First"
                  : permPalikaOptions.length === 0
                  ? "No Palikas Found"
                  : "Select Palika / Municipality"
              }
              onChange={(val: string) => {
                const cleanPalika = val.split("(")[0].trim();
                const meta = getLocationMetadata(cleanPalika);

                setFormData((prev) => ({
                  ...prev,
                  permMunicipality: cleanPalika,
                  latitude: meta?.lat ?? prev.latitude,
                  longitude: meta?.lon ?? prev.longitude,
                }));
              }}
            />
          </div>

          {/* Permanent Ward */}
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
              disabled={isVerified}
              value={formData.permWardNo}
              onChange={handleChange}
              placeholder="e.g. 16"
              className="w-full bg-surface-container-lowest border border-outline-variant rounded-xl px-3.5 py-2.5 text-xs text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary disabled:opacity-60 disabled:cursor-not-allowed"
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
            <h2 className="text-sm font-bold text-on-surface">
              Section B: Current / Studio Address (हालको ठेगाना)
            </h2>
          </div>

          <label className="inline-flex items-center gap-2 cursor-pointer select-none">
            <input
              type="checkbox"
              disabled={isVerified}
              checked={isSameAddress}
              onChange={handleToggleSameAddress}
              className="sr-only peer"
            />
            <div className="w-10 h-5 bg-surface-container-high peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-outline-variant after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-primary relative" />
            <span className="text-xs font-semibold text-on-surface">
              Same as Permanent Address
            </span>
          </label>
        </div>

        <p className="text-xs text-on-surface-variant">
          Where you host streams, pack patron rewards, or maintain your creative workspace. Official correspondence and tax clearances will reach this location.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Inputs Column */}
          <div className="lg:col-span-7 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-on-surface">Current District *</label>
                <FlagSelect
                  disabled={isVerified || isSameAddress}
                  items={ALL_DISTRICTS}
                  value={formData.currentDistrict}
                  placeholder="Select Current District"
                  onChange={(val: string) => {
                    const cleanDistrict = val.split("(")[0].trim();
                    setFormData((prev) => ({
                      ...prev,
                      currentDistrict: cleanDistrict,
                    }));
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
                  disabled={isVerified || isSameAddress}
                  value={formData.currentWard}
                  onChange={handleChange}
                  placeholder="e.g. 3"
                  className="w-full bg-surface-container-lowest border border-outline-variant rounded-xl px-3.5 py-2.5 text-xs text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary disabled:opacity-60 disabled:cursor-not-allowed"
                />
              </div>
            </div>

            {/* Current Address Line */}
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-on-surface">
                  Full Current Address Line (टोल / सडक / घर नं.) *
                </label>
                <span className="text-[10px] text-outline">currentaddressline</span>
              </div>
              <textarea
                name="currentAddressLine"
                disabled={isVerified || isSameAddress}
                value={formData.currentAddressLine}
                onChange={handleChange}
                rows={3}
                placeholder="E.g., Jhamsikhel Ward-3, Sanepa Road, Near British School, Lalitpur"
                className="w-full bg-surface-container-lowest border border-outline-variant rounded-xl px-3.5 py-2.5 text-xs text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary disabled:opacity-60 disabled:cursor-not-allowed"
              />
              <span className="text-[11px] text-on-surface-variant block">
                Include popular landmark or chowk for physical courier gifts from patrons.
              </span>
            </div>

            {/* Coordinates */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-on-surface">Latitude</label>
                <input
                  type="text"
                  name="latitude"
                  disabled={isVerified}
                  value={formData.latitude}
                  onChange={handleChange}
                  className="w-full bg-surface-container-lowest border border-outline-variant rounded-xl px-3 py-2 text-xs text-on-surface disabled:opacity-60"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-on-surface">Longitude</label>
                <input
                  type="text"
                  name="longitude"
                  disabled={isVerified}
                  value={formData.longitude}
                  onChange={handleChange}
                  className="w-full bg-surface-container-lowest border border-outline-variant rounded-xl px-3 py-2 text-xs text-on-surface disabled:opacity-60"
                />
              </div>
            </div>
          </div>

          {/* Map Preview */}
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
              {!isVerified && (
                <button
                  type="button"
                  className="text-primary font-semibold hover:underline"
                  onClick={() => {
                    if (navigator.geolocation) {
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
                    }
                  }}
                >
                  Auto-Detect GPS
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </KycStepContainer>
  );
}