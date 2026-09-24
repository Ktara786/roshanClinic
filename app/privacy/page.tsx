import type { Metadata } from "next";
import Container from "@/components/common/Container";

export const metadata: Metadata = {
  title: "Privacy Policy | [Clinic Name]",
};

export default function PrivacyPage() {
  return (
    <Container className="max-w-2xl py-14 sm:py-20">
      <h1 className="font-serif text-3xl text-charcoal">Privacy Policy</h1>
      <p className="mt-6 text-base leading-relaxed text-muted">
        Placeholder — the full privacy policy will be added here before launch. This
        MVP does not collect, store, or transmit any real patient data to a server.
      </p>
    </Container>
  );
}
