import type { Metadata } from "next";
import Container from "@/components/common/Container";

export const metadata: Metadata = {
  title: "Terms | [Clinic Name]",
};

export default function TermsPage() {
  return (
    <Container className="max-w-2xl py-14 sm:py-20">
      <h1 className="font-serif text-3xl text-charcoal">Terms</h1>
      <p className="mt-6 text-base leading-relaxed text-muted">
        Placeholder — full terms of use will be added here before launch.
      </p>
    </Container>
  );
}
