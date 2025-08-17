"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { useParams, useRouter } from "next/navigation"
import { DynamicBackground } from "@/components/ui/dynamic-background"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ArrowLeft, Clock, Users, Star, ThumbsUp, ThumbsDown, Share2 } from "lucide-react"
import { mockQuestions } from "@/lib/mock-data"

// Mock community answers data
const mockAnswers = [
  {
    id: 1,
    author: {
      name: "Sarah Chen",
      title: "Senior PM at Meta",
      avatar: "/placeholder-user.jpg",
      experience: "5 years"
    },
    answer: `For Instagram Stories engagement, I'd focus on three key areas:

**1. Content Creation Assistance**
- AI-powered template suggestions based on user interests
- Quick-edit tools with trending effects and music
- Voice-to-text for easy story creation while multitasking

**2. Community Features**
- Story collaboration with friends (co-creation)
- Story challenges and themes (weekly prompts)
- Better story discovery through improved hashtag functionality

**3. Personalization**
- Smart timing suggestions for optimal posting
- Audience-specific story creation (close friends vs public)
- Performance insights to help users understand what resonates

The key is reducing friction in creation while adding social elements that make stories feel more interactive and community-driven.`,
    upvotes: 47,
    downvotes: 2,
    createdAt: "2 days ago",
    isVerified: true
  },
  {
    id: 2,
    author: {
      name: "Marcus Rodriguez",
      title: "Product Manager at Google",
      avatar: "/placeholder-user.jpg",
      experience: "3 years"
    },
    answer: `I'd approach this from a behavioral psychology perspective:

**Problem Analysis:**
Current pain points include content creation anxiety, lack of ideas, and fear of posting "boring" content.

**Solution: Story Prompts & Gamification**
- Daily story prompts based on current events, seasons, or personal milestones
- Achievement system for consistent story posting
- Story streaks with friends (similar to Snapchat but enhanced)
- Quick polls and questions that auto-generate based on user activity

**Success Metrics:**
- Increase in daily active story creators by 25%
- Average stories per user per week increase by 40%
- Time spent viewing stories increases by 15%

The key insight is that people need inspiration and social validation to share consistently.`,
    upvotes: 32,
    downvotes: 5,
    createdAt: "1 day ago",
    isVerified: false
  },
  {
    id: 3,
    author: {
      name: "Elena Kowalski",
      title: "Product Lead at Spotify",
      avatar: "/placeholder-user.jpg",
      experience: "7 years"
    },
    answer: `From my experience with social audio features, I'd recommend:

**Music-First Story Enhancement:**
- Seamless integration with user's music streaming (Spotify, Apple Music)
- Auto-sync story timing with beat drops and rhythm
- Collaborative playlists that generate into story series

**Social Proof & Discovery:**
- "Stories from your music taste" - discover creators with similar music preferences
- Featured stories from artists and creators
- Story remix feature - users can build on others' musical stories

**Reduced Friction:**
- Voice commands for hands-free story creation
- Background story recording while using other apps
- Smart cropping and editing based on audio analysis

This leverages Instagram's existing music partnerships while creating new social dynamics around shared musical experiences.`,
    upvotes: 28,
    downvotes: 1,
    createdAt: "3 hours ago",
    isVerified: true
  }
]

export default function QuestionSolutionsPage() {
  const params = useParams()
  const router = useRouter()
  const questionId = parseInt(params.id as string)
  
  const question = mockQuestions.find(q => q.id === questionId)
  const [sortBy, setSortBy] = useState<"popular" | "recent">("popular")

  if (!question) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Question not found</p>
      </div>
    )
  }

  const sortedAnswers = [...mockAnswers].sort((a, b) => {
    if (sortBy === "popular") {
      return (b.upvotes - b.downvotes) - (a.upvotes - a.downvotes)
    }
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  })

  const difficultyColor = {
    Easy: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
    Medium: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
    Hard: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
  }[question.difficulty] || "bg-gray-100 text-gray-800"

  return (
    <div className="min-h-screen">
      <DynamicBackground />

      <div className="container py-8">
        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={() => router.back()}
          className="mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Questions
        </Button>

        {/* Question Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <Card>
            <CardHeader>
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-3">
                    {question.isHot && (
                      <Badge variant="destructive" className="text-xs">
                        🔥 Hot
                      </Badge>
                    )}
                    <Badge variant="outline" className={difficultyColor}>
                      {question.difficulty}
                    </Badge>
                    <Badge variant="secondary">
                      {question.category}
                    </Badge>
                  </div>
                  <h1 className="font-display font-bold text-2xl md:text-3xl mb-3">
                    {question.title}
                  </h1>
                  <p className="text-muted-foreground mb-4">{question.description}</p>
                  
                  <div className="flex items-center gap-6 text-sm text-muted-foreground mb-4">
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {question.timeLimit}m
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      {question.attempts.toLocaleString()} attempts
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-current text-yellow-500" />
                      {question.avgScore.toFixed(1)} avg score
                    </div>
                  </div>

                  <div className="bg-muted/50 rounded-lg p-4">
                    <h3 className="font-medium mb-2">Interview Prompt</h3>
                    <p className="text-sm leading-relaxed">{question.prompt}</p>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  <Share2 className="h-4 w-4 mr-2" />
                  Share
                </Button>
              </div>
            </CardHeader>
          </Card>
        </motion.div>

        {/* Solutions Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-display font-semibold text-xl">Community Solutions</h2>
          <div className="flex gap-2">
            <Button
              variant={sortBy === "popular" ? "default" : "outline"}
              size="sm"
              onClick={() => setSortBy("popular")}
            >
              Most Popular
            </Button>
            <Button
              variant={sortBy === "recent" ? "default" : "outline"}
              size="sm"
              onClick={() => setSortBy("recent")}
            >
              Most Recent
            </Button>
          </div>
        </div>

        {/* Community Solutions */}
        <div className="space-y-6">
          {sortedAnswers.map((answer, index) => (
            <motion.div
              key={answer.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card>
                <CardHeader>
                  <div className="flex items-start gap-4">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={answer.author.avatar} />
                      <AvatarFallback>
                        {answer.author.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-medium">{answer.author.name}</h3>
                        {answer.isVerified && (
                          <Badge variant="secondary" className="text-xs">
                            ✓ Verified PM
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {answer.author.title} • {answer.author.experience} experience
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {answer.createdAt}
                      </p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="prose prose-sm max-w-none mb-4">
                    <div className="whitespace-pre-line text-sm leading-relaxed">
                      {answer.answer}
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 pt-4 border-t">
                    <Button variant="ghost" size="sm" className="gap-1">
                      <ThumbsUp className="h-4 w-4" />
                      {answer.upvotes}
                    </Button>
                    <Button variant="ghost" size="sm" className="gap-1">
                      <ThumbsDown className="h-4 w-4" />
                      {answer.downvotes}
                    </Button>
                    <div className="flex-1" />
                    <Button variant="ghost" size="sm">
                      Reply
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Share2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-12 text-center"
        >
          <Card className="p-8">
            <h3 className="font-display font-semibold text-xl mb-4">
              Ready to Practice?
            </h3>
            <p className="text-muted-foreground mb-6">
              Try answering this question yourself and get AI-powered feedback.
            </p>
            <div className="flex gap-4 justify-center">
              <Button
                size="lg"
                onClick={() => router.push(`/app/workspace?question=${questionId}`)}
              >
                Start Practice Session
              </Button>
              <Button variant="outline" size="lg">
                Add Your Solution
              </Button>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
