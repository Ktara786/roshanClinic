"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown, Check } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageProvider";
import { locales, localeLabels, localeShortLabels } from "@/i18n/config";
import { cn } from "@/lib/cn";

export default function LanguageSwitcher({
  variant = "header",
}: {
  variant?: "header" | "inline";
}) {
  const { locale, setLocale, t } = useLanguage();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  if (variant === "inline") {
    return (
      <div className="flex flex-wrap gap-2" role="group" aria-label={t("a11y.languageSelector")}>
        {locales.map((l) => (
          <button
            key={l}
            onClick={() => setLocale(l)}
            aria-pressed={locale === l}
            className={cn(
              "rounded-full border px-4 py-2 text-sm font-medium transition-colors",
              locale === l
                ? "border-primary bg-primary text-ivory"
                : "border-charcoal/15 text-charcoal hover:border-primary/50"
            )}
          >
            {localeLabels[l]}
          </button>
        ))}
      </div>
    );
  }

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={t("a11y.languageSelector")}
        className="flex items-center gap-1.5 rounded-full border border-charcoal/15 px-3.5 py-1.5 text-sm font-medium text-charcoal transition-colors hover:border-primary/50"
      >
        <span>{localeShortLabels[locale]}</span>
        <ChevronDown className="h-3.5 w-3.5" aria-hidden="true" />
      </button>

      {open && (
        <ul
          role="listbox"
          aria-label={t("a11y.languageSelector")}
          className="absolute right-0 z-50 mt-2 w-40 overflow-hidden rounded-xl border border-charcoal/10 bg-surface py-1 shadow-lg"
        >
          {locales.map((l) => (
            <li key={l} role="option" aria-selected={locale === l}>
              <button
                type="button"
                onClick={() => {
                  setLocale(l);
                  setOpen(false);
                }}
                className={cn(
                  "flex w-full items-center justify-between px-4 py-2.5 text-left text-sm transition-colors hover:bg-ivory",
                  locale === l ? "text-primary font-semibold" : "text-charcoal"
                )}
              >
                {localeLabels[l]}
                {locale === l && <Check className="h-3.5 w-3.5" aria-hidden="true" />}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
