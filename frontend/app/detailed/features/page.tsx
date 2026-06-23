'use client'

import { useRouter } from 'next/navigation'
import {
  ArrowRight, Bike, ChevronRight, Droplets, Layers, Lightbulb, Settings2, Shuffle, Shirt, TreePine, Users, Volume2, Waves, Zap,
} from 'lucide-react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { useAppStore } from '@/lib/store'
import type { FeatureSelections } from '@/lib/store'

const featureGroups: { key: keyof FeatureSelections; label: string; icon: React.ElementType; description: string; features: { key: string; label: string; desc: string }[] }[] = [
  { key: 'crossings', label: 'Crossings', icon: Shuffle, description: 'Zebra crossings, signals, and pedestrian infrastructure', features: [
    { key: 'zebra_crossing', label: 'Zebra Crossings', desc: 'Raised with refuge island' }, { key: 'traffic_light', label: 'Traffic Lights', desc: 'Signal with pedestrian phase' }, { key: 'human_crosswalk_light', label: 'Human Crosswalk Lights', desc: 'Walking figure lights' }, { key: 'speed_table', label: 'Speed Tables', desc: 'Raised crossing table' },
  ]},
  { key: 'road_markings', label: 'Road Markings', icon: Settings2, description: 'Crosswalk, stop lines, and directional markings', features: [
    { key: 'japanese_style_markings', label: 'Japanese-Style', desc: 'Red road markings' }, { key: 'crosswalk_marking', label: 'Crosswalk Markings', desc: 'White stripes' }, { key: 'stop_line', label: 'Stop Lines', desc: 'Stop line before crossing' }, { key: 'directional_arrows', label: 'Directional Arrows', desc: 'Wayfinding arrows' },
  ]},
  { key: 'infrastructure', label: 'Infrastructure', icon: Users, description: 'Sidewalks, bike lanes, green space, and lighting', features: [
    { key: 'sidewalks', label: 'Sidewalks', desc: '2.5m both sides' }, { key: 'bike_lanes', label: 'Bike Lanes', desc: '1.5m protected' }, { key: 'green_space', label: 'Green Space', desc: 'Trees, rain gardens' }, { key: 'street_trees', label: 'Street Trees', desc: 'Every 8m native species' }, { key: 'bollards', label: 'Bollards', desc: 'Prevent vehicles on sidewalk' }, { key: 'pedestrian_lighting', label: 'Ped. Lighting', desc: 'LED every 15m' },
  ]},
  { key: 'traffic_calming', label: 'Traffic Calming', icon: Bike, description: 'Speed management and road diet', features: [
    { key: 'speed_humps', label: 'Speed Humps', desc: 'Raised speed humps' }, { key: 'chicanes', label: 'Chicanes', desc: 'Horizontal deflection' }, { key: 'narrow_lanes', label: 'Narrow Lanes', desc: '3.0m lanes (not 3.5m)' }, { key: 'raised_crossings', label: 'Raised Crossings', desc: 'Raised zebra tables' },
  ]},
  { key: 'drainage', label: 'Drainage', icon: Droplets, description: 'Covered drains and rain gardens', features: [
    { key: 'covered_drains', label: 'Covered Drains', desc: 'Prevent accidents' }, { key: 'rain_gardens', label: 'Rain Gardens', desc: 'Bioretention areas' },
  ]},
]

