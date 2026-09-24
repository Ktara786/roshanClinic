import type { FaqItem } from "@/types";
import type { TranslationKey } from "@/i18n/translations";

type FaqItemWithTypedKeys = Omit<FaqItem, "questionKey" | "answerKey"> & {
  questionKey: TranslationKey;
  answerKey: TranslationKey;
};

export const faqItems: FaqItemWithTypedKeys[] = [
  { id: "q1", questionKey: "faq.items.q1", answerKey: "faq.items.a1" },
  { id: "q2", questionKey: "faq.items.q2", answerKey: "faq.items.a2" },
  { id: "q3", questionKey: "faq.items.q3", answerKey: "faq.items.a3" },
  { id: "q4", questionKey: "faq.items.q4", answerKey: "faq.items.a4" },
  { id: "q5", questionKey: "faq.items.q5", answerKey: "faq.items.a5" },
  { id: "q6", questionKey: "faq.items.q6", answerKey: "faq.items.a6" },
  { id: "q7", questionKey: "faq.items.q7", answerKey: "faq.items.a7" },
  { id: "q8", questionKey: "faq.items.q8", answerKey: "faq.items.a8" },
];
