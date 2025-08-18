"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { useEffect, useState, useLayoutEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase-client"
// removed dynamic alignment logic
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Marquee } from "@/components/ui/marquee"
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
  UserPlus,
} from "lucide-react"
import { mockTestimonials } from "@/lib/mock-data" // temporary fallback until testimonials table is populated
import { CompanyLogos } from "@/components/CompanyLogos"

export default function HomePage() {
  // Live questions fetched from Supabase (falls back to mock data if unavailable)
  interface Testimonial {
    id: string
    name: string
    role: string | null
    content: string | null
    avatar: string | null
    rating: number | null
    company: string | null
    previousRole?: string | null
    createdAt?: string | null
    isFeatured?: boolean | null
  }
  interface Question {
    id: number | string
    title: string
    content?: string | null
    description?: string | null
    category?: string | null
    question_type?: string | null // potential alt field name
    type?: string | null
    difficulty?: string | null
    time?: number | null
    attempts?: number | null
    rating?: number | null
    isHot?: boolean | null
    viewCount?: number | null
    companyTags?: string[] | null
  }
  const [questions, setQuestions] = useState<Question[]>([])
  const [loadingQuestions, setLoadingQuestions] = useState(false)
  const [questionsError, setQuestionsError] = useState<string | null>(null)
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [loadingTestimonials, setLoadingTestimonials] = useState(false)
  const [testimonialsError, setTestimonialsError] = useState<string | null>(null)
  const baseQuestions = (questions && questions.length > 0) ? questions.map(raw => {
    // Flexible key resolution (handles multiple possible column names)
    const get = (...keys: string[]) => {
      for (const k of keys) {
        if (k in (raw as any) && (raw as any)[k] !== null && (raw as any)[k] !== undefined) return (raw as any)[k]
      }
      return undefined
    }
    const description = get('description','content','body','details','prompt') || ''
    const category = get('category','question_type','type','questionType') || 'General'
    const difficulty = get('difficulty','level','diff') || 'Medium'
    const formatDifficulty = (d?: string) => (d || 'Medium').split(/[\s_-]+/).filter(Boolean).map(p => p.charAt(0).toUpperCase() + p.slice(1).toLowerCase()).join('')
    const timeLimit = get('time','time_limit','timeLimit','duration') || 45
    const avgScore = get('rating','avgScore','avg_score','score','average_score') || 7.0
    const isHot = !!get('isHot','is_hot','hot')
    const attempts = get('viewCount','views','attempts','attempt_count') || Math.floor(Math.random()*900)+100
    const companyTags = get('companyTags','company_tags','companytags') || null
    return {
      ...raw,
      description,
      category,
      difficulty: formatDifficulty(difficulty),
      timeLimit,
      avgScore: Number(avgScore),
      isHot,
      attempts: Number(attempts),
      companyTags: Array.isArray(companyTags) ? companyTags : (typeof companyTags === 'string' ? companyTags.split(',').map((s:string)=>s.trim()).filter(Boolean) : [])
    }
  }) : []
  const hotQuestions = baseQuestions.filter((q: any) => q.isHot)
  const trendingSource = hotQuestions.length ? hotQuestions : baseQuestions
  if (typeof window !== 'undefined') {
    // lightweight diagnostic (won't spam—runs each render, but cheap)
    // Comment out later if noisy
    console.debug('[trending diagnostics]', { total: baseQuestions.length, hot: hotQuestions.length })
  }
  const [leftOffset, setLeftOffset] = useState(0)
  const leftMetricsRef = useRef<HTMLDivElement | null>(null)
  const metricsGridRef = useRef<HTMLDivElement | null>(null)
  const [metricsOffset, setMetricsOffset] = useState(0)
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

  // Fetch latest questions from Supabase
  useEffect(() => {
    let cancelled = false
    async function fetchQuestions() {
      if (!supabase) return
      try {
        setLoadingQuestions(true)
        // Select all needed columns; adapt if RLS restrictions
        const { data, error } = await supabase
          .from('questions')
          .select('*')
          .limit(50)
        if (error) {
          console.error('[questions fetch error]', error)
          setQuestionsError(error.message)
          return
        }
        if (!cancelled && data) {
          console.log('[questions fetch success] rows:', data.length, data.slice(0,3))
          setQuestions(data as any)
        }
      } catch (err) {
        console.error('[questions fetch unexpected]', err)
        if (!cancelled) setQuestionsError((err as any)?.message || 'Unexpected error')
      } finally {
        if (!cancelled) setLoadingQuestions(false)
      }
    }
    fetchQuestions()
    return () => { cancelled = true }
  }, [])

  // Fetch testimonials
  useEffect(() => {
    let cancelled = false
    async function fetchTestimonials() {
      if (!supabase) return
      try {
        setLoadingTestimonials(true)
        const { data, error } = await supabase
          .from('testimonials')
          .select('*')
          .order('createdAt', { ascending: false })
          .limit(40)
        if (error) {
          console.warn('[testimonials fetch error]', error.message)
          setTestimonialsError(error.message)
          return
        }
        if (!cancelled && data) {
          setTestimonials(data as any)
        }
      } catch (e:any) {
        if (!cancelled) setTestimonialsError(e.message)
      } finally {
        if (!cancelled) setLoadingTestimonials(false)
      }
    }
    fetchTestimonials()
    return () => { cancelled = true }
  }, [])

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

  // Vertically align metrics grid so its center matches the vertical center of the left descriptive panel
  useLayoutEffect(() => {
    function positionMetrics() {
      if (!leftMetricsRef.current || !metricsGridRef.current) return
      if (window.innerWidth < 768) { // reset on small screens
        setMetricsOffset(0)
        return
      }
      const leftRect = leftMetricsRef.current.getBoundingClientRect()
      const rightRect = metricsGridRef.current.getBoundingClientRect()
      const leftCenter = leftRect.height / 2
      const rightCenter = rightRect.height / 2
      // We adjust top margin so centers line up
      const offset = (leftCenter - rightCenter)
      setMetricsOffset(offset)
    }
    positionMetrics()
    window.addEventListener('resize', positionMetrics)
    return () => window.removeEventListener('resize', positionMetrics)
  }, [])

  return (
    <div className="min-h-screen overflow-hidden">
      <DynamicBackground />

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
                  <span className="text-foreground">Master </span>
                  <span className="gradient-text">PM Interviews</span>
                  <br />
                  <span className="text-foreground">with Confidence</span>
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
                {(loadingQuestions && baseQuestions.length === 0 ? Array.from({length:3}) : baseQuestions.slice(0,3)).map((q: any, i: number) => {
                  const formatDifficulty = (d?: string) => (d || 'Medium').split(/[\s_-]+/).filter(Boolean).map(p => p.charAt(0).toUpperCase() + p.slice(1).toLowerCase()).join('')
                  // Skeleton placeholder when loading
                  if (!q) {
                    return (
                      <div key={`skeleton-${i}`} className={`rounded-3xl p-6 border border-primary/10 backdrop-blur-lg animate-pulse bg-background/40 ${i>0?'-mt-px':''}`}>
                        <div className="flex justify-between mb-4">
                          <div className="h-5 w-24 rounded-md bg-muted/40" />
                          <div className="h-5 w-14 rounded-md bg-muted/30" />
                        </div>
                        <div className="space-y-2 mb-4">
                          <div className="h-4 w-3/4 rounded-md bg-muted/40" />
                          <div className="h-4 w-2/3 rounded-md bg-muted/30" />
                        </div>
                        <div className="flex gap-4">
                          <div className="h-3 w-10 rounded bg-muted/30" />
                          <div className="h-3 w-10 rounded bg-muted/30" />
                          <div className="h-3 w-10 rounded bg-muted/30" />
                        </div>
                      </div>
                    )
                  }
                  const rotations = [2.8, -1.8, 1.6]
                  const lateral = [0, 3, -2]            // even subtler horizontal staggering
                  const verticalLift = [0, 0, 0]        // flattened
                  const overlapMargin = ['', '-mt-px', '-mt-px'] // near-zero overlap
                  const z = 40 - i * 5
                  return (
                    <motion.div
                      key={q.id}
                      className={`group glass rounded-3xl p-6 shadow-xl border border-primary/10 backdrop-blur-lg cursor-pointer select-none transition-colors ${overlapMargin[i]}`}
                      style={{ zIndex: z }}
                      initial={{ opacity: 0, y: 28, x: lateral[i] * 0.3, scale: 0.965, rotate: rotations[i] * 1.2 }}
                      animate={{ opacity: 1, y: verticalLift[i], x: lateral[i], scale: 1, rotate: rotations[i] }}
                      transition={{ duration: 0.55, delay: 0.08 * i, ease: 'easeOut' }}
                      whileHover={{ y: verticalLift[i] - 2, x: lateral[i] * 1.01, scale: 1.006, rotate: rotations[i] * 0.26, boxShadow: '0 6px 18px -10px hsl(var(--primary)/0.28)' }}
                      whileTap={{ scale: 0.99 }}
                      onClick={() => window.dispatchEvent(new CustomEvent('prodschool:auth-open', { detail: { mode: 'signup', source: 'hero-card' } }))}
                    >
                      <div className="space-y-4">
                        {/* Top meta: Category (left) + Difficulty (right) */}
                        <div className="flex items-center justify-between gap-3">
                          <Badge variant="outline" className="rounded-xl text-xs px-3 py-1 max-w-[70%] truncate">
                            {q.category}
                          </Badge>
                          <Badge
                            variant="secondary"
                            className="rounded-xl text-[10px] px-2 py-0.5 font-medium whitespace-nowrap"
                          >
                            {formatDifficulty(q.difficulty)}
                          </Badge>
                        </div>
                        <div>
                          <h3 className="font-display font-semibold text-base mb-1 line-clamp-2">{q.title}</h3>
                          <p className="text-xs text-muted-foreground line-clamp-2">{q.description?.slice(0,120) || 'Practice real interview scenario...'}</p>
                        </div>
                        {/* Bottom meta: Time, Attempts, Rating, Hot */}
                        <div className="flex items-center flex-wrap gap-4 text-[11px] text-muted-foreground group-hover:text-foreground transition-colors">
                          <span className="flex items-center gap-1">
                            <Clock className="h-3.5 w-3.5" /> {q.timeLimit}m
                          </span>
                          <span className="flex items-center gap-1">
                            <Users className="h-3.5 w-3.5" /> {q.attempts}
                          </span>
                          <span className="flex items-center gap-1">
                            <Star className="h-3 w-3 fill-current text-yellow-500" /> {q.avgScore?.toFixed?.(1) || '7.2'}
                          </span>
                          {q.isHot && (
                            <span className="inline-flex items-center gap-1 text-red-500 font-medium">
                              🔥 Hot
                            </span>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
                {!loadingQuestions && baseQuestions.length === 0 && (
                  <div className="mt-2 text-center text-xs text-muted-foreground space-y-2">
                    <div>No questions available yet.</div>
                    {questionsError && (
                      <div className="text-red-500/80">{questionsError}</div>
                    )}
                    <div className="text-[10px] opacity-60">Check: table name 'questions', RLS SELECT policy, column names.</div>
                  </div>
                )}
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
              <span className="text-foreground">Trending </span>
              <span className="gradient-text">Questions</span>
            </h2>
            <p className="text-muted-foreground text-lg">Practice what other candidates are attempting right now</p>
          </motion.div>
        </div>
        <Marquee className="py-6" pauseOnHover>
          {(loadingQuestions && trendingSource.length===0 ? Array.from({length:6}) : trendingSource.slice(0,8)).map((q: any, index: number) => {
            if (!q) {
              return (
                <div key={`trend-skel-${index}`} className="w-96 shrink-0 mx-4">
                  <Card className="h-[380px] flex flex-col rounded-3xl border-2 relative overflow-hidden">
                    <CardContent className="p-6 animate-pulse space-y-4">
                      <div className="flex justify-between mb-2">
                        <div className="h-5 w-24 bg-muted/40 rounded" />
                        <div className="h-5 w-16 bg-muted/30 rounded" />
                      </div>
                      <div className="h-4 w-3/4 bg-muted/40 rounded" />
                      <div className="h-4 w-2/3 bg-muted/30 rounded" />
                      <div className="h-4 w-5/6 bg-muted/20 rounded" />
                      <div className="mt-8 space-y-2">
                        <div className="h-3 w-full bg-muted/20 rounded" />
                        <div className="h-10 w-full bg-muted/30 rounded-xl" />
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )
            }
            const content = (q.description || q.content || '')
            const formatDifficulty = (d?: string) => (d||'Medium').split(/[\s_-]+/).filter(Boolean).map(p=>p.charAt(0).toUpperCase()+p.slice(1).toLowerCase()).join('')
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
            const companies: string[] = Array.isArray(q.companyTags) ? q.companyTags : []
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
                    {/* Category & Difficulty (match hero badge styling) */}
                    <div className="flex items-center justify-between mb-3 gap-3">
                      <Badge variant="outline" className="rounded-xl text-[11px] px-3 py-1 truncate max-w-[70%]">
                        {q.category}
                      </Badge>
                      <Badge variant="secondary" className="rounded-xl text-[10px] px-2 py-0.5 font-medium whitespace-nowrap">
                        {formatDifficulty(q.difficulty)}
                      </Badge>
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
                    <div className="flex items-center gap-1.5 mb-4 -mt-1 flex-nowrap overflow-hidden" title={companies.join(', ')}>
                      {visibleCompanies.map((c, ci) => {
                        const key = (c || '').trim()
                        const label = key
                          .split(/[\s_-]+/)
                          .filter(Boolean)
                          .map(p => p.charAt(0).toUpperCase() + p.slice(1).toLowerCase())
                          .join(' ')
                        return (
                          <Badge
                            key={key+ci}
                            variant="secondary"
                            className="text-[10px] font-medium px-2 py-0.5 rounded-md whitespace-nowrap"
                          >
                            {label}
                          </Badge>
                        )
                      })}
                      {hiddenCompanyCount > 0 && (
                        <Badge
                          variant="outline"
                          className="text-[10px] font-medium px-2 py-0.5 rounded-md"
                          aria-label={`+${hiddenCompanyCount} more companies`}
                        >
                          +{hiddenCompanyCount}
                        </Badge>
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
            className="mb-14 space-y-12"
          >
            {/* Restored heading + subline */}
            <div className="text-center space-y-6 max-w-3xl mx-auto">
              <h2 className="font-display font-bold text-3xl md:text-4xl">
                Community <span className="gradient-text">Momentum</span>
              </h2>
              <h3 className="text-base md:text-lg font-medium text-muted-foreground leading-relaxed">
                <span className="text-foreground font-semibold">Join a fast-growing PM cohort</span> leveling up faster with ProdSchool.
              </h3>
            </div>
            {/* Two-column contextual block + logos */}
            <div className="grid md:grid-cols-5 gap-12 items-center">
              <div className="md:col-span-2 space-y-5 text-center md:text-left max-w-md mx-auto md:mx-0">
                <h4 className="font-display font-semibold text-lg md:text-xl tracking-tight">
                  From Practice Sessions to <span className="gradient-text">Offer Letters</span>
                </h4>
                <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                  Community members landed roles at Google, Amazon, Microsoft, Meta, Stripe & more after honing structured thinking and product storytelling here.
                </p>
                <ul className="text-xs md:text-sm text-muted-foreground/80 space-y-3">
                  <li className="flex items-start gap-3">
                    <span className="w-8 h-8 rounded-xl app-gradient/80 shadow shadow-cyan-500/25 flex items-center justify-center shrink-0">
                      <TrendingUp className="h-4 w-4 text-white" />
                    </span>
                    <span className="leading-relaxed"><span className="text-foreground/90 font-medium">Higher callback rates</span> after structured answer refinement</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-8 h-8 rounded-xl app-gradient/80 shadow shadow-cyan-500/25 flex items-center justify-center shrink-0">
                      <BookOpen className="h-4 w-4 text-white" />
                    </span>
                    <span className="leading-relaxed"><span className="text-foreground/90 font-medium">Clearer product narratives</span> from repeated framework reps</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-8 h-8 rounded-xl app-gradient/80 shadow shadow-cyan-500/25 flex items-center justify-center shrink-0">
                      <Zap className="h-4 w-4 text-white" />
                    </span>
                    <span className="leading-relaxed"><span className="text-foreground/90 font-medium">Faster improvement cycles</span> via instant AI critique + peer review</span>
                  </li>
                </ul>
              </div>
              <div className="md:col-span-3 flex justify-center md:justify-end">
                <CompanyLogos className="opacity-95 max-w-4xl" />
              </div>
            </div>
          </motion.div>

          <div className="mt-16 md:mt-28" />

          <div className="grid md:grid-cols-5 gap-12 items-start">
            {/* Metrics grid now on left */}
            <div className="md:col-span-3" style={{ marginTop: metricsOffset }} ref={metricsGridRef}>
              <div className="grid grid-cols-2 gap-10 w-full">
                {[
                  { value: "150+", label: "Practice Questions", icon: BookOpen },
                  { value: "12.5K+", label: "Active Users", icon: Users },
                  { value: "85%", label: "Avg Improvement", icon: TrendingUp },
                  { value: "92%", label: "Success Rate", icon: Trophy },
                ].map((metric, index) => (
                  <motion.div
                    key={metric.label}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.55, delay: index * 0.1 }}
                    className="flex items-center gap-5 md:gap-6 group relative"
                  >
                    <div className="w-14 h-14 shrink-0 rounded-2xl flex items-center justify-center group-hover:scale-105 transition-transform duration-300 app-gradient/85 shadow shadow-cyan-500/25">
                      <metric.icon className="h-7 w-7 text-white/95" />
                    </div>
                    <div className="space-y-1">
                      <div className="font-display font-bold text-2xl md:text-3xl gradient-text tracking-tight leading-none">{metric.value}</div>
                      <div className="text-[12px] md:text-sm text-muted-foreground font-medium leading-tight">{metric.label}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Descriptive panel now on right */}
            <motion.div
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.65 }}
              className="md:col-span-2 space-y-6 text-center md:text-left max-w-md mx-auto md:mx-0"
              ref={leftMetricsRef}
            >
              <h4 className="font-display font-semibold text-xl md:text-2xl tracking-tight">
                Outcomes That <span className="gradient-text">Recruiters Notice</span>
              </h4>
              <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                Focused practice compounds fast. A few structured reps each week builds sharper product sense, clearer frameworks, and confident delivery when it counts.
              </p>
              <ul className="text-[13px] md:text-sm space-y-2 text-muted-foreground/90">
                <li className="flex items-start gap-2"><CheckCircle className="h-4 w-4 text-green-500 mt-0.5" /> Noticeable clarity gains after the first 10 questions</li>
                <li className="flex items-start gap-2"><CheckCircle className="h-4 w-4 text-green-500 mt-0.5" /> AI feedback shortens iteration cycles dramatically</li>
                <li className="flex items-start gap-2"><CheckCircle className="h-4 w-4 text-green-500 mt-0.5" /> Community benchmarks anchor realistic progress</li>
              </ul>
            </motion.div>
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

      {/* Testimonials Marquees - PM Focused */}
      <section className="py-16 section-hazy">
        <div className="container mb-10">
          <h2 className="font-display font-bold text-3xl md:text-4xl text-center">
            What Fellow <span className="gradient-text">PMs Are Saying</span>
          </h2>
          <p className="text-center text-sm md:text-base text-muted-foreground mt-4 max-w-2xl mx-auto">
            Real PMs sharing quick wins from their interview prep.
          </p>
        </div>
        {/* Row 1 (left to right) */}
        <Marquee className="py-4" pauseOnHover speed="slow">
          {(loadingTestimonials && testimonials.length===0 ? Array.from({length:8}) : (testimonials.length? testimonials : mockTestimonials)).map((t:any, idx:number) => {
            if (!t) {
              return (
                <Card key={`tm-skel-1-${idx}`} className="w-96 shrink-0 mx-3 modern-card rounded-3xl border-2">
                  <CardContent className="p-6 flex flex-col h-full animate-pulse space-y-4">
                    <div className="flex items-start gap-3 mb-2">
                      <div className="w-10 h-10 bg-muted/40 rounded-2xl" />
                      <div className="space-y-2 flex-1">
                        <div className="h-3 w-32 bg-muted/30 rounded" />
                        <div className="h-3 w-24 bg-muted/20 rounded" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="h-3 w-full bg-muted/30 rounded" />
                      <div className="h-3 w-5/6 bg-muted/20 rounded" />
                      <div className="h-3 w-2/3 bg-muted/20 rounded" />
                      <div className="h-3 w-1/2 bg-muted/10 rounded" />
                    </div>
                  </CardContent>
                </Card>
              )
            }
            const avatar = t.avatar || '/placeholder-user.jpg'
            const initials = t.name?.split(' ').map((n:string)=>n[0]).join('').slice(0,2) || 'U'
            return (
              <Card key={`row1-${t.id}`} className="w-96 shrink-0 mx-3 modern-card rounded-3xl border-2 hover:border-primary/20">
                <CardContent className="p-6 flex flex-col h-full">
                  <div className="flex items-start gap-3 mb-4">
                    {avatar ? (
                      <img src={avatar} alt={t.name||'User'} className="w-10 h-10 rounded-2xl object-cover ring-2 ring-primary/20" />
                    ) : (
                      <div className="w-10 h-10 bg-gradient-to-br from-primary to-purple-500 rounded-2xl flex items-center justify-center text-white font-bold text-sm">
                        {initials}
                      </div>
                    )}
                    <div className="space-y-0.5">
                      <div className="font-semibold text-sm tracking-tight">{t.name}</div>
                      <div className="text-xs text-muted-foreground font-medium">{t.role || t.company || 'PM Candidate'}</div>
                    </div>
                  </div>
                  <p className="text-sm leading-relaxed text-muted-foreground/90 line-clamp-4">“{t.content}”</p>
                </CardContent>
              </Card>
            )
          })}
        </Marquee>
        {/* Row 2 (right to left) */}
        <Marquee className="py-6 mt-4" reverse pauseOnHover speed="slow">
          {(loadingTestimonials && testimonials.length===0 ? Array.from({length:8}) : (testimonials.length? [...testimonials].reverse() : mockTestimonials.slice().reverse())).map((t:any, idx:number) => {
            if (!t) {
              return (
                <Card key={`tm-skel-2-${idx}`} className="w-96 shrink-0 mx-3 modern-card rounded-3xl border-2">
                  <CardContent className="p-6 flex flex-col h-full animate-pulse space-y-4">
                    <div className="flex items-start gap-3 mb-2">
                      <div className="w-10 h-10 bg-muted/40 rounded-2xl" />
                      <div className="space-y-2 flex-1">
                        <div className="h-3 w-32 bg-muted/30 rounded" />
                        <div className="h-3 w-24 bg-muted/20 rounded" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="h-3 w-full bg-muted/30 rounded" />
                      <div className="h-3 w-5/6 bg-muted/20 rounded" />
                      <div className="h-3 w-2/3 bg-muted/20 rounded" />
                      <div className="h-3 w-1/2 bg-muted/10 rounded" />
                    </div>
                  </CardContent>
                </Card>
              )
            }
            const avatar = t.avatar || '/placeholder-user.jpg'
            const initials = t.name?.split(' ').map((n:string)=>n[0]).join('').slice(0,2) || 'U'
            return (
              <Card key={`row2-${t.id}`} className="w-96 shrink-0 mx-3 modern-card rounded-3xl border-2 hover:border-primary/20">
                <CardContent className="p-6 flex flex-col h-full">
                  <div className="flex items-start gap-3 mb-4">
                    {avatar ? (
                      <img src={avatar} alt={t.name||'User'} className="w-10 h-10 rounded-2xl object-cover ring-2 ring-primary/20" />
                    ) : (
                      <div className="w-10 h-10 bg-gradient-to-br from-primary to-purple-500 rounded-2xl flex items-center justify-center text-white font-bold text-sm">
                        {initials}
                      </div>
                    )}
                    <div className="space-y-0.5">
                      <div className="font-semibold text-sm tracking-tight">{t.name}</div>
                      <div className="text-xs text-muted-foreground font-medium">{t.role || t.company || 'PM Candidate'}</div>
                    </div>
                  </div>
                  <p className="text-sm leading-relaxed text-muted-foreground/90 line-clamp-4">“{t.content}”</p>
                </CardContent>
              </Card>
            )
          })}
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

                <div className="flex justify-center">
                  <Button
                    size="lg"
                    variant="outline"
                    className="rounded-2xl border-2 text-lg px-10 py-6 bg-background/60 backdrop-blur-sm hover:bg-muted/60 flex items-center gap-3 shadow-md shadow-primary/10"
                    onClick={() => {
                      window.dispatchEvent(new CustomEvent('prodschool:auth-open', { detail: { mode: 'signup' } }))
                    }}
                  >
                    <span className="relative inline-flex h-6 w-6 items-center justify-center rounded-xl app-gradient shadow">
                      <UserPlus className="h-4 w-4 text-primary-foreground" />
                      <span className="sr-only">Create Account</span>
                    </span>
                    Create Your Free Account
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
