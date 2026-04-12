'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from '@/lib/gsap-setup';
import {
  ScrollReveal,
  ParallaxSection,
  KineticTypography,
  InfographicCounter,
  MarqueeStrip,
  BrutalistCard,
  TimelineSection,
  AnimatedBarChart,
  AnimatedDonut,
} from '@/components/brutalist';

/* ═══════════════════════════════════════════════════
   DATA LAYER — Swap this content for any topic
   ═══════════════════════════════════════════════════ */

const MARQUEE_ITEMS = [
  'BRUTALISM',
  'EDITORIAL',
  'INFOGRAPHICS',
  'MOTION',
  'TRANSITIONS',
  'INTERACTIVE',
  'TYPOGRAPHY',
  'SCROLL',
];

const EDITORIAL_CARDS = [
  {
    number: '01',
    title: 'Raw Aesthetics',
    description:
      'Stripping design to its essential core. No decoration, no pretense — just pure, unfiltered visual communication that demands attention through honesty.',
    accent: '#FF0000',
  },
  {
    number: '02',
    title: 'Visible Structure',
    description:
      'The grid is not hidden but celebrated. Borders, gutters, and layout guides become design elements themselves, revealing the architecture beneath.',
    accent: '#0000FF',
  },
  {
    number: '03',
    title: 'Bold Typography',
    description:
      'Words carry the visual weight. Oversized headlines, monospaced fonts, and aggressive letterforms create hierarchy through sheer typographic force.',
    accent: '#FFFF00',
  },
  {
    number: '04',
    title: 'Intentional Disruption',
    description:
      'Breaking conventions to create meaning. Asymmetric layouts, overlapping elements, and unexpected juxtapositions challenge the viewer to engage deeply.',
    accent: '#39FF14',
  },
];

const BAR_DATA = [
  { label: 'Identity', value: 92, color: '#FF0000' },
  { label: 'Impact', value: 78, color: '#0000FF' },
  { label: 'Clarity', value: 85, color: '#FFFF00' },
  { label: 'Motion', value: 96, color: '#39FF14' },
  { label: 'Rhythm', value: 71, color: '#FF00FF' },
];

const DONUT_DATA = [
  { label: 'Typography', value: 35, color: '#FF0000' },
  { label: 'Layout', value: 25, color: '#0000FF' },
  { label: 'Motion', value: 20, color: '#FFFF00' },
  { label: 'Color', value: 20, color: '#39FF14' },
];

const TIMELINE_ITEMS = [
  {
    year: 'Phase 01',
    title: 'Encounter the Grid',
    description:
      'Every brutalist composition begins with the grid. Raw, exposed, unforgiving. The structure IS the design — columns and rows become the visual language.',
  },
  {
    year: 'Phase 02',
    title: 'Activate Typography',
    description:
      'Scale explodes. Words become monuments. Monospaced and sans-serif faces collide in an aggressive hierarchy that commands the scroll.',
  },
  {
    year: 'Phase 03',
    title: 'Inject Motion',
    description:
      'Static breaks into kinetic energy. Scroll-triggered reveals, parallax depth, and counter animations transform editorial content into a cinematic journey.',
  },
  {
    year: 'Phase 04',
    title: 'Synthesize the Whole',
    description:
      'Data meets design meets motion. Infographics animate on entry, timelines narrate on scroll, and every pixel serves both form and function.',
  },
];

/* ═══════════════════════════════════════════════════
   PAGE COMPOSITION
   ═══════════════════════════════════════════════════ */

export default function Home() {
  return (
    <main className="min-h-screen overflow-x-hidden">
      {/* ── HERO SECTION ── */}
      <HeroSection />

      {/* ── MARQUEE STRIP ── */}
      <div className="border-y-3 border-black dark:border-white py-4 bg-brutal-yellow dark:bg-yellow-500/20">
        <MarqueeStrip items={MARQUEE_ITEMS} speed={25} />
      </div>

      {/* ── EDITORIAL GRID ── */}
      <EditorialGrid />

      {/* ── INFOGRAPHIC DATA SECTION ── */}
      <InfographicSection />

      {/* ── SCROLL TIMELINE ── */}
      <TimelineSectionBlock />

      {/* ── CTA + FOOTER ── */}
      <CTASection />
      <Footer />
    </main>
  );
}

