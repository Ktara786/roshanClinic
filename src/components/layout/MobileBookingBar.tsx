"use client";

import { useLanguage } from "@/i18n/LanguageProvider";
import Button from "@/components/common/Button";
import { useBookingModal } from "@/context/BookingModalContext";

export default function MobileBookingBar() {
  const { t } = useLanguage();
  const { openBooking } = useBookingModal();

  return (
    <div
      className="fixed inset-x-0 bottom-0 z-30 border-t border-charcoal/10 bg-surface/95 p-3 backdrop-blur-sm lg:hidden"
      style={{ paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))" }}
    >
      <Button className="w-full" size="lg" onClick={() => openBooking()}>
        {t("nav.bookConsultation")}
      </Button>
    </div>
  );
}
