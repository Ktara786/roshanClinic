"use client";

import { useLanguage } from "@/i18n/LanguageProvider";
import Container from "@/components/common/Container";
import AnimatedSection from "@/components/common/AnimatedSection";
import Button from "@/components/common/Button";
import { useBookingModal } from "@/context/BookingModalContext";

export default function FinalCTA() {
  const { t } = useLanguage();
  const { openBooking } = useBookingModal();

  return (
    <AnimatedSection className="bg-primary py-20 sm:py-28">
      <Container className="text-center">
        <h2 className="mx-auto max-w-xl font-serif text-3xl leading-tight text-ivory sm:text-4xl">
          {t("finalCta.title")}
        </h2>
        <p className="mt-4 text-base text-ivory/80 sm:text-lg">
          {t("finalCta.description")}
        </p>
        <Button
          size="lg"
          className="mt-8 bg-ivory text-primary hover:bg-ivory/90"
          onClick={() => openBooking()}
        >
          {t("finalCta.cta")}
        </Button>
      </Container>
    </AnimatedSection>
  );
}
