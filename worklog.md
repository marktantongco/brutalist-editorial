# Work Log — Warm Brutalist Color Palette Upgrade

## Date: 2026
## Task: Comprehensive Warm Color + Readability + Animation + Mobile Upgrade

---

## Color Mapping Summary

| Token | Old Value | New Value | Description |
|-------|-----------|-----------|-------------|
| `--pu-yellow` | `#FFEA00` | `#E8A838` | Electric yellow → Warm golden amber |
| `--pu-red` | `#CC0000` | `#C44536` | Blood red → Warm brick terracotta |
| `--pu-black` | `#0A0A0A` | `#1E1B18` | Pure black → Warm dark brown-charcoal |
| `--pu-white` | `#FAFAFA` | `#FAF5EE` | Cold white → Warm off-white cream |
| `--pu-dark` | `#1A1A1A` | `#2C2420` | Dark → Warm espresso |
| `--pu-gray` | `#888888` | `#7C9885` | Neutral gray → Warm sage green |
| `--background` | `#FAFAFA` | `#FAF5EE` | Warm cream background |
| `--foreground` | `#0A0A0A` | `#1E1B18` | Warm charcoal text |
| `--accent` | `#FFEA00` | `#E8A838` | Warm amber accent |
| `--ring` | `#FFEA00` | `#E8A838` | Warm amber focus ring |

### New Tokens Added
| Token | Value | Description |
|-------|-------|-------------|
| `--pu-cream` | `#FAF5EE` | Primary warm off-white |
| `--pu-charcoal` | `#1E1B18` | Primary warm dark |
| `--pu-warm-white` | `#F5EDE3` | Dark section off-white |
| `--pu-terracotta` | `#C44536` | Warm brick red |
| `--pu-amber` | `#E8A838` | Warm golden amber |
| `--pu-sage` | `#7C9885` | Warm sage green accent |
| `--pu-sand` | `#D4B896` | Warm sand/beige neutral |
| `--pu-espresso` | `#2C2420` | Warm dark for nav/overlays |
| `--pu-peach` | `#F5D5C8` | Subtle warm peach bg |
| `--pu-gold-light` | `#FFF3D6` | Light golden hover states |

### Dark Mode Tokens
| Token | Value |
|-------|-------|
| Background | `#1A1714` (warm near-black) |
| Card | `#252220` (warm dark card) |
| Text | `#F5EDE3` (warm off-white) |
| Muted | `#3D3835` (warm dark muted) |
| Red accent | `#E05A4E` (brighter for dark mode) |

---

## Typography Upgrades

| Token | Old | New |
|-------|-----|-----|
| `--fluid-hero` | `clamp(3.5rem, 10vw+1rem, 12rem)` | `clamp(3rem, 9vw+1rem, 10rem)` |
| `--fluid-h1` | `clamp(2.5rem, 6vw+0.5rem, 7rem)` | `clamp(2.25rem, 5.5vw+0.5rem, 6rem)` |
| `--fluid-h2` | `clamp(2rem, 4vw+0.5rem, 5rem)` | `clamp(1.75rem, 3.5vw+0.5rem, 4.5rem)` |
| `--fluid-h3` | `clamp(1.25rem, 2vw+0.25rem, 2rem)` | `clamp(1.125rem, 1.8vw+0.25rem, 1.75rem)` |
| `--fluid-body` | `clamp(0.875rem, 0.5vw+0.75rem, 1.125rem)` | `clamp(0.9375rem, 0.4vw+0.8125rem, 1.125rem)` |
| `--fluid-small` | `clamp(0.6875rem, 0.3vw+0.625rem, 0.875rem)` | `clamp(0.75rem, 0.3vw+0.6875rem, 0.9375rem)` |
| `--fluid-micro` | `clamp(0.5625rem, 0.2vw+0.5rem, 0.75rem)` | `clamp(0.625rem, 0.2vw+0.5625rem, 0.8125rem)` |
| `h1 line-height` | `0.85` | `0.9` |
| Body line-height | `1.5` | `1.7` |
| Body letter-spacing | none | `0.01em` |
| Scroll padding | `70px` | `80px` |

---

## Files Modified

### 1. `src/app/globals.css` — Complete color system overhaul
- Replaced all `:root` brand tokens with warm palette
- Added new warm tokens (cream, charcoal, terracotta, amber, sage, sand, espresso, peach, gold-light)
- Updated `.dark` block with warm dark mode tokens
- Updated all CSS utility classes (label-tag, text-shadow-brutal, selection, grid-overlay, borderGlow, marquee-sep, cursor-dot, hr-accent, nav links)
- Improved `.type-body` with `line-height: 1.7` and `letter-spacing: 0.01em`
- Added mobile responsiveness improvements (touch targets, label sizing, section padding, bottom nav safety)
- Updated `@theme inline` block with new color token mappings

