import { describe, expect, it } from "vitest";
import { submitEnquiry, validateEnquiry } from "./enquiries";

describe("enquiry validation", () => {
  it("requires the contact form fields", () => {
    expect(Object.keys(validateEnquiry("contact", {}))).toEqual(["name", "contact", "message"]);
  });

  it("accepts an email or a phone number as the contact", () => {
    const base = { name: "Grace", message: "Hello" };
    expect(validateEnquiry("contact", { ...base, contact: "grace@example.com" })).toEqual({});
    expect(validateEnquiry("contact", { ...base, contact: "+234 803 250 7326" })).toEqual({});
    expect(validateEnquiry("contact", { ...base, contact: "not sure" })).toHaveProperty("contact");
  });

  it("checks email and phone formats on the affiliate form", () => {
    const errors = validateEnquiry("affiliate", { email: "x", phone: "12" });
    expect(errors.email).toMatch(/email/);
    expect(errors.phone).toMatch(/phone/);
  });

  it("resolves ok only when valid", async () => {
    expect(await submitEnquiry("newsletter", { email: "a@b.co" })).toEqual({ ok: true });
    expect((await submitEnquiry("newsletter", { email: "" })).ok).toBe(false);
  });
});
