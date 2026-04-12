# Brutalist Editorial — Interactive Infographic Template

A reusable, interactive web template combining **brutalist editorial design**, **GSAP scroll-driven animations**, **animated infographics**, and **kinetic typography**. Built with Next.js 16, TypeScript, Tailwind CSS 4, and GSAP 3.

[![Live on Vercel](https://img.shields.io/badge/Live-Vercel-000?style=flat-square&logo=vercel)](https://brutalist-editorial.vercel.app)
[![GitHub Pages](https://img.shields.io/badge/GitHub-Pages-000?style=flat-square&logo=github)](https://marktantongco.github.io/brutalist-editorial)
[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![GSAP](https://img.shields.io/badge/GSAP-3.14-88CE02?style=flat-square)](https://gsap.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?style=flat-square&logo=tailwindcss)](https://tailwindcss.com/)

---

## Overview

This project is a **production-ready editorial template system** with scroll-driven motion design. It demonstrates how brutalist aesthetics can be combined with smooth GSAP animations to create engaging, scroll-driven storytelling experiences.

The entire component library is **reusable and modular** — swap the data layer at the top of `page.tsx` and everything adapts automatically.

## Live Demos

| Platform | URL |
|----------|-----|
| **Vercel** | [brutalist-editorial.vercel.app](https://brutalist-editorial.vercel.app) |
| **GitHub Pages** | [marktantongco.github.io/brutalist-editorial](https://marktantongco.github.io/brutalist-editorial) |

---

## Features

- **Brutalist Design System** — 0px border-radius, thick borders, high-contrast palette, raw typography
- **GSAP ScrollTrigger** — Scroll-driven parallax, reveals, counters, and timeline animations
- **Kinetic Typography** — Clip-path text reveals, split-word animations, and fade entrances
- **Animated Infographics** — Bar charts and donut charts that animate on scroll
- **Infinite Marquee** — Continuous horizontal ticker with configurable speed
- **Interactive Cards** — GSAP-powered hover/press micro-interactions
- **Scroll Timeline** — Vertical narrative timeline with animated line growth
- **Dark Mode** — Full light/dark theme via CSS custom properties
- **Accessibility** — `prefers-reduced-motion` support, semantic HTML, ARIA attributes
- **Mobile-First** — Responsive across all breakpoints, touch-friendly targets
- **Modular Data Layer** — Swap content without touching animation code

---

## Architecture

```
src/
├── app/
│   ├── globals.css          # Design system tokens + brutalist utilities
│   ├── layout.tsx           # Root layout with Geist fonts
│   └── page.tsx             # Page composition + data layer
├── components/
│   └── brutalist/
│       ├── index.ts         # Barrel export (all reusable components)
│       ├── ScrollReveal.tsx # Scroll-triggered entrance wrapper
│       ├── KineticTypography.tsx # Animated text reveals
│       ├── InfographicCounter.tsx # Animated number counters
│       ├── MarqueeStrip.tsx # Infinite horizontal ticker
│       ├── BrutalistCard.tsx # Interactive card with GSAP hover
│       ├── TimelineSection.tsx  # Scroll-driven narrative timeline
│       └── AnimatedChart.tsx    # Bar + donut SVG charts
└── lib/
    ├── gsap-setup.ts        # GSAP + ScrollTrigger registration
    └── utils.ts             # Utility functions (cn, etc.)
```

---

## Design System

### Color Palette

| Token | Light | Dark |
|-------|-------|------|
| Background | `#FAFAFA` | `#0A0A0A` |
| Foreground | `#0A0A0A` | `#FAFAFA` |
| Accent (Red) | `#FF0000` | `#FF0000` |
| Blue | `#0000FF` | `#3B82F6` |
| Yellow | `#FFFF00` | `#FACC15` |
| Green | `#39FF14` | `#39FF14` |
| Pink | `#FF00FF` | `#E879F9` |

### Typography

- **Font**: Geist (sans-serif) + Geist Mono (monospace)
- **Headings**: 900 weight, uppercase, tight line-height (0.95)
- **Body**: 400 weight, relaxed line-height (1.6)
- **Display sizes**: `clamp()`-based responsive scaling

### CSS Utilities

```css
.text-stroke          /* Outline text (2px stroke, transparent fill) */
.text-stroke-thick    /* Thicker outline (3px stroke) */
.grid-overlay         /* Subtle grid lines background pattern */
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
  <div className="reveal-child">Item 3</div>
</ScrollReveal>
```

**Props**: `direction` (up/down/left/right), `delay`, `duration`, `stagger`, `once`

### KineticTypography

Animated headline with three reveal modes.

```tsx
import { KineticTypography } from '@/components/brutalist';

<KineticTypography text="Hello World" tag="h1" revealType="clip" />
<KineticTypography text="Split Words" tag="h2" revealType="split" />
<KineticTypography text="Fade In" tag="h3" revealType="fade" />
```

**Props**: `text`, `tag`, `revealType` (clip/split/fade), `delay`

### InfographicCounter

Animated number counter that triggers on scroll.

```tsx
import { InfographicCounter } from '@/components/brutalist';

<InfographicCounter target={2847} prefix="$" suffix="+" label="Revenue" />
```

**Props**: `target`, `suffix`, `prefix`, `label`

### MarqueeStrip

Infinite horizontal scrolling ticker.

```tsx
import { MarqueeStrip } from '@/components/brutalist';

<MarqueeStrip items={['BRUTALISM', 'EDITORIAL', 'MOTION']} speed={25} />
```

**Props**: `items` (string[]), `speed` (seconds per cycle)

### BrutalistCard

Hard-edged card with GSAP hover/press micro-interactions.

```tsx
import { BrutalistCard } from '@/components/brutalist';

<BrutalistCard hoverShadow="6px 6px 0px #FF0000" borderColor="#000">
  <div className="p-6">
    <h3>Card Title</h3>
    <p>Card content goes here.</p>
  </div>
</BrutalistCard>
```

**Props**: `hoverShadow`, `borderColor`, `className`

### TimelineSection

Vertical scroll-driven narrative timeline.

```tsx
import { TimelineSection } from '@/components/brutalist';

<TimelineSection items={[
  { year: '2024', title: 'Started', description: 'Project began.' },
  { year: '2025', title: 'Launched', description: 'Went live.' },
]} />
```

### AnimatedBarChart & AnimatedDonut

SVG charts that animate on scroll.

```tsx
import { AnimatedBarChart, AnimatedDonut } from '@/components/brutalist';

<AnimatedBarChart data={[
  { label: 'A', value: 92, color: '#FF0000' },
  { label: 'B', value: 78, color: '#0000FF' },
]} />

<AnimatedDonut segments={[
  { label: 'A', value: 35, color: '#FF0000' },
  { label: 'B', value: 25, color: '#0000FF' },
]} size={200} />
```

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
# Static export (for GitHub Pages)
bun run build:static

# Or standard build (for Vercel/server)
bun run build
```

---

## Customization Guide

### Swapping Content

All content lives in the **DATA LAYER** at the top of `src/app/page.tsx`. Edit these constants to customize:

| Variable | Purpose |
|----------|---------|
| `MARQUEE_ITEMS` | Ticker strip words/phrases |
| `EDITORIAL_CARDS` | Grid cards (number, title, description, accent) |
| `BAR_DATA` | Bar chart data points |
| `DONUT_DATA` | Donut chart segments |
| `TIMELINE_ITEMS` | Timeline entries (year, title, description) |

### Changing Colors

Edit CSS custom properties in `src/app/globals.css` under `:root` and `.dark`:

```css
:root {
  --brutal-red: #FF0000;
  --brutal-blue: #0000FF;
  --brutal-yellow: #FFFF00;
  /* ... */
}
```

### Adding New Sections

1. Create data constants in the data layer
2. Add a new section function component in `page.tsx`
3. Compose it into the `<main>` element
4. Wrap content with `ScrollReveal` for automatic entrance animations

---

## GSAP Animation Patterns

| Pattern | Use Case | Implementation |
|---------|----------|---------------|
| `ScrollTrigger` + `once: true` | One-time reveals | Elements animate in, stay visible |
| `scrub: 1` | Scroll-linked motion | Animation tied to scroll position |
| Timeline choreography | Hero entrance | Sequential animations with overlap (`-=0.3`) |
| `ScrollTrigger.batch` | Staggered grids | Multiple items animate as a batch |
| `from()` | Prefer over `fromTo()` | GSAP auto-computes initial state |
| `useGSAP` hook | All animations | Automatic cleanup on unmount |

---

## Deployment

### Vercel (Recommended)

The project is configured for Vercel deployment. Just connect your GitHub repo and Vercel handles the rest.

1. Push to GitHub
2. Connect repo at [vercel.com/new](https://vercel.com/new)
3. Vercel auto-detects Next.js and deploys

Or via CLI:
```bash
npx vercel --prod
```

### GitHub Pages

For static hosting on GitHub Pages:

```bash
# Build static export
bun run build:static

# Deploy to gh-pages branch
bun run deploy:gh-pages
```

The `next.config.ts` includes `output: "export"` configuration and `basePath` for GitHub Pages.

---

## Tech Stack

| Technology | Version | Purpose |
|-----------|---------|---------|
| Next.js | 16 | React framework with App Router |
| TypeScript | 5 | Type safety |
| Tailwind CSS | 4 | Utility-first styling |
| GSAP | 3.14 | Scroll-driven animations |
| @gsap/react | 2.1 | React integration (useGSAP hook) |
| Recharts | 2.15 | Chart library (available) |
| Framer Motion | 12 | Additional animations (available) |
| Lucide React | 0.525 | Icon library |

---

## Performance

- **GPU-accelerated** — All animations use `transform` and `opacity` (composited properties)
- **ScrollTrigger efficiency** — `once: true` for one-time reveals, no re-animation on scroll back
- **Bundle optimization** — Tree-shaking, dynamic imports where needed
- **Accessibility** — `prefers-reduced-motion` disables all animations for motion-sensitive users
- **Lighthouse** — Target: 95+ Performance, 100 Accessibility

---

## Project Structure

```
brutalist-editorial/
├── public/
│   └── robots.txt
├── src/
│   ├── app/
│   │   ├── api/route.ts
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/
│   │   ├── brutalist/
│   │   │   ├── index.ts
│   │   │   ├── ScrollReveal.tsx
│   │   │   ├── KineticTypography.tsx
│   │   │   ├── InfographicCounter.tsx
│   │   │   ├── MarqueeStrip.tsx
│   │   │   ├── BrutalistCard.tsx
│   │   │   ├── TimelineSection.tsx
│   │   │   └── AnimatedChart.tsx
│   │   └── ui/               # shadcn/ui components
│   ├── hooks/
│   ├── lib/
│   │   ├── gsap-setup.ts
│   │   ├── utils.ts
│   │   └── db.ts
│   └── prisma/
├── prisma/
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
├── package.json
└── README.md
```

---

## License

MIT License. Built by [Mark Tantongco](https://github.com/marktantongco).

---

## Acknowledgments

- [GSAP](https://gsap.com/) — Professional-grade animation for the modern web
- [Next.js](https://nextjs.org/) — The React framework for production
- [Tailwind CSS](https://tailwindcss.com/) — Utility-first CSS framework
- [shadcn/ui](https://ui.shadcn.com/) — Beautifully designed components
