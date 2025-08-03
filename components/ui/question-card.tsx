"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ChevronDown, Clock, Users, Star, Play, Eye, EyeOff } from "lucide-react"
import { cn } from "@/lib/utils"

interface Question {
  id: number
  title: string
  category: string
  difficulty: string
  timeLimit: number
  description: string
  prompt: string
  tags: string[]
  attempts: number
  avgScore: number
  isHot?: boolean
}

interface QuestionCardProps {
  question: Question
  isExpanded?: boolean
  onToggle?: () => void
  showPrompt?: boolean
  onTogglePrompt?: () => void
  onStartPractice?: () => void
  onViewSolutions?: () => void
  isClickable?: boolean
}

export function QuestionCard({
  question,
  isExpanded = false,
  onToggle,
  showPrompt = true,
  onTogglePrompt,
  onStartPractice,
  onViewSolutions,
  isClickable = true,
}: QuestionCardProps) {
  const [isPromptVisible, setIsPromptVisible] = useState(showPrompt)
  const router = useRouter()

  const difficultyColor =
    {
      Easy: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
      Medium: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
      Hard: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
    }[question.difficulty] || "bg-gray-100 text-gray-800"

  const handlePromptToggle = () => {
    const newState = !isPromptVisible
    setIsPromptVisible(newState)
    onTogglePrompt?.(newState)
  }

  const handleCardClick = (e: React.MouseEvent) => {
    // Don't trigger card click if clicking on buttons or interactive elements
    if (
      e.target instanceof HTMLElement &&
      (e.target.closest('button') || e.target.closest('[role="button"]'))
    ) {
      return
    }
    
    if (isClickable && onToggle) {
      onToggle()
    }
  }

  const handleViewSolutions = () => {
    if (onViewSolutions) {
      onViewSolutions()
    } else {
      router.push(`/questions/${question.id}/solutions`)
    }
  }

  return (
    <Card 
      className={cn(
        "w-full transition-all duration-200 hover:shadow-md",
        isClickable && "cursor-pointer hover:shadow-lg"
      )}
      onClick={handleCardClick}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2">
              {question.isHot && (
                <Badge variant="destructive" className="text-xs">
                  🔥 Hot
                </Badge>
              )}
              <Badge variant="outline" className={cn("text-xs", difficultyColor)}>
                {question.difficulty}
              </Badge>
              <Badge variant="secondary" className="text-xs">
                {question.category}
              </Badge>
            </div>
            <h3 className="font-display font-semibold text-lg leading-tight mb-2">{question.title}</h3>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {question.timeLimit}m
              </div>
              <div className="flex items-center gap-1">
                <Users className="h-3 w-3" />
                {question.attempts.toLocaleString()}
              </div>
              <div className="flex items-center gap-1">
                <Star className="h-3 w-3 fill-current text-yellow-500" />
                {question.avgScore.toFixed(1)}
              </div>
            </div>
          </div>
          {onToggle && (
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={(e) => {
                e.stopPropagation()
                onToggle()
              }} 
              className="shrink-0"
            >
              <ChevronDown className={cn("h-4 w-4 transition-transform", isExpanded && "rotate-180")} />
            </Button>
          )}
        </div>
      </CardHeader>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <CardContent className="pt-0">
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground leading-relaxed">{question.description}</p>

                {onTogglePrompt && (
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium text-sm">Interview Prompt</h4>
                    <Button variant="ghost" size="sm" onClick={handlePromptToggle} className="text-xs">
                      {isPromptVisible ? (
                        <>
                          <EyeOff className="h-3 w-3 mr-1" />
                          Hide Prompt
                        </>
                      ) : (
                        <>
                          <Eye className="h-3 w-3 mr-1" />
                          Show Prompt
                        </>
                      )}
                    </Button>
                  </div>
                )}

                <AnimatePresence>
                  {isPromptVisible && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="bg-muted/50 rounded-lg p-3">
                        <p className="text-sm leading-relaxed">{question.prompt}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="flex flex-wrap gap-1">
                  {question.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>

                <div className="flex gap-2 pt-2">
                  <Button 
                    size="sm" 
                    className="flex-1" 
                    onClick={(e) => {
                      e.stopPropagation()
                      onStartPractice?.()
                    }}
                  >
                    <Play className="h-3 w-3 mr-1" />
                    Start Practice
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation()
                      handleViewSolutions()
                    }}
                  >
                    View Solutions
                  </Button>
                </div>
              </div>
            </CardContent>
          </motion.div>
        )}
      </AnimatePresence>
    </Card>
  )
}
