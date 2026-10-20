import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowRight,
  Award,
  BookOpenText,
  CalendarDays,
  ChevronRight,
  Globe,
  Headphones,
  Radio,
  User,
  Video,
  WifiOff,
  type LucideIcon,
} from "lucide-react";
import { findCollege, TUITION } from "@/content/colleges";
import { INTAKES, LEVELS, PROGRAMS, findProgram } from "@/content/programs";
import { facultyHref, findFaculty } from "@/content/faculty";
import { Photo } from "@/components/ui/Photo";
import { AnchorTabs } from "@/components/ui/AnchorTabs";
import { CheckList } from "@/components/ui/CheckList";
import { Tbc } from "@/components/ui/Tbc";
import { LevelPicker } from "@/components/programs/LevelPicker";
import { CourseList } from "@/components/programs/CourseList";
import { LocalPrice } from "@/components/programs/LocalPrice";

export function generateStaticParams() {
  return PROGRAMS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/programs/[slug]">): Promise<Metadata> {
  const program = findProgram((await params).slug);
  return program ? { title: program.name, description: program.summary } : {};
}

const HOW_YOU_LEARN: { title: string; text: string; icon: LucideIcon }[] = [
  { title: "Video", text: "Low-data options", icon: Video },
  { title: "Audio", text: "Listen offline", icon: Headphones },
  { title: "Reading", text: "Print or phone", icon: BookOpenText },
  { title: "Live classes", text: "Weekly, with Q&A", icon: Radio },
];

const ENTRY: Record<string, string> = {
  certificate: "High school diploma or equivalent",
  diploma: "High school diploma or equivalent",
  associate: "High school diploma or equivalent",
  bachelor: "High school diploma or equivalent",
  master: "A bachelor’s degree (or equivalent)",
  doctorate: "A master’s degree (or equivalent)",
};

