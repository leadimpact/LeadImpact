"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import clsx from "clsx";
import { ChevronRight, Menu, MessageCircle, Phone, Search, User, X } from "lucide-react";
import { APP_LINKS } from "@/content/site";
import { MOBILE_MENU_GROUPS, affiliateHref } from "@/content/navigation";
import { useCountry } from "@/lib/country";
import { Logo } from "./Logo";
import { MobileUtilityBar } from "./UtilityBar";
import { WhatsAppLink } from "./WhatsAppLink";

/**
 * Mobile header (SM1): logo, an always-visible Apply button and a labelled Menu button.
 * The menu (SM2) is a full-screen panel listing every link openly — no accordions.
 */
export function MobileHeader() {
  const [open, setOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const close = useCallback(() => {
    setOpen(false);
    menuButtonRef.current?.focus();
  }, []);

  return (
    <>
      <MobileUtilityBar />
      <HeaderRow open={false} onToggle={() => setOpen(true)} buttonRef={menuButtonRef} />
      {open && <MobileMenu onClose={close} />}
    </>
  );
}

function HeaderRow({
  open,
  onToggle,
  buttonRef,
}: {
  open: boolean;
  onToggle: () => void;
  buttonRef?: React.Ref<HTMLButtonElement>;
}) {
  return (
    <div className="flex h-[72px] items-center justify-between border-b border-line bg-white pl-4">
      {/* Overhangs the bottom edge only: the top would be cut off once the header sticks. */}
      <Logo
        size="sm"
        crestClassName="relative z-10 h-[92px] translate-y-[14px] drop-shadow-[0_8px_12px_rgba(14,15,18,0.35)]"
        crestSizes="80px"
        priority
      />
      <div className="flex h-full">
        <Link
          href={APP_LINKS.apply}
          className="flex h-full items-center bg-orange px-4 font-display text-[13.5px] font-extrabold uppercase tracking-[0.08em] text-black hover:bg-orange-hover"
        >
          Apply
        </Link>
        <button
          ref={buttonRef}
          type="button"
          onClick={onToggle}
          aria-expanded={open}
          aria-controls={open ? "mobile-menu" : undefined}
          className={clsx(
            "flex w-[72px] flex-col items-center justify-center gap-[3px] font-display text-[10.5px] font-extrabold uppercase tracking-[0.08em] text-white",
            open ? "bg-black" : "bg-charcoal",
          )}
        >
          {open ? <X size={22} aria-hidden /> : <Menu size={22} aria-hidden />}
          {open ? "Close" : "Menu"}
        </button>
      </div>
    </div>
  );
}

const FOCUSABLE = 'a[href],button:not([disabled]),input,select,[tabindex]:not([tabindex="-1"])';

function MobileMenu({ onClose }: { onClose: () => void }) {
  const panelRef = useRef<HTMLDivElement>(null);
  const { country } = useCountry();

  useEffect(() => {
    const panel = panelRef.current;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    panel?.querySelector<HTMLButtonElement>("button[aria-expanded]")?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") return onClose();
      if (e.key !== "Tab" || !panel) return;
      const items = Array.from(panel.querySelectorAll<HTMLElement>(FOCUSABLE));
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  // Close when a link inside the panel navigates.
  const onClick = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest("a")) onClose();
  };

  return (
    <div
      ref={panelRef}
      id="mobile-menu"
      role="dialog"
      aria-modal="true"
      aria-label="Site menu"
      onClick={onClick}
      className="fixed inset-0 z-50 overflow-y-auto bg-white"
    >
      <MobileUtilityBar />
      <HeaderRow open onToggle={onClose} />

      <div className="px-5 py-4">
        <div className="flex gap-2.5">
          <Link href={APP_LINKS.apply} className="btn btn-orange flex-1">
            Apply now
          </Link>
          <Link href={APP_LINKS.studentPortal} className="btn btn-outline flex-1">
            <User size={18} aria-hidden />
            Login
          </Link>
        </div>
        <form action="/search" role="search" className="mt-3">
          <label className="flex min-h-[52px] items-center gap-2.5 rounded-[6px] border-[1.5px] border-line px-4 text-muted focus-within:border-charcoal">
            <Search size={20} aria-hidden />
            <span className="sr-only">Search the website</span>
            <input
              type="search"
              name="q"
              placeholder="Search the website"
              className="h-full flex-1 bg-transparent text-[17px] text-ink outline-none placeholder:text-muted"
            />
          </label>
        </form>
      </div>

      <nav aria-label="Site sections">
        {MOBILE_MENU_GROUPS.map((group) => (
          <section key={group.title} className="px-5 pb-2" aria-labelledby={`mm-${group.title}`}>
            <h2 id={`mm-${group.title}`} className="eyebrow pb-1.5 pt-3.5 text-[12px]">
              {group.title}
            </h2>
            <ul>
              {group.links.map((l) => (
                <li key={l.label}>
                  <Link
                    href={l.countryAffiliate ? affiliateHref(country.code) : l.href}
                    className="flex min-h-[52px] items-center justify-between border-b border-line-soft py-3 text-[17px] font-bold"
                  >
                    {l.label}
                    <ChevronRight size={20} aria-hidden className="text-[#9B9893]" />
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </nav>

      <div className="flex gap-2.5 px-5 pb-[26px] pt-4">
        <WhatsAppLink className="btn btn-sm btn-whatsapp flex-1">
          <MessageCircle size={18} aria-hidden />
          WhatsApp
        </WhatsAppLink>
        <a href={`tel:+${country.phone}`} className="btn btn-sm btn-outline flex-1">
          <Phone size={18} aria-hidden />
          Call
        </a>
      </div>
    </div>
  );
}
