"use client"

import { motion } from "framer-motion"
import { DynamicBackground } from "@/components/ui/dynamic-background"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Brain, TrendingUp, Target, CheckCircle, AlertCircle, ArrowRight, Star, Clock } from "lucide-react"
import Link from "next/link"

const feedbackExamples = [
  {
    id: 1,
    question: "Design a feature for Instagram Stories",
    score: 8.2,
    strengths: ["Strong user-centric approach", "Clear problem identification", "Well-structured framework"],
    improvements: [
      "Consider technical feasibility constraints",
      "Explore edge cases more thoroughly",
      "Include success metrics definition",
    ],
    detailedFeedback:
      "Your response demonstrated excellent product thinking with a clear focus on user needs. The framework you used (problem → solution → validation) is industry-standard and well-executed. However, consider diving deeper into technical implementation challenges and defining specific success metrics for your proposed feature.",
  },
  {
    id: 2,
    question: "Prioritize features for a food delivery app",
    score: 7.5,
    strengths: ["Good use of prioritization framework", "Considered multiple stakeholders", "Data-driven reasoning"],
    improvements: [
      "Quantify impact estimates",
      "Address resource constraints more explicitly",
      "Consider competitive landscape",
    ],
    detailedFeedback:
      "You applied the RICE framework effectively and showed good stakeholder awareness. To strengthen your answer, provide more specific impact estimates with numbers and consider how competitive dynamics might influence your prioritization decisions.",
  },
]

const improvementAreas = [
  {
    area: "Framework Application",
    score: 85,
    trend: "+12%",
    description: "Using structured approaches to problem-solving",
  },
  {
    area: "User Empathy",
    score: 92,
    trend: "+8%",
    description: "Understanding and addressing user needs",
  },
  {
    area: "Data Analysis",
    score: 78,
    trend: "+15%",
    description: "Interpreting metrics and making data-driven decisions",
  },
  {
    area: "Strategic Thinking",
    score: 88,
    trend: "+6%",
    description: "Long-term planning and business impact consideration",
  },
]

export default function AIFeedbackPage() {
  return (
    <div className="min-h-screen">
      <DynamicBackground />

      <div className="container py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <h1 className="font-display font-bold text-3xl md:text-4xl mb-4">AI-Powered Feedback</h1>
          <p className="text-xl text-muted-foreground mb-8">
            Get instant, detailed feedback on your PM interview responses with personalized improvement suggestions.
          </p>
        </motion.div>

        {/* Overview Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <Card>
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Brain className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-display font-bold text-lg mb-2">Instant Analysis</h3>
                <p className="text-sm text-muted-foreground">
                  Get detailed feedback within seconds of submitting your response
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card>
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Target className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-display font-bold text-lg mb-2">Personalized Insights</h3>
                <p className="text-sm text-muted-foreground">
                  Tailored feedback based on your specific strengths and weaknesses
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Card>
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-display font-bold text-lg mb-2">Track Progress</h3>
                <p className="text-sm text-muted-foreground">
                  Monitor your improvement over time with detailed analytics
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Improvement Areas */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-8"
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Your Improvement Areas
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {improvementAreas.map((area, index) => (
                  <div key={area.area} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-semibold text-sm">{area.area}</h4>
                        <p className="text-xs text-muted-foreground">{area.description}</p>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-lg">{area.score}%</div>
                        <div className="text-xs text-green-600">{area.trend}</div>
                      </div>
                    </div>
                    <Progress value={area.score} className="h-2" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Feedback Examples */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mb-8"
        >
          <h2 className="font-display font-bold text-2xl mb-6">Recent Feedback Examples</h2>
          <div className="space-y-6">
            {feedbackExamples.map((example, index) => (
              <Card key={example.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg mb-2">{example.question}</CardTitle>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 fill-current text-yellow-500" />
                          Score: {example.score}/10
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />2 days ago
                        </div>
                      </div>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      AI Feedback
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6 mb-4">
                    <div>
                      <h4 className="font-semibold text-sm mb-3 flex items-center gap-2 text-green-600">
                        <CheckCircle className="h-4 w-4" />
                        Strengths
                      </h4>
                      <ul className="space-y-1">
                        {example.strengths.map((strength, i) => (
                          <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                            <div className="w-1 h-1 bg-green-500 rounded-full mt-2 shrink-0" />
                            {strength}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm mb-3 flex items-center gap-2 text-orange-600">
                        <AlertCircle className="h-4 w-4" />
                        Areas for Improvement
                      </h4>
                      <ul className="space-y-1">
                        {example.improvements.map((improvement, i) => (
                          <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                            <div className="w-1 h-1 bg-orange-500 rounded-full mt-2 shrink-0" />
                            {improvement}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div className="border-t pt-4">
                    <h4 className="font-semibold text-sm mb-2">Detailed Feedback</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">{example.detailedFeedback}</p>
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
              <h3 className="font-display font-bold text-2xl mb-4">Ready to Get AI Feedback on Your Responses?</h3>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                Start practicing with our AI-powered feedback system and see immediate improvements in your PM interview
                performance.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" asChild>
                  <Link href="/questions">
                    Start Practicing
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/pricing">View Pricing</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
