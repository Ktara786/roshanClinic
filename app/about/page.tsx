import type { Metadata } from "next";
import AboutContent from "./about-content";

export const metadata: Metadata = {
  title: "About the Doctor | [Clinic Name]",
  description: "Learn about the BHMS-qualified doctor behind [Clinic Name].",
};

export default function AboutPage() {
  return <AboutContent />;
}
