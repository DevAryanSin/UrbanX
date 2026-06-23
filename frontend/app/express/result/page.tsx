'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  ArrowRight,
  Award,
  Camera,
  CheckCircle2,
  Download,
  FileText,
  MapPin,
  Share2,
  Sparkles,
  Zap,
} from 'lucide-react'
import Link from 'next/link'
import { cn } from '@/lib/utils'

export default function ExpressResultPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<'comparison' | 'metrics'>('comparison')
  const [sliderPos, setSliderPos] = useState(50)

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="flex items-center gap-2 text-xs text-white/30">
        <Link href="/" className="hover:text-brand-400">Home</Link>
        <span>/</span>
        <Link href="/express/upload" className="hover:text-brand-400">Express Mode</Link>
        <span>/</span>
        <span className="text-brand-400 font-medium">Result</span>
      </div>

      <header className="flex items-start justify-between flex-wrap gap-4">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-brand-500/10 border border-brand-500/20 flex items-center justify-center">
              <Zap className="w-5 h-5 text-brand-400" />
            </div>
            <div>
              <h1 className="font-display text-2xl font-bold text-white">Redesign Result</h1>
              <p className="text-white/40 text-sm flex items-center gap-1">
                <MapPin className="w-3 h-3" />
                Connaught Place, New Delhi
              </p>
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <button className="btn-secondary"><Share2 className="w-4 h-4" />Share</button>
          <button onClick={() => router.push('/express/upload')} className="btn-primary">
            <Camera className="w-4 h-4" />Try Another
          </button>
        </div>
      </header>

      <div className="card p-4 bg-brand-500/[0.03] border-brand-500/10 flex items-center gap-4">
        <CheckCircle2 className="w-6 h-6 text-brand-400 shrink-0" />
        <div>
          <div className="text-sm font-medium text-white">Pre-trained model applied successfully</div>
          <div className="text-xs text-white/40">All 7 control channels active · PIX2PIX v2.1</div>
        </div>
      </div>

      <div className="flex gap-1 p-1 bg-white/[0.04] rounded-lg w-fit">
        {(['comparison', 'metrics'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={cn(
              'px-4 py-2 rounded-md text-sm font-medium transition-all',
              activeTab === tab ? 'bg-brand-500/20 text-brand-400 border border-brand-500/30' : 'text-white/40 hover:text-white/60 border border-transparent'
            )}
          >
            {tab === 'comparison' ? 'Before / After' : 'Metrics'}
          </button>
        ))}
      </div>

      {activeTab === 'comparison' && (
        <div className="card p-6">
          <div className="relative rounded-xl overflow-hidden bg-ink-950 aspect-video">
            <div className="absolute inset-0 flex">
              <div className="relative overflow-hidden" style={{ width: `${sliderPos}%` }}>
                <div className="absolute inset-0 bg-gradient-to-br from-ink-800 to-ink-700 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-32 h-32 mx-auto mb-3 rounded-xl bg-ink-600 flex items-center justify-center">
                      <Camera className="w-12 h-12 text-white/20" />
                    </div>
                    <span className="text-white/30 text-sm font-medium">Original Street</span>
                  </div>
                </div>
                <div className="absolute top-3 left-3 px-2 py-1 rounded bg-black/60 text-white/80 text-xs">BEFORE</div>
              </div>
              <div className="relative overflow-hidden" style={{ width: `${100 - sliderPos}%` }}>
                <div className="absolute inset-0 bg-gradient-to-br from-brand-900/30 to-brand-800/20 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-32 h-32 mx-auto mb-3 rounded-xl bg-brand-600/20 border border-brand-500/20 flex items-center justify-center">
                      <Sparkles className="w-12 h-12 text-brand-400" />
                    </div>
                    <span className="text-brand-300 text-sm font-medium">Pedestrian-Friendly</span>
                  </div>
                </div>
                <div className="absolute top-3 right-3 px-2 py-1 rounded bg-brand-600/80 text-white text-xs">AFTER</div>
              </div>
            </div>
            <input type="range" min="0" max="100" value={sliderPos} onChange={(e) => setSliderPos(parseInt(e.target.value))} className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize" />
            <div className="absolute top-0 bottom-0 w-0.5 bg-white shadow-lg z-10" style={{ left: `${sliderPos}%` }}>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white shadow-lg flex items-center justify-center">
                <ArrowRight className="w-4 h-4 text-ink-700 rotate-90" />
              </div>
            </div>
          </div>
          <p className="text-xs text-white/30 text-center mt-3">Drag slider to compare before and after</p>
        </div>
      )}

      {activeTab === 'metrics' && (
        <div className="space-y-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: 'Zebra Crossings', value: '3 new', desc: 'Raised with refuge island' },
              { label: 'Sidewalk Width', value: '2.5m', desc: 'Both sides' },
              { label: 'Tree Positions', value: '48', desc: 'Neem @ 8m spacing' },
              { label: 'Speed Reduction', value: '50→30', desc: 'km/h road diet' },
            ].map((m) => (
              <div key={m.label} className="card p-4">
                <div className="text-xs text-white/40 mb-1">{m.label}</div>
                <div className="font-display text-2xl font-bold text-white">{m.value}</div>
                <div className="text-xs text-white/30 mt-1">{m.desc}</div>
              </div>
            ))}
          </div>
          <div className="card p-6">
            <h3 className="font-display font-semibold text-white mb-4">Generated Features</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {['Zebra crossings','Traffic lights','Human crosswalk lights','Crosswalk markings','Sidewalks','Bike lanes','Bollards','Pedestrian lighting','Covered drains'].map((f) => (
                <div key={f} className="flex items-center gap-2 text-sm text-white/70 p-2 rounded-lg bg-white/[0.03] border border-white/[0.04]">
                  <CheckCircle2 className="w-4 h-4 text-brand-400 shrink-0" />{f}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <section>
        <h2 className="section-title mb-4">Export Results</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {[
            { label: 'GeoJSON', desc: 'GIS import', icon: MapPin },
            { label: 'LandXML', desc: 'Civil 3D', icon: FileText },
            { label: 'PDF Report', desc: 'Full report', icon: FileText },
            { label: 'PNG Image', desc: 'Before/after', icon: Camera },
          ].map((fmt) => (
            <button key={fmt.label} className="card-hover p-4 text-left flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-brand-500/10 border border-brand-500/20 text-brand-400 flex items-center justify-center shrink-0">
                <Download className="w-5 h-5" />
              </div>
              <div>
                <div className="font-medium text-sm text-white">{fmt.label}</div>
                <div className="text-xs text-white/30">{fmt.desc}</div>
              </div>
            </button>
          ))}
        </div>
      </section>

      <div className="card p-6 bg-gradient-to-r from-brand-500/[0.05] to-accent-500/[0.05] border-brand-500/10">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h3 className="font-display font-semibold text-white">Want deeper analysis?</h3>
            <p className="text-sm text-white/50">Switch to Detailed Mode for grid-based interference detection and human-in-the-loop review.</p>
          </div>
          <Link href="/detailed/input" className="btn-primary">
            <Award className="w-4 h-4" />Try Detailed Mode
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  )
}
