'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  Camera,
  CheckCircle2,
  FileUp,
  Loader2,
  MapPin,
  Sparkles,
  Upload,
  X,
} from 'lucide-react'
import { useAppStore } from '@/lib/store'
import { cn } from '@/lib/utils'

type Mode = 'upload' | 'coordinates' | 'map'

const processingSteps = [
  { label: 'Fetching OSM data', duration: 1200 },
  { label: 'Running YOLOv9 detection', duration: 1800 },
  { label: 'LLaVA scene understanding', duration: 2200 },
  { label: 'EasyOCR sign reading', duration: 1000 },
  { label: 'Computing 7 audit scores', duration: 1400 },
  { label: 'Generating redesign', duration: 2000 },
  { label: 'Validating IRC constraints', duration: 800 },
]

export default function AnalysisPage() {
  const router = useRouter()
  const { status, progress, currentStep, setProgress, setResult, setStatus } = useAppStore()
  const [mode, setMode] = useState<Mode>('upload')
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [lat, setLat] = useState('28.6139')
  const [lng, setLng] = useState('77.2090')
  const [address, setAddress] = useState('')

  const handleFile = (f: File) => {
    setFile(f)
    const reader = new FileReader()
    reader.onload = (e) => setPreview(e.target?.result as string)
    reader.readAsDataURL(f)
  }

  const startAnalysis = async () => {
    setStatus('processing')
    setProgress(0, 'Initializing')

    for (let i = 0; i < processingSteps.length; i++) {
      const step = processingSteps[i]
      setProgress((i / processingSteps.length) * 100, step.label)
      await new Promise((r) => setTimeout(r, step.duration))
    }
    setProgress(100, 'Done')

    const mock = {
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      location: {
        address: address || 'Connaught Place, New Delhi',
        lat: parseFloat(lat),
        lng: parseFloat(lng),
      },
      scores: {
        walkability: 34,
        safety: 28,
        accessibility: 12,
        monsoon: 41,
        green: 19,
        infrastructure: 38,
        overall: 29,
      },
      audits: {
        sidewalkCoverage: 22,
        crossingSpacing: 480,
        speedRisk: 78,
        drainageCoverage: 35,
        canopyCoverage: 8,
        curbRampCoverage: 4,
      },
      recommendations: [
        {
          id: '1',
          severity: 'critical',
          title: 'Install raised zebra crossings every 100m',
          description: 'Current crossing spacing is 480m. Install raised crossings with refuge islands.',
          location: 'Main road segment',
          estimatedCost: 12_50_000,
        },
        {
          id: '2',
          severity: 'critical',
          title: 'Cover all open drains',
          description: '1.2km of open drains pose severe monsoon risk. Replace with covered drains.',
          location: 'Both sides of road',
          estimatedCost: 45_00_000,
        },
        {
          id: '3',
          severity: 'high',
          title: 'Add 2.5m continuous sidewalk',
          description: 'Only 22% of road has sidewalk. Add 2.5m shaded sidewalk on both sides.',
          location: 'Full corridor',
          estimatedCost: 85_00_000,
        },
        {
          id: '4',
          severity: 'high',
          title: 'Plant street trees every 8m',
          description: 'Canopy coverage is only 8%. Target 80% with Neem and Peepal.',
          location: 'Full corridor',
          estimatedCost: 8_50_000,
        },
        {
          id: '5',
          severity: 'medium',
          title: 'Reduce speed to 30 km/h (road diet)',
          description: 'Convert 4 lanes to 2 + bike lane + wider sidewalk.',
          location: 'Full corridor',
          estimatedCost: 22_00_000,
        },
      ],
    }

    setResult(mock as any)
    setStatus('complete')
  }

  if (status === 'complete') {
    return <CompleteView />
  }

  if (status === 'processing') {
    return <ProcessingView progress={progress} currentStep={currentStep} />
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <header>
        <h1 className="font-display text-2xl font-bold text-ink-900">New Analysis</h1>
        <p className="text-ink-500 mt-1">Choose how you want to specify the area to analyze</p>
      </header>

      {/* Mode selector */}
      <div className="grid grid-cols-3 gap-2 p-1 bg-ink-100 rounded-xl">
        {[
          { id: 'upload', label: 'Photo Upload', icon: Camera },
          { id: 'coordinates', label: 'Coordinates', icon: MapPin },
          { id: 'map', label: 'Map Select', icon: MapPin },
        ].map((m) => (
          <button
            key={m.id}
            onClick={() => setMode(m.id as Mode)}
            className={cn(
              'flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium transition-all',
              mode === m.id ? 'bg-white text-ink-900 shadow-sm' : 'text-ink-500 hover:text-ink-700'
            )}
          >
            <m.icon className="w-4 h-4" />
            {m.label}
          </button>
        ))}
      </div>

      {/* Input area */}
      <div className="card p-6">
        {mode === 'upload' && (
          <div className="space-y-4">
            <div>
              <label className="label">Street-level photo</label>
              <p className="text-xs text-ink-500 mb-3">
                Upload a photo taken from the street. GPS EXIF data will be used if available.
              </p>
              {!preview ? (
                <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-ink-200 rounded-xl cursor-pointer hover:border-brand-400 hover:bg-brand-50/30 transition-all">
                  <div className="flex flex-col items-center text-center px-4">
                    <div className="w-12 h-12 rounded-full bg-brand-50 text-brand-600 flex items-center justify-center mb-3">
                      <FileUp className="w-6 h-6" />
                    </div>
                    <span className="text-sm font-medium text-ink-700 mb-1">
                      Drop a photo or click to browse
                    </span>
                    <span className="text-xs text-ink-400">JPG, PNG up to 10MB</span>
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
                  />
                </label>
              ) : (
                <div className="relative rounded-xl overflow-hidden bg-ink-900 aspect-video">
                  <img src={preview} alt="Preview" className="w-full h-full object-contain" />
                  <button
                    onClick={() => {
                      setFile(null)
                      setPreview(null)
                    }}
                    className="absolute top-3 right-3 p-1.5 rounded-lg bg-black/50 hover:bg-black/70 text-white"
                  >
                    <X className="w-4 h-4" />
                  </button>
                  <div className="absolute bottom-3 left-3 inline-flex items-center gap-1.5 rounded-full bg-black/60 backdrop-blur px-2.5 py-1 text-xs text-white">
                    <CheckCircle2 className="w-3 h-3 text-brand-400" />
                    {file?.name}
                  </div>
                </div>
              )}
            </div>
            <div>
              <label className="label">Location (optional)</label>
              <input
                type="text"
                className="input"
                placeholder="e.g. Connaught Place, New Delhi"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
          </div>
        )}

        {mode === 'coordinates' && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="label">Latitude</label>
                <input
                  type="text"
                  className="input font-mono"
                  value={lat}
                  onChange={(e) => setLat(e.target.value)}
                />
              </div>
              <div>
                <label className="label">Longitude</label>
                <input
                  type="text"
                  className="input font-mono"
                  value={lng}
                  onChange={(e) => setLng(e.target.value)}
                />
              </div>
            </div>
            <div>
              <label className="label">Address (for report)</label>
              <input
                type="text"
                className="input"
                placeholder="e.g. MG Road, Bangalore"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
            <div className="rounded-lg bg-ink-50 border border-ink-100 p-4 text-sm text-ink-600">
              <strong className="text-ink-700">Tip:</strong> Analysis covers a 500m radius around the point.
              For larger areas, draw a polygon on the map.
            </div>
          </div>
        )}

        {mode === 'map' && (
          <div className="space-y-4">
            <div className="rounded-xl bg-gradient-to-br from-brand-50 to-brand-100 border border-brand-200 h-72 flex items-center justify-center">
              <div className="text-center">
                <MapPin className="w-10 h-10 text-brand-500 mx-auto mb-2" />
                <p className="text-sm font-medium text-brand-800">Interactive map</p>
                <p className="text-xs text-brand-600 mt-1">Click to drop a pin or draw a boundary</p>
              </div>
            </div>
            <div>
              <label className="label">Or type coordinates</label>
              <div className="grid grid-cols-2 gap-4">
                <input type="text" className="input font-mono" placeholder="Latitude" value={lat} onChange={(e) => setLat(e.target.value)} />
                <input type="text" className="input font-mono" placeholder="Longitude" value={lng} onChange={(e) => setLng(e.target.value)} />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Options */}
      <div className="card p-6">
        <h3 className="font-display font-semibold text-ink-900 mb-4">Analysis Options</h3>
        <div className="grid sm:grid-cols-2 gap-3">
          {[
            { label: 'Pedestrian infrastructure audit', checked: true },
            { label: 'Safety & conflict analysis', checked: true },
            { label: 'Monsoon resilience scoring', checked: true },
            { label: 'Accessibility audit (IRC:SP:103)', checked: true },
            { label: 'Green coverage analysis', checked: true },
            { label: 'Generate redesign proposal', checked: true },
          ].map((opt, i) => (
            <label key={i} className="flex items-center gap-3 p-3 rounded-lg hover:bg-ink-50 cursor-pointer">
              <input
                type="checkbox"
                defaultChecked={opt.checked}
                className="w-4 h-4 rounded border-ink-300 text-brand-600 focus:ring-brand-500"
              />
              <span className="text-sm text-ink-700">{opt.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Submit */}
      <div className="flex items-center justify-end gap-3">
        <button className="btn-secondary">Cancel</button>
        <button onClick={startAnalysis} className="btn-primary">
          <Sparkles className="w-4 h-4" />
          Run Analysis
        </button>
      </div>
    </div>
  )
}

function ProcessingView({ progress, currentStep }: { progress: number; currentStep: string }) {
  return (
    <div className="max-w-xl mx-auto py-20 text-center">
      <div className="w-20 h-20 rounded-full bg-brand-50 text-brand-600 flex items-center justify-center mx-auto mb-6 animate-pulse-slow">
        <Loader2 className="w-10 h-10 animate-spin" />
      </div>
      <h2 className="font-display text-2xl font-bold text-ink-900 mb-2">Analyzing Street</h2>
      <p className="text-ink-500 mb-8">{currentStep}</p>
      <div className="w-full bg-ink-100 rounded-full h-2 mb-2 overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-brand-500 to-brand-600 rounded-full transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>
      <p className="text-xs text-ink-400 font-mono">{Math.round(progress)}%</p>
    </div>
  )
}

function CompleteView() {
  const result = useAppStore((s) => s.result)
  const router = useRouter()
  if (!result) return null
  return (
    <div className="max-w-xl mx-auto py-20 text-center">
      <div className="w-20 h-20 rounded-full bg-green-100 text-green-600 flex items-center justify-center mx-auto mb-6">
        <CheckCircle2 className="w-10 h-10" />
      </div>
      <h2 className="font-display text-2xl font-bold text-ink-900 mb-2">Analysis Complete</h2>
      <p className="text-ink-500 mb-8">
        {result.location.address} scored {result.scores.overall}/100 overall.
      </p>
      <div className="flex justify-center gap-3">
        <button onClick={() => router.push('/')} className="btn-secondary">
          Dashboard
        </button>
        <button onClick={() => router.push('/report')} className="btn-primary">
          View Full Report
        </button>
      </div>
    </div>
  )
}
