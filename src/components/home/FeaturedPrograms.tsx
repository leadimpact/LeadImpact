import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Award } from "lucide-react";
import { FEATURED_PROGRAMS } from "@/content/home";
import { TUITION } from "@/content/colleges";
import { cloudinaryEnabled } from "@/config/media";
import { SectionHeader } from "@/components/ui/SectionHeader";

/** 02 Featured programs — portrait cards (S01). Desktop and tablet only (not in SM1). */
export function FeaturedPrograms() {
  return (
    <section className="hidden bg-bg px-page py-[100px] md:block">
      <SectionHeader
        number="02"
        eyebrow="Featured programs"
        title="Start with a program that matches your calling"
        action={
          <Link href="/programs" className="btn btn-dark">
            Browse all courses
            <ArrowRight size={18} aria-hidden />
          </Link>
        }
      />
      <ul className="grid grid-cols-2 gap-6 xl:grid-cols-4">
        {FEATURED_PROGRAMS.map((p) => (
          <li key={p.title}>
            <Link href={p.href} className="group relative block h-[500px] overflow-hidden bg-charcoal text-white">
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
              <div className="absolute inset-x-0 bottom-0 p-7">
                <p className="font-display text-[12px] font-extrabold uppercase tracking-[0.12em] text-orange">{p.college}</p>
                <h3 className="mt-2.5 font-display text-[34px] font-extrabold uppercase leading-none tracking-[-0.02em]">
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
      <p className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-1 text-[15.5px] text-muted">
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
