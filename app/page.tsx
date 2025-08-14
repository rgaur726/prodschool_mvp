"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Marquee } from "@/components/ui/marquee"
import { MainNavigation } from "@/components/ui/navigation"
import { DynamicBackground } from "@/components/ui/dynamic-background"
import {
  ArrowRight,
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

export default function HomePage() {
  const hotQuestions = mockQuestions.filter((q) => q.isHot)

  return (
    <div className="min-h-screen overflow-hidden">
      <DynamicBackground />
      <MainNavigation />

      {/* Hero Section - Completely Redesigned */}
      <section className="relative py-20 lg:py-32">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <Badge className="bg-gradient-to-r from-primary/20 to-purple-500/20 text-primary border-primary/30 rounded-2xl px-4 py-2">
                    <Sparkles className="h-4 w-4 mr-2" />
                    AI-Powered Learning
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
                      className="absolute -bottom-2 left-0 right-0 h-3 rounded-full overflow-hidden"
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

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  asChild
                  className="rounded-2xl app-gradient hover:brightness-110 shadow-xl hover:shadow-2xl transition-all duration-300 text-lg px-8 py-6"
                >
                  <Link href="/questions">
                    <Zap className="mr-2 h-5 w-5" />
                    Start Practicing Free
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  asChild
                  className="rounded-2xl border-2 hover:bg-muted/50 text-lg px-8 py-6 bg-background/50 backdrop-blur-sm"
                >
                  <Link href="/videos">
                    <Play className="mr-2 h-5 w-5" />
                    Watch Demo
                  </Link>
                </Button>
              </div>

              {/* Social Proof */}
              <div className="flex items-center gap-6 pt-4">
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

            {/* Right Visual */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative">
                {/* Main Card */}
                <div className="glass rounded-3xl p-8 shadow-2xl">
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <Badge className="bg-red-500/20 text-red-600 border-red-500/30 rounded-xl">🔥 Hot Question</Badge>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        45 min
                      </div>
                    </div>

                    <div>
                      <h3 className="font-display font-bold text-xl mb-2">Design a feature for Instagram Stories</h3>
                      <p className="text-muted-foreground text-sm">
                        Instagram wants to increase user engagement with Stories...
                      </p>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">1,247 attempts</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 text-yellow-500 fill-current" />
                        <span className="text-sm">7.2 avg</span>
                      </div>
                    </div>

                    <Button className="w-full rounded-2xl app-gradient text-primary-foreground">
                      Get Started
                    </Button>
                  </div>
                </div>

                {/* Floating Elements */}
                <motion.div
                  className="absolute -top-6 -right-6 glass rounded-2xl p-4 shadow-lg"
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
                >
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-green-500 rounded-xl flex items-center justify-center">
                      <CheckCircle className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <div className="font-semibold text-sm">AI Feedback</div>
                      <div className="text-xs text-muted-foreground">Score: 8.5/10</div>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  className="absolute -bottom-6 -left-6 glass rounded-2xl p-4 shadow-lg"
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, delay: 1 }}
                >
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-blue-500 rounded-xl flex items-center justify-center">
                      <TrendingUp className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <div className="font-semibold text-sm">Progress</div>
                      <div className="text-xs text-muted-foreground">+15% this week</div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Metrics Strip - Modernized */}
      <section className="py-16 border-y bg-gradient-to-r from-muted/30 via-background to-muted/30">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
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
                className="text-center group"
              >
                <div className="w-16 h-16 rounded-3xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 app-gradient shadow shadow-cyan-500/30">
                  <metric.icon className="h-8 w-8 text-white" />
                </div>
                <div className="font-display font-bold text-3xl md:text-4xl gradient-text mb-2">{metric.value}</div>
                <div className="text-sm text-muted-foreground">{metric.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Hot Questions Marquee - Enhanced */}
      <section className="py-16">
        <div className="container mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h2 className="font-display font-bold text-3xl md:text-4xl mb-4">
              🔥 <span className="gradient-text">Trending Questions</span>
            </h2>
            <p className="text-muted-foreground text-lg">Practice with the most popular questions this week</p>
          </motion.div>
        </div>
        <Marquee className="py-4" pauseOnHover>
          {hotQuestions.map((question) => (
            <Card
              key={question.id}
              className="w-80 shrink-0 mx-3 modern-card rounded-3xl border-2 hover:border-primary/20"
            >
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <Badge variant="destructive" className="text-xs rounded-xl">
                    🔥 Hot
                  </Badge>
                  <Badge variant="outline" className="text-xs rounded-xl">
                    {question.category}
                  </Badge>
                </div>
                <h3 className="font-semibold text-sm mb-3 line-clamp-2">{question.title}</h3>
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {question.timeLimit}m
                  </span>
                  <span className="flex items-center gap-1">
                    <Users className="h-3 w-3" />
                    {question.attempts}
                  </span>
                  <span className="flex items-center gap-1">
                    <Star className="h-3 w-3 fill-current text-yellow-500" />
                    {question.avgScore.toFixed(1)}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </Marquee>
      </section>

      {/* Feature Trio - Redesigned */}
      <section className="py-20 bg-gradient-to-b from-background to-muted/30">
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
      <section className="py-16 bg-muted/30">
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
      <section className="py-20">
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
                    asChild
                    className="rounded-2xl app-gradient hover:brightness-110 shadow-xl text-lg px-8 py-6"
                  >
                    <Link href="/questions">
                      <Zap className="mr-2 h-5 w-5" />
                      Start Free Practice
                      <ArrowRight className="ml-2 h-5 w-5" />
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
