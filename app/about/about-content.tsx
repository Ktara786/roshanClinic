"use client";

import { UserRound } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageProvider";
import Container from "@/components/common/Container";
import Button from "@/components/common/Button";
import { useBookingModal } from "@/context/BookingModalContext";
import { doctorProfile } from "@/data/doctor";

export default function AboutContent() {
  const { t } = useLanguage();
  const { openBooking } = useBookingModal();

  return (
    <Container className="max-w-2xl py-14 sm:py-20">
      <div className="mx-auto mb-6 flex h-32 w-32 items-center justify-center rounded-full bg-sage/25">
        <UserRound className="h-12 w-12 text-primary/50" aria-hidden="true" />
      </div>
      <h1 className="text-center font-serif text-3xl text-charcoal sm:text-4xl">
        {t("trust.namePrefix")} {doctorProfile.name}, {t("trust.qualification")}
      </h1>
      <p className="mt-6 text-base leading-relaxed text-muted">{t("trust.intro")}</p>
      <p className="mt-4 text-base leading-relaxed text-muted">{t("trust.approach")}</p>
      <p className="mt-6 rounded-lg bg-ivory px-4 py-3 text-sm text-muted">
        {t("trust.registrationPlaceholder")}
      </p>
      <div className="mt-8 flex justify-center">
        <Button onClick={() => openBooking()}>{t("hero.primaryCta")}</Button>
      </div>
    </Container>
  );
}
