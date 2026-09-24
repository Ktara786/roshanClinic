"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageProvider";
import type { BookingDraft, ConsultationType as ConsultationTypeValue, DayAvailability } from "@/types";
import { getAvailability, createBooking } from "@/services/booking.service";
import Button from "@/components/common/Button";
import { cn } from "@/lib/cn";

import ConsultationType from "./ConsultationType";
import DatePicker from "./DatePicker";
import TimeSlots from "./TimeSlots";
import PatientDetails from "./PatientDetails";
import BookingSummary from "./BookingSummary";

type Step = "type" | "date" | "time" | "details" | "review";
const STEPS: Step[] = ["type", "date", "time", "details", "review"];

const emptyDraft: BookingDraft = {
  type: null,
  date: null,
  time: null,
  patient: { name: "", phone: "", email: "" },
};

export default function BookingModal({
  isOpen,
  onClose,
  preselectedType,
}: {
  isOpen: boolean;
  onClose: () => void;
  preselectedType?: ConsultationTypeValue;
}) {
  const { t } = useLanguage();
  const [stepIndex, setStepIndex] = useState(0);
  const [draft, setDraft] = useState<BookingDraft>(emptyDraft);
  const [availability, setAvailability] = useState<DayAvailability[]>([]);
  const [loadingAvailability, setLoadingAvailability] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const step = STEPS[stepIndex];

  // Reset the flow whenever the modal opens, honouring a preselected type.
  useEffect(() => {
    if (isOpen) {
      setDraft({ ...emptyDraft, type: preselectedType ?? null });
      setStepIndex(preselectedType ? 1 : 0);
      setErrors({});
      setSuccess(false);
    }
  }, [isOpen, preselectedType]);

  useEffect(() => {
    if (!draft.type || !isOpen) return;
    setLoadingAvailability(true);
    getAvailability(draft.type)
      .then(setAvailability)
      .finally(() => setLoadingAvailability(false));
  }, [draft.type, isOpen]);

  const selectedDay = useMemo(
    () => availability.find((d) => d.date === draft.date) ?? null,
    [availability, draft.date]
  );

  if (!isOpen) return null;

  function validateStep(current: Step): boolean {
    const nextErrors: Record<string, string> = {};
    if (current === "type" && !draft.type) nextErrors.type = t("booking.validation.selectType");
    if (current === "date" && !draft.date) nextErrors.date = t("booking.validation.selectDate");
    if (current === "time" && !draft.time) nextErrors.time = t("booking.validation.selectTime");
    if (current === "details") {
      if (!draft.patient.name.trim()) nextErrors.name = t("booking.validation.nameRequired");
      if (!/^[0-9+\s-]{7,}$/.test(draft.patient.phone.trim()))
        nextErrors.phone = t("booking.validation.phoneRequired");
      if (!/^\S+@\S+\.\S+$/.test(draft.patient.email.trim()))
        nextErrors.email = t("booking.validation.emailRequired");
    }
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  function goNext() {
    if (!validateStep(step)) return;
    if (stepIndex < STEPS.length - 1) setStepIndex(stepIndex + 1);
  }

  function goBack() {
    setErrors({});
    if (stepIndex > 0) setStepIndex(stepIndex - 1);
  }

  async function handleConfirm() {
    setSubmitting(true);
    try {
      await createBooking(draft);
      setSuccess(true);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-end justify-center bg-charcoal/40 p-0 sm:items-center sm:p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label={t("booking.modalTitle")}
          onClick={(e) => e.stopPropagation()}
          className="flex max-h-[92vh] w-full flex-col overflow-hidden rounded-t-3xl bg-surface sm:max-w-lg sm:rounded-3xl"
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 20, opacity: 0 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
        >
          <div className="flex items-center justify-between border-b border-charcoal/10 px-6 py-4">
            <h2 className="font-serif text-lg text-charcoal">{t("booking.modalTitle")}</h2>
            <button
              type="button"
              onClick={onClose}
              aria-label={t("common.close")}
              className="flex h-9 w-9 items-center justify-center rounded-full text-charcoal hover:bg-ivory"
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>

          {!success && <StepIndicator stepIndex={stepIndex} />}

          <div className="flex-1 overflow-y-auto px-6 py-6">
            {success ? (
              <div className="flex flex-col items-center py-6 text-center">
                <CheckCircle2 className="mb-4 h-12 w-12 text-primary" aria-hidden="true" />
                <h3 className="font-serif text-xl text-charcoal">{t("booking.success.title")}</h3>
                <p className="mt-2 max-w-sm text-sm text-muted">{t("booking.success.message")}</p>
                <Button className="mt-6" onClick={onClose}>
                  {t("booking.success.close")}
                </Button>
              </div>
            ) : (
              <>
                {step === "type" && (
                  <>
                    <ConsultationType
                      value={draft.type}
                      onChange={(type) => setDraft((d) => ({ ...d, type, date: null, time: null }))}
                    />
                    {errors.type && <p className="mt-3 text-xs text-red-600">{errors.type}</p>}
                  </>
                )}
                {step === "date" && (
                  <>
                    <DatePicker
                      days={availability}
                      value={draft.date}
                      loading={loadingAvailability}
                      onChange={(date) => setDraft((d) => ({ ...d, date, time: null }))}
                    />
                    {errors.date && <p className="mt-3 text-xs text-red-600">{errors.date}</p>}
                  </>
                )}
                {step === "time" && (
                  <>
                    <TimeSlots
                      slots={selectedDay?.slots ?? []}
                      value={draft.time}
                      onChange={(time) => setDraft((d) => ({ ...d, time }))}
                    />
                    {errors.time && <p className="mt-3 text-xs text-red-600">{errors.time}</p>}
                  </>
                )}
                {step === "details" && (
                  <PatientDetails
                    value={draft.patient}
                    onChange={(patient) => setDraft((d) => ({ ...d, patient }))}
                    errors={errors}
                  />
                )}
                {step === "review" && <BookingSummary draft={draft} />}
              </>
            )}
          </div>

          {!success && (
            <div className="flex items-center justify-between gap-3 border-t border-charcoal/10 px-6 py-4">
              <Button
                variant="ghost"
                onClick={goBack}
                disabled={stepIndex === 0}
                className={cn(stepIndex === 0 && "invisible")}
              >
                <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                {t("booking.nav.back")}
              </Button>

              {step === "review" ? (
                <Button onClick={handleConfirm} disabled={submitting}>
                  {submitting ? t("common.loading") : t("booking.review.confirm")}
                </Button>
              ) : (
                <Button onClick={goNext}>
                  {t("booking.nav.next")}
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Button>
              )}
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

function StepIndicator({ stepIndex }: { stepIndex: number }) {
  const { t } = useLanguage();
  const labels = [
    t("booking.steps.type"),
    t("booking.steps.date"),
    t("booking.steps.time"),
    t("booking.steps.details"),
    t("booking.steps.review"),
  ];

  return (
    <div className="flex items-center gap-1.5 overflow-x-auto px-6 pt-4" aria-hidden="true">
      {labels.map((label, idx) => (
        <div key={label} className="flex flex-1 items-center gap-1.5">
          <span
            className={cn(
              "h-1.5 flex-1 rounded-full transition-colors",
              idx <= stepIndex ? "bg-primary" : "bg-charcoal/10"
            )}
          />
        </div>
      ))}
    </div>
  );
}
