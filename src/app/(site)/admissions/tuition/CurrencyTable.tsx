"use client";

import Link from "next/link";
import clsx from "clsx";
import { ArrowRight, CircleHelp, CreditCard } from "lucide-react";
import { COUNTRY_LIST, PAYMENT_METHOD_LABELS } from "@/content/countries";
import { TUITION } from "@/content/colleges";
import { APP_LINKS } from "@/content/site";
import { formatLocal, formatUsd } from "@/lib/currency";
import { useCountry } from "@/lib/country";
import { Tbc } from "@/components/ui/Tbc";
import { WhatsAppLink } from "@/components/site/WhatsAppLink";

/** S11 local-currency table. The visitor's selected country is highlighted. */
export function CurrencyTable() {
  const { country } = useCountry();
  return (
    <>
      {/* Focusable so keyboard users can scroll the table sideways on phones. */}
      <div
        role="region"
        aria-label="Tuition by country"
        tabIndex={0}
        className="overflow-x-auto rounded-[10px] border border-line bg-white"
      >
        <table className="w-full min-w-[720px] text-left text-[15.5px]">
          <caption className="sr-only">Approximate tuition in each country’s currency</caption>
          <thead className="bg-black font-display text-[12px] font-extrabold uppercase tracking-[0.1em] text-white">
            <tr>
              <th scope="col" className="px-5 py-4">Country</th>
              <th scope="col" className="px-5 py-4">Currency</th>
              <th scope="col" className="px-5 py-4">Per course</th>
              <th scope="col" className="px-5 py-4">{TUITION.bundleCourses} courses</th>
              <th scope="col" className="px-5 py-4">How to pay</th>
            </tr>
          </thead>
          <tbody>
            {COUNTRY_LIST.map((c) => {
              const usd = c.code === "US";
              const selected = c.code === country.code;
              return (
                <tr
                  key={c.code}
                  aria-current={selected ? "true" : undefined}
                  className={clsx("border-t border-line", selected && "bg-orange-tint/60")}
                >
                  <th scope="row" className="px-5 py-4 font-bold">
                    <span className="flex items-center gap-3">
                      <span
                        aria-hidden
                        className={clsx(
                          "flex size-8 items-center justify-center rounded-full font-display text-[11px] font-extrabold",
                          c.badge,
                        )}
                      >
                        {c.code}
                      </span>
                      {c.name}
                    </span>
                  </th>
                  <td className="px-5 py-4 text-muted">{c.currency.code}</td>
                  <td className="px-5 py-4 font-bold">
                    {usd ? formatUsd(TUITION.perCourse) : <Tbc>≈ {formatLocal(TUITION.perCourse, c.code)}</Tbc>}
                  </td>
                  <td className="px-5 py-4 font-bold">
                    {usd ? formatUsd(TUITION.bundlePrice) : <Tbc>≈ {formatLocal(TUITION.bundlePrice, c.code)}</Tbc>}
                  </td>
                  <td className="px-5 py-4 text-muted">
                    {c.paymentMethods.map((m) => PAYMENT_METHOD_LABELS[m]).join(" · ")}
                    {c.code === "NG" && " (Paystack)"}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="mt-6 flex flex-col gap-5 rounded-[10px] border border-line bg-white p-6 md:flex-row md:items-center">
        <span aria-hidden className="flex size-12 flex-none items-center justify-center rounded-[8px] bg-orange-soft text-orange-text">
          <CreditCard size={22} />
        </span>
        <div className="flex-1">
          <p className="font-display text-[19px] font-extrabold">Ready to pay?</p>
          <p className="text-[15px] text-muted">Log in to the Payments Portal to see your invoice and pay securely.</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link href={APP_LINKS.payTuition} className="btn btn-orange">
            Pay tuition
            <ArrowRight size={18} aria-hidden />
          </Link>
          <WhatsAppLink pageName="Tuition & fees › Payment help" className="btn btn-outline">
            <CircleHelp size={18} aria-hidden />
            Payment help
          </WhatsAppLink>
        </div>
      </div>
    </>
  );
}
