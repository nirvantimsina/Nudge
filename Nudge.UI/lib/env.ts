// lib/env.ts

export const CLIENT_API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ??
  process.env.NEXT_PUBLIC_API_URL ??
  "http://localhost:5043/api";

export const SERVER_API_BASE_URL =
  process.env.INTERNAL_API_URL ??
  process.env.API_BASE_URL ??
  "http://localhost:5043/api";
