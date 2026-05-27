"use client"

import Link from "next/link"
import { useRouter, usePathname } from "next/navigation"
import type { ComponentPropsWithoutRef } from "react"

type Props = Omit<ComponentPropsWithoutRef<typeof Link>, "href"> & { href: string }

/**
 * Lien cross-page avec scroll smooth vers une ancre (#).
 * - Si on est déjà sur la bonne page  → scrollIntoView direct
 * - Sinon                             → sessionStorage + router.push
 *   Le header lit pendingScroll à l'arrivée et scroll smooth.
 */
export function SmoothAnchorLink({ href, onClick, children, ...props }: Props) {
  const router   = useRouter()
  const pathname = usePathname()

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const anchor = href.startsWith("/#") ? href.slice(1)
                 : href.startsWith("#")  ? href
                 : null

    if (anchor) {
      e.preventDefault()
      if (pathname === "/") {
        document.querySelector(anchor)?.scrollIntoView({ behavior: "smooth" })
      } else {
        sessionStorage.setItem("pendingScroll", anchor)
        router.push("/")
      }
    }

    onClick?.(e)
  }

  return (
    <Link href={href} onClick={handleClick} {...props}>
      {children}
    </Link>
  )
}
