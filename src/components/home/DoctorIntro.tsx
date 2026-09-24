"use client";

import Link from "next/link";
import { UserRound, ArrowRight } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageProvider";
import Container from "@/components/common/Container";
import AnimatedSection from "@/components/common/AnimatedSection";
import { doctorProfile } from "@/data/doctor";

export default function DoctorIntro() {
  const { t } = useLanguage();

  return (
    <AnimatedSection id="about" className="py-16 sm:py-24">
      <Container className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="mx-auto flex h-44 w-44 items-center justify-center rounded-full bg-sage/25 sm:h-56 sm:w-56">
          <UserRound className="h-16 w-16 text-primary/50" aria-hidden="true" />
        </div>

        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-primary/80">
            {t("trust.eyebrow")}
          </p>
          <h2 className="font-serif text-2xl text-charcoal sm:text-3xl">
            {t("trust.namePrefix")} {doctorProfile.name}, {t("trust.qualification")}
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted">
            {t("trust.intro")}
          </p>

          <div className="mt-6">
            <p className="text-sm font-semibold text-charcoal">
              {t("trust.approachTitle")}
            </p>
            <p className="mt-2 max-w-2xl text-base leading-relaxed text-muted">
              {t("trust.approach")}
            </p>
          </div>

          <p className="mt-6 rounded-lg bg-ivory px-4 py-3 text-sm text-muted">
            {t("trust.registrationPlaceholder")}
          </p>

          <Link
            href="/about"
            className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
          >
            {t("trust.aboutLink")}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </Container>
    </AnimatedSection>
  );
}
