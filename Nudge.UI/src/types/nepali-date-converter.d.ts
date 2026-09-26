// src/types/nepali-date-converter.d.ts
declare module "@remotemerge/nepali-date-converter" {
  export interface NepaliDateResult {
    year: number;
    month: number;
    date: number;
    day?: string;
  }

  export default class DateConverter {
    constructor(date?: string | number);
    toBs(): NepaliDateResult;
    toAd(): NepaliDateResult;
  }
}