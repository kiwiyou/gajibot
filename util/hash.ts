import { encodeHex } from "@std/encoding/hex";

const encoder = new TextEncoder();

export const idHash = async (value: string) => {
  const digest = await crypto.subtle.digest("SHA-256", encoder.encode(value));
  return encodeHex(digest.slice(0, 32));
};
