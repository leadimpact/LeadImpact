import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, User } from "lucide-react";
import { findCollege } from "@/content/colleges";
import { FACULTY_PAGE } from "@/content/academics";
import { FACULTY, findFaculty } from "@/content/faculty";
import { PROGRAMS, programHref } from "@/content/programs";
import { PageHero } from "@/components/ui/PageHero";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { Photo } from "@/components/ui/Photo";
import { Tbc } from "@/components/ui/Tbc";

export function generateStaticParams() {
  return FACULTY.map((f) => ({ slug: f.slug }));
}

export async function generateMetadata({ params }: PageProps<"/academics/faculty/[slug]">): Promise<Metadata> {
  const person = findFaculty((await params).slug);
  return person ? { title: `${person.name} — Faculty` } : {};
}

/** Faculty profile — no design; built from the S07/S15 patterns. Bios are placeholders. */
export default async function FacultyProfilePage({ params }: PageProps<"/academics/faculty/[slug]">) {
  const person = findFaculty((await params).slug);
  if (!person) notFound();
  const colleges = person.colleges.map((c) => findCollege(c)!);
  const programs = PROGRAMS.filter((p) => p.faculty.includes(person.slug));

  return (
    <>
      <PageHero
        title={person.name}
        subtitle={`${person.role} · ${colleges.map((c) => c.name).join(" · ")}`}
        bannerLabel="Faculty & Staff · banner photo"
        banner={FACULTY_PAGE.hero.banner}
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Faculty & Staff", href: "/academics/faculty" },
          { label: person.name },
        ]}
      />
      <section className="px-page py-14 md:py-[100px]">
        <div className="flex flex-col gap-12 lg:flex-row lg:items-start lg:gap-[72px]">
          {person.photo ? (
            <Photo asset={person.photo} sizes="(min-width: 1024px) 360px, 100vw" position="top" icon={User} className="h-[400px] rounded-[10px] lg:w-[360px] lg:flex-none" />
          ) : (
            <ImagePlaceholder label={`${person.name} · portrait`} icon={User} className="h-[400px] rounded-[10px] lg:w-[360px] lg:flex-none" />
          )}
          <div className="flex-1">
            <p className="eyebrow">{person.role}</p>
            <h2 className="mt-3 font-display text-[32px] font-extrabold tracking-[-0.02em] md:text-[40px]">{person.name}</h2>
            <p className="mt-5 text-[19px] leading-relaxed text-muted">
              <Tbc>[Biography to be supplied — qualifications, ministry experience and teaching areas.]</Tbc>
            </p>
            {programs.length > 0 && (
              <>
                <h3 className="mt-9 font-display text-[20px] font-extrabold">Teaches on</h3>
                <ul className="mt-3 grid gap-x-8 sm:grid-cols-2">
                  {programs.map((p) => (
                    <li key={p.slug}>
                      <Link href={programHref(p)} className="flex min-h-[52px] items-center justify-between border-b border-line font-bold hover:text-orange-text">
                        {p.name}
                        <ArrowRight size={18} aria-hidden />
                      </Link>
                    </li>
                  ))}
                </ul>
              </>
            )}
            <Link href="/academics/faculty" className="btn btn-outline mt-9">
              <ArrowLeft size={18} aria-hidden />
              All faculty
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

