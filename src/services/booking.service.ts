import type { BookingDraft, ConsultationType, DayAvailability } from "@/types";
import { getMockAvailability } from "@/data/availability";

/**
 * Service boundary for booking-related operations.
 *
 * These are mock implementations for the frontend MVP. Once the backend
 * exists, swap the bodies for real `fetch("/api/...")` calls — the
 * function signatures are designed to stay the same so no UI changes
 * are needed.
 */

export async function getAvailability(
  _type: ConsultationType
): Promise<DayAvailability[]> {
  // Future: return fetch(`/api/availability?type=${_type}`).then(r => r.json());
  await simulateLatency();
  return getMockAvailability();
}

export interface CreateBookingResult {
  success: true;
  demo: true;
  referenceId: string;
}

export async function createBooking(
  draft: BookingDraft
): Promise<CreateBookingResult> {
  // Future: return fetch("/api/bookings", { method: "POST", body: JSON.stringify(draft) }).then(r => r.json());
  await simulateLatency();
  // eslint-disable-next-line no-console
  console.info("[demo] booking request captured", draft);
  return {
    success: true,
    demo: true,
    referenceId: `DEMO-${Date.now().toString(36).toUpperCase()}`,
  };
}

function simulateLatency(ms = 400) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
