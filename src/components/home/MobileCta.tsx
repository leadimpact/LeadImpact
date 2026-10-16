import Link from "next/link";
import { ArrowRight, MessageCircle } from "lucide-react";
import { APP_LINKS } from "@/content/site";
import { WhatsAppLink } from "@/components/site/WhatsAppLink";

/** Closing orange card on phones (SM1): "Your calling is waiting." */
export function MobileCta() {
  return (
    <section aria-labelledby="mobile-cta" className="mx-5 mb-9 rounded-[10px] bg-orange p-[26px] md:hidden">
      <h2 id="mobile-cta" className="font-display text-[32px] font-extrabold leading-[1.05] tracking-[-0.02em] text-black">
        Your calling is waiting.
      </h2>
      <Link href={APP_LINKS.apply} className="btn btn-lg mt-[18px] w-full bg-black text-white">
        Apply for admission
        <ArrowRight size={18} aria-hidden />
      </Link>
      <WhatsAppLink pageName="Home" className="btn btn-lg btn-white mt-2.5 w-full">
        <MessageCircle size={18} aria-hidden />
        Talk to admissions
      </WhatsAppLink>
    </section>
  );
}
