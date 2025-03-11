import { encodeHex } from "@std/encoding/hex";

const encoder = new TextEncoder();

export const idHash = async (value: string) => {
  const digest = new Uint8Array(
    await crypto.subtle.digest("SHA-256", encoder.encode(value)),
  );
  for (let i = 32; i < digest.length; i++) {
    digest[i % 32] ^= digest[i];
  }
  return encodeHex(digest);
};
