import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { POSTS, POST_CATEGORY_LABELS, findPost, formatPostDate, postHref } from "@/content/posts";
import { PageHero } from "@/components/ui/PageHero";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { Tbc } from "@/components/ui/Tbc";

export function generateStaticParams() {
  return POSTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/media/blog/[slug]">): Promise<Metadata> {
  const post = findPost((await params).slug);
  return post ? { title: post.title, description: post.excerpt } : {};
}

/** Article page — no design; built from the S21 and S07 patterns. Bodies are placeholders. */
export default async function PostPage({ params }: PageProps<"/media/blog/[slug]">) {
  const post = findPost((await params).slug);
  if (!post) notFound();
  const more = POSTS.filter((p) => p.slug !== post.slug).slice(0, 3);

  return (
    <>
      <PageHero
        title={post.title}
        subtitle={`${POST_CATEGORY_LABELS[post.category]} · ${formatPostDate(post.date)} · ${post.readMinutes} min read`}
        bannerLabel="Story · banner photo"
        crumbs={[{ label: "Home", href: "/" }, { label: "Blog & newsletter", href: "/media/blog" }, { label: POST_CATEGORY_LABELS[post.category] }]}
      />
      <article className="mx-auto max-w-[760px] px-5 py-12 md:py-[80px]">
        <p className="text-[21px] leading-relaxed">{post.excerpt}</p>
        <ImagePlaceholder label="Story photo" className="mt-8 h-[300px] rounded-[8px]" />
        <p className="mt-8 text-[18px] leading-relaxed text-muted">
          <Tbc>[Article text to be supplied by LIU’s media team.]</Tbc>
        </p>
        <Link href="/media/blog" className="btn btn-outline mt-10">
          <ArrowLeft size={18} aria-hidden />
          All stories
        </Link>
      </article>
      <section aria-labelledby="more-stories" className="bg-[#F4F2EF] px-page py-12">
        <h2 id="more-stories" className="eyebrow">
          More stories
        </h2>
        <ul className="mt-5 grid gap-x-8 md:grid-cols-3">
          {more.map((p) => (
            <li key={p.slug}>
              <Link href={postHref(p)} className="flex min-h-[64px] items-center justify-between gap-3 border-b border-line py-3 font-bold hover:text-orange-text">
                {p.title}
                <ArrowRight size={18} aria-hidden className="flex-none" />
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
