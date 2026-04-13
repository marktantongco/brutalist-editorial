# The Living Word — Interactive Bible Study Seminar

A cinematic, scroll-driven interactive web experience presenting a **12-week Bible study seminar framework** for the Filipino Christian community. Built with Next.js 16, GSAP 3, Tailwind CSS 4, and a neo-brutalist editorial design system.

[![Live on Vercel](https://img.shields.io/badge/Live-Vercel-000?style=flat-square&logo=vercel)](https://brutalist-editorial.vercel.app)
[![GitHub Pages](https://img.shields.io/badge/GitHub-Pages-000?style=flat-square&logo=github)](https://marktantongco.github.io/brutalist-editorial)
[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![GSAP](https://img.shields.io/badge/GSAP-3.14-88CE02?style=flat-square)](https://gsap.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?style=flat-square&logo=tailwindcss)](https://tailwindcss.com/)

---

## Overview

**The Living Word** is a comprehensive 12-week program designed to equip Filipino Christian believers at every stage of spiritual maturity to know God deeply through His attributes, character, and abiding presence. This web app transforms the seminar framework document into an immersive, scroll-driven editorial experience with cinematic animations and interactive infographics.

The seminar uses the **SOAP inductive Bible study method** (Scripture, Observation, Application, Prayer) and a **4-Pillar Architecture** (Encounter, Exegesis, Examination, Expression) that mirrors the natural rhythm of spiritual growth.

## Live Demos

| Platform | URL |
|----------|-----|
| **Vercel** | [brutalist-editorial.vercel.app](https://brutalist-editorial.vercel.app) |
| **GitHub Pages** | [marktantongco.github.io/brutalist-editorial](https://marktantongco.github.io/brutalist-editorial) |

---

## Features

### Content Sections (12 total)
- **Cinematic Hero** — Clip-path text reveal ("The Living Word"), rotating Scripture verse carousel (Psalm 119:18, James 1:22, 2 Timothy 2:2, 2 Timothy 3:16), elastic cross corner accents, animated stats
- **Sticky Navigation** — Floating nav with scroll-linked opacity and underline hover animations
- **Executive Summary** — 3-column layout with staggered paragraph reveals and quick facts sidebar
- **4-Pillar Architecture** — Interactive expandable cards (Encounter/Exegesis/Examination/Expression) with animated session time allocation progress bar
- **12-Week Journey Map** — 4 phase overview cards + full 12-week grid with parallax depth
- **Session Structure Template** — Animated visual template with time bar (GSAP scaleX), numbered steps, homework section
- **Core Methodology** — 6 distinctive cards with Scripture references (Spirit-Dependence, Text-Centered Authority, SOAP, Whole-Life Integration, Communal Discernment, Multiplication-Minded)
- **Success Metrics Dashboard** — 6 animated counters + SVG donut chart + bar chart
- **Adaptation Framework** — Interactive filter buttons (Youth/Senior/New Believers/Leadership/Recovery) with fade transitions
- **Essential Resources** — 6 resource cards (Study Bible, SOAP Journal, Cross-Reference Tools, etc.)
- **Commissioning CTA** — 2 Timothy 2:2 benediction with clip-path title reveal + magnetic buttons
- **Footer** — Clean footer with section navigation

### GSAP Cinematic Animations
- **Clip-path text reveals** — Cinematic wipe-in for hero headlines
- **Elastic spring physics** — Cross corner accents with elastic.out easing
- **Scroll-scrubbed parallax** — Depth effect on journey map grid
- **Staggered element entrances** — Directional reveals (up/down/left/right) across all sections
- **Rotating verse carousel** — Auto-cycling Scripture quotes with crossfade
- **Animated progress bars** — GSAP scaleX for session time allocation
- **Magnetic buttons** — Cursor-following button interactions with elastic snap-back

### Infographic Visualizations
- **Animated number counters** — Scroll-triggered counting for metrics (90% retention, 80% participation, etc.)
- **SVG donut chart** — Session time allocation visualization
- **Bar chart** — Target achievement rates with staggered bar reveals
- **Interactive expandable cards** — Click-to-reveal pillar details

### Speed Optimization
- **Dynamic imports** — 6 below-fold sections lazy-loaded with Suspense
- **CSS `contain: layout style paint`** — Rendering isolation on all sections
- **`once: true` ScrollTriggers** — No repeat animation computations
- **Skeleton loading states** — Shimmer placeholders during lazy load
- **`display: swap` fonts** — Prevents Flash of Invisible Text (FOIT)

### Accessibility
- **`prefers-reduced-motion`** — Disables all animations for motion-sensitive users
- **Focus-visible outlines** — 3px yellow outline for keyboard navigation
- **Semantic HTML** — Proper heading hierarchy, landmarks, ARIA labels
- **Print styles** — Clean print layout with hidden overlays

---

## Architecture

```
src/
├── app/
│   ├── globals.css              # Design system tokens + seminar styles
│   ├── layout.tsx               # Root layout, SEO metadata, structured data
│   └── page.tsx                 # Page composition + cinematic animations
├── components/
│   ├── brutalist/               # 12 reusable animation components
│   │   ├── index.ts             # Barrel export
│   │   ├── ScrollReveal.tsx     # Scroll-triggered entrance wrapper
│   │   ├── ParallaxSection.tsx  # Scroll-linked depth parallax
│   │   ├── KineticTypography.tsx # Clip/split/fade text reveals
│   │   ├── InfographicCounter.tsx # Animated number counters
│   │   ├── MarqueeStrip.tsx     # Infinite horizontal ticker
│   │   ├── BrutalistCard.tsx    # GSAP hover/press card
│   │   ├── TimelineSection.tsx  # Scroll-driven narrative timeline
│   │   ├── AnimatedChart.tsx    # SVG bar + donut charts
│   │   ├── CustomCursor.tsx     # Mix-blend-mode cursor dot
│   │   ├── GrainOverlay.tsx     # Film grain texture
│   │   ├── TextScramble.tsx     # Hacker-style text scramble effect
│   │   ├── MagneticButton.tsx   # Cursor-following magnetic button
│   │   └── SmoothScroll.tsx     # GSAP ScrollToPlugin wrapper
│   ├── seminar/
│   │   └── data.ts             # Living Word content data layer
│   └── ui/                      # shadcn/ui base components
├── lib/
│   ├── gsap-setup.ts           # GSAP + ScrollTrigger + ScrollToPlugin
│   └── utils.ts                # Utility functions
└── prisma/
```

---

## Design System

### Color Palette (powerUP Brand)

| Token | Value | Usage |
|-------|-------|-------|
| `--pu-yellow` | `#FFEA00` | Primary accent, badges, highlights |
| `--pu-red` | `#CC0000` | Secondary accent, scripture refs, dots |
| `--pu-black` | `#0A0A0A` | Primary text, borders, dark background |
| `--pu-white` | `#FAFAFA` | Light background, inverted text |
| `--pu-dark` | `#1A1A1A` | Card backgrounds in dark mode |
| `--pu-gray` | `#888888` | Muted text, tertiary accents |

### Typography

- **Display**: Syne (sans-serif) — 400-800 weights, uppercase headings, tight leading
- **Mono**: Space Mono (monospace) — 400-700 weights, labels, metadata, code
- **Headings**: 900 weight, `text-transform: uppercase`, `letter-spacing: -0.03em`, `line-height: 0.92`
- **Body**: 400 weight, relaxed `line-height: 1.6`

### CSS Utilities

```css
.text-stroke           /* 2px outline text, transparent fill */
.text-stroke-thick     /* 3px outline text */
.text-fill-yellow      /* Yellow fill on stroked text */
.text-fill-red         /* Red fill on stroked text */
.label-tag             /* Yellow badge with mono font */
.grid-overlay          /* Subtle grid lines background */
.grain-overlay         /* Film grain texture (fixed, pointer-events: none) */
.hr-accent             /* 3px black horizontal rule */
.hr-accent-yellow      /* 3px yellow horizontal rule */
```

---

## Reusable Components

### ScrollReveal
Scroll-triggered entrance animation wrapper. Supports 4 directions and stagger.

```tsx
import { ScrollReveal } from '@/components/brutalist';

<ScrollReveal direction="up" delay={0.2} stagger={0.1}>
  <div className="reveal-child">Item 1</div>
  <div className="reveal-child">Item 2</div>
</ScrollReveal>
```

**Props**: `direction` (up/down/left/right), `delay`, `duration`, `stagger`, `once`, `className`

### InfographicCounter
Animated number counter triggered on scroll.

```tsx
import { InfographicCounter } from '@/components/brutalist';

<InfographicCounter target={90} suffix="%" label="Retention" />
```

**Props**: `target`, `suffix`, `prefix`, `label`, `className`

### BrutalistCard
Hard-edged card with GSAP hover/press micro-interactions.

```tsx
import { BrutalistCard } from '@/components/brutalist';

<BrutalistCard hoverShadow="8px 8px 0px #FFEA00">
  <div className="p-6">
    <h3>Card Title</h3>
    <p>Content here.</p>
  </div>
</BrutalistCard>
```

**Props**: `hoverShadow`, `borderColor`, `className`

### AnimatedBarChart & AnimatedDonut
SVG charts that animate on scroll.

```tsx
import { AnimatedBarChart, AnimatedDonut } from '@/components/brutalist';

<AnimatedBarChart data={[
  { label: 'A', value: 92, color: '#FFEA00' },
]} />

<AnimatedDonut segments={[
  { label: 'A', value: 35, color: '#CC0000' },
]} size={220} />
```

### KineticTypography
Animated headline with three reveal modes: clip-path wipe, split-word 3D, and fade.

```tsx
import { KineticTypography } from '@/components/brutalist';

<KineticTypography text="Hello World" tag="h1" revealType="clip" />
<KineticTypography text="Split Words" tag="h2" revealType="split" />
```

### MarqueeStrip
Infinite horizontal scrolling ticker.

```tsx
import { MarqueeStrip } from '@/components/brutalist';

<MarqueeStrip items={['LIVING WORD', 'SCRIPTURE', 'SOAP']} speed={35} />
```

### TextScramble
Hacker-style text scramble effect triggered by IntersectionObserver.

```tsx
import { TextScramble } from '@/components/brutalist';

<TextScramble text="Knowing God Through Scripture" className="font-mono text-sm" />
```

### MagneticButton
Cursor-following button with elastic snap-back.

```tsx
import { MagneticButton } from '@/components/brutalist';

<MagneticButton className="border-2 border-black bg-yellow px-6 py-3">
  Explore
</MagneticButton>
```

### TimelineSection
Vertical scroll-driven narrative timeline with animated line growth.

```tsx
import { TimelineSection } from '@/components/brutalist';

<TimelineSection items={[
  { year: 'Week 1', title: 'God is Spirit', description: 'John 4:21-24' },
]} />
```

---

## Data Layer

All seminar content lives in `src/components/seminar/data.ts`. Edit these exports to customize:

| Export | Type | Purpose |
|--------|------|---------|
| `SEMINAR_META` | Object | Title, subtitle, format details |
| `HERO_STATS` | Array | Quick stat counters in hero |
| `MARQUEE_ITEMS` | string[] | Ticker strip words/phrases |
| `FOUR_PILLARS` | Array | 4-Pillar content (title, description, points) |
| `PHASES` | Array | 4 journey phases (Foundation/Formation/Function/Fruit) |
| `WEEKLY_JOURNEY` | Array | 12-week breakdown (theme, scripture, focus) |
| `SESSION_STRUCTURE` | Array | Session template (steps per pillar) |
| `METHODOLOGY` | Array | 6 core distinctives |
| `SUCCESS_METRICS` | Array | Animated counter targets |
| `METRIC_DONUT` | Array | Donut chart segments |
| `ADAPTATION_CONTEXTS` | Array | 5 adaptation contexts |
| `RESOURCES` | Array | Essential resources |
| `SCRIPTURE_VERSES` | Array | Rotating hero verses |

---

## GSAP Animation Patterns

| Pattern | Use Case | Implementation |
|---------|----------|---------------|
| `ScrollTrigger` + `once: true` | One-time reveals | Elements animate in, stay visible |
| `scrub: 1` | Scroll-linked motion | Parallax, timeline line growth |
| Timeline choreography | Hero entrance | Sequential with overlap (`-=0.3`) |
| `clipPath: 'inset()'` | Text reveals | Cinematic wipe-in effect |
| `elastic.out()` | Bouncy accents | Cross corners, dots |
| `power3.out` | Smooth entrances | Standard easing for reveals |
| `expo.inOut` | Dramatic reveals | Clip-path headline reveals |
| `setInterval` + `gsap.to` | Carousel | Rotating Scripture verses |
| `useGSAP` hook | All animations | Automatic cleanup on unmount |

---

## SEO

- **Open Graph** — Full OG metadata for social sharing
- **Twitter Cards** — `summary_large_image` format
- **Structured Data** — `EducationalEvent` schema (JSON-LD)
- **Robots** — `index: true`, `follow: true`, large image preview
- **Canonical URL** — Prevents duplicate content
- **Keywords** — Bible study, Filipino church, SOAP method, discipleship, etc.

---

## Quick Start

### Prerequisites

- Node.js 18+ or Bun
- A package manager (npm, yarn, or bun)

### Installation

```bash
# Clone the repository
git clone https://github.com/marktantongco/brutalist-editorial.git
cd brutalist-editorial

# Install dependencies
bun install

# Start development server
bun run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
# Standard build (for Vercel/server rendering)
bun run build

# Static export (for GitHub Pages)
bun run build:static
```

---

## Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Connect repo at [vercel.com/new](https://vercel.com/new)
3. Vercel auto-detects Next.js and deploys

The project uses standard Next.js output — no special configuration needed for Vercel.

### GitHub Pages

For static hosting on GitHub Pages:

```bash
# Build static export with basePath
bun run build:static

# Deploy to gh-pages branch
GITHUB_TOKEN=your_token bun run deploy:gh-pages
```

The `next.config.ts` conditionally adds `output: "export"` and `basePath: "/brutalist-editorial"` when `GITHUB_PAGES=true` is set.

---

## Customization Guide

### Swapping Content

Edit `src/components/seminar/data.ts` to change all seminar content. The data layer is decoupled from animation logic — change the data and everything re-renders correctly.

### Changing Colors

Edit CSS custom properties in `src/app/globals.css`:

```css
:root {
  --pu-yellow: #FFEA00;
  --pu-red: #CC0000;
  --pu-black: #0A0A0A;
  /* ... */
}
```

### Adding New Sections

1. Add data constants in `src/components/seminar/data.ts`
2. Create a new section component in `src/app/page.tsx`
3. Wrap content with `ScrollReveal` for entrance animations
4. For below-fold sections, wrap with `dynamic()` + `Suspense` for lazy loading

---

## Tech Stack

| Technology | Version | Purpose |
|-----------|---------|---------|
| Next.js | 16 | React framework with App Router |
| TypeScript | 5 | Type safety |
| Tailwind CSS | 4 | Utility-first styling |
| GSAP | 3.14 | Scroll-driven cinematic animations |
| @gsap/react | 2.1 | React useGSAP hook for memory safety |
| Framer Motion | 12 | Additional micro-interactions |
| Recharts | 2.15 | Data visualization library |
| Lucide React | 0.525 | Icon library |
| next-themes | 0.4 | Dark/light mode |

---

## Performance

- **GPU-accelerated** — All animations use `transform` and `opacity` (composited properties)
- **Dynamic imports** — Below-fold sections lazy-loaded with Suspense boundaries
- **CSS containment** — `contain: layout style paint` isolates section rendering
- **ScrollTrigger efficiency** — `once: true` for one-time reveals
- **Font optimization** — `display: swap` with `preload: true` on Syne + Space Mono
- **Accessibility** — `prefers-reduced-motion` disables all animations
- **Build size** — Compiles in ~3.3s with Turbopack, 6 static pages

---

## Seminar Details

| Element | Detail |
|---------|--------|
| **Duration** | 12 weeks (modular design) |
| **Format** | Weekly 90-min sessions + small groups |
| **Method** | SOAP Inductive (Scripture, Observation, Application, Prayer) |
| **Architecture** | 4 Pillars (Encounter, Exegesis, Examination, Expression) |
| **Language** | Bilingual Filipino-English / Taglish |
| **Group Size** | 3-4 per breakout group |
| **4 Phases** | Foundation (Wk 1-3) → Formation (Wk 4-6) → Function (Wk 7-9) → Fruit (Wk 10-12) |

---

## License

MIT License. Built by [Mark Tantongco](https://github.com/marktantongco) with [powerUP](https://github.com/marktantongco).

---

## Acknowledgments

- [GSAP](https://gsap.com/) — Professional-grade animation for the modern web
- [Next.js](https://nextjs.org/) — The React framework for production
- [Tailwind CSS](https://tailwindcss.com/) — Utility-first CSS framework
- [shadcn/ui](https://ui.shadcn.com/) — Beautifully designed components
- **Living Word Seminar Framework** — Filipino Christian Community Bible Study, April 2026
