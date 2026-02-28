/**
 * Site-wide config for SEO (canonical URLs, Open Graph, etc.).
 * In production, set NEXT_PUBLIC_SITE_URL in env.
 */
export const SITE_URL =
  typeof process.env.NEXT_PUBLIC_SITE_URL === "string" &&
  process.env.NEXT_PUBLIC_SITE_URL.length > 0
    ? process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "")
    : "https://soundforgeaudio.com";

export const SITE_NAME = "SoundForge Audio";
export const SITE_DESCRIPTION =
  "Premium headphones for music lovers, gamers, and creators. Shop over-ear, in-ear, wireless, and gaming headsets.";
