"use client";

import { useState } from "react";
import clsx from "clsx";
import { Mail } from "lucide-react";

/** Footer newsletter sign-up. Not yet connected to a mailing list (see CHANGES_NEEDED.md). */
export function NewsletterForm({ className }: { className?: string }) {
  const [done, setDone] = useState(false);

  if (done) {
    return (
      <p role="status" className={clsx("border border-line-dark bg-charcoal px-4 py-3 text-[15px]", className)}>
        Thank you — you’re on the list.
      </p>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setDone(true);
      }}
      className={clsx("flex items-center border border-line-dark bg-charcoal py-1.5 pl-3.5 pr-1.5", className)}
    >
      <Mail size={16} aria-hidden className="flex-none text-on-dark-muted" />
      <label htmlFor="newsletter-email" className="sr-only">
        Newsletter — your email
      </label>
      <input
        id="newsletter-email"
        type="email"
        required
        autoComplete="email"
        placeholder="Your email"
        className="min-w-0 flex-1 bg-transparent px-2 text-[15px] text-white outline-none placeholder:text-on-dark-muted"
      />
      <button
        type="submit"
        className="min-h-10 bg-orange px-3 font-display text-[12px] font-extrabold uppercase tracking-[0.06em] text-black hover:bg-orange-hover"
      >
        Join
      </button>
    </form>
  );
}
