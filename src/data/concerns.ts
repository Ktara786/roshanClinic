import type { Concern } from "@/types";
import type { TranslationKey } from "@/i18n/translations";

type ConcernWithTypedKey = Omit<Concern, "titleKey"> & { titleKey: TranslationKey };

export const concerns: ConcernWithTypedKey[] = [
  { id: "general-wellness", icon: "Leaf", titleKey: "concerns.items.generalWellness" },
  { id: "skin", icon: "Sparkles", titleKey: "concerns.items.skin" },
  { id: "digestive", icon: "Sprout", titleKey: "concerns.items.digestive" },
  { id: "sleep-stress", icon: "Moon", titleKey: "concerns.items.sleepStress" },
  { id: "allergies", icon: "Wind", titleKey: "concerns.items.allergies" },
  { id: "womens-health", icon: "Flower2", titleKey: "concerns.items.womensHealth" },
  { id: "childrens-health", icon: "Baby", titleKey: "concerns.items.childrensHealth" },
  { id: "something-else", icon: "MessageCircle", titleKey: "concerns.items.somethingElse" },
];
