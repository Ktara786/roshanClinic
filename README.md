# [Clinic Name] — Homeopathy Clinic Website (Frontend MVP)

A frontend-only Next.js MVP for a homeopathy clinic. No backend, database,
auth, or payments — everything runs on mock data and local/frontend state,
structured so a real backend can be wired in later without redesigning the UI.

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000. The first build downloads two Google Fonts
(DM Serif Display, Inter) — an internet connection is required for `npm run dev`
and `npm run build` the first time.

```bash
npm run build   # production build
npm run start   # run the production build
npm run lint    # eslint
```

## What's implemented

- **Full page**: hero, doctor introduction, "what would you like help with"
  cards, how-it-works timeline, first-consultation explainer, online/clinic
  consultation cards, preparation checklist, our-approach steps, clinic
  info, FAQ accordion, final CTA, footer with medical disclaimer.
- **Booking flow**: a 5-step modal (type → date → time → details → review)
  using mock availability. Opens from any "Book a Consultation" CTA via
  `BookingModalContext`. On confirm, shows a clear demo-only success message
  — no real appointment is created.
- **`/prepare`**: a 5-step pre-consultation questionnaire. Saves a draft to
  `localStorage` as the user progresses (no server upload).
- **Full English / Gujarati / Hindi support**, switchable from the header
  (desktop) and mobile menu, persisted to `localStorage`, with best-effort
  browser-language detection on first visit that never overrides a manual
  choice.
- Mobile-first, responsive layouts (not just shrunk desktop layouts), a
  fixed mobile "Book Consultation" bar, accessible markup (semantic HTML,
  aria labels, keyboard-navigable accordion/modal, visible focus states).

## Architecture

```
app/                     Next.js App Router routes
  layout.tsx              Root layout: fonts, metadata, providers
  page.tsx                Homepage (assembles src/components/home/*)
  prepare/                /prepare route + client flow
  about/, privacy/, terms/  Placeholder routes

src/
  i18n/                   Translation system
    locales/en.ts          Source of truth for keys + English copy
    locales/gu.ts, hi.ts    Same key shape, Gujarati / Hindi copy
    LanguageProvider.tsx    Context: current locale, setLocale, t()
    translations.ts         Dot-path key type + lookup/interpolation
    config.ts                Locale list, labels, localStorage key, detection

  components/
    common/                 Button, Container, SectionHeading,
                            LanguageSwitcher, AnimatedSection
    layout/                 Header, MobileNav, Footer, MobileBookingBar
    home/                   One component per homepage section
    booking/                BookingModal + its 5 step components

  context/
    BookingModalContext.tsx  Lets any CTA open the booking modal

  data/                    Static/mock content, kept out of components
    doctor.ts, consultations.ts, concerns.ts, faq.ts, availability.ts

  services/                Backend-ready service boundaries (mocked now)
    booking.service.ts       getAvailability(), createBooking()
    doctor.service.ts        getDoctorProfile()
    patient.service.ts       saveDraft()/loadDraft()/submitPrepareForm()

  types/index.ts           Shared TypeScript types
```

### Adding the real backend later

Each function in `src/services/*.service.ts` has a comment showing the
`fetch("/api/...")` call it should become. Because components only import
from the service layer (never construct mock data themselves), swapping
the internals of these functions is enough — no component changes needed.

### Adding/editing translations

1. Add the new key (with English copy) to `src/i18n/locales/en.ts`.
2. TypeScript will immediately flag `gu.ts` and `hi.ts` as missing that key
   (the `Translations` type is derived from `en.ts`'s shape) — fill them in.
3. Use it in a component via `const { t } = useLanguage(); t("section.key")`.

Never hardcode user-facing strings directly in a component — everything
(including validation messages, empty states, and aria-labels) should go
through `t()`.

## Known placeholders (intentional)

- Doctor's real name, photo, registration number, clinic address/hours/map,
  and contact details are all placeholders — see `src/data/doctor.ts` and
  the `Clinic` section copy.
- No testimonials, patient counts, or years-of-experience claims are used,
  per the project brief.
- Booking and prepare-form submissions are mocked; nothing is sent to a
  server or stored beyond the current browser's `localStorage`.


  inso -> https://homeo-wellness-13.preview.emergentagent.com/
