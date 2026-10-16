import Link from "next/link";
import {
  ArrowRight,
  BookOpenText,
  Headphones,
  MonitorPlay,
  Radio,
  Smartphone,
  Timer,
  Video,
  WifiOff,
  type LucideIcon,
} from "lucide-react";
import { LEARN, type LearnFeatureIcon } from "@/content/home";
import { APP_LINKS } from "@/content/site";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";

const ICONS: Record<LearnFeatureIcon, LucideIcon> = {
  video: Video,
  offline: WifiOff,
  live: Radio,
  exam: Timer,
  audio: Headphones,
  reading: BookOpenText,
};

/** 04 LIU Learn — angled orange panel with device mock-ups (S01); compact on phones (SM1). */
export function LearnPromo() {
  return (
    <section className="relative overflow-hidden bg-white">
      <div
        aria-hidden
        className="absolute inset-y-0 right-0 hidden w-[44%] bg-orange [clip-path:polygon(18%_0,100%_0,100%_100%,0_100%)] xl:block"
      />
      <div className="relative flex flex-col gap-14 px-page py-10 md:py-[100px] xl:flex-row xl:items-center xl:gap-[60px]">
        <div className="flex-1">
          <SectionHeader
            number="04"
            eyebrow={LEARN.eyebrow}
            title={
              <>
                <span className="md:hidden">{LEARN.mobileTitle}</span>
                <span className="hidden md:inline">{LEARN.title}</span>
              </>
            }
            className="md:mb-6"
          />
          <p className="hidden max-w-[640px] text-[19px] leading-relaxed text-muted md:block">{LEARN.text}</p>

          <ul className="mt-7 hidden grid-cols-2 border-t-2 border-black md:grid">
            {LEARN.features.map((f) => {
              const Icon = ICONS[f.icon];
              return (
                <li key={f.title} className="flex items-center gap-3.5 border-b border-line py-[18px]">
                  <Icon size={22} aria-hidden className="text-orange-text" />
                  <span>
                    <span className="block font-display text-[15.5px] font-extrabold uppercase tracking-[0.04em]">{f.title}</span>
                    <span className="block text-[14.5px] text-muted">{f.text}</span>
                  </span>
                </li>
              );
            })}
          </ul>

          {/* Phones */}
          <ImagePlaceholder label="LIU Learn app" icon={Smartphone} className="h-[220px] rounded-[8px] md:hidden" />
          <ul className="mt-4 grid grid-cols-2 gap-2.5 md:hidden">
            {LEARN.mobileFeatures.map((f) => {
              const Icon = ICONS[f.icon];
              return (
                <li key={f.title} className="flex items-center gap-2.5 rounded-[6px] border-[1.5px] border-line p-3.5">
                  <Icon size={20} aria-hidden className="text-orange-text" />
                  <b className="text-[15px]">{f.title}</b>
                </li>
              );
            })}
          </ul>

          <div className="mt-4 flex flex-wrap gap-3 md:mt-[30px]">
            <Link href="/learn-online" className="btn btn-dark w-full md:w-auto">
              Discover LIU Learn
              <ArrowRight size={18} aria-hidden />
            </Link>
            <Link href={APP_LINKS.learn} className="btn btn-outline hidden md:inline-flex">
              <Smartphone size={18} aria-hidden />
              Get the app
            </Link>
          </div>
        </div>

        {/* Device mock-ups — replaced with real LIU Learn screenshots once phase 7 lands */}
        <div aria-hidden className="relative hidden h-[500px] w-[560px] flex-none self-center md:block">
          <div className="absolute left-0 top-10 w-[470px] bg-black px-3 pt-3">
            <ImagePlaceholder label="LIU Learn · web dashboard" icon={MonitorPlay} iconSize={28} className="h-[300px]" />
          </div>
          <div className="absolute right-2.5 top-[110px] w-[200px] rounded-[10px] bg-black p-2.5">
            <ImagePlaceholder label="App · offline lessons" icon={Smartphone} iconSize={28} className="h-[370px] rounded-[8px]" />
          </div>
        </div>
      </div>
    </section>
  );
}
