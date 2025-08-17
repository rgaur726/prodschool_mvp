"use client"

import { useState, useEffect, useMemo } from "react"
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
import { supabase } from "@/lib/supabase-client"

// Fallback category/difficulty lists (will be replaced dynamically once questions load)
const initialCategories = ["Product Design", "Product Strategy", "Market Sizing", "Analytics", "Go-to-Market", "General"]
const difficulties = ["Easy", "Medium", "Hard", "Expert"]

export default function QuestionsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string>("All")
  const [availableCategories, setAvailableCategories] = useState<string[]>(initialCategories)
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("All")
  const [selectedCompany, setSelectedCompany] = useState<string>("All")
  // (moved above)
  const [expandedCard, setExpandedCard] = useState<string | number | null>(null)
  const [questions, setQuestions] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [page, setPage] = useState(1)
  const [availableCompanies, setAvailableCompanies] = useState<string[]>([])
  const pageSize = 10
  const router = useRouter()

  // Fetch questions dynamically
  useEffect(() => {
    let cancelled = false
    async function fetchQuestions() {
      if (!supabase) return
      try {
        setLoading(true)
        setError(null)
        const { data, error } = await supabase
          .from('questions')
          .select('*')
          .order('createdAt', { ascending: false })
          .limit(500)
        if (error) {
          setError(error.message)
          return
        }
        if (!cancelled && data) {
          setQuestions(data as any[])
        }
      } catch (e:any) {
        if (!cancelled) setError(e.message)
      } finally {
        if (!cancelled) setLoading(false)
      }
    }
    fetchQuestions()
    return () => { cancelled = true }
  }, [])

  const normalizedQuestions = useMemo(() => {
    if (!questions.length) return []
    return questions.map((raw:any) => {
      const get = (...keys:string[]) => {
        for (const k of keys) if (k in raw && raw[k] != null) return raw[k]
        return undefined
      }
      const description = get('description','content','body','details','prompt') || ''
      const category = get('category','question_type','type','questionType') || 'General'
      const diff = get('difficulty','level','diff') || 'Medium'
      const difficulty = String(diff).split(/[-_\s]+/).map(p=>p.charAt(0).toUpperCase()+p.slice(1).toLowerCase()).join('')
      const timeLimit = get('time','time_limit','timeLimit','duration') || 45
      const avgScore = Number(get('rating','avgScore','avg_score','score','average_score') || 7.0)
      const attempts = Number(get('viewCount','views','attempts','attempt_count') || Math.floor(Math.random()*900)+100)
      const tags = get('tags') || []
      const companyTagsRaw = get('companyTags','company_tags') || []
      const companyTags = Array.isArray(companyTagsRaw) ? companyTagsRaw : (typeof companyTagsRaw === 'string' ? companyTagsRaw.split(',').map((s:string)=>s.trim()).filter(Boolean) : [])
      return {
        id: raw.id,
        title: raw.title || get('name','question_title') || 'Untitled Question',
        description,
        prompt: get('prompt','full_prompt'),
        category,
        difficulty,
        timeLimit: Number(timeLimit),
        avgScore,
        attempts,
        tags: Array.isArray(tags) ? tags : [],
        companyTags,
        isHot: !!get('isHot','is_hot','hot')
      }
    })
  }, [questions])

  const dataSource = normalizedQuestions.length ? normalizedQuestions : mockQuestions

  const filteredQuestions = useMemo(() => {
    return dataSource.filter((question:any) => {
      const matchesSearch =
        question.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (question.description || '').toLowerCase().includes(searchTerm.toLowerCase())
  const matchesCategory = selectedCategory === 'All' || question.category === selectedCategory
  const matchesDifficulty = selectedDifficulty === 'All' || question.difficulty === selectedDifficulty
  const matchesCompany = selectedCompany === 'All' || (question.companyTags || []).includes(selectedCompany)
      return matchesSearch && matchesCategory && matchesDifficulty && matchesCompany
    })
  }, [dataSource, searchTerm, selectedCategory, selectedDifficulty, selectedCompany])

  const totalPages = Math.max(1, Math.ceil(filteredQuestions.length / pageSize))
  const currentPage = Math.min(page, totalPages)
  const paginatedQuestions = filteredQuestions.slice((currentPage - 1) * pageSize, currentPage * pageSize)

  useEffect(() => { setPage(1) }, [searchTerm, selectedCategory, selectedDifficulty, selectedCompany])

  // Dynamically derive categories from fetched data (QuestionCategory enum values)
  useEffect(() => {
    const derived = Array.from(new Set(normalizedQuestions.map((q:any) => q.category).filter(Boolean))) as string[]
    if (derived.length) {
      const ordered = derived.sort((a,b)=>a.localeCompare(b))
      setAvailableCategories(ordered)
      if (selectedCategory !== 'All' && !derived.includes(selectedCategory)) setSelectedCategory('All')
    }
  }, [normalizedQuestions, selectedCategory])

  // Derive company tags list
  useEffect(() => {
    const set = new Set<string>()
    for (const q of normalizedQuestions) {
      if (Array.isArray(q.companyTags)) {
        for (const c of q.companyTags) {
          if (c && c.trim()) set.add(c.trim())
        }
      }
    }
    const list = Array.from(set)
    if (list.length) {
      list.sort((a,b)=>a.localeCompare(b))
      setAvailableCompanies(list)
      if (selectedCompany !== 'All' && !list.includes(selectedCompany)) setSelectedCompany('All')
    }
  }, [normalizedQuestions, selectedCompany])

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
            <Select value={selectedCategory === 'All' ? '' : selectedCategory} onValueChange={(v) => setSelectedCategory(v || 'All')}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {availableCategories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={selectedDifficulty === 'All' ? '' : selectedDifficulty} onValueChange={(v) => setSelectedDifficulty(v || 'All')}>
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
            <Select value={selectedCompany === 'All' ? '' : selectedCompany} onValueChange={(v) => setSelectedCompany(v || 'All')}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Company" />
              </SelectTrigger>
              <SelectContent>
                {availableCompanies.map((company) => (
                  <SelectItem key={company} value={company}>
                    {company}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Active Filters */}
          <div className="flex flex-wrap gap-2 mb-6">
    {selectedCategory !== 'All' && (
              <Badge variant="secondary" className="gap-1">
                Category: {selectedCategory}
                <button
      onClick={() => setSelectedCategory('All')}
                  className="ml-1 hover:bg-secondary-foreground/20 rounded-full p-0.5"
                >
                  ×
                </button>
              </Badge>
            )}
    {selectedDifficulty !== 'All' && (
              <Badge variant="secondary" className="gap-1">
                Difficulty: {selectedDifficulty}
                <button
      onClick={() => setSelectedDifficulty('All')}
                  className="ml-1 hover:bg-secondary-foreground/20 rounded-full p-0.5"
                >
                  ×
                </button>
              </Badge>
            )}
    {selectedCompany !== 'All' && (
              <Badge variant="secondary" className="gap-1">
                Company: {selectedCompany}
                <button
      onClick={() => setSelectedCompany('All')}
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
          {loading && !normalizedQuestions.length && (
            <div className="col-span-full grid gap-4">
              {Array.from({length:6}).map((_,i)=>(
                <div key={i} className="h-40 rounded-lg border border-border/60 bg-muted/20 animate-pulse" />
              ))}
            </div>
          )}
          {!loading && filteredQuestions.length === 0 ? (
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
              {error && <div className="text-sm text-red-500 mt-4">{error}</div>}
            </motion.div>
          ) : (
            paginatedQuestions.map((question, index) => (
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
                  onStartPractice={() => router.push(`/app/workspace?question=${question.id}`)}
                  onViewSolutions={() => router.push(`/questions/${question.id}/solutions`)}
                  showTagsOnTop
                />
              </motion.div>
            ))
          )}
        </div>
        <div className="mt-10 flex flex-col items-center gap-4">
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" disabled={currentPage === 1} onClick={() => setPage(p => Math.max(1, p-1))}>Prev</Button>
            <div className="text-sm text-muted-foreground">Page {currentPage} / {totalPages}</div>
            <Button variant="outline" size="sm" disabled={currentPage === totalPages} onClick={() => setPage(p => Math.min(totalPages, p+1))}>Next</Button>
          </div>
          <p className="text-xs text-muted-foreground">Showing {paginatedQuestions.length} of {filteredQuestions.length}</p>
        </div>
      </div>
    </div>
  )
}
