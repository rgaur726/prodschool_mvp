import type React from "react"
import { BottomTabBar } from "@/components/ui/navigation"
import { DynamicBackground } from "@/components/ui/dynamic-background"

export default function AppLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen">
      <DynamicBackground />
      <main className="pb-16 sm:pb-0">{children}</main>
      <BottomTabBar />
    </div>
  )
}
