'use client'

import { useRouter } from 'next/navigation'
import {
  AlertTriangle,
  ArrowRight,
  Eye,
  Layers,
  MapPin,
  School,
  Shield,
  Shuffle,
  TrafficCone,
  Users,
  Zap,
} from 'lucide-react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { useAppStore } from '@/lib/store'

const typeIcons: Record<string, React.ElementType> = {
  zebra_crossing: Shuffle, traffic_light: Zap, speed_calming: TrafficCone, school_zone: School, sidewalk: Users,
}

export default function DetailedSuggestionsPage() {
  const router = useRouter()
  const { suggestions, setDetailedStep } = useAppStore()
  const criticalCount = suggestions.filter((s) => s.priority === 'CRITICAL').length
  const highCount = suggestions.filter((s) => s.priority === 'HIGH').length

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex items-center gap-2 text-xs text-white/30">
        <Link href="/" className="hover:text-brand-400">Home</Link><span>/</span>
        <Link href="/detailed/input" className="hover:text-brand-400">Detailed Mode</Link><span>/</span>
        <span className="text-accent-400 font-medium">Suggestions</span>
      </div>

      <header>
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-accent-500/10 border border-accent-500/20 flex items-center justify-center">
            <Eye className="w-5 h-5 text-accent-400" />
          </div>
          <div>
            <h1 className="font-display text-2xl font-bold text-white">Suggestions</h1>
            <p className="text-white/40 text-sm">Step 3 of 6 — Evidence-based infrastructure recommendations</p>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-3 gap-4">
        <div className="card p-4 bg-red-500/[0.05] border-red-500/10">
          <div className="text-xs text-red-400 mb-1">CRITICAL</div>
          <div className="font-display text-3xl font-bold text-red-400">{criticalCount}</div>
          <div className="text-xs text-white/30">Immediate action needed</div>
        </div>
        <div className="card p-4 bg-orange-500/[0.05] border-orange-500/10">
          <div className="text-xs text-orange-400 mb-1">HIGH</div>
          <div className="font-display text-3xl font-bold text-orange-400">{highCount}</div>
          <div className="text-xs text-white/30">Significant improvements</div>
        </div>
        <div className="card p-4">
          <div className="text-xs text-white/40 mb-1">TOTAL</div>
          <div className="font-display text-3xl font-bold text-white">{suggestions.length}</div>
          <div className="text-xs text-white/30">Suggestions generated</div>
        </div>
      </div>

      <div className="card p-6">
        <h3 className="font-display font-semibold text-white mb-3 flex items-center gap-2">
          <MapPin className="w-4 h-4 text-accent-400" />
          Evidence Map — Where People Actually Cross
        </h3>
        <div className="rounded-xl bg-ink-950 border border-white/[0.06] h-48 flex items-center justify-center relative overflow-hidden">
          <svg className="absolute inset-0 w-full h-full opacity-20" xmlns="http://www.w3.org/2000/svg">
            <defs><pattern id="sugGrid" width="30" height="30" patternUnits="userSpaceOnUse"><path d="M 30 0 L 0 0 0 30" fill="none" stroke="#fff" strokeWidth="0.3" /></pattern></defs>
            <rect width="100%" height="100%" fill="url(#sugGrid)" />
          </svg>
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 200">
            <line x1="50" y1="150" x2="200" y2="80" stroke="#ef4444" strokeWidth="3" strokeLinecap="round" opacity="0.7" />
            <line x1="200" y1="80" x2="350" y2="120" stroke="#ef4444" strokeWidth="3" strokeLinecap="round" opacity="0.7" />
            <line x1="80" y1="100" x2="180" y2="60" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
            <line x1="250" y1="140" x2="370" y2="90" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
            <line x1="100" y1="170" x2="300" y2="50" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" opacity="0.5" />
          </svg>
          <div className="absolute bottom-3 left-3 flex items-center gap-3 text-xs bg-black/60 backdrop-blur rounded-lg px-3 py-2 text-white/70">
            <div className="flex items-center gap-1"><div className="w-3 h-0.5 bg-critical" /> Dangerous</div>
            <div className="flex items-center gap-1"><div className="w-3 h-0.5 bg-warning" /> Informal</div>
            <div className="flex items-center gap-1"><div className="w-3 h-0.5 bg-success" /> Formal</div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {suggestions.map((s) => {
          const Icon = typeIcons[s.type] || AlertTriangle
          return (
            <div key={s.id} className={cn('card p-5 border-l-4 transition-all hover:shadow-elevated',
              s.priority === 'CRITICAL' ? 'border-l-critical bg-red-500/[0.03]' : s.priority === 'HIGH' ? 'border-l-accent-500 bg-orange-500/[0.03]' : 'border-l-warning bg-yellow-500/[0.03]'
            )}>
              <div className="flex items-start gap-4">
                <div className={cn('w-10 h-10 rounded-lg flex items-center justify-center shrink-0',
                  s.priority === 'CRITICAL' ? 'bg-red-500/10 border border-red-500/20 text-red-400' : s.priority === 'HIGH' ? 'bg-orange-500/10 border border-orange-500/20 text-orange-400' : 'bg-yellow-500/10 border border-yellow-500/20 text-yellow-400'
                )}>
                  <Icon className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className={cn('text-xs font-bold px-2 py-0.5 rounded-full',
                      s.priority === 'CRITICAL' ? 'bg-red-500/10 text-red-400 border border-red-500/20' : s.priority === 'HIGH' ? 'bg-orange-500/10 text-orange-400 border border-orange-500/20' : 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20'
                    )}>{s.priority}</span>
                    <span className="text-xs text-white/30 flex items-center gap-1"><MapPin className="w-3 h-3" />{s.location}</span>
                  </div>
                  <h3 className="font-display font-semibold text-white mb-1">{s.message}</h3>
                  <div className="flex items-center gap-3 mt-2 text-xs text-white/30">
                    <span className="flex items-center gap-1"><Shield className="w-3 h-3" />{s.evidenceCount} people affected</span>
                    <span className="flex items-center gap-1"><Layers className="w-3 h-3" />{s.type.replace('_', ' ')}</span>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      <div className="flex items-center justify-between">
        <Link href="/detailed/analysis" className="btn-secondary">Back to Analysis</Link>
        <button onClick={() => { setDetailedStep('features'); router.push('/detailed/features') }} className="btn-primary bg-accent-600 hover:bg-accent-500 px-8">
          Proceed to Feature Selection <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}
