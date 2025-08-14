"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { MainNavigation } from "@/components/ui/navigation"
import { DynamicBackground } from "@/components/ui/dynamic-background"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, MessageSquare, Heart, Eye, Pin, TrendingUp, Users, BookOpen, Award, Plus, Reply } from "lucide-react"
import { mockCommunityPosts, mockLeaderboard } from "@/lib/mock-data"
import Link from "next/link"

const categories = [
  "All",
  "Interview Prep",
  "Interview Experience",
  "Study Resources",
  "Career Transition",
  "Company Specific",
]
const sortOptions = ["Latest", "Most Popular", "Most Replies", "Trending"]

export default function CommunityPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [sortBy, setSortBy] = useState("Latest")
  const [likedPosts, setLikedPosts] = useState<Set<number>>(new Set([2, 4]))

  const filteredPosts = mockCommunityPosts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.content.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "All" || post.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const sortedPosts = [...filteredPosts].sort((a, b) => {
    switch (sortBy) {
      case "Most Popular":
        return b.likes - a.likes
      case "Most Replies":
        return b.replies - a.replies
      case "Trending":
        return b.views - a.views
      default:
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    }
  })

  const handleLike = (postId: number) => {
    const newLikedPosts = new Set(likedPosts)
    if (newLikedPosts.has(postId)) {
      newLikedPosts.delete(postId)
    } else {
      newLikedPosts.add(postId)
    }
    setLikedPosts(newLikedPosts)
  }

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))

    if (diffInHours < 1) return "Just now"
    if (diffInHours < 24) return `${diffInHours}h ago`
    const diffInDays = Math.floor(diffInHours / 24)
    if (diffInDays < 7) return `${diffInDays}d ago`
    return date.toLocaleDateString()
  }

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
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="font-display font-bold text-3xl md:text-4xl mb-4">
                Community <span className="gradient-text">Discussions</span>
              </h1>
              <p className="text-xl text-muted-foreground">
                Connect with fellow PMs, share experiences, and learn together.
              </p>
            </div>
            <Button className="rounded-2xl app-gradient shadow-lg text-primary-foreground">
              New Post
            </Button>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search discussions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 rounded-2xl"
              />
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full md:w-48 rounded-2xl">
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
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full md:w-48 rounded-2xl">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                {sortOptions.map((option) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            <Tabs defaultValue="discussions" className="w-full">
              <TabsList className="grid w-full grid-cols-3 rounded-2xl bg-muted/50 p-1 mb-6">
                <TabsTrigger value="discussions" className="rounded-xl">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Discussions
                </TabsTrigger>
                <TabsTrigger value="trending" className="rounded-xl">
                  <TrendingUp className="h-4 w-4 mr-2" />
                  Trending
                </TabsTrigger>
                <TabsTrigger value="resources" className="rounded-xl">
                  <BookOpen className="h-4 w-4 mr-2" />
                  Resources
                </TabsTrigger>
              </TabsList>

              <TabsContent value="discussions" className="space-y-4">
                {sortedPosts.map((post, index) => (
                  <motion.div
                    key={post.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Card className="rounded-3xl border-2 modern-card hover:border-primary/20">
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                          <Avatar className="w-12 h-12 rounded-2xl">
                            <AvatarImage src={post.author.avatar || "/placeholder.svg"} alt={post.author.name} />
                            <AvatarFallback className="rounded-2xl bg-gradient-to-br from-primary to-purple-500 text-white font-bold">
                              {post.author.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>

                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between mb-3">
                              <div className="flex items-center gap-3 flex-wrap">
                                {post.isPinned && <Pin className="h-4 w-4 text-primary" />}
                                <Badge variant="outline" className="rounded-xl">
                                  {post.category}
                                </Badge>
                                <Badge variant="secondary" className="rounded-xl">
                                  {post.author.level}
                                </Badge>
                              </div>
                              <span className="text-sm text-muted-foreground">{formatTimeAgo(post.createdAt)}</span>
                            </div>

                            <Link href={`/community/post/${post.id}`} className="block group">
                              <h3 className="font-display font-bold text-lg mb-2 group-hover:text-primary transition-colors">
                                {post.title}
                              </h3>
                              <p className="text-muted-foreground mb-4 line-clamp-2 leading-relaxed">{post.content}</p>
                            </Link>

                            <div className="flex items-center gap-2 mb-4">
                              {post.tags.map((tag) => (
                                <Badge key={tag} variant="outline" className="text-xs rounded-xl">
                                  {tag}
                                </Badge>
                              ))}
                            </div>

                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                <span className="font-medium">{post.author.name}</span>
                                <span>•</span>
                                <span>{post.author.role}</span>
                              </div>

                              <div className="flex items-center gap-4">
                                <button
                                  onClick={() => handleLike(post.id)}
                                  className={`flex items-center gap-1 text-sm transition-colors ${
                                    likedPosts.has(post.id)
                                      ? "text-red-500"
                                      : "text-muted-foreground hover:text-red-500"
                                  }`}
                                >
                                  <Heart className={`h-4 w-4 ${likedPosts.has(post.id) ? "fill-current" : ""}`} />
                                  {post.likes + (likedPosts.has(post.id) && !post.isLiked ? 1 : 0)}
                                </button>
                                <Link
                                  href={`/community/post/${post.id}`}
                                  className="flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-colors"
                                >
                                  <MessageSquare className="h-4 w-4" />
                                  {post.replies}
                                </Link>
                                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                  <Eye className="h-4 w-4" />
                                  {post.views}
                                </div>
                              </div>
                            </div>

                            {post.lastReply && (
                              <div className="mt-4 p-3 bg-muted/30 rounded-2xl">
                                <div className="flex items-center gap-2 text-sm">
                                  <Reply className="h-3 w-3 text-muted-foreground" />
                                  <span className="font-medium">{post.lastReply.author}:</span>
                                  <span className="text-muted-foreground line-clamp-1">{post.lastReply.content}</span>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </TabsContent>

              <TabsContent value="trending" className="space-y-4">
                <div className="text-center py-12">
                  <TrendingUp className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="font-display font-bold text-xl mb-2">Trending Discussions</h3>
                  <p className="text-muted-foreground">Discover the hottest topics in the PM community right now.</p>
                </div>
              </TabsContent>

              <TabsContent value="resources" className="space-y-4">
                <div className="text-center py-12">
                  <BookOpen className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="font-display font-bold text-xl mb-2">Community Resources</h3>
                  <p className="text-muted-foreground">
                    Curated resources shared by the community for PM interview preparation.
                  </p>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Community Stats */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <Card className="rounded-3xl border-2 modern-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    Community Stats
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-muted/50 rounded-2xl">
                      <div className="font-bold text-lg text-primary">12.5K</div>
                      <div className="text-xs text-muted-foreground">Members</div>
                    </div>
                    <div className="text-center p-3 bg-muted/50 rounded-2xl">
                      <div className="font-bold text-lg text-primary">1.2K</div>
                      <div className="text-xs text-muted-foreground">Posts</div>
                    </div>
                    <div className="text-center p-3 bg-muted/50 rounded-2xl">
                      <div className="font-bold text-lg text-primary">3.4K</div>
                      <div className="text-xs text-muted-foreground">Active</div>
                    </div>
                    <div className="text-center p-3 bg-muted/50 rounded-2xl">
                      <div className="font-bold text-lg text-primary">8.9K</div>
                      <div className="text-xs text-muted-foreground">Replies</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Top Contributors */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <Card className="rounded-3xl border-2 modern-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Award className="h-5 w-5" />
                    Top Contributors
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {mockLeaderboard.slice(0, 5).map((user, index) => (
                    <div key={user.rank} className="flex items-center gap-3">
                      <div className="text-lg">{user.badge}</div>
                      <Avatar className="w-8 h-8 rounded-2xl">
                        <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                        <AvatarFallback className="rounded-2xl bg-gradient-to-br from-primary to-purple-500 text-white text-xs font-bold">
                          {user.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-sm truncate">{user.name}</div>
                        <div className="text-xs text-muted-foreground">{user.score} points</div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>

            {/* Popular Tags */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <Card className="rounded-3xl border-2 modern-card">
                <CardHeader>
                  <CardTitle>Popular Tags</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {[
                      "Google",
                      "Meta",
                      "Interview",
                      "Frameworks",
                      "Market Sizing",
                      "Product Design",
                      "Analytics",
                      "Strategy",
                    ].map((tag) => (
                      <Badge key={tag} variant="outline" className="rounded-xl cursor-pointer hover:bg-primary/10">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <Card className="rounded-3xl border-2 modern-card">
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button className="w-full justify-start rounded-2xl bg-transparent" variant="outline">
                    <Plus className="h-4 w-4 mr-2" />
                    Ask a Question
                  </Button>
                  <Button className="w-full justify-start rounded-2xl bg-transparent" variant="outline">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Share Experience
                  </Button>
                  <Button className="w-full justify-start rounded-2xl bg-transparent" variant="outline">
                    <BookOpen className="h-4 w-4 mr-2" />
                    Share Resource
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
