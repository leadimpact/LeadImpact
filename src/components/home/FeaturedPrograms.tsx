import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Award } from "lucide-react";
import { FEATURED_PROGRAMS } from "@/content/home";
import { TUITION } from "@/content/colleges";
import { cloudinaryEnabled } from "@/config/media";
import { SectionHeader } from "@/components/ui/SectionHeader";

/** 02 Featured programs — portrait cards (S01); a swipeable row on phones. */
export function FeaturedPrograms() {
  return (
    <section className="bg-bg px-page py-10 md:py-[100px]">
      <SectionHeader
        number="02"
        eyebrow="Featured programs"
        mobileEyebrow="Popular programs"
        title="Start with a program that matches your calling"
        action={
          <Link href="/programs" className="btn btn-dark">
            Browse all courses
            <ArrowRight size={18} aria-hidden />
          </Link>
        }
      />
      {/* Phones: swipe sideways through the cards (the next one peeks in). */}
      <div
        role="region"
        aria-label="Featured programs"
        tabIndex={0}
        className="-mx-5 snap-x snap-mandatory overflow-x-auto px-5 pb-2 md:mx-0 md:overflow-visible md:px-0 md:pb-0"
      >
        <ul className="flex gap-4 md:grid md:grid-cols-2 md:gap-6 xl:grid-cols-4">
          {FEATURED_PROGRAMS.map((p) => (
            <li key={p.title} className="w-[78%] flex-none snap-start md:w-auto">
              <Link href={p.href} className="group relative block h-[380px] overflow-hidden bg-charcoal text-white md:h-[500px]">
                {cloudinaryEnabled() && (
                  <Image
                    src={p.image.id}
                    alt=""
                    fill
                    sizes="(min-width: 1280px) 25vw, 50vw"
                    className="lite-hide object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                )}
                <div
                  aria-hidden
                  className="absolute inset-0 bg-[linear-gradient(180deg,rgba(14,15,18,0)_25%,rgba(14,15,18,.8)_58%,rgba(14,15,18,.97)_100%)]"
                />
                <div className="absolute inset-x-0 bottom-0 p-5 md:p-7">
                  <p className="font-display text-[12px] font-extrabold uppercase tracking-[0.12em] text-orange">{p.college}</p>
                  <h3 className="mt-2.5 font-display text-[28px] font-extrabold uppercase leading-none tracking-[-0.02em] md:text-[34px]">
                    {p.title}
                  </h3>
                  <div className="mt-5 flex items-center justify-between border-t border-white/25 pt-4">
                    <span>
                      <b>${TUITION.perCourse}</b> / course
                    </span>
                    <span aria-hidden className="flex size-11 items-center justify-center bg-orange text-black">
                      <ArrowRight size={20} />
                    </span>
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <Link href="/programs" className="btn btn-dark mt-5 w-full md:hidden">
        Browse all courses
        <ArrowRight size={18} aria-hidden />
      </Link>
      <p className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 text-[15px] text-muted md:mt-6 md:text-[15.5px]">
        <Award size={18} aria-hidden />
        Tuition <b className="text-ink">${TUITION.perCourse} per course</b> or{" "}
        <b className="text-ink">
          ${TUITION.bundlePrice} for {TUITION.bundleCourses} courses
        </b>{" "}
        · pay in your local currency
      </p>
    </section>
  );
}
