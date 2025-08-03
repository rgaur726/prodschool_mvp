# ProdSchool - PM Interview Practice Platform

A comprehensive platform for product management interview preparation with AI-powered feedback, peer reviews, and structured practice sessions.

## Features

- **Practice Questions**: 150+ real PM interview questions from top tech companies
- **AI Feedback**: Instant, detailed feedback on your responses
- **Peer Reviews**: Community-driven review system
- **Video Library**: Expert tutorials and walkthroughs
- **Daily Drills**: Gamified daily practice sessions
- **Progress Tracking**: Detailed analytics and improvement insights
- **Workspace**: Focused practice environment with timer
- **Mobile Responsive**: Works seamlessly on all devices

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui + Radix UI
- **Icons**: Lucide React
- **Animations**: Framer Motion
- **Fonts**: Space Grotesk (display) + Inter (body)

## Getting Started

1. **Clone the repository**
   \`\`\`bash
   git clone https://github.com/your-username/prodschool-platform.git
   cd prodschool-platform
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm install
   \`\`\`

3. **Run the development server**
   \`\`\`bash
   npm run dev
   \`\`\`

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Project Structure

\`\`\`
├── app/                    # Next.js app directory
│   ├── (auth)/            # Authentication pages
│   ├── app/               # Protected app pages
│   ├── globals.css        # Global styles
│   └── layout.tsx         # Root layout
├── components/            # Reusable components
│   └── ui/               # UI components
├── lib/                  # Utilities and mock data
│   ├── fonts.ts          # Font configurations
│   ├── mock-data.ts      # Mock data for development
│   └── utils.ts          # Utility functions
├── public/               # Static assets
└── tailwind.config.js    # Tailwind configuration
\`\`\`

## Key Pages

- **Home** (`/`): Landing page with hero, metrics, marquees, and features
- **Questions** (`/questions`): Searchable question library with filters
- **Videos** (`/videos`): Video tutorial library
- **AI Feedback** (`/ai-feedback`): AI feedback showcase and insights
- **Pricing** (`/pricing`): Subscription plans and pricing
- **Dashboard** (`/app/dashboard`): User dashboard with progress tracking
- **Daily Drill** (`/app/daily-drill`): Gamified daily practice
- **Workspace** (`/app/workspace`): Focused practice environment
- **Review** (`/app/review`): Performance analysis and feedback

## Design System

### Typography
- **Display Font**: Space Grotesk (600-800 weight for headlines)
- **Body Font**: Inter (400-500 weight for body text and UI)

### Colors
Uses the existing template's color palette with CSS custom properties:
- Primary: Blue-based accent color
- Secondary: Neutral grays
- Muted: Subtle background colors
- Destructive: Error/warning states

### Components
- Collapsible question cards with "Hide Prompt" toggle
- Timer component with start/pause/reset functionality
- Marquee components for testimonials and hot questions
- Dynamic background with floating shapes
- Responsive navigation with bottom tab bar on mobile
- Skeleton loaders for better UX

## Development

### Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint issues
- `npm run format` - Format code with Prettier
- `npm run type-check` - Run TypeScript type checking

### Code Quality
- ESLint for code linting
- Prettier for code formatting
- Husky for pre-commit hooks
- TypeScript for type safety

## Responsive Design

- **Desktop-first approach** with mobile adaptations
- **Breakpoints**: sm (640px), md (768px), lg (1024px), xl (1280px)
- **Mobile navigation**: Bottom tab bar for app pages (≤640px)
- **Collapsible elements**: Cards and menus adapt to screen size

## Performance

- **Lighthouse targets**: Performance ≥90, Accessibility ≥95
- **Optimizations**: Image optimization, code splitting, lazy loading
- **Animations**: Reduced motion support for accessibility

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
