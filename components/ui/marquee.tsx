"use client"

import type React from "react"

import { cn } from "@/lib/utils"

interface MarqueeProps {
  children: React.ReactNode
  className?: string
  reverse?: boolean
  pauseOnHover?: boolean
  speed?: "slow" | "normal" | "fast"
}

export function Marquee({
  children,
  className,
  reverse = false,
  pauseOnHover = false,
  speed = "normal",
}: MarqueeProps) {
  const speedClass = {
    slow: "animate-marquee",
    normal: "animate-marquee",
    fast: "animate-marquee",
  }[speed]

  return (
    <div
      className={cn(
        "marquee group flex overflow-hidden",
        pauseOnHover && "hover:[animation-play-state:paused] *:hover:[animation-play-state:paused]",
        className,
      )}
    >
      <div
        className={cn(
          "marquee__content flex shrink-0 justify-around min-w-full gap-4",
          speedClass,
          reverse && "[animation-direction:reverse]",
        )}
      >
        {children}
      </div>
      <div
        className={cn(
          "marquee__content flex shrink-0 justify-around min-w-full gap-4",
          speedClass,
          reverse && "[animation-direction:reverse]",
        )}
        aria-hidden="true"
      >
        {children}
      </div>
    </div>
  )
}
