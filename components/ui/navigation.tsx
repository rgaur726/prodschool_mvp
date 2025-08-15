"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Home,
  HelpCircle,
  Play,
  Brain,
  CreditCard,
  Clock,
  User,
  Menu,
  X,
  Settings,
  LogOut,
  UserCircle,
  MessageSquare,
} from "lucide-react"
import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { supabase } from "@/lib/supabase-client"
import { Loader2 } from "lucide-react"

const navigation = [
  { name: "Home", href: "/", icon: Home },
  { name: "Questions", href: "/questions", icon: HelpCircle },
  { name: "Videos", href: "/videos", icon: Play },
  { name: "Community", href: "/community", icon: MessageSquare },
  { name: "AI Feedback", href: "/ai-feedback", icon: Brain },
  { name: "Pricing", href: "/pricing", icon: CreditCard },
]

const appNavigation = [
  { name: "Dashboard", href: "/app/dashboard", icon: Home },
  { name: "Daily Drill", href: "/app/daily-drill", icon: Clock },
  { name: "Workspace", href: "/app/workspace", icon: HelpCircle },
  { name: "Review", href: "/app/review", icon: Brain },
  { name: "Community", href: "/community", icon: MessageSquare },
]

export function MainNavigation() {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [authModalOpen, setAuthModalOpen] = useState(false)
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin')
  // Replace route-based mock login
  const [user, setUser] = useState<any>(null)
  const [authLoading, setAuthLoading] = useState(false)
  const [googleLoading, setGoogleLoading] = useState(false)

  // Semi-sticky (auto-hide on scroll down, reveal on scroll up)
  const [hidden, setHidden] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    let lastY = window.scrollY
    let ticking = false
    const HIDE_DELTA = 2 // minimal downward movement to hide
    const SHOW_DELTA = 2  // minimal upward movement to show

    const onScroll = () => {
      const current = window.scrollY
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrolled(current > 40)
          const diff = current - lastY

            // Always show near very top
          if (current < 60) {
            setHidden(false)
          } else {
            if (diff > HIDE_DELTA) {
              setHidden(true)
            } else if (diff < -SHOW_DELTA) {
              setHidden(false)
            }
          }

          lastY = current
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!supabase) return
    supabase.auth.getSession().then(({ data }) => setUser(data.session?.user || null))
    const { data: sub } = supabase.auth.onAuthStateChange((_evt, session) => {
      setUser(session?.user || null)
    })
    return () => { sub?.subscription.unsubscribe() }
  }, [])

  const navItems = user ? appNavigation : navigation

  return (
    <>
      <header className={cn(
        "fixed top-0 left-0 right-0 z-50 w-full border-b backdrop-blur-xl transition-all duration-200",
        hidden ? "opacity-0" : "opacity-100",
        scrolled ? "bg-background/60 supports-[backdrop-filter]:bg-background/50 shadow-sm" : "bg-background/80 supports-[backdrop-filter]:bg-background/60"
      )}>
        <div className="container flex h-20 items-center justify-between">
          {/* Left: Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="relative">
              <div className="h-10 w-10 rounded-2xl app-gradient flex items-center justify-center shadow-lg">
                <svg className="h-6 w-6 text-primary-foreground" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                </svg>
              </div>
              <div className="absolute -top-1 -right-1 h-4 w-4 bg-green-500 rounded-full border-2 border-background animate-pulse" />
            </div>
            <div>
              <span className="font-display font-bold text-xl gradient-text">ProdSchool</span>
              <div className="text-xs text-muted-foreground -mt-1">AI-Powered</div>
            </div>
          </Link>

          {/* Center: Navigation */}
          <nav className="hidden lg:flex items-center space-x-1 bg-muted/50 rounded-2xl py-1.5 px-2.5 backdrop-blur-sm mx-6">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200",
                  pathname === item.href || (item.href === "/community" && pathname.startsWith("/community"))
                    ? "bg-background text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground hover:bg-background/50",
                )}
              >
                <item.icon className="h-4 w-4" />
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Right: Actions */}
          <div className="flex items-center gap-2">
            {!user ? (
              <>
                {/* Single Get Started button triggers modal */}
                <Button
                  className="rounded-xl app-gradient hover:brightness-110 shadow-lg px-5 text-primary-foreground"
                  onClick={() => {
                    setAuthMode('signin');
                    setAuthModalOpen(true);
                  }}
                >
                  Get Started
                </Button>
              </>
            ) : (
              <div className="flex items-center gap-2">
                <Link href="/app/profile" className="focus:outline-none">
                  <Button variant="ghost" className="relative h-10 w-10 rounded-2xl">
                    <Avatar className="h-10 w-10 rounded-2xl">
                      <AvatarImage src="/placeholder.svg?height=40&width=40" alt="User" />
                      <AvatarFallback className="rounded-2xl app-gradient text-primary-foreground">
                        {user?.user_metadata?.full_name?.[0]?.toUpperCase() || user?.email?.[0]?.toUpperCase() || 'U'}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  size="sm"
                  className="rounded-xl"
                  onClick={async () => { await supabase?.auth.signOut(); setAuthModalOpen(false); }}
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Sign Out
                </Button>
              </div>
            )}

            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden rounded-xl"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>


        </div>
        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t bg-background/95 backdrop-blur-xl">
            <div className="container py-6 space-y-3">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-medium transition-colors",
                    pathname === item.href || (item.href === "/community" && pathname.startsWith("/community"))
                      ? "bg-primary/10 text-primary border border-primary/20"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/50",
                  )}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <item.icon className="h-5 w-5" />
                  {item.name}
                </Link>
              ))}
              {!user && (
                <div className="pt-4 border-t space-y-3">
                  <Button variant="ghost" asChild className="w-full justify-start rounded-2xl">
                    <Link href="/auth" onClick={() => setMobileMenuOpen(false)}>
                      Sign In
                    </Link>
                  </Button>
                  <Button asChild className="w-full rounded-2xl">
                    <Link href="/auth" onClick={() => setMobileMenuOpen(false)}>
                      Get Started
                    </Link>
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}
        {/* Auth Modal */}
        <Dialog open={authModalOpen} onOpenChange={setAuthModalOpen}>
          <DialogContent className="sm:max-w-md rounded-2xl p-0 overflow-hidden border-0 shadow-2xl bg-gradient-to-br from-background via-background to-primary/10">
            {/* Decorative gradient bar */}
            <div className="h-1 w-full bg-gradient-to-r from-primary via-fuchsia-500 to-cyan-400" />
            <div className="p-6 space-y-6">
              <DialogHeader className="space-y-2">
                <DialogTitle className="text-2xl font-display bg-gradient-to-r from-primary via-fuchsia-500 to-cyan-500 bg-clip-text text-transparent">
                  {authMode === 'signin' ? 'Welcome Back' : 'Join ProdSchool'}
                </DialogTitle>
                <DialogDescription className="text-sm">
                  {authMode === 'signin'
                    ? 'Sign in to continue practicing and tracking your progress.'
                    : 'Create an account to unlock AI-powered PM interview prep.'}
                </DialogDescription>
              </DialogHeader>

              {/* Social Auth */}
              <div className="space-y-4">
                <Button
                  type="button"
                  variant="outline"
                  className="w-full gap-3 relative group border border-primary/20 bg-background/60 backdrop-blur supports-[backdrop-filter]:bg-background/40 hover:border-primary/40 hover:bg-primary/5 transition-all disabled:opacity-70"
                  disabled={googleLoading}
                  onClick={async () => {
                    if (!supabase) { alert('Auth unavailable'); return }
                    try {
                      setGoogleLoading(true)
                      const origin = window.location.origin
                      const callback = `${origin}/auth/callback`
                      const { error } = await supabase.auth.signInWithOAuth({
                        provider: 'google',
                        options: {
                          redirectTo: callback,
                          queryParams: { access_type: 'offline', prompt: 'consent' },
                        },
                      })
                      console.log('[Google OAuth] Redirect initiated to', callback)
                      if (error) {
                        alert(error.message)
                        setGoogleLoading(false)
                      }
                      // On success, browser will redirect.
                    } catch (e: any) {
                      alert(e.message || 'Google sign-in failed')
                      setGoogleLoading(false)
                    }
                  }}
                >
                  <span className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-r from-primary/10 via-fuchsia-500/10 to-cyan-400/10" />
                  {googleLoading ? (
                    <Loader2 className="h-5 w-5 animate-spin relative" />
                  ) : (
                    <svg className="h-5 w-5 relative" viewBox="0 0 48 48" aria-hidden="true">
                      <path fill="#EA4335" d="M24 9.5c3.54 0 6 1.54 7.38 2.84l5.4-5.26C33.66 3.64 29.3 2 24 2 14.82 2 7.09 7.64 3.69 15.26l6.57 5.1C12.17 13.49 17.56 9.5 24 9.5Z" />
                      <path fill="#4285F4" d="M46.11 24.55c0-1.57-.14-2.72-.44-3.91H24v7.09h12.7c-.26 1.8-1.67 4.49-4.8 6.3l7.39 5.73c4.42-4.09 6.82-10.11 6.82-15.21Z" />
                      <path fill="#FBBC05" d="M10.26 28.15A14.38 14.38 0 0 1 9.5 24c0-1.44.26-2.84.73-4.15l-6.57-5.1A22.004 22.004 0 0 0 2 24c0 3.59.86 6.98 2.66 10.24l6.6-6.09Z" />
                      <path fill="#34A853" d="M24 46c5.84 0 10.74-1.9 14.32-5.18l-7.39-5.73c-1.98 1.2-4.65 2.04-6.93 2.04-5.29 0-9.8-3.56-11.41-8.51l-6.6 6.09C10.89 41.56 17.02 46 24 46Z" />
                      <path fill="none" d="M2 2h44v44H2Z" />
                    </svg>
                  )}
                  <span className="relative font-medium">{googleLoading ? 'Redirecting...' : 'Continue with Google'}</span>
                </Button>
                <div className="flex items-center gap-4">
                  <Separator className="flex-1" />
                  <span className="text-[10px] tracking-wider font-medium text-muted-foreground uppercase">Email</span>
                  <Separator className="flex-1" />
                </div>
              </div>

              {/* Email Auth Form */}
              <form
                onSubmit={async (e) => {
                  e.preventDefault()
                  if (!supabase) { alert('Auth temporarily unavailable: Supabase not configured.'); return }
                  setAuthLoading(true)
                  const form = e.currentTarget
                  const emailEl = form.querySelector('#email') as HTMLInputElement | null
                  const passEl = form.querySelector('#password') as HTMLInputElement | null
                  const nameInput = form.querySelector('#name') as HTMLInputElement | null
                  const email = emailEl?.value.trim() || ''
                  const password = passEl?.value || ''
                  if (!email || !password) { setAuthLoading(false); return }

                  if (authMode === 'signup') {
                    const { data, error: signUpError } = await supabase.auth.signUp({
                      email,
                      password,
                      options: { data: { full_name: nameInput?.value } }
                    })
                    if (signUpError) {
                      if (signUpError.message.toLowerCase().includes('registered')) {
                        alert('Account already exists. Please sign in.')
                        setAuthMode('signin')
                      } else {
                        alert(signUpError.message)
                      }
                      setAuthLoading(false)
                      return
                    }
                    alert('Check your email to confirm your account.')
                    setAuthModalOpen(false)
                  } else {
                    const { error: signInError } = await supabase.auth.signInWithPassword({ email, password })
                    if (signInError) {
                      alert(signInError.message)
                      setAuthLoading(false)
                      return
                    }
                    setAuthModalOpen(false)
                  }
                  setAuthLoading(false)
                }}
                className="space-y-4"
              >
                {authMode === 'signup' && (
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" placeholder="Your full name" required />
                  </div>
                )}
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="you@example.com" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input id="password" type="password" placeholder="••••••••" required />
                </div>
                <Button type="submit" className="w-full shadow-md shadow-primary/20" disabled={authLoading}>
                  {authLoading ? 'Please wait...' : authMode === 'signin' ? 'Sign In' : 'Create Account'}
                </Button>
              </form>
              <div className="text-sm text-center pt-1">
                {authMode === 'signin' ? (
                  <button
                    type="button"
                    onClick={() => setAuthMode('signup')}
                    className="text-primary underline-offset-4 hover:underline"
                  >
                    Need an account? Sign up
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => setAuthMode('signin')}
                    className="text-primary underline-offset-4 hover:underline"
                  >
                    Already have an account? Sign in
                  </button>
                )}
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </header>
      <div className="h-20" />
    </>
  )
}

export function BottomTabBar() {
  const pathname = usePathname()

  if (!pathname.startsWith("/app")) return null

  return (
    <div className="sm:hidden fixed bottom-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-t">
      <div className="flex items-center justify-around py-3 px-2">
        {appNavigation.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex flex-col items-center gap-1 px-3 py-2 rounded-2xl text-xs font-medium transition-all duration-200 min-w-0",
              pathname === item.href || (item.href === "/community" && pathname.startsWith("/community"))
                ? "text-primary bg-primary/10"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            <item.icon className="h-5 w-5" />
            <span className="truncate">{item.name}</span>
          </Link>
        ))}
      </div>
    </div>
  )
}
