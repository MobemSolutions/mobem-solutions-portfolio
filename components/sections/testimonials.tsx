"use client"

import { Quote } from "lucide-react"
import { cn } from "@/lib/utils"

const testimonials = [
  {
    id: 1,
    quote:
      "Mobem Solutions a transformé notre vision en une plateforme qui dépasse nos attentes. Leur capacité à comprendre nos enjeux métiers a fait toute la différence.",
    author: "Jean-Pierre Martin",
    role: "Directeur Général",
    company: "TransportPro",
    initials: "JM",
  },
  {
    id: 2,
    quote:
      "Une équipe réactive, à l'écoute, et qui livre dans les délais. Notre site génère maintenant 3x plus de leads qu'avant la refonte.",
    author: "Sophie Durand",
    role: "Responsable Marketing",
    company: "Maison Delalande",
    initials: "SD",
  },
  {
    id: 3,
    quote:
      "Ils ont su traduire des processus complexes en une interface intuitive. Nos utilisateurs adorent la nouvelle application.",
    author: "Marc Leblanc",
    role: "CTO",
    company: "MediTrack",
    initials: "ML",
  },
]

export function TestimonialsSection() {
  return (
    <section
      className="py-24 lg:py-32"
      aria-labelledby="testimonials-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block text-sm font-medium text-accent uppercase tracking-wider mb-4">
            Témoignages
          </span>
          <h2
            id="testimonials-heading"
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6"
          >
            <span className="text-balance">
              La parole à{" "}
              <span className="text-accent">nos clients</span>
            </span>
          </h2>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <figure
              key={testimonial.id}
              className={cn(
                "relative bg-card rounded-2xl border border-border p-8 transition-all duration-300",
                "hover:shadow-lg hover:border-border/50"
              )}
            >
              {/* Quote icon */}
              <Quote
                className="absolute top-6 right-6 w-8 h-8 text-accent/20"
                aria-hidden="true"
              />

              {/* Quote */}
              <blockquote className="mb-6">
                <p className="text-foreground leading-relaxed italic">
                  &quot;{testimonial.quote}&quot;
                </p>
              </blockquote>

              {/* Author */}
              <figcaption className="flex items-center gap-4">
                <div
                  className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center text-accent font-semibold"
                  aria-hidden="true"
                >
                  {testimonial.initials}
                </div>
                <div>
                  <cite className="not-italic font-semibold text-foreground block">
                    {testimonial.author}
                  </cite>
                  <span className="text-sm text-muted-foreground">
                    {testimonial.role}, {testimonial.company}
                  </span>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
