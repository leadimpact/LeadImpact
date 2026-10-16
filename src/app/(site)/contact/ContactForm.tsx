"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { COUNTRY_LIST } from "@/content/countries";
import { useCountry } from "@/lib/country";
import { submitEnquiry } from "@/demo/api/enquiries";
import { DemoNote, Field, SelectBox, formToRecord, inputClass } from "@/components/ui/Form";

const TOPICS: [string, string][] = [
  ["admissions", "Admissions"],
  ["programs", "Programs and courses"],
  ["fees", "Tuition and payments"],
  ["learn", "LIU Learn and technical help"],
  ["events", "Events and conferences"],
  ["affiliates", "Becoming an affiliate"],
  ["other", "Something else"],
];

/** S23 message form. `?topic=` preselects the subject (used by event links). */
export function ContactForm() {
  const { country } = useCountry();
  const params = useSearchParams();
  const topic = TOPICS.some(([v]) => v === params.get("topic")) ? params.get("topic")! : "admissions";
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [state, setState] = useState<"idle" | "sending" | "sent">("idle");

  if (state === "sent") {
    return (
      <div role="status" className="mt-6">
        <CheckCircle2 size={36} aria-hidden className="text-success" />
        <p className="mt-3 font-display text-[22px] font-extrabold">Thank you — your message is on its way.</p>
        <p className="mt-2 text-muted">We reply to every message within one working day.</p>
        <DemoNote />
      </div>
    );
  }

  return (
    <form
      noValidate
      onSubmit={async (e) => {
        e.preventDefault();
        const form = e.currentTarget;
        setState("sending");
        const result = await submitEnquiry("contact", formToRecord(form));
        if (result.ok) setState("sent");
        else {
          setErrors(result.errors ?? {});
          setState("idle");
          requestAnimationFrame(() => form.querySelector<HTMLElement>("[aria-invalid=true]")?.focus());
        }
      }}
      className="mt-6 grid gap-5 md:grid-cols-2"
    >
      <Field label="Full name" name="name" required error={errors.name}>
        {(p) => <input {...p} autoComplete="name" className={inputClass} />}
      </Field>
      <Field label="Email or phone" name="contact" required error={errors.contact}>
        {(p) => <input {...p} autoComplete="email" className={inputClass} />}
      </Field>
      <Field label="Country" name="country">
        {(p) => (
          <SelectBox
            {...p}
            key={country.code}
            defaultValue={country.name}
            options={[...COUNTRY_LIST.map((c) => [c.name, c.name] as [string, string]), ["Other", "Other country"]]}
          />
        )}
      </Field>
      <Field label="I’m asking about" name="topic">
        {(p) => <SelectBox {...p} defaultValue={topic} options={TOPICS} />}
      </Field>
      <Field label="Message" name="message" required error={errors.message} className="md:col-span-2">
        {(p) => <textarea {...p} rows={5} placeholder="How can we help you?" className={`${inputClass} py-3`} />}
      </Field>
      <div className="md:col-span-2">
        <button type="submit" disabled={state === "sending"} className="btn btn-orange">
          {state === "sending" ? "Sending…" : "Send message"}
          <ArrowRight size={18} aria-hidden />
        </button>
      </div>
    </form>
  );
}