/** S13 (desktop) / SM3 (mobile) */
export default async function ProgramPage({ params }: PageProps<"/programs/[slug]">) {
  const program = findProgram((await params).slug);
  if (!program) notFound();
  const college = findCollege(program.college)!;
  const faculty = program.faculty.map(findFaculty).filter((f) => f !== undefined);
  const first = LEVELS[program.levels[0]].short;
  const last = LEVELS[program.levels[program.levels.length - 1]].short;

  const tabs = [
    { label: "Overview", href: "#overview" },
    { label: "Courses", href: "#courses" },
    { label: "How you’ll learn", href: "#how-you-learn" },
    { label: "Requirements", href: "#requirements" },
    { label: "Tuition", href: "#tuition" },
    { label: "Faculty", href: "#faculty" },
    { label: "Careers", href: "#careers" },
  ];

  return (
    <>
      <section className="relative overflow-hidden bg-charcoal text-white">
        <div
          aria-hidden
          className="absolute -right-40 -top-40 size-[640px] rounded-full border border-orange/25 max-md:hidden"
        />
        <div className="relative flex flex-col gap-8 px-page pb-8 pt-6 md:pb-14 md:pt-12 lg:flex-row lg:items-center lg:gap-14">
          <div className="flex-1">
            <nav aria-label="Breadcrumb">
              <ol className="flex flex-wrap items-center gap-x-2 text-[14px] text-[#B9B6B1]">
                <li className="hidden items-center gap-2 md:flex">
                  <Link href="/">Home</Link>
                  <ChevronRight size={14} aria-hidden />
                </li>
                <li className="flex items-center gap-2">
                  <Link href="/programs">Programs</Link>
                  <ChevronRight size={14} aria-hidden />
                </li>
                <li className="hidden items-center gap-2 md:flex">
                  <Link href={`/programs?college=${college.slug}`}>{college.name}</Link>
                  <ChevronRight size={14} aria-hidden />
                </li>
                <li aria-current="page" className="font-bold text-orange">
                  {program.name}
                </li>
              </ol>
            </nav>
            <h1 className="mt-4 font-display text-[44px] font-extrabold leading-none tracking-[-0.03em] md:mt-20 md:text-[66px]">
              {program.name}
            </h1>
            <p className="mt-4 max-w-[600px] text-[17px] leading-relaxed text-[#DAD7D2] md:text-[19px]">
              <span className="md:hidden">{program.tagline}</span>
              <span className="hidden md:inline">{program.summary}</span>
            </p>
            <ul className="mt-6 flex flex-wrap gap-2.5">
              <Pill icon={Award} className="hidden md:flex">
                {first} → {last}
              </Pill>
              <Pill icon={Globe}>Online or campus</Pill>
              <Pill icon={WifiOff}>Offline lessons</Pill>
              <Pill icon={CalendarDays} className="hidden md:flex">
                {INTAKES}
              </Pill>
            </ul>
          </div>
          <div className="hidden lg:block lg:w-[400px] lg:flex-none">
            <LevelPicker programSlug={program.slug} programName={program.name} levels={program.levels} variant="card" />
          </div>
        </div>
      </section>

      {/* Phones and tablets (SM3): photo, then the level picker */}
      <div className="lg:hidden">
        <Photo asset={program.photo} alt="" sizes="100vw" className="h-[200px]" />
        <div className="px-page py-6">
          <LevelPicker programSlug={program.slug} programName={program.name} levels={program.levels} variant="plain" />
        </div>
      </div>

      <AnchorTabs label="On this page" tabs={tabs} />

      <div className="flex flex-col gap-12 px-page py-12 md:py-[80px] lg:flex-row lg:items-start lg:gap-14">
        <div className="min-w-0 flex-1">
          <section id="overview" className="scroll-mt-36">
            <p className="eyebrow text-[12px]">Overview</p>
            <h2 className="mt-3 font-display text-[30px] font-extrabold leading-tight tracking-[-0.02em] md:text-[40px]">
              {program.headline}
            </h2>
            {program.about.map((para) => (
              <p key={para.slice(0, 24)} className="mt-4 text-[18px] leading-relaxed text-muted">
                {program.aboutIsPlaceholder ? <Tbc>{para}</Tbc> : para}
              </p>
            ))}
          </section>

          <section id="courses" className="mt-12 scroll-mt-36">
            <h2 className="font-display text-[26px] font-extrabold tracking-[-0.02em]">Courses you’ll take</h2>
            {program.courses ? (
              <CourseList courses={program.courses} />
            ) : (
              <p className="mt-4 text-muted">
                <Tbc>The course list for {program.name} will be published here.</Tbc> Ask Admissions for the current
                curriculum.
              </p>
            )}
          </section>

          <section id="how-you-learn" className="mt-12 scroll-mt-36">
            <h2 className="font-display text-[26px] font-extrabold tracking-[-0.02em]">How you’ll learn</h2>
            <ul className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-4">
              {HOW_YOU_LEARN.map((h) => (
                <li key={h.title} className="rounded-[8px] bg-[#F4F2EF] p-4">
                  <h.icon size={22} aria-hidden className="text-orange-text" />
                  <p className="mt-3 font-display font-extrabold">{h.title}</p>
                  <p className="text-[14px] text-muted">{h.text}</p>
                </li>
              ))}
            </ul>
          </section>

          <section id="requirements" className="mt-12 scroll-mt-36">
            <h2 className="font-display text-[26px] font-extrabold tracking-[-0.02em]">Entry requirements</h2>
            <dl className="mt-4 divide-y divide-line rounded-[8px] border-[1.5px] border-line">
              {program.levels.map((l) => (
                <div key={l} className="flex flex-col gap-1 px-5 py-3.5 sm:flex-row sm:justify-between">
                  <dt className="font-bold">
                    {LEVELS[l].label} <span className="font-normal text-muted">· {LEVELS[l].duration}</span>
                  </dt>
                  <dd className="text-muted">{ENTRY[l]}</dd>
                </div>
              ))}
            </dl>
            <Link href="/admissions#requirements" className="mt-4 inline-flex min-h-11 items-center gap-2 font-display font-bold text-orange-text hover:underline">
              Full admission requirements
              <ArrowRight size={16} aria-hidden />
            </Link>
          </section>

          <section id="tuition" className="mt-12 scroll-mt-36">
            <h2 className="font-display text-[26px] font-extrabold tracking-[-0.02em]">Tuition</h2>
            <p className="mt-3 text-[18px]">
              <b>${TUITION.perCourse} per course</b>, or <b>${TUITION.bundlePrice} for {TUITION.bundleCourses} courses</b>{" "}
              — the same for every program and level.
            </p>
            <LocalPrice />
            <Link href="/admissions/tuition" className="mt-3 inline-flex min-h-11 items-center gap-2 font-display font-bold text-orange-text hover:underline">
              Tuition & fees
              <ArrowRight size={16} aria-hidden />
            </Link>
          </section>

          <section id="careers" className="mt-12 scroll-mt-36">
            <h2 className="font-display text-[26px] font-extrabold tracking-[-0.02em]">Where it can lead</h2>
            <div className="mt-2">
              <CheckList items={program.careers} />
            </div>
            <p className="mt-3 text-[14px] text-muted">
              <Tbc>Example career paths — to be confirmed by LIU.</Tbc>
            </p>
          </section>
        </div>

        <aside className="flex flex-col gap-5 lg:sticky lg:top-24 lg:w-[400px] lg:flex-none">
          <Photo asset={program.photo} alt="" sizes="400px" className="hidden h-[240px] rounded-[8px] lg:block" />
          <div id="faculty" className="scroll-mt-36 rounded-[8px] border-[1.5px] border-line p-5">
            <h2 className="font-display text-[19px] font-extrabold">Program faculty</h2>
            <ul className="mt-2">
              {faculty.map((f) => (
                <li key={f.slug}>
                  <Link href={facultyHref(f)} className="group flex min-h-14 items-center gap-3 py-2">
                    <span aria-hidden className="placeholder size-12 flex-none rounded-[6px]">
                      <User size={22} />
                    </span>
                    <span>
                      <span className="block font-bold group-hover:text-orange-text">{f.shortName ?? f.name}</span>
                      <span className="block text-[14px] text-muted">{college.name}</span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-[8px] bg-orange-tint p-5">
            <p className="font-display text-[18px] font-extrabold text-orange-deep">Transferring credits?</p>
            <p className="mt-1.5 text-[15.5px]">Courses passed with C or higher at an accredited institution may count.</p>
            <Link
              href="/academics/academic-affairs#credit-transfer"
              className="mt-2 inline-flex min-h-11 items-center gap-2 font-display font-bold text-orange-deep hover:underline"
            >
              Credit transfer policy
              <ArrowRight size={16} aria-hidden />
            </Link>
          </div>
        </aside>
      </div>
    </>
  );
}

function Pill({ icon: Icon, children, className }: { icon: LucideIcon; children: React.ReactNode; className?: string }) {
  return (
    <li
      className={`flex items-center gap-2.5 rounded-[4px] bg-white/[0.08] px-3.5 py-2.5 font-display text-[14px] font-bold leading-tight md:rounded-[6px] md:px-4 md:py-3 md:text-[15px] ${className ?? ""}`}
    >
      <Icon size={17} aria-hidden />
      {children}
    </li>
  );
}
