"use client";

import { useState } from "react";
import * as Icons from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/i18n/LanguageProvider";
import Container from "@/components/common/Container";
import SectionHeading from "@/components/common/SectionHeading";
import AnimatedSection from "@/components/common/AnimatedSection";
import Button from "@/components/common/Button";
import { concerns } from "@/data/concerns";
import { useBookingModal } from "@/context/BookingModalContext";
import { cn } from "@/lib/cn";

export default function ConcernCards() {
  const { t } = useLanguage();
  const { openBooking } = useBookingModal();
  const [selectedId, setSelectedId] = useState<string | null>(null);

  return (
    <AnimatedSection className="py-16 sm:py-24">
      <Container>
        <SectionHeading
          eyebrow={t("concerns.eyebrow")}
          title={t("concerns.title")}
          description={t("concerns.description")}
        />

        <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
          {concerns.map((concern) => {
            const Icon = (Icons[concern.icon as keyof typeof Icons] ??
              Icons.Leaf) as Icons.LucideIcon;
            const isSelected = selectedId === concern.id;
            return (
              <button
                key={concern.id}
                type="button"
                onClick={() => setSelectedId(isSelected ? null : concern.id)}
                aria-pressed={isSelected}
                className={cn(
                  "flex flex-col items-start gap-3 rounded-2xl border p-5 text-left transition-colors",
                  isSelected
                    ? "border-primary bg-primary/5"
                    : "border-charcoal/10 bg-surface hover:border-primary/40"
                )}
              >
                <span
                  className={cn(
                    "flex h-10 w-10 items-center justify-center rounded-full",
                    isSelected ? "bg-primary text-ivory" : "bg-sage/25 text-primary"
                  )}
                >
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <span className="text-sm font-medium text-charcoal">
                  {t(concern.titleKey)}
                </span>
              </button>
            );
          })}
        </div>

        <AnimatePresence>
          {selectedId && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-8 overflow-hidden"
            >
              <div className="flex flex-col items-start justify-between gap-4 rounded-2xl bg-ivory p-6 sm:flex-row sm:items-center">
                <p className="text-sm text-charcoal">{t("concerns.selectedNote")}</p>
                <Button onClick={() => openBooking()}>{t("concerns.cta")}</Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </Container>
    </AnimatedSection>
  );
}
