'use client'

import Link from 'next/link'
import {
  ArrowRight,
  Award,
  Droplets,
  Eye,
  Footprints,
  Layers,
  Leaf,
  Shield,
  TrendingUp,
  Zap,
} from 'lucide-react'
import { useAppStore } from '@/lib/store'
import { ScoreRing } from '@/components/analysis/ScoreRing'

export default function DashboardPage() {
  const history = useAppStore((s) => s.history)
  const latest = history[0]

  return (
    <div className="space-y-8">
      {/* Hero */}
      <section className="relative overflow-hidden rounded-2xl bg-surface-100 border border-white/[0.06] p-8 lg:p-10">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-brand-500 blur-[120px]" />
          <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-accent-500 blur-[120px]" />
        </div>
        <div className="relative max-w-2xl">
          <div className="inline-flex items-center gap-2 rounded-full bg-brand-500/10 border border-brand-500/20 px-3 py-1 text-xs font-medium text-brand-400 mb-4">
            <Zap className="w-3 h-3" />
            AI-Powered · India-Specific · 100% Free
          </div>
          <h1 className="font-display text-3xl lg:text-4xl font-bold leading-tight mb-3 text-white">
            Transform Indian streets into
            <span className="text-brand-400"> pedestrian-friendly </span>
            corridors
          </h1>
          <p className="text-white/50 text-base lg:text-lg mb-6 leading-relaxed">
            Upload a photo for instant redesign, or run the full analysis pipeline with
            grid-based interference detection, ML generation, and human-in-the-loop review.
          </p>
        </div>
      </section>

      {/* Mode cards */}
      <section>
        <h2 className="section-title mb-4">Choose Mode</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <Link href="/express/upload" className="group card-hover p-6 relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-brand-500 to-brand-400" />
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-lg bg-brand-500/10 border border-brand-500/20 text-brand-400 flex items-center justify-center">
                <Zap className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-display font-bold text-white">Express Mode</h3>
                <span className="text-xs font-mono text-brand-400">Quick Redesign</span>
              </div>
              <ArrowRight className="w-4 h-4 text-white/20 group-hover:text-brand-400 group-hover:translate-x-0.5 ml-auto transition-all" />
            </div>
            <p className="text-sm text-white/50 mb-3">
              Upload a street photo, get instant pedestrian-friendly redesign. Pre-trained model runs automatically.
            </p>
            <div className="flex gap-2">
              {['Photo Upload', 'Auto Process', '4 Exports'].map((tag) => (
                <span key={tag} className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-brand-500/10 text-brand-400 border border-brand-500/20">{tag}</span>
              ))}
            </div>
          </Link>

          <Link href="/detailed/input" className="group card-hover p-6 relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-accent-500 to-accent-400" />
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-lg bg-accent-500/10 border border-accent-500/20 text-accent-400 flex items-center justify-center">
                <Layers className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-display font-bold text-white">Detailed Mode</h3>
                <span className="text-xs font-mono text-accent-400">Full Analysis & Redesign</span>
              </div>
              <ArrowRight className="w-4 h-4 text-white/20 group-hover:text-accent-400 group-hover:translate-x-0.5 ml-auto transition-all" />
            </div>
            <p className="text-sm text-white/50 mb-3">
              6-step pipeline: grid analysis, interference detection, ML generation, SUMO simulation, LLM review.
            </p>
            <div className="flex gap-2 flex-wrap">
              {['Grid Analysis', 'Feature Selection', 'SUMO Sim', 'LLM Agent'].map((tag) => (
                <span key={tag} className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-accent-500/10 text-accent-400 border border-accent-500/20">{tag}</span>
              ))}
            </div>
          </Link>
        </div>
      </section>

      {/* Stats grid */}
      <section>
        <div className="flex items-end justify-between mb-4">
          <div>
            <h2 className="section-title">System Overview</h2>
            <p className="section-subtitle">What UrbanX measures and redesigns</p>
          </div>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="card-hover p-5"><div className="flex items-center gap-2.5 mb-3"><div className="w-9 h-9 rounded-lg bg-brand-500/10 border border-brand-500/20 text-brand-400 flex items-center justify-center"><Footprints className="w-4 h-4" /></div><span className="text-sm font-medium text-white/60">Walkability</span></div><div className="font-display text-2xl font-bold text-white mb-0.5">0–100</div><p className="text-xs text-white/30">Sidewalk · crossings · shade</p></div>
          <div className="card-hover p-5"><div className="flex items-center gap-2.5 mb-3"><div className="w-9 h-9 rounded-lg bg-brand-500/10 border border-brand-500/20 text-brand-400 flex items-center justify-center"><Shield className="w-4 h-4" /></div><span className="text-sm font-medium text-white/60">Safety</span></div><div className="font-display text-2xl font-bold text-white mb-0.5">Vision Zero</div><p className="text-xs text-white/30">Speed · conflict points</p></div>
          <div className="card-hover p-5"><div className="flex items-center gap-2.5 mb-3"><div className="w-9 h-9 rounded-lg bg-brand-500/10 border border-brand-500/20 text-brand-400 flex items-center justify-center"><Droplets className="w-4 h-4" /></div><span className="text-sm font-medium text-white/60">Monsoon Ready</span></div><div className="font-display text-2xl font-bold text-white mb-0.5">Drainage</div><p className="text-xs text-white/30">Covered · permeable</p></div>
          <div className="card-hover p-5"><div className="flex items-center gap-2.5 mb-3"><div className="w-9 h-9 rounded-lg bg-brand-500/10 border border-brand-500/20 text-brand-400 flex items-center justify-center"><Leaf className="w-4 h-4" /></div><span className="text-sm font-medium text-white/60">Green Cover</span></div><div className="font-display text-2xl font-bold text-white mb-0.5">Canopy %</div><p className="text-xs text-white/30">Native · 8m spacing</p></div>
        </div>
      </section>

      {/* Latest result */}
      {latest && (
        <section>
          <div className="flex items-end justify-between mb-4">
            <div>
              <h2 className="section-title">Latest Analysis</h2>
              <p className="section-subtitle truncate max-w-md">{latest.location.address}</p>
            </div>
            <Link href="/report" className="text-sm font-medium text-brand-400 hover:text-brand-300 inline-flex items-center gap-1">
              View full report <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          <div className="grid lg:grid-cols-3 gap-4">
            <div className="card p-6 flex flex-col items-center justify-center">
              <ScoreRing score={latest.scores.overall} size={140} />
              <div className="mt-3 text-sm font-medium text-white/60">Overall Score</div>
            </div>
            <div className="lg:col-span-2 grid grid-cols-2 sm:grid-cols-3 gap-3">
              <ScoreTile label="Walkability" score={latest.scores.walkability} />
              <ScoreTile label="Safety" score={latest.scores.safety} />
              <ScoreTile label="Accessibility" score={latest.scores.accessibility} />
              <ScoreTile label="Monsoon" score={latest.scores.monsoon} />
              <ScoreTile label="Green" score={latest.scores.green} />
              <ScoreTile label="Infrastructure" score={latest.scores.infrastructure} />
            </div>
          </div>
        </section>
      )}

      {/* Capabilities */}
      <section>
        <div className="flex items-end justify-between mb-4">
          <div>
            <h2 className="section-title">How It Works</h2>
            <p className="section-subtitle">From photo to engineering-grade redesign</p>
          </div>
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          <CapabilityCard step="01" title="Capture" description="Upload a street photo, enter coordinates, or tap a point on the interactive map." icon={Eye} />
          <CapabilityCard step="02" title="Analyze" description="YOLOv9, LLaVA, and EasyOCR detect encroachments, potholes, drains, and signage." icon={TrendingUp} />
          <CapabilityCard step="03" title="Redesign" description="Constraint-based engine generates an IRC-compliant, monsoon-resilient street design." icon={Award} />
        </div>
      </section>

      {/* Quick Actions */}
      <section>
        <h2 className="section-title mb-4">Quick Actions</h2>
        <div className="grid sm:grid-cols-3 gap-4">
          <Link href="/express/upload" className="card-hover p-5 group">
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-lg bg-brand-500/10 border border-brand-500/20 text-brand-400 flex items-center justify-center">
                <Zap className="w-5 h-5" />
              </div>
              <ArrowRight className="w-4 h-4 text-white/20 group-hover:text-brand-400 group-hover:translate-x-0.5 transition-all" />
            </div>
            <h3 className="font-display font-semibold text-white mb-1">Express Redesign</h3>
            <p className="text-sm text-white/40">Upload photo, get instant result</p>
          </Link>
          <Link href="/detailed/input" className="card-hover p-5 group">
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-lg bg-accent-500/10 border border-accent-500/20 text-accent-400 flex items-center justify-center">
                <Layers className="w-5 h-5" />
              </div>
              <ArrowRight className="w-4 h-4 text-white/20 group-hover:text-accent-400 group-hover:translate-x-0.5 transition-all" />
            </div>
            <h3 className="font-display font-semibold text-white mb-1">Full Pipeline</h3>
            <p className="text-sm text-white/40">Grid analysis → ML → SUMO → Review</p>
          </Link>
          <Link href="/map" className="card-hover p-5 group">
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-lg bg-purple-500/10 border border-purple-500/20 text-purple-400 flex items-center justify-center">
                <Eye className="w-5 h-5" />
              </div>
              <ArrowRight className="w-4 h-4 text-white/20 group-hover:text-purple-400 group-hover:translate-x-0.5 transition-all" />
            </div>
            <h3 className="font-display font-semibold text-white mb-1">Map View</h3>
            <p className="text-sm text-white/40">Pick location on interactive map</p>
          </Link>
        </div>
      </section>
    </div>
  )
}

function ScoreTile({ label, score }: { label: string; score: number }) {
  return (
    <div className="rounded-lg bg-white/[0.03] border border-white/[0.06] p-3">
      <div className="text-xs text-white/40 mb-1">{label}</div>
      <div className="font-display text-2xl font-bold text-white">{score}</div>
    </div>
  )
}

function CapabilityCard({ step, title, description, icon: Icon }: { step: string; title: string; description: string; icon: React.ElementType }) {
  return (
    <div className="card-hover p-6">
      <div className="flex items-center gap-3 mb-3">
        <div className="w-10 h-10 rounded-lg bg-brand-500/10 border border-brand-500/20 text-brand-400 flex items-center justify-center">
          <Icon className="w-5 h-5" />
        </div>
        <span className="text-xs font-mono text-white/30">{step}</span>
      </div>
      <h3 className="font-display font-semibold text-white mb-1.5">{title}</h3>
      <p className="text-sm text-white/40 leading-relaxed">{description}</p>
    </div>
  )
}
