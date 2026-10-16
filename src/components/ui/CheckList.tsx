import { Check } from "lucide-react";

/** Green-tick list (S08 "How the Board serves LIU"). */
export function CheckList({ items }: { items: string[] }) {
  return (
    <ul>
      {items.map((item) => (
        <li key={item} className="mt-3.5 flex items-start gap-3.5 text-[17.5px] leading-normal">
          <span
            aria-hidden
            className="flex size-7 flex-none items-center justify-center rounded-full bg-success-soft text-success"
          >
            <Check size={16} strokeWidth={3} />
          </span>
          {item}
        </li>
      ))}
    </ul>
  );
}
