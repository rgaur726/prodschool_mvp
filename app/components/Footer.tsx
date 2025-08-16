import Link from "next/link"
import { Linkedin, Twitter, Youtube } from "lucide-react"

const productLinks = [
  { label: "Questions", href: "/questions" },
  { label: "Videos", href: "/videos" },
  { label: "Community", href: "/community" },
  { label: "AI Feedback", href: "/ai-feedback" },
  { label: "Pricing", href: "/pricing" },
]

// App links removed per latest request

const companyLinks = [
  { label: "About", href: "/coming-soon" },
  { label: "Contact", href: "/coming-soon" },
  { label: "Careers", href: "/coming-soon" },
  { label: "Blog", href: "/coming-soon" },
]

const legalLinks = [
  { label: "Privacy", href: "/coming-soon" },
  { label: "Terms", href: "/coming-soon" },
  { label: "Security", href: "/coming-soon" },
]

const socialLinks = [
  { label: "LinkedIn", href: "https://www.linkedin.com", external: true, icon: Linkedin },
  { label: "Twitter/X", href: "https://x.com", external: true, icon: Twitter },
  { label: "YouTube", href: "https://www.youtube.com", external: true, icon: Youtube },
]

const year = new Date().getFullYear()

export default function Footer() {
  return (
    <footer className="mt-24 bg-background/70 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-t border-border/70">
      <div className="mx-auto max-w-7xl px-6 py-16 md:py-20 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-12">
          {/* Brand + Mission */}
          <div className="lg:col-span-4 space-y-5">
            <Link href="/" className="flex items-center gap-3 group w-fit">
              <div className="relative">
                <div className="h-10 w-10 rounded-2xl app-gradient flex items-center justify-center shadow-lg transition-transform group-hover:scale-105">
                  <svg className="h-6 w-6 text-primary-foreground" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                  </svg>
                </div>
                <div className="absolute -top-1 -right-1 h-4 w-4 bg-green-500 rounded-full border-2 border-background animate-pulse" />
              </div>
              <div className="hidden sm:block">
                <span className="font-display font-bold text-xl gradient-text leading-none">ProdSchool</span>
                <div className="text-[10px] tracking-wide text-muted-foreground -mt-0.5">AI-Powered</div>
              </div>
            </Link>
            <p className="text-sm leading-relaxed text-muted-foreground max-w-xs">
              Master product management interviews with structured drills, real PM insights, and AI-powered feedback — all in one focused workspace.
            </p>
            <div className="flex flex-wrap gap-3 pt-1">
              {socialLinks.map((s) => {
                const Icon = s.icon
                return (
                  <Link
                    key={s.label}
                    href={s.href}
                    target={s.external ? "_blank" : undefined}
                    rel={s.external ? "noopener noreferrer" : undefined}
                    className="inline-flex items-center gap-1.5 text-xs font-medium rounded-full border border-border/60 pl-2 pr-3 py-1.5 text-muted-foreground hover:text-foreground hover:border-primary/40 hover:bg-primary/5 transition-colors"
                  >
                    <Icon className="h-3.5 w-3.5" />
                    {s.label}
                  </Link>
                )
              })}
            </div>
          </div>

          {/* Link Columns */}
          <div className="lg:col-span-8 grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-10 text-sm">
            <FooterGroup title="Product" links={productLinks} />
            <FooterGroup title="Company" links={companyLinks} />
            <FooterGroup title="Legal" links={legalLinks} />
          </div>
        </div>

        <div className="mt-14 border-t border-border/60 pt-6 flex flex-col sm:flex-row gap-4 items-center justify-between text-xs text-muted-foreground">
          <p>&copy; {year} ProdSchool. All rights reserved.</p>
          <p className="hidden sm:block">Built for ambitious Product Managers.</p>
        </div>
      </div>
    </footer>
  )
}

function FooterGroup({ title, links }: { title: string; links: { label: string; href: string; external?: boolean }[] }) {
  return (
    <div className="space-y-4">
      <h3 className="text-xs uppercase tracking-wider font-semibold text-muted-foreground/80">{title}</h3>
      <ul className="space-y-2">
        {links.map((l) => (
          <li key={l.label}>
            <Link
              href={l.href}
              target={l.external ? "_blank" : undefined}
              rel={l.external ? "noopener noreferrer" : undefined}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
