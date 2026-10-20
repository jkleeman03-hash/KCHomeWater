import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRightIcon } from "lucide-react"
import { ContactCta } from "@/components/site/contact-cta"
import { PageHero } from "@/components/site/page-hero"
import { Section } from "@/components/site/section"
import { formatDate, getPosts } from "@/lib/blog"

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Plain-language guides to Kansas City water: hard water, chloramine, water softeners, filtration, reverse osmosis, and what it all costs.",
  alternates: { canonical: "/blog" },
}

export default function BlogPage() {
  const posts = getPosts()

  return (
    <>
      <PageHero
        crumbs={[{ href: "/blog", label: "Blog" }]}
        eyebrow="Blog"
        title="Kansas City water, explained"
        intro="Plain-language guides to hard water, chloramine, and the systems that fix them, so you can make a confident decision for your home."
        cta={false}
      />
      <Section tone="card" className="pt-12 md:pt-16">
        <ul className="grid gap-px overflow-hidden rounded-2xl border bg-border md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <li key={post.slug} className="group relative flex flex-col gap-3 bg-card p-6 transition-colors hover:bg-background md:p-8">
              <time dateTime={post.date} className="font-mono text-xs text-muted-foreground">
                {formatDate(post.date)}
              </time>
              <h2 className="text-xl">
                <Link href={`/blog/${post.slug}`} className="after:absolute after:inset-0">
                  {post.title}
                </Link>
              </h2>
              <p className="mb-4 text-sm leading-relaxed text-muted-foreground">{post.description}</p>
              <span className="mt-auto flex items-center gap-1.5 text-sm font-medium text-primary">
                Read article
                <ArrowRightIcon className="size-4 transition-transform group-hover:translate-x-1" />
              </span>
            </li>
          ))}
        </ul>
      </Section>
      <ContactCta estimate />
    </>
  )
}
