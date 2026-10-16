"use client";

import { useState } from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { COUNTRY_LIST } from "@/content/countries";
import { useCountry } from "@/lib/country";
import { submitEnquiry } from "@/demo/api/enquiries";
import { DemoNote, Field, SelectBox, formToRecord, inputClass } from "@/components/ui/Form";

/** S18 partnership form. Fields match the current LIU form, plus country and type from the design. */
export function AffiliateForm({ orgTypes }: { orgTypes: string[] }) {
  const { country } = useCountry();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [state, setState] = useState<"idle" | "sending" | "sent">("idle");

  if (state === "sent") {
    return (
      <div role="status" className="rounded-[10px] border-[1.5px] border-line bg-white p-8">
        <CheckCircle2 size={36} aria-hidden className="text-success" />
        <p className="mt-3 font-display text-[22px] font-extrabold">Thank you for your partnership interest.</p>
        <p className="mt-2 text-muted">Our affiliates team will contact you within 5 working days to arrange a conversation.</p>
        <DemoNote />
      </div>
    );
  }

  return (
    <form
      noValidate
      onSubmit={async (e) => {
        e.preventDefault();
        const form = e.currentTarget; // currentTarget is cleared after the await
        setState("sending");
        const result = await submitEnquiry("affiliate", formToRecord(form));
        if (result.ok) setState("sent");
        else {
          setErrors(result.errors ?? {});
          setState("idle");
          requestAnimationFrame(() => form.querySelector<HTMLElement>("[aria-invalid=true]")?.focus());
        }
      }}
      className="grid gap-5 rounded-[10px] border-[1.5px] border-line bg-white p-6 md:grid-cols-2 md:p-8"
    >
      <Field label="Full name" name="name" required error={errors.name}>
        {(p) => <input {...p} autoComplete="name" placeholder="e.g. Rev. Samuel Okello" className={inputClass} />}
      </Field>
      <Field label="Email" name="email" required error={errors.email}>
        {(p) => <input {...p} type="email" autoComplete="email" placeholder="you@ministry.org" className={inputClass} />}
      </Field>
      <Field label="Phone (WhatsApp)" name="phone" required error={errors.phone}>
        {(p) => <input {...p} type="tel" autoComplete="tel" placeholder="+ country code and number" className={inputClass} />}
      </Field>
      <Field label="Country" name="country" required error={errors.country}>
        {(p) => (
          <SelectBox
            {...p}
            key={country.code}
            defaultValue={country.name}
            options={[...COUNTRY_LIST.map((c) => [c.name, c.name] as [string, string]), ["Other", "Other country"]]}
          />
        )}
      </Field>
      <Field label="Name of organisation" name="organisation" required error={errors.organisation}>
        {(p) => <input {...p} autoComplete="organization" placeholder="Church, ministry or college" className={inputClass} />}
      </Field>
      <Field label="Type" name="type">
        {(p) => <SelectBox {...p} options={orgTypes.map((t) => [t, t])} />}
      </Field>
      <Field label="Address" name="address" required error={errors.address} className="md:col-span-2">
        {(p) => <input {...p} autoComplete="street-address" placeholder="Street, city" className={inputClass} />}
      </Field>
      <Field label="About your organisation" name="about" required error={errors.about} className="md:col-span-2">
        {(p) => (
          <textarea
            {...p}
            rows={4}
            placeholder="Number of students, programs you run, why you want to partner…"
            className={`${inputClass} py-3`}
          />
        )}
      </Field>
      <div className="flex flex-wrap items-center justify-between gap-4 md:col-span-2">
        <p className="text-[14px] text-muted">* Required</p>
        <button type="submit" disabled={state === "sending"} className="btn btn-orange">
          {state === "sending" ? "Sending…" : "Submit application"}
          <ArrowRight size={18} aria-hidden />
        </button>
      </div>
    </form>
  );
}
