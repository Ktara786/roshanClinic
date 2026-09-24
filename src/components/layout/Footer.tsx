"use client";

import Link from "next/link";
import { useLanguage } from "@/i18n/LanguageProvider";
import Container from "@/components/common/Container";
import LanguageSwitcher from "@/components/common/LanguageSwitcher";

export default function Footer() {
  const { t } = useLanguage();
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-charcoal/10 bg-surface pb-28 pt-16 lg:pb-16">
      <Container>
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-5">
          <div className="sm:col-span-2 lg:col-span-2">
            <span className="font-serif text-xl text-primary">[Clinic Name]</span>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted">
              {t("footer.tagline")}
            </p>
          </div>

          <FooterColumn heading={t("footer.navHeading")}>
            <FooterLink href="/#home">{t("nav.home")}</FooterLink>
            <FooterLink href="/#about">{t("nav.about")}</FooterLink>
            <FooterLink href="/#faq">{t("nav.faq")}</FooterLink>
          </FooterColumn>

          <FooterColumn heading={t("footer.consultationHeading")}>
            <FooterLink href="/#consultation">{t("nav.consultation")}</FooterLink>
            <FooterLink href="/prepare">{t("preparation.cta")}</FooterLink>
          </FooterColumn>

          <FooterColumn heading={t("footer.contactHeading")}>
            <p className="text-sm text-muted">{t("footer.contactPhonePlaceholder")}</p>
            <p className="text-sm text-muted">{t("footer.contactEmailPlaceholder")}</p>
            <div className="pt-2">
              <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted">
                {t("footer.languageHeading")}
              </p>
              <LanguageSwitcher variant="inline" />
            </div>
          </FooterColumn>
        </div>

        <div className="mt-12 rounded-2xl bg-ivory p-5 text-sm leading-relaxed text-muted">
          <p className="mb-1 font-semibold text-charcoal">
            {t("footer.medicalDisclaimerTitle")}
          </p>
          <p>{t("footer.medicalDisclaimer")}</p>
        </div>

        <div className="mt-8 flex flex-col gap-3 border-t border-charcoal/10 pt-6 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} [Clinic Name]. {t("footer.copyright")}
          </p>
          <div className="flex gap-5">
            <Link href="/privacy" className="hover:text-primary">
              {t("footer.privacyPolicy")}
            </Link>
            <Link href="/terms" className="hover:text-primary">
              {t("footer.terms")}
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}

function FooterColumn({
  heading,
  children,
}: {
  heading: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-muted">
        {heading}
      </p>
      <div className="flex flex-col gap-2">{children}</div>
    </div>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="text-sm text-charcoal/80 hover:text-primary">
      {children}
    </Link>
  );
}
