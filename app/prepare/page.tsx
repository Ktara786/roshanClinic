import type { Metadata } from "next";
import PrepareFlow from "./prepare-flow";

export const metadata: Metadata = {
  title: "Prepare for Your Consultation | [Clinic Name]",
  description:
    "A short, frontend-only questionnaire to help you and your doctor make the most of your consultation.",
};

export default function PreparePage() {
  return <PrepareFlow />;
}
