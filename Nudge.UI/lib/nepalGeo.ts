// src/lib/nepalGeo.ts
import rawGeoData from "@/public/data/nepal-divisions.json";
import { DropdownItem } from "@/src/components/common/FlagSelect";

export interface GeoDistrict {
  id: string; // e.g., "NP0101", "NP0327"
  name_en: string; // e.g., "Kathmandu", "Jhapa"
  name_local: string; // e.g., "काठमाडौँ", "झापा"
  slug: string;
  lat: number;
  lon: number;
  parent_id: string;
  parent_name_en: string;
  parent_name_local: string;
  postal_code?: string;
}

export interface GeoLocalUnit {
  id: string; // e.g., "NP0775301"
  name_en: string; // e.g., "Mahakali", "Kirtipur"
  name_local: string;
  slug: string;
  lat: number;
  lon: number;
  parent_id: string; // matches GeoDistrict.id (e.g., "NP0775")
  parent_name_en: string; // matches GeoDistrict.name_en (e.g., "Darchula")
  parent_name_local: string;
  postal_code?: string;
}

// Extract directly from your dataset's top-level `data` dictionary
const districtsData: GeoDistrict[] = (rawGeoData as any)?.data?.district || [];
const localUnitsData: GeoLocalUnit[] = (rawGeoData as any)?.data?.local_unit || [];

// 1. All 77 Districts for the FlagSelect
export const ALL_DISTRICTS: DropdownItem[] = districtsData
  .map((d) => ({
    id: d.name_en,
    label: `${d.name_en} (${d.name_local})`,
  }))
  .sort((a, b) => a.label.localeCompare(b.label));

// 2. Filter Local Units by District
// In src/lib/nepalGeo.ts

export function getLocalBodiesByDistrict(districtInput: string): DropdownItem[] {
  if (!districtInput) return [];

  const clean = districtInput.split("(")[0].trim().toLowerCase();

  const matchedDistrict = districtsData.find(
    (d) =>
      d.name_en.toLowerCase() === clean ||
      d.id.toLowerCase() === clean ||
      d.name_local === districtInput.trim()
  );

  if (!matchedDistrict) return [];

  const units = localUnitsData.filter(
    (u) =>
      u.parent_id === matchedDistrict.id ||
      u.parent_name_en?.toLowerCase() === matchedDistrict.name_en.toLowerCase()
  );

  // Deduplicate by English name to avoid duplicate entries in the dropdown
  const uniqueMap = new Map<string, GeoLocalUnit>();
  units.forEach((u) => {
    if (!uniqueMap.has(u.name_en)) {
      uniqueMap.set(u.name_en, u);
    }
  });

  return Array.from(uniqueMap.values())
    .map((u) => ({
      id: u.id, // Guarantee uniqueness with official code (e.g., NP0444301)
      label: `${u.name_en} (${u.name_local})`,
    }))
    .sort((a, b) => a.label.localeCompare(b.label));
}

// 3. Fast coordinate and postal code lookup for map positioning
export function getLocationMetadata(nameOrId: string): {
  lat: string;
  lon: string;
  postalCode?: string;
} | null {
  if (!nameOrId) return null;
  const clean = nameOrId.split("(")[0].trim().toLowerCase();

  // Try local unit first (more specific pinpoint)
  const unit = localUnitsData.find(
    (u) =>
      u.name_en.toLowerCase() === clean ||
      u.id.toLowerCase() === clean ||
      u.name_local === nameOrId.trim()
  );

  if (unit) {
    return {
      lat: String(unit.lat),
      lon: String(unit.lon),
      postalCode: unit.postal_code,
    };
  }

  // Fallback to district center
  const dist = districtsData.find(
    (d) =>
      d.name_en.toLowerCase() === clean ||
      d.id.toLowerCase() === clean ||
      d.name_local === nameOrId.trim()
  );

  if (dist) {
    return {
      lat: String(dist.lat),
      lon: String(dist.lon),
      postalCode: dist.postal_code,
    };
  }

  return null;
}