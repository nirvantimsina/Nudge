// src/lib/nepali-calendar.ts
import DateConverter from "@remotemerge/nepali-date-converter";

export const NEPALI_MONTHS = [
  { en: "Baisakh", np: "बैशाख", num: 1 },
  { en: "Jestha", np: "जेठ", num: 2 },
  { en: "Ashadh", np: "असार", num: 3 },
  { en: "Shrawan", np: "साउन", num: 4 },
  { en: "Bhadra", np: "भदौ", num: 5 },
  { en: "Ashwin", np: "असोज", num: 6 },
  { en: "Kartik", np: "कात्तिक", num: 7 },
  { en: "Mangsir", np: "मंसिर", num: 8 },
  { en: "Poush", np: "पुष", num: 9 },
  { en: "Magh", np: "माघ", num: 10 },
  { en: "Falgun", np: "फागुन", num: 11 },
  { en: "Chaitra", np: "चैत", num: 12 },
];

/** Convert AD Date (YYYY-MM-DD) to Bikram Sambat (BS) */
export function convertAdToBs(adDateStr: string): string {
  if (!adDateStr) return "";
  try {
    const result = new DateConverter(adDateStr).toBs();
    const mm = String(result.month).padStart(2, "0");
    const dd = String(result.date).padStart(2, "0");
    return `${result.year}-${mm}-${dd}`;
  } catch {
    return "";
  }
}

/** Convert BS Date (YYYY-MM-DD) to Gregorian AD Date */
export function convertBsToAd(bsDateStr: string): string {
  if (!bsDateStr) return "";
  try {
    const result = new DateConverter(bsDateStr).toAd();
    const mm = String(result.month).padStart(2, "0");
    const dd = String(result.date).padStart(2, "0");
    return `${result.year}-${mm}-${dd}`;
  } catch {
    return "";
  }
}