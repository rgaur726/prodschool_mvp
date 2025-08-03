"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TrendingUp, Target, Clock, Award, Play, BookOpen, Users, Calendar, ArrowRight, Star, Zap } from "lucide-react"
import Link from "next/link"

const stats = {
  questionsCompleted: 24,
  averageScore: 7.8,
  timeSpent: 18.5, // hours
  streak: 7, // days
  rank: 156,
  totalUsers: 12500,
}

const recentActivity = [
  {
    type: "question",
    title: "Design a feature for Instagram Stories",
    score: 8.2,
    date: "2 hours ago",
  },
  {
    type: "video",
    title: "Market Sizing: The Complete Guide",
    progress: 75,
    date: "1 day ago",
  },
  {
    type: "review",
    title: "Received peer review",
    rating: 4.5,
    date: "2 days ago",
  },
]

const upcomingDeadlines = [
  {
    title: "Weekly Challenge: Product Strategy",
    dueDate: "Tomorrow",
    priority: "high",
  },
  {
    title: "Peer Review Due",
    dueDate: "In 3 days",
    priority: "medium",
  },
]

export default function DashboardPage() {
  return (
    <div className="container py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="mb-8"
      >
        <h1 className="font-display font-bold text-3xl mb-2">Welcome back! 👋</h1>
        <p className="text-muted-foreground">Here's your progress and what's coming up next.</p>
      </motion.div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-primary mb-1">{stats.questionsCompleted}</div>
              <div className="text-xs text-muted-foreground">Questions</div>
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
              <div className="text-2xl font-bold text-primary mb-1">{stats.averageScore}</div>
              <div className="text-xs text-muted-foreground">Avg Score</div>
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
              <div className="text-2xl font-bold text-primary mb-1">{stats.timeSpent}h</div>
              <div className="text-xs text-muted-foreground">Time Spent</div>
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
              <div className="text-2xl font-bold text-primary mb-1">{stats.streak}</div>
              <div className="text-xs text-muted-foreground">Day Streak</div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Progress Overview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Your Progress
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="overview" className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="skills">Skills</TabsTrigger>
                    <TabsTrigger value="goals">Goals</TabsTrigger>
                  </TabsList>

                  <TabsContent value="overview" className="space-y-4 mt-4">
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span>Overall Progress</span>
                        <span>68%</span>
                      </div>
                      <Progress value={68} className="h-2" />
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-center">
                      <div>
                        <div className="text-lg font-bold">#{stats.rank}</div>
                        <div className="text-xs text-muted-foreground">Your Rank</div>
                      </div>
                      <div>
                        <div className="text-lg font-bold">Top 2%</div>
                        <div className="text-xs text-muted-foreground">Percentile</div>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="skills" className="space-y-4 mt-4">
                    <div className="space-y-4">
                      {[
                        { skill: "Product Design", level: 85 },
                        { skill: "Market Sizing", level: 72 },
                        { skill: "Analytics", level: 68 },
                        { skill: "Strategy", level: 79 },
                      ].map((item) => (
                        <div key={item.skill} className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>{item.skill}</span>
                            <span>{item.level}%</span>
                          </div>
                          <Progress value={item.level} className="h-2" />
                        </div>
                      ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="goals" className="space-y-4 mt-4">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <Target className="h-4 w-4 text-primary" />
                          <span className="text-sm">Complete 30 questions this month</span>
                        </div>
                        <Badge variant="outline">24/30</Badge>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <Award className="h-4 w-4 text-primary" />
                          <span className="text-sm">Achieve 8.0+ average score</span>
                        </div>
                        <Badge variant="outline">7.8/8.0</Badge>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </motion.div>

          {/* Recent Activity */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-center gap-4 p-3 bg-muted/30 rounded-lg">
                      <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                        {activity.type === "question" && <Play className="h-4 w-4 text-primary" />}
                        {activity.type === "video" && <BookOpen className="h-4 w-4 text-primary" />}
                        {activity.type === "review" && <Users className="h-4 w-4 text-primary" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{activity.title}</p>
                        <p className="text-xs text-muted-foreground">{activity.date}</p>
                      </div>
                      <div className="text-right">
                        {"score" in activity && <div className="text-sm font-medium">{activity.score}/10</div>}
                        {"progress" in activity && <div className="text-sm font-medium">{activity.progress}%</div>}
                        {"rating" in activity && (
                          <div className="flex items-center gap-1 text-sm">
                            <Star className="h-3 w-3 fill-current text-yellow-500" />
                            {activity.rating}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full justify-start" asChild>
                  <Link href="/app/daily-drill">
                    <Zap className="h-4 w-4 mr-2" />
                    Daily Drill
                  </Link>
                </Button>
                <Button variant="outline" className="w-full justify-start bg-transparent" asChild>
                  <Link href="/questions">
                    <Play className="h-4 w-4 mr-2" />
                    Practice Questions
                  </Link>
                </Button>
                <Button variant="outline" className="w-full justify-start bg-transparent" asChild>
                  <Link href="/videos">
                    <BookOpen className="h-4 w-4 mr-2" />
                    Watch Videos
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          {/* Upcoming Deadlines */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Calendar className="h-5 w-5" />
                  Upcoming
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {upcomingDeadlines.map((deadline, index) => (
                  <div key={index} className="p-3 bg-muted/30 rounded-lg">
                    <div className="flex items-start justify-between mb-1">
                      <p className="text-sm font-medium leading-tight">{deadline.title}</p>
                      <Badge variant={deadline.priority === "high" ? "destructive" : "secondary"} className="text-xs">
                        {deadline.priority}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">{deadline.dueDate}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>

          {/* Recommended */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Recommended for You</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="p-3 bg-muted/30 rounded-lg">
                  <h4 className="text-sm font-medium mb-1">Product Strategy Deep Dive</h4>
                  <p className="text-xs text-muted-foreground mb-2">Based on your recent performance</p>
                  <Button size="sm" variant="outline" className="w-full bg-transparent">
                    Start Learning
                    <ArrowRight className="h-3 w-3 ml-1" />
                  </Button>
                </div>
                <div className="p-3 bg-muted/30 rounded-lg">
                  <h4 className="text-sm font-medium mb-1">Market Sizing Practice</h4>
                  <p className="text-xs text-muted-foreground mb-2">Improve your estimation skills</p>
                  <Button size="sm" variant="outline" className="w-full bg-transparent">
                    Practice Now
                    <ArrowRight className="h-3 w-3 ml-1" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
