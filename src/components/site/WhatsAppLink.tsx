"use client";

import { Suspense } from "react";
import { usePathname } from "next/navigation";
import { pageNameFromPath, whatsappHref } from "@/lib/whatsapp";

type AnchorProps = Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href">;

interface WhatsAppLinkProps extends AnchorProps {
  /** Override the page name in the prefilled message (defaults to one derived from the URL). */
  pageName?: string;
}

function PageAwareLink({ pageName, ...props }: WhatsAppLinkProps) {
  const pathname = usePathname();
  return <a href={whatsappHref(pageName ?? pageNameFromPath(pathname))} {...props} />;
}

/** wa.me link whose prefilled message names the current page. */
export function WhatsAppLink({ pageName, ...props }: WhatsAppLinkProps) {
  const anchor = { target: "_blank", rel: "noopener noreferrer", ...props };
  if (pageName) return <a href={whatsappHref(pageName)} {...anchor} />;
  // usePathname can suspend under Cache Components on routes with unknown params.
  return (
    <Suspense fallback={<a href={whatsappHref()} {...anchor} />}>
      <PageAwareLink {...anchor} />
    </Suspense>
  );
}
