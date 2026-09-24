"use client";

import { Video, MapPin } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageProvider";
import type { ConsultationType as ConsultationTypeValue } from "@/types";
import { cn } from "@/lib/cn";

export default function ConsultationType({
  value,
  onChange,
}: {
  value: ConsultationTypeValue | null;
  onChange: (type: ConsultationTypeValue) => void;
}) {
  const { t } = useLanguage();

  const options: { type: ConsultationTypeValue; icon: typeof Video; label: string; desc: string }[] = [
    { type: "online", icon: Video, label: t("booking.type.online"), desc: t("booking.type.onlineDesc") },
    { type: "clinic", icon: MapPin, label: t("booking.type.clinic"), desc: t("booking.type.clinicDesc") },
  ];

  return (
    <div>
      <h3 className="mb-4 text-base font-semibold text-charcoal">{t("booking.type.title")}</h3>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2" role="radiogroup" aria-label={t("booking.type.title")}>
        {options.map((opt) => {
          const Icon = opt.icon;
          const selected = value === opt.type;
          return (
            <button
              key={opt.type}
              type="button"
              role="radio"
              aria-checked={selected}
              onClick={() => onChange(opt.type)}
              className={cn(
                "flex flex-col items-start gap-3 rounded-2xl border p-5 text-left transition-colors",
                selected ? "border-primary bg-primary/5" : "border-charcoal/10 hover:border-primary/40"
              )}
            >
              <span
                className={cn(
                  "flex h-10 w-10 items-center justify-center rounded-full",
                  selected ? "bg-primary text-ivory" : "bg-sage/25 text-primary"
                )}
              >
                <Icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <span className="text-sm font-semibold text-charcoal">{opt.label}</span>
              <span className="text-xs text-muted">{opt.desc}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
