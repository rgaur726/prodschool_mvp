"use client"

import type React from "react"

import { motion } from "framer-motion"
import { DynamicBackground } from "@/components/ui/dynamic-background"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Rocket, Bell, Calendar, Users, Zap, Target } from "lucide-react"
import { useState } from "react"

const upcomingFeatures = [
  {
    title: "Live Mock Interviews",
    description: "Practice with real PMs from top companies in live sessions",
    icon: Users,
    eta: "Q2 2024",
  },
  {
    title: "Company-Specific Prep",
    description: "Tailored questions and insights for specific companies",
    icon: Target,
    eta: "Q2 2024",
  },
  {
    title: "Advanced Analytics",
    description: "Deep insights into your performance patterns and trends",
    icon: Zap,
    eta: "Q3 2024",
  },
]

export default function ComingSoonPage() {
  const [email, setEmail] = useState("")
  const [isSubscribed, setIsSubscribed] = useState(false)

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    // Mock subscription
    setIsSubscribed(true)
    setEmail("")
  }

  return (
    <div className="min-h-screen">
      <DynamicBackground />

      <div className="container py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <Rocket className="h-10 w-10 text-primary" />
          </div>
          <h1 className="font-display font-bold text-3xl md:text-4xl mb-4">Exciting Features Coming Soon</h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            We're working hard to bring you even more powerful tools for PM interview preparation. Stay tuned for these
            upcoming features!
          </p>
        </motion.div>

        {/* Upcoming Features */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {upcomingFeatures.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="h-full text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="h-8 w-8 text-primary" />
                  </div>
                  <Badge variant="outline" className="mb-4">
                    <Calendar className="h-3 w-3 mr-1" />
                    {feature.eta}
                  </Badge>
                  <h3 className="font-display font-bold text-xl mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Newsletter Signup */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="max-w-2xl mx-auto"
        >
          <Card className="bg-gradient-to-r from-primary/5 to-accent/5 border-primary/20">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Bell className="h-8 w-8 text-primary" />
              </div>
              <h2 className="font-display font-bold text-2xl mb-4">Be the First to Know</h2>
              <p className="text-muted-foreground mb-6">
                Get notified when these exciting features launch and be among the first to try them out.
              </p>

              {!isSubscribed ? (
                <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="flex-1"
                  />
                  <Button type="submit">Notify Me</Button>
                </form>
              ) : (
                <div className="text-center">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 0.5 }}>
                      ✓
                    </motion.div>
                  </div>
                  <p className="text-green-600 font-semibold">Thanks for subscribing! We'll keep you updated.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Current Features CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-center mt-16"
        >
          <h3 className="font-display font-bold text-xl mb-4">Don't Want to Wait?</h3>
          <p className="text-muted-foreground mb-6">
            Start practicing with our current features and get ahead of the competition today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <a href="/questions">Start Practicing Now</a>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <a href="/pricing">View Pricing</a>
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