export default function DetailedFeaturesPage() {
  const router = useRouter()
  const { featureSelections, updateFeatureSelection, setDetailedStep } = useAppStore()
  const totalSelected = Object.values(featureSelections).reduce((sum, g) => sum + Object.values(g).filter(Boolean).length, 0)

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex items-center gap-2 text-xs text-white/30">
        <Link href="/" className="hover:text-brand-400">Home</Link><span>/</span>
        <Link href="/detailed/input" className="hover:text-brand-400">Detailed Mode</Link><span>/</span>
        <span className="text-accent-400 font-medium">Feature Selection</span>
      </div>

      <header>
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-accent-500/10 border border-accent-500/20 flex items-center justify-center"><Layers className="w-5 h-5 text-accent-400" /></div>
          <div>
            <h1 className="font-display text-2xl font-bold text-white">Feature Selection</h1>
            <p className="text-white/40 text-sm">Step 4 of 6 — Toggle features for the redesign</p>
          </div>
        </div>
      </header>

      <div className="card p-4 bg-accent-500/[0.03] border-accent-500/10 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-accent-500/10 border border-accent-500/20 text-accent-400 flex items-center justify-center"><Lightbulb className="w-5 h-5" /></div>
          <div>
            <div className="text-sm font-medium text-white">{totalSelected} features selected</div>
            <div className="text-xs text-white/30">Model generates best combination of selected features</div>
          </div>
        </div>
        <div className="text-xs text-white/30">{Object.values(featureSelections).reduce((s, g) => s + Object.values(g).length, 0)} total available</div>
      </div>

      <div className="space-y-4">
        {featureGroups.map((group) => {
          const GroupIcon = group.icon
          const groupSelections = featureSelections[group.key]
          const selectedCount = Object.values(groupSelections).filter(Boolean).length
          return (
            <section key={group.key} className="card p-6">
              <div className="flex items-center gap-3 mb-1">
                <div className="w-9 h-9 rounded-lg bg-accent-500/10 border border-accent-500/20 text-accent-400 flex items-center justify-center"><GroupIcon className="w-5 h-5" /></div>
                <div><h3 className="font-display font-semibold text-white">{group.label}</h3><p className="text-xs text-white/30">{group.description}</p></div>
                <div className="ml-auto text-xs font-mono text-accent-400">{selectedCount}/{group.features.length}</div>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-4">
                {group.features.map((feat) => {
                  const isSelected = (groupSelections as Record<string, boolean>)[feat.key]
                  return (
                    <button key={feat.key} onClick={() => updateFeatureSelection(group.key, feat.key, !isSelected)}
                      className={cn('p-3 rounded-lg border text-left transition-all',
                        isSelected ? 'bg-accent-500/10 border-accent-500/30 text-accent-400' : 'bg-white/[0.02] border-white/[0.06] text-white/50 hover:border-white/[0.12]'
                      )}>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium">{feat.label}</span>
                        <div className={cn('w-4 h-4 rounded border-2 flex items-center justify-center transition-all', isSelected ? 'bg-accent-500 border-accent-500' : 'border-white/20')}>
                          {isSelected && <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>}
                        </div>
                      </div>
                      <span className="text-xs opacity-70">{feat.desc}</span>
                    </button>
                  )
                })}
              </div>
            </section>
          )
        })}
      </div>

      <div className="card p-6">
        <h3 className="font-display font-semibold text-white mb-4">Live Preview</h3>
        <div className="rounded-xl overflow-hidden border border-white/[0.06] bg-ink-950">
          <svg viewBox="0 0 400 200" className="w-full h-auto">
            <rect width="400" height="200" fill="#0e1014" />
            {featureSelections.infrastructure.sidewalks && <><rect x="0" y="50" width="50" height="100" fill="#1a1e25" /><rect x="350" y="50" width="50" height="100" fill="#1a1e25" /></>}
            <rect x="50" y="50" width="300" height="100" fill="#252a33" />
            {featureSelections.road_markings.crosswalk_marking && <line x1="50" y1="100" x2="350" y2="100" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="6 4" />}
            {featureSelections.road_markings.stop_line && <line x1="100" y1="100" x2="100" y2="150" stroke="rgba(255,255,255,0.5)" strokeWidth="3" />}
            {featureSelections.infrastructure.bike_lanes && <rect x="50" y="140" width="300" height="8" fill="#22c55e" opacity="0.4" />}
            {featureSelections.infrastructure.street_trees && [0.15, 0.35, 0.55, 0.75].map((p, i) => <g key={i}><circle cx="25" cy={40 + p * 100} r="8" fill="#16a34a" opacity="0.6" /><circle cx="375" cy={40 + p * 100} r="8" fill="#16a34a" opacity="0.6" /></g>)}
            {featureSelections.crossings.zebra_crossing && <><rect x="130" y="50" width="40" height="100" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="2" strokeDasharray="8 4" /><rect x="230" y="50" width="40" height="100" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="2" strokeDasharray="8 4" /></>}
            {featureSelections.road_markings.japanese_style_markings && <rect x="130" y="95" width="40" height="10" fill="#ef4444" opacity="0.3" />}
            {featureSelections.infrastructure.bollards && [0.2, 0.5, 0.8].map((p, i) => <g key={i}><rect x={48} y={50 + p * 100} width="4" height="8" rx="1" fill="#6b7280" /><rect x="348" y={50 + p * 100} width="4" height="8" rx="1" fill="#6b7280" /></g>)}
          </svg>
          <div className="px-3 py-2 text-[10px] text-white/30 flex items-center justify-between bg-surface-200 border-t border-white/[0.04]">
            <span>Selected features preview</span>
            <span className="font-medium text-accent-400">{totalSelected} features active</span>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <Link href="/detailed/suggestions" className="btn-secondary">Back</Link>
        <button onClick={() => { setDetailedStep('generation'); router.push('/detailed/generation') }} className="btn-primary bg-accent-600 hover:bg-accent-500 px-8">
          Generate Redesign <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}
