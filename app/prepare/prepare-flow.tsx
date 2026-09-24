"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Info } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageProvider";
import Container from "@/components/common/Container";
import Button from "@/components/common/Button";
import { useBookingModal } from "@/context/BookingModalContext";
import type { PrepareFormDraft } from "@/types";
import { loadDraft, saveDraft, clearDraft, submitPrepareForm } from "@/services/patient.service";
import { cn } from "@/lib/cn";

const emptyDraft: PrepareFormDraft = {
  basicInfo: { name: "", age: "", gender: "" },
  concern: "",
  duration: "",
  consultedBefore: "",
  hasReports: "",
  reportNote: "",
};

const TOTAL_STEPS = 5;

export default function PrepareFlow() {
  const { t } = useLanguage();
  const { openBooking } = useBookingModal();
  const [stepIndex, setStepIndex] = useState(0);
  const [draft, setDraft] = useState<PrepareFormDraft>(emptyDraft);
  const [complete, setComplete] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const saved = loadDraft();
    if (saved) setDraft(saved);
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) saveDraft(draft);
  }, [draft, hydrated]);

  async function finish() {
    await submitPrepareForm(draft);
    setComplete(true);
  }

  function startOver() {
    clearDraft();
    setDraft(emptyDraft);
    setStepIndex(0);
    setComplete(false);
  }

  const canProceed = (() => {
    switch (stepIndex) {
      case 0:
        return draft.basicInfo.name.trim().length > 0;
      case 1:
        return draft.concern.trim().length > 0;
      case 2:
        return draft.duration.trim().length > 0;
      case 3:
        return draft.consultedBefore !== "";
      case 4:
        return draft.hasReports !== "";
      default:
        return true;
    }
  })();

  return (
    <Container className="max-w-2xl py-14 sm:py-20">
      <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-primary/80">
        {t("preparation.eyebrow")}
      </p>
      <h1 className="font-serif text-3xl text-charcoal sm:text-4xl">{t("prepare.title")}</h1>
      <p className="mt-3 max-w-xl text-base leading-relaxed text-muted">
        {t("prepare.description")}
      </p>

      {!complete && (
        <>
          <ProgressBar current={stepIndex + 1} total={TOTAL_STEPS} />

          <div className="mt-8 min-h-[220px] rounded-3xl border border-charcoal/10 bg-surface p-6 sm:p-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={stepIndex}
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -12 }}
                transition={{ duration: 0.2 }}
              >
                {stepIndex === 0 && <BasicInfoStep draft={draft} setDraft={setDraft} />}
                {stepIndex === 1 && <ConcernStep draft={draft} setDraft={setDraft} />}
                {stepIndex === 2 && <DurationStep draft={draft} setDraft={setDraft} />}
                {stepIndex === 3 && <ConsultedBeforeStep draft={draft} setDraft={setDraft} />}
                {stepIndex === 4 && <ReportsStep draft={draft} setDraft={setDraft} />}
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="mt-6 flex items-center justify-between">
            <Button
              variant="ghost"
              onClick={() => setStepIndex((s) => Math.max(0, s - 1))}
              className={cn(stepIndex === 0 && "invisible")}
            >
              {t("prepare.nav.back")}
            </Button>

            {stepIndex < TOTAL_STEPS - 1 ? (
              <Button disabled={!canProceed} onClick={() => setStepIndex((s) => s + 1)}>
                {t("prepare.nav.next")}
              </Button>
            ) : (
              <Button disabled={!canProceed} onClick={finish}>
                {t("prepare.nav.finish")}
              </Button>
            )}
          </div>

          <p className="mt-6 flex items-center gap-2 text-xs text-muted">
            <Info className="h-3.5 w-3.5 flex-shrink-0" aria-hidden="true" />
            {t("prepare.savedDraft")}
          </p>
        </>
      )}

      {complete && (
        <div className="mt-10 flex flex-col items-center rounded-3xl border border-charcoal/10 bg-surface p-10 text-center">
          <CheckCircle2 className="mb-4 h-12 w-12 text-primary" aria-hidden="true" />
          <h2 className="font-serif text-xl text-charcoal">{t("prepare.complete.title")}</h2>
          <p className="mt-2 max-w-sm text-sm text-muted">{t("prepare.complete.message")}</p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Button onClick={() => openBooking()}>{t("prepare.complete.cta")}</Button>
            <Button variant="secondary" onClick={startOver}>
              {t("prepare.complete.startOver")}
            </Button>
          </div>
        </div>
      )}
    </Container>
  );
}

