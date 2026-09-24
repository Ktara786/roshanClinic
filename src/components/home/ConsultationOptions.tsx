"use client";

import { Video, MapPin } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageProvider";
import Container from "@/components/common/Container";
import SectionHeading from "@/components/common/SectionHeading";
import AnimatedSection from "@/components/common/AnimatedSection";
import Button from "@/components/common/Button";
import { useBookingModal } from "@/context/BookingModalContext";

export default function ConsultationOptions() {
  const { t } = useLanguage();
  const { openBooking } = useBookingModal();

  return (
    <AnimatedSection id="consultation" className="py-16 sm:py-24">
      <Container>
        <SectionHeading
          eyebrow={t("consultationOptions.eyebrow")}
          title={t("consultationOptions.title")}
          align="center"
        />

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div className="flex flex-col rounded-3xl border border-charcoal/10 bg-surface p-8">
            <span className="mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-sage/25 text-primary">
              <Video className="h-5 w-5" aria-hidden="true" />
            </span>
            <h3 className="font-serif text-xl text-charcoal">
              {t("consultationOptions.online.title")}
            </h3>
            <p className="mt-2 text-sm font-medium text-primary">
              {t("consultationOptions.online.duration")}
            </p>
            <p className="mt-1 text-sm text-muted">
              {t("consultationOptions.online.detail")}
            </p>
            <Button
              className="mt-6 self-start"
              onClick={() => openBooking("online")}
            >
              {t("consultationOptions.online.cta")}
            </Button>
          </div>

          <div className="flex flex-col rounded-3xl border border-charcoal/10 bg-surface p-8">
            <span className="mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-sage/25 text-primary">
              <MapPin className="h-5 w-5" aria-hidden="true" />
            </span>
            <h3 className="font-serif text-xl text-charcoal">
              {t("consultationOptions.clinic.title")}
            </h3>
            <p className="mt-2 text-sm font-medium text-primary">
              {t("consultationOptions.clinic.duration")}
            </p>
            <p className="mt-1 text-sm text-muted">
              {t("consultationOptions.clinic.detail")}
            </p>
            <Button
              className="mt-6 self-start"
              variant="secondary"
              onClick={() => openBooking("clinic")}
            >
              {t("consultationOptions.clinic.cta")}
            </Button>
          </div>
        </div>
      </Container>
    </AnimatedSection>
  );
}
