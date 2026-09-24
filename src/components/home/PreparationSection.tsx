"use client";

import Link from "next/link";
import { ClipboardList } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageProvider";
import Container from "@/components/common/Container";
import SectionHeading from "@/components/common/SectionHeading";
import AnimatedSection from "@/components/common/AnimatedSection";
import Button from "@/components/common/Button";

const items = [
  "preparation.checklist.concerns",
  "preparation.checklist.reports",
  "preparation.checklist.medicines",
  "preparation.checklist.questions",
] as const;

export default function PreparationSection() {
  const { t } = useLanguage();

  return (
    <AnimatedSection className="bg-ivory py-16 sm:py-24">
      <Container className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[1fr_1fr]">
        <div>
          <SectionHeading
            eyebrow={t("preparation.eyebrow")}
            title={t("preparation.title")}
          />
          <Link href="/prepare">
            <Button className="mt-6">{t("preparation.cta")}</Button>
          </Link>
        </div>

        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {items.map((key) => (
            <li
              key={key}
              className="flex items-start gap-3 rounded-2xl border border-charcoal/10 bg-surface p-4"
            >
              <ClipboardList
                className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary/70"
                aria-hidden="true"
              />
              <span className="text-sm text-charcoal">{t(key)}</span>
            </li>
          ))}
        </ul>
      </Container>
    </AnimatedSection>
  );
}
