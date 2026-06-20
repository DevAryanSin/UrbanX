'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import {
  Activity,
  ArrowRight,
  Award,
  BarChart3,
  Camera,
  ChevronRight,
  Droplets,
  Eye,
  Footprints,
  Globe,
  Leaf,
  MapPin,
  Rocket,
  Shield,
  Sparkles,
  TrendingUp,
  Upload,
  Zap,
} from 'lucide-react'
import { MapBackground } from '@/components/landing/MapBackground'
import { AnimatedCounter } from '@/components/landing/AnimatedCounter'
import { FeatureCard } from '@/components/landing/FeatureCard'

export default function LandingPage() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className="landing-root min-h-screen bg-ink-950 text-white">
      {/* ═══════════════════════════════════════════════════════════════
          ANIMATED MAP BACKGROUND — fixed behind entire page
      ═══════════════════════════════════════════════════════════════ */}
      <div className="fixed inset-0 z-0">
        <MapBackground />
      </div>

      {/* ═══════════════════════════════════════════════════════════════
          NAVBAR — floats on scroll
      ═══════════════════════════════════════════════════════════════ */}
      <nav
        className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-ink-950/90 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl shadow-black/40'
            : 'bg-transparent border border-transparent rounded-none'
        }`}
        style={{ width: 'min(960px, calc(100vw - 2rem))' }}
      >
        <div className="px-5 sm:px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center">
              <Activity className="w-4 h-4 text-white" />
            </div>
            <span className="font-display font-bold text-lg text-white">UrbanX</span>
          </div>
          <div className="hidden md:flex items-center gap-7 text-sm text-ink-400">
            <a href="#capabilities" className="hover:text-white transition-colors">Capabilities</a>
            <a href="#pipeline" className="hover:text-white transition-colors">Pipeline</a>
            <a href="#benchmarks" className="hover:text-white transition-colors">Benchmarks</a>
            <a href="#standards" className="hover:text-white transition-colors">Standards</a>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/dashboard"
              className="hidden sm:inline-flex text-sm text-ink-300 hover:text-white transition-colors"
            >
              Dashboard
            </Link>
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 rounded-lg bg-brand-600 hover:bg-brand-500 text-white px-4 py-2 text-sm font-semibold transition-all shadow-lg shadow-brand-600/20"
            >
              Enter App
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </nav>

      {/* ═══════════════════════════════════════════════════════════════
          HERO
      ═══════════════════════════════════════════════════════════════ */}
      <section className="relative z-10 h-screen min-h-[700px] flex items-center justify-center">
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-20">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-full bg-brand-500/10 border border-brand-500/20 backdrop-blur px-4 py-1.5 text-xs font-medium text-brand-300 mb-8 animate-fade-in">
            <Zap className="w-3 h-3" />
            AI-Powered · Pedestrian-First Urban Redesign
          </div>

          {/* Headline */}
          <h1 className="font-display text-4xl sm:text-5xl lg:text-7xl font-bold leading-[1.05] mb-6 animate-slide-up">
            Transform any street into
            <br />
            <span className="bg-gradient-to-r from-brand-400 via-brand-300 to-accent-400 bg-clip-text text-transparent">
              pedestrian-friendly
            </span>{' '}
            corridors
          </h1>

          {/* Subheadline */}
          <p className="text-lg sm:text-xl text-ink-400 max-w-2xl mx-auto mb-10 leading-relaxed animate-slide-up" style={{ animationDelay: '0.1s' }}>
            Upload a photo, drop coordinates, or pick a point on the map.
            UrbanX analyzes existing infrastructure against international benchmarks
            and generates an engineering-grade redesign — in seconds.
          </p>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <Link
              href="/dashboard"
              className="group inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-brand-500 to-brand-600 hover:from-brand-400 hover:to-brand-500 text-white px-8 py-4 text-base font-semibold transition-all shadow-2xl shadow-brand-600/30 hover:shadow-brand-500/40 hover:-translate-y-0.5"
            >
              <Rocket className="w-5 h-5 group-hover:rotate-[-5deg] transition-transform" />
              Launch Dashboard
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
            <Link
              href="/analysis"
              className="inline-flex items-center gap-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 backdrop-blur text-white px-8 py-4 text-base font-semibold transition-all hover:-translate-y-0.5"
            >
              <Camera className="w-5 h-5" />
              Try Demo Analysis
            </Link>
          </div>

          {/* Hero stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-3xl mx-auto animate-fade-in" style={{ animationDelay: '0.4s' }}>
            {[
              { value: 15000, suffix: '+', label: 'Pedestrian deaths / yr' },
              { value: 85, suffix: '%', label: 'At 50 km/h → 5% at 30' },
              { value: 7, suffix: '', label: 'Audit dimensions' },
              { value: 8, suffix: '', label: 'Output formats' },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="font-display text-2xl sm:text-3xl font-bold text-white mb-1">
                  <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                </div>
                <div className="text-xs text-ink-500">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 animate-bounce">
          <span className="text-[10px] text-ink-500 uppercase tracking-widest">Scroll</span>
          <div className="w-px h-8 bg-gradient-to-b from-ink-500 to-transparent" />
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          CAPABILITIES
      ═══════════════════════════════════════════════════════════════ */}
      <section id="capabilities" className="relative z-10 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-xs font-mono text-brand-400 uppercase tracking-widest">Capabilities</span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-white mt-3 mb-4">
              Everything needed to redesign a street
            </h2>
            <p className="text-ink-400 max-w-xl mx-auto">
              From detection to engineering drawings — a complete pedestrian infrastructure pipeline.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            <FeatureCard
              step="01"
              icon={Camera}
              title="Multi-Modal Input"
              description="Upload street photos with EXIF geolocation, enter lat/lng coordinates, or tap an interactive map. The system auto-fetches OSM, Street View, and satellite data."
            />
            <FeatureCard
              step="02"
              icon={Eye}
              title="AI Vision Analysis"
              description="YOLOv9 detects encroachments, potholes, open drains, and broken sidewalks. LLaVA understands land use, street character, and infrastructure problems."
            />
            <FeatureCard
              step="03"
              icon={Shield}
              title="7-Dimension Audit"
              description="Pedestrian infrastructure, safety, walkability, monsoon resilience, accessibility, green coverage — each scored 0–100 against IRC:SP:103 and Vision Zero."
            />
            <FeatureCard
              step="04"
              icon={Sparkles}
              title="Constraint-Based Redesign"
              description="Deterministic engine enforces 6 hard rule categories: continuous sidewalks, frequent crossings, road diet, tree canopy, covered drainage, and speed management."
            />
            <FeatureCard
              step="05"
              icon={BarChart3}
              title="Prioritized Recommendations"
              description="CRITICAL → LONG-TERM interventions with specific locations, cost estimates, and per-meter BOQ breakdowns."
            />
            <FeatureCard
              step="06"
              icon={Award}
              title="Engineering-Grade Output"
              description="GeoJSON, LandXML (Civil 3D), DWG (AutoCAD), SUMO simulation, PDF reports, before/after renders, and interactive Leaflet maps."
            />
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          PIPELINE
      ═══════════════════════════════════════════════════════════════ */}
      <section id="pipeline" className="relative z-10 py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-xs font-mono text-brand-400 uppercase tracking-widest">Pipeline</span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-white mt-3 mb-4">
              From photo to redesign in 30 seconds
            </h2>
          </div>

          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-6 sm:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-brand-500/50 via-brand-500/20 to-transparent" />

            {[
              { step: '01', title: 'Capture', desc: 'Photo upload, coordinates, or map selection', icon: Upload },
              { step: '02', title: 'Fetch Data', desc: 'OSM, Street View, Sentinel-2, OSRM routing', icon: Globe },
              { step: '03', title: 'Vision Analysis', desc: 'YOLOv9 + LLaVA + EasyOCR + SegFormer', icon: TrendingUp },
              { step: '04', title: 'Score & Audit', desc: '7 dimensions against international benchmarks', icon: BarChart3 },
              { step: '05', title: 'Generate Redesign', desc: 'Constraint-validated, IRC-compliant', icon: Sparkles },
              { step: '06', title: 'Export', desc: '8 formats ready for civil engineers', icon: Award },
            ].map((item, i) => (
              <div
                key={item.step}
                className={`relative flex items-center gap-6 mb-12 last:mb-0 ${
                  i % 2 === 0 ? 'sm:flex-row' : 'sm:flex-row-reverse'
                }`}
              >
                {/* Dot */}
                <div className="absolute left-6 sm:left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-brand-500 ring-4 ring-ink-950 z-10" />

                {/* Content */}
                <div className={`ml-14 sm:ml-0 sm:w-1/2 ${i % 2 === 0 ? 'sm:pr-12 sm:text-right' : 'sm:pl-12'}`}>
                  <div className={`inline-flex items-center gap-2 ${i % 2 === 0 ? 'sm:ml-auto' : ''} mb-2`}>
                    <item.icon className="w-4 h-4 text-brand-400" />
                    <span className="text-xs font-mono text-brand-400">{item.step}</span>
                  </div>
                  <h3 className="font-display text-xl font-semibold text-white mb-1">{item.title}</h3>
                  <p className="text-sm text-ink-400">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          BENCHMARKS
      ═══════════════════════════════════════════════════════════════ */}
      <section id="benchmarks" className="relative z-10 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-xs font-mono text-brand-400 uppercase tracking-widest">Benchmarks</span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-white mt-3 mb-4">
              World-class standards, global context
            </h2>
            <p className="text-ink-400 max-w-xl mx-auto">
              UrbanX compares your streets against Copenhagen, Amsterdam, Tokyo, Barcelona, Singapore, and Seoul.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { city: 'Copenhagen', country: 'Denmark', score: 92, highlight: '62% cycle to work', target: 'Connaught Place, Delhi' },
              { city: 'Tokyo', country: 'Japan', score: 95, highlight: 'Vision Zero wards', target: 'Metro station areas' },
              { city: 'Singapore', country: 'Singapore', score: 91, highlight: 'Tropical linkways', target: 'BKC Mumbai, Gurgaon' },
              { city: 'Amsterdam', country: 'Netherlands', score: 89, highlight: '400km cycle paths', target: 'Residential areas' },
              { city: 'Barcelona', country: 'Spain', score: 87, highlight: 'Superblock model', target: 'Residential colonies' },
              { city: 'Seoul', country: 'South Korea', score: 88, highlight: 'Highway removal', target: 'Delhi BRT corridor' },
            ].map((b) => (
              <div
                key={b.city}
                className="group rounded-2xl border border-white/5 bg-white/[0.03] hover:bg-white/[0.08] hover:border-brand-500/30 p-5 transition-all duration-300 backdrop-blur-sm"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-display font-semibold text-white">{b.city}</h3>
                    <span className="text-xs text-ink-500">{b.country}</span>
                  </div>
                  <div className="text-right">
                    <div className="font-display text-2xl font-bold text-brand-400">{b.score}</div>
                    <div className="text-[9px] text-ink-500 uppercase tracking-wider">Ped Score</div>
                  </div>
                </div>
                <div className="text-sm text-accent-400 font-medium mb-1">{b.highlight}</div>
                <div className="text-xs text-ink-500 flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  {b.target}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          STANDARDS
      ═══════════════════════════════════════════════════════════════ */}
      <section id="standards" className="relative z-10 py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-xs font-mono text-brand-400 uppercase tracking-widest">Standards</span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-white mt-3 mb-4">
              Validated against Indian codes
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {[
              { code: 'IRC:SP:103', name: 'Pedestrian Facilities' },
              { code: 'IRC:86', name: 'Geometric Design' },
              { code: 'IRC:103', name: 'Cyclists & Pedestrians' },
              { code: 'NBC 2016', name: 'National Building Code' },
              { code: 'Harmonised', name: 'Accessibility Guidelines' },
              { code: 'URDPFI', name: 'Urban Dev. Plans' },
              { code: 'Smart Cities', name: 'Design Guidelines' },
              { code: 'AMRUT', name: 'Urban Transformation' },
              { code: 'Vision Zero', name: 'Zero Ped Deaths' },
              { code: 'WHO', name: '9m² Green / Person' },
            ].map((s) => (
              <div
                key={s.code}
                className="rounded-xl border border-white/5 bg-white/[0.03] hover:bg-white/[0.08] hover:border-brand-500/20 p-4 text-center transition-all backdrop-blur-sm"
              >
                <div className="font-mono text-xs text-brand-400 mb-1">{s.code}</div>
                <div className="text-xs text-ink-400">{s.name}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          FINAL CTA
      ═══════════════════════════════════════════════════════════════ */}
      <section className="relative z-10 py-24 overflow-hidden">
        {/* Background glow */}
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-brand-500/10 blur-[120px]" />
        </div>

        <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display text-3xl sm:text-5xl font-bold text-white mb-6">
            Ready to redesign
            <br />
            <span className="text-brand-400">your city</span>?
          </h2>
          <p className="text-ink-400 text-lg mb-10 max-w-xl mx-auto">
            Zero cost. Zero training. Just drop a pin and let UrbanX do the engineering.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/dashboard"
              className="group inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-brand-500 to-brand-600 hover:from-brand-400 hover:to-brand-500 text-white px-10 py-4 text-base font-semibold transition-all shadow-2xl shadow-brand-600/30 hover:-translate-y-0.5"
            >
              <Rocket className="w-5 h-5 group-hover:rotate-[-5deg] transition-transform" />
              Open Dashboard
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
            <Link
              href="/analysis"
              className="inline-flex items-center gap-2 rounded-xl border border-white/10 hover:border-white/20 text-white px-8 py-4 text-base font-semibold transition-all hover:-translate-y-0.5"
            >
              <Sparkles className="w-5 h-5" />
              Run Analysis
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          FOOTER
      ═══════════════════════════════════════════════════════════════ */}
      <footer className="relative z-10 border-t border-white/5 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center">
              <Activity className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="font-display font-bold text-white">UrbanX</span>
            <span className="text-xs text-ink-500 ml-2">v0.1.0</span>
          </div>
          <p className="text-xs text-ink-500">
            Built for safer, walkable, monsoon-resilient cities · Open-source
          </p>
        </div>
      </footer>
    </div>
  )
}
