"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { DynamicBackground } from "@/components/ui/dynamic-background"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { ArrowRight, TrendingUp, BarChart2, Headphones, MessageSquare } from "lucide-react"
import Link from "next/link"

// Single illustrative feedback sample (anonymized)
const sampleFeedback = {
  scenario: "Prioritize features for a food delivery app facing cart abandonment",
  responseSnippet:
    "I'd first clarify who the core users are (new vs returning, geography), confirm the abandonment spike is real and sustained (not promo / season noise), quantify drop‑off at each funnel step, and size revenue impact. Only if the problem is large enough would I explore solutions...",
  strengths: [
    "Identified need for funnel breakdown before proposing fixes",
    "Proposed UX clarity improvements early (progress indicator)",
    "Signals data-first mindset before solutioning",
  ],
  nextSteps: [
    "Quantify current drop-off at each step (baseline %)",
    "Size impact of top 2 interventions with rough math",
    "Highlight potential operational risk (e.g. promo code abuse)",
  ],
  narrative:
    "Good analytical starting point. To strengthen, attach quick sizing to show business judgment and surface one risk to demonstrate execution awareness.",
}

const progressSignals = [
  { key: "Problem Framing", score: 82 },
  { key: "Metrics & Sizing", score: 74 },
  { key: "User Insight", score: 88 },
  { key: "Prioritization", score: 79 },
]

