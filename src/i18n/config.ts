import type { Locale } from "@/types";

export const locales: Locale[] = ["en", "gu", "hi"];

export const defaultLocale: Locale = "en";

export const localeLabels: Record<Locale, string> = {
  en: "English",
  gu: "ગુજરાતી",
  hi: "हिन्दी",
};

export const localeShortLabels: Record<Locale, string> = {
  en: "EN",
  gu: "ગુજરાતી",
  hi: "हिन्दी",
};

export const STORAGE_KEY = "clinic_locale";

export function isLocale(value: string | null | undefined): value is Locale {
  return !!value && (locales as string[]).includes(value);
}

/**
 * Best-effort detection of a supported locale from the browser.
 * Only used on first visit, before any manual selection is stored.
 */
export function detectBrowserLocale(): Locale {
  if (typeof navigator === "undefined") return defaultLocale;
  const candidates = navigator.languages && navigator.languages.length
    ? navigator.languages
    : [navigator.language];

  for (const raw of candidates) {
    const short = raw?.slice(0, 2).toLowerCase();
    if (isLocale(short)) return short;
  }
  return defaultLocale;
}
