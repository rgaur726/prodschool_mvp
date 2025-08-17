"use client"

import { motion } from "framer-motion"
import { DynamicBackground } from "@/components/ui/dynamic-background"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Check, Star, Zap, Crown, ArrowRight } from "lucide-react"
import Link from "next/link"

const plans = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    description: "Perfect for getting started",
    features: ["5 practice questions per month", "Basic AI feedback", "Community access", "Progress tracking"],
    limitations: ["Limited question access", "Basic feedback only", "No peer reviews"],
    cta: "Get Started",
    popular: false,
    icon: Star,
  },
  {
    name: "Pro",
    price: "$29",
    period: "per month",
    description: "For serious interview preparation",
    features: [
      "Unlimited practice questions",
      "Advanced AI feedback with detailed analysis",
      "Peer review system",
      "Video explanations",
      "Progress analytics",
      "Priority support",
      "Mock interview sessions",
    ],
    limitations: [],
    cta: "Start Free Trial",
    popular: true,
    icon: Zap,
  },
  {
    name: "Premium",
    price: "$99",
    period: "per month",
    description: "Complete interview mastery",
    features: [
      "Everything in Pro",
      "1-on-1 coaching sessions",
      "Custom question creation",
      "Company-specific prep",
      "Resume review",
      "Salary negotiation guidance",
      "Lifetime access to materials",
      "Direct mentor access",
    ],
    limitations: [],
    cta: "Contact Sales",
    popular: false,
    icon: Crown,
  },
]

const testimonials = [
  {
    name: "Sarah Chen",
    role: "Senior PM at Meta",
    content: "ProdSchool's AI feedback helped me identify exactly what I needed to improve. Worth every penny!",
    rating: 5,
  },
  {
    name: "David Rodriguez",
    role: "PM at Google",
    content: "The structured approach and peer reviews gave me the confidence I needed for my interviews.",
    rating: 5,
  },
  {
    name: "Emily Johnson",
    role: "PM at Stripe",
    content: "Best investment I made for my career transition into product management.",
    rating: 5,
  },
]

export default function PricingPage() {
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
          <h1 className="font-display font-bold text-3xl md:text-4xl mb-4">Choose Your Plan</h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Select the perfect plan for your PM interview preparation journey. All plans include our core features with
            varying levels of access and support.
          </p>

          <div className="flex items-center justify-center gap-4 mb-8">
            <Badge variant="outline" className="text-sm">
              ✨ 7-day free trial on all paid plans
            </Badge>
            <Badge variant="outline" className="text-sm">
              💰 30-day money-back guarantee
            </Badge>
          </div>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="relative"
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-primary text-primary-foreground">Most Popular</Badge>
                </div>
              )}
              <Card className={`h-full ${plan.popular ? "border-primary shadow-lg scale-105" : ""}`}>
                <CardHeader className="text-center pb-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <plan.icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-2xl font-display font-bold">{plan.name}</CardTitle>
                  <div className="text-3xl font-bold">
                    {plan.price}
                    <span className="text-sm font-normal text-muted-foreground">/{plan.period}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{plan.description}</p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-3">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm">
                        <Check className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                    {plan.limitations.map((limitation, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground">
                        <div className="w-4 h-4 mt-0.5 shrink-0" />
                        <span className="line-through">{limitation}</span>
                      </li>
                    ))}
                  </ul>
                  <Button className="w-full mt-6" variant={plan.popular ? "default" : "outline"} size="lg" asChild>
                    <Link href="/auth">
                      {plan.cta}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-16"
        >
          <h2 className="font-display font-bold text-2xl md:text-3xl text-center mb-8">Frequently Asked Questions</h2>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-2">Can I cancel anytime?</h3>
                <p className="text-sm text-muted-foreground">
                  Yes, you can cancel your subscription at any time. You'll continue to have access until the end of
                  your billing period.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-2">What's included in the free trial?</h3>
                <p className="text-sm text-muted-foreground">
                  The 7-day free trial gives you full access to all Pro features, including unlimited questions and
                  advanced AI feedback.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-2">How does the AI feedback work?</h3>
                <p className="text-sm text-muted-foreground">
                  Our AI analyzes your responses using industry frameworks and provides detailed feedback on structure,
                  content, and areas for improvement.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-2">Do you offer student discounts?</h3>
                <p className="text-sm text-muted-foreground">
                  Yes! Students get 50% off all paid plans. Contact support with your student ID for verification.
                </p>
              </CardContent>
            </Card>
          </div>
        </motion.div>

        {/* Testimonials */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mb-16"
        >
          <h2 className="font-display font-bold text-2xl md:text-3xl text-center mb-8">What Our Users Say</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="flex items-center gap-1 mb-3">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-current text-yellow-500" />
                    ))}
                  </div>
                  <p className="text-sm mb-4 leading-relaxed">"{testimonial.content}"</p>
                  <div>
                    <div className="font-semibold text-sm">{testimonial.name}</div>
                    <div className="text-xs text-muted-foreground">{testimonial.role}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center"
        >
          <Card className="bg-gradient-to-r from-primary/5 to-accent/5 border-primary/20">
            <CardContent className="p-8">
              <h3 className="font-display font-bold text-2xl mb-4">Ready to Ace Your PM Interviews?</h3>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                Join thousands of successful PMs who used ProdSchool to land their dream roles at top tech companies.
              </p>
              <Button size="lg" asChild>
                <Link href="/auth">
                  Start Your Free Trial
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
