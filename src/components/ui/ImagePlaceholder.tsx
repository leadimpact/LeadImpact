import clsx from "clsx";
import { Image as ImageIcon, type LucideIcon } from "lucide-react";

interface ImagePlaceholderProps {
  /** What belongs here — listed in CHANGES_NEEDED.md. */
  label: string;
  /** null hides the icon (e.g. when a play button is overlaid). */
  icon?: LucideIcon | null;
  iconSize?: number;
  /** Put the icon and label in the top-left corner (portrait cards). */
  corner?: boolean;
  className?: string;
}

/** Visible, labelled stand-in for a photo that LIU still has to supply. */
export function ImagePlaceholder({ label, icon: Icon = ImageIcon, iconSize = 34, corner, className }: ImagePlaceholderProps) {
  return (
    <div
      role="img"
      aria-label={`Placeholder: ${label}`}
      className={clsx("placeholder", corner && "items-start! justify-start! p-[22px]", className)}
    >
      {Icon && <Icon size={iconSize} aria-hidden />}
      <span className={clsx("placeholder-label", corner && "px-0! text-left")}>{label}</span>
    </div>
  );
}
