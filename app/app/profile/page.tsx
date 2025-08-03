"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  User,
  MapPin,
  Calendar,
  Trophy,
  Target,
  TrendingUp,
  Edit3,
  Camera,
  Award,
  BookOpen,
  Clock,
  Users,
  Zap,
  CheckCircle,
  Settings,
  Bell,
  Shield,
} from "lucide-react"

const userProfile = {
  name: "John Doe",
  email: "john.doe@example.com",
  location: "San Francisco, CA",
  joinDate: "January 2024",
  bio: "Aspiring Product Manager with 3 years of experience in software engineering. Currently preparing for PM interviews at top tech companies.",
  avatar: "/placeholder.svg?height=120&width=120",
  stats: {
    questionsCompleted: 47,
    averageScore: 8.2,
    timeSpent: 32.5,
    streak: 12,
    rank: 156,
    totalUsers: 12500,
  },
  achievements: [
    {
      id: 1,
      title: "First Perfect Score",
      description: "Scored 10/10 on a question",
      earned: true,
      date: "2024-01-15",
    },
    { id: 2, title: "Week Streak", description: "Practiced 7 days in a row", earned: true, date: "2024-01-20" },
    { id: 3, title: "Peer Helper", description: "Gave 10 helpful reviews", earned: true, date: "2024-01-25" },
    {
      id: 4,
      title: "Speed Demon",
      description: "Completed question under time limit",
      earned: true,
      date: "2024-01-18",
    },
    { id: 5, title: "Master Analyst", description: "Excel in analytics questions", earned: false, date: null },
    { id: 6, title: "Design Guru", description: "Master product design questions", earned: false, date: null },
  ],
  skillProgress: [
    { skill: "Product Design", level: 85, trend: "+12%" },
    { skill: "Market Sizing", level: 72, trend: "+8%" },
    { skill: "Analytics", level: 78, trend: "+15%" },
    { skill: "Strategy", level: 88, trend: "+6%" },
    { skill: "Technical", level: 65, trend: "+20%" },
  ],
  recentActivity: [
    { type: "question", title: "Design a feature for Instagram Stories", score: 8.5, date: "2 hours ago" },
    { type: "achievement", title: "Earned 'Peer Helper' badge", date: "1 day ago" },
    { type: "review", title: "Received peer review (4.5/5)", date: "2 days ago" },
    { type: "streak", title: "12-day practice streak!", date: "3 days ago" },
  ],
}

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    name: userProfile.name,
    email: userProfile.email,
    location: userProfile.location,
    bio: userProfile.bio,
  })

  const handleSave = () => {
    // Mock save functionality
    setIsEditing(false)
    console.log("Profile updated:", formData)
  }

  return (
    <div className="container py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="mb-8"
      >
        <h1 className="font-display font-bold text-3xl mb-4">Profile</h1>
        <p className="text-muted-foreground">Manage your account and track your progress</p>
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Profile Overview */}
        <div className="lg:col-span-1">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Card className="rounded-3xl border-2 modern-card">
              <CardContent className="p-8 text-center">
                <div className="relative mb-6">
                  <Avatar className="w-24 h-24 mx-auto rounded-3xl">
                    <AvatarImage src={userProfile.avatar || "/placeholder.svg"} alt={userProfile.name} />
                    <AvatarFallback className="rounded-3xl bg-gradient-to-br from-primary to-purple-500 text-white text-2xl font-bold">
                      {userProfile.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <Button
                    size="icon"
                    variant="outline"
                    className="absolute -bottom-2 -right-2 rounded-2xl w-8 h-8 bg-background shadow-lg"
                  >
                    <Camera className="h-4 w-4" />
                  </Button>
                </div>

                <div className="space-y-4">
                  <div>
                    <h2 className="font-display font-bold text-xl">{userProfile.name}</h2>
                    <p className="text-muted-foreground">{userProfile.email}</p>
                  </div>

                  <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      {userProfile.location}
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {userProfile.joinDate}
                    </div>
                  </div>

                  <p className="text-sm text-muted-foreground leading-relaxed">{userProfile.bio}</p>

                  <Button
                    onClick={() => setIsEditing(!isEditing)}
                    className="w-full rounded-2xl"
                    variant={isEditing ? "outline" : "default"}
                  >
                    <Edit3 className="h-4 w-4 mr-2" />
                    {isEditing ? "Cancel" : "Edit Profile"}
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card className="rounded-3xl border-2 modern-card mt-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="h-5 w-5" />
                  Quick Stats
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-muted/50 rounded-2xl">
                    <div className="font-bold text-lg text-primary">{userProfile.stats.questionsCompleted}</div>
                    <div className="text-xs text-muted-foreground">Questions</div>
                  </div>
                  <div className="text-center p-3 bg-muted/50 rounded-2xl">
                    <div className="font-bold text-lg text-primary">{userProfile.stats.averageScore}</div>
                    <div className="text-xs text-muted-foreground">Avg Score</div>
                  </div>
                  <div className="text-center p-3 bg-muted/50 rounded-2xl">
                    <div className="font-bold text-lg text-primary">#{userProfile.stats.rank}</div>
                    <div className="text-xs text-muted-foreground">Rank</div>
                  </div>
                  <div className="text-center p-3 bg-muted/50 rounded-2xl">
                    <div className="font-bold text-lg text-primary">{userProfile.stats.streak}</div>
                    <div className="text-xs text-muted-foreground">Day Streak</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-2">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-4 rounded-2xl bg-muted/50 p-1">
                <TabsTrigger value="overview" className="rounded-xl">
                  Overview
                </TabsTrigger>
                <TabsTrigger value="achievements" className="rounded-xl">
                  Achievements
                </TabsTrigger>
                <TabsTrigger value="activity" className="rounded-xl">
                  Activity
                </TabsTrigger>
                <TabsTrigger value="settings" className="rounded-xl">
                  Settings
                </TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6 mt-6">
                {isEditing ? (
                  <Card className="rounded-3xl border-2">
                    <CardHeader>
                      <CardTitle>Edit Profile</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">Full Name</Label>
                          <Input
                            id="name"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="rounded-xl"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <Input
                            id="email"
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="rounded-xl"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="location">Location</Label>
                        <Input
                          id="location"
                          value={formData.location}
                          onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                          className="rounded-xl"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="bio">Bio</Label>
                        <Textarea
                          id="bio"
                          value={formData.bio}
                          onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                          className="rounded-xl min-h-[100px]"
                        />
                      </div>
                      <div className="flex gap-2">
                        <Button onClick={handleSave} className="rounded-xl">
                          Save Changes
                        </Button>
                        <Button variant="outline" onClick={() => setIsEditing(false)} className="rounded-xl">
                          Cancel
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ) : (
                  <>
                    {/* Skill Progress */}
                    <Card className="rounded-3xl border-2 modern-card">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <TrendingUp className="h-5 w-5" />
                          Skill Progress
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-6">
                          {userProfile.skillProgress.map((skill) => (
                            <div key={skill.skill} className="space-y-2">
                              <div className="flex justify-between items-center">
                                <span className="font-medium">{skill.skill}</span>
                                <div className="flex items-center gap-2">
                                  <span className="font-bold">{skill.level}%</span>
                                  <Badge
                                    variant="outline"
                                    className="text-xs text-green-600 border-green-200 bg-green-50 rounded-xl"
                                  >
                                    {skill.trend}
                                  </Badge>
                                </div>
                              </div>
                              <Progress value={skill.level} className="h-3 rounded-full" />
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>

                    {/* Performance Chart Placeholder */}
                    <Card className="rounded-3xl border-2 modern-card">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Target className="h-5 w-5" />
                          Performance Overview
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="h-64 bg-muted/30 rounded-2xl flex items-center justify-center">
                          <div className="text-center">
                            <TrendingUp className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                            <p className="text-muted-foreground">Performance chart coming soon</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </>
                )}
              </TabsContent>

              <TabsContent value="achievements" className="space-y-6 mt-6">
                <Card className="rounded-3xl border-2 modern-card">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Award className="h-5 w-5" />
                      Achievements
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-4">
                      {userProfile.achievements.map((achievement) => (
                        <div
                          key={achievement.id}
                          className={`p-4 rounded-2xl border-2 transition-all duration-200 ${
                            achievement.earned ? "border-primary/20 bg-primary/5" : "border-muted bg-muted/30"
                          }`}
                        >
                          <div className="flex items-start gap-3">
                            <div
                              className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
                                achievement.earned
                                  ? "bg-gradient-to-br from-primary to-purple-500 text-white"
                                  : "bg-muted text-muted-foreground"
                              }`}
                            >
                              <Award className="h-6 w-6" />
                            </div>
                            <div className="flex-1">
                              <h4 className="font-semibold mb-1">{achievement.title}</h4>
                              <p className="text-sm text-muted-foreground mb-2">{achievement.description}</p>
                              {achievement.earned && achievement.date && (
                                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                  <CheckCircle className="h-3 w-3 text-green-500" />
                                  Earned on {achievement.date}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="activity" className="space-y-6 mt-6">
                <Card className="rounded-3xl border-2 modern-card">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Clock className="h-5 w-5" />
                      Recent Activity
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {userProfile.recentActivity.map((activity, index) => (
                        <div key={index} className="flex items-center gap-4 p-4 bg-muted/30 rounded-2xl">
                          <div className="w-10 h-10 bg-primary/10 rounded-2xl flex items-center justify-center">
                            {activity.type === "question" && <BookOpen className="h-5 w-5 text-primary" />}
                            {activity.type === "achievement" && <Award className="h-5 w-5 text-primary" />}
                            {activity.type === "review" && <Users className="h-5 w-5 text-primary" />}
                            {activity.type === "streak" && <Zap className="h-5 w-5 text-primary" />}
                          </div>
                          <div className="flex-1">
                            <p className="font-medium">{activity.title}</p>
                            <p className="text-sm text-muted-foreground">{activity.date}</p>
                          </div>
                          {"score" in activity && (
                            <Badge variant="outline" className="rounded-xl">
                              {activity.score}/10
                            </Badge>
                          )}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="settings" className="space-y-6 mt-6">
                <Card className="rounded-3xl border-2 modern-card">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Settings className="h-5 w-5" />
                      Account Settings
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 bg-muted/30 rounded-2xl">
                        <div className="flex items-center gap-3">
                          <Bell className="h-5 w-5 text-muted-foreground" />
                          <div>
                            <p className="font-medium">Email Notifications</p>
                            <p className="text-sm text-muted-foreground">Receive updates about your progress</p>
                          </div>
                        </div>
                        <Button variant="outline" size="sm" className="rounded-xl bg-transparent">
                          Configure
                        </Button>
                      </div>

                      <div className="flex items-center justify-between p-4 bg-muted/30 rounded-2xl">
                        <div className="flex items-center gap-3">
                          <Shield className="h-5 w-5 text-muted-foreground" />
                          <div>
                            <p className="font-medium">Privacy Settings</p>
                            <p className="text-sm text-muted-foreground">Control your data and visibility</p>
                          </div>
                        </div>
                        <Button variant="outline" size="sm" className="rounded-xl bg-transparent">
                          Manage
                        </Button>
                      </div>

                      <div className="flex items-center justify-between p-4 bg-muted/30 rounded-2xl">
                        <div className="flex items-center gap-3">
                          <User className="h-5 w-5 text-muted-foreground" />
                          <div>
                            <p className="font-medium">Account Data</p>
                            <p className="text-sm text-muted-foreground">Download or delete your data</p>
                          </div>
                        </div>
                        <Button variant="outline" size="sm" className="rounded-xl bg-transparent">
                          Export
                        </Button>
                      </div>
                    </div>

                    <div className="pt-6 border-t">
                      <Button variant="destructive" className="rounded-xl">
                        Delete Account
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