export default function RealTimeCoachPage() {
  return (
    <div className="min-h-screen">
      <DynamicBackground />
      <div className="container py-12 space-y-16">
        {/* HERO */}
        <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              <h1 className="font-display font-bold text-3xl md:text-5xl leading-tight mb-6">
                Your <span className="gradient-text">Real-Time Interview Coach</span>
              </h1>
              <p className="text-lg text-muted-foreground mb-6 max-w-prose">
                Practice like you perform. Get instant, structured coaching on every answer today — and soon, speak with a live AI interviewer that challenges you in real time (voice mode coming soon).
              </p>
              <div className="flex flex-wrap gap-3 mb-8">
                <Badge variant="secondary" className="rounded-full">Instant Breakdown</Badge>
                <Badge variant="outline" className="rounded-full">Actionable Next Step</Badge>
                <Badge variant="secondary" className="rounded-full">Progress Metrics</Badge>
                <Badge variant="outline" className="rounded-full flex items-center gap-1"><Headphones className="h-3 w-3" /> Voice Mode Soon</Badge>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" asChild>
                  <Link href="/questions">Start Practicing <ArrowRight className="ml-2 h-4 w-4" /></Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/pricing">See Plans</Link>
                </Button>
              </div>
            </div>
              <div className="relative w-full h-64 sm:h-72 md:h-[420px] rounded-3xl overflow-hidden border bg-background/40 group">
                {/* Replace file name below with the saved image from attachment (place it in /public) */}
                <Image
                  src="/ai-hero.png"
                  alt="Glowing open book with branching circuit strategy icons"
                  fill
                  priority
                  className="object-cover scale-105 transition-transform duration-700 group-hover:scale-100 saturate-[1.15] contrast-[1.08] brightness-[1.15]"
                />
                {/* Removed bottom tag badges for a cleaner hero visual */}
              </div>
          </div>
        </motion.section>

        {/* PROBLEM VS SOLUTION */}
        <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}>
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="border-destructive/30">
              <CardHeader className="pb-3">
                <CardTitle className="text-xl">Common Prep Issues</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-muted-foreground">
                <ul className="space-y-2 list-disc list-inside">
                  <li>Feedback is vague. You hear “be structured” but not how.</li>
                  <li>Hard to tell if you’re actually getting better week to week.</li>
                  <li>Easy to memorize answers instead of showing real thinking.</li>
                  <li>Practice feels safe— no real follow‑ups or pressure.</li>
                </ul>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-xl flex items-center gap-2">What You Get Instead</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-muted-foreground">
                <ul className="space-y-2 list-disc list-inside">
                  <li>Instant plain‑English breakdown after each answer.</li>
                  <li>Simple skill scores so you can watch improvement.</li>
                  <li>One clear next thing to fix— no overwhelm.</li>
                  <li>Coming soon: live voice AI that asks follow‑ups.</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </motion.section>

        {/* VALUE PILLARS */}
        <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.15 }}>
          <h2 className="font-display font-bold text-2xl mb-6">What You Gain</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {[{
              icon: <MessageSquare className="h-6 w-6" />, title: "Clarity Fast", bullets: ["Structured feedback in seconds", "Know exactly what to fix next"],
            }, {
              icon: <TrendingUp className="h-6 w-6" />, title: "Visible Progress", bullets: ["Skill scores over time", "Confidence from real improvement"],
            }, {
              icon: <BarChart2 className="h-6 w-6" />, title: "Better Judgment", bullets: ["Push beyond rote frameworks", "Emphasis on trade-offs & impact"],
            }, {
              icon: <Headphones className="h-6 w-6" />, title: "Realism (Soon)", bullets: ["AI voice interviewer", "Dynamic follow-up pressure"],
            }].map(p => (
              <Card key={p.title} className="flex flex-col">
                <CardContent className="p-5 flex flex-col gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">{p.icon}</div>
                  <h3 className="font-semibold text-lg">{p.title}</h3>
                  <ul className="text-sm text-muted-foreground space-y-2">
                    {p.bullets.map(b => <li key={b} className="leading-snug">{b}</li>)}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.section>

        {/* SAMPLE FEEDBACK */}
        <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }}>
          <h2 className="font-display font-bold text-2xl mb-6">Sample Coaching Output</h2>
            <Card>
              <CardHeader className="pb-4">
                <CardTitle className="text-base">Scenario: {sampleFeedback.scenario}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-5 text-sm">
                <div>
                  <p className="font-semibold mb-1">Response Snippet</p>
                  <p className="text-muted-foreground italic">“{sampleFeedback.responseSnippet}”</p>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <p className="font-semibold mb-2">What You Did Well</p>
                    <ul className="space-y-2 list-disc list-inside text-muted-foreground">
                      {sampleFeedback.strengths.map(s => <li key={s} className="leading-snug">{s}</li>)}
                    </ul>
                  </div>
                  <div>
                    <p className="font-semibold mb-2">Next Step Focus</p>
                    <ul className="space-y-2 list-disc list-inside text-muted-foreground">
                      {sampleFeedback.nextSteps.map(s => <li key={s} className="leading-snug">{s}</li>)}
                    </ul>
                  </div>
                </div>
                <div className="rounded-lg border bg-muted/40 p-4 text-muted-foreground text-sm leading-relaxed">
                  {sampleFeedback.narrative}
                </div>
                <p className="text-xs text-muted-foreground/70">Sample only. Actual coaching adapts to depth, structure, metrics, and follow-up handling.</p>
              </CardContent>
            </Card>
        </motion.section>

        {/* PROGRESS VISUALIZATION */}
        <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.25 }}>
          <h2 className="font-display font-bold text-2xl mb-6">Track Your Growth</h2>
          <div className="grid lg:grid-cols-5 gap-10 items-stretch">
            <Card className="lg:col-span-2 order-2 lg:order-1 h-full">
              <CardHeader className="pb-4">
                <CardTitle className="text-base flex items-center gap-2"><BarChart2 className="h-4 w-4" /> Mock Progress Dashboard</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-4">
                  {progressSignals.map(s => (
                    <div key={s.key} className="p-3 rounded-lg border bg-card/40">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-xs">{s.key}</span>
                        <span className="text-[11px] font-semibold">{s.score}/100</span>
                      </div>
                      <Progress value={s.score} className="h-1.5" />
                    </div>
                  ))}
                </div>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li>Longitudinal skill trajectories with per‑session deltas.</li>
                  <li>Early plateau detection to proactively redirect focus.</li>
                  <li>Objective readiness signal before live interviews.</li>
                </ul>
                <p className="text-xs text-muted-foreground/70">[Dashboard Visualization Area]</p>
              </CardContent>
            </Card>
            <div className="lg:col-span-3 order-1 lg:order-2 flex flex-col h-full justify-center pl-4 md:pl-6 lg:pl-10">
              <div className="space-y-6">
                <p className="text-sm md:text-[15px] leading-relaxed text-white/90">
                  Every answer becomes a clear skill signal— not just a counter. See what’s <span className="text-white font-semibold">improving</span>, what’s
                  <span className="text-white/80 font-medium"> stalled</span>, and where to focus next so you prep with <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent font-semibold">real progress</span> not guesswork.
                </p>
                <ul className="space-y-3 text-[15px] md:text-base text-white/85 leading-snug list-disc list-inside">
                  <li><span className="font-medium text-white">Multi‑skill scoring</span> (framing • metrics • prioritization) for objective baselines.</li>
                  <li><span className="font-medium text-white">Session deltas & trends</span> surface acceleration vs slowdowns instantly.</li>
                  <li><span className="font-medium text-white">Focus prompt</span> highlights the single highest‑leverage next action.</li>
                  <li><span className="font-medium text-white/90">Coming soon</span>: export summary • voice interviewer • shareable progress link.</li>
                </ul>
                <p className="text-xs text-white/50">Visual dashboard unlocks after your first practice session.</p>
              </div>
            </div>
          </div>
        </motion.section>

        {/* CTA FOOTER */}
        <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.3 }}>
          <Card className="relative overflow-hidden border-primary/20 text-center bg-background/30 backdrop-blur-sm">
            <div className="absolute inset-0 pointer-events-none">
              <Image src="/placeholder.jpg" alt="Subtle background" fill className="object-cover opacity-20" />
              <div className="absolute inset-0 bg-gradient-to-r from-background/70 via-background/30 to-background/70" />
            </div>
            <CardContent className="relative py-12">
              <h3 className="font-display font-bold text-2xl mb-4">Build Interview Confidence Faster</h3>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto text-sm md:text-base">
                Get structured coaching now. Voice-based live interviewer launches soon — lock in early access and start stacking improvement today.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" asChild>
                  <Link href="/questions">Start Now <ArrowRight className="ml-2 h-4 w-4" /></Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/pricing">Upgrade Path</Link>
                </Button>
              </div>
              <p className="mt-4 text-xs text-muted-foreground/70 flex items-center justify-center gap-2"><Headphones className="h-3 w-3" /> Voice interview mode in development.</p>
            </CardContent>
          </Card>
        </motion.section>
      </div>
    </div>
  )
}
