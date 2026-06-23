'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowRight, CheckCircle2, Layers, Sparkles, TrendingUp, Zap } from 'lucide-react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { useAppStore } from '@/lib/store'

const generationSteps = [
  { label: 'Generating base redesign from rule engine', duration: 2000 },
  { label: 'Applying user feature selections', duration: 1200 },
  { label: 'Running pix2pix visual generation', duration: 3000 },
  { label: 'Converting to SUMO network', duration: 1500 },
  { label: 'Running SUMO simulation (3600s)', duration: 2500 },
  { label: 'Computing interference scores', duration: 1000 },
  { label: 'Selecting best design (lowest interference)', duration: 800 },
]

export default function DetailedGenerationPage() {
  const router = useRouter()
  const { setDetailedStep, setGenerationComplete, setGenerationProgress, setExportData } = useAppStore()
  const [currentStep, setCurrentStep] = useState(0)
  const [done, setDone] = useState(false)
  const [scores] = useState({ before: 87, after: 41 })

  useEffect(() => {
    if (done) return
    if (currentStep >= generationSteps.length) {
      setDone(true)
      setGenerationComplete(true)
      setGenerationProgress(100)
      setExportData({
        area: 'Connaught Place, New Delhi', roadWidth: 6.0, laneWidth: 3.0, laneCount: 2, sidewalkWidth: 2.5, bikeLaneWidth: 1.5, treeSpacing: 8, treeCount: 48, totalRedesignWidth: 15.0,
        beforeDeaths: 3, afterDeaths: 0, beforeNearMisses: 14, afterNearMisses: 2, beforeWaitTime: 85, afterWaitTime: 22, vehicleDelay: 18, totalCost: 1245000,
        compliance: ['IRC:SP:103', 'IRC:86', 'Harmonised Guidelines', 'NBC 2016'],
      })
      return
    }
    const timer = setTimeout(() => {
      setCurrentStep((s) => s + 1)
      setGenerationProgress(Math.round(((currentStep + 1) / generationSteps.length) * 100))
    }, generationSteps[currentStep].duration)
    return () => clearTimeout(timer)
  }, [currentStep, done, setGenerationComplete, setGenerationProgress, setExportData])

  if (done) {
    return (
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="flex items-center gap-2 text-xs text-white/30">
          <Link href="/" className="hover:text-brand-400">Home</Link><span>/</span>
          <Link href="/detailed/input" className="hover:text-brand-400">Detailed Mode</Link><span>/</span>
          <span className="text-accent-400 font-medium">Generation</span>
        </div>
        <div className="text-center py-8">
          <div className="w-20 h-20 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <h2 className="font-display text-2xl font-bold text-white mb-2">Redesign Generated!</h2>
          <p className="text-white/40 mb-8">ML model + SUMO simulation complete. Best design selected.</p>
        </div>
        <div className="card p-6">
          <h3 className="font-display font-semibold text-white mb-6 text-center">Interference Score Comparison</h3>
          <div className="grid grid-cols-2 gap-6">
            <div className="text-center">
              <div className="text-sm text-white/40 mb-2">Before Redesign</div>
              <div className="font-display text-5xl font-bold text-critical">{scores.before}</div>
              <div className="text-xs text-white/30 mt-2">Pedestrian-vehicle conflicts</div>
              <div className="mt-3 space-y-1 text-xs text-white/30"><div>3 deaths / day</div><div>14 near-misses / day</div><div>85s avg wait time</div></div>
            </div>
            <div className="text-center">
              <div className="text-sm text-white/40 mb-2">After Redesign</div>
              <div className="font-display text-5xl font-bold text-success">{scores.after}</div>
              <div className="text-xs text-white/30 mt-2">Pedestrian-vehicle conflicts</div>
              <div className="mt-3 space-y-1 text-xs text-white/30"><div>0 deaths / day</div><div>2 near-misses / day</div><div>22s avg wait time</div></div>
            </div>
          </div>
          <div className="mt-6 text-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-brand-500/10 border border-brand-500/20 px-4 py-2 text-sm font-medium text-brand-400">
              <TrendingUp className="w-4 h-4" />Interference reduced by {Math.round((1 - scores.after / scores.before) * 100)}%
            </div>
          </div>
        </div>
        <div className="card p-6">
          <h3 className="font-display font-semibold text-white mb-4">Design Summary</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {[{ l: 'Zebra Crossings', v: '3 new' }, { l: 'Traffic Lights', v: '2 with ped phase' }, { l: 'Sidewalk', v: '2.5m both sides' }, { l: 'Bike Lane', v: '1.5m protected' }, { l: 'Street Trees', v: '48 (Neem)' }, { l: 'Covered Drains', v: '3.8km' }].map((i) => (
              <div key={i.l} className="rounded-lg bg-white/[0.03] border border-white/[0.06] p-3">
                <div className="text-xs text-white/30">{i.l}</div>
                <div className="font-display font-bold text-white">{i.v}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-center">
          <button onClick={() => { setDetailedStep('review'); router.push('/detailed/review') }} className="btn-primary bg-accent-600 hover:bg-accent-500 px-8">
            Proceed to Review <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <div className="flex items-center gap-2 text-xs text-white/30">
        <Link href="/" className="hover:text-brand-400">Home</Link><span>/</span>
        <Link href="/detailed/input" className="hover:text-brand-400">Detailed Mode</Link><span>/</span>
        <span className="text-accent-400 font-medium">Generation</span>
      </div>
      <header>
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-accent-500/10 border border-accent-500/20 flex items-center justify-center"><Sparkles className="w-5 h-5 text-accent-400" /></div>
          <div><h1 className="font-display text-2xl font-bold text-white">Generating Redesign</h1><p className="text-white/40 text-sm">Step 5 of 6 — ML model + SUMO simulation</p></div>
        </div>
      </header>
      <div className="card p-6">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-medium text-white/70">{currentStep < generationSteps.length ? generationSteps[currentStep].label : 'Complete'}</span>
          <span className="text-sm font-mono text-accent-400">{Math.round((currentStep / generationSteps.length) * 100)}%</span>
        </div>
        <div className="w-full bg-white/[0.06] rounded-full h-2.5 overflow-hidden">
          <div className="h-full bg-gradient-to-r from-accent-500 to-accent-400 rounded-full transition-all duration-500" style={{ width: `${(currentStep / generationSteps.length) * 100}%` }} />
        </div>
      </div>
      <div className="card p-6">
        <div className="space-y-3">
          {generationSteps.map((step, i) => (
            <div key={i} className={cn('flex items-center gap-3 p-3 rounded-lg transition-all',
              i < currentStep ? 'bg-green-500/[0.05]' : i === currentStep ? 'bg-accent-500/10 border border-accent-500/20' : 'bg-white/[0.02]'
            )}>
              {i < currentStep ? <CheckCircle2 className="w-5 h-5 text-green-400 shrink-0" /> : i === currentStep ? <Zap className="w-5 h-5 text-accent-400 shrink-0 animate-pulse" /> : <div className="w-5 h-5 rounded-full border-2 border-white/10 shrink-0" />}
              <span className={cn('text-sm', i < currentStep ? 'text-green-400' : i === currentStep ? 'text-accent-400 font-medium' : 'text-white/20')}>{step.label}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="card p-6 bg-gradient-to-br from-accent-500/[0.05] to-transparent border-accent-500/10">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-accent-500/10 border border-accent-500/20 text-accent-400 flex items-center justify-center animate-pulse-slow"><Layers className="w-6 h-6" /></div>
          <div>
            <div className="text-sm font-medium text-white">{currentStep < 3 ? 'Generating visual rendering...' : currentStep < 5 ? 'Running SUMO traffic simulation...' : 'Computing interference scores...'}</div>
            <div className="text-xs text-white/30 mt-0.5">{currentStep < 3 ? 'pix2pix model processing' : currentStep < 5 ? 'Simulating 3600 seconds of traffic' : 'Selecting lowest interference design'}</div>
          </div>
        </div>
      </div>
    </div>
  )
}
