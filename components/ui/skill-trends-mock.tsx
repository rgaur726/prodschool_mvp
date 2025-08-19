"use client"

import React from "react"
import { cn } from "@/lib/utils"

// Lightweight SVG mock of progress analytics for marketing only
export function SkillTrendsMock({ className }: { className?: string }) {
  return (
    <div className={cn("rounded-2xl border bg-card/40 backdrop-blur-sm p-5 relative overflow-hidden h-full", className)}>
      <div className="absolute inset-0 pointer-events-none select-none [mask-image:linear-gradient(to_bottom,black,black,transparent)]" />
      <div className="grid lg:grid-cols-5 gap-6 h-full">
        {/* Main Chart + Legend */}
        <div className="lg:col-span-3 flex flex-col">
          <h3 className="font-semibold text-sm md:text-base mb-3">Skill Trend Lines</h3>
          <div className="flex-1 flex flex-col">
            <div className="relative flex-1 mb-4">
              <svg viewBox="0 0 300 170" className="w-full h-full overflow-visible text-muted-foreground/40">
                {/* grid lines */}
                {[40,80,120].map(y => (
                  <line key={y} x1={0} x2={300} y1={y} y2={y} stroke="currentColor" strokeWidth={1} strokeDasharray="2 4" />
                ))}
                {/* y axis labels (simplified) */}
                <text x={0} y={15} className="fill-current text-[10px] md:text-[11px] font-medium" >100</text>
                <text x={0} y={55} className="fill-current text-[10px] md:text-[11px] font-medium" >80</text>
                <text x={0} y={95} className="fill-current text-[10px] md:text-[11px] font-medium" >60</text>
                <text x={0} y={135} className="fill-current text-[10px] md:text-[11px] font-medium" >40</text>
                {/* lines */}
                <path d="M10 100 L70 80 L130 78 L190 70 L250 50 L290 40" strokeWidth={3} stroke="#0A57D9" fill="none" strokeLinecap="round" />
                <path d="M10 120 L70 98 L130 90 L190 82 L250 70 L290 60" strokeWidth={3} stroke="#1E8BFF" fill="none" strokeLinecap="round" />
                <path d="M10 130 L70 112 L130 105 L190 98 L250 88 L290 78" strokeWidth={3} stroke="#4FB4FF" fill="none" strokeLinecap="round" />
                <path d="M10 140 L70 125 L130 120 L190 110 L250 100 L290 90" strokeWidth={3} stroke="#7BD2FF" fill="none" strokeLinecap="round" />
              </svg>
              {/* Legend */}
              <div className="mt-2 grid grid-cols-2 gap-x-4 gap-y-1 text-[11px] md:text-xs">
                {[
                  ["#0A57D9","Problem Solving"],
                  ["#1E8BFF","Strategy"],
                  ["#4FB4FF","Communication"],
                  ["#7BD2FF","Execution"],
                ].map(([c,label]) => (
                  <div key={label} className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full" style={{ background:c as string }} />
                    <span className="text-muted-foreground leading-none">{label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        {/* Side Panels */}
        <div className="lg:col-span-2 flex flex-col gap-4">
          <div className="rounded-xl border bg-background/60 p-4">
            <p className="text-3xl font-bold leading-none mb-1">+12</p>
            <p className="text-xs text-muted-foreground">Skill score change</p>
          </div>
          <div className="rounded-xl border bg-background/60 p-4 flex flex-col gap-2">
            <p className="font-semibold text-sm">Focus Recommendation</p>
            <p className="text-sm text-muted-foreground leading-snug">Identify Growth Opportunities</p>
          </div>
          <div className="rounded-xl border bg-background/60 p-3 flex flex-col gap-2">
            <div className="text-[11px] font-medium">Focus Score Over Time</div>
            <svg viewBox="0 0 160 50" className="w-full h-16 overflow-visible text-muted-foreground/40">
              <line x1={0} x2={160} y1={40} y2={40} stroke="currentColor" strokeWidth={1} />
              <path d="M0 40 L20 35 L40 28 L60 30 L80 24 L100 18 L120 22 L140 15 L160 10" strokeWidth={2.5} stroke="#0A57D9" fill="none" strokeLinecap="round" />
            </svg>
          </div>
          <p className="text-[10px] text-muted-foreground/70">Illustrative only — real dashboard adapts to your sessions.</p>
        </div>
      </div>
    </div>
  )
}
