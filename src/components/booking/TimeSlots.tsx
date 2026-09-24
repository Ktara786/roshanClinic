"use client";

import { useLanguage } from "@/i18n/LanguageProvider";
import type { TimeSlot } from "@/types";
import { cn } from "@/lib/cn";

export default function TimeSlots({
  slots,
  value,
  onChange,
}: {
  slots: TimeSlot[];
  value: string | null;
  onChange: (time: string) => void;
}) {
  const { t } = useLanguage();

  return (
    <div>
      <h3 className="mb-4 text-base font-semibold text-charcoal">{t("booking.time.title")}</h3>

      {slots.length === 0 ? (
        <p className="text-sm text-muted">{t("booking.time.empty")}</p>
      ) : (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {slots.map((slot) => {
            const selected = value === slot.time;
            return (
              <button
                key={slot.id}
                type="button"
                disabled={!slot.available}
                onClick={() => onChange(slot.time)}
                aria-pressed={selected}
                className={cn(
                  "rounded-xl border py-3 text-sm font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-40 disabled:line-through",
                  selected
                    ? "border-primary bg-primary text-ivory"
                    : "border-charcoal/10 text-charcoal hover:border-primary/40"
                )}
              >
                {slot.time}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
