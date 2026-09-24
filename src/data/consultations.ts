import type { ConsultationType } from "@/types";

export interface ConsultationOption {
  type: ConsultationType;
  durationMinutes: number;
}

export const consultationOptions: ConsultationOption[] = [
  { type: "online", durationMinutes: 30 },
  { type: "clinic", durationMinutes: 30 },
];
