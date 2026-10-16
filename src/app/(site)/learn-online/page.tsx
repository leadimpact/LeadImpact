import type { Metadata } from "next";
import Link from "next/link";
import clsx from "clsx";
import { ArrowRight, ChevronRight, FileText, Globe, Headphones, MonitorPlay, Radio, Smartphone, Video, type LucideIcon } from "lucide-react";
import { openLearn } from "@/config/domains";
import { COUNTRY_COUNT } from "@/content/countries";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { TitleBlock } from "@/components/ui/SectionHeader";
import { CheckList } from "@/components/ui/CheckList";

export const metadata: Metadata = {
  title: "LIU Learn — study anywhere, even offline",
  description:
    "LIU Learn puts every lesson, quiz and exam on your phone or computer — with downloads for when the internet is weak or unavailable.",
};

const FORMATS: { title: string; text: string; chip: string; icon: LucideIcon }[] = [
  { title: "Video", text: "Short lectures with captions and transcripts. Choose 240p to save data.", chip: "~2 MB per minute", icon: Video },
  { title: "Audio", text: "Every lesson as audio — listen like the radio while you work or travel.", chip: "~0.5 MB per minute", icon: Headphones },
  { title: "Reading", text: "Notes you can read on your phone, print, or have read aloud.", chip: "Under 1 MB", icon: FileText },
  { title: "Live classes", text: "Weekly classes and Q&A. Join by video, or by a normal phone call.", chip: "Recordings downloadable", icon: Radio },
];

const ASSESSMENT = [
  { title: "Weekly quizzes", text: "Short, self-paced and work offline. Instant feedback to help you learn." },
  { title: "Tests & assignments", text: "Submitted in the portal, with typed answers or uploaded work." },
  {
    title: "Scheduled exams",
    text: "Set date and time, shown in your local time zone. Timed, with shuffled questions and photo ID.",
  },
];

/** "Android app · coming soon" — there is no app to link to yet (CHANGES_NEEDED.md). */
function AppComingSoon({ className }: { className?: string }) {
  return (
    <span aria-disabled="true" title="The Android app is coming soon" className={clsx("btn cursor-not-allowed opacity-70", className)}>
      <Smartphone size={18} aria-hidden />
      Android app · coming soon
    </span>
  );
}