/* ═══════════════════════════════════════════════════
   SECTION: Hero
   ═══════════════════════════════════════════════════ */

function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!heroRef.current) return;

      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.from('.hero-badge', { opacity: 0, y: 20, duration: 0.6 })
        .from('.hero-title-line-1', { clipPath: 'inset(0 100% 0 0)', duration: 1.2, ease: 'expo.inOut' }, '-=0.2')
        .from('.hero-title-line-2', { clipPath: 'inset(0 100% 0 0)', duration: 1.0, ease: 'expo.inOut' }, '-=0.7')
        .from('.hero-subtitle', { opacity: 0, y: 30, duration: 0.7 }, '-=0.4')
        .from('.hero-cta-group', { opacity: 0, y: 20, stagger: 0.1, duration: 0.5 }, '-=0.3')
        .from('.hero-scroll-indicator', { opacity: 0, scale: 0.5, duration: 0.5 }, '-=0.2');
    },
    { scope: heroRef }
  );

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex flex-col justify-center items-center px-4 md:px-8 grid-overlay"
    >
      {/* Corner accents */}
      <div className="absolute top-0 left-0 w-8 h-8 md:w-12 md:h-12 border-b-3 border-r-3 border-black dark:border-white" />
      <div className="absolute top-0 right-0 w-8 h-8 md:w-12 md:h-12 border-b-3 border-l-3 border-black dark:border-white" />
      <div className="absolute bottom-0 left-0 w-8 h-8 md:w-12 md:h-12 border-t-3 border-r-3 border-black dark:border-white" />
      <div className="absolute bottom-0 right-0 w-8 h-8 md:w-12 md:h-12 border-t-3 border-l-3 border-black dark:border-white" />

      <div className="max-w-5xl mx-auto text-center relative z-10">
        {/* Badge */}
        <div className="hero-badge inline-block border-2 border-black dark:border-white px-4 py-1 mb-6 md:mb-8">
          <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.4em]">
            Interactive Editorial Template // 2026
          </span>
        </div>

        {/* Main headline */}
        <h1 className="text-5xl md:text-7xl lg:text-[8rem] font-black leading-[0.9] uppercase tracking-tighter">
          <span className="hero-title-line-1 block">Brutalist</span>
          <span className="hero-title-line-2 block text-stroke-thick" style={{ WebkitTextStrokeColor: '#FF0000' }}>
            Editorial
          </span>
        </h1>

        {/* Subtitle */}
        <p className="hero-subtitle mt-6 md:mt-8 text-sm md:text-base max-w-xl mx-auto leading-relaxed opacity-70">
          An interactive template system combining raw brutalist aesthetics with scroll-driven
          motion, animated infographics, and editorial-grade typography.
        </p>

        {/* CTA group */}
        <div className="hero-cta-group flex flex-col sm:flex-row gap-3 justify-center mt-8 md:mt-10">
          <button className="border-2 border-black dark:border-white bg-black dark:bg-white text-white dark:text-black px-6 py-3 text-xs md:text-sm font-bold uppercase tracking-wider hover:bg-red-600 hover:border-red-600 hover:text-white dark:hover:bg-red-600 dark:hover:border-red-600 dark:hover:text-white cursor-pointer">
            Explore Sections
          </button>
          <button className="border-2 border-black dark:border-white bg-white dark:bg-black text-black dark:text-white px-6 py-3 text-xs md:text-sm font-bold uppercase tracking-wider hover:bg-yellow-400 hover:text-black dark:hover:bg-yellow-400 dark:hover:text-black cursor-pointer">
            View Components
          </button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="hero-scroll-indicator absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="text-[10px] uppercase tracking-[0.3em] font-bold opacity-50">Scroll</span>
        <div className="w-[1px] h-8 bg-black dark:bg-white animate-pulse" />
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════
   SECTION: Editorial Grid
   ═══════════════════════════════════════════════════ */

