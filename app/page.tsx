"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase-client"
// removed dynamic alignment logic
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Marquee } from "@/components/ui/marquee"
import { MainNavigation } from "@/components/ui/navigation"
import { DynamicBackground } from "@/components/ui/dynamic-background"
import {
  Play,
  Users,
  Star,
  Clock,
  Brain,
  Target,
  Sparkles,
  Zap,
  Trophy,
  BookOpen,
  TrendingUp,
  CheckCircle,
} from "lucide-react"
import { mockQuestions, mockTestimonials } from "@/lib/mock-data"
import { CompanyLogos } from "@/components/CompanyLogos"

export default function HomePage() {
  const hotQuestions = mockQuestions.filter((q) => q.isHot)
  const [leftOffset, setLeftOffset] = useState(0)
  const router = useRouter()

  // Redirect authenticated users directly to dashboard
  useEffect(() => {
    let active = true
    async function check() {
      try {
        if (!supabase) return
        const { data } = await supabase.auth.getSession()
        if (!active) return
        if (data.session?.user) {
          router.replace('/app/dashboard')
        }
      } catch (_) {
        /* silent */
      }
    }
    check()
  }, [router])

  useEffect(() => {
    function alignCenters() {
      if (window.innerWidth < 1024) { // only apply on large screens
        setLeftOffset(0)
        return
      }
      const left = document.getElementById('hero-left-column')
      const right = document.getElementById('hero-right-column')
      if (!left || !right) return
      const l = left.getBoundingClientRect()
      const r = right.getBoundingClientRect()
      const leftCenter = l.top + l.height / 2
      const rightCenter = r.top + r.height / 2
      setLeftOffset(rightCenter - leftCenter)
    }
    alignCenters()
    window.addEventListener('resize', alignCenters)
    return () => window.removeEventListener('resize', alignCenters)
  }, [])

  return (
    <div className="min-h-screen overflow-hidden">
      <DynamicBackground />
      <MainNavigation />

      {/* Hero Section - Completely Redesigned */}
  <section className="relative min-h-screen pt-8 pb-10 lg:pt-12 lg:pb-16 flex items-start section-hazy">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <motion.div
              id="hero-left-column"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
              style={leftOffset ? { transform: `translateY(${leftOffset}px)` } : undefined}
            >
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <Badge className="relative overflow-hidden rounded-full px-5 py-1.5 text-xs font-semibold tracking-wide bg-gradient-to-r from-primary/60 via-primary/50 to-fuchsia-500/50 text-white ring-1 ring-primary/40 shadow-sm backdrop-blur-sm">
                    <span className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_30%_30%,white,transparent_60%)]" />
                    <span className="relative flex items-center">
                      <Sparkles className="h-4 w-4 mr-2" />
                      AI-Powered Learning
                    </span>
                  </Badge>
                </div>

                <h1 className="font-display font-bold text-4xl md:text-6xl lg:text-7xl leading-tight">
                  <span className="gradient-text">Master PM</span>
                  <br />
                  <span className="text-foreground">Interviews with</span>
                  <br />
                  <span className="relative">
                    <span className="gradient-text">Confidence</span>
                    <motion.div
                      className="absolute -bottom-1.5 left-0 right-0 h-2 rounded-full overflow-hidden"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: 1, delay: 0.5 }}
                    >
                      <div className="w-full h-full app-gradient animate-pulse [animation-duration:3s] opacity-90" />
                    </motion.div>
                  </span>
                </h1>

                <p className="text-xl text-muted-foreground leading-relaxed max-w-lg">
                  Practice with real interview questions, get instant AI feedback, and join a community of aspiring PMs
                  landing roles at top companies.
                </p>
              </div>

              {/* (CTAs now live under right column cards) */}

              {/* Social Proof */}
              <div id="social-proof-anchor" className="flex items-center gap-6 pt-4">
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div
                      key={i}
                      className="w-10 h-10 rounded-2xl app-gradient border-2 border-background flex items-center justify-center text-white text-sm font-bold shadow-md shadow-cyan-500/30"
                    >
                      {String.fromCharCode(64 + i)}
                    </div>
                  ))}
                </div>
                <div>
                  <div className="font-semibold text-foreground">12,500+ PMs</div>
                  <div className="text-sm text-muted-foreground">already practicing</div>
                </div>
              </div>
            </motion.div>

            {/* Right Visual: Stacked Question Cards + CTAs */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              id="hero-right-column"
              className="relative flex flex-col items-center w-full h-full max-h-[780px]"
            >
              <div className="flex flex-col w-full max-w-md flex-1 pt-2">
                {mockQuestions.slice(0,3).map((q, i) => {
                  const rotations = [2.8, -1.8, 1.6];
                  return (
                    <motion.div
                      key={q.id}
                      className={`group glass rounded-3xl p-6 shadow-xl border border-primary/10 backdrop-blur-lg cursor-pointer select-none transition-colors ${i>0 ? '-mt-6' : ''}`}
                      initial={{ opacity: 0, y: 28, scale: 0.97, rotate: rotations[i] * 1.4 }}
                      animate={{ opacity: 1, y: 0, scale: 1, rotate: rotations[i] }}
                      transition={{ duration: 0.55, delay: 0.1 * i, ease: 'easeOut' }}
                      whileHover={{ y: -6, scale: 1.02, rotate: rotations[i] * 0.4, boxShadow: '0 14px 38px -10px hsl(var(--primary)/0.38)' }}
                      whileTap={{ scale: 0.995 }}
                      onClick={() => window.dispatchEvent(new CustomEvent('prodschool:auth-open', { detail: { mode: 'signup', source: 'hero-card' } }))}
                    >
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <Badge variant="outline" className="rounded-xl text-xs px-3 py-1">{q.category}</Badge>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <Clock className="h-3.5 w-3.5" />
                            {q.timeLimit}m
                            <span className="inline-flex items-center gap-1">
                              <Users className="h-3.5 w-3.5" /> {q.attempts}
                            </span>
                          </div>
                        </div>
                        <div>
                          <h3 className="font-display font-semibold text-base mb-1 line-clamp-2">{q.title}</h3>
                          <p className="text-xs text-muted-foreground line-clamp-2">{q.prompt?.slice(0,120) || 'Practice real interview scenario...'}</p>
                        </div>
                        <div className="flex items-center gap-4 text-[11px] text-muted-foreground group-hover:text-foreground transition-colors">
                          <span className="flex items-center gap-1">
                            <Star className="h-3 w-3 fill-current text-yellow-500" />
                            {q.avgScore?.toFixed?.(1) || '7.2'} avg
                          </span>
                          {q.isHot && <span className="inline-flex items-center gap-1 text-red-500">🔥 Hot</span>}
                          <span className="flex items-center gap-1"><Brain className="h-3 w-3" /> AI Feedback</span>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
              {/* CTAs directly under stack */}
              <div className="mt-6 w-full max-w-md flex flex-col sm:flex-row gap-4">
                <Button
                  variant="outline"
                  onClick={() => window.dispatchEvent(new CustomEvent('prodschool:auth-open', { detail: { mode: 'signup', source: 'hero-start-practicing' } }))}
                  className="flex-1 min-w-[230px] rounded-2xl border-2 hover:bg-muted/50 text-sm py-4 px-6 bg-background/50 backdrop-blur-sm flex items-center justify-center"
                >
                  <Zap className="mr-2 h-5 w-5" />
                  Start Practicing
                </Button>
                <Button
                  variant="outline"
                  asChild
                  className="flex-1 min-w-[230px] rounded-2xl border-2 hover:bg-muted/50 text-sm py-4 px-6 bg-background/50 backdrop-blur-sm"
                >
                  <Link href="/videos">
                    <Play className="mr-2 h-5 w-5" />
                    Watch Demo
                  </Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>


  {/* Trending Questions - Marquee (restored) with enhanced cards */}
  <section className="py-20 section-dark">
        <div className="container mb-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h2 className="font-display font-bold text-3xl md:text-4xl mb-4">
              <span className="gradient-text">Trending Questions</span>
            </h2>
            <p className="text-muted-foreground text-lg">Practice what other candidates are attempting right now</p>
          </motion.div>
        </div>
        <Marquee className="py-6" pauseOnHover>
          {hotQuestions.map((q, index) => {
            const content = (q.description || q.prompt || '')
            // Mock companies that asked this question (placeholder logic)
            const companyPalette: Record<string, { bg: string; text: string; border: string }> = {
              Meta: { bg: 'bg-[#0866FF]/15', text: 'text-[#4D8DFF]', border: 'border-[#0866FF]/30' },
              Google: { bg: 'bg-[#4285F4]/15', text: 'text-[#5C9CFF]', border: 'border-[#4285F4]/30' },
              Amazon: { bg: 'bg-[#FF9900]/15', text: 'text-[#FFB547]', border: 'border-[#FF9900]/30' },
              YouTube: { bg: 'bg-[#FF0000]/15', text: 'text-[#FF5555]', border: 'border-[#FF0000]/30' },
              Netflix: { bg: 'bg-[#E50914]/15', text: 'text-[#FF5A63]', border: 'border-[#E50914]/30' },
              Microsoft: { bg: 'bg-[#2563EB]/15', text: 'text-[#5B8EEB]', border: 'border-[#2563EB]/30' },
              Airbnb: { bg: 'bg-[#FF385C]/15', text: 'text-[#FF6D85]', border: 'border-[#FF385C]/30' },
              Stripe: { bg: 'bg-[#635BFF]/15', text: 'text-[#8A84FF]', border: 'border-[#635BFF]/30' },
            }
            const companySets = [
              ['Meta','Amazon','Google','Stripe','Airbnb'], // will show +2
              ['YouTube','Netflix','Google','Amazon','Meta','Stripe'], // will show +3
              ['Microsoft','Stripe','Amazon'],
              ['Google','Airbnb','Meta'],
              ['Amazon','Stripe','Google'],
              ['Airbnb','Microsoft','Meta'],
              ['Stripe','Netflix','Amazon'],
              ['Google','Meta','YouTube']
            ]
            const companies = companySets[index % companySets.length]
            const maxCompanyTags = 3
            const visibleCompanies = companies.slice(0, maxCompanyTags)
            const hiddenCompanyCount = companies.length - visibleCompanies.length
            return (
              <motion.div
                key={q.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.05 }}
                className="w-96 shrink-0 mx-4"
              >
                <Card className="h-[380px] flex flex-col rounded-3xl border-2 hover:border-primary/40 transition-colors modern-card relative overflow-visible">
                  {q.isHot && index < 2 && (
                    <div className="absolute -top-3 -right-3">
                      <span className="inline-flex items-center gap-1 rounded-xl px-3 py-1 text-[10px] font-semibold tracking-wide bg-gradient-to-r from-pink-500 via-red-500 to-amber-500 text-white shadow-lg shadow-red-500/40 border border-white/20 rotate-3">
                        🔥 Hot
                      </span>
                    </div>
                  )}
                  <CardContent className="p-6 flex flex-col h-full">
                    {/* Difficulty & Type Tags on Top */}
                    <div className="flex items-center justify-between mb-3">
                      <span className="inline-flex items-center rounded-xl text-[11px] px-3 py-1 font-medium tracking-wide border border-primary/40 text-primary/90 bg-primary/10 backdrop-blur-sm">
                        {q.category}
                      </span>
                      <span className="inline-flex items-center rounded-xl text-[11px] px-3 py-1 font-medium tracking-wide border border-primary/45 text-primary bg-primary/15 shadow-[0_0_0_1px_hsl(var(--primary)/0.25)_inset]">
                        {q.difficulty}
                      </span>
                    </div>
                    {/* Title */}
                    <h3 className="font-display font-semibold text-base leading-snug mb-2 line-clamp-2 min-h-[3rem]">
                      {q.title}
                    </h3>
                    {/* Content */}
                    <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3 mb-5">
                      {content}
                    </p>
                    {/* Companies (collapsed to one line with +X) */}
                    <div className="flex items-center gap-2 mb-4 -mt-1 flex-nowrap overflow-hidden" title={companies.join(', ')}>
                      {visibleCompanies.map((c) => {
                        const colors = companyPalette[c]
                        return (
                          <span key={c} className={`inline-flex items-center rounded-lg px-2.5 py-1 text-[11px] font-medium border backdrop-blur-sm ${colors.bg} ${colors.text} ${colors.border}`}>
                            {c}
                          </span>
                        )
                      })}
                      {hiddenCompanyCount > 0 && (
                        <span
                          className="inline-flex items-center rounded-lg px-2.5 py-1 text-[11px] font-medium border border-primary/40 bg-primary/15 text-primary/90 backdrop-blur-sm select-none"
                          aria-label={`+${hiddenCompanyCount} more companies`}
                        >
                          +{hiddenCompanyCount}
                        </span>
                      )}
                    </div>
                    <div className="mt-auto space-y-4">
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" />{q.timeLimit}m</span>
                        <span className="flex items-center gap-1"><Users className="h-3.5 w-3.5" />{q.attempts}</span>
                        <span className="flex items-center gap-1"><Star className="h-3.5 w-3.5 fill-current text-yellow-500" />{q.avgScore.toFixed(1)}</span>
                      </div>
                      <Button
                        variant="outline"
                        className="w-full rounded-xl border-2 text-xs py-2.5 hover:bg-muted/60"
                        onClick={() => window.dispatchEvent(new CustomEvent('prodschool:auth-open', { detail: { mode: 'signup', source: 'trending-attempt', questionId: q.id } }))}
                      >
                        Attempt Question
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </Marquee>
      </section>

      {/* Community & Metrics Section - Enhanced */}
  <section className="py-20 border-y section-hazy">
        <div className="container">
          {/* Tagline + Logos */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="mb-14 text-center space-y-8"
          >
            <h3 className="text-base md:text-lg font-medium text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              <span className="text-foreground font-semibold">Join a fast-growing cohort</span> of aspiring and current PMs practicing with ProdSchool—improving faster and landing roles at top companies.
            </h3>
            <CompanyLogos className="opacity-80" />
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
            {[
              { value: "150+", label: "Practice Questions", icon: BookOpen },
              { value: "12.5K+", label: "Active Users", icon: Users },
              { value: "85%", label: "Avg Improvement", icon: TrendingUp },
              { value: "92%", label: "Success Rate", icon: Trophy },
            ].map((metric, index) => (
              <motion.div
                key={metric.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center group relative"
              >
                <div className="w-16 h-16 rounded-3xl flex items-center justify-center mx-auto mb-5 group-hover:scale-110 transition-transform duration-300 app-gradient shadow shadow-cyan-500/30">
                  <metric.icon className="h-8 w-8 text-white" />
                </div>
                <div className="font-display font-bold text-3xl md:text-4xl gradient-text mb-2 tracking-tight">{metric.value}</div>
                <div className="text-sm text-muted-foreground font-medium">{metric.label}</div>
                <div className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 border border-primary/20" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Feature Trio - Redesigned */}
  <section className="py-20 section-dark">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="font-display font-bold text-3xl md:text-4xl mb-4">
              Everything You Need to <span className="gradient-text">Succeed</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Our comprehensive platform provides all the tools and resources you need to ace your PM interviews.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Brain,
                title: "AI-Powered Feedback",
                description:
                  "Get instant, detailed feedback on your answers with personalized improvement suggestions.",
                color: "from-blue-500 to-cyan-500",
              },
              {
                icon: Target,
                title: "Real Interview Questions",
                description: "Practice with authentic questions from top tech companies like Google, Meta, and Amazon.",
                color: "from-purple-500 to-pink-500",
              },
              {
                icon: Users,
                title: "Peer Reviews",
                description: "Learn from the community with peer reviews and collaborative learning experiences.",
                color: "from-green-500 to-emerald-500",
              },
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
              >
                <Card className="h-full text-center p-8 modern-card rounded-3xl border-2 hover:border-primary/20 group">
                  <CardContent className="space-y-6">
                    <div
                      className={`w-20 h-20 bg-gradient-to-br ${feature.color} rounded-3xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300 shadow-lg`}
                    >
                      <feature.icon className="h-10 w-10 text-white" />
                    </div>
                    <h3 className="font-display font-bold text-xl">{feature.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Marquee - Enhanced */}
  <section className="py-16 section-hazy">
        <div className="container mb-8">
          <h2 className="font-display font-bold text-3xl md:text-4xl text-center">
            What Our <span className="gradient-text">Users Say</span>
          </h2>
        </div>
        <Marquee className="py-4" reverse pauseOnHover>
          {mockTestimonials.map((testimonial) => (
            <Card
              key={testimonial.id}
              className="w-96 shrink-0 mx-3 modern-card rounded-3xl border-2 hover:border-primary/20"
            >
              <CardContent className="p-6">
                <div className="flex items-center gap-1 mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current text-yellow-500" />
                  ))}
                </div>
                <p className="text-sm mb-6 leading-relaxed">"{testimonial.content}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-primary to-purple-500 rounded-2xl flex items-center justify-center text-white font-bold text-sm">
                    {testimonial.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  <div>
                    <div className="font-semibold text-sm">{testimonial.name}</div>
                    <div className="text-xs text-muted-foreground">{testimonial.role}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </Marquee>
      </section>

      {/* CTA Section - Redesigned */}
  <section className="py-20 section-dark">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <Card className="rounded-3xl border-2 border-primary/20 bg-gradient-to-br from-primary/5 via-background to-purple-500/5 p-12 modern-card">
              <CardContent className="space-y-8">
                <div className="space-y-4">
                  <h2 className="font-display font-bold text-3xl md:text-4xl">
                    Ready to Land Your <span className="gradient-text">Dream PM Role?</span>
                  </h2>
                  <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                    Join thousands of successful PMs who used ProdSchool to ace their interviews and land roles at top
                    companies.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    size="lg"
                    variant="outline"
                    asChild
                    className="rounded-2xl border-2 text-lg px-8 py-6 bg-background/50 backdrop-blur-sm hover:bg-muted/50"
                  >
                    <Link href="/questions" className="flex items-center">
                      <Zap className="mr-2 h-5 w-5" />
                      Start Free Practice
                    </Link>
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    asChild
                    className="rounded-2xl border-2 text-lg px-8 py-6 bg-background/50 backdrop-blur-sm"
                  >
                    <Link href="/pricing">View Pricing</Link>
                  </Button>
                </div>

                <div className="flex items-center justify-center gap-8 pt-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Free to start
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    No credit card required
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Cancel anytime
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
