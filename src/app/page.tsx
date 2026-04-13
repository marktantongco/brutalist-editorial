'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from '@/lib/gsap-setup';
import {
  ScrollReveal,
  ParallaxSection,
  InfographicCounter,
  MarqueeStrip,
  BrutalistCard,
  TimelineSection,
  AnimatedBarChart,
  AnimatedDonut,
  CustomCursor,
  GrainOverlay,
  TextScramble,
  MagneticButton,
  SmoothScroll,
} from '@/components/brutalist';

/* ═══════════════════════════════════════════════════
   DATA LAYER — powerUP Brand Content
   ═══════════════════════════════════════════════════ */

const MARQUEE_ITEMS = [
  'powerUP',
  'SHOWCASE',
  'NEO-BRUTALIST',
  'GSAP',
  'SCROLL',
  'MOTION',
  'INTERACTIVE',
  'EDITORIAL',
];

const EDITORIAL_CARDS = [
  {
    number: '01',
    title: 'Raw Impact',
    description:
      'Stripping design to its essential core. No decoration, no pretense — pure visual communication through honesty and force.',
    accent: '#FFEA00',
  },
  {
    number: '02',
    title: 'Visible Grid',
    description:
      'Structure celebrated, not hidden. Borders, gutters, and guides become design elements revealing the architecture beneath the surface.',
    accent: '#CC0000',
  },
  {
    number: '03',
    title: 'Bold Type',
    description:
      'Words carry visual weight. Oversized headlines and aggressive letterforms create hierarchy through sheer typographic force and precision.',
    accent: '#0A0A0A',
  },
  {
    number: '04',
    title: 'Kinetic Motion',
    description:
      'Scroll-triggered reveals, parallax depth, and counter animations transform editorial content into a cinematic, immersive journey.',
    accent: '#CC0000',
  },
];

const BAR_DATA = [
  { label: 'Impact', value: 96, color: '#FFEA00' },
  { label: 'Speed', value: 92, color: '#CC0000' },
  { label: 'Clarity', value: 88, color: '#0A0A0A' },
  { label: 'Motion', value: 97, color: '#FFEA00' },
  { label: 'Rhythm', value: 84, color: '#CC0000' },
];

const DONUT_DATA = [
  { label: 'Motion', value: 35, color: '#FFEA00' },
  { label: 'Type', value: 25, color: '#CC0000' },
  { label: 'Layout', value: 22, color: '#0A0A0A' },
  { label: 'Color', value: 18, color: '#888888' },
];

const TIMELINE_ITEMS = [
  {
    year: 'Phase 01',
    title: 'Establish the Grid',
    description:
      'Every composition begins with structure. Raw, exposed, unforgiving. The grid IS the design — columns and rows become the visual language.',
  },
  {
    year: 'Phase 02',
    title: 'Activate Typography',
    description:
      'Scale explodes. Words become monuments. Syne and Space Mono collide in an aggressive hierarchy that commands the scroll.',
  },
  {
    year: 'Phase 03',
    title: 'Inject Motion',
    description:
      'Static breaks into kinetic energy. GSAP ScrollTrigger reveals, parallax depth, and counter animations create cinematic experiences.',
  },
  {
    year: 'Phase 04',
    title: 'Deploy & Scale',
    description:
      'Data meets design meets motion. Infographics animate, timelines narrate on scroll, and every pixel serves both form and function.',
  },
];

/* ═══════════════════════════════════════════════════
   PAGE COMPOSITION
   ═══════════════════════════════════════════════════ */

