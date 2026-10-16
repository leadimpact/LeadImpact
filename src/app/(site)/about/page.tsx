import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Eye, Target, User, Users } from "lucide-react";
import { ABOUT, STATEMENT_OF_FAITH } from "@/content/about";
import type { MediaAsset } from "@/content/media";
import { BOARD_PAGE, PRESIDENT } from "@/content/people";
import { PageHero } from "@/components/ui/PageHero";
import { AnchorTabs } from "@/components/ui/AnchorTabs";
import { TitleBlock } from "@/components/ui/SectionHeader";
import { Photo } from "@/components/ui/Photo";

export const metadata: Metadata = {
  title: "About LeadImpact University",
  description: ABOUT.hero.subtitle,
};

const TABS = [
  { label: "About", href: "#who-we-are" },
  { label: "Mission", href: "#mission" },
  { label: "Vision", href: "#vision" },
  { label: "Statement of Faith", href: "#statement-of-faith" },
  { label: "President’s Desk", href: "/about/president" },
  { label: "Board of Regents", href: "/about/board-of-regents" },
];

/** S06 */
export default function AboutPage() {
  const { whoWeAre, mission, vision } = ABOUT;
  return (
    <>
      <PageHero
        title={ABOUT.hero.title}
        subtitle={ABOUT.hero.subtitle}
        bannerLabel={ABOUT.hero.bannerLabel}
        banner={ABOUT.hero.banner}
        crumbs={[{ label: "Home", href: "/" }, { label: "The University", href: "/about" }, { label: "About LeadImpact" }]}
      />
      <AnchorTabs label="On this page" tabs={TABS} />

      <section id="who-we-are" className="scroll-mt-36 px-page py-14 md:py-[100px]">
        <div className="flex flex-col gap-12 lg:flex-row lg:items-start lg:gap-[72px]">
          <div className="flex-1">
            <TitleBlock eyebrow={whoWeAre.eyebrow} title={whoWeAre.title} />
            {whoWeAre.paragraphs.map((p) => (
              <p key={p.slice(0, 20)} className="mt-3.5 text-[19px] leading-relaxed text-muted">
                {p}
              </p>
            ))}
          </div>
          <aside aria-labelledby="at-a-glance" className="rounded-[10px] bg-[#F4F2EF] p-8 lg:w-[420px] lg:flex-none">
            <h2 id="at-a-glance" className="eyebrow text-[12px]">
              At a glance
            </h2>
            <dl>
              {ABOUT.atAGlance.map((row) => (
                <div key={row.label} className="flex justify-between gap-4 border-b-[1.5px] border-[#E2DDD7] py-[15px]">
                  <dt className="text-muted">{row.label}</dt>
                  <dd className="text-right font-bold">{row.value}</dd>
                </div>
              ))}
            </dl>
          </aside>
        </div>
      </section>

      <section id="values" aria-label="Mission and vision" className="bg-[#F4F2EF] px-page py-14 md:py-[100px]">
        <div className="grid gap-6 md:grid-cols-2">
          <article id="mission" className="on-dark scroll-mt-36 rounded-[10px] bg-charcoal p-8 text-white md:p-10">
            <span aria-hidden className="flex size-[52px] items-center justify-center rounded-[8px] bg-orange/15 text-orange">
              <Target size={24} />
            </span>
            <h2 className="eyebrow mt-[22px]">{mission.eyebrow}</h2>
            <p className="mt-3.5 font-display text-[24px] font-extrabold leading-[1.3] tracking-[-0.02em] md:text-[30px]">
              {mission.statement}
            </p>
            <p className="mt-3.5 leading-relaxed text-on-dark">{mission.text}</p>
          </article>
          <article id="vision" className="scroll-mt-36 rounded-[10px] border-[1.5px] border-line bg-white p-8 md:p-10">
            <span aria-hidden className="flex size-[52px] items-center justify-center rounded-[8px] bg-orange-soft text-orange-text">
              <Eye size={24} />
            </span>
            <h2 className="eyebrow mt-[22px]">{vision.eyebrow}</h2>
            <p className="mt-3.5 font-display text-[24px] font-extrabold leading-[1.3] tracking-[-0.02em] text-black md:text-[30px]">
              {vision.statement}
            </p>
            <p className="mt-3.5 leading-relaxed text-muted">{vision.text}</p>
          </article>
        </div>
      </section>

      <section id="statement-of-faith" className="scroll-mt-36 px-page py-14 md:py-[100px]">
        <TitleBlock eyebrow="What we believe" title="Statement of Faith" intro="The foundation of everything we teach." className="mb-12" />
        <ol className="grid gap-[22px] md:grid-cols-2 xl:grid-cols-3">
          {STATEMENT_OF_FAITH.map((item, i) => (
            <li key={item.title} className="rounded-[8px] border-[1.5px] border-line p-[30px]">
              <span aria-hidden className="font-display text-[54px] font-extrabold leading-none tracking-[-0.02em] text-orange-numeral">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-2.5 font-display text-[20px] font-extrabold tracking-[-0.02em]">{item.title}</h3>
              <p className="mt-2 leading-relaxed text-muted">{item.text}</p>
            </li>
          ))}
        </ol>
      </section>

      <section aria-label="Leadership" className="on-dark bg-charcoal px-page py-14 text-white md:py-[100px]">
        <div className="grid gap-6 lg:grid-cols-2">
          <LeaderCard
            eyebrow="President’s Desk"
            title={PRESIDENT.name}
            text="A message on quality education and lasting impact."
            link={{ label: "Read the message", href: "/about/president" }}
            image={{ asset: PRESIDENT.photo, icon: User }}
          />
          <LeaderCard
            eyebrow="Governance"
            title="Board of Regents"
            text="Eight leaders guiding the university’s mission and standards."
            link={{ label: "Meet the Board", href: "/about/board-of-regents" }}
            image={{ asset: BOARD_PAGE.hero.banner, icon: Users }}
          />
        </div>
      </section>
    </>
  );
}

function LeaderCard({
  eyebrow,
  title,
  text,
  link,
  image,
}: {
  eyebrow: string;
  title: string;
  text: string;
  link: { label: string; href: string };
  image: { asset: MediaAsset; icon: typeof User };
}) {
  return (
    <Link
      href={link.href}
      className="group flex items-center gap-6 rounded-[10px] border border-white/[0.12] bg-white/[0.06] p-6 hover:border-orange md:p-7"
    >
      <Photo
        asset={image.asset}
        alt=""
        icon={image.icon}
        sizes="150px"
        position="top"
        className="hidden h-[170px] w-[150px] flex-none rounded-[8px] sm:flex"
      />
      <div className="flex-1">
        <p className="eyebrow text-orange">{eyebrow}</p>
        <h3 className="mt-2.5 font-display text-[26px] font-extrabold tracking-[-0.02em] md:text-[30px]">{title}</h3>
        <p className="mt-2 leading-normal text-on-dark">{text}</p>
        <span className="mt-3.5 inline-flex items-center gap-2 font-display font-bold text-orange group-hover:underline">
          {link.label}
          <ArrowRight size={18} aria-hidden />
        </span>
      </div>
    </Link>
  );
}
