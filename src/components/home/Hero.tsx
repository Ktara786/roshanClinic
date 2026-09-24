"use client";

import { motion } from "framer-motion";
import { ImageIcon } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageProvider";
import Container from "@/components/common/Container";
import Button from "@/components/common/Button";
import { useBookingModal } from "@/context/BookingModalContext";

export default function Hero() {
  const { t } = useLanguage();
  const { openBooking } = useBookingModal();

  return (
    <section id="home" className="relative overflow-hidden pt-8 sm:pt-14">
      {/* Organic background accents */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-organic bg-sage/30 blur-2xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-16 top-40 h-56 w-56 rounded-organic bg-primary/10 blur-2xl"
      />

      <Container className="relative grid grid-cols-1 items-center gap-12 pb-16 lg:grid-cols-2 lg:gap-10 lg:pb-24">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <h1 className="max-w-xl font-serif text-4xl leading-[1.15] text-charcoal sm:text-5xl lg:text-[3.25rem]">
            {t("hero.title")}
          </h1>
          <p className="mt-6 max-w-md text-base leading-relaxed text-muted sm:text-lg">
            {t("hero.description")}
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Button size="lg" onClick={() => openBooking()}>
              {t("hero.primaryCta")}
            </Button>
            <Button
              size="lg"
              variant="secondary"
              onClick={() => {
                document
                  .getElementById("how-it-works")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              {t("hero.secondaryCta")}
            </Button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.15 }}
          className="relative mx-auto aspect-[4/5] w-full max-w-sm"
        >
          <div className="absolute inset-0 rounded-[2.5rem] bg-sage/25" />
          <div className="absolute inset-3 flex flex-col items-center justify-center gap-3 rounded-[2rem] border border-charcoal/10 bg-surface/70 text-center">
            <ImageIcon
              className="h-10 w-10 text-primary/50"
              aria-hidden="true"
            />
            <p className="max-w-[70%] text-sm text-muted">
              {t("hero.imagePlaceholder")}
            </p>
            <span className="sr-only">{t("hero.imageAlt")}</span>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
