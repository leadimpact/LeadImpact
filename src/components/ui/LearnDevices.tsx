import clsx from "clsx";
import { MonitorPlay, Smartphone } from "lucide-react";
import { MEDIA } from "@/content/media";
import { Photo } from "./Photo";

/**
 * LIU Learn on a laptop-style screen and a phone (design screens L02 and L03), overlapping.
 * Sized in percentages of its own width, so it scales from a phone column to the desktop layout.
 */
export function LearnDevices({ className }: { className?: string }) {
  return (
    <div aria-hidden className={clsx("relative aspect-[560/480]", className)}>
      <div className="absolute left-0 top-[6%] w-[84%] rounded-[8px] bg-black p-[2%] shadow-[0_24px_48px_rgba(14,15,18,0.25)]">
        <Photo
          asset={MEDIA.learnDashboard}
          alt=""
          icon={MonitorPlay}
          sizes="(min-width: 768px) 470px, 84vw"
          position="top left"
          className="aspect-[2880/2146] w-full rounded-[4px]"
        />
      </div>
      <div className="absolute bottom-0 right-[2%] w-[30%] rounded-[14px] bg-black p-[1.6%] shadow-[0_24px_48px_rgba(14,15,18,0.35)]">
        <Photo
          asset={MEDIA.learnPhone}
          alt=""
          icon={Smartphone}
          sizes="(min-width: 768px) 170px, 30vw"
          position="top"
          className="aspect-[780/1688] w-full rounded-[10px]"
        />
      </div>
    </div>
  );
}
