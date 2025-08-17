"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { DynamicBackground } from "@/components/ui/dynamic-background"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Heart, MessageSquare, Share2, Flag, ArrowLeft, Send, ThumbsUp, Reply, MoreHorizontal } from "lucide-react"
import { mockCommunityPosts, mockCommunityReplies } from "@/lib/mock-data"
import Link from "next/link"
import { useParams } from "next/navigation"

export default function PostDetailPage() {
  const params = useParams()
  const postId = Number.parseInt(params.id as string)
  const post = mockCommunityPosts.find((p) => p.id === postId) || mockCommunityPosts[0]

  const [newReply, setNewReply] = useState("")
  const [isLiked, setIsLiked] = useState(post.isLiked)
  const [likes, setLikes] = useState(post.likes)

  const handleLike = () => {
    setIsLiked(!isLiked)
    setLikes((prev) => (isLiked ? prev - 1 : prev + 1))
  }

  const handleReply = () => {
    if (newReply.trim()) {
      // Reply submission placeholder (debug log removed)
      setNewReply("")
    }
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

      <div className="container py-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <div className="mb-6">
            <Link
              href="/community"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Community
            </Link>
          </div>

          <div className="max-w-4xl mx-auto space-y-6">
            {/* Main Post */}
            <Card className="rounded-3xl border-2 modern-card">
              <CardContent className="p-8">
                <div className="flex items-start gap-4 mb-6">
                  <Avatar className="w-16 h-16 rounded-3xl">
                    <AvatarImage src={post.author.avatar || "/placeholder.svg"} alt={post.author.name} />
                    <AvatarFallback className="rounded-3xl bg-gradient-to-br from-primary to-purple-500 text-white font-bold text-lg">
                      {post.author.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>

                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-display font-bold text-lg">{post.author.name}</h3>
                      <Badge variant="outline" className="rounded-xl">
                        {post.author.level}
                      </Badge>
                      <span className="text-sm text-muted-foreground">•</span>
                      <span className="text-sm text-muted-foreground">{formatTimeAgo(post.createdAt)}</span>
                    </div>
                    <p className="text-muted-foreground">{post.author.role}</p>
                  </div>

                  <Button variant="ghost" size="icon" className="rounded-2xl">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>

                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Badge variant="outline" className="rounded-xl">
                      {post.category}
                    </Badge>
                    {post.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="rounded-xl text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <h1 className="font-display font-bold text-2xl md:text-3xl mb-4">{post.title}</h1>
                  <div className="prose prose-gray max-w-none">
                    <p className="text-foreground leading-relaxed text-lg">{post.content}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-6 border-t">
                  <div className="flex items-center gap-4">
                    <button
                      onClick={handleLike}
                      className={`flex items-center gap-2 px-4 py-2 rounded-2xl transition-colors ${
                        isLiked
                          ? "bg-red-50 text-red-600 border border-red-200"
                          : "bg-muted/50 text-muted-foreground hover:bg-red-50 hover:text-red-600"
                      }`}
                    >
                      <Heart className={`h-4 w-4 ${isLiked ? "fill-current" : ""}`} />
                      {likes}
                    </button>
                    <div className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-muted/50 text-muted-foreground">
                      <MessageSquare className="h-4 w-4" />
                      {post.replies}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" className="rounded-2xl bg-transparent">
                      <Share2 className="h-4 w-4 mr-2" />
                      Share
                    </Button>
                    <Button variant="outline" size="sm" className="rounded-2xl bg-transparent">
                      <Flag className="h-4 w-4 mr-2" />
                      Report
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Reply Form */}
            <Card className="rounded-3xl border-2 modern-card">
              <CardContent className="p-6">
                <h3 className="font-display font-bold text-lg mb-4">Add a Reply</h3>
                <div className="space-y-4">
                  <Textarea
                    placeholder="Share your thoughts, experiences, or ask follow-up questions..."
                    value={newReply}
                    onChange={(e) => setNewReply(e.target.value)}
                    className="min-h-[120px] rounded-2xl resize-none"
                  />
                  <div className="flex justify-between items-center">
                    <p className="text-sm text-muted-foreground">Be respectful and constructive in your response.</p>
                    <Button onClick={handleReply} disabled={!newReply.trim()} className="rounded-2xl">
                      <Send className="h-4 w-4 mr-2" />
                      Post Reply
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Replies */}
            <div className="space-y-4">
              <h3 className="font-display font-bold text-xl">Replies ({post.replies})</h3>

              {mockCommunityReplies
                .filter((reply) => reply.postId === postId)
                .map((reply) => (
                  <Card key={reply.id} className="rounded-3xl border-2 modern-card">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <Avatar className="w-12 h-12 rounded-2xl">
                          <AvatarImage src={reply.author.avatar || "/placeholder.svg"} alt={reply.author.name} />
                          <AvatarFallback className="rounded-2xl bg-gradient-to-br from-primary to-purple-500 text-white font-bold">
                            {reply.author.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>

                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h4 className="font-semibold">{reply.author.name}</h4>
                            <Badge variant="outline" className="rounded-xl text-xs">
                              {reply.author.level}
                            </Badge>
                            <span className="text-sm text-muted-foreground">•</span>
                            <span className="text-sm text-muted-foreground">{formatTimeAgo(reply.createdAt)}</span>
                          </div>
                          <p className="text-sm text-muted-foreground mb-3">{reply.author.role}</p>

                          <p className="text-foreground leading-relaxed mb-4">{reply.content}</p>

                          <div className="flex items-center gap-4">
                            <button className="flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-colors">
                              <ThumbsUp className="h-3 w-3" />
                              {reply.likes}
                            </button>
                            <button className="flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-colors">
                              <Reply className="h-3 w-3" />
                              Reply
                            </button>
                          </div>

                          {/* Nested Replies */}
                          {reply.replies && reply.replies.length > 0 && (
                            <div className="mt-4 pl-4 border-l-2 border-muted space-y-4">
                              {reply.replies.map((nestedReply) => (
                                <div key={nestedReply.id} className="flex items-start gap-3">
                                  <Avatar className="w-8 h-8 rounded-xl">
                                    <AvatarImage
                                      src={nestedReply.author.avatar || "/placeholder.svg"}
                                      alt={nestedReply.author.name}
                                    />
                                    <AvatarFallback className="rounded-xl bg-gradient-to-br from-primary to-purple-500 text-white text-xs font-bold">
                                      {nestedReply.author.name
                                        .split(" ")
                                        .map((n) => n[0])
                                        .join("")}
                                    </AvatarFallback>
                                  </Avatar>
                                  <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-1">
                                      <span className="font-medium text-sm">{nestedReply.author.name}</span>
                                      <span className="text-xs text-muted-foreground">
                                        {formatTimeAgo(nestedReply.createdAt)}
                                      </span>
                                    </div>
                                    <p className="text-sm text-foreground">{nestedReply.content}</p>
                                    <button className="flex items-center gap-1 text-xs text-muted-foreground hover:text-primary transition-colors mt-2">
                                      <ThumbsUp className="h-3 w-3" />
                                      {nestedReply.likes}
                                    </button>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
