import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { ALBUMS, findAlbum } from "@/content/gallery";
import { PageHero } from "@/components/ui/PageHero";
import { AlbumPhotos } from "./AlbumPhotos";

export function generateStaticParams() {
  return ALBUMS.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: PageProps<"/media/gallery/[slug]">): Promise<Metadata> {
  const album = findAlbum((await params).slug);
  return album ? { title: album.title, description: `${album.photos.length} photos · ${album.meta}` } : {};
}

/** Album page — no design; every photo in the album, built from the S22 grid. */
export default async function AlbumPage({ params }: PageProps<"/media/gallery/[slug]">) {
  const album = findAlbum((await params).slug);
  if (!album) notFound();

  return (
    <>
      <PageHero
        title={album.title}
        subtitle={`${album.photos.length} photos · ${album.meta}`}
        bannerLabel={`${album.title} · banner photo`}
        banner={album.photos[0]}
        crumbs={[{ label: "Home", href: "/" }, { label: "Gallery", href: "/media/gallery" }, { label: album.title }]}
      />
      <section aria-label={`${album.title} photos`} className="px-page py-10 md:py-14">
        <AlbumPhotos title={album.title} photos={album.photos} />
        <Link href="/media/gallery" className="btn btn-outline mt-10">
          <ArrowLeft size={18} aria-hidden />
          All albums
        </Link>
      </section>
    </>
  );
}
