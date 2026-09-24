export type Locale = "en" | "gu" | "hi";

export type ConsultationType = "online" | "clinic";

export interface Concern {
  id: string;
  icon: string; // lucide icon name
  titleKey: string;
}

export interface FaqItem {
  id: string;
  questionKey: string;
  answerKey: string;
}

export interface TimeSlot {
  id: string;
  time: string; // display value, e.g. "5:30 PM"
  available: boolean;
}

export interface DayAvailability {
  date: string; // ISO date, e.g. "2026-09-28"
  slots: TimeSlot[];
}

export interface DoctorProfile {
  name: string;
  qualification: string;
  registrationPlaceholder: string;
  photoPlaceholder: string;
}

export interface PatientDetails {
  name: string;
  phone: string;
  email: string;
}

export interface BookingDraft {
  type: ConsultationType | null;
  date: string | null;
  time: string | null;
  patient: PatientDetails;
}

export interface PrepareFormDraft {
  basicInfo: {
    name: string;
    age: string;
    gender: string;
  };
  concern: string;
  duration: string;
  consultedBefore: "yes" | "no" | "";
  hasReports: "yes" | "no" | "";
  reportNote: string;
}
