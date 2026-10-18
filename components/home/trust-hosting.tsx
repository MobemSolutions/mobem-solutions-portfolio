"use client"

import { useState } from "react"
import { BellRing, Building2, Check, FileLock2, FileText, KeyRound, Server } from "lucide-react"
import { cn } from "@/lib/utils"
import { HOSTING_OPTIONS, TRUST_POINTS } from "@/lib/automation-content"
import { Eyebrow } from "@/components/home/primitives"

const HOSTING_ICONS = [Server, Building2]
const TRUST_ICONS = [FileText, FileLock2, KeyRound, BellRing]

/**
 * Confiance, version interactive : les deux façons d'héberger se choisissent comme une formule,
 * une phrase explique l'option retenue, puis les garanties valables dans les deux cas.
 */
export function TrustHosting() {
  const [selected, setSelected] = useState(0)
  const option = HOSTING_OPTIONS[selected]

  return (
    <>
      <div
        role="radiogroup"
        aria-label="Où héberger votre automatisation"
        className="mx-auto mt-10 grid max-w-[960px] grid-cols-2 gap-3 sm:gap-4 lg:mt-14"
        onKeyDown={(e) => {
          if (["ArrowRight", "ArrowDown", "ArrowLeft", "ArrowUp"].includes(e.key)) {
            e.preventDefault()
            setSelected((s) => (s + 1) % HOSTING_OPTIONS.length)
          }
        }}
      >
        {HOSTING_OPTIONS.map((o, i) => {
          const Icon = HOSTING_ICONS[i]
          const on = i === selected
          return (
            <button
              key={o.name}
              type="button"
              role="radio"
              aria-checked={on}
              tabIndex={on ? 0 : -1}
              onClick={() => setSelected(i)}
              className={cn(
                "group relative flex flex-col rounded-[16px] border p-4 text-left outline-none transition-[translate,box-shadow,border-color,background-color] duration-500 ease-[cubic-bezier(.22,1,.36,1)] focus-visible:ring-2 focus-visible:ring-blue/40 sm:p-7",
                on
                  ? "-translate-y-1 border-blue bg-white shadow-[0_24px_40px_-24px_rgba(13,68,232,0.45)]"
                  : "border-[#e5e5e8] bg-[#fcfcfc] hover:-translate-y-0.5 hover:border-[#c9c9cf] hover:bg-white"
              )}
            >
              <div className="flex items-center justify-between gap-3">
                <span
                  className={cn(
                    "flex h-10 w-10 items-center justify-center rounded-[10px] transition-[background-color,color,rotate,scale] duration-500 ease-[cubic-bezier(.22,1,.36,1)]",
                    on ? "rotate-[-6deg] scale-110 bg-blue text-white" : "bg-[#e6edff] text-blue group-hover:rotate-[-6deg]"
                  )}
                  aria-hidden="true"
                >
                  <Icon className="h-5 w-5" strokeWidth={2} />
                </span>
                <span className="flex items-center gap-2.5">
                  <span
                    className={cn(
                      "rounded-full px-2.5 py-0.5 text-[12px] font-[550] max-sm:hidden",
                      i === 0 ? "bg-[#e6edff] text-blue" : "bg-[#f0f0f2] text-graphite"
                    )}
                  >
                    {o.badge}
                  </span>
                  {/* Pastille de sélection, façon bouton radio */}
                  <span
                    className={cn(
                      "flex h-6 w-6 items-center justify-center rounded-full border-2 transition-colors duration-300",
                      on ? "border-blue bg-blue text-white" : "border-[#c9c9cf] bg-white text-transparent group-hover:border-graphite"
                    )}
                    aria-hidden="true"
                  >
                    <Check className={cn("h-3.5 w-3.5 transition-transform duration-300", on ? "scale-100" : "scale-0")} strokeWidth={3.5} />
                  </span>
                </span>
              </div>
              <span className="mt-4 text-[16px] font-[600] leading-[1.25] tracking-[-0.01em] text-ink sm:mt-5 sm:text-[20px]">{o.name}</span>
              <span className="mt-1 text-[12px] font-[550] text-[#838385] sm:hidden">{o.badge}</span>
              <span className="mt-2 text-[15px] leading-[1.6] text-charcoal max-sm:hidden">{o.text}</span>
              <span className="mt-5 flex flex-col gap-2 border-t border-[#ececef] pt-5 max-sm:hidden">
                {o.items.map((item) => (
                  <span key={item} className="flex items-start gap-2.5 text-[14px] text-graphite">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-blue" strokeWidth={2.5} aria-hidden="true" />
                    {item}
                  </span>
                ))}
              </span>
            </button>
          )
        })}
      </div>

      {/* Mobile : le détail de l'option choisie, sous les deux cartes compactes */}
      <div key={`detail-${selected}`} className="mt-3 rounded-[16px] border border-[#e5e5e8] bg-white p-4 animate-in fade-in-0 slide-in-from-bottom-1 duration-500 sm:hidden">
        <p className="text-[14px] leading-[1.55] text-charcoal">{option.text}</p>
        <ul className="mt-3 flex flex-col gap-1.5 border-t border-[#ececef] pt-3">
          {option.items.map((item) => (
            <li key={item} className="flex items-start gap-2 text-[13px] text-graphite">
              <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-blue" strokeWidth={2.5} aria-hidden="true" />
              {item}
            </li>
          ))}
        </ul>
      </div>

      {/* Ce que l'option choisie veut dire, en une phrase */}
      <p
        key={selected}
        aria-live="polite"
        className="mx-auto mt-6 max-w-[720px] text-center text-[15px] leading-[1.6] text-graphite animate-in fade-in-0 slide-in-from-bottom-1 duration-500 max-sm:hidden"
      >
        <span className="font-[600] text-blue">{option.name}&nbsp;:</span> {option.note}
      </p>

      {/* Ce qui vaut dans les deux cas */}
      <div className="mx-auto mt-10 max-w-[960px] sm:mt-12">
        <Eyebrow className="text-center">Dans les deux cas</Eyebrow>
        <ul className="mt-5 grid grid-cols-2 gap-2.5 sm:mt-6 sm:gap-3 lg:grid-cols-4">
          {TRUST_POINTS.map((p, i) => {
            const Icon = TRUST_ICONS[i]
            return (
              <li
                key={p.title}
                className="group flex flex-col gap-1.5 rounded-[14px] bg-[#f7f7f9] p-3.5 transition-[background-color,translate] duration-500 ease-[cubic-bezier(.22,1,.36,1)] hover:-translate-y-1 hover:bg-[#f0f1f4] sm:gap-2 sm:bg-transparent sm:p-4 sm:hover:bg-[#f5f6f8]"
              >
                <span
                  className="flex h-9 w-9 items-center justify-center rounded-[10px] bg-[#e6edff] text-blue transition-[background-color,color,rotate] duration-500 group-hover:rotate-[-6deg] group-hover:bg-blue group-hover:text-white"
                  aria-hidden="true"
                >
                  <Icon className="h-[18px] w-[18px]" strokeWidth={2} />
                </span>
                <span className="mt-1 text-[14px] font-[600] leading-[1.3] text-ink sm:text-[15px]">{p.title}</span>
                <span className="text-[12.5px] leading-[1.5] text-charcoal sm:text-[14px] sm:leading-[1.55]">{p.text}</span>
              </li>
            )
          })}
        </ul>
      </div>
    </>
  )
}
