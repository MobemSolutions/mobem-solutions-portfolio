import Image from "next/image"
import Link from "next/link"
import { Calendar, Clock, User } from "lucide-react"
import { urlFor, estimateReadingTime } from "@/lib/sanity"
import type { Post } from "@/types/blog"
import { cn } from "@/lib/utils"

interface PostCardProps {
  post: Post
  featured?: boolean
}

export function PostCard({ post, featured = false }: PostCardProps) {
  const readingTime = estimateReadingTime(post.body || [])
  const publishedDate = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })
    : null

  return (
    <article
      className={cn(
        "group relative flex flex-col bg-card border border-border rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-accent/5 hover:-translate-y-1",
        featured && "md:flex-row"
      )}
    >
      {/* Cover image */}
      <Link
        href={`/blog/${post.slug.current}`}
        className={cn("relative overflow-hidden shrink-0", featured ? "md:w-1/2 aspect-video md:aspect-auto" : "aspect-video")}
        tabIndex={-1}
        aria-hidden="true"
      >
        {post.mainImage?.asset ? (
          <Image
            src={urlFor(post.mainImage).width(featured ? 800 : 600).height(featured ? 450 : 340).quality(85).url()}
            alt={post.mainImage.alt || post.title}
            fill
            priority={featured}
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            unoptimized
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-secondary flex items-center justify-center">
            <span className="text-4xl text-accent/30 font-bold">M</span>
          </div>
        )}
        {/* Category badge overlay */}
        {post.categories?.[0] && (
          <div className="absolute top-3 left-3">
            <span className="inline-block bg-accent text-accent-foreground text-xs font-semibold px-3 py-1 rounded-full">
              {post.categories[0].title}
            </span>
          </div>
        )}
      </Link>

      {/* Content */}
      <div className="flex flex-col flex-1 p-5 md:p-6">
        <Link href={`/blog/${post.slug.current}`} className="group/title flex-1">
          <h2 className={cn("font-bold text-foreground group-hover/title:text-accent transition-colors line-clamp-2 mb-2", featured ? "text-xl md:text-2xl" : "text-lg")}>
            {post.title}
          </h2>
        </Link>

        {post.excerpt && (
          <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2 mb-4">
            {post.excerpt}
          </p>
        )}

        {/* Meta */}
        <div className="flex items-center gap-4 text-xs text-muted-foreground mt-auto pt-4 border-t border-border flex-wrap">
          {post.authors && post.authors.length > 0 && (
            <span className="flex items-center gap-1.5">
              <User className="w-3.5 h-3.5" aria-hidden="true" />
              {post.authors.map(a => a.name).join(', ')}
            </span>
          )}
          {publishedDate && (
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" aria-hidden="true" />
              {publishedDate}
            </span>
          )}
          <span className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5" aria-hidden="true" />
            {readingTime} min de lecture
          </span>
        </div>
      </div>
    </article>
  )
}
