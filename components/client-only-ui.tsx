"use client"

import dynamic from "next/dynamic"
import { PressEffects } from "@/components/press-effects"

const ReadProgress = dynamic(() => import("@/components/read-progress").then(m => ({ default: m.ReadProgress })), { ssr: false })

export function ClientOnlyUI() {
  return (
    <>
      <ReadProgress />
      <PressEffects />
    </>
  )
}
