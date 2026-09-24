"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageProvider";
import Button from "@/components/common/Button";
import LanguageSwitcher from "@/components/common/LanguageSwitcher";
import { useBookingModal } from "@/context/BookingModalContext";
import type { TranslationKey } from "@/i18n/translations";

interface NavLink {
  href: string;
  key: TranslationKey;
}

export default function MobileNav({
  isOpen,
  onClose,
  links,
}: {
  isOpen: boolean;
  onClose: () => void;
  links: NavLink[];
}) {
  const { t } = useLanguage();
  const { openBooking } = useBookingModal();

  const allLinks: NavLink[] = [...links, { href: "/#faq", key: "nav.faq" }];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 z-50 bg-charcoal/40 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            aria-hidden="true"
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={t("nav.menu")}
            className="fixed inset-y-0 right-0 z-50 flex w-[85%] max-w-sm flex-col bg-surface p-6 shadow-2xl lg:hidden"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.25, ease: "easeOut" }}
          >
            <div className="flex items-center justify-between">
              <span className="font-serif text-lg text-primary">[Clinic Name]</span>
              <button
                type="button"
                onClick={onClose}
                aria-label={t("nav.closeMenu")}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-charcoal/15 text-charcoal"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>

            <nav className="mt-10 flex flex-col gap-1" aria-label="Mobile primary">
              {allLinks.map((link) => (
                <Link
                  key={link.key}
                  href={link.href}
                  onClick={onClose}
                  className="rounded-lg px-2 py-3 text-lg font-medium text-charcoal transition-colors hover:bg-ivory hover:text-primary"
                >
                  {t(link.key)}
                </Link>
              ))}
            </nav>

            <div className="mt-8">
              <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-muted">
                {t("footer.languageHeading")}
              </p>
              <LanguageSwitcher variant="inline" />
            </div>

            <div className="mt-auto pt-8">
              <Button
                className="w-full"
                size="lg"
                onClick={() => {
                  onClose();
                  openBooking();
                }}
              >
                {t("nav.bookConsultation")}
              </Button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
