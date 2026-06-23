'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  Camera,
  Clock,
  FileUp,
  Layers,
  MapPin,
  Satellite,
  Sparkles,
  Upload,
  X,
} from 'lucide-react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { useAppStore } from '@/lib/store'

type InputMode = 'aerial' | 'street' | 'map'

export default function DetailedInputPage() {
  const router = useRouter()
  const { setDetailedStep, resetDetailed } = useAppStore()
  const [mode, setMode] = useState<InputMode>('aerial')
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [lat, setLat] = useState('28.6139')
  const [lng, setLng] = useState('77.2090')
  const [address, setAddress] = useState('')
  const [duration, setDuration] = useState<'1' | '24'>('24')

  const handleFile = (f: File) => {
    setFile(f)
    const reader = new FileReader()
    reader.onload = (e) => setPreview(e.target?.result as string)
    reader.readAsDataURL(f)
  }

  const startAnalysis = () => {
    resetDetailed()
    setDetailedStep('analysis')
    router.push('/detailed/analysis')
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex items-center gap-2 text-xs text-white/30">
        <Link href="/" className="hover:text-brand-400">Home</Link>
        <span>/</span>
        <span className="text-accent-400 font-medium">Detailed Mode</span>
        <span>/</span>
        <span className="text-white/60">Input</span>
      </div>

      <header>
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-accent-500/10 border border-accent-500/20 flex items-center justify-center">
            <Layers className="w-5 h-5 text-accent-400" />
          </div>
          <div>
            <h1 className="font-display text-2xl font-bold text-white">Detailed Mode</h1>
            <p className="text-white/40 text-sm">Step 1 of 6 — Input: Upload photo or select coordinates</p>
          </div>
        </div>
      </header>

      {/* Progress bar */}
      <div className="flex items-center gap-1">
        {['Input', 'Analysis', 'Suggestions', 'Features', 'Generation', 'Review', 'Export'].map((step, i) => (
          <div key={step} className="flex-1">
            <div className={cn('h-1.5 rounded-full transition-all', i === 0 ? 'bg-accent-500' : 'bg-white/[0.06]')} />
            <div className={cn('text-[10px] mt-1 font-medium', i === 0 ? 'text-accent-400' : 'text-white/20')}>{step}</div>
          </div>
        ))}
      </div>

      {/* Input mode selector */}
      <div className="grid grid-cols-3 gap-1 p-1 bg-white/[0.04] rounded-xl">
        {[
          { id: 'aerial' as InputMode, label: 'Aerial Photo', icon: Satellite },
          { id: 'street' as InputMode, label: 'Street Photo', icon: Camera },
          { id: 'map' as InputMode, label: 'Map Selection', icon: MapPin },
        ].map((m) => (
          <button
            key={m.id}
            onClick={() => setMode(m.id)}
            className={cn(
              'flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium transition-all',
              mode === m.id ? 'bg-accent-500/20 text-accent-400 border border-accent-500/30' : 'text-white/40 hover:text-white/60 border border-transparent'
            )}
          >
            <m.icon className="w-4 h-4" />
            {m.label}
          </button>
        ))}
      </div>

      {/* Input area */}
      <div className="card p-6">
        {(mode === 'aerial' || mode === 'street') && (
          <div className="space-y-4">
            <div>
              <label className="label">{mode === 'aerial' ? 'Aerial / Satellite Photo' : 'Street-Level Photo'}</label>
              <p className="text-xs text-white/30 mb-3">
                {mode === 'aerial' ? 'Upload a satellite or drone photo of the area. Best for grid analysis.' : 'Upload a street-level photo for detailed infrastructure detection.'}
              </p>
              {!preview ? (
                <label className="flex flex-col items-center justify-center w-full h-56 border-2 border-dashed border-white/[0.08] rounded-xl cursor-pointer hover:border-accent-500/50 hover:bg-accent-500/[0.03] transition-all">
                  <div className="flex flex-col items-center text-center px-4">
                    <div className="w-12 h-12 rounded-full bg-accent-500/10 border border-accent-500/20 text-accent-400 flex items-center justify-center mb-3">
                      <FileUp className="w-6 h-6" />
                    </div>
                    <span className="text-sm font-medium text-white/70 mb-1">Drop photo or click to browse</span>
                    <span className="text-xs text-white/30">JPG, PNG up to 20MB</span>
                  </div>
                  <input type="file" accept="image/*" className="hidden" onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])} />
                </label>
              ) : (
                <div className="relative rounded-xl overflow-hidden bg-ink-950 aspect-video">
                  <img src={preview} alt="Preview" className="w-full h-full object-contain" />
                  <button onClick={() => { setFile(null); setPreview(null) }} className="absolute top-3 right-3 p-1.5 rounded-lg bg-black/60 hover:bg-black/80 text-white/80">
                    <X className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {mode === 'map' && (
          <div className="space-y-4">
            <div className="rounded-xl bg-accent-500/[0.05] border border-accent-500/10 h-72 flex items-center justify-center relative overflow-hidden">
              <svg className="absolute inset-0 w-full h-full opacity-30" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <pattern id="inputGrid" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#f97316" strokeWidth="0.5" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#inputGrid)" />
              </svg>
              <div className="text-center relative z-10">
                <MapPin className="w-10 h-10 text-accent-400 mx-auto mb-2" />
                <p className="text-sm font-medium text-white/70">Interactive Map</p>
                <p className="text-xs text-white/40 mt-1">Click to drop a pin or draw a boundary</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="label">Latitude</label>
                <input type="text" className="input font-mono" value={lat} onChange={(e) => setLat(e.target.value)} />
              </div>
              <div>
                <label className="label">Longitude</label>
                <input type="text" className="input font-mono" value={lng} onChange={(e) => setLng(e.target.value)} />
              </div>
            </div>
          </div>
        )}

        <div className="mt-4">
          <label className="label">Area Address</label>
          <input type="text" className="input" placeholder="e.g. Connaught Place, New Delhi" value={address} onChange={(e) => setAddress(e.target.value)} />
        </div>
      </div>

      {/* Duration selector */}
      <div className="card p-6">
        <h3 className="font-display font-semibold text-white mb-4 flex items-center gap-2">
          <Clock className="w-4 h-4 text-accent-400" />
          Monitoring Duration
        </h3>
        <div className="grid grid-cols-2 gap-3">
          {[
            { value: '1' as const, label: '1 Hour', desc: 'Quick snapshot analysis' },
            { value: '24' as const, label: '24 Hours', desc: 'Full day pattern analysis' },
          ].map((d) => (
            <button
              key={d.value}
              onClick={() => setDuration(d.value)}
              className={cn(
                'p-4 rounded-xl border text-left transition-all',
                duration === d.value
                  ? 'bg-accent-500/10 border-accent-500/30 text-accent-400'
                  : 'bg-white/[0.02] border-white/[0.06] text-white/50 hover:border-white/[0.12]'
              )}
            >
              <div className="font-medium text-sm">{d.label}</div>
              <div className="text-xs mt-0.5 opacity-70">{d.desc}</div>
            </button>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between">
        <Link href="/" className="btn-secondary">Back</Link>
        <button onClick={startAnalysis} className="btn-primary bg-accent-600 hover:bg-accent-500 px-8">
          <Sparkles className="w-4 h-4" />Start Area Analysis
        </button>
      </div>
    </div>
  )
}
