'use client'

import { useRouter } from 'next/navigation'
import { Award, CheckCircle2, Download, FileText, Layers, MapPin, Share2, TrendingUp } from 'lucide-react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { useAppStore } from '@/lib/store'

export default function DetailedExportPage() {
  const router = useRouter()
  const { exportData } = useAppStore()

  if (!exportData) {
    return (
      <div className="text-center py-20">
        <FileText className="w-12 h-12 text-white/20 mx-auto mb-3" />
        <h2 className="font-display text-xl font-bold text-white mb-1">No export data</h2>
        <p className="text-white/40 mb-6">Complete the redesign first.</p>
        <Link href="/detailed/generation" className="btn-primary">Go to Generation</Link>
      </div>
    )
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex items-center gap-2 text-xs text-white/30">
        <Link href="/" className="hover:text-brand-400">Home</Link><span>/</span>
        <Link href="/detailed/input" className="hover:text-brand-400">Detailed Mode</Link><span>/</span>
        <span className="text-accent-400 font-medium">Export</span>
      </div>

      <header className="flex items-start justify-between flex-wrap gap-4">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-accent-500/10 border border-accent-500/20 flex items-center justify-center"><Award className="w-5 h-5 text-accent-400" /></div>
            <div>
              <h1 className="font-display text-2xl font-bold text-white">Export Report</h1>
              <p className="text-white/40 text-sm flex items-center gap-1"><MapPin className="w-3 h-3" />{exportData.area}</p>
            </div>
          </div>
        </div>
        <button className="btn-secondary"><Share2 className="w-4 h-4" />Share</button>
      </header>

      <div className="card p-6 bg-gradient-to-br from-surface-100 to-surface-200 border-white/[0.06]">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-lg bg-brand-500/10 border border-brand-500/20 flex items-center justify-center"><Layers className="w-5 h-5 text-brand-400" /></div>
          <div><h2 className="font-display text-xl font-bold text-white">URBANX — DETAILED REDESIGN REPORT</h2><p className="text-white/30 text-sm">{exportData.area} · Generated {new Date().toLocaleDateString('en-IN')}</p></div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[{ l: 'Pedestrians Observed', v: '4,847', c: 'text-brand-400' }, { l: 'Vehicles Observed', v: '12,392', c: 'text-accent-400' }, { l: 'Interference Events', v: '156', c: 'text-warning' }, { l: 'Monitoring Duration', v: '24 hours', c: 'text-white' }].map((s) => (
            <div key={s.l}><div className="text-xs text-white/30">{s.l}</div><div className={cn('font-display text-2xl font-bold', s.c)}>{s.v}</div></div>
          ))}
        </div>
      </div>

      <div className="card p-6">
        <h3 className="font-display font-semibold text-white mb-4">Metric Measurements</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead><tr className="border-b border-white/[0.06]"><th className="text-left py-2 px-3 font-medium text-white/40">Feature</th><th className="text-right py-2 px-3 font-medium text-white/40">Value</th><th className="text-left py-2 px-3 font-medium text-white/40">Standard</th></tr></thead>
            <tbody>
              {[
                { f: 'Road (vehicle lanes)', v: `${exportData.laneCount} lanes × ${exportData.laneWidth}m = ${exportData.roadWidth}m`, s: 'IRC:86' },
                { f: 'Sidewalk', v: `2 × ${exportData.sidewalkWidth}m = ${(exportData.sidewalkWidth * 2).toFixed(1)}m`, s: 'IRC:SP:103' },
                { f: 'Bike Lane', v: `1 × ${exportData.bikeLaneWidth}m = ${exportData.bikeLaneWidth}m`, s: 'IRC:103' },
                { f: 'Tree Canopy', v: `${exportData.treeCount} trees @ ${exportData.treeSpacing}m spacing`, s: 'WHO 9m²/person' },
                { f: 'Total Redesign Width', v: `${exportData.totalRedesignWidth}m`, s: 'Road diet applied' },
              ].map((r) => (
                <tr key={r.f} className="border-b border-white/[0.03] hover:bg-white/[0.02]">
                  <td className="py-2.5 px-3 text-white/60">{r.f}</td>
                  <td className="py-2.5 px-3 text-right font-mono font-medium text-white">{r.v}</td>
                  <td className="py-2.5 px-3 text-white/30">{r.s}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="card p-6">
        <h3 className="font-display font-semibold text-white mb-4">SUMO Simulation Results</h3>
        <div className="grid sm:grid-cols-2 gap-6">
          <div>
            <div className="text-sm text-white/40 mb-3">Safety Outcomes (per day)</div>
            <div className="space-y-3">
              <ComparisonRow label="Pedestrian Deaths" before={exportData.beforeDeaths} after={exportData.afterDeaths} />
              <ComparisonRow label="Near-Miss Events" before={exportData.beforeNearMisses} after={exportData.afterNearMisses} />
            </div>
          </div>
          <div>
            <div className="text-sm text-white/40 mb-3">Traffic Impact</div>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 rounded-lg bg-white/[0.03] border border-white/[0.06]">
                <span className="text-sm text-white/60">Pedestrian Wait Time</span>
                <div className="flex items-center gap-2"><span className="text-sm line-through text-white/20">{exportData.beforeWaitTime}s</span><TrendingUp className="w-4 h-4 text-brand-400" /><span className="font-display font-bold text-brand-400">{exportData.afterWaitTime}s</span></div>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-white/[0.03] border border-white/[0.06]">
                <span className="text-sm text-white/60">Vehicle Delay</span>
                <span className="font-display font-bold text-accent-400">+{exportData.vehicleDelay}s avg</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="card p-6">
        <h3 className="font-display font-semibold text-white mb-4">Cost Estimate</h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
          {[{ i: 'Zebra Crossings (3)', c: 240000 }, { i: 'Traffic Signals (2)', c: 350000 }, { i: 'Sidewalk (4.2km)', c: 420000 }, { i: 'Trees (48)', c: 85000 }, { i: 'Covered Drains (3.8km)', c: 150000 }, { i: 'Bike Lane (2.1km)', c: 180000 }, { i: 'Road Markings', c: 65000 }, { i: 'Bollards + Lighting', c: 125000 }].map((c) => (
            <div key={c.i} className="rounded-lg bg-white/[0.03] border border-white/[0.06] p-3">
              <div className="text-xs text-white/30">{c.i}</div>
              <div className="font-display font-bold text-white">₹{(c.c / 1000).toFixed(0)}K</div>
            </div>
          ))}
        </div>
        <div className="flex items-center justify-between p-4 rounded-lg bg-accent-500/[0.05] border border-accent-500/10">
          <span className="font-display font-semibold text-white">Total Estimated Cost</span>
          <span className="font-display text-2xl font-bold text-accent-400">₹{(exportData.totalCost / 100000).toFixed(2)}L</span>
        </div>
      </div>

      <div className="card p-6">
        <h3 className="font-display font-semibold text-white mb-4">Compliance</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {exportData.compliance.map((std) => (
            <div key={std} className="flex items-center gap-2 p-3 rounded-lg bg-green-500/[0.05] border border-green-500/10">
              <CheckCircle2 className="w-4 h-4 text-green-400 shrink-0" /><span className="text-sm text-green-400 font-medium">{std}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="card p-6">
        <h3 className="font-display font-semibold text-white mb-4">Export Formats</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {[{ l: 'GeoJSON', d: 'GIS import' }, { l: 'LandXML', d: 'Civil 3D' }, { l: 'DWG', d: 'AutoCAD' }, { l: 'PDF', d: 'Full report' }, { l: 'SUMO', d: 'Simulation' }, { l: 'PNG', d: 'Before/after' }].map((f) => (
            <button key={f.l} className="card-hover p-4 text-center">
              <Download className="w-5 h-5 text-brand-400 mx-auto mb-2" />
              <div className="font-medium text-sm text-white">{f.l}</div>
              <div className="text-xs text-white/30">{f.d}</div>
            </button>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between">
        <Link href="/detailed/review" className="btn-secondary">Back to Review</Link>
        <Link href="/" className="btn-primary bg-accent-600 hover:bg-accent-500 px-8">Start New Analysis</Link>
      </div>
    </div>
  )
}

function ComparisonRow({ label, before, after }: { label: string; before: number; after: number }) {
  const improved = after < before
  return (
    <div className="flex items-center justify-between p-3 rounded-lg bg-white/[0.03] border border-white/[0.06]">
      <span className="text-sm text-white/60">{label}</span>
      <div className="flex items-center gap-2">
        <span className={cn('font-display font-bold', improved ? 'text-critical line-through' : 'text-white')}>{before}</span>
        <TrendingUp className={cn('w-4 h-4', improved ? 'text-brand-400' : 'text-critical')} />
        <span className={cn('font-display font-bold', improved ? 'text-brand-400' : 'text-critical')}>{after}</span>
      </div>
    </div>
  )
}