function EditorialGrid() {
  return (
    <section className="py-16 md:py-24 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <ScrollReveal direction="up" className="mb-12 md:mb-16">
          <div className="border-b-3 border-black dark:border-white pb-4">
            <span className="text-xs font-bold uppercase tracking-[0.4em] text-red-600">
              Core Principles
            </span>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-black mt-2">
              Design<br />
              <span className="text-stroke" style={{ WebkitTextStrokeColor: '#0000FF' }}>
                Philosophy
              </span>
            </h2>
          </div>
        </ScrollReveal>

        {/* Asymmetric grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {EDITORIAL_CARDS.map((card, i) => (
            <ScrollReveal key={i} direction={i % 2 === 0 ? 'up' : 'left'} delay={i * 0.1}>
              <BrutalistCard
                hoverShadow={`8px 8px 0px ${card.accent}`}
                className="p-5 md:p-6 h-full"
              >
                <span
                  className="text-4xl md:text-5xl font-black block mb-4"
                  style={{ color: card.accent }}
                >
                  {card.number}
                </span>
                <h3 className="text-lg md:text-xl font-black uppercase mb-3">{card.title}</h3>
                <p className="text-xs md:text-sm leading-relaxed opacity-60">{card.description}</p>
              </BrutalistCard>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════
   SECTION: Infographic Data
   ═══════════════════════════════════════════════════ */

function InfographicSection() {
  return (
    <section className="py-16 md:py-24 px-4 md:px-8 bg-black dark:bg-white text-white dark:text-black">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <ScrollReveal direction="up" className="mb-12 md:mb-16">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 border-b-2 border-white dark:border-black pb-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-[0.4em] text-red-500">
                Metrics
              </span>
              <h2 className="text-3xl md:text-5xl lg:text-6xl font-black mt-2">
                Infographic<br />Data
              </h2>
            </div>
            <p className="text-xs md:text-sm max-w-sm opacity-60">
              Animated charts reveal on scroll, demonstrating how static data becomes dynamic visual storytelling.
            </p>
          </div>
        </ScrollReveal>

        {/* Counter row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mb-16 md:mb-24 border-2 border-white dark:border-black p-6 md:p-10">
          <InfographicCounter
            target={2847}
            label="Visitors"
            className="text-3xl md:text-4xl lg:text-5xl font-black"
          />
          <InfographicCounter
            target={96}
            suffix="%"
            label="Engagement"
            className="text-3xl md:text-4xl lg:text-5xl font-black"
          />
          <InfographicCounter
            target={184}
            label="Projects"
            className="text-3xl md:text-4xl lg:text-5xl font-black"
          />
          <InfographicCounter
            target={4.9}
            label="Rating"
            className="text-3xl md:text-4xl lg:text-5xl font-black"
          />
        </div>

        {/* Charts grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
          <ScrollReveal direction="left">
            <div className="border-2 border-white dark:border-black p-6 md:p-8">
              <h3 className="text-lg md:text-xl font-black uppercase mb-6">
                Performance Scores
              </h3>
              <AnimatedBarChart data={BAR_DATA} className="h-64 md:h-72" />
            </div>
          </ScrollReveal>

          <ScrollReveal direction="right">
            <div className="border-2 border-white dark:border-black p-6 md:p-8">
              <h3 className="text-lg md:text-xl font-black uppercase mb-6">
                Composition Breakdown
              </h3>
              <AnimatedDonut data={DONUT_DATA} size={220} />
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════
   SECTION: Scroll Timeline
   ═══════════════════════════════════════════════════ */

function TimelineSectionBlock() {
  return (
    <section className="py-16 md:py-24 px-4 md:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Section header */}
        <ScrollReveal direction="up" className="mb-12 md:mb-16">
          <div className="border-b-3 border-black dark:border-white pb-4">
            <span className="text-xs font-bold uppercase tracking-[0.4em] text-blue-600 dark:text-blue-400">
              Journey
            </span>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-black mt-2">
              The Creative<br />
              <span className="text-stroke" style={{ WebkitTextStrokeColor: '#39FF14' }}>
                Process
              </span>
            </h2>
          </div>
        </ScrollReveal>

        {/* Timeline */}
        <ParallaxSection speed={0.15}>
          <TimelineSection items={TIMELINE_ITEMS} />
        </ParallaxSection>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════
   SECTION: CTA
   ═══════════════════════════════════════════════════ */

function CTASection() {
  const ctaRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!ctaRef.current) return;

      gsap.from(ctaRef.current.querySelector('.cta-title'), {
        clipPath: 'inset(0 100% 0 0)',
        duration: 1.4,
        ease: 'expo.inOut',
        scrollTrigger: {
          trigger: ctaRef.current,
          start: 'top 75%',
          once: true,
        },
      });
    },
    { scope: ctaRef }
  );

  return (
    <section
      ref={ctaRef}
      className="py-16 md:py-24 px-4 md:px-8 bg-brutal-yellow dark:bg-yellow-500/20"
    >
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="cta-title text-4xl md:text-6xl lg:text-7xl font-black uppercase leading-[0.95]">
          Build Something<br />
          <span className="text-stroke-thick" style={{ WebkitTextStrokeColor: '#FF0000' }}>
            Raw
          </span>
        </h2>
        <p className="mt-6 md:mt-8 text-sm md:text-base max-w-lg mx-auto opacity-70 leading-relaxed">
          This template is a reusable system. Swap the data, customize the tokens, and deploy a
          brutalist editorial experience in minutes.
        </p>
        <div className="mt-8 md:mt-10 flex flex-col sm:flex-row gap-3 justify-center">
          <button className="border-3 border-black dark:border-white bg-black dark:bg-white text-white dark:text-black px-8 py-4 text-xs md:text-sm font-bold uppercase tracking-wider hover:bg-red-600 hover:border-red-600 hover:text-white cursor-pointer">
            Get Started
          </button>
          <button className="border-3 border-black dark:border-white bg-white dark:bg-black text-black dark:text-white px-8 py-4 text-xs md:text-sm font-bold uppercase tracking-wider hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black cursor-pointer">
            Documentation
          </button>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════
   SECTION: Footer
   ═══════════════════════════════════════════════════ */

function Footer() {
  return (
    <footer className="border-t-3 border-black dark:border-white py-8 md:py-12 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <h3 className="text-2xl md:text-3xl font-black uppercase">Brutalist Template</h3>
            <p className="text-xs mt-1 opacity-50">
              Reusable editorial system with GSAP scroll animations
            </p>
          </div>
          <div className="flex gap-6 text-xs font-bold uppercase tracking-wider">
            <span className="opacity-50 hover:opacity-100 cursor-pointer transition-opacity">Components</span>
            <span className="opacity-50 hover:opacity-100 cursor-pointer transition-opacity">Tokens</span>
            <span className="opacity-50 hover:opacity-100 cursor-pointer transition-opacity">Guide</span>
            <span className="opacity-50 hover:opacity-100 cursor-pointer transition-opacity">Source</span>
          </div>
        </div>
        <div className="mt-8 pt-4 border-t-2 border-black/10 dark:border-white/10 flex flex-col md:flex-row justify-between items-center gap-2">
          <span className="text-[10px] uppercase tracking-[0.3em] opacity-30">
            Built with Next.js + GSAP + Tailwind CSS
          </span>
          <span className="text-[10px] uppercase tracking-[0.3em] opacity-30">
            Every pixel intentional // 2026
          </span>
        </div>
      </div>
    </footer>
  );
}
