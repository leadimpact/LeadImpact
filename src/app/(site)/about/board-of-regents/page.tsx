import type { Metadata } from "next";
import Link from "next/link";
import clsx from "clsx";
import { ArrowRight, Mail, User } from "lucide-react";
import { BOARD_OF_REGENTS, BOARD_PAGE, boardMemberHref } from "@/content/people";
import { SITE } from "@/content/site";
import { mailto } from "@/config/domains";
import { PageHero } from "@/components/ui/PageHero";
import { Photo } from "@/components/ui/Photo";
import { TitleBlock } from "@/components/ui/SectionHeader";
import { CheckList } from "@/components/ui/CheckList";

export const metadata: Metadata = {
  title: "Board of Regents",
  description: BOARD_PAGE.hero.subtitle,
};

const SECRETARY_MAILTO = mailto(SITE.email, "For the Secretary to the Board of Regents");

/** S08 */
export default function BoardOfRegentsPage() {
  return (
    <>
      <PageHero
        title={BOARD_PAGE.hero.title}
        subtitle={BOARD_PAGE.hero.subtitle}
        bannerLabel={BOARD_PAGE.hero.bannerLabel}
        banner={BOARD_PAGE.hero.banner}
        crumbs={[{ label: "Home", href: "/" }, { label: "The University", href: "/about" }, { label: "Board of Regents" }]}
      />

      <section aria-label="Members of the Board" className="px-page py-14 md:py-[100px]">
        <ul className="grid grid-cols-1 gap-[26px] sm:grid-cols-2 xl:grid-cols-4">
          {BOARD_OF_REGENTS.map((m) => {
            const chair = m.role === "Board Chairman";
            return (
              <li key={m.slug}>
                <Link
                  href={boardMemberHref(m)}
                  className={clsx(
                    "group block overflow-hidden rounded-[8px] border-[1.5px] bg-white",
                    chair ? "border-orange shadow-[0_0_0_3px_var(--color-orange-tint)]" : "border-line hover:border-charcoal",
                  )}
                >
                  <Photo asset={m.photo} sizes="(min-width: 1280px) 25vw, (min-width: 640px) 50vw, 100vw" position="top" icon={User} className="h-[300px]" />
                  <div className="p-[22px]">
                    <p className={clsx("eyebrow text-[12px]", chair && "text-orange-deep")}>{m.role}</p>
                    <h2 className="mt-2 font-display text-[24px] font-extrabold tracking-[-0.02em] text-black">{m.name}</h2>
                    <span className="mt-3 inline-flex items-center gap-2 font-display text-[15px] font-bold text-orange-text group-hover:underline">
                      View profile
                      <ArrowRight size={16} aria-hidden />
                    </span>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </section>

      <section className="bg-[#F4F2EF] px-page py-14 md:py-[100px]">
        <div className="flex flex-col gap-12 lg:flex-row lg:gap-16">
          <div className="flex-1">
            <TitleBlock eyebrow="Governance" title="How the Board serves LIU" />
            <CheckList items={BOARD_PAGE.duties} />
          </div>
          <aside aria-labelledby="contact-board" className="on-dark rounded-[10px] bg-charcoal p-8 text-white lg:w-[440px] lg:flex-none">
            <h2 id="contact-board" className="eyebrow">
              Contact the Board
            </h2>
            <p className="mt-3.5 leading-relaxed text-on-dark">{BOARD_PAGE.contact}</p>
            <p className="mt-[18px] flex items-center gap-2.5">
              <Mail size={18} aria-hidden />
              {SITE.email}
            </p>
            <a href={SECRETARY_MAILTO} className="btn btn-orange mt-[22px]">
              Write to the Secretary
              <ArrowRight size={18} aria-hidden />
            </a>
          </aside>
        </div>
      </section>
    </>
  );
}
