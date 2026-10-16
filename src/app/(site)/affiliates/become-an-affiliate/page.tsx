import type { Metadata } from "next";
import { Award, BookOpen, Play, Users, type LucideIcon } from "lucide-react";
import { BECOME_AFFILIATE } from "@/content/affiliates";
import { PageHero } from "@/components/ui/PageHero";
import { TitleBlock } from "@/components/ui/SectionHeader";
import { AffiliateForm } from "./AffiliateForm";

export const metadata: Metadata = {
  title: "Become an affiliate campus",
  description: BECOME_AFFILIATE.hero.subtitle,
};

const ICONS: Record<string, LucideIcon> = { book: BookOpen, play: Play, award: Award, users: Users };

/** S18 */
export default function BecomeAffiliatePage() {
  const b = BECOME_AFFILIATE;
  return (
    <>
      <PageHero
        title={b.hero.title}
        subtitle={b.hero.subtitle}
        bannerLabel={b.hero.bannerLabel}
        banner={b.hero.banner}
        crumbs={[{ label: "Home", href: "/" }, { label: "Affiliates", href: "/affiliates/become-an-affiliate" }, { label: "Become an Affiliate" }]}
      />
      <section aria-label="What affiliates receive" className="px-page py-14 md:py-[80px]">
        <ul className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {b.benefits.map((x) => {
            const Icon = ICONS[x.icon];
            return (
              <li key={x.title} className="rounded-[8px] bg-[#F4F2EF] p-6">
                <span aria-hidden className="flex size-11 items-center justify-center rounded-[6px] bg-orange-soft text-orange-text">
                  <Icon size={20} />
                </span>
                <h2 className="mt-4 font-display text-[18px] font-extrabold">{x.title}</h2>
                <p className="mt-1 text-[15px] text-muted">{x.text}</p>
              </li>
            );
          })}
        </ul>
      </section>

      <section id="partner" className="scroll-mt-28 bg-[#F4F2EF] px-page py-14 md:py-[100px]">
        <div className="flex flex-col gap-10 lg:flex-row lg:gap-16">
          <div className="lg:w-[380px] lg:flex-none">
            <TitleBlock
              eyebrow="Apply to partner"
              title="Tell us about your organisation"
              intro="We’ll get back to you within 5 working days to arrange a conversation."
            />
            <ol className="mt-6">
              {b.steps.map((s, i) => (
                <li key={s.title} className="mt-4 flex items-start gap-4">
                  <span aria-hidden className="flex size-8 flex-none items-center justify-center rounded-full bg-orange font-display font-extrabold text-black">
                    {i + 1}
                  </span>
                  <span>
                    <span className="block font-bold">{s.title}</span>
                    <span className="block text-[14.5px] text-muted">{s.text}</span>
                  </span>
                </li>
              ))}
            </ol>
          </div>
          <div className="flex-1">
            <AffiliateForm orgTypes={[...b.orgTypes]} />
          </div>
        </div>
      </section>
    </>
  );
}
