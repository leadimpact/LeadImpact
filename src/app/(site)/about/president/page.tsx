import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Mail, Play, User } from "lucide-react";
import { PRESIDENT, PRESIDENT_MESSAGE } from "@/content/people";
import { APP_LINKS, SITE } from "@/content/site";
import { mailto } from "@/config/domains";
import { PageHero } from "@/components/ui/PageHero";
import { Photo } from "@/components/ui/Photo";
import { Tbc } from "@/components/ui/Tbc";
import { SocialLinks } from "@/components/site/SocialLinks";

export const metadata: Metadata = {
  title: "From the President’s desk",
  description: PRESIDENT_MESSAGE.hero.subtitle,
};

/** S07 */
export default function PresidentPage() {
  const m = PRESIDENT_MESSAGE;
  return (
    <>
      <PageHero
        title={m.hero.title}
        subtitle={m.hero.subtitle}
        bannerLabel={m.hero.bannerLabel}
        banner={m.hero.banner}
        crumbs={[{ label: "Home", href: "/" }, { label: "The University", href: "/about" }, { label: "President’s Desk" }]}
      />

      <section className="px-page py-14 md:py-[100px]">
        <div className="flex flex-col gap-12 lg:flex-row lg:items-start lg:gap-[72px]">
          <aside className="lg:w-[440px] lg:flex-none">
            <Photo asset={PRESIDENT.photo} sizes="(min-width: 768px) 40vw, 100vw" position="top" icon={User} priority className="h-[420px] rounded-[10px] md:h-[540px]" />
            <div className="mt-5 rounded-[8px] border-[1.5px] border-line p-6">
              <p className="font-display text-[28px] font-extrabold tracking-[-0.02em] text-black">{PRESIDENT.name}</p>
              <p className="mt-1 text-muted">President · Chairman, Board of Regents</p>
              <p className="mt-3 text-[15px] text-muted">{m.alsoFaculty}</p>
              <div className="mt-4 flex gap-2.5">
                <a
                  href={mailto(SITE.email, "For the attention of the President")}
                  aria-label="Email the President’s office"
                  className="flex size-12 items-center justify-center rounded-full border-[1.5px] border-line text-orange-text hover:border-orange"
                >
                  <Mail size={18} aria-hidden />
                </a>
                <SocialLinks
                  size={18}
                  className="gap-2.5 text-orange-text"
                  linkClassName="size-12 rounded-full border-[1.5px] border-line hover:border-orange"
                />
              </div>
            </div>
          </aside>

          <article className="flex-1">
            <blockquote className="border-l-[5px] border-orange py-1.5 pl-6 md:pl-[30px]">
              <p className="font-display text-[26px] font-extrabold leading-[1.3] tracking-[-0.02em] text-black md:text-[32px] xl:text-[38px]">
                “{m.pullQuote}”
              </p>
            </blockquote>
            {m.paragraphs.map((p) => (
              <p key={p.slice(0, 20)} className="mt-6 text-[19px] leading-relaxed text-muted">
                {p}
              </p>
            ))}
            <p className="mt-6 text-[19px] leading-relaxed text-muted">
              <Tbc>{m.pendingNote}</Tbc>
            </p>

            <div className="mt-9">
              <p className="font-display text-[36px] font-extrabold tracking-[-0.02em] text-orange-text">{m.signature}</p>
              <p className="text-muted">
                {PRESIDENT.name}, {PRESIDENT.shortRole}
              </p>
            </div>

            <div className="mt-9 flex flex-wrap gap-3">
              <Link href={APP_LINKS.apply} className="btn btn-orange">
                Apply to LIU
                <ArrowRight size={18} aria-hidden />
              </Link>
              <a href={SITE.social.youtube} target="_blank" rel="noopener noreferrer" className="btn btn-outline">
                <Play size={18} aria-hidden />
                Watch the President’s welcome
              </a>
            </div>
          </article>
        </div>
      </section>
    </>
  );
}
