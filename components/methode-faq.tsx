"use client"

import { useState } from "react"

interface FaqItem {
  question: string
  answer: string
}

export function MethodeFaq({ items }: { items: FaqItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <div>
      {items.map((faq, i) => (
        <div key={faq.question} className={i < items.length - 1 ? "border-b border-border" : ""}>
          <button
            className="w-full flex items-center justify-between gap-6 py-6 text-left text-[16px] font-semibold leading-snug hover:text-accent transition-colors"
            onClick={() => setOpenIndex(openIndex === i ? null : i)}
            aria-expanded={openIndex === i}
          >
            <span>{faq.question}</span>
            <span
              className="text-accent text-[24px] font-light flex-shrink-0 transition-transform duration-200"
              style={{ transform: openIndex === i ? "rotate(45deg)" : "rotate(0deg)" }}
              aria-hidden="true"
            >
              +
            </span>
          </button>
          {openIndex === i && (
            <p className="pb-6 text-[14px] leading-[1.6] text-muted-foreground max-w-[68ch]">
              {faq.answer}
            </p>
          )}
        </div>
      ))}
    </div>
  )
}
