import type { DoctorProfile } from "@/types";
import { doctorProfile } from "@/data/doctor";

/**
 * Service boundary for doctor profile data.
 * Future: replace with fetch("/api/doctor") without touching callers.
 */
export async function getDoctorProfile(): Promise<DoctorProfile> {
  return Promise.resolve(doctorProfile);
}
