'use client'

import { useState } from 'react'
import {
  Bike,
  Car,
  ChevronRight,
  Droplets,
  Lightbulb,
  Shuffle,
  TreePine,
  Users,
  Volume2,
  Waves,
} from 'lucide-react'
import { cn } from '@/lib/utils'

const defaultSidewalk = {
  width: '2.5',
  material: 'concrete',
  tactile: true,
  curbRamps: true,
  bollards: true,
  lighting: true,
}

const defaultCrossing = {
  spacing: '100',
  localType: 'raised',
  refugeIsland: true,
  countdown: true,
  audible: true,
  leadingPedestrian: true,
}

export default function RedesignPage() {
  const [sidewalk, setSidewalk] = useState(defaultSidewalk)
  const [crossing, setCrossing] = useState(defaultCrossing)
  const [roadLanes, setRoadLanes] = useState(4)
  const [targetSpeed, setTargetSpeed] = useState(30)
  const [treeSpecies, setTreeSpecies] = useState('Neem')
  const [monsoon, setMonsoon] = useState({
    coveredDrains: true,
    permeable: true,
    rainGardens: true,
    inlets: '20',
  })

  return (
    <div className="space-y-6">
      <header>
        <h1 className="font-display text-2xl font-bold text-ink-900">Redesign Configurator</h1>
        <p className="text-ink-500 mt-1">
          Configure India-specific design options. All outputs validated against IRC:SP:103.
        </p>
      </header>

      <div className="grid lg:grid-cols-[1fr_360px] gap-6">
        {/* Config panels */}
        <div className="space-y-4">
          {/* Road diet */}
          <section className="card p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-lg bg-accent-100 text-accent-600 flex items-center justify-center">
                <Car className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-display font-semibold text-ink-900">Road Diet</h3>
                <p className="text-xs text-ink-500">Reduce vehicle dominance</p>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <label className="label">Current vehicle lanes</label>
                <div className="flex gap-2">
                  {[2, 4, 6].map((n) => (
                    <button
                      key={n}
                      onClick={() => setRoadLanes(n)}
                      className={cn(
                        'flex-1 py-2.5 rounded-lg text-sm font-medium border transition-all',
                        roadLanes === n
                          ? 'bg-brand-50 border-brand-300 text-brand-700'
                          : 'bg-white border-ink-200 text-ink-600 hover:border-ink-300'
                      )}
                    >
                      {n} lanes
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="label">Target speed: {targetSpeed} km/h</label>
                <input
                  type="range"
                  min="20"
                  max="50"
                  step="10"
                  value={targetSpeed}
                  onChange={(e) => setTargetSpeed(parseInt(e.target.value))}
                  className="w-full accent-brand-500"
                />
                <div className="flex justify-between text-xs text-ink-400 mt-1">
                  <span>20 (school)</span>
                  <span>30 (local)</span>
                  <span>40 (collector)</span>
                  <span>50 (arterial)</span>
                </div>
              </div>
              <div className="rounded-lg bg-ink-50 border border-ink-100 p-3 text-sm">
                <div className="font-medium text-ink-700 mb-1">Proposed allocation:</div>
                <div className="flex items-center gap-2 text-xs text-ink-600 flex-wrap">
                  <span className="badge bg-blue-100 text-blue-700">2 vehicle lanes</span>
                  <ChevronRight className="w-3 h-3 text-ink-300" />
                  <span className="badge bg-green-100 text-green-700">+ bike lane</span>
                  <ChevronRight className="w-3 h-3 text-ink-300" />
                  <span className="badge bg-yellow-100 text-yellow-700">+ wider sidewalk</span>
                  <ChevronRight className="w-3 h-3 text-ink-300" />
                  <span className="badge bg-emerald-100 text-emerald-700">+ tree median</span>
                </div>
              </div>
            </div>
          </section>

          {/* Sidewalk */}
          <section className="card p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-lg bg-brand-100 text-brand-600 flex items-center justify-center">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-display font-semibold text-ink-900">Sidewalk Design</h3>
                <p className="text-xs text-ink-500">Continuous, shaded, obstruction-free</p>
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="label">Width</label>
                <select
                  className="input"
                  value={sidewalk.width}
                  onChange={(e) => setSidewalk({ ...sidewalk, width: e.target.value })}
                >
                  <option value="2.0">2.0m (minimum)</option>
                  <option value="2.5">2.5m (preferred)</option>
                  <option value="3.0">3.0m (commercial)</option>
                </select>
              </div>
              <div>
                <label className="label">Surface material</label>
                <select
                  className="input"
                  value={sidewalk.material}
                  onChange={(e) => setSidewalk({ ...sidewalk, material: e.target.value })}
                >
                  <option value="concrete">Concrete (smooth, non-slip)</option>
                  <option value="pavers">Interlocking pavers</option>
                  <option value="stamped">Stamped concrete</option>
                </select>
              </div>
              <div>
                <label className="label">Tree species</label>
                <select
                  className="input"
                  value={treeSpecies}
                  onChange={(e) => setTreeSpecies(e.target.value)}
                >
                  <option>Neem (drought-resistant)</option>
                  <option>Peepal (wide canopy)</option>
                  <option>Ashoka (ornamental)</option>
                  <option>Gulmohar (shade)</option>
                  <option>Rain Tree (broad shade)</option>
                </select>
              </div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-4">
              {[
                { key: 'tactile', label: 'Tactile paving' },
                { key: 'curbRamps', label: 'Curb ramps' },
                { key: 'bollards', label: 'Bollards' },
                { key: 'lighting', label: 'Ped. lighting' },
              ].map((opt) => (
                <label
                  key={opt.key}
                  className="flex items-center gap-2 p-2.5 rounded-lg hover:bg-ink-50 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={(sidewalk as any)[opt.key]}
                    onChange={(e) =>
                      setSidewalk({ ...sidewalk, [opt.key]: e.target.checked })
                    }
                    className="w-4 h-4 rounded border-ink-300 text-brand-600 focus:ring-brand-500"
                  />
                  <span className="text-sm text-ink-700">{opt.label}</span>
                </label>
              ))}
            </div>
          </section>

          {/* Crossings */}
          <section className="card p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-lg bg-red-100 text-red-600 flex items-center justify-center">
                <Shuffle className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-display font-semibold text-ink-900">Crossing Network</h3>
                <p className="text-xs text-ink-500">Every 80–150m, raised + refuge</p>
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="label">Crossing spacing</label>
                <div className="flex gap-2">
                  {['80', '100', '150'].map((s) => (
                    <button
                      key={s}
                      onClick={() => setCrossing({ ...crossing, spacing: s })}
                      className={cn(
                        'flex-1 py-2.5 rounded-lg text-sm font-medium border transition-all',
                        crossing.spacing === s
                          ? 'bg-brand-50 border-brand-300 text-brand-700'
                          : 'bg-white border-ink-200 text-ink-600 hover:border-ink-300'
                      )}
                    >
                      {s}m
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="label">Local road type</label>
                <select
                  className="input"
                  value={crossing.localType}
                  onChange={(e) => setCrossing({ ...crossing, localType: e.target.value })}
                >
                  <option value="raised">Raised zebra + refuge</option>
                  <option value="signal">Signalized + countdown</option>
                  <option value="grade">Grade-separated</option>
                </select>
              </div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-4">
              {[
                { key: 'refugeIsland', label: 'Refuge island' },
                { key: 'countdown', label: 'Countdown timer' },
                { key: 'audible', label: 'Audible signal' },
                { key: 'leadingPedestrian', label: 'Leading ped. interval' },
              ].map((opt) => (
                <label
                  key={opt.key}
                  className="flex items-center gap-2 p-2.5 rounded-lg hover:bg-ink-50 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={(crossing as any)[opt.key]}
                    onChange={(e) =>
                      setCrossing({ ...crossing, [opt.key]: e.target.checked })
                    }
                    className="w-4 h-4 rounded border-ink-300 text-brand-600 focus:ring-brand-500"
                  />
                  <span className="text-sm text-ink-700">{opt.label}</span>
                </label>
              ))}
            </div>
          </section>

          {/* Monsoon */}
          <section className="card p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center">
                <Droplets className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-display font-semibold text-ink-900">Monsoon Resilience</h3>
                <p className="text-xs text-ink-500">Covered drains + permeable surfaces</p>
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="label">Curb inlet spacing</label>
                <select
                  className="input"
                  value={monsoon.inlets}
                  onChange={(e) => setMonsoon({ ...monsoon, inlets: e.target.value })}
                >
                  <option value="15">Every 15m</option>
                  <option value="20">Every 20m</option>
                  <option value="30">Every 30m</option>
                </select>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-2 mt-4">
              {[
                { key: 'coveredDrains', label: 'Covered drains', icon: Waves },
                { key: 'permeable', label: 'Permeable sidewalk', icon: Lightbulb },
                { key: 'rainGardens', label: 'Rain gardens', icon: TreePine },
              ].map((opt) => (
                <label
                  key={opt.key}
                  className="flex flex-col items-center gap-2 p-3 rounded-lg hover:bg-ink-50 cursor-pointer text-center"
                >
                  <input
                    type="checkbox"
                    checked={(monsoon as any)[opt.key]}
                    onChange={(e) =>
                      setMonsoon({ ...monsoon, [opt.key]: e.target.checked })
                    }
                    className="w-4 h-4 rounded border-ink-300 text-brand-600 focus:ring-brand-500"
                  />
                  <opt.icon className="w-4 h-4 text-ink-500" />
                  <span className="text-xs text-ink-700">{opt.label}</span>
                </label>
              ))}
            </div>
          </section>
        </div>

        {/* Live preview sidebar */}
        <aside className="space-y-4">
          <div className="card p-5 sticky top-6">
            <h3 className="font-display font-semibold text-ink-900 mb-4">Live Preview</h3>
            <StreetPreview />
            <div className="mt-4 space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-ink-500">Sidewalk</span>
                <span className="font-medium text-ink-900">{sidewalk.width}m both sides</span>
              </div>
              <div className="flex justify-between">
                <span className="text-ink-500">Crossings</span>
                <span className="font-medium text-ink-900">Every {crossing.spacing}m</span>
              </div>
              <div className="flex justify-between">
                <span className="text-ink-500">Vehicle lanes</span>
                <span className="font-medium text-ink-900">2 × 3.0m</span>
              </div>
              <div className="flex justify-between">
                <span className="text-ink-500">Target speed</span>
                <span className="font-medium text-ink-900">{targetSpeed} km/h</span>
              </div>
              <div className="flex justify-between">
                <span className="text-ink-500">Trees</span>
                <span className="font-medium text-ink-900">{treeSpecies} @ 8m</span>
              </div>
            </div>
            <button className="btn-primary w-full mt-4">
              Generate Redesign
            </button>
          </div>
        </aside>
      </div>
    </div>
  )
}

function StreetPreview() {
  return (
    <div className="rounded-xl overflow-hidden border border-ink-100 bg-ink-50">
      <svg viewBox="0 0 320 180" className="w-full h-auto">
        {/* Sky */}
        <rect width="320" height="180" fill="#e0f2fe" />
        {/* Sidewalk left */}
        <rect x="0" y="40" width="40" height="100" fill="#e7e5e4" />
        {/* Sidewalk right */}
        <rect x="280" y="40" width="40" height="100" fill="#e7e5e4" />
        {/* Road */}
        <rect x="40" y="40" width="240" height="100" fill="#374151" />
        {/* Lane markings */}
        <line x1="40" y1="90" x2="280" y2="90" stroke="#fbbf24" strokeWidth="1" strokeDasharray="4 3" />
        {/* Trees */}
        {[0.15, 0.35, 0.55, 0.75].map((p, i) => (
          <g key={i}>
            <circle cx="20" cy={30 + p * 100} r="6" fill="#16a34a" />
            <circle cx="300" cy={30 + p * 100} r="6" fill="#16a34a" />
          </g>
        ))}
        {/* Bike lane stripe */}
        <rect x="40" y="135" width="240" height="4" fill="#22c55e" opacity="0.6" />
      </svg>
      <div className="px-3 py-2 text-[10px] text-ink-500 flex items-center justify-between bg-white border-t border-ink-100">
        <span>Before: car-dominated</span>
        <span className="font-medium text-brand-600">After: pedestrian-first</span>
      </div>
    </div>
  )
}
