import fs from "node:fs"
import path from "node:path"
import { marked } from "marked"

// Blog posts are Markdown files in content/blog. The file name (minus .md) is the URL slug.
// Each file starts with a front matter block:
//   ---
//   title: Is Kansas City water hard?
//   description: One or two sentences for Google and the blog list.
//   date: 2026-10-20
//   ---
// Posts dated in the future stay hidden until the site is next deployed on or after that day (pages are built ahead
// of time).

const postsDir = path.join(process.cwd(), "content/blog")

export type Post = {
  slug: string
  title: string
  description: string
  date: string
  html: string
}

function readPost(file: string): Post {
  const raw = fs.readFileSync(path.join(postsDir, file), "utf8")
  const match = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/)
  if (!match) throw new Error(`${file} is missing its front matter block`)
  const meta = Object.fromEntries(
    match[1].split("\n").map((line) => {
      const i = line.indexOf(":")
      // Values may be wrapped in quotes, which is needed when a title contains a colon
      return [line.slice(0, i).trim(), line.slice(i + 1).trim().replace(/^"(.*)"$/, "$1")]
    }),
  )
  for (const key of ["title", "description", "date"]) {
    if (!meta[key]) throw new Error(`${file} is missing "${key}" in its front matter`)
  }
  return {
    slug: file.replace(/\.md$/, ""),
    title: meta.title,
    description: meta.description,
    date: meta.date,
    html: marked.parse(match[2], { async: false }),
  }
}

export function getPosts() {
  const today = new Date().toISOString().slice(0, 10)
  return fs
    .readdirSync(postsDir)
    .filter((file) => file.endsWith(".md"))
    .map(readPost)
    .filter((post) => post.date <= today)
    .sort((a, b) => b.date.localeCompare(a.date))
}

export function getPost(slug: string) {
  return getPosts().find((post) => post.slug === slug)
}

export function formatDate(date: string) {
  return new Date(`${date}T12:00:00`).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })
}
