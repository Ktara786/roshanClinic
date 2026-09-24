import type { Metadata } from "next";
import { DM_Serif_Display, Inter } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/i18n/LanguageProvider";
import { BookingModalProvider } from "@/context/BookingModalContext";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import MobileBookingBar from "@/components/layout/MobileBookingBar";

const serif = DM_Serif_Display({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-serif",
  display: "swap",
});

const sans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "[Clinic Name] | Homeopathy Consultation",
  description:
    "Personalised homeopathy consultations, online and in person, with a BHMS-qualified doctor. Book a consultation that fits your health, concerns and everyday life.",
  openGraph: {
    title: "[Clinic Name] | Homeopathy Consultation",
    description:
      "Personalised homeopathy consultations, online and in person, with a BHMS-qualified doctor.",
    type: "website",
    locale: "en_IN",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${serif.variable} ${sans.variable} font-sans antialiased`}>
        <LanguageProvider>
          <BookingModalProvider>
            <a
              href="#main-content"
              className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-primary focus:px-4 focus:py-2 focus:text-ivory"
            >
              Skip to content
            </a>
            <Header />
            <main id="main-content" className="pb-16 lg:pb-0">
              {children}
            </main>
            <Footer />
            <MobileBookingBar />
          </BookingModalProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
