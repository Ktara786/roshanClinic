"use client";

import { MapPinned, Clock, CalendarDays } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageProvider";
import Container from "@/components/common/Container";
import SectionHeading from "@/components/common/SectionHeading";
import AnimatedSection from "@/components/common/AnimatedSection";
import Button from "@/components/common/Button";
import { useBookingModal } from "@/context/BookingModalContext";

export default function ClinicSection() {
  const { t } = useLanguage();
  const { openBooking } = useBookingModal();

  return (
    <AnimatedSection id="clinic" className="bg-ivory py-16 sm:py-24">
      <Container className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-center">
        <div>
          <SectionHeading eyebrow={t("clinicSection.eyebrow")} title={t("clinicSection.title")} />

          <dl className="mt-8 space-y-5">
            <InfoRow
              icon={<MapPinned className="h-5 w-5" aria-hidden="true" />}
              label={t("clinicSection.addressLabel")}
              value={t("clinicSection.addressPlaceholder")}
            />
            <InfoRow
              icon={<Clock className="h-5 w-5" aria-hidden="true" />}
              label={t("clinicSection.hoursLabel")}
              value={t("clinicSection.hoursPlaceholder")}
            />
            <InfoRow
              icon={<CalendarDays className="h-5 w-5" aria-hidden="true" />}
              label={t("clinicSection.daysLabel")}
              value={t("clinicSection.daysPlaceholder")}
            />
          </dl>

          <div className="mt-8 flex flex-wrap gap-4">
            <Button variant="secondary">{t("clinicSection.directions")}</Button>
            <Button onClick={() => openBooking("clinic")}>
              {t("clinicSection.bookVisit")}
            </Button>
          </div>
        </div>

        <div className="flex aspect-[4/3] items-center justify-center rounded-3xl border border-charcoal/10 bg-surface">
          <p className="text-sm text-muted">{t("clinicSection.mapPlaceholder")}</p>
        </div>
      </Container>
    </AnimatedSection>
  );
}

function InfoRow({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex gap-4">
      <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-sage/25 text-primary">
        {icon}
      </span>
      <div>
        <dt className="text-xs font-semibold uppercase tracking-wide text-muted">
          {label}
        </dt>
        <dd className="mt-1 text-sm text-charcoal">{value}</dd>
      </div>
    </div>
  );
}
