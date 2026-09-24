import type { Locale } from "@/types";
import { en } from "./locales/en";
import { gu } from "./locales/gu";
import { hi } from "./locales/hi";
import type { Translations } from "./locales/en";

export const dictionaries: Record<Locale, Translations> = { en, gu, hi };

export type { Translations };

/** Dot-path union of every leaf key in the translation dictionary, e.g. "hero.title". */
type DotPaths<T, Prefix extends string = ""> = T extends object
  ? {
      [K in keyof T & string]: T[K] extends object
        ? DotPaths<T[K], `${Prefix}${K}.`>
        : `${Prefix}${K}`;
    }[keyof T & string]
  : never;

export type TranslationKey = DotPaths<Translations>;

function getByPath(obj: unknown, path: string): unknown {
  return path.split(".").reduce<unknown>((acc, part) => {
    if (acc && typeof acc === "object" && part in (acc as Record<string, unknown>)) {
      return (acc as Record<string, unknown>)[part];
    }
    return undefined;
  }, obj);
}

/**
 * Resolve a translation key for a locale, interpolating {placeholders}.
 * Falls back to English, then to the raw key, so the UI never breaks.
 */
export function translate(
  locale: Locale,
  key: TranslationKey,
  vars?: Record<string, string | number>
): string {
  const raw =
    getByPath(dictionaries[locale], key) ?? getByPath(dictionaries.en, key) ?? key;

  let result = typeof raw === "string" ? raw : key;

  if (vars) {
    for (const [varKey, value] of Object.entries(vars)) {
      result = result.replace(new RegExp(`\\{${varKey}\\}`, "g"), String(value));
    }
  }

  return result;
}
