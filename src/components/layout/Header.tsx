"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageProvider";
import Container from "@/components/common/Container";
import Button from "@/components/common/Button";
import LanguageSwitcher from "@/components/common/LanguageSwitcher";
import MobileNav from "./MobileNav";
import { useBookingModal } from "@/context/BookingModalContext";
import { cn } from "@/lib/cn";

const navLinks = [
  { href: "/#home", key: "nav.home" as const },
  { href: "/#about", key: "nav.about" as const },
  { href: "/#consultation", key: "nav.consultation" as const },
  { href: "/#how-it-works", key: "nav.howItWorks" as const },
  { href: "/#clinic", key: "nav.clinic" as const },
];

export default function Header() {
  const { t } = useLanguage();
  const { openBooking } = useBookingModal();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 16);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 w-full transition-all duration-300",
        scrolled
          ? "bg-ivory/90 backdrop-blur-sm shadow-[0_1px_0_0_rgba(38,48,42,0.06)]"
          : "bg-ivory/0"
      )}
    >
      <Container className="flex h-18 items-center justify-between py-4">
        <Link href="/" className="font-serif text-xl text-primary sm:text-2xl">
          [Clinic Name]
        </Link>

        <nav className="hidden items-center gap-8 lg:flex" aria-label="Primary">
          {navLinks.map((link) => (
            <Link
              key={link.key}
              href={link.href}
              className="text-sm font-medium text-charcoal/80 transition-colors hover:text-primary"
            >
              {t(link.key)}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <LanguageSwitcher />
          <Button size="md" onClick={() => openBooking()}>
            {t("nav.bookConsultation")}
          </Button>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <LanguageSwitcher />
          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            aria-label={t("a11y.openMenu")}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-charcoal/15 text-charcoal"
          >
            <Menu className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
      </Container>

      <MobileNav
        isOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
        links={navLinks}
      />
    </header>
  );
}