export default function Home() {
  return (
    <SmoothScroll>
      <CustomCursor />
      <GrainOverlay />
      <main className="min-h-screen overflow-x-hidden">
        {/* ── HERO SECTION ── */}
        <HeroSection />

        {/* ── MARQUEE STRIP ── */}
        <div className="border-y-3 border-pu-black dark:border-pu-white py-4 bg-pu-yellow dark:bg-yellow-500/20">
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
    </SmoothScroll>
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
        .from(
          '.hero-title-line-1',
          { clipPath: 'inset(0 100% 0 0)', duration: 1.2, ease: 'expo.inOut' },
          '-=0.2'
        )
        .from(
          '.hero-title-line-2',
          { clipPath: 'inset(0 100% 0 0)', duration: 1.0, ease: 'expo.inOut' },
          '-=0.7'
        )
        .from('.hero-subtitle', { opacity: 0, y: 30, duration: 0.7 }, '-=0.4')
        .from(
          '.hero-cta-group',
          { opacity: 0, y: 20, stagger: 0.1, duration: 0.5 },
          '-=0.3'
        )
        .from(
          '.hero-scroll-indicator',
          { opacity: 0, scale: 0.5, duration: 0.5 },
          '-=0.2'
        )
        .from('.hero-watermark', { opacity: 0, scale: 0.8, duration: 1.2, ease: 'power2.out' }, '-=1');
    },
    { scope: heroRef }
  );

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex flex-col justify-center items-center px-4 md:px-8 grid-overlay"
    >
      {/* Corner accents */}
      <div className="absolute top-0 left-0 w-8 h-8 md:w-12 md:h-12 border-b-3 border-r-3 border-pu-black dark:border-pu-white" />
      <div className="absolute top-0 right-0 w-8 h-8 md:w-12 md:h-12 border-b-3 border-l-3 border-pu-black dark:border-pu-white" />
      <div className="absolute bottom-0 left-0 w-8 h-8 md:w-12 md:h-12 border-t-3 border-r-3 border-pu-black dark:border-pu-white" />
      <div className="absolute bottom-0 right-0 w-8 h-8 md:w-12 md:h-12 border-t-3 border-l-3 border-pu-black dark:border-pu-white" />

      {/* Large watermark number */}
      <div className="hero-watermark absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none">
        <span className="text-[20rem] md:text-[30rem] lg:text-[40rem] font-black text-pu-black/[0.03] dark:text-pu-white/[0.03] leading-none">
          01
        </span>
      </div>

      <div className="max-w-5xl mx-auto text-center relative z-10">
        {/* Badge */}
        <div className="hero-badge label-tag mb-6 md:mb-8">
          powerUP Showcase // Neo-Brutalist Template // 2026
        </div>

        {/* Main headline */}
        <h1 className="text-5xl md:text-7xl lg:text-[8rem] font-black leading-[0.9] uppercase tracking-tighter">
          <span className="hero-title-line-1 block">powerUP</span>
          <span
            className="hero-title-line-2 block text-stroke-thick"
            style={{ WebkitTextStrokeColor: '#FFEA00' }}
          >
            Showcase
          </span>
        </h1>

        {/* Subtitle with TextScramble */}
        <div className="hero-subtitle mt-6 md:mt-8 text-sm md:text-base max-w-xl mx-auto leading-relaxed opacity-70">
          <TextScramble
            text="Scroll-driven motion. Animated data. Editorial craft."
            className="font-mono text-xs md:text-sm"
          />
        </div>

        {/* CTA group with MagneticButtons */}
        <div className="hero-cta-group flex flex-col sm:flex-row gap-3 justify-center mt-8 md:mt-10">
          <MagneticButton className="border-2 border-pu-black dark:border-pu-white bg-pu-black dark:bg-pu-white text-pu-white dark:text-pu-black px-6 py-3 text-xs md:text-sm font-bold uppercase tracking-wider hover:bg-pu-red hover:border-pu-red hover:text-white dark:hover:bg-pu-red dark:hover:border-pu-red dark:hover:text-white cursor-pointer">
            Explore Sections
          </MagneticButton>
          <MagneticButton className="border-2 border-pu-black dark:border-pu-white bg-pu-yellow dark:bg-pu-yellow text-pu-black px-6 py-3 text-xs md:text-sm font-bold uppercase tracking-wider cursor-pointer">
            View Components
          </MagneticButton>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="hero-scroll-indicator absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="text-[10px] uppercase tracking-[0.3em] font-bold opacity-50 font-mono">
          Scroll
        </span>
        <div className="w-[1px] h-8 bg-pu-black dark:bg-pu-white animate-pulse" />
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
          <div className="border-b-3 border-pu-black dark:border-pu-white pb-4">
            <span className="label-tag">Core Principles</span>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-black mt-4">
              Design
              <br />
              <span className="text-stroke" style={{ WebkitTextStrokeColor: '#CC0000' }}>
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
                <p className="text-xs md:text-sm leading-relaxed opacity-60 font-mono">
                  {card.description}
                </p>
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
    <section className="py-16 md:py-24 px-4 md:px-8 bg-pu-black dark:bg-pu-white text-pu-white dark:text-pu-black">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <ScrollReveal direction="up" className="mb-12 md:mb-16">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 border-b-2 border-pu-white dark:border-pu-black pb-4">
            <div>
              <span className="label-tag">Metrics</span>
              <h2 className="text-3xl md:text-5xl lg:text-6xl font-black mt-4">
                Infographic
                <br />
                <span
                  className="text-stroke"
                  style={{ WebkitTextStrokeColor: '#FFEA00' }}
                >
                  Data
                </span>
              </h2>
            </div>
            <p className="text-xs md:text-sm max-w-sm opacity-60 font-mono">
              Animated charts reveal on scroll, demonstrating how static data becomes dynamic visual storytelling.
            </p>
          </div>
        </ScrollReveal>

        {/* Counter row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mb-16 md:mb-24 border-2 border-pu-white dark:border-pu-black p-6 md:p-10">
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
            <div className="border-2 border-pu-white dark:border-pu-black p-6 md:p-8">
              <h3 className="text-lg md:text-xl font-black uppercase mb-6">
                Performance Scores
              </h3>
              <AnimatedBarChart data={BAR_DATA} className="h-64 md:h-72" />
            </div>
          </ScrollReveal>

          <ScrollReveal direction="right">
            <div className="border-2 border-pu-white dark:border-pu-black p-6 md:p-8">
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
          <div className="border-b-3 border-pu-black dark:border-pu-white pb-4">
            <span className="label-tag">Journey</span>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-black mt-4">
              The Creative
              <br />
              <span
                className="text-stroke"
                style={{ WebkitTextStrokeColor: '#FFEA00' }}
              >
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
      className="py-16 md:py-24 px-4 md:px-8 bg-pu-yellow dark:bg-yellow-500/20"
    >
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="cta-title text-4xl md:text-6xl lg:text-7xl font-black uppercase leading-[0.95]">
          Build Something
          <br />
          <span
            className="text-stroke-thick"
            style={{ WebkitTextStrokeColor: '#FFEA00' }}
          >
            Epic
          </span>
        </h2>
        <p className="mt-6 md:mt-8 text-sm md:text-base max-w-lg mx-auto opacity-70 leading-relaxed font-mono">
          powerUP — AI tools, digital products, web experiences. This template is a reusable system
          for building neo-brutalist editorial experiences in minutes.
        </p>
        <div className="mt-8 md:mt-10 flex flex-col sm:flex-row gap-3 justify-center">
          <MagneticButton className="border-3 border-pu-black dark:border-pu-white bg-pu-black dark:bg-pu-white text-pu-white dark:text-pu-black px-8 py-4 text-xs md:text-sm font-bold uppercase tracking-wider hover:bg-pu-red hover:border-pu-red hover:text-white dark:hover:bg-pu-red dark:hover:border-pu-red dark:hover:text-white cursor-pointer">
            Get Started
          </MagneticButton>
          <MagneticButton className="border-3 border-pu-black dark:border-pu-white bg-pu-white dark:bg-pu-black text-pu-black dark:text-pu-white px-8 py-4 text-xs md:text-sm font-bold uppercase tracking-wider cursor-pointer">
            Documentation
          </MagneticButton>
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
    <footer className="border-t-3 border-pu-black dark:border-pu-white py-8 md:py-12 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <h3 className="text-2xl md:text-3xl font-black uppercase">powerUP Showcase</h3>
            <p className="text-xs mt-1 opacity-50 font-mono">
              Reusable editorial system with GSAP scroll animations
            </p>
          </div>
          <div className="flex gap-6 text-xs font-bold uppercase tracking-wider font-mono">
            <span className="opacity-50 hover:opacity-100 cursor-pointer transition-opacity">
              Components
            </span>
            <span className="opacity-50 hover:opacity-100 cursor-pointer transition-opacity">
              Tokens
            </span>
            <span className="opacity-50 hover:opacity-100 cursor-pointer transition-opacity">
              Guide
            </span>
            <span className="opacity-50 hover:opacity-100 cursor-pointer transition-opacity">
              Source
            </span>
          </div>
        </div>
        <div className="mt-8 pt-4 border-t-2 border-pu-black/10 dark:border-pu-white/10 flex flex-col md:flex-row justify-between items-center gap-2">
          <span className="text-[10px] uppercase tracking-[0.3em] opacity-30 font-mono">
            Taguig, Philippines
          </span>
          <span className="text-[10px] uppercase tracking-[0.3em] opacity-30 font-mono">
            Built with faith &amp; caffeine // 2026
          </span>
        </div>
      </div>
    </footer>
  );
}
