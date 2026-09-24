import type { DayAvailability } from "@/types";

/**
 * Mock availability for the booking demo.
 * In production this will come from GET /api/availability?type=&date=
 */
const mockTimes = ["5:30 PM", "6:00 PM", "6:30 PM", "7:00 PM"];

function isoDateFromToday(offsetDays: number): string {
  const d = new Date();
  d.setDate(d.getDate() + offsetDays);
  return d.toISOString().slice(0, 10);
}

export function getMockAvailability(): DayAvailability[] {
  // Next 7 days, with a couple of "fully booked" days sprinkled in
  // to demonstrate the empty state.
  return Array.from({ length: 7 }).map((_, i) => {
    const date = isoDateFromToday(i);
    const fullyBooked = i === 2 || i === 5;
    return {
      date,
      slots: fullyBooked
        ? []
        : mockTimes.map((time, idx) => ({
            id: `${date}-${idx}`,
            time,
            available: !(i === 1 && idx === 0), // one slot pre-booked, for realism
          })),
    };
  });
}
