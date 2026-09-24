"use client";

import { useLanguage } from "@/i18n/LanguageProvider";
import type { PatientDetails as PatientDetailsValue } from "@/types";

export default function PatientDetails({
  value,
  onChange,
  errors,
}: {
  value: PatientDetailsValue;
  onChange: (value: PatientDetailsValue) => void;
  errors: Partial<Record<keyof PatientDetailsValue, string>>;
}) {
  const { t } = useLanguage();

  return (
    <div>
      <h3 className="mb-4 text-base font-semibold text-charcoal">{t("booking.details.title")}</h3>

      <div className="flex flex-col gap-4">
        <Field
          id="patient-name"
          label={t("booking.details.name")}
          placeholder={t("booking.details.namePlaceholder")}
          value={value.name}
          onChange={(v) => onChange({ ...value, name: v })}
          error={errors.name}
          autoComplete="name"
        />
        <Field
          id="patient-phone"
          label={t("booking.details.phone")}
          placeholder={t("booking.details.phonePlaceholder")}
          value={value.phone}
          onChange={(v) => onChange({ ...value, phone: v })}
          error={errors.phone}
          type="tel"
          autoComplete="tel"
        />
        <Field
          id="patient-email"
          label={t("booking.details.email")}
          placeholder={t("booking.details.emailPlaceholder")}
          value={value.email}
          onChange={(v) => onChange({ ...value, email: v })}
          error={errors.email}
          type="email"
          autoComplete="email"
        />
      </div>
    </div>
  );
}

function Field({
  id,
  label,
  placeholder,
  value,
  onChange,
  error,
  type = "text",
  autoComplete,
}: {
  id: string;
  label: string;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  type?: string;
  autoComplete?: string;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-charcoal">
        {label}
      </label>
      <input
        id={id}
        type={type}
        autoComplete={autoComplete}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
        className="w-full rounded-xl border border-charcoal/15 bg-surface px-4 py-2.5 text-sm text-charcoal placeholder:text-muted/70 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
      />
      {error && (
        <p id={`${id}-error`} className="mt-1.5 text-xs text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}
