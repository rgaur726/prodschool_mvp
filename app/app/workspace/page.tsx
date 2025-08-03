"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { QuestionCard } from "@/components/ui/question-card"
import { Timer } from "@/components/ui/timer"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, BookOpen, Clock, Play, Save, Share } from "lucide-react"
import { mockQuestions } from "@/lib/mock-data"
import { useSearchParams } from "next/navigation"

const categories = ["All", "Product Design", "Product Strategy", "Market Sizing", "Analytics", "Go-to-Market"]
const difficulties = ["All", "Easy", "Medium", "Hard"]

export default function WorkspacePage() {
  const searchParams = useSearchParams()
  const questionIdFromUrl = searchParams.get("question")

  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedDifficulty, setSelectedDifficulty] = useState("All")
  const [selectedQuestion, setSelectedQuestion] = useState<(typeof mockQuestions)[0] | null>(null)
  const [isTimerActive, setIsTimerActive] = useState(false)
  const [response, setResponse] = useState("")

  useEffect(() => {
    if (questionIdFromUrl) {
      const question = mockQuestions.find((q) => q.id === Number.parseInt(questionIdFromUrl))
      if (question) {
        setSelectedQuestion(question)
      }
    }
  }, [questionIdFromUrl])

  const filteredQuestions = mockQuestions.filter((question) => {
    const matchesSearch = question.title.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "All" || question.category === selectedCategory
    const matchesDifficulty = selectedDifficulty === "All" || question.difficulty === selectedDifficulty

    return matchesSearch && matchesCategory && matchesDifficulty
  })

  const handleQuestionSelect = (question: (typeof mockQuestions)[0]) => {
    setSelectedQuestion(question)
    setResponse("")
    setIsTimerActive(false)
  }

  const handleStartTimer = () => {
    setIsTimerActive(true)
  }

  const handleSaveResponse = () => {
    // Mock save functionality
    console.log("Saving response:", response)
  }

  return (
    <div className="container py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="mb-8"
      >
        <h1 className="font-display font-bold text-3xl mb-4">Practice Workspace</h1>
        <p className="text-muted-foreground">Select a question and start practicing in a focused environment.</p>
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Question Browser */}
        <div className="lg:col-span-1">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Card className="h-fit">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5" />
                  Question Library
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Search and Filters */}
                <div className="space-y-3">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search questions..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger>
                      <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
                    <SelectTrigger>
                      <SelectValue placeholder="Difficulty" />
                    </SelectTrigger>
                    <SelectContent>
                      {difficulties.map((difficulty) => (
                        <SelectItem key={difficulty} value={difficulty}>
                          {difficulty}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Question List */}
                <div className="space-y-2 max-h-96 overflow-y-auto">
                  {filteredQuestions.map((question) => (
                    <div
                      key={question.id}
                      className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                        selectedQuestion?.id === question.id
                          ? "border-primary bg-primary/5"
                          : "border-border hover:bg-muted/50"
                      }`}
                      onClick={() => handleQuestionSelect(question)}
                    >
                      <div className="flex items-center gap-2 mb-2">
                        {question.isHot && (
                          <Badge variant="destructive" className="text-xs">
                            🔥
                          </Badge>
                        )}
                        <Badge variant="outline" className="text-xs">
                          {question.difficulty}
                        </Badge>
                      </div>
                      <h4 className="font-medium text-sm leading-tight mb-1">{question.title}</h4>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        {question.timeLimit}m
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Practice Area */}
        <div className="lg:col-span-2">
          {selectedQuestion ? (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              {/* Question Header */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <CardTitle className="text-lg">Practice Session</CardTitle>
                      <Badge variant="outline">{selectedQuestion.category}</Badge>
                    </div>
                    <div className="flex items-center gap-2">
                      {!isTimerActive ? (
                        <Button size="sm" onClick={handleStartTimer}>
                          <Play className="h-3 w-3 mr-1" />
                          Start Timer
                        </Button>
                      ) : (
                        <Timer initialTime={selectedQuestion.timeLimit * 60} onTimeUp={() => setIsTimerActive(false)} />
                      )}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <QuestionCard
                    question={selectedQuestion}
                    isExpanded={true}
                    showPrompt={true}
                    onTogglePrompt={() => {}}
                  />
                </CardContent>
              </Card>

              {/* Response Area */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Your Response</CardTitle>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={handleSaveResponse}>
                        <Save className="h-3 w-3 mr-1" />
                        Save Draft
                      </Button>
                      <Button variant="outline" size="sm">
                        <Share className="h-3 w-3 mr-1" />
                        Share
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <textarea
                    className="w-full h-80 p-4 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Start typing your response here..."
                    value={response}
                    onChange={(e) => setResponse(e.target.value)}
                  />
                  <div className="flex justify-between items-center mt-4">
                    <p className="text-sm text-muted-foreground">{response.length} characters</p>
                    <div className="flex gap-2">
                      <Button variant="outline">Get AI Feedback</Button>
                      <Button>Submit Response</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ) : (
            /* Empty State */
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
              <Card className="h-96 flex items-center justify-center">
                <CardContent className="text-center">
                  <BookOpen className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="font-display font-bold text-xl mb-2">Select a Question to Start</h3>
                  <p className="text-muted-foreground">
                    Choose a question from the library to begin your practice session.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  )
}
