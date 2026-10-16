"use client";

import { useState } from "react";
import { CheckCircle2, Mail } from "lucide-react";
import { submitEnquiry } from "@/demo/api/enquiries";
import { DemoNote } from "@/components/ui/Form";

/** S21 "Get the monthly newsletter" band. */
export function NewsletterBand() {
  const [state, setState] = useState<"idle" | "error" | "sent">("idle");
  return (
    <section aria-labelledby="newsletter-band" className="on-dark flex flex-col gap-6 bg-charcoal px-page py-12 text-white lg:flex-row lg:items-center lg:justify-between">
      <div>
        <h2 id="newsletter-band" className="font-display text-[28px] font-extrabold tracking-[-0.02em] md:text-[32px]">
          Get the monthly newsletter
        </h2>
        <p className="mt-1 text-on-dark">Stories, events and admission dates — straight to your inbox.</p>
      </div>
      {state === "sent" ? (
        <div role="status" className="lg:w-[460px]">
          <p className="flex items-center gap-2 font-bold">
            <CheckCircle2 size={20} aria-hidden className="text-orange" /> Thank you — you’re on the list.
          </p>
          <DemoNote />
        </div>
      ) : (
        <form
          noValidate
          onSubmit={async (e) => {
            e.preventDefault();
            const email = String(new FormData(e.currentTarget).get("email") ?? "");
            const result = await submitEnquiry("newsletter", { email });
            setState(result.ok ? "sent" : "error");
          }}
          className="lg:w-[460px]"
        >
          <div className="flex items-center rounded-[6px] bg-white p-1.5 pl-4 text-ink">
            <Mail size={18} aria-hidden className="flex-none text-muted" />
            <label htmlFor="newsletter-band-email" className="sr-only">
              Your email address
            </label>
            <input
              id="newsletter-band-email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="Your email address"
              aria-invalid={state === "error" || undefined}
              aria-describedby={state === "error" ? "newsletter-band-error" : undefined}
              className="min-h-12 min-w-0 flex-1 bg-transparent px-3 outline-none"
            />
            <button type="submit" className="btn btn-orange btn-sm">
              Subscribe
            </button>
          </div>
          {state === "error" && (
            <p id="newsletter-band-error" className="mt-2 font-bold text-orange">
              Enter an email address like name@example.com.
            </p>
          )}
        </form>
      )}
    </section>
  );
}
