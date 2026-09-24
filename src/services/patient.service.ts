import type { PrepareFormDraft } from "@/types";

const DRAFT_STORAGE_KEY = "clinic_prepare_draft";

/**
 * Service boundary for patient-submitted pre-consultation data.
 * For the MVP this only persists to localStorage on the patient's own
 * device. Future: POST /api/patients/prepare, replacing saveDraft's body.
 */

export function saveDraft(draft: PrepareFormDraft): void {
  try {
    window.localStorage.setItem(DRAFT_STORAGE_KEY, JSON.stringify(draft));
  } catch {
    // Ignore storage failures (private browsing, quota, etc.)
  }
}

export function loadDraft(): PrepareFormDraft | null {
  try {
    const raw = window.localStorage.getItem(DRAFT_STORAGE_KEY);
    return raw ? (JSON.parse(raw) as PrepareFormDraft) : null;
  } catch {
    return null;
  }
}

export function clearDraft(): void {
  try {
    window.localStorage.removeItem(DRAFT_STORAGE_KEY);
  } catch {
    // no-op
  }
}

export async function submitPrepareForm(
  draft: PrepareFormDraft
): Promise<{ success: true; demo: true }> {
  // Future: return fetch("/api/patients/prepare", { method: "POST", body: JSON.stringify(draft) }).then(r => r.json());
  saveDraft(draft);
  return Promise.resolve({ success: true, demo: true });
}
