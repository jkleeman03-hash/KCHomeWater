import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ChevronRightIcon } from "lucide-react"
import { ContactCta } from "@/components/site/contact-cta"
import { formatDate, getPost, getPosts } from "@/lib/blog"
import { site } from "@/lib/site"

export const dynamicParams = false

export function generateStaticParams() {
  return getPosts().map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const post = getPost((await params).slug)
  if (!post) return {}
  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: { type: "article", title: post.title, description: post.description, publishedTime: post.date },
  }
}

export default async function PostPage({ params }: PageProps<"/blog/[slug]">) {
  const post = getPost((await params).slug)
  if (!post) notFound()

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    author: { "@type": "Organization", name: site.name },
    publisher: { "@type": "Organization", name: site.name, logo: `${site.url}/logo.svg` },
    mainEntityOfPage: `${site.url}/blog/${post.slug}`,
  }

  return (
    <>
      <article className="pt-8 pb-20 md:pt-12 md:pb-28">
        <div className="container-site max-w-3xl">
          <nav aria-label="Breadcrumb" className="mb-10 font-mono text-xs">
            <ol className="flex flex-wrap items-center gap-1.5 text-muted-foreground">
              <li><Link href="/" className="hover:text-foreground">Home</Link></li>
              <li className="flex items-center gap-1.5">
                <ChevronRightIcon className="size-3.5" />
                <Link href="/blog" className="hover:text-foreground">Blog</Link>
              </li>
            </ol>
          </nav>
          <header className="animate-rise border-b pb-8">
            <time dateTime={post.date} className="eyebrow block">
              {formatDate(post.date)}
            </time>
            <h1 className="text-4xl leading-tight md:text-5xl md:leading-[1.08]">{post.title}</h1>
            <p className="mt-6 text-lg leading-relaxed text-pretty text-muted-foreground">{post.description}</p>
          </header>
          {/* Post HTML comes from our own Markdown files in content/blog */}
          <div
            className="mt-10 grid gap-5 text-[1.05rem] leading-relaxed text-foreground/85 [&_a]:font-medium [&_a]:text-primary [&_a]:underline [&_a]:underline-offset-4 [&_h2]:mt-8 [&_h2]:text-2xl [&_h2]:text-foreground md:[&_h2]:text-3xl [&_h3]:mt-4 [&_h3]:text-xl [&_li]:ml-5 [&_li:has(>input)]:list-none [&_li>input]:mr-2 [&_li>input]:accent-primary [&_ol]:grid [&_ol]:list-decimal [&_ol]:gap-2 [&_strong]:font-semibold [&_strong]:text-foreground [&_table]:w-full [&_table]:text-sm [&_td]:border-t [&_td]:py-2 [&_td]:pr-4 [&_th]:pb-2 [&_th]:pr-4 [&_th]:text-left [&_th]:font-mono [&_th]:text-xs [&_th]:font-normal [&_th]:text-muted-foreground [&_th]:uppercase [&_ul]:grid [&_ul]:list-disc [&_ul]:gap-2"
            dangerouslySetInnerHTML={{ __html: post.html }}
          />
        </div>
      </article>
      <ContactCta estimate />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  )
}
