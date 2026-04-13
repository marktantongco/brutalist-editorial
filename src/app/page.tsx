'use client';

import { useRef, useState, useEffect, useCallback, Suspense } from 'react';
import dynamic from 'next/dynamic';
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
  ScrollProgress,
  AnimatedProgressRing,
  SplitTextReveal,
} from '@/components/brutalist';
import {
  SEMINAR_META,
  HERO_STATS,
  MARQUEE_ITEMS,
  FOUR_PILLARS,
  PHASES,
  WEEKLY_JOURNEY,
  SESSION_STRUCTURE,
  METHODOLOGY,
  SUCCESS_METRICS,
  METRIC_DONUT,
  ADAPTATION_CONTEXTS,
  RESOURCES,
  SCRIPTURE_VERSES,
} from '@/components/seminar/data';

/* ═══════════════════════════════════════════════════
   NAVIGATION — Sticky floating nav
   ═══════════════════════════════════════════════════ */

const NAV_LINKS = [
  { id: 'about', label: 'About' },
  { id: 'pillars', label: '4 Pillars' },
  { id: 'journey', label: '12 Weeks' },
  { id: 'method', label: 'Method' },
  { id: 'metrics', label: 'Impact' },
  { id: 'resources', label: 'Resources' },
];

function SeminarNavigation() {
  const navRef = useRef<HTMLElement>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 100);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/90 dark:bg-black/90 backdrop-blur-sm border-b-2 border-pu-black dark:border-pu-white py-2'
          : 'bg-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between">
        <span className={`font-black text-sm uppercase tracking-wider transition-opacity ${scrolled ? 'opacity-100' : 'opacity-0'}`}>
          Living Word
        </span>
        <div className="hidden md:flex gap-6">
          {NAV_LINKS.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              className="text-[10px] font-bold uppercase tracking-[0.2em] font-mono opacity-60 hover:opacity-100 transition-opacity no-underline"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}

/* ═══════════════════════════════════════════════════
   MOBILE BOTTOM NAV
   ═══════════════════════════════════════════════════ */

function MobileBottomNav() {
  return (
    <nav className="mobile-bottom-nav md:hidden" aria-label="Mobile navigation">
      <div className="flex justify-around items-center">
        {NAV_LINKS.map((link) => (
          <a
            key={link.id}
            href={`#${link.id}`}
            className="flex flex-col items-center gap-0.5 py-1 px-2 no-underline text-center"
          >
            <span className="text-[9px] font-bold uppercase tracking-wider opacity-70 hover:opacity-100">
              {link.label}
            </span>
          </a>
        ))}
      </div>
    </nav>
  );
}

/* ═══════════════════════════════════════════════════
   LOADING FALLBACK
   ═══════════════════════════════════════════════════ */