function ProgressBar({ current, total }: { current: number; total: number }) {
  const { t } = useLanguage();
  return (
    <div className="mt-8">
      <p className="mb-2 text-xs font-medium text-muted">
        {t("prepare.progress", { current, total })}
      </p>
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-charcoal/10">
        <div
          className="h-full rounded-full bg-primary transition-all duration-300"
          style={{ width: `${(current / total) * 100}%` }}
        />
      </div>
    </div>
  );
}

type StepProps = {
  draft: PrepareFormDraft;
  setDraft: React.Dispatch<React.SetStateAction<PrepareFormDraft>>;
};

function BasicInfoStep({ draft, setDraft }: StepProps) {
  const { t } = useLanguage();
  const genderOptions = [
    { value: "female", label: t("prepare.steps.basicInfo.genderOptions.female") },
    { value: "male", label: t("prepare.steps.basicInfo.genderOptions.male") },
    { value: "other", label: t("prepare.steps.basicInfo.genderOptions.other") },
    { value: "prefer_not_to_say", label: t("prepare.steps.basicInfo.genderOptions.preferNotToSay") },
  ];

  return (
    <fieldset>
      <legend className="mb-4 text-base font-semibold text-charcoal">
        {t("prepare.steps.basicInfo.heading")}
      </legend>
      <div className="flex flex-col gap-4">
        <div>
          <label htmlFor="p-name" className="mb-1.5 block text-sm font-medium text-charcoal">
            {t("prepare.steps.basicInfo.name")}
          </label>
          <input
            id="p-name"
            value={draft.basicInfo.name}
            placeholder={t("prepare.steps.basicInfo.namePlaceholder")}
            onChange={(e) =>
              setDraft((d) => ({ ...d, basicInfo: { ...d.basicInfo, name: e.target.value } }))
            }
            className="w-full rounded-xl border border-charcoal/15 bg-surface px-4 py-2.5 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="p-age" className="mb-1.5 block text-sm font-medium text-charcoal">
              {t("prepare.steps.basicInfo.age")}
            </label>
            <input
              id="p-age"
              inputMode="numeric"
              value={draft.basicInfo.age}
              placeholder={t("prepare.steps.basicInfo.agePlaceholder")}
              onChange={(e) =>
                setDraft((d) => ({ ...d, basicInfo: { ...d.basicInfo, age: e.target.value } }))
              }
              className="w-full rounded-xl border border-charcoal/15 bg-surface px-4 py-2.5 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
          <div>
            <label htmlFor="p-gender" className="mb-1.5 block text-sm font-medium text-charcoal">
              {t("prepare.steps.basicInfo.gender")}
            </label>
            <select
              id="p-gender"
              value={draft.basicInfo.gender}
              onChange={(e) =>
                setDraft((d) => ({ ...d, basicInfo: { ...d.basicInfo, gender: e.target.value } }))
              }
              className="w-full rounded-xl border border-charcoal/15 bg-surface px-4 py-2.5 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            >
              <option value="">{t("prepare.steps.basicInfo.genderPlaceholder")}</option>
              {genderOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </fieldset>
  );
}

function ConcernStep({ draft, setDraft }: StepProps) {
  const { t } = useLanguage();
  return (
    <div>
      <label htmlFor="p-concern" className="mb-4 block text-base font-semibold text-charcoal">
        {t("prepare.steps.concern.heading")}
      </label>
      <textarea
        id="p-concern"
        rows={5}
        value={draft.concern}
        placeholder={t("prepare.steps.concern.placeholder")}
        onChange={(e) => setDraft((d) => ({ ...d, concern: e.target.value }))}
        className="w-full resize-none rounded-xl border border-charcoal/15 bg-surface px-4 py-3 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
      />
    </div>
  );
}

function DurationStep({ draft, setDraft }: StepProps) {
  const { t } = useLanguage();
  return (
    <div>
      <label htmlFor="p-duration" className="mb-4 block text-base font-semibold text-charcoal">
        {t("prepare.steps.duration.heading")}
      </label>
      <input
        id="p-duration"
        value={draft.duration}
        placeholder={t("prepare.steps.duration.placeholder")}
        onChange={(e) => setDraft((d) => ({ ...d, duration: e.target.value }))}
        className="w-full rounded-xl border border-charcoal/15 bg-surface px-4 py-2.5 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
      />
    </div>
  );
}

function ConsultedBeforeStep({ draft, setDraft }: StepProps) {
  const { t } = useLanguage();
  return (
    <fieldset>
      <legend className="mb-4 text-base font-semibold text-charcoal">
        {t("prepare.steps.consultedBefore.heading")}
      </legend>
      <YesNoToggle
        value={draft.consultedBefore}
        onChange={(v) => setDraft((d) => ({ ...d, consultedBefore: v }))}
        yesLabel={t("prepare.steps.consultedBefore.yes")}
        noLabel={t("prepare.steps.consultedBefore.no")}
        name="consulted-before"
      />
    </fieldset>
  );
}

function ReportsStep({ draft, setDraft }: StepProps) {
  const { t } = useLanguage();
  return (
    <fieldset>
      <legend className="mb-4 text-base font-semibold text-charcoal">
        {t("prepare.steps.reports.heading")}
      </legend>
      <YesNoToggle
        value={draft.hasReports}
        onChange={(v) => setDraft((d) => ({ ...d, hasReports: v }))}
        yesLabel={t("prepare.steps.reports.yes")}
        noLabel={t("prepare.steps.reports.no")}
        name="has-reports"
      />

      {draft.hasReports === "yes" && (
        <div className="mt-5">
          <label htmlFor="p-report-note" className="mb-1.5 block text-sm font-medium text-charcoal">
            {t("prepare.steps.reports.uploadLabel")}
          </label>
          <input
            id="p-report-note"
            value={draft.reportNote}
            placeholder={t("prepare.steps.reports.uploadPlaceholder")}
            onChange={(e) => setDraft((d) => ({ ...d, reportNote: e.target.value }))}
            className="w-full rounded-xl border border-charcoal/15 bg-surface px-4 py-2.5 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          />
          <p className="mt-2 text-xs text-muted">{t("prepare.steps.reports.uploadHint")}</p>
        </div>
      )}
    </fieldset>
  );
}

function YesNoToggle({
  value,
  onChange,
  yesLabel,
  noLabel,
  name,
}: {
  value: "yes" | "no" | "";
  onChange: (v: "yes" | "no") => void;
  yesLabel: string;
  noLabel: string;
  name: string;
}) {
  return (
    <div className="flex gap-3" role="radiogroup" aria-label={name}>
      {(["yes", "no"] as const).map((option) => (
        <button
          key={option}
          type="button"
          role="radio"
          aria-checked={value === option}
          onClick={() => onChange(option)}
          className={cn(
            "rounded-full border px-6 py-2.5 text-sm font-medium transition-colors",
            value === option
              ? "border-primary bg-primary text-ivory"
              : "border-charcoal/15 text-charcoal hover:border-primary/40"
          )}
        >
          {option === "yes" ? yesLabel : noLabel}
        </button>
      ))}
    </div>
  );
}
