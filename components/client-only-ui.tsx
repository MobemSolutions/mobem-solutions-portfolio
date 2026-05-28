"use client"

import dynamic from "next/dynamic"

const Cursor = dynamic(() => import("@/components/cursor").then(m => ({ default: m.Cursor })), { ssr: false })
const ReadProgress = dynamic(() => import("@/components/read-progress").then(m => ({ default: m.ReadProgress })), { ssr: false })

export function ClientOnlyUI() {
  return (
    <>
      <Cursor />
      <ReadProgress />
    </>
  )
}
