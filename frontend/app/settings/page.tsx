'use client'

import { useState } from 'react'
import { Database, Globe, Key, Server, Shield, Zap } from 'lucide-react'

export default function SettingsPage() {
  const [apiKey, setApiKey] = useState('')
  const [mapToken, setMapToken] = useState('')
  const [osmEndpoint, setOsmEndpoint] = useState('https://nominatim.openstreetmap.org')
  const [backend, setBackend] = useState('http://localhost:8000')

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <header><h1 className="font-display text-2xl font-bold text-white">Settings</h1><p className="text-white/40 mt-1">Configure API keys and service endpoints</p></header>
      <section className="card p-6">
        <div className="flex items-center gap-3 mb-4"><div className="w-9 h-9 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center"><Key className="w-5 h-5" /></div><div><h3 className="font-display font-semibold text-white">API Keys</h3><p className="text-xs text-white/30">Stored locally, never sent to our servers</p></div></div>
        <div className="space-y-4">
          <div><label className="label">Google Maps API Key</label><input type="password" className="input font-mono" placeholder="AIza..." value={apiKey} onChange={(e) => setApiKey(e.target.value)} /><p className="text-xs text-white/20 mt-1">$200/month free credit. Enables Street View, Roads, Places.</p></div>
          <div><label className="label">Mapbox Token (optional)</label><input type="password" className="input font-mono" placeholder="pk...." value={mapToken} onChange={(e) => setMapToken(e.target.value)} /><p className="text-xs text-white/20 mt-1">Free tier. Used for enhanced map rendering.</p></div>
        </div>
      </section>
      <section className="card p-6">
        <div className="flex items-center gap-3 mb-4"><div className="w-9 h-9 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center"><Server className="w-5 h-5" /></div><div><h3 className="font-display font-semibold text-white">Service Endpoints</h3><p className="text-xs text-white/30">Backend and third-party services</p></div></div>
        <div className="space-y-4">
          <div><label className="label">Backend API</label><input type="text" className="input font-mono" value={backend} onChange={(e) => setBackend(e.target.value)} /></div>
          <div><label className="label">Nominatim / OSM Geocoding</label><input type="text" className="input font-mono" value={osmEndpoint} onChange={(e) => setOsmEndpoint(e.target.value)} /></div>
        </div>
      </section>
      <section className="card p-6">
        <div className="flex items-center gap-3 mb-4"><div className="w-9 h-9 rounded-lg bg-brand-500/10 border border-brand-500/20 text-brand-400 flex items-center justify-center"><Zap className="w-5 h-5" /></div><div><h3 className="font-display font-semibold text-white">Analysis Defaults</h3><p className="text-xs text-white/30">Pre-filled for new analyses</p></div></div>
        <div className="grid sm:grid-cols-2 gap-4">
          <div><label className="label">Default analysis radius</label><select className="input"><option>250m</option><option>500m</option><option>1km</option><option>2km</option></select></div>
          <div><label className="label">Target city tier</label><select className="input"><option>Tier 1 (Metro)</option><option>Tier 2 (City)</option><option>Tier 3 (Residential)</option></select></div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-4">{['Auto-run vision', 'Cache OSM data', 'Enable fallback chain', 'Generate before/after', 'Compute BOQ', 'Run SUMO sim'].map((opt, i) => (<label key={i} className="flex items-center gap-2 p-2.5 rounded-lg hover:bg-white/[0.03] cursor-pointer"><input type="checkbox" defaultChecked={i < 4} className="w-4 h-4 rounded border-white/20 bg-surface-200 text-brand-500 focus:ring-brand-500/20" /><span className="text-sm text-white/60">{opt}</span></label>))}</div>
      </section>
      <section className="card p-6">
        <div className="flex items-center gap-3 mb-4"><div className="w-9 h-9 rounded-lg bg-purple-500/10 border border-purple-500/20 text-purple-400 flex items-center justify-center"><Shield className="w-5 h-5" /></div><div><h3 className="font-display font-semibold text-white">About UrbanX</h3><p className="text-xs text-white/30">Version 2.0.0</p></div></div>
        <div className="text-sm text-white/50 space-y-2"><p>UrbanX is an AI-powered pedestrian-friendly urban redesign system purpose-built for Indian cities. It analyzes existing infrastructure using YOLOv9, LLaVA 1.6, and EasyOCR, then generates constraint-based redesigns validated against IRC:SP:103 and international benchmarks.</p><p className="text-xs text-white/20">Built by Aryan Singh · 100% free and open-source · All tools, APIs, and models are free tiers.</p></div>
      </section>
      <div className="flex justify-end gap-3"><button className="btn-secondary">Reset Defaults</button><button className="btn-primary">Save Settings</button></div>
    </div>
  )
}
