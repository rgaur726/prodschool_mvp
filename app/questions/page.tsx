"use client"

import { useEffect, useMemo, useState } from "react"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { QuestionCard } from "@/components/ui/question-card"
import { Search } from "lucide-react"
import { supabase } from "@/lib/supabase-client"

const difficulties = ["All", "Easy", "Medium", "Hard"]

interface DBQuestionRow {
  id: string
  title?: string
  questionTitle?: string
  category?: string | null
  questionCategory?: string | null
  difficulty?: string | null
  timeLimit?: number | null
  description?: string | null
  prompt?: string | null
  tags?: string[] | null
  companyTags?: string[] | null
  attempts?: number | null
  avgScore?: number | null
  isHot?: boolean | null
  created_at?: string
  createdAt?: string
  [key: string]: any
}

interface NormalizedQuestion {
  id: string
  title: string
  category?: string
  difficulty?: string
  timeLimit?: number
  description?: string
  prompt?: string
  tags: string[]
  companyTags: string[]
  attempts?: number
  avgScore?: number
  isHot?: boolean
}

export default function QuestionsPage() {
  const router = useRouter()
  const [rawQuestions, setRawQuestions] = useState<DBQuestionRow[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedDifficulty, setSelectedDifficulty] = useState("All")
  const [selectedCompany, setSelectedCompany] = useState("All")

  const [expandedCard, setExpandedCard] = useState<string | null>(null)
  const [page, setPage] = useState(1)
  const pageSize = 10

  useEffect(() => {
    let aborted = false
    async function fetchQuestions() {
      if (!supabase) return
      setLoading(true)
      setError(null)
      const { data, error } = await supabase
        .from("questions")
        .select("*")
        .order("createdAt", { ascending: false })
        .limit(500)
      if (aborted) return
      if (error) setError(error.message)
      else if (data) setRawQuestions(data as DBQuestionRow[])
      setLoading(false)
    }
    fetchQuestions()
    return () => { aborted = true }
  }, [])

  const normalizedQuestions: NormalizedQuestion[] = useMemo(() => {
    return rawQuestions.map(q => ({
      id: String(q.id),
      title: q.title || q.questionTitle || "Untitled Question",
      category: (q.category || q.questionCategory || undefined) ?? undefined,
      difficulty: q.difficulty || undefined,
      timeLimit: q.timeLimit ?? 45,
      description: q.description || undefined,
      prompt: q.prompt || undefined,
      tags: Array.isArray(q.tags) ? (q.tags as string[]) : [],
      companyTags: Array.isArray(q.companyTags) ? (q.companyTags as string[]) : [],
      attempts: q.attempts ?? 0,
      avgScore: q.avgScore ?? 7.0,
      isHot: !!q.isHot,
    }))
  }, [rawQuestions])

  const availableCategories = useMemo(() => {
    const set = new Set<string>()
    normalizedQuestions.forEach(q => { if (q.category) set.add(q.category) })
    return Array.from(set).sort()
  }, [normalizedQuestions])

  const availableCompanies = useMemo(() => {
    const set = new Set<string>()
    normalizedQuestions.forEach(q => q.companyTags?.forEach(c => set.add(c)))
    return Array.from(set).sort()
  }, [normalizedQuestions])

  const filteredQuestions = useMemo(() => {
    const term = searchTerm.trim().toLowerCase()
    return normalizedQuestions.filter(q => {
      const matchesSearch = !term || q.title.toLowerCase().includes(term)
      const matchesCategory = selectedCategory === "All" || q.category === selectedCategory
      const matchesDifficulty = selectedDifficulty === "All" || q.difficulty === selectedDifficulty
      const matchesCompany = selectedCompany === "All" || q.companyTags.includes(selectedCompany)
      return matchesSearch && matchesCategory && matchesDifficulty && matchesCompany
    })
  }, [normalizedQuestions, searchTerm, selectedCategory, selectedDifficulty, selectedCompany])

  useEffect(() => { setPage(1) }, [searchTerm, selectedCategory, selectedDifficulty, selectedCompany])

  const totalPages = Math.max(1, Math.ceil(filteredQuestions.length / pageSize))
  const currentPage = Math.min(page, totalPages)
  const paginatedQuestions = filteredQuestions.slice((currentPage - 1) * pageSize, currentPage * pageSize)

  const clearAll = () => {
    setSearchTerm("")
    setSelectedCategory("All")
    setSelectedDifficulty("All")
    setSelectedCompany("All")
  }

  return (
    <div className="container py-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="mb-8">
        <h1 className="font-display font-bold text-3xl md:text-4xl mb-4">Practice <span className="gradient-text">Questions</span></h1>
        <p className="text-muted-foreground text-lg">Browse, filter, and practice curated PM interview questions.</p>
      </motion.div>
      <div className="grid lg:grid-cols-4 gap-8">
        <div className="lg:col-span-3">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search questions..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="pl-10" />
            </div>
            <Select value={selectedCategory === 'All' ? '' : selectedCategory} onValueChange={(v) => setSelectedCategory(v || 'All')}>
              <SelectTrigger className="w-full md:w-40"><SelectValue placeholder="Category" /></SelectTrigger>
              <SelectContent>
                {availableCategories.map(category => <SelectItem key={category} value={category}>{category}</SelectItem>)}
              </SelectContent>
            </Select>
            <Select value={selectedDifficulty === 'All' ? '' : selectedDifficulty} onValueChange={(v) => setSelectedDifficulty(v || 'All')}>
              <SelectTrigger className="w-full md:w-40"><SelectValue placeholder="Difficulty" /></SelectTrigger>
              <SelectContent>
                {difficulties.map(diff => <SelectItem key={diff} value={diff}>{diff}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-wrap gap-2 mb-6">
            {selectedCategory !== 'All' && <Badge variant="secondary" className="gap-1">Category: {selectedCategory}<button onClick={() => setSelectedCategory('All')} className="ml-1 hover:bg-secondary-foreground/20 rounded-full px-1">×</button></Badge>}
            {selectedDifficulty !== 'All' && <Badge variant="secondary" className="gap-1">Difficulty: {selectedDifficulty}<button onClick={() => setSelectedDifficulty('All')} className="ml-1 hover:bg-secondary-foreground/20 rounded-full px-1">×</button></Badge>}
            {selectedCompany !== 'All' && <Badge variant="secondary" className="gap-1">Company: {selectedCompany}<button onClick={() => setSelectedCompany('All')} className="ml-1 hover:bg-secondary-foreground/20 rounded-full px-1">×</button></Badge>}
            {searchTerm && <Badge variant="secondary" className="gap-1">Search: "{searchTerm}"<button onClick={() => setSearchTerm("")} className="ml-1 hover:bg-secondary-foreground/20 rounded-full px-1">×</button></Badge>}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {loading && !normalizedQuestions.length && <div className="col-span-full grid gap-4">{Array.from({ length: 6 }).map((_, i) => <div key={i} className="h-40 rounded-lg border border-border/60 bg-muted/20 animate-pulse" />)}</div>}
            {!loading && filteredQuestions.length === 0 ? (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="col-span-full text-center py-12">
                <p className="text-muted-foreground text-lg">No questions found matching your criteria.</p>
                <Button variant="outline" onClick={clearAll} className="mt-4">Clear Filters</Button>
                {error && <div className="text-sm text-red-500 mt-4">{error}</div>}
              </motion.div>
            ) : (
              paginatedQuestions.map((question, index) => (
                <motion.div key={question.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: index * 0.05 }}>
                  <QuestionCard question={question} isExpanded={expandedCard === question.id} onToggle={() => setExpandedCard(expandedCard === question.id ? null : question.id)} onStartPractice={() => router.push(`/app/workspace?question=${question.id}`)} onViewSolutions={() => router.push(`/questions/${question.id}/solutions`)} showTagsOnTop />
                </motion.div>
              ))
            )}
          </div>
          <div className="mt-10 flex flex-col items-center gap-4">
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" disabled={currentPage === 1} onClick={() => setPage(p => Math.max(1, p - 1))}>Prev</Button>
              <div className="text-sm text-muted-foreground">Page {currentPage} / {totalPages}</div>
              <Button variant="outline" size="sm" disabled={currentPage === totalPages} onClick={() => setPage(p => Math.min(totalPages, p + 1))}>Next</Button>
            </div>
            <p className="text-xs text-muted-foreground">Showing {paginatedQuestions.length} of {filteredQuestions.length}</p>
          </div>
        </div>
        <div className="lg:col-span-1 h-fit">
          <div className="rounded-2xl border bg-background/60 backdrop-blur p-4 h-[50vh] flex flex-col sticky top-20">
            <h3 className="font-semibold text-sm mb-3 flex items-center justify-between">Companies {selectedCompany !== 'All' && <button onClick={() => setSelectedCompany('All')} className="text-xs text-primary hover:underline">Reset</button>}</h3>
            <div className="overflow-y-auto pr-1 space-y-1 text-sm">
              <button className={`w-full text-left px-2 py-1 rounded-md transition-colors ${selectedCompany === 'All' ? 'bg-primary/10 text-primary font-medium' : 'hover:bg-muted/50'}`} onClick={() => setSelectedCompany('All')}>All Companies</button>
              {availableCompanies.map(c => (
                <button key={c} className={`w-full text-left px-2 py-1 rounded-md truncate transition-colors ${selectedCompany === c ? 'bg-primary/20 text-primary font-medium' : 'hover:bg-muted/40 text-muted-foreground'}`} onClick={() => setSelectedCompany(c)}>{c}</button>
              ))}
              {availableCompanies.length === 0 && <div className="text-xs text-muted-foreground/70 px-2 py-2">No company tags found.</div>}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
