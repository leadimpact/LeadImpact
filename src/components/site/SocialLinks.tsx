import clsx from "clsx";
import { MessageCircle } from "lucide-react";
import { SITE } from "@/content/site";
import { whatsappHref } from "@/lib/whatsapp";

// lucide-react 1.x no longer ships brand marks; these keep its 24px stroke style.
const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

function FacebookIcon({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...stroke} aria-hidden>
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function YoutubeIcon({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...stroke} aria-hidden>
      <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
      <path d="m10 15 5-3-5-3z" />
    </svg>
  );
}

function LinkedinIcon({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...stroke} aria-hidden>
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

interface SocialLinksProps {
  size?: number;
  className?: string;
  linkClassName?: string;
}

export function SocialLinks({ size = 15, className, linkClassName }: SocialLinksProps) {
  const links = [
    { label: "Facebook", href: SITE.social.facebook, icon: <FacebookIcon size={size} /> },
    { label: "YouTube", href: SITE.social.youtube, icon: <YoutubeIcon size={size} /> },
    { label: "WhatsApp", href: whatsappHref(), icon: <MessageCircle size={size} aria-hidden /> },
    { label: "LinkedIn", href: SITE.social.linkedin, icon: <LinkedinIcon size={size} /> },
  ];
  return (
    <ul className={clsx("flex items-center", className)}>
      {links.map((l) => (
        <li key={l.label}>
          <a
            href={l.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`LeadImpact University on ${l.label}`}
            className={clsx("flex items-center justify-center hover:text-orange", linkClassName)}
          >
            {l.icon}
          </a>
        </li>
      ))}
    </ul>
  );
}
