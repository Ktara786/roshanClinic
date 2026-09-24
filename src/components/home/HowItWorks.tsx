"use client";

import { useLanguage } from "@/i18n/LanguageProvider";
import Container from "@/components/common/Container";
import SectionHeading from "@/components/common/SectionHeading";
import AnimatedSection from "@/components/common/AnimatedSection";

const steps = [
  { titleKey: "howItWorks.steps.step1Title", descKey: "howItWorks.steps.step1Desc" },
  { titleKey: "howItWorks.steps.step2Title", descKey: "howItWorks.steps.step2Desc" },
  { titleKey: "howItWorks.steps.step3Title", descKey: "howItWorks.steps.step3Desc" },
  { titleKey: "howItWorks.steps.step4Title", descKey: "howItWorks.steps.step4Desc" },
] as const;

export default function HowItWorks() {
  const { t } = useLanguage();

  return (
    <AnimatedSection id="how-it-works" className="bg-ivory py-16 sm:py-24">
      <Container>
        <SectionHeading
          eyebrow={t("howItWorks.eyebrow")}
          title={t("howItWorks.title")}
          align="center"
        />

        <div className="relative mt-14 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div
            aria-hidden="true"
            className="absolute left-0 right-0 top-6 hidden h-px bg-charcoal/10 lg:block"
          />
          {steps.map((step, idx) => (
            <div key={step.titleKey} className="relative">
              <span className="relative z-10 mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary font-serif text-lg text-ivory">
                {String(idx + 1).padStart(2, "0")}
              </span>
              <h3 className="text-base font-semibold text-charcoal">
                {t(step.titleKey)}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {t(step.descKey)}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </AnimatedSection>
  );
}
