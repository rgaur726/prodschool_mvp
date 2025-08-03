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
import { useState } from "react"

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
  const isAppRoute = pathname.startsWith("/app")
  const isLoggedIn = isAppRoute // Mock logged in state

  const navItems = isAppRoute ? appNavigation : navigation

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-20 items-center justify-between">
        {/* Left: Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="relative">
            <div className="h-10 w-10 rounded-2xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-lg">
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
        <nav className="hidden lg:flex items-center space-x-1 bg-muted/50 rounded-2xl p-2 backdrop-blur-sm mx-8 flex-1 justify-center">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200",
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
          {!isLoggedIn ? (
            <>
              <Button variant="ghost" asChild className="hidden md:inline-flex rounded-xl px-4">
                <Link href="/auth">Sign In</Link>
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button className="rounded-xl bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-lg px-4">
                    Get Started
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48 rounded-2xl">
                  <DropdownMenuItem asChild>
                    <Link href="/auth" className="cursor-pointer">
                      <UserCircle className="h-4 w-4 mr-2" />
                      Sign Up
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/app/profile" className="cursor-pointer">
                      <User className="h-4 w-4 mr-2" />
                      View Profile
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-2xl">
                  <Avatar className="h-10 w-10 rounded-2xl">
                    <AvatarImage src="/placeholder.svg?height=40&width=40" alt="User" />
                    <AvatarFallback className="rounded-2xl bg-gradient-to-br from-primary to-primary/80 text-primary-foreground">
                      JD
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 rounded-2xl">
                <DropdownMenuItem asChild>
                  <Link href="/app/profile" className="cursor-pointer">
                    <User className="h-4 w-4 mr-2" />
                    Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/app/settings" className="cursor-pointer">
                    <Settings className="h-4 w-4 mr-2" />
                    Settings
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer text-destructive">
                  <LogOut className="h-4 w-4 mr-2" />
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
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
            {!isLoggedIn && (
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
    </header>
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
