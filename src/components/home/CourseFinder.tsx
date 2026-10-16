import { ChevronDown, Search } from "lucide-react";
import { COLLEGES } from "@/content/colleges";

const LEVELS = ["Certificate", "Diploma", "Associate", "Bachelor", "Master", "Doctorate"];

const fieldLabel = "block font-display text-[11px] font-extrabold uppercase tracking-[0.12em] text-muted";
const fieldBox = "relative flex h-[68px] flex-col justify-center border-line px-5";
const control =
  "w-full appearance-none bg-transparent pr-6 text-[16.5px] font-bold text-ink outline-none placeholder:font-bold placeholder:text-ink";

/** Dark course finder bar (S01). A plain GET form to /programs — works without JavaScript. */
export function CourseFinder() {
  return (
    <section aria-labelledby="course-finder-title" className="hidden bg-charcoal px-page py-10 md:block">
      <form action="/programs" className="flex flex-col gap-5 lg:flex-row lg:items-center lg:gap-7">
        <div className="text-white lg:w-[260px] lg:flex-none">
          <p className="font-display text-[13px] font-extrabold uppercase tracking-[0.16em] text-orange">Course finder</p>
          <h2
            id="course-finder-title"
            className="mt-1.5 font-display text-[28px] font-extrabold uppercase leading-[1.05] tracking-[-0.02em]"
          >
            Find your program
          </h2>
        </div>

        <div className="grid flex-1 grid-cols-2 bg-white lg:flex">
          <label className={`${fieldBox} border-b lg:flex-[1.4] lg:border-b-0 lg:border-r`}>
            <span className={fieldLabel}>I want to study</span>
            <input name="q" type="search" placeholder="Theology, Counseling…" className={control} />
          </label>
          <SelectField label="Level" name="level" anyLabel="Any level" options={LEVELS.map((l) => [l.toLowerCase(), l])} />
          <SelectField
            label="College"
            name="college"
            anyLabel="All colleges"
            options={COLLEGES.map((c) => [c.slug, c.name])}
          />
          <div className={`${fieldBox} border-b border-l lg:flex-1 lg:border-b-0 lg:border-l-0 lg:border-r`}>
            <span className={fieldLabel}>Study mode</span>
            <span className="text-[16.5px] font-bold">Online / campus</span>
          </div>
          <button
            type="submit"
            className="col-span-2 flex h-[68px] items-center justify-center gap-2.5 bg-orange px-[30px] font-display font-extrabold uppercase tracking-[0.08em] text-black hover:bg-orange-hover"
          >
            Search
            <Search size={18} aria-hidden />
          </button>
        </div>
      </form>
    </section>
  );
}

function SelectField({
  label,
  name,
  anyLabel,
  options,
}: {
  label: string;
  name: string;
  anyLabel: string;
  options: [string, string][];
}) {
  return (
    <label className={`${fieldBox} border-b border-l lg:flex-1 lg:border-b-0 lg:border-l-0 lg:border-r`}>
      <span className={fieldLabel}>{label}</span>
      <select name={name} defaultValue="" className={control}>
        <option value="">{anyLabel}</option>
        {options.map(([value, text]) => (
          <option key={value} value={value}>
            {text}
          </option>
        ))}
      </select>
      <ChevronDown size={18} aria-hidden className="pointer-events-none absolute right-5 top-1/2 -translate-y-1/2" />
    </label>
  );
}
