import clsx from "clsx";

const GOLD = "#F5B70A";
const BLACK = "#0E0F12";

/**
 * Flat redraw of the LIU crest for small sizes (header, footer, favicon): the shield, torch and
 * gold rim of the official badge, with "LIU" in place of the text that blurs below ~100px.
 * Keep src/app/icon.svg in step when changing it.
 */
export function Crest({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 118" aria-hidden focusable="false" className={clsx("flex-none", className)}>
      <path d="M50 2 94 13v45c0 28-19 46-44 58C25 104 6 86 6 58V13Z" fill={GOLD} />
      <path d="M50 8.5 88 18v40c0 24-16 40-38 51C28 98 12 82 12 58V18Z" fill={BLACK} />
      <path
        d="M50 13 84 21.5V58c0 21.5-14 36-34 46-20-10-34-24.5-34-46V21.5Z"
        fill="none"
        stroke={GOLD}
        strokeWidth="1.2"
        opacity=".55"
      />
      {/* Torch */}
      <path
        d="M50 17c6 7 9.5 11.5 7.5 18-1 3.5-4 5.5-7.5 5.5s-7-2-7.5-6c-.5-4 2-6 3.5-9.5 1 3 2.5 4.5 3.8 3.4 1.5-2.4 1.2-6.4.2-11.4Z"
        fill={GOLD}
      />
      <path
        d="M50 27c2.8 3.5 4 6 3 9-.6 1.8-1.8 2.6-3 2.6s-2.6-.9-3-2.6c-.4-1.8.6-3 1.5-4.6.4 1 1 1.6 1.5 1.2.4-1.4.4-3 0-5.6Z"
        fill="#F7731E"
      />
      <path d="M41.5 42h17l-3 5h-11Z" fill={GOLD} />
      <path d="M46.5 47h7l-1 3.5h-5Z" fill={GOLD} />
      {/* LIU, drawn as shapes so it never depends on a font loading */}
      <g fill="#FFFFFF">
        <path d="M24 55h7v19h10v7H24Z" />
        <path d="M44.5 55h7v26h-7Z" />
        <path d="M57 55h7v16.5c0 2 1.2 3.2 3 3.2s3-1.2 3-3.2V55h7v16.5C77 77.5 73 81 67 81s-10-3.5-10-9.5Z" />
      </g>
      <path d="M34 89h32" stroke={GOLD} strokeWidth="2.4" strokeLinecap="round" />
    </svg>
  );
}
