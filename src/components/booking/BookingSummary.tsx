"use client";

import { useLanguage } from "@/i18n/LanguageProvider";
import { locales } from "@/i18n/config";
import type { BookingDraft } from "@/types";

const localeToIntl: Record<(typeof locales)[number], string> = {
  en: "en-IN",
  gu: "gu-IN",
  hi: "hi-IN",
};

export default function BookingSummary({ draft }: { draft: BookingDraft }) {
  const { t, locale } = useLanguage();

  const formattedDate = draft.date
    ? new Date(draft.date + "T00:00:00").toLocaleDateString(localeToIntl[locale], {
        weekday: "long",
        day: "numeric",
        month: "long",
      })
    : "—";

  return (
    <div>
      <h3 className="mb-4 text-base font-semibold text-charcoal">{t("booking.review.title")}</h3>

      <dl className="divide-y divide-charcoal/10 rounded-2xl border border-charcoal/10">
        <Row
          label={t("booking.review.type")}
          value={
            draft.type === "online"
              ? t("booking.type.online")
              : draft.type === "clinic"
              ? t("booking.type.clinic")
              : "—"
          }
        />
        <Row label={t("booking.review.date")} value={formattedDate} />
        <Row label={t("booking.review.time")} value={draft.time ?? "—"} />
        <Row label={t("booking.review.name")} value={draft.patient.name || "—"} />
      </dl>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between px-4 py-3">
      <dt className="text-sm text-muted">{label}</dt>
      <dd className="text-sm font-medium text-charcoal">{value}</dd>
    </div>
  );
}
