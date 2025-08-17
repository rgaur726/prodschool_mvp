"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ChevronDown, Clock, Users, Star, Play } from "lucide-react"
import { cn } from "@/lib/utils"

interface Question {
  id: number | string
  title: string
  category?: string
  difficulty?: string
  timeLimit?: number
  description?: string
  prompt?: string
  tags: string[]
  companyTags?: string[]
  attempts?: number
  avgScore?: number
  isHot?: boolean
}

interface QuestionCardProps {
  question: Question
  isExpanded?: boolean
  onToggle?: () => void
  onStartPractice?: () => void
  onViewSolutions?: () => void
  isClickable?: boolean
  showTagsOnTop?: boolean
}

export function QuestionCard({
  question,
  isExpanded = false,
  onToggle,
  onStartPractice,
  onViewSolutions,
  isClickable = true,
  showTagsOnTop = false,
}: QuestionCardProps) {
  const router = useRouter()

  const difficultyColor =
    {
      Easy: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
      Medium: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
      Hard: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
    }[question.difficulty || ''] || "bg-gray-100 text-gray-800"

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
            <div className="flex items-start justify-between mb-2 gap-2">
              <div className="flex items-center flex-wrap gap-2">
                {showTagsOnTop && question.tags?.length
                  ? question.tags.slice(0,3).map(tag => (
                      <Badge key={tag} variant="outline" className="text-[10px] font-medium px-2 py-0.5 rounded-md">
                        {tag}
                      </Badge>
                    ))
                  : (
                    <>
                      {question.isHot && (
                        <Badge variant="destructive" className="text-xs">
                          🔥 Hot
                        </Badge>
                      )}
                      {question.category && (
                        <Badge variant="secondary" className="text-xs">
                          {question.category}
                        </Badge>
                      )}
                    </>
                  )}
              </div>
              {question.difficulty && (
                <Badge variant="outline" className={cn("text-xs", difficultyColor)}>
                  {question.difficulty}
                </Badge>
              )}
            </div>
            <h3 className="font-display font-semibold text-lg leading-tight mb-2">{question.title}</h3>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {question.timeLimit ?? 45}m
              </div>
              <div className="flex items-center gap-1">
                <Users className="h-3 w-3" />
                {(question.attempts ?? 0).toLocaleString()}
              </div>
              <div className="flex items-center gap-1">
                <Star className="h-3 w-3 fill-current text-yellow-500" />
                {(question.avgScore ?? 7.0).toFixed(1)}
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
                {question.description && (
                  <p className="text-sm text-muted-foreground leading-relaxed">{question.description}</p>
                )}

                {(question.tags?.length || question.companyTags?.length) && (
                  <div className="flex flex-wrap gap-1">
                    {question.tags?.map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                    {question.companyTags?.map((c) => (
                      <Badge key={c} variant="secondary" className="text-[10px]">
                        {c}
                      </Badge>
                    ))}
                  </div>
                )}

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
