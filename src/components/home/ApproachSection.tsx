"use client";

import { useLanguage } from "@/i18n/LanguageProvider";
import Container from "@/components/common/Container";
import SectionHeading from "@/components/common/SectionHeading";
import AnimatedSection from "@/components/common/AnimatedSection";

const steps = [
  { titleKey: "approach.steps.listen", descKey: "approach.steps.listenDesc" },
  { titleKey: "approach.steps.understand", descKey: "approach.steps.understandDesc" },
  { titleKey: "approach.steps.personalise", descKey: "approach.steps.personaliseDesc" },
  { titleKey: "approach.steps.followUp", descKey: "approach.steps.followUpDesc" },
] as const;

export default function ApproachSection() {
  const { t } = useLanguage();

  return (
    <AnimatedSection className="py-16 sm:py-24">
      <Container>
        <SectionHeading
          eyebrow={t("approach.eyebrow")}
          title={t("approach.title")}
          align="center"
        />

        <div className="relative mt-14">
          <svg
            aria-hidden="true"
            className="absolute left-0 right-0 top-8 hidden w-full lg:block"
            height="2"
          >
            <line
              x1="12%"
              y1="1"
              x2="88%"
              y2="1"
              stroke="#A8B9A5"
              strokeWidth="2"
              strokeDasharray="1 10"
              strokeLinecap="round"
            />
          </svg>
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step) => (
              <div key={step.titleKey} className="text-center">
                <div className="relative z-10 mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full border-2 border-sage bg-ivory">
                  <span className="h-3 w-3 rounded-full bg-primary" />
                </div>
                <h3 className="font-serif text-lg text-charcoal">{t(step.titleKey)}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {t(step.descKey)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </AnimatedSection>
  );
}
