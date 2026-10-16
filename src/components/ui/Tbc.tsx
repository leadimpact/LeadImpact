/** Marks placeholder text (dates, statistics, testimonials) with a dotted orange underline. */
export function Tbc({ children }: { children: React.ReactNode }) {
  return (
    <span className="tbc" title="Placeholder — to be confirmed">
      {children}
    </span>
  );
}
