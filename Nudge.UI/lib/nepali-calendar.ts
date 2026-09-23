// src/lib/nepali-calendar.ts

// Days in each month for BS years 2040 to 2085
const BS_MONTH_DAYS: Record<number, number[]> = {
  2040: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
  2041: [31, 31, 32, 31, 32, 30, 30, 29, 30, 29, 30, 30],
  2042: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
  2043: [30, 32, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
  2044: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 31],
  2045: [31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30],
  2046: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
  2047: [30, 32, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
  2048: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 31],
  2049: [31, 31, 32, 31, 32, 30, 30, 30, 29, 29, 30, 31],
  2050: [31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
  2051: [30, 32, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
  2052: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 31],
  2053: [31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30],
  2054: [31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
  2055: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
  2056: [31, 31, 32, 31, 32, 30, 30, 29, 30, 29, 30, 31],
  2057: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
  2058: [30, 32, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
  2059: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 31],
  2060: [31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 31],
  2061: [30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
  2062: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 31],
  2063: [31, 31, 32, 31, 32, 30, 30, 29, 30, 29, 30, 31],
  2064: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
  2065: [30, 32, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
  2066: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 31],
  2067: [31, 31, 32, 31, 32, 30, 30, 30, 29, 29, 30, 31],
  2068: [31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
  2069: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
  2070: [31, 31, 32, 31, 32, 30, 30, 29, 30, 29, 30, 31],
  2071: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
  2072: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
  2073: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 31],
  2074: [31, 31, 32, 31, 32, 30, 30, 30, 29, 29, 30, 31],
  2075: [31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
  2076: [31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
  2077: [31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
  2078: [31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30],
  2079: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 31],
  2080: [31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30],
  2081: [31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
  2082: [30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 30, 30],
  2083: [31, 31, 32, 31, 31, 30, 30, 30, 29, 30, 30, 30],
  2084: [31, 31, 32, 31, 31, 30, 30, 30, 29, 30, 30, 30],
  2085: [31, 32, 31, 32, 30, 31, 30, 30, 29, 30, 30, 30]
};

// Base reference: 2000-01-01 AD = 2056-09-17 BS
const REF_AD = new Date(Date.UTC(2000, 0, 1));
const REF_BS_YEAR = 2056;
const REF_BS_MONTH = 9; // Poush
const REF_BS_DAY = 17;

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
  const parts = adDateStr.split("-").map(Number);
  if (parts.length !== 3) return "";

  const targetDate = new Date(Date.UTC(parts[0], parts[1] - 1, parts[2]));
  const diffDays = Math.floor((targetDate.getTime() - REF_AD.getTime()) / (1000 * 60 * 60 * 24));

  let bsYear = REF_BS_YEAR;
  let bsMonth = REF_BS_MONTH;
  let bsDay = REF_BS_DAY + diffDays;

  if (bsDay > 0) {
    while (true) {
      const monthDays = BS_MONTH_DAYS[bsYear]?.[bsMonth - 1] ?? 30;
      if (bsDay <= monthDays) break;
      bsDay -= monthDays;
      bsMonth++;
      if (bsMonth > 12) {
        bsMonth = 1;
        bsYear++;
      }
    }
  } else {
    while (bsDay <= 0) {
      bsMonth--;
      if (bsMonth < 1) {
        bsMonth = 12;
        bsYear--;
      }
      const monthDays = BS_MONTH_DAYS[bsYear]?.[bsMonth - 1] ?? 30;
      bsDay += monthDays;
    }
  }

  const mm = String(bsMonth).padStart(2, "0");
  const dd = String(bsDay).padStart(2, "0");
  return `${bsYear}-${mm}-${dd}`;
}

/** Convert BS Date (YYYY-MM-DD) to Gregorian AD Date */
export function convertBsToAd(bsDateStr: string): string {
  if (!bsDateStr) return "";
  const parts = bsDateStr.split("-").map(Number);
  if (parts.length !== 3) return "";

  const [bsYear, bsMonth, bsDay] = parts;
  if (!BS_MONTH_DAYS[bsYear]) return "";

  // Accumulate day difference relative to REF_BS
  let dayOffset = 0;

  if (bsYear >= REF_BS_YEAR) {
    for (let y = REF_BS_YEAR; y < bsYear; y++) {
      const daysInYear = BS_MONTH_DAYS[y]?.reduce((a, b) => a + b, 0) ?? 365;
      dayOffset += daysInYear;
    }
    for (let m = 1; m < bsMonth; m++) {
      dayOffset += BS_MONTH_DAYS[bsYear][m - 1];
    }
    dayOffset += bsDay;

    // Deduct ref base point
    let refDaysFromStartOfYear = 0;
    for (let m = 1; m < REF_BS_MONTH; m++) {
      refDaysFromStartOfYear += BS_MONTH_DAYS[REF_BS_YEAR][m - 1];
    }
    refDaysFromStartOfYear += REF_BS_DAY;
    dayOffset -= refDaysFromStartOfYear;
  } else {
    // Handling years before 2056 BS
    for (let y = bsYear; y < REF_BS_YEAR; y++) {
      const daysInYear = BS_MONTH_DAYS[y]?.reduce((a, b) => a + b, 0) ?? 365;
      dayOffset -= daysInYear;
    }
    for (let m = 1; m < bsMonth; m++) {
      dayOffset += BS_MONTH_DAYS[bsYear][m - 1];
    }
    dayOffset += bsDay;

    let refDaysFromStartOfYear = 0;
    for (let m = 1; m < REF_BS_MONTH; m++) {
      refDaysFromStartOfYear += BS_MONTH_DAYS[REF_BS_YEAR][m - 1];
    }
    refDaysFromStartOfYear += REF_BS_DAY;
    dayOffset -= refDaysFromStartOfYear;
  }

  const resultAd = new Date(REF_AD.getTime() + dayOffset * 86400000);
  return resultAd.toISOString().split("T")[0];
}