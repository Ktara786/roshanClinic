"use client";

import { Check } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageProvider";
import Container from "@/components/common/Container";
import SectionHeading from "@/components/common/SectionHeading";
import AnimatedSection from "@/components/common/AnimatedSection";

const items = [
  "firstConsultation.items.understanding",
  "firstConsultation.items.history",
  "firstConsultation.items.lifestyle",
  "firstConsultation.items.reports",
  "firstConsultation.items.carePlan",
  "firstConsultation.items.followUp",
] as const;

export default function FirstConsultation() {
  const { t } = useLanguage();

  return (
    <AnimatedSection className="py-16 sm:py-24">
      <Container className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-start">
        <SectionHeading
          eyebrow={t("firstConsultation.eyebrow")}
          title={t("firstConsultation.title")}
        />

        <div>
          <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {items.map((key) => (
              <li key={key} className="flex items-start gap-3">
                <span className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-sage/30 text-primary">
                  <Check className="h-3.5 w-3.5" aria-hidden="true" />
                </span>
                <span className="text-sm leading-relaxed text-charcoal">{t(key)}</span>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-xs leading-relaxed text-muted">
            {t("firstConsultation.disclaimer")}
          </p>
        </div>
      </Container>
    </AnimatedSection>
  );
}
