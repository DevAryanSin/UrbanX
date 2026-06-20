'use client'

import Link from 'next/link'
import {
  AlertTriangle,
  Award,
  ChevronRight,
  Download,
  FileText,
  MapPin,
  Share2,
} from 'lucide-react'
import { useAppStore } from '@/lib/store'
import { ScoreRing } from '@/components/analysis/ScoreRing'
import { cn, formatCurrency, severityBadge, severityColor } from '@/lib/utils'

export default function ReportPage() {
  const result = useAppStore((s) => s.result)

  if (!result) {
    return (
      <div className="text-center py-20">
        <FileText className="w-12 h-12 text-ink-300 mx-auto mb-3" />
        <h2 className="font-display text-xl font-bold text-ink-900 mb-1">No report yet</h2>
        <p className="text-ink-500 mb-6">Run an analysis first to generate a report.</p>
        <Link href="/analysis" className="btn-primary">
          Start Analysis
        </Link>
      </div>
    )
  }

  const totalCost = result.recommendations.reduce((sum, r) => sum + r.estimatedCost, 0)

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header */}
      <header className="flex items-start justify-between flex-wrap gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs text-ink-400 font-mono mb-1">
            <MapPin className="w-3 h-3" />
            {result.location.lat.toFixed(4)}°N, {result.location.lng.toFixed(4)}°E
          </div>
          <h1 className="font-display text-2xl font-bold text-ink-900">{result.location.address}</h1>
          <p className="text-ink-500 text-sm mt-1">
            Analysis report · {new Date(result.createdAt).toLocaleDateString('en-IN', { dateStyle: 'long' })}
          </p>
        </div>
        <div className="flex gap-2">
          <button className="btn-secondary">
            <Share2 className="w-4 h-4" />
            Share
          </button>
          <button className="btn-primary">
            <Download className="w-4 h-4" />
            Export PDF
          </button>
        </div>
      </header>

      {/* Score overview */}
      <section className="card p-6">
        <div className="grid lg:grid-cols-[280px_1fr] gap-6 items-center">
          <div className="flex flex-col items-center">
            <ScoreRing score={result.scores.overall} size={180} />
            <div className="mt-3 text-sm font-medium text-ink-600">Overall Pedestrian Score</div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <ScoreDetail label="Walkability" score={result.scores.walkability} />
            <ScoreDetail label="Safety" score={result.scores.safety} />
            <ScoreDetail label="Accessibility" score={result.scores.accessibility} />
            <ScoreDetail label="Monsoon" score={result.scores.monsoon} />
            <ScoreDetail label="Green" score={result.scores.green} />
            <ScoreDetail label="Infrastructure" score={result.scores.infrastructure} />
          </div>
        </div>
      </section>

      {/* Audits */}
      <section>
        <h2 className="section-title mb-4">Audit Breakdown</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <AuditCard
            label="Sidewalk Coverage"
            value={`${result.audits.sidewalkCoverage}%`}
            target="≥ 90%"
            ok={result.audits.sidewalkCoverage >= 90}
          />
          <AuditCard
            label="Crossing Spacing"
            value={`${result.audits.crossingSpacing}m`}
            target="80–150m"
            ok={result.audits.crossingSpacing <= 150}
          />
          <AuditCard
            label="Speed Risk"
            value={`${result.audits.speedRisk}/100`}
            target="< 30"
            ok={result.audits.speedRisk < 30}
          />
          <AuditCard
            label="Drainage Coverage"
            value={`${result.audits.drainageCoverage}%`}
            target="100%"
            ok={result.audits.drainageCoverage >= 100}
          />
          <AuditCard
            label="Tree Canopy"
            value={`${result.audits.canopyCoverage}%`}
            target="≥ 80%"
            ok={result.audits.canopyCoverage >= 80}
          />
          <AuditCard
            label="Curb Ramps"
            value={`${result.audits.curbRampCoverage}%`}
            target="100%"
            ok={result.audits.curbRampCoverage >= 100}
          />
        </div>
      </section>

      {/* Recommendations */}
      <section>
        <div className="flex items-end justify-between mb-4">
          <div>
            <h2 className="section-title">Prioritized Recommendations</h2>
            <p className="section-subtitle">
              Total estimated cost: <span className="font-semibold text-ink-700">{formatCurrency(totalCost)}</span>
            </p>
          </div>
        </div>
        <div className="space-y-3">
          {result.recommendations.map((rec) => (
            <div
              key={rec.id}
              className={cn(
                'card p-5 border-l-4 transition-all hover:shadow-elevated',
                severityColor(rec.severity)
              )}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className={severityBadge(rec.severity)}>{rec.severity}</span>
                    <span className="text-xs text-ink-400 flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {rec.location}
                    </span>
                  </div>
                  <h3 className="font-display font-semibold text-ink-900 mb-1">{rec.title}</h3>
                  <p className="text-sm text-ink-600 leading-relaxed">{rec.description}</p>
                </div>
                <div className="text-right shrink-0">
                  <div className="text-xs text-ink-400 mb-0.5">Est. cost</div>
                  <div className="font-display font-bold text-ink-900">{formatCurrency(rec.estimatedCost)}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Output formats */}
      <section>
        <h2 className="section-title mb-4">Export Outputs</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {[
            { label: 'PDF Report', desc: 'Full analysis' },
            { label: 'GeoJSON', desc: 'GIS import' },
            { label: 'DWG', desc: 'AutoCAD' },
            { label: 'BOQ + Cost', desc: 'CSV / Excel' },
            { label: 'LandXML', desc: 'Civil 3D' },
            { label: 'SUMO', desc: 'Simulation' },
            { label: 'Before/After', desc: 'Images' },
            { label: 'Leaflet Map', desc: 'Interactive' },
          ].map((fmt) => (
            <button
              key={fmt.label}
              className="card-hover p-4 text-left flex items-center justify-between"
            >
              <div>
                <div className="font-medium text-sm text-ink-900">{fmt.label}</div>
                <div className="text-xs text-ink-500">{fmt.desc}</div>
              </div>
              <Download className="w-4 h-4 text-ink-400" />
            </button>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center py-6 border-t border-ink-100">
        <p className="text-xs text-ink-400">
          Generated by UrbanX · Validated against IRC:SP:103, IRC:86, NBC 2016, Harmonised Guidelines
        </p>
      </footer>
    </div>
  )
}

function ScoreDetail({ label, score }: { label: string; score: number }) {
  return (
    <div className="rounded-lg bg-ink-50 border border-ink-100 p-3">
      <div className="flex items-center justify-between mb-1">
        <span className="text-xs text-ink-500">{label}</span>
        <span className="font-display font-bold text-ink-900">{score}</span>
      </div>
      <div className="w-full bg-ink-200 rounded-full h-1.5 overflow-hidden">
        <div
          className={cn(
            'h-full rounded-full transition-all',
            score >= 80 ? 'bg-success' : score >= 60 ? 'bg-brand-500' : score >= 40 ? 'bg-warning' : 'bg-critical'
          )}
          style={{ width: `${score}%` }}
        />
      </div>
    </div>
  )
}

function AuditCard({
  label,
  value,
  target,
  ok,
}: {
  label: string
  value: string
  target: string
  ok: boolean
}) {
  return (
    <div className="card p-4">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm text-ink-600">{label}</span>
        {ok ? (
          <Award className="w-4 h-4 text-success" />
        ) : (
          <AlertTriangle className="w-4 h-4 text-warning" />
        )}
      </div>
      <div className="font-display text-2xl font-bold text-ink-900">{value}</div>
      <div className="text-xs text-ink-400 mt-1">Target: {target}</div>
    </div>
  )
}
