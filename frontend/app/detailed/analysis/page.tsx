'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  AlertTriangle,
  Car,
  Eye,
  Layers,
  MapPin,
  School,
  Shield,
  Users,
  Zap,
} from 'lucide-react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { useAppStore } from '@/lib/store'

const ROWS = 8
const COLS = 10

export default function DetailedAnalysisPage() {
  const router = useRouter()
  const { gridCells, setGridCells, setDetailedStep, setSuggestions } = useAppStore()
  const [currentCell, setCurrentCell] = useState(0)
  const [stats, setStats] = useState({ illegalCrossers: 0, pedsOnRoad: 0, hardBraking: 0, speedViolations: 0, interferenceScore: 0 })
  const [complete, setComplete] = useState(false)
  const totalCells = ROWS * COLS

  useEffect(() => {
    if (complete) return
    if (currentCell >= totalCells) {
      setComplete(true)
      setSuggestions([
        { id: '1', type: 'zebra_crossing', priority: 'CRITICAL', message: '47 people cross here without a formal crossing. Install raised zebra crossing with refuge island.', location: 'Grid cell 3,4 — Main intersection', evidenceCount: 47 },
        { id: '2', type: 'traffic_light', priority: 'CRITICAL', message: 'Install traffic signal with pedestrian phase and human walking lights at main junction.', location: 'Grid cell 3,4 — Main intersection', evidenceCount: 47 },
        { id: '3', type: 'speed_calming', priority: 'HIGH', message: '8 near-miss events detected. Add speed table/hump near school zone.', location: 'Grid cell 5,2 — School approach road', evidenceCount: 8 },
        { id: '4', type: 'school_zone', priority: 'CRITICAL', message: 'Vehicles exceeding 20 km/h near school. Install school zone signage + flashing beacons.', location: 'Grid cell 5,2 — St. Mary\'s School', evidenceCount: 12 },
        { id: '5', type: 'sidewalk', priority: 'HIGH', message: '23 people walking on road. Build 2.5m sidewalk on both sides.', location: 'Grid cells 2-4, Segment B', evidenceCount: 23 },
      ])
      return
    }
    const timer = setTimeout(() => {
      const row = Math.floor(currentCell / COLS)
      const col = currentCell % COLS
      const cellId = `cell-${row}-${col}`
      const hasHigh = (row === 3 && col === 4) || (row === 5 && col === 2) || (row === 2 && col === 7)
      const hasMedium = (row === 4 && col === 5) || (row === 6 && col === 3)
      const illegalCrossers = hasHigh ? Math.floor(Math.random() * 15) + 5 : hasMedium ? Math.floor(Math.random() * 5) : 0
      const pedsOnRoad = hasHigh ? Math.floor(Math.random() * 8) + 2 : hasMedium ? Math.floor(Math.random() * 3) : 0
      const hardBraking = hasHigh ? Math.floor(Math.random() * 5) + 1 : hasMedium ? Math.floor(Math.random() * 2) : 0
      const speedViolations = row === 5 && col === 2 ? Math.floor(Math.random() * 6) + 3 : 0
      const interferenceScore = illegalCrossers * 15 + pedsOnRoad * 20 + hardBraking * 25 + speedViolations * 30
      setGridCells(gridCells.map((c) => c.id === cellId ? { ...c, status: 'complete', interferenceScore, illegalCrossers, pedsOnRoad, hardBraking, speedViolations, hasSchool: row === 5 && col === 2, hasHospital: row === 3 && col === 7 } : c))
      setStats((prev) => ({ illegalCrossers: prev.illegalCrossers + illegalCrossers, pedsOnRoad: prev.pedsOnRoad + pedsOnRoad, hardBraking: prev.hardBraking + hardBraking, speedViolations: prev.speedViolations + speedViolations, interferenceScore: prev.interferenceScore + interferenceScore }))
      setCurrentCell((c) => c + 1)
    }, 80)
    return () => clearTimeout(timer)
  }, [currentCell, complete, gridCells, setGridCells, setSuggestions])

  const progress = Math.round((currentCell / totalCells) * 100)

  if (complete) {
    return (
      <div className="max-w-2xl mx-auto py-16 text-center">
        <div className="w-20 h-20 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 flex items-center justify-center mx-auto mb-6">
          <Shield className="w-10 h-10" />
        </div>
        <h2 className="font-display text-2xl font-bold text-white mb-2">Analysis Complete</h2>
        <p className="text-white/40 mb-2">{totalCells} grid cells analyzed · {stats.interferenceScore} total interference score</p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8 max-w-lg mx-auto">
          {[
            { label: 'Illegal Crossers', value: stats.illegalCrossers, color: 'text-critical' },
            { label: 'Peds on Road', value: stats.pedsOnRoad, color: 'text-warning' },
            { label: 'Hard Braking', value: stats.hardBraking, color: 'text-accent-400' },
            { label: 'Speed Violations', value: stats.speedViolations, color: 'text-critical' },
          ].map((s) => (
            <div key={s.label} className="card p-3">
              <div className="text-xs text-white/30">{s.label}</div>
              <div className={cn('font-display text-xl font-bold', s.color)}>{s.value}</div>
            </div>
          ))}
        </div>
        <button onClick={() => { setDetailedStep('suggestions'); router.push('/detailed/suggestions') }} className="btn-primary bg-accent-600 hover:bg-accent-500 px-8">
          View Suggestions <Eye className="w-4 h-4" />
        </button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 text-xs text-white/30">
        <Link href="/" className="hover:text-brand-400">Home</Link><span>/</span>
        <Link href="/detailed/input" className="hover:text-brand-400">Detailed Mode</Link><span>/</span>
        <span className="text-accent-400 font-medium">Analysis</span>
      </div>

      <header>
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-accent-500/10 border border-accent-500/20 flex items-center justify-center">
            <Eye className="w-5 h-5 text-accent-400" />
          </div>
          <div>
            <h1 className="font-display text-2xl font-bold text-white">Area Analysis</h1>
            <p className="text-white/40 text-sm">Step 2 of 6 — Grid-based pedestrian-vehicle interference detection</p>
          </div>
        </div>
      </header>

      <div className="card p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-white/70">Cell {currentCell + 1} of {totalCells} — Analyzing grid...</span>
          <span className="text-sm font-mono text-accent-400">{progress}%</span>
        </div>
        <div className="w-full bg-white/[0.06] rounded-full h-2 overflow-hidden">
          <div className="h-full bg-gradient-to-r from-accent-500 to-accent-400 rounded-full transition-all duration-300" style={{ width: `${progress}%` }} />
        </div>
      </div>

      <div className="grid lg:grid-cols-[1fr_300px] gap-4">
        <div className="card p-6">
          <h3 className="font-display font-semibold text-white mb-4 flex items-center gap-2">
            <Layers className="w-4 h-4 text-accent-400" />
            Grid Analysis — {ROWS}x{COLS} cells (20m each)
          </h3>
          <div className="grid gap-1" style={{ gridTemplateColumns: `repeat(${COLS}, 1fr)` }}>
            {gridCells.map((cell) => {
              const intensity = cell.status === 'complete'
                ? cell.interferenceScore > 100 ? 'bg-critical/20 border-critical/40'
                  : cell.interferenceScore > 50 ? 'bg-warning/20 border-warning/40'
                  : cell.interferenceScore > 0 ? 'bg-accent-500/15 border-accent-500/30'
                  : 'bg-brand-500/15 border-brand-500/30'
                : cell.id === `cell-${Math.floor(currentCell / COLS)}-${currentCell % COLS}`
                ? 'bg-accent-500/25 border-accent-500/50 animate-pulse'
                : 'bg-white/[0.02] border-white/[0.06]'
              return (
                <div key={cell.id} className={cn('aspect-square rounded-sm border transition-all flex items-center justify-center text-[8px] font-mono', intensity)} title={`Cell ${cell.row},${cell.col} — ${cell.status}`}>
                  {cell.status === 'complete' && cell.interferenceScore > 0 && <span className="text-white/60">{cell.interferenceScore}</span>}
                  {cell.hasSchool && <School className="w-3 h-3 text-blue-400" />}
                  {cell.hasHospital && <MapPin className="w-3 h-3 text-red-400" />}
                </div>
              )
            })}
          </div>
          <div className="flex items-center gap-4 mt-4 text-xs text-white/30">
            <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-sm bg-brand-500/20 border border-brand-500/30" /> None</div>
            <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-sm bg-accent-500/20 border border-accent-500/30" /> Low</div>
            <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-sm bg-warning/20 border border-warning/40" /> Medium</div>
            <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-sm bg-critical/20 border border-critical/40" /> High</div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="card p-4">
            <h4 className="font-medium text-sm text-white mb-3">Live Interference Stats</h4>
            <div className="space-y-3">
              <StatRow icon={Users} label="Illegal Crossers" value={stats.illegalCrossers} color="text-critical" />
              <StatRow icon={Car} label="Peds on Road" value={stats.pedsOnRoad} color="text-warning" />
              <StatRow icon={AlertTriangle} label="Hard Braking" value={stats.hardBraking} color="text-accent-400" />
              <StatRow icon={Zap} label="Speed Violations" value={stats.speedViolations} color="text-critical" />
            </div>
          </div>
          <div className="card p-4 bg-accent-500/[0.05] border-accent-500/10">
            <div className="text-xs text-accent-400 mb-1">Total Interference Score</div>
            <div className="font-display text-3xl font-bold text-accent-400">{stats.interferenceScore}</div>
            <div className="text-xs text-white/30 mt-1">Lower is better after redesign</div>
          </div>
        </div>
      </div>
    </div>
  )
}

function StatRow({ icon: Icon, label, value, color }: { icon: React.ElementType; label: string; value: number; color: string }) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2 text-sm text-white/50"><Icon className={cn('w-4 h-4', color)} />{label}</div>
      <span className={cn('font-display font-bold text-lg', color)}>{value}</span>
    </div>
  )
}
