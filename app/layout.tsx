import "./globals.css"
import { inter, spaceGrotesk } from "@/lib/fonts"
import { ThemeProvider } from "@/components/theme-provider"
import type React from "react"

export const metadata = {
  title: "ProdSchool - Master PM Interviews",
  description: "Practice product management interviews with AI feedback and peer reviews",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${spaceGrotesk.variable}`}>
  <body className="min-h-screen bg-background text-foreground font-body antialiased font-medium">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
