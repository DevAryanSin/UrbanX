'use client'

import Link from 'next/link'
import {
  ArrowRight,
  Award,
  Droplets,
  Eye,
  Footprints,
  Leaf,
  MapPin,
  Shield,
  TrendingUp,
  Upload,
  Zap,
} from 'lucide-react'
import { useAppStore } from '@/lib/store'
import { ScoreRing } from '@/components/analysis/ScoreRing'
import { StatCard } from '@/components/ui/StatCard'
import { QuickActions } from '@/components/ui/QuickActions'

export default function DashboardPage() {
  const history = useAppStore((s) => s.history)
  const latest = history[0]

  return (
    <div className="space-y-8">
      {/* Hero */}
      <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-ink-900 via-ink-800 to-ink-900 text-white p-8 lg:p-10">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-brand-500 blur-3xl" />
          <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-accent-500 blur-3xl" />
        </div>
        <div className="relative max-w-2xl">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur px-3 py-1 text-xs font-medium mb-4">
            <Zap className="w-3 h-3 text-accent-400" />
            AI-Powered · India-Specific · 100% Free
          </div>
          <h1 className="font-display text-3xl lg:text-4xl font-bold leading-tight mb-3">
            Transform Indian streets into
            <span className="text-brand-400"> pedestrian-friendly </span>
            corridors
          </h1>
          <p className="text-ink-300 text-base lg:text-lg mb-6 leading-relaxed">
            Upload a photo, drop coordinates, or pick a point on the map. UrbanX analyzes
            existing infrastructure against international benchmarks and generates an
            engineering-grade redesign — in seconds.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/analysis"
              className="inline-flex items-center gap-2 rounded-lg bg-brand-500 hover:bg-brand-400 text-white px-5 py-3 text-sm font-semibold transition-all shadow-lg shadow-brand-500/25"
            >
              <Upload className="w-4 h-4" />
              Start New Analysis
            </Link>
            <Link
              href="/map"
              className="inline-flex items-center gap-2 rounded-lg bg-white/10 hover:bg-white/20 backdrop-blur text-white px-5 py-3 text-sm font-semibold transition-all border border-white/10"
            >
              <MapPin className="w-4 h-4" />
              Pick on Map
            </Link>
          </div>
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
          <StatCard icon={Footprints} label="Walkability" value="0–100" hint="Sidewalk · crossings · shade" />
          <StatCard icon={Shield} label="Safety" value="Vision Zero" hint="Speed · conflict points" />
          <StatCard icon={Droplets} label="Monsoon Ready" value="Drainage" hint="Covered · permeable" />
          <StatCard icon={Leaf} label="Green Cover" value="Canopy %" hint="Native · 8m spacing" />
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
            <Link
              href={`/report/${latest.id}`}
              className="text-sm font-medium text-brand-600 hover:text-brand-700 inline-flex items-center gap-1"
            >
              View full report <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          <div className="grid lg:grid-cols-3 gap-4">
            <div className="card p-6 flex flex-col items-center justify-center">
              <ScoreRing score={latest.scores.overall} size={140} />
              <div className="mt-3 text-sm font-medium text-ink-600">Overall Score</div>
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
          <CapabilityCard
            step="01"
            title="Capture"
            description="Upload a street photo, enter coordinates, or tap a point on the interactive map."
            icon={Eye}
          />
          <CapabilityCard
            step="02"
            title="Analyze"
            description="YOLOv9, LLaVA, and EasyOCR detect encroachments, potholes, drains, and signage."
            icon={TrendingUp}
          />
          <CapabilityCard
            step="03"
            title="Redesign"
            description="Constraint-based engine generates an IRC-compliant, monsoon-resilient street design."
            icon={Award}
          />
        </div>
      </section>

      <QuickActions />
    </div>
  )
}

function ScoreTile({ label, score }: { label: string; score: number }) {
  return (
    <div className="rounded-lg bg-ink-50 border border-ink-100 p-3">
      <div className="text-xs text-ink-500 mb-1">{label}</div>
      <div className="font-display text-2xl font-bold text-ink-900">{score}</div>
    </div>
  )
}

function CapabilityCard({
  step,
  title,
  description,
  icon: Icon,
}: {
  step: string
  title: string
  description: string
  icon: React.ElementType
}) {
  return (
    <div className="card-hover p-6">
      <div className="flex items-center gap-3 mb-3">
        <div className="w-10 h-10 rounded-lg bg-brand-50 text-brand-600 flex items-center justify-center">
          <Icon className="w-5 h-5" />
        </div>
        <span className="text-xs font-mono text-ink-400">{step}</span>
      </div>
      <h3 className="font-display font-semibold text-ink-900 mb-1.5">{title}</h3>
      <p className="text-sm text-ink-500 leading-relaxed">{description}</p>
    </div>
  )
}