### 2. `src/components/seminar/data.ts` — All hardcoded colors updated
- `#FFEA00` → `#E8A838` (amber) across FOUR_PILLARS, PHASES, WEEKLY_JOURNEY, SESSION_STRUCTURE, SUCCESS_METRICS, METRIC_DONUT
- `#CC0000` → `#C44536` (terracotta) across all data
- `#0A0A0A` → `#1E1B18` (charcoal) where used as dark/pillar color
- `#FAFAFA` → `#FAF5EE` (cream)
- `#888888` → `#7C9885` (sage) for accent gray

### 3. `src/app/page.tsx` — All 12+ sections updated
- **Navigation**: `bg-white/90` → `bg-pu-cream/90`, border colors → warm charcoal/warm-white
- **Hero**: Corner crosses → terracotta, title stroke → `#C44536`, amber → `text-pu-amber`, CTA buttons → warm palette, gradient → amber
- **About**: Border-left → terracotta, SOAP highlights → amber/charcoal, hover → amber/10
- **Pillars**: bg → charcoal/warm-white, progress bars → amber/terracotta, pillar colors → warm palette, card conditionals updated for `#1E1B18`
- **Journey**: Stroke color → terracotta, phase bg conditionals updated, hover → terracotta, indicator dots → terracotta
- **Session Structure**: bg → gold-light/amber-900/20, borders → charcoal, text → charcoal/cream, step numbers → terracotta
- **Methodology**: Stroke → amber, shadow colors → amber/terracotta, verse refs → terracotta
- **Metrics**: bg → charcoal/warm-white, ring colors → warm, bar chart → warm, key results → terracotta
- **Adaptation**: Stroke → terracotta, active state → amber/10, context buttons → warm
- **Resources**: bg → charcoal/warm-white, subtitle → amber, shadow → amber/terracotta
- **Commissioning**: bg → gold-light, text → charcoal/cream, buttons → warm palette
- **Marquee**: border → charcoal, bg → amber/30
- **Footer**: border → charcoal, scroll-to-top → amber

### 4. Component files updated
- **BrutalistCard.tsx**: Default borderColor → `#1E1B18`, hoverShadow → `#C44536`, bg → `pu-cream/pu-charcoal`
- **AnimatedProgressRing.tsx**: Default color → `var(--pu-terracotta)`
- **ScrollProgress.tsx**: Bar color → `var(--pu-terracotta)`
- **AnimatedChart.tsx**: Bar container borders → warm, legend borders → warm, donut legend → warm

---

## Animation Enhancements
- Pre-title badge: Added `scale: 0.9` + `back.out(1.7)` ease for bounce entrance
- Stats stagger: Changed from sequential to `stagger: { each: 0.1, from: 'random' }` for organic feel
- Verse rotation: Changed from vertical (y) to horizontal (x) slide for more dynamic transitions

---

## Mobile Responsiveness Improvements
- `.type-body`: Increased line-height to 1.75 and letter-spacing on mobile
- Touch targets: `min-height: 40px` for all interactive elements
- `.label-tag`: Reduced font-size (10px) and padding on mobile
- `.mobile-bottom-nav`: Improved safe-area-inset-bottom padding
- `section`: Added 16px padding on mobile via `!important`

---

## Design Philosophy Preserved
- ✅ Zero border-radius maintained
- ✅ Bold thick borders maintained
- ✅ Offset text shadows maintained (now warm-toned)
- ✅ All GSAP scroll animations maintained
- ✅ Interactive expandable cards maintained
- ✅ Brutalist grid overlay maintained (warm-toned)
- ✅ "Craft coffee shop meets editorial design" aesthetic achieved

---

## Lint & Build Status
- ESLint: No new errors introduced (only pre-existing errors in generate scripts)
- Dev server: Compiling successfully, all GET requests returning 200

## Visual Audit Fix — $(date -u +%Y-%m-%dT%H:%M:%SZ)

### Files Modified
1. `src/app/page.tsx` — Opacity, padding, mesh gradients, aria attributes
2. `src/app/globals.css` — State specs, WCAG, mobile fixes, bottom nav
3. `src/components/brutalist/AnimatedProgressRing.tsx` — Contrast fixes

