/**
 * Website enquiry forms (contact, become an affiliate, newsletter).
 *
 * DEMO ONLY: nothing is sent. In production these become POST calls to the FastAPI back end
 * (`/enquiries`, `/affiliate-applications`, `/newsletter`), described in api/openapi.yaml.
 * Validation rules live here, not in the page components, so the API can mirror them.
 */

export type EnquiryKind = "contact" | "affiliate" | "newsletter";

export interface EnquiryResult {
  ok: boolean;
  /** Field name → message, for fields that failed validation. */
  errors?: Record<string, string>;
}

const REQUIRED: Record<EnquiryKind, string[]> = {
  contact: ["name", "contact", "message"],
  affiliate: ["name", "email", "phone", "country", "organisation", "address", "about"],
  newsletter: ["email"],
};

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE = /^\+?[\d\s()-]{7,}$/;

export function validateEnquiry(kind: EnquiryKind, data: Record<string, string>): Record<string, string> {
  const errors: Record<string, string> = {};
  for (const field of REQUIRED[kind]) {
    if (!data[field]?.trim()) errors[field] = "Please fill this in.";
  }
  if (data.email && !EMAIL.test(data.email.trim())) errors.email = "Enter an email address like name@example.com.";
  if (data.phone && !PHONE.test(data.phone.trim())) errors.phone = "Enter a phone number with country code, e.g. +256 …";
  if (kind === "contact" && data.contact && !EMAIL.test(data.contact.trim()) && !PHONE.test(data.contact.trim())) {
    errors.contact = "Enter an email address or a phone number.";
  }
  return errors;
}

export async function submitEnquiry(kind: EnquiryKind, data: Record<string, string>): Promise<EnquiryResult> {
  const errors = validateEnquiry(kind, data);
  if (Object.keys(errors).length > 0) return { ok: false, errors };
  await new Promise((r) => setTimeout(r, 300));
  return { ok: true };
}
