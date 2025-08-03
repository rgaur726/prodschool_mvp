"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Brain,
  Users,
  TrendingUp,
  Star,
  Clock,
  CheckCircle,
  AlertCircle,
  ThumbsUp,
  MessageSquare,
  Award,
} from "lucide-react"
import { mockAttempts, mockPeerReviews, mockQuestions } from "@/lib/mock-data"

const aiInsights = {
  overallScore: 7.8,
  improvement: "+0.4 from last week",
  strengths: ["Strong framework application", "Clear problem identification", "User-centric thinking"],
  areasForImprovement: [
    "Technical feasibility consideration",
    "Quantitative analysis depth",
    "Competitive landscape awareness",
  ],
  recommendations: [
    "Practice more market sizing questions",
    "Focus on technical constraints in design questions",
    "Study competitive analysis frameworks",
  ],
}

export default function ReviewPage() {
  const [selectedTab, setSelectedTab] = useState("ai-feedback")

  return (
    <div className="container py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="mb-8"
      >
        <h1 className="font-display font-bold text-3xl mb-4">Review & Feedback</h1>
        <p className="text-muted-foreground">
          Analyze your performance and get insights to improve your PM interview skills.
        </p>
      </motion.div>

      {/* Overview Cards */}
      <div className="grid md:grid-cols-4 gap-4 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-primary mb-1">{aiInsights.overallScore}</div>
              <div className="text-xs text-muted-foreground">Overall Score</div>
              <div className="text-xs text-green-600 mt-1">{aiInsights.improvement}</div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-primary mb-1">{mockAttempts.length}</div>
              <div className="text-xs text-muted-foreground">Attempts</div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-primary mb-1">{mockPeerReviews.length}</div>
              <div className="text-xs text-muted-foreground">Peer Reviews</div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-primary mb-1">85%</div>
              <div className="text-xs text-muted-foreground">Improvement</div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Main Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="ai-feedback" className="flex items-center gap-2">
              <Brain className="h-4 w-4" />
              AI Feedback
            </TabsTrigger>
            <TabsTrigger value="peer-reviews" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Peer Reviews
            </TabsTrigger>
            <TabsTrigger value="progress" className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Progress
            </TabsTrigger>
          </TabsList>

          <TabsContent value="ai-feedback" className="space-y-6 mt-6">
            {/* AI Insights Overview */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="h-5 w-5" />
                  AI Performance Analysis
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-sm mb-3 flex items-center gap-2 text-green-600">
                      <CheckCircle className="h-4 w-4" />
                      Your Strengths
                    </h4>
                    <ul className="space-y-2">
                      {aiInsights.strengths.map((strength, index) => (
                        <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
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
                    <ul className="space-y-2">
                      {aiInsights.areasForImprovement.map((area, index) => (
                        <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                          <div className="w-1 h-1 bg-orange-500 rounded-full mt-2 shrink-0" />
                          {area}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recent AI Feedback */}
            <div className="space-y-4">
              <h3 className="font-display font-bold text-xl">Recent AI Feedback</h3>
              {mockAttempts.map((attempt, index) => {
                const question = mockQuestions.find((q) => q.id === attempt.questionId)
                return (
                  <Card key={attempt.id}>
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <CardTitle className="text-lg mb-2">{question?.title}</CardTitle>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Star className="h-4 w-4 fill-current text-yellow-500" />
                              Score: {attempt.score}/10
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="h-4 w-4" />
                              {attempt.timeSpent}m
                            </div>
                            <div>{attempt.date}</div>
                          </div>
                        </div>
                        <Badge variant="outline">AI Feedback</Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground leading-relaxed">{attempt.feedback}</p>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </TabsContent>

          <TabsContent value="peer-reviews" className="space-y-6 mt-6">
            <div className="space-y-4">
              <h3 className="font-display font-bold text-xl">Peer Reviews</h3>
              {mockPeerReviews.map((review) => {
                const question = mockQuestions.find((q) => q.id === review.questionId)
                return (
                  <Card key={review.id}>
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <CardTitle className="text-lg mb-2">{question?.title}</CardTitle>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Star className="h-4 w-4 fill-current text-yellow-500" />
                              Score: {review.score}/10
                            </div>
                            <div>by {review.reviewerName}</div>
                            <div>{review.date}</div>
                          </div>
                        </div>
                        <Badge variant="outline">Peer Review</Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground leading-relaxed mb-4">{review.feedback}</p>
                      <div className="flex items-center gap-4 text-sm">
                        <Button variant="ghost" size="sm" className="h-8 px-2">
                          <ThumbsUp className="h-3 w-3 mr-1" />
                          Helpful ({review.helpful})
                        </Button>
                        <Button variant="ghost" size="sm" className="h-8 px-2">
                          <MessageSquare className="h-3 w-3 mr-1" />
                          Reply
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </TabsContent>

          <TabsContent value="progress" className="space-y-6 mt-6">
            {/* Progress Charts */}
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Score Progression</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { category: "Product Design", score: 85, change: "+12%" },
                      { category: "Market Sizing", score: 72, change: "+8%" },
                      { category: "Analytics", score: 78, change: "+15%" },
                      { category: "Strategy", score: 88, change: "+6%" },
                    ].map((item) => (
                      <div key={item.category} className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>{item.category}</span>
                          <div className="flex items-center gap-2">
                            <span>{item.score}%</span>
                            <span className="text-green-600 text-xs">{item.change}</span>
                          </div>
                        </div>
                        <Progress value={item.score} className="h-2" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Achievements</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { title: "First Perfect Score", description: "Scored 10/10 on a question", earned: true },
                      { title: "Week Streak", description: "Practiced 7 days in a row", earned: true },
                      { title: "Peer Helper", description: "Gave 10 helpful reviews", earned: false },
                      { title: "Speed Demon", description: "Completed question under time limit", earned: true },
                    ].map((achievement, index) => (
                      <div key={index} className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            achievement.earned ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"
                          }`}
                        >
                          <Award className="h-5 w-5" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-sm">{achievement.title}</h4>
                          <p className="text-xs text-muted-foreground">{achievement.description}</p>
                        </div>
                        {achievement.earned && <CheckCircle className="h-4 w-4 text-green-500" />}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recommendations */}
            <Card>
              <CardHeader>
                <CardTitle>Personalized Recommendations</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {aiInsights.recommendations.map((recommendation, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 bg-muted/30 rounded-lg">
                      <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center mt-0.5">
                        <span className="text-xs font-medium text-primary">{index + 1}</span>
                      </div>
                      <div className="flex-1">
                        <p className="text-sm">{recommendation}</p>
                      </div>
                      <Button size="sm" variant="outline">
                        Start
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  )
}