function SectionSkeleton() {
  return (
    <div className="py-16 md:py-24 px-4 md:px-8 animate-pulse">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="h-8 bg-gray-200 dark:bg-gray-800 w-48" />
        <div className="h-4 bg-gray-200 dark:bg-gray-800 w-full max-w-2xl" />
        <div className="h-4 bg-gray-200 dark:bg-gray-800 w-3/4" />
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   HERO SECTION — Cinematic Opening
   ═══════════════════════════════════════════════════ */

function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null);
  const verseRef = useRef<HTMLDivElement>(null);
  const heroContentRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!heroRef.current) return;

      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      // Cinematic sequence
      tl.from('.hero-cross', { opacity: 0, scale: 0.5, rotation: -45, duration: 1.2, ease: 'elastic.out(1, 0.5)' })
        .from('.hero-pre-title', { opacity: 0, y: -30, duration: 0.8 }, '-=0.6')
        .from('.hero-title-1', { clipPath: 'inset(100% 0 0 0)', duration: 1.4, ease: 'expo.inOut' }, '-=0.3')
        .from('.hero-title-2', { clipPath: 'inset(100% 0 0 0)', duration: 1.2, ease: 'expo.inOut' }, '-=0.8')
        .from('.hero-title-3', { clipPath: 'inset(100% 0 0 0)', duration: 1.0, ease: 'expo.inOut' }, '-=0.7')
        .from('.hero-divider', { scaleX: 0, transformOrigin: 'left center', duration: 1.0, ease: 'power3.out' }, '-=0.5')
        .from('.hero-tagline', { opacity: 0, y: 30, duration: 0.7 }, '-=0.5')
        .from('.hero-verse-ref', { opacity: 0, duration: 1.0 }, '-=0.3')
        .from('.hero-stats', { opacity: 0, y: 40, stagger: 0.1, duration: 0.5 }, '-=0.5')
        .from('.hero-scroll', { opacity: 0, y: 20, duration: 0.5 }, '-=0.2')
        .from('.hero-watermark', { opacity: 0, duration: 2.0, ease: 'power1.out' }, '-=1.5');

      // Subtle mouse parallax
      if (heroContentRef.current) {
        heroRef.current.addEventListener('mousemove', (e) => {
          const rect = heroRef.current!.getBoundingClientRect();
          const x = (e.clientX - rect.left) / rect.width - 0.5;
          const y = (e.clientY - rect.top) / rect.height - 0.5;
          gsap.to(heroContentRef.current, {
            x: x * -12,
            y: y * -8,
            duration: 0.8,
            ease: 'power2.out',
          });
        });
        heroRef.current.addEventListener('mouseleave', () => {
          gsap.to(heroContentRef.current, { x: 0, y: 0, duration: 0.6, ease: 'power2.out' });
        });
      }

      // Animate verse rotation
      if (verseRef.current) {
        const verses = verseRef.current.querySelectorAll('.verse-item');
        let currentVerse = 0;

        const rotateVerse = () => {
          gsap.to(verses[currentVerse], { opacity: 0, y: -20, duration: 0.4, onComplete: () => {
            gsap.set(verses[currentVerse], { display: 'none' });
            currentVerse = (currentVerse + 1) % verses.length;
            gsap.set(verses[currentVerse], { display: 'block', opacity: 0, y: 20 });
            gsap.to(verses[currentVerse], { opacity: 1, y: 0, duration: 0.6 });
          }});
        };

        gsap.delayedCall(5, () => setInterval(rotateVerse, 4000));
      }
    },
    { scope: heroRef }
  );

  return (
    <section ref={heroRef} className="relative h-[100dvh] flex flex-col justify-center items-center px-4 md:px-8 grid-overlay overflow-hidden">
      {/* Radial gradient bg that adds depth */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'radial-gradient(ellipse at 50% 40%, var(--pu-yellow)/[0.06] 0%, transparent 60%)',
      }} />

      {/* Corner crosses */}
      <div className="hero-cross absolute top-6 left-6 md:top-10 md:left-10 w-8 h-8 md:w-12 md:h-12 flex items-center justify-center text-pu-red dark:text-red-500 font-black text-2xl md:text-4xl opacity-30" style={{ willChange: 'transform' }}>
        +
      </div>
      <div className="hero-cross absolute top-6 right-6 md:top-10 md:right-10 w-8 h-8 md:w-12 md:h-12 flex items-center justify-center text-pu-red dark:text-red-500 font-black text-2xl md:text-4xl opacity-30" style={{ willChange: 'transform' }}>
        +
      </div>
      <div className="hero-cross absolute bottom-6 left-6 md:bottom-10 md:left-10 w-8 h-8 md:w-12 md:h-12 flex items-center justify-center text-pu-red dark:text-red-500 font-black text-2xl md:text-4xl opacity-30" style={{ willChange: 'transform' }}>
        +
      </div>
      <div className="hero-cross absolute bottom-6 right-6 md:bottom-10 md:right-10 w-8 h-8 md:w-12 md:h-12 flex items-center justify-center text-pu-red dark:text-red-500 font-black text-2xl md:text-4xl opacity-30" style={{ willChange: 'transform' }}>
        +
      </div>

      {/* Large watermark */}
      <div className="hero-watermark absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none">
        <span className="text-[15rem] md:text-[25rem] lg:text-[35rem] font-black text-pu-black/[0.03] dark:text-pu-white/[0.03] leading-none">
          L
        </span>
      </div>

      <div ref={heroContentRef} className="max-w-5xl mx-auto text-center relative z-10">
        {/* Pre-title badge */}
        <div className="hero-pre-title mb-6 md:mb-8">
          <span className="label-tag">Bible Study Seminar {'//'} {SEMINAR_META.date} {'//'} Filipino Church</span>
        </div>

        {/* Main headline — cinematic clip reveal */}
        <h1 className="type-hero font-black leading-[0.85] uppercase tracking-tighter">
          <span className="hero-title-1 block" style={{ willChange: 'transform' }}>The</span>
          <span className="hero-title-2 block text-pu-yellow" style={{ WebkitTextStroke: '0px transparent', willChange: 'transform' }}>
            Living
          </span>
          <span
            className="hero-title-3 block text-stroke-thick text-shadow-brutal"
            style={{ WebkitTextStrokeColor: '#CC0000', willChange: 'transform' }}
          >
            Word
          </span>
        </h1>

        {/* Animated divider line */}
        <div className="hero-divider mx-auto mt-6 md:mt-8 h-[3px] w-32 bg-pu-black dark:bg-pu-white" style={{ willChange: 'transform' }} />

        {/* Tagline with scramble */}
        <div className="hero-tagline mt-6 md:mt-8">
          <TextScramble
            text="Knowing God Through Scripture — A 12-Week Transformative Journey"
            className="font-mono text-xs md:text-sm max-w-xl mx-auto leading-relaxed opacity-60"
          />
        </div>

        {/* Rotating Scripture verse */}
        <div ref={verseRef} className="hero-verse-ref mt-6 md:mt-8 h-12 flex items-center justify-center">
          {SCRIPTURE_VERSES.map((v, i) => (
            <p
              key={i}
              className={`verse-item absolute font-mono text-[10px] md:text-xs italic opacity-80 max-w-md ${i === 0 ? '' : 'hidden'}`}
            >
              &ldquo;{v.text}&rdquo; — <span className="font-bold not-italic">{v.ref}</span>
            </p>
          ))}
        </div>

        {/* Quick stats — bigger */}
        <div className="hero-stats flex flex-wrap justify-center gap-6 md:gap-8 mt-8 md:mt-10">
          {HERO_STATS.map((stat, i) => (
            <div key={i} className="text-center" style={{ willChange: 'transform' }}>
              <span className="block type-h3 font-black text-pu-black dark:text-pu-white">
                {stat.value}
                <span className="text-pu-yellow text-lg">{stat.suffix}</span>
              </span>
              <span className="block text-[9px] md:text-[10px] uppercase tracking-[0.3em] font-mono opacity-50 mt-1">
                {stat.label}
              </span>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-8 md:mt-10 flex flex-col sm:flex-row gap-3 justify-center">
          <MagneticButton className="border-2 border-pu-black dark:border-pu-white bg-pu-black dark:bg-pu-white text-pu-white dark:text-pu-black px-6 py-3 text-xs md:text-sm font-bold uppercase tracking-wider hover:bg-pu-red hover:border-pu-red hover:text-white dark:hover:bg-pu-red dark:hover:border-pu-red dark:hover:text-white cursor-pointer">
            Explore the Seminar
          </MagneticButton>
          <MagneticButton className="border-2 border-pu-black dark:border-pu-white bg-pu-yellow dark:bg-pu-yellow text-pu-black px-6 py-3 text-xs md:text-sm font-bold uppercase tracking-wider cursor-pointer">
            12-Week Journey
          </MagneticButton>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="hero-scroll absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="text-[10px] uppercase tracking-[0.3em] font-bold opacity-40 font-mono">
          Scroll to Begin
        </span>
        <div className="w-[1px] h-10 bg-gradient-to-b from-pu-black/60 to-transparent dark:from-pu-white/60 animate-pulse" />
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════
   EXECUTIVE SUMMARY — About Section
   ═══════════════════════════════════════════════════ */

function AboutSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!sectionRef.current) return;
      const lines = sectionRef.current.querySelectorAll('.about-line');
      gsap.from(lines, {
        y: 60,
        opacity: 0,
        stagger: 0.15,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          once: true,
        },
      });
    },
    { scope: sectionRef }
  );

  return (
    <section id="about" ref={sectionRef} className="py-[var(--space-lg)] px-4 md:px-8" style={{ contain: 'layout style paint' }}>
      <div className="max-w-6xl mx-auto">
        <ScrollReveal direction="up" className="mb-12 md:mb-16">
          <div className="border-b-3 border-pu-black dark:border-pu-white pb-4">
            <span className="label-tag">About the Seminar</span>
            <h2 className="mt-4">
              A Transformative
              <br />
              <span className="text-stroke" style={{ WebkitTextStrokeColor: '#FFEA00' }}>
                Bible Study
              </span>{' '}
              Framework
            </h2>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12">
          {/* Main text with red accent line */}
          <div className="lg:col-span-2 space-y-5 border-l-[4px] border-pu-red pl-6 md:pl-8">
            <p className="about-line type-body leading-relaxed opacity-80">
              The Living Word is a comprehensive 12-week program designed to equip Filipino Christian believers at every stage of spiritual maturity to know God deeply through His attributes, character, and abiding presence. Rooted in the rich tradition of evangelical Filipino church life, this seminar draws from real Bible study sessions that demonstrated the hunger of Filipino believers to encounter God not merely intellectually, but relationally and transformationally.
            </p>
            <p className="about-line type-body leading-relaxed opacity-80">
              At the heart of this framework lies the SOAP inductive Bible study method — <span className="font-bold text-pu-yellow bg-pu-black dark:bg-pu-yellow dark:text-pu-black px-1">Scripture</span>, <span className="font-bold text-pu-yellow bg-pu-black dark:bg-pu-yellow dark:text-pu-black px-1">Observation</span>, <span className="font-bold text-pu-yellow bg-pu-black dark:bg-pu-yellow dark:text-pu-black px-1">Application</span>, and <span className="font-bold text-pu-yellow bg-pu-black dark:bg-pu-yellow dark:text-pu-black px-1">Prayer</span> — a systematic yet accessible approach that guides participants from textual engagement to personal obedience.
            </p>
            <p className="about-line type-body leading-relaxed opacity-80">
              Built upon the 4-Pillar Architecture — Encounter, Exegesis, Examination, and Expression — the seminar mirrors the natural rhythm of spiritual growth. Each 90-minute session moves participants from corporate worship through deep textual study, into personal application and accountability, and finally out into missional expression, ensuring head knowledge is consistently translated into heart transformation.
            </p>
          </div>

          {/* Quick facts sidebar — bigger padding */}
          <div className="space-y-4">
            {[
              { label: 'Duration', value: '12 Weeks (modular)' },
              { label: 'Format', value: 'Weekly 90-min sessions' },
              { label: 'Method', value: 'Inductive SOAP Study' },
              { label: 'Language', value: 'Bilingual Filipino-English' },
              { label: 'Group Size', value: '3-4 per breakout group' },
              { label: 'Aim', value: 'Head → Heart → Hands' },
            ].map((item, i) => (
              <ScrollReveal key={i} direction={i % 2 === 0 ? 'left' : 'right'} delay={i * 0.05}>
                <div className="border-2 border-pu-black dark:border-pu-white p-4 md:p-5 flex justify-between items-center gap-4 hover:bg-pu-yellow/10 dark:hover:bg-pu-yellow/5 transition-colors">
                  <span className="type-micro font-bold uppercase tracking-[0.2em] font-mono opacity-50">
                    {item.label}
                  </span>
                  <span className="type-small font-bold text-right">
                    {item.value}
                  </span>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════
   4-PILLAR ARCHITECTURE — Animated Interactive Cards
   ═══════════════════════════════════════════════════ */

function PillarsSection() {
  const pillarsRef = useRef<HTMLDivElement>(null);
  const [activePillar, setActivePillar] = useState<number | null>(null);

  const pillarPercentages = [22, 39, 22, 17];
  const pillarColors = ['#FFEA00', '#CC0000', '#888888', '#FFEA00'];

  return (
    <section id="pillars" ref={pillarsRef} className="py-[var(--space-lg)] px-4 md:px-8 bg-pu-black dark:bg-pu-white text-pu-white dark:text-pu-black" style={{ contain: 'layout style paint' }}>
      <div className="max-w-6xl mx-auto">
        <ScrollReveal direction="up" className="mb-12 md:mb-16">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 border-b-2 border-pu-white dark:border-pu-black pb-4">
            <div>
              <span className="label-tag">Architecture</span>
              <h2 className="mt-4">
                The 4
                <br />
                <span className="text-stroke" style={{ WebkitTextStrokeColor: '#FFEA00' }}>
                  Pillars
                </span>
              </h2>
            </div>
            <p className="type-small max-w-sm opacity-60 font-mono">
              Each pillar engages the whole person — head, heart, and hands — in a progression that mirrors biblical spiritual formation.
            </p>
          </div>
        </ScrollReveal>

        {/* Progress bar showing session time allocation — 6px tall with rounded caps */}
        <ScrollReveal direction="up" className="mb-12">
          <div className="flex h-[6px] border-2 border-pu-white dark:border-pu-black overflow-hidden" style={{ borderRadius: '9999px' }}>
            <div className="bg-pu-yellow" style={{ width: '22.2%' }} title="Encounter: 20min" />
            <div className="bg-pu-red" style={{ width: '38.9%' }} title="Exegesis: 35min" />
            <div className="bg-pu-white dark:bg-pu-black" style={{ width: '22.2%' }} title="Examination: 20min" />
            <div className="bg-pu-yellow" style={{ width: '16.7%' }} title="Expression: 15min" />
          </div>
          <div className="flex justify-between mt-2 type-micro font-mono uppercase tracking-wider opacity-40">
            <span>20 min</span>
            <span>35 min</span>
            <span>20 min</span>
            <span>15 min</span>
          </div>
        </ScrollReveal>

        {/* Animated Progress Rings */}
        <ScrollReveal direction="up" className="mb-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 max-w-2xl mx-auto">
            {FOUR_PILLARS.map((pillar, i) => (
              <div key={i} className="relative flex items-center justify-center">
                <AnimatedProgressRing
                  value={pillarPercentages[i]}
                  size={100}
                  strokeWidth={5}
                  color={pillarColors[i]}
                  label={pillar.title}
                />
              </div>
            ))}
          </div>
        </ScrollReveal>

        {/* Pillar cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {FOUR_PILLARS.map((pillar, i) => (
            <ScrollReveal key={i} direction={i % 2 === 0 ? 'up' : 'left'} delay={i * 0.1}>
              <BrutalistCard
                hoverShadow={`8px 8px 0px ${pillar.color}`}
                className={`p-5 md:p-6 cursor-pointer ${activePillar === i ? 'border-glow' : ''}`}
                borderColor={activePillar === i ? '#FFEA00' : undefined}
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <span className="text-4xl md:text-5xl font-black block" style={{ color: pillar.color === '#0A0A0A' ? '#888888' : pillar.color }}>
                      {pillar.number}
                    </span>
                    <h3 className="text-xl md:text-2xl font-black uppercase mt-1">{pillar.title}</h3>
                  </div>
                  <span className="label-tag text-[9px] whitespace-nowrap" style={{ background: pillar.color, color: pillar.color === '#0A0A0A' ? '#FAFAFA' : '#000' }}>
                    {pillar.duration}
                  </span>
                </div>

                <p className="type-micro uppercase tracking-[0.3em] font-mono opacity-40 mb-3">
                  {pillar.subtitle}
                </p>

                <p className="text-xs md:text-sm leading-relaxed opacity-60 mb-4">
                  {pillar.description}
                </p>

                {/* Expandable bullet points */}
                <button
                  onClick={() => setActivePillar(activePillar === i ? null : i)}
                  className="type-micro font-bold uppercase tracking-[0.2em] font-mono opacity-60 hover:opacity-100 transition-opacity cursor-pointer flex items-center gap-2"
                >
                  <span className={`inline-block transition-transform ${activePillar === i ? 'rotate-45' : ''}`}>+</span>
                  {activePillar === i ? 'Collapse' : 'Details'}
                </button>

                {activePillar === i && (
                  <div className="mt-4 space-y-3 border-t-2 border-pu-white/20 dark:border-pu-black/20 pt-4">
                    {pillar.points.map((point, j) => (
                      <div key={j} className="flex gap-3">
                        <span className="w-1.5 h-1.5 mt-1.5 flex-shrink-0" style={{ background: pillar.color === '#0A0A0A' ? '#888888' : pillar.color }} />
                        <div>
                          <span className="block text-xs font-bold uppercase">{point.label}</span>
                          <span className="block text-[11px] opacity-60 mt-0.5">{point.text}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </BrutalistCard>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════
   12-WEEK JOURNEY MAP — Animated Timeline
   ═══════════════════════════════════════════════════ */

function JourneySection() {
  const journeyRef = useRef<HTMLDivElement>(null);

  return (
    <section id="journey" ref={journeyRef} className="py-[var(--space-lg)] px-4 md:px-8" style={{ contain: 'layout style paint' }}>
      <div className="max-w-6xl mx-auto">
        <ScrollReveal direction="up" className="mb-12 md:mb-16">
          <div className="border-b-3 border-pu-black dark:border-pu-white pb-4">
            <span className="label-tag">Journey Map</span>
            <h2 className="mt-4">
              12-Week
              <br />
              <span className="text-stroke" style={{ WebkitTextStrokeColor: '#CC0000' }}>
                Progressive
              </span>{' '}
              Path
            </h2>
          </div>
        </ScrollReveal>

        {/* Phase overview cards — full-width horizontal scroll on mobile */}
        <div className="snap-x-mobile flex md:grid md:grid-cols-4 gap-3 md:gap-4 mb-16 md:mb-24 pb-4 md:pb-0">
          {PHASES.map((phase, i) => (
            <ScrollReveal key={i} direction="up" delay={i * 0.1}>
              <div className="border-2 border-pu-black dark:border-pu-white p-4 md:p-5 min-w-[200px] md:min-w-0" style={{ background: phase.color === '#0A0A0A' ? undefined : `${phase.color}15` }}>
                <span className="type-micro font-mono uppercase tracking-wider opacity-50 block mb-1">
                  Weeks {phase.weeks}
                </span>
                <h3 className="text-lg md:text-xl font-black uppercase">{phase.name}</h3>
                <p className="type-micro opacity-50 mt-1 font-mono leading-relaxed">
                  {phase.focus}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Week-by-week grid with hover expand and "Currently: Week" indicator */}
        <ParallaxSection speed={0.1}>
          {/* Currently indicator */}
          <div className="flex items-center gap-2 mb-6">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pu-red opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-pu-red" />
            </span>
            <span className="type-micro font-mono uppercase tracking-[0.2em] font-bold opacity-60">
              Currently: Week 4 — Foundation Phase
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-5">
            {WEEKLY_JOURNEY.map((week, i) => (
              <ScrollReveal key={i} direction={i % 3 === 0 ? 'up' : i % 3 === 1 ? 'left' : 'right'} delay={i * 0.04}>
                <div className="group border-2 border-pu-black dark:border-pu-white p-4 md:p-5 hover:-translate-y-1 transition-transform duration-200 cursor-default">
                  <div className="flex items-center justify-between mb-3">
                    <span
                      className="text-2xl md:text-3xl font-black"
                      style={{ color: week.color === '#0A0A0A' ? '#888888' : week.color }}
                    >
                      {String(week.week).padStart(2, '0')}
                    </span>
                    <span className="text-[9px] font-mono uppercase tracking-wider opacity-40 px-2 py-0.5 border border-current">
                      {week.phase}
                    </span>
                  </div>
                  <h3 className="text-base md:text-lg font-black uppercase mb-1 group-hover:text-pu-red transition-colors">
                    {week.theme}
                  </h3>
                  <p className="text-[10px] font-mono text-pu-red dark:text-red-400 mb-2">{week.scripture}</p>
                  {/* Focus text expands on hover */}
                  <p className="text-[11px] leading-relaxed opacity-0 max-h-0 group-hover:opacity-60 group-hover:max-h-40 transition-all duration-300 overflow-hidden">
                    {week.focus}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </ParallaxSection>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════
   SESSION STRUCTURE — Animated Visual Template
   ═══════════════════════════════════════════════════ */

function SessionStructureSection() {
  const structRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!structRef.current) return;
      const blocks = structRef.current.querySelectorAll('.struct-block');
      // Stagger from alternating sides
      blocks.forEach((block, i) => {
        gsap.from(block, {
          x: i % 2 === 0 ? -60 : 60,
          opacity: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: block,
            start: 'top 85%',
            once: true,
          },
          delay: i * 0.1,
        });
      });

      // Animate progress bar
      const progressBar = structRef.current.querySelector('.time-bar');
      if (progressBar) {
        gsap.from(progressBar, {
          scaleX: 0,
          transformOrigin: 'left center',
          duration: 1.5,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: progressBar,
            start: 'top 80%',
            once: true,
          },
        });
      }
    },
    { scope: structRef }
  );

  const dotColors = SESSION_STRUCTURE.map(s => s.color === '#0A0A0A' ? '#888888' : s.color);

  return (
    <section ref={structRef} className="py-[var(--space-lg)] px-4 md:px-8 bg-pu-yellow dark:bg-yellow-900/20" style={{ contain: 'layout style paint' }}>
      <div className="max-w-5xl mx-auto">
        <ScrollReveal direction="up" className="mb-12 md:mb-16">
          <div className="border-b-3 border-pu-black dark:border-pu-white pb-4">
            <span className="label-tag">Template</span>
            <h2 className="mt-4 text-pu-black dark:text-pu-white">
              Session
              <br />
              <span className="text-pu-red">Structure</span>
            </h2>
            <p className="type-small mt-3 opacity-60 font-mono max-w-xl">
              Every 90-minute session follows this reusable blueprint. Facilitators customize content while maintaining structural integrity.
            </p>
          </div>
        </ScrollReveal>

        {/* Animated time allocation bar — 6px tall with labels inside */}
        <div className="mb-10">
          <div className="flex h-8 bg-black/10 dark:bg-white/10 overflow-hidden">
            <div className="time-bar flex h-full">
              {SESSION_STRUCTURE.map((s, i) => (
                <div
                  key={i}
                  className="flex items-center justify-center"
                  style={{
                    width: `${(parseInt(s.time) / 90) * 100}%`,
                    backgroundColor: s.color === '#0A0A0A' ? '#888888' : s.color,
                    minWidth: i === 1 ? '38%' : undefined,
                  }}
                >
                  <span className="text-[8px] md:text-[9px] font-bold uppercase tracking-wider text-black/80 font-mono truncate px-1">
                    {s.pillar}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div className="flex justify-between mt-2">
            <span className="type-micro font-mono uppercase tracking-wider opacity-50">0:00</span>
            <span className="type-micro font-mono uppercase tracking-wider opacity-50">1:30</span>
          </div>
        </div>

        {/* Session blocks with vertical timeline connector */}
        <div className="space-y-4 md:space-y-6 relative">
          {/* Vertical timeline connector */}
          <div className="absolute left-[7px] top-6 bottom-6 w-[2px] bg-pu-black/20 dark:bg-pu-white/20 hidden md:block" />

          {SESSION_STRUCTURE.map((session, i) => (
            <div key={i} className="struct-block border-2 border-pu-black dark:border-pu-white bg-white dark:bg-pu-black p-5 md:p-6 relative" style={{ willChange: 'transform' }}>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  {/* Colored dot with connector */}
                  <div
                    className="w-4 h-4 border-2 border-pu-black dark:border-pu-white relative z-10"
                    style={{ backgroundColor: session.color === '#0A0A0A' ? '#888888' : session.color }}
                  />
                  <h3 className="text-lg md:text-xl font-black uppercase text-pu-black dark:text-pu-white">
                    {session.pillar}
                  </h3>
                </div>
                <span className="type-micro font-mono font-bold uppercase tracking-wider px-3 py-1 border-2 border-pu-black dark:border-pu-white">
                  {session.time}
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {session.steps.map((step, j) => (
                  <div key={j} className="flex gap-2 items-start">
                    <span className="text-pu-red font-black text-xs mt-0.5">{String(j + 1).padStart(2, '0')}</span>
                    <div>
                      <span className="block text-xs font-bold uppercase text-pu-black dark:text-pu-white">{step.title}</span>
                      <span className="block text-[11px] opacity-50 font-mono mt-0.5">{step.desc}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Homework note */}
        <ScrollReveal direction="up" className="mt-8">
          <div className="border-2 border-dashed border-pu-black/30 dark:border-pu-white/30 p-5 md:p-6">
            <h4 className="text-sm font-black uppercase mb-3 flex items-center gap-2">
              <span className="w-6 h-6 bg-pu-black dark:bg-pu-white text-pu-white dark:text-pu-black flex items-center justify-center text-[10px] font-bold">HW</span>
              Homework (Between Sessions)
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs opacity-60 font-mono">
              <span>Daily Scripture reading (5-day plan)</span>
              <span>Memory verse meditation</span>
              <span>Obedience step execution</span>
              <span>Next week preparation</span>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════
   METHODOLOGY — Core Distinctives
   ═══════════════════════════════════════════════════ */

function MethodologySection() {
  return (
    <section id="method" className="py-[var(--space-lg)] px-4 md:px-8" style={{ contain: 'layout style paint' }}>
      <div className="max-w-6xl mx-auto">
        <ScrollReveal direction="up" className="mb-12 md:mb-16">
          <div className="border-b-3 border-pu-black dark:border-pu-white pb-4">
            <span className="label-tag">Distinctives</span>
            <h2 className="mt-4">
              Core
              <br />
              <span className="text-stroke" style={{ WebkitTextStrokeColor: '#FFEA00' }}>
                Methodology
              </span>
            </h2>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {METHODOLOGY.map((method, i) => (
            <ScrollReveal key={i} direction={i % 3 === 0 ? 'up' : i % 3 === 1 ? 'left' : 'right'} delay={i * 0.08}>
              <BrutalistCard
                hoverShadow={`6px 6px 0px ${i % 2 === 0 ? '#FFEA00' : '#CC0000'}`}
                className="p-5 md:p-6 h-full flex flex-col"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-3xl font-black opacity-20">{method.number}</span>
                  <span className="text-[9px] font-mono italic text-pu-red dark:text-red-400">{method.verse}</span>
                </div>
                <SplitTextReveal
                  text={method.title}
                  tag="h3"
                  className="text-base md:text-lg font-black uppercase mb-3"
                  stagger={0.04}
                />
                <p className="text-xs leading-relaxed opacity-60 flex-grow">{method.description}</p>
              </BrutalistCard>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════
   SUCCESS METRICS — Infographic Dashboard
   ═══════════════════════════════════════════════════ */

function MetricsSection() {
  return (
    <section id="metrics" className="py-[var(--space-lg)] px-4 md:px-8 bg-pu-black dark:bg-pu-white text-pu-white dark:text-pu-black" style={{ contain: 'layout style paint' }}>
      <div className="max-w-6xl mx-auto">
        <ScrollReveal direction="up" className="mb-12 md:mb-16">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 border-b-2 border-pu-white dark:border-pu-black pb-4">
            <div>
              <span className="label-tag">Impact</span>
              <h2 className="mt-4">
                Success
                <br />
                <span className="text-stroke" style={{ WebkitTextStrokeColor: '#FFEA00' }}>Metrics</span>
              </h2>
            </div>
            <p className="type-small max-w-sm opacity-50 font-mono">
              Measurable indicators tracking both short-term engagement and long-term transformation across all participants.
            </p>
          </div>
        </ScrollReveal>

        {/* Animated Progress Rings — 3 key metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 md:mb-24 max-w-3xl mx-auto">
          {[
            { label: 'Retention', value: 90, color: '#FFEA00', desc: 'After 6 weeks' },
            { label: 'Engagement', value: 80, color: '#CC0000', desc: 'Per session' },
            { label: 'SOAP', value: 100, color: '#FFFFFF', desc: 'Weekly target' },
          ].map((ring, i) => (
            <ScrollReveal key={i} direction="up" delay={i * 0.15}>
              <div className="flex flex-col items-center">
                <div className="relative">
                  <AnimatedProgressRing
                    value={ring.value}
                    size={130}
                    strokeWidth={7}
                    color={ring.color}
                  />
                </div>
                <span className="mt-2 type-small font-bold uppercase tracking-wider">{ring.label}</span>
                <span className="type-micro font-mono opacity-40">{ring.desc}</span>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Horizontal bar chart + Key Results box */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
          <ScrollReveal direction="left">
            <div className="border-2 border-pu-white dark:border-pu-black p-6 md:p-8">
              <h3 className="text-base md:text-lg font-black uppercase mb-2">Target Achievement</h3>
              <p className="type-micro font-mono opacity-40 mb-6">Projected success rates — horizontal view</p>
              <AnimatedBarChart
                data={[
                  { label: 'Retention', value: 90, color: '#FFEA00' },
                  { label: 'Engage', value: 80, color: '#CC0000' },
                  { label: 'SOAP', value: 100, color: '#FAFAFA' },
                  { label: 'Lead', value: 30, color: '#FFEA00' },
                  { label: 'Groups', value: 85, color: '#CC0000' },
                ]}
                className="h-56 md:h-64"
              />
            </div>
          </ScrollReveal>

          {/* Key Results summary box with border-glow */}
          <ScrollReveal direction="right">
            <div className="border-2 border-pu-white dark:border-pu-black p-6 md:p-8 border-glow h-full flex flex-col justify-center">
              <h3 className="text-base md:text-lg font-black uppercase mb-4">Key Results</h3>
              <div className="space-y-4">
                {[
                  { metric: '90% Retention', detail: 'At least 90% of participants complete all 12 weeks' },
                  { metric: '100% SOAP Adoption', detail: 'Every participant completes weekly SOAP journal entries' },
                  { metric: '30% New Leaders', detail: 'At least 30% facilitate a session by Week 12' },
                  { metric: '2+ New Groups', detail: 'At least 2 new Bible study groups launch post-seminar' },
                ].map((result, i) => (
                  <div key={i} className="flex gap-3 items-start">
                    <span className="text-pu-red font-black text-sm mt-0.5">{String(i + 1).padStart(2, '0')}</span>
                    <div>
                      <span className="block text-sm font-bold uppercase">{result.metric}</span>
                      <span className="block text-[11px] opacity-50 font-mono mt-0.5">{result.detail}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════
   ADAPTATION FRAMEWORK — Interactive Cards
   ═══════════════════════════════════════════════════ */

function AdaptationSection() {
  const [activeContext, setActiveContext] = useState<number | null>(null);

  return (
    <section className="py-[var(--space-lg)] px-4 md:px-8" style={{ contain: 'layout style paint' }}>
      <div className="max-w-6xl mx-auto">
        <ScrollReveal direction="up" className="mb-12 md:mb-16">
          <div className="border-b-3 border-pu-black dark:border-pu-white pb-4">
            <span className="label-tag">Flexibility</span>
            <h2 className="mt-4">
              Adaptation
              <br />
              <span className="text-stroke" style={{ WebkitTextStrokeColor: '#CC0000' }}>Framework</span>
            </h2>
          </div>
        </ScrollReveal>

        {/* Context selector buttons — horizontal scrollable on mobile */}
        <div className="horizontal-scroll-section flex md:flex-wrap gap-2 md:gap-3 mb-8 pb-2 md:pb-0">
          {ADAPTATION_CONTEXTS.map((ctx, i) => (
            <button
              key={i}
              onClick={() => setActiveContext(activeContext === i ? null : i)}
              className={`whitespace-nowrap px-3 md:px-4 py-2 type-micro font-bold uppercase tracking-wider font-mono border-2 border-pu-black dark:border-pu-white cursor-pointer transition-all duration-300 ${
                activeContext === i
                  ? 'bg-pu-black dark:bg-pu-white text-pu-white dark:text-pu-black'
                  : 'bg-transparent hover:bg-pu-yellow'
              }`}
            >
              {ctx.emoji} {ctx.context}
            </button>
          ))}
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {ADAPTATION_CONTEXTS.map((ctx, i) => (
            <ScrollReveal key={i} direction="up" delay={i * 0.08}>
              <div
                className={`border-2 border-pu-black dark:border-pu-white p-5 transition-all duration-300 ${
                  activeContext === i ? 'bg-pu-yellow/10 ring-2 ring-pu-yellow' : ''
                } ${activeContext !== null && activeContext !== i ? 'opacity-40' : ''}`}
              >
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xl">{ctx.emoji}</span>
                  <h3 className="text-sm md:text-base font-black uppercase">{ctx.context}</h3>
                </div>
                {(activeContext === i || activeContext === null) && (
                  <ul className="space-y-2">
                    {ctx.modifications.map((mod, j) => (
                      <li key={j} className="flex gap-2 text-xs opacity-70">
                        <span className="text-pu-red font-black flex-shrink-0">{String(j + 1).padStart(2, '0')}</span>
                        {mod}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════
   ESSENTIAL RESOURCES — Card Grid
   ═══════════════════════════════════════════════════ */

function ResourcesSection() {
  return (
    <section id="resources" className="py-[var(--space-lg)] px-4 md:px-8 bg-pu-black dark:bg-pu-white text-pu-white dark:text-pu-black" style={{ contain: 'layout style paint' }}>
      <div className="max-w-6xl mx-auto">
        <ScrollReveal direction="up" className="mb-12 md:mb-16">
          <div className="border-b-2 border-pu-white dark:border-pu-black pb-4">
            <span className="label-tag">Tools</span>
            <h2 className="mt-4">
              Essential
              <br />
              <span className="text-stroke" style={{ WebkitTextStrokeColor: '#FFEA00' }}>Resources</span>
            </h2>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {RESOURCES.map((res, i) => (
            <ScrollReveal key={i} direction={i % 2 === 0 ? 'up' : 'left'} delay={i * 0.08}>
              <BrutalistCard
                hoverShadow={`6px 6px 0px ${i % 2 === 0 ? '#FFEA00' : '#CC0000'}`}
                className="p-5 md:p-6 h-full hover-lift"
              >
                <span className="text-2xl block mb-3">{res.icon}</span>
                <h3 className="text-base md:text-lg font-black uppercase mb-1">{res.title}</h3>
                <p className="type-micro font-mono text-pu-yellow dark:text-yellow-400 mb-3">{res.subtitle}</p>
                <p className="text-xs leading-relaxed opacity-60">{res.description}</p>
              </BrutalistCard>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════
   COMMISSIONING CTA — Closing Section
   ═══════════════════════════════════════════════════ */

function CommissioningSection() {
  const ctaRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!ctaRef.current) return;
      const elements = ctaRef.current.querySelectorAll('.commission-animate');
      gsap.from(elements, {
        y: 40,
        opacity: 0,
        stagger: 0.15,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: ctaRef.current,
          start: 'top 75%',
          once: true,
        },
      });

      // Clip-path reveal for the main title
      gsap.from(ctaRef.current.querySelector('.commission-title'), {
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
    <section ref={ctaRef} className="py-[var(--space-lg)] px-4 md:px-8 bg-pu-yellow dark:bg-yellow-900/20" style={{ contain: 'layout style paint' }}>
      <div className="max-w-4xl mx-auto text-center">
        <span className="commission-animate label-tag mb-6 inline-block">Commissioning</span>
        <h2 className="commission-title type-h1 font-black uppercase leading-[0.95] text-pu-black dark:text-pu-white text-shadow-brutal">
          Equipped to
          <br />
          <span className="text-pu-red">Multiply</span>
        </h2>
        <p className="commission-animate mt-6 md:mt-8 type-body max-w-lg mx-auto opacity-70 leading-relaxed font-mono text-pu-black/70 dark:text-pu-white/70">
          &ldquo;And the things you have heard me say in the presence of many witnesses entrust to reliable people
          who will also be qualified to teach others.&rdquo;
        </p>
        <p className="commission-animate mt-2 text-xs font-bold font-mono text-pu-black/50 dark:text-pu-white/50">
          — 2 Timothy 2:2
        </p>

        <div className="commission-animate mt-8 md:mt-10 flex flex-col sm:flex-row gap-3 justify-center">
          <MagneticButton className="border-3 border-pu-black dark:border-pu-white bg-pu-black dark:bg-pu-white text-pu-white dark:text-pu-black px-8 py-4 text-xs md:text-sm font-bold uppercase tracking-wider hover:bg-pu-red hover:border-pu-red hover:text-white dark:hover:bg-pu-red dark:hover:border-pu-red dark:hover:text-white cursor-pointer">
            Start Your Journey
          </MagneticButton>
          <MagneticButton className="border-3 border-pu-black dark:border-pu-white bg-pu-white dark:bg-pu-black text-pu-black dark:text-pu-white px-8 py-4 text-xs md:text-sm font-bold uppercase tracking-wider cursor-pointer">
            Download Framework
          </MagneticButton>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════
   FOOTER — With scroll-to-top
   ═══════════════════════════════════════════════════ */

function SeminarFooter() {
  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <footer className="border-t-3 border-pu-black dark:border-pu-white py-8 md:py-12 px-4 md:px-8 mb-14 md:mb-0">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <h3 className="text-xl md:text-2xl font-black uppercase">The Living Word</h3>
            <p className="type-micro mt-1 opacity-50 font-mono">
              A Transformative Bible Study Seminar // Filipino Christian Community
            </p>
          </div>
          <div className="flex gap-4 md:gap-6 type-micro font-bold uppercase tracking-wider font-mono flex-wrap">
            {NAV_LINKS.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                className="opacity-40 hover:opacity-100 transition-opacity no-underline"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
        <div className="mt-6 pt-4 border-t-2 border-pu-black/10 dark:border-pu-white/10 flex flex-col md:flex-row justify-between items-center gap-2">
          <span className="type-micro uppercase tracking-[0.3em] opacity-30 font-mono">
            Prepared April 2026 // Taguig, Philippines
          </span>
          <span className="type-micro uppercase tracking-[0.3em] opacity-30 font-mono">
            Built with faith &amp; powerUP // 2026
          </span>
        </div>

        {/* Scroll to top button */}
        <button
          onClick={scrollToTop}
          className="fixed bottom-20 md:bottom-6 right-6 z-40 w-10 h-10 border-2 border-pu-black dark:border-pu-white bg-pu-yellow flex items-center justify-center font-black text-sm cursor-pointer hover:-translate-y-1 transition-transform duration-200 md:hidden"
          aria-label="Scroll to top"
        >
          ↑
        </button>
      </div>
    </footer>
  );
}

/* ═══════════════════════════════════════════════════
   PAGE COMPOSITION — Dynamic Imports for Speed
   ═══════════════════════════════════════════════════ */

// Dynamically import below-fold sections for speed optimization
const DynamicSessionStructure = dynamic(() => Promise.resolve(SessionStructureSection), {
  loading: () => <SectionSkeleton />,
  ssr: false,
});

const DynamicMethodology = dynamic(() => Promise.resolve(MethodologySection), {
  loading: () => <SectionSkeleton />,
  ssr: false,
});

const DynamicMetrics = dynamic(() => Promise.resolve(MetricsSection), {
  loading: () => <SectionSkeleton />,
  ssr: false,
});

const DynamicAdaptation = dynamic(() => Promise.resolve(AdaptationSection), {
  loading: () => <SectionSkeleton />,
  ssr: false,
});

const DynamicResources = dynamic(() => Promise.resolve(ResourcesSection), {
  loading: () => <SectionSkeleton />,
  ssr: false,
});

const DynamicCommissioning = dynamic(() => Promise.resolve(CommissioningSection), {
  loading: () => <SectionSkeleton />,
  ssr: false,
});

export default function Home() {
  return (
    <SmoothScroll>
      <CustomCursor />
      <GrainOverlay />
      <SeminarNavigation />
      <main className="min-h-screen overflow-x-hidden">
        {/* ── SCROLL PROGRESS BAR ── */}
        <ScrollProgress />

        {/* ── CINEMATIC HERO ── */}
        <HeroSection />

        {/* ── MARQUEE STRIP ── */}
        <div className="border-y-3 border-pu-black dark:border-pu-white py-3 bg-pu-yellow dark:bg-yellow-500/20">
          <MarqueeStrip items={MARQUEE_ITEMS} speed={35} />
        </div>

        {/* ── ABOUT / EXECUTIVE SUMMARY ── */}
        <AboutSection />

        {/* ── 4-PILLAR ARCHITECTURE ── */}
        <PillarsSection />

        {/* ── 12-WEEK JOURNEY MAP ── */}
        <JourneySection />

        {/* ── SESSION STRUCTURE (lazy loaded) ── */}
        <Suspense fallback={<SectionSkeleton />}>
          <DynamicSessionStructure />
        </Suspense>

        {/* ── METHODOLOGY (lazy loaded) ── */}
        <Suspense fallback={<SectionSkeleton />}>
          <DynamicMethodology />
        </Suspense>

        {/* ── SUCCESS METRICS (lazy loaded) ── */}
        <Suspense fallback={<SectionSkeleton />}>
          <DynamicMetrics />
        </Suspense>

        {/* ── ADAPTATION (lazy loaded) ── */}
        <Suspense fallback={<SectionSkeleton />}>
          <DynamicAdaptation />
        </Suspense>

        {/* ── RESOURCES (lazy loaded) ── */}
        <Suspense fallback={<SectionSkeleton />}>
          <DynamicResources />
        </Suspense>

        {/* ── COMMISSIONING CTA (lazy loaded) ── */}
        <Suspense fallback={<SectionSkeleton />}>
          <DynamicCommissioning />
        </Suspense>

        {/* ── FOOTER ── */}
        <SeminarFooter />
      </main>

      {/* ── MOBILE BOTTOM NAV ── */}
      <MobileBottomNav />
    </SmoothScroll>
  );
}
