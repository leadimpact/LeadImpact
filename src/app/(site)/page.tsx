import { Hero } from "@/components/home/Hero";
import { QuickActions } from "@/components/home/QuickActions";
import { CourseFinder } from "@/components/home/CourseFinder";
import { StatsBar, Welcome } from "@/components/home/Welcome";
import { FeaturedPrograms } from "@/components/home/FeaturedPrograms";
import { Colleges } from "@/components/home/Colleges";
import { LearnPromo } from "@/components/home/LearnPromo";
import { Campuses } from "@/components/home/Campuses";
import { PresidentBand } from "@/components/home/PresidentBand";
import { NewsEvents } from "@/components/home/NewsEvents";
import { Testimonials } from "@/components/home/Testimonials";
import { Certified, WhyChoose } from "@/components/home/WhyChoose";
import { MobileCta } from "@/components/home/MobileCta";

/** S01 (desktop) / SM1 (mobile). Mobile first: phones get every section, laid out for small screens. */
export default function HomePage() {
  return (
    <>
      <Hero />
      <QuickActions />
      <CourseFinder />
      <Welcome />
      <StatsBar />
      <FeaturedPrograms />
      <Colleges />
      <LearnPromo />
      <Campuses />
      <PresidentBand />
      <NewsEvents />
      <Testimonials />
      <WhyChoose />
      <Certified />
      <MobileCta />
    </>
  );
}
