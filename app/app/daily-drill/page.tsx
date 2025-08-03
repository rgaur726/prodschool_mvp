"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Timer } from "@/components/ui/timer"
import { QuestionCard } from "@/components/ui/question-card"
import { Calendar, Trophy, Target, Clock, ArrowRight, Flame } from "lucide-react"
import { mockQuestions } from "@/lib/mock-data"

const dailyChallenge = {
  date: new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  }),
  question: mockQuestions[0],
  timeLimit: 30 * 60, // 30 minutes in seconds
  participants: 1247,
  completed: false,
}

const streakData = {
  current: 7,
  best: 12,
  thisWeek: [true, true, false, true, true, true, true],
}

const weeklyProgress = {
  completed: 5,
  total: 7,
  points: 850,
}

export default function DailyDrillPage() {
  const [hasStarted, setHasStarted] = useState(false)
  const [isCompleted, setIsCompleted] = useState(dailyChallenge.completed)

  const handleStart = () => {
    setHasStarted(true)
  }

  const handleTimeUp = () => {
    setIsCompleted(true)
  }

  return (
    <div className="container py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="mb-8"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
            <Flame className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h1 className="font-display font-bold text-3xl">Daily Drill</h1>
            <p className="text-muted-foreground">{dailyChallenge.date}</p>
          </div>
        </div>
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2">
          {!hasStarted ? (
            /* Challenge Overview */
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <Calendar className="h-5 w-5" />
                      Today's Challenge
                    </CardTitle>
                    <Badge variant="outline" className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {dailyChallenge.timeLimit / 60} minutes
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="text-center p-6 bg-muted/30 rounded-lg">
                    <Trophy className="h-12 w-12 text-primary mx-auto mb-4" />
                    <h3 className="font-display font-bold text-xl mb-2">Ready for Today's Challenge?</h3>
                    <p className="text-muted-foreground mb-4">
                      Join {dailyChallenge.participants.toLocaleString()} other participants in today's drill
                    </p>
                    <Button size="lg" onClick={handleStart}>
                      Start Challenge
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>

                  <QuestionCard question={dailyChallenge.question} isExpanded={true} showPrompt={false} />
                </CardContent>
              </Card>
            </motion.div>
          ) : (
            /* Active Challenge */
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Challenge in Progress</CardTitle>
                    <Timer initialTime={dailyChallenge.timeLimit} onTimeUp={handleTimeUp} />
                  </div>
                </CardHeader>
                <CardContent>
                  <QuestionCard
                    question={dailyChallenge.question}
                    isExpanded={true}
                    showPrompt={true}
                    onTogglePrompt={() => {}}
                  />
                </CardContent>
              </Card>

              {/* Response Area */}
              <Card>
                <CardHeader>
                  <CardTitle>Your Response</CardTitle>
                </CardHeader>
                <CardContent>
                  <textarea
                    className="w-full h-64 p-4 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Type your response here..."
                    disabled={isCompleted}
                  />
                  <div className="flex justify-between items-center mt-4">
                    <p className="text-sm text-muted-foreground">
                      {isCompleted ? "Time's up!" : "Keep going, you've got this!"}
                    </p>
                    <Button disabled={isCompleted}>{isCompleted ? "Completed" : "Submit Response"}</Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Streak Tracker */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Flame className="h-5 w-5" />
                  Streak Tracker
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center mb-4">
                  <div className="text-3xl font-bold text-primary mb-1">{streakData.current}</div>
                  <div className="text-sm text-muted-foreground">Current Streak</div>
                  <div className="text-xs text-muted-foreground mt-1">Best: {streakData.best} days</div>
                </div>

                <div className="space-y-2">
                  <div className="text-sm font-medium">This Week</div>
                  <div className="flex gap-1">
                    {["M", "T", "W", "T", "F", "S", "S"].map((day, index) => (
                      <div
                        key={day}
                        className={`flex-1 aspect-square rounded text-xs flex items-center justify-center font-medium ${
                          streakData.thisWeek[index]
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted text-muted-foreground"
                        }`}
                      >
                        {day}
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Weekly Progress */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Target className="h-5 w-5" />
                  Weekly Progress
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Challenges Completed</span>
                    <span className="font-medium">
                      {weeklyProgress.completed}/{weeklyProgress.total}
                    </span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div
                      className="bg-primary h-2 rounded-full transition-all duration-300"
                      style={{
                        width: `${(weeklyProgress.completed / weeklyProgress.total) * 100}%`,
                      }}
                    />
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">{weeklyProgress.points}</div>
                    <div className="text-sm text-muted-foreground">Points This Week</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Leaderboard Preview */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Trophy className="h-5 w-5" />
                  Today's Leaderboard
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { rank: 1, name: "Sarah M.", score: 9.2, avatar: "SM" },
                    { rank: 2, name: "David L.", score: 8.8, avatar: "DL" },
                    { rank: 3, name: "Emily R.", score: 8.5, avatar: "ER" },
                    { rank: "...", name: "You", score: "TBD", avatar: "Y" },
                  ].map((user, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="w-6 text-sm font-medium text-center">{user.rank}</div>
                      <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-xs font-medium">
                        {user.avatar}
                      </div>
                      <div className="flex-1 text-sm">{user.name}</div>
                      <div className="text-sm font-medium">{user.score}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
