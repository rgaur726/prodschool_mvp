"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { MainNavigation } from "@/components/ui/navigation"
import { DynamicBackground } from "@/components/ui/dynamic-background"
import { QuestionCard } from "@/components/ui/question-card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search } from "lucide-react"
import { mockQuestions } from "@/lib/mock-data"

const categories = ["All", "Product Design", "Product Strategy", "Market Sizing", "Analytics", "Go-to-Market"]
const difficulties = ["All", "Easy", "Medium", "Hard"]

export default function QuestionsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedDifficulty, setSelectedDifficulty] = useState("All")
  const [expandedCard, setExpandedCard] = useState<number | null>(null)
  const router = useRouter()

  const filteredQuestions = mockQuestions.filter((question) => {
    const matchesSearch =
      question.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      question.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "All" || question.category === selectedCategory
    const matchesDifficulty = selectedDifficulty === "All" || question.difficulty === selectedDifficulty

    return matchesSearch && matchesCategory && matchesDifficulty
  })

  return (
    <div className="min-h-screen">
      <DynamicBackground />
      <MainNavigation />

      <div className="container py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <h1 className="font-display font-bold text-3xl md:text-4xl mb-4">Practice Questions</h1>
          <p className="text-xl text-muted-foreground mb-8">
            Master PM interviews with real questions from top tech companies.
          </p>

          {/* Filters */}
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search questions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full md:w-48">
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
              <SelectTrigger className="w-full md:w-48">
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

          {/* Active Filters */}
          <div className="flex flex-wrap gap-2 mb-6">
            {selectedCategory !== "All" && (
              <Badge variant="secondary" className="gap-1">
                Category: {selectedCategory}
                <button
                  onClick={() => setSelectedCategory("All")}
                  className="ml-1 hover:bg-secondary-foreground/20 rounded-full p-0.5"
                >
                  ×
                </button>
              </Badge>
            )}
            {selectedDifficulty !== "All" && (
              <Badge variant="secondary" className="gap-1">
                Difficulty: {selectedDifficulty}
                <button
                  onClick={() => setSelectedDifficulty("All")}
                  className="ml-1 hover:bg-secondary-foreground/20 rounded-full p-0.5"
                >
                  ×
                </button>
              </Badge>
            )}
            {searchTerm && (
              <Badge variant="secondary" className="gap-1">
                Search: "{searchTerm}"
                <button
                  onClick={() => setSearchTerm("")}
                  className="ml-1 hover:bg-secondary-foreground/20 rounded-full p-0.5"
                >
                  ×
                </button>
              </Badge>
            )}
          </div>
        </motion.div>

        {/* Results */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredQuestions.length === 0 ? (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="col-span-full text-center py-12">
              <p className="text-muted-foreground text-lg">No questions found matching your criteria.</p>
              <Button
                variant="outline"
                onClick={() => {
                  setSearchTerm("")
                  setSelectedCategory("All")
                  setSelectedDifficulty("All")
                }}
                className="mt-4"
              >
                Clear Filters
              </Button>
            </motion.div>
          ) : (
            filteredQuestions.map((question, index) => (
              <motion.div
                key={question.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <QuestionCard
                  question={question}
                  isExpanded={expandedCard === question.id}
                  onToggle={() => setExpandedCard(expandedCard === question.id ? null : question.id)}
                  onTogglePrompt={() => {}}
                  onStartPractice={() => router.push(`/app/workspace?question=${question.id}`)}
                  onViewSolutions={() => router.push(`/questions/${question.id}/solutions`)}
                />
              </motion.div>
            ))
          )}
        </div>

        {filteredQuestions.length > 0 && (
          <div className="text-center mt-8">
            <p className="text-muted-foreground">
              Showing {filteredQuestions.length} of {mockQuestions.length} questions
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