/** S19 — marketing page. LIU Learn itself is on hold (addendum v5); buttons go through openLearn(). */
export default function LearnOnlinePage() {
  const stats = [
    ["48 MB", "A full week of lessons (low quality)"],
    ["0 MB", "Data used while studying offline"],
    ["90 min", "Typical timed exam"],
    [String(COUNTRY_COUNT), "Countries, one classroom"],
  ];
  return (
    <>
      <section className="relative overflow-hidden bg-charcoal text-white">
        <div className="flex flex-col gap-12 px-page py-10 md:py-16 lg:flex-row lg:items-center">
          <div className="flex-1">
            <nav aria-label="Breadcrumb">
              <ol className="flex items-center gap-2 text-[14px] text-[#B9B6B1]">
                <li className="flex items-center gap-2">
                  <Link href="/">Home</Link>
                  <ChevronRight size={14} aria-hidden />
                </li>
                <li className="flex items-center gap-2">
                  <Link href="/programs">Programs</Link>
                  <ChevronRight size={14} aria-hidden />
                </li>
                <li aria-current="page" className="font-bold text-orange">
                  LIU Learn
                </li>
              </ol>
            </nav>
            <span className="chip mt-5 bg-orange-tint text-orange-deep">New · e-learning portal</span>
            <h1 className="mt-4 font-display text-[44px] font-extrabold leading-[1.02] tracking-[-0.03em] md:text-[64px]">
              Study anywhere.
              <br />
              <span className="text-orange">Even offline.</span>
            </h1>
            <p className="mt-5 max-w-[560px] text-[18px] leading-relaxed text-[#DAD7D2]">
              LIU Learn puts every lesson, quiz and exam on your phone or computer — with downloads for when the internet is weak or
              unavailable.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a href={openLearn()} className="btn btn-orange">
                Log in to LIU Learn
                <ArrowRight size={18} aria-hidden />
              </a>
              <AppComingSoon className="btn-outline-light" />
            </div>
            <p className="mt-4 flex items-center gap-2 text-[14px] text-on-dark-muted">
              <Globe size={16} aria-hidden /> Works in any web browser
            </p>
          </div>
          <div aria-hidden className="relative hidden h-[420px] w-[560px] flex-none md:block">
            <div className="absolute left-0 top-0 w-[480px] rounded-[8px] bg-black p-3">
              <ImagePlaceholder label="LIU Learn · web dashboard" icon={MonitorPlay} className="h-[300px] rounded-[4px]" />
            </div>
            <div className="absolute bottom-0 right-0 w-[200px] rounded-[10px] bg-black p-2.5">
              <ImagePlaceholder label="App · offline lessons" icon={Smartphone} className="h-[330px] rounded-[8px]" />
            </div>
          </div>
        </div>
      </section>

      <section className="px-page py-14 md:py-[100px]">
        <TitleBlock eyebrow="Four ways to learn" title="Choose the format that works for you today" className="mb-10" />
        <ul className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {FORMATS.map((f) => (
            <li key={f.title} className="rounded-[8px] border-[1.5px] border-line p-6">
              <span aria-hidden className="flex size-11 items-center justify-center rounded-[6px] bg-orange-soft text-orange-text">
                <f.icon size={20} />
              </span>
              <h2 className="mt-5 font-display text-[22px] font-extrabold tracking-[-0.02em]">{f.title}</h2>
              <p className="mt-2 text-[15px] leading-relaxed text-muted">{f.text}</p>
              <span className="chip mt-4 bg-[#EFEDEA] text-ink">{f.chip}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="bg-[#F4F2EF] px-page py-14 md:py-[100px]">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:gap-16">
          <div className="flex-1">
            <TitleBlock eyebrow="Built for weak internet" title="Download once. Study for a week." />
            <CheckList
              items={[
                "Download a whole week of lessons when you’re on Wi-Fi or have data",
                "Quizzes save on your phone and send automatically when you reconnect",
                "Exams are scheduled and timed — and keep working if your connection drops",
                "Lite mode and data saver switch on automatically on slow networks",
              ]}
            />
          </div>
          <dl className="grid grid-cols-2 gap-4 lg:w-[480px] lg:flex-none">
            {stats.map(([value, label]) => (
              <div key={label} className="flex flex-col-reverse rounded-[8px] border-[1.5px] border-line bg-white p-5">
                <dt className="mt-1 text-[14.5px] text-muted">{label}</dt>
                <dd className="font-display text-[36px] font-extrabold tracking-[-0.02em] text-orange-text">{value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="px-page py-14 md:py-[100px]">
        <TitleBlock
          eyebrow="Assessment"
          title="Quizzes, tests and timed exams"
          intro="Fair, scheduled assessment that works across time zones and connection speeds."
          className="mb-10"
        />
        <ol className="grid gap-5 md:grid-cols-3">
          {ASSESSMENT.map((a, i) => {
            const last = i === ASSESSMENT.length - 1;
            return (
              <li key={a.title} className={clsx("rounded-[8px] p-6", last ? "on-dark bg-charcoal text-white" : "border-[1.5px] border-line")}>
                <span aria-hidden className={clsx("font-display text-[20px] font-extrabold", last ? "text-orange" : "text-orange-numeral")}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h2 className="mt-2 font-display text-[22px] font-extrabold tracking-[-0.02em]">{a.title}</h2>
                <p className={clsx("mt-2 text-[15px] leading-relaxed", last ? "text-on-dark" : "text-muted")}>{a.text}</p>
              </li>
            );
          })}
        </ol>
      </section>

      <section className="flex flex-col gap-6 bg-orange px-page py-12 text-black md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="font-display text-[30px] font-extrabold tracking-[-0.02em] md:text-[36px]">Already a student?</h2>
          <p className="mt-1">Log in with your registration number — the same account as the Student Portal.</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <a href={openLearn()} className="btn bg-black text-white hover:bg-charcoal">
            Log in to LIU Learn
            <ArrowRight size={18} aria-hidden />
          </a>
          <AppComingSoon className="btn-white" />
        </div>
      </section>
    </>
  );
}
