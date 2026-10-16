import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, User } from "lucide-react";
import { BOARD_OF_REGENTS, BOARD_PAGE, boardMemberHref } from "@/content/people";
import { PageHero } from "@/components/ui/PageHero";
import { Photo } from "@/components/ui/Photo";
import { Tbc } from "@/components/ui/Tbc";

export function generateStaticParams() {
  return BOARD_OF_REGENTS.map((m) => ({ slug: m.slug }));
}

const findMember = (slug: string) => BOARD_OF_REGENTS.find((m) => m.slug === slug);

export async function generateMetadata({ params }: PageProps<"/about/board-of-regents/[slug]">): Promise<Metadata> {
  const member = findMember((await params).slug);
  return member ? { title: `${member.name} — Board of Regents` } : {};
}

/** Board member profile — no design; built from the S07/S08 patterns. Bios are placeholders. */
export default async function BoardMemberPage({ params }: PageProps<"/about/board-of-regents/[slug]">) {
  const member = findMember((await params).slug);
  if (!member) notFound();
  const others = BOARD_OF_REGENTS.filter((m) => m.slug !== member.slug);

  return (
    <>
      <PageHero
        title={member.name}
        subtitle={`${member.role}, LeadImpact University Board of Regents`}
        bannerLabel="Board of Regents · banner photo"
        banner={BOARD_PAGE.hero.banner}
        crumbs={[
          { label: "Home", href: "/" },
          { label: "The University", href: "/about" },
          { label: "Board of Regents", href: "/about/board-of-regents" },
          { label: member.name },
        ]}
      />

      <section className="px-page py-14 md:py-[100px]">
        <div className="flex flex-col gap-12 lg:flex-row lg:items-start lg:gap-[72px]">
          <Photo asset={member.photo} sizes="(min-width: 1024px) 400px, 100vw" position="top" icon={User} className="h-[420px] rounded-[10px] lg:w-[400px] lg:flex-none" />
          <div className="flex-1">
            <p className="eyebrow">{member.role}</p>
            <h2 className="mt-3.5 font-display text-[32px] font-extrabold tracking-[-0.02em] text-black md:text-[42px]">
              {member.name}
            </h2>
            <p className="mt-5 text-[19px] leading-relaxed text-muted">
              <Tbc>[Biography to be supplied — ministry background, qualifications and role on the Board.]</Tbc>
            </p>
            <Link href="/about/board-of-regents" className="btn btn-outline mt-9">
              <ArrowLeft size={18} aria-hidden />
              All Board members
            </Link>
          </div>
        </div>
      </section>

      <section aria-labelledby="other-members" className="bg-[#F4F2EF] px-page py-14">
        <h2 id="other-members" className="eyebrow">
          Other members of the Board
        </h2>
        <ul className="mt-5 grid gap-x-8 sm:grid-cols-2 lg:grid-cols-3">
          {others.map((m) => (
            <li key={m.slug}>
              <Link
                href={boardMemberHref(m)}
                className="flex min-h-[56px] items-center justify-between border-b border-line font-display font-bold hover:text-orange-text"
              >
                {m.name}
                <ArrowRight size={18} aria-hidden />
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
