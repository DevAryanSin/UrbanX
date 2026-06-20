'use client'

import { useState } from 'react'
import { Database, Globe, Key, Server, Shield, Zap } from 'lucide-react'
import { cn } from '@/lib/utils'

export default function SettingsPage() {
  const [apiKey, setApiKey] = useState('')
  const [mapToken, setMapToken] = useState('')
  const [osmEndpoint, setOsmEndpoint] = useState('https://nominatim.openstreetmap.org')
  const [backend, setBackend] = useState('http://localhost:8000')

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <header>
        <h1 className="font-display text-2xl font-bold text-ink-900">Settings</h1>
        <p className="text-ink-500 mt-1">Configure API keys and service endpoints</p>
      </header>

      {/* API Keys */}
      <section className="card p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-9 h-9 rounded-lg bg-amber-100 text-amber-600 flex items-center justify-center">
            <Key className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-display font-semibold text-ink-900">API Keys</h3>
            <p className="text-xs text-ink-500">Stored locally, never sent to our servers</p>
          </div>
        </div>
        <div className="space-y-4">
          <div>
            <label className="label">Google Maps API Key</label>
            <input
              type="password"
              className="input font-mono"
              placeholder="AIza..."
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
            />
            <p className="text-xs text-ink-400 mt-1">$200/month free credit. Enables Street View, Roads, Places.</p>
          </div>
          <div>
            <label className="label">Mapbox Token (optional)</label>
            <input
              type="password"
              className="input font-mono"
              placeholder="pk...."
              value={mapToken}
              onChange={(e) => setMapToken(e.target.value)}
            />
            <p className="text-xs text-ink-400 mt-1">Free tier. Used for enhanced map rendering.</p>
          </div>
        </div>
      </section>

      {/* Endpoints */}
      <section className="card p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-9 h-9 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center">
            <Server className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-display font-semibold text-ink-900">Service Endpoints</h3>
            <p className="text-xs text-ink-500">Backend and third-party services</p>
          </div>
        </div>
        <div className="space-y-4">
          <div>
            <label className="label">Backend API</label>
            <input
              type="text"
              className="input font-mono"
              value={backend}
              onChange={(e) => setBackend(e.target.value)}
            />
          </div>
          <div>
            <label className="label">Nominatim / OSM Geocoding</label>
            <input
              type="text"
              className="input font-mono"
              value={osmEndpoint}
              onChange={(e) => setOsmEndpoint(e.target.value)}
            />
          </div>
        </div>
      </section>

      {/* Analysis defaults */}
      <section className="card p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-9 h-9 rounded-lg bg-brand-100 text-brand-600 flex items-center justify-center">
            <Zap className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-display font-semibold text-ink-900">Analysis Defaults</h3>
            <p className="text-xs text-ink-500">Pre-filled for new analyses</p>
          </div>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="label">Default analysis radius</label>
            <select className="input">
              <option>250m</option>
              <option>500m</option>
              <option>1km</option>
              <option>2km</option>
            </select>
          </div>
          <div>
            <label className="label">Target city tier</label>
            <select className="input">
              <option>Tier 1 (Metro)</option>
              <option>Tier 2 (City)</option>
              <option>Tier 3 (Residential)</option>
            </select>
          </div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-4">
          {[
            { label: 'Auto-run vision', checked: true },
            { label: 'Cache OSM data', checked: true },
            { label: 'Enable fallback chain', checked: true },
            { label: 'Generate before/after', checked: true },
            { label: 'Compute BOQ', checked: false },
            { label: 'Run SUMO sim', checked: false },
          ].map((opt, i) => (
            <label key={i} className="flex items-center gap-2 p-2.5 rounded-lg hover:bg-ink-50 cursor-pointer">
              <input
                type="checkbox"
                defaultChecked={opt.checked}
                className="w-4 h-4 rounded border-ink-300 text-brand-600 focus:ring-brand-500"
              />
              <span className="text-sm text-ink-700">{opt.label}</span>
            </label>
          ))}
        </div>
      </section>

      {/* About */}
      <section className="card p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-9 h-9 rounded-lg bg-purple-100 text-purple-600 flex items-center justify-center">
            <Shield className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-display font-semibold text-ink-900">About UrbanX</h3>
            <p className="text-xs text-ink-500">Version 0.1.0 — MVP</p>
          </div>
        </div>
        <div className="text-sm text-ink-600 space-y-2">
          <p>
            UrbanX is an AI-powered pedestrian-friendly urban redesign system purpose-built for
            Indian cities. It analyzes existing infrastructure using YOLOv9, LLaVA 1.6, and EasyOCR,
            then generates constraint-based redesigns validated against IRC:SP:103 and international
            benchmarks.
          </p>
          <p className="text-xs text-ink-400">
            Built by Aryan Singh · 100% free and open-source · All tools, APIs, and models are free tiers.
          </p>
        </div>
      </section>

      <div className="flex justify-end gap-3">
        <button className="btn-secondary">Reset Defaults</button>
        <button className="btn-primary">Save Settings</button>
      </div>
    </div>
  )
}
