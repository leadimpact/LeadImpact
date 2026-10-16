import { SITE } from "@/content/site";

/** wa.me link with a prefilled message naming the page the visitor is on. */
export function whatsappHref(pageName?: string, phone: string = SITE.whatsapp): string {
  const where = pageName ? ` I'm on the "${pageName}" page.` : "";
  const text = `Hello LeadImpact University, I need some help.${where}`;
  return `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
}

/** Human page name from a pathname, e.g. "/admissions/tuition" → "Admissions › Tuition". */
export function pageNameFromPath(pathname: string): string {
  const parts = pathname.split(/[?#]/)[0].split("/").filter(Boolean);
  if (parts.length === 0) return "Home";
  return parts
    .map((p) => p.replace(/-/g, " ").replace(/^\w/, (c) => c.toUpperCase()))
    .join(" › ");
}
