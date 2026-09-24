"use client";

import { useLanguage } from "@/i18n/LanguageProvider";
import { locales } from "@/i18n/config";
import type { DayAvailability } from "@/types";
import { cn } from "@/lib/cn";

const localeToIntl: Record<(typeof locales)[number], string> = {
  en: "en-IN",
  gu: "gu-IN",
  hi: "hi-IN",
};

export default function DatePicker({
  days,
  value,
  onChange,
  loading,
}: {
  days: DayAvailability[];
  value: string | null;
  onChange: (date: string) => void;
  loading: boolean;
}) {
  const { t, locale } = useLanguage();

  return (
    <div>
      <h3 className="mb-4 text-base font-semibold text-charcoal">{t("booking.date.title")}</h3>

      {loading ? (
        <p className="text-sm text-muted">{t("common.loading")}</p>
      ) : (
        <div className="grid grid-cols-3 gap-3 sm:grid-cols-4">
          {days.map((day) => {
            const dateObj = new Date(day.date + "T00:00:00");
            const weekday = dateObj.toLocaleDateString(localeToIntl[locale], {
              weekday: "short",
            });
            const dayNum = dateObj.toLocaleDateString(localeToIntl[locale], {
              day: "numeric",
            });
            const month = dateObj.toLocaleDateString(localeToIntl[locale], {
              month: "short",
            });
            const selected = value === day.date;
            const hasSlots = day.slots.some((s) => s.available);

            return (
              <button
                key={day.date}
                type="button"
                disabled={!hasSlots}
                onClick={() => onChange(day.date)}
                aria-pressed={selected}
                className={cn(
                  "flex flex-col items-center gap-0.5 rounded-xl border py-3 text-center transition-colors disabled:cursor-not-allowed disabled:opacity-40",
                  selected
                    ? "border-primary bg-primary text-ivory"
                    : "border-charcoal/10 text-charcoal hover:border-primary/40"
                )}
              >
                <span className="text-[11px] uppercase tracking-wide opacity-70">
                  {weekday}
                </span>
                <span className="text-lg font-semibold">{dayNum}</span>
                <span className="text-[11px] opacity-70">{month}</span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
