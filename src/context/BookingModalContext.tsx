"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";
import type { ConsultationType } from "@/types";
import BookingModal from "@/components/booking/BookingModal";

interface BookingModalContextValue {
  openBooking: (preselectedType?: ConsultationType) => void;
  closeBooking: () => void;
}

const BookingModalContext = createContext<BookingModalContextValue | null>(null);

export function BookingModalProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [preselectedType, setPreselectedType] = useState<ConsultationType | undefined>();

  const openBooking = useCallback((type?: ConsultationType) => {
    setPreselectedType(type);
    setIsOpen(true);
  }, []);

  const closeBooking = useCallback(() => {
    setIsOpen(false);
    setPreselectedType(undefined);
  }, []);

  const value = useMemo(() => ({ openBooking, closeBooking }), [openBooking, closeBooking]);

  return (
    <BookingModalContext.Provider value={value}>
      {children}
      <BookingModal
        isOpen={isOpen}
        onClose={closeBooking}
        preselectedType={preselectedType}
      />
    </BookingModalContext.Provider>
  );
}

export function useBookingModal() {
  const ctx = useContext(BookingModalContext);
  if (!ctx) {
    throw new Error("useBookingModal must be used within a BookingModalProvider");
  }
  return ctx;
}
