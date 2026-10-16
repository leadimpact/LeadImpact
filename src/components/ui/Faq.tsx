import { ChevronDown } from "lucide-react";
import { Tbc } from "./Tbc";

/** Show/hide answers using native <details> — works without JavaScript and with screen readers. */
export function Faq({
  items,
  firstOpen = true,
  className,
}: {
  items: { q: string; a: string; tbc?: boolean }[];
  /** Open the first answer by default (S09). */
  firstOpen?: boolean;
  className?: string;
}) {
  return (
    <div className={`flex flex-col gap-3.5 ${className ?? ""}`}>
      {items.map((item, i) => (
        <details
          key={item.q}
          open={firstOpen && i === 0}
          className="group rounded-[8px] border-[1.5px] border-line bg-white open:border-orange"
        >
          <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 [&::-webkit-details-marker]:hidden">
            <span className="font-display text-[17px] font-extrabold tracking-[-0.01em]">{item.q}</span>
            <span className="flex flex-none items-center gap-1.5 font-display text-[13px] font-bold text-orange-text">
              <span className="group-open:hidden">Show answer</span>
              <span className="hidden group-open:inline">Hide answer</span>
              <ChevronDown size={16} aria-hidden className="transition-transform group-open:rotate-180" />
            </span>
          </summary>
          <p className="px-5 pb-5 leading-relaxed text-muted">{item.tbc ? <Tbc>{item.a}</Tbc> : item.a}</p>
        </details>
      ))}
    </div>
  );
}