### ROOT CAUSE #1: Text Opacity Fixes (page.tsx)
- **HeroSection**: Tagline `opacity-60` → `opacity-70`, Verse `opacity-80` → `opacity-85`, Stats labels `opacity-50` → `opacity-65`
- **SeminarNavigation**: Nav links `opacity-60` → `opacity-80`
- **MobileBottomNav**: `text-[9px]` → `text-[10px]`, `opacity-70` → `opacity-90`
- **AboutSection**: Body text `opacity-80` → `opacity-85`, Sidebar label `opacity-50` → `opacity-65`
- **PillarsSection**: Description `opacity-60` → `opacity-85`, Subtitle `opacity-40` → `opacity-65`, Expand button `opacity-60` → `opacity-80`, Expanded bullet label added `opacity-90`, Expanded bullet text `opacity-60` → `opacity-80`, Progress bar labels `opacity-40` → `opacity-65`, Section desc `opacity-60` → `opacity-85`
- **JourneySection**: Phase weeks `opacity-50` → `opacity-65`, Phase focus `opacity-50` → `opacity-65`, Hover focus `opacity-60` → `opacity-75`
- **SessionStructure**: Section desc `opacity-60` → `opacity-75`, Time labels `opacity-50` → `opacity-65`, Step desc `opacity-50` → `opacity-75`, Homework text `opacity-60` → `opacity-80`
- **MethodologySection**: Description `opacity-60` → `opacity-85`
- **MetricsSection**: Section desc `opacity-50` → `opacity-75`, Ring desc `opacity-40` → `opacity-65`, Bar chart desc `opacity-40` → `opacity-65`, Key results detail `opacity-50` → `opacity-75`
- **AdaptationSection**: Modifications `opacity-70` → `opacity-85`, Faded cards `opacity-40` → `opacity-55`
- **ResourcesSection**: Description `opacity-60` → `opacity-85`
- **CommissioningSection**: Verse text `opacity-70` → `opacity-80`, Reference `opacity-50` → `opacity-65`
- **SeminarFooter**: Description `opacity-50` → `opacity-65`, Links `opacity-40` → `opacity-60`, Copyright `opacity-30` → `opacity-50`

### ROOT CAUSE #2: Dark Section Contrast (page.tsx)
- Added warm mesh gradient overlays to PillarsSection, MetricsSection, ResourcesSection
- Added `relative z-10` to inner containers for proper layering

### ROOT CAUSE #3: Bottom Nav & Scroll-to-Top (page.tsx + globals.css)
- Scroll-to-top: `fixed bottom-20 md:bottom-6 right-6` → `fixed bottom-24 right-4 z-40 w-11 h-11`
- Bottom nav: Added `backdrop-filter: blur(12px)`, `background: rgba(250,245,238,0.95)`, increased safe-area padding to 12px
- Mobile nav labels: `text-[9px]` → `text-[10px]`, `opacity-70` → `opacity-90`

### ROOT CAUSE #4: Card Padding & Spacing (page.tsx)
- Pillar cards: `p-5 md:p-6` → `p-4 md:p-6`
- Session structure blocks: `p-5 md:p-6` → `p-4 md:p-6`
- Methodology cards: `p-5 md:p-6` → `p-4 md:p-6`
- Resources cards: `p-5 md:p-6` → `p-4 md:p-6`
- About sidebar items: `p-4 md:p-5` → `p-3 md:p-5`
- Key results box: `p-6 md:p-8` → `p-5 md:p-8`
- All section headers: `mb-12 md:mb-16` → `mb-8 md:mb-16`
- About grid: `gap-8 md:gap-12` → `gap-6 md:gap-12`

### ROOT CAUSE #5: Phase Cards Scroll Hint (page.tsx)
- Changed `min-w-[200px]` → `min-w-[180px]`
- Added fade gradient on right edge for scrollability hint (mobile only)
- Wrapped in relative container with absolute gradient overlay

### ROOT CAUSE #6: Progress Ring Contrast (AnimatedProgressRing.tsx)
- Track opacity `opacity-10` → `opacity-15`
- Label opacity `opacity-50` → `opacity-90`
- strokeWidth: enforced minimum 5px via `Math.max(5, strokeWidth)`

### Mesh Gradient Enhancement (page.tsx)
- HeroSection: Replaced simple radial gradient with 3-layer warm mesh gradient
- PillarsSection, MetricsSection, ResourcesSection: Added 2-layer warm mesh overlays

### Accessibility Enhancements (page.tsx + globals.css)
- Added `aria-expanded` and `aria-controls` to pillar expand buttons
- Added `aria-label="Scroll to begin exploring"` to hero scroll indicator
- Added `role="tablist"` to adaptation context buttons
- Added skip-link CSS for keyboard navigation
- Added WCAG AA contrast documentation
- Added focus-visible: 3px amber ring with 3px offset

### State Spec Implementation (globals.css)
- Hover: 150ms transition with ease curve
- Press: 80ms scale(0.97)
- Focus-visible: warm amber ring

### 375px Mobile Fixes (globals.css)
- `@media (max-width: 400px)`: tighter section padding (12px)
- Hero font size: `clamp(2.5rem, 12vw + 1rem, 8rem)`

### Lint Status
- 0 new errors from our changes
- Pre-existing 6 errors in generate-seminar scripts (require imports) — not related to this fix
