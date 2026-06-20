'use client'

import { useState } from 'react'
import { Layers, MapPin, Minus, Plus, Search } from 'lucide-react'
import { cn } from '@/lib/utils'

const indianCities = [
  { name: 'Connaught Place, Delhi', lat: 28.6315, lng: 77.2167 },
  { name: 'MG Road, Bangalore', lat: 12.9716, lng: 77.5946 },
  { name: 'Marine Drive, Mumbai', lat: 18.9440, lng: 72.8234 },
  { name: 'Park Street, Kolkata', lat: 22.5726, lng: 88.3639 },
  { name: 'Anna Salai, Chennai', lat: 13.0827, lng: 80.2707 },
]

export default function MapPage() {
  const [search, setSearch] = useState('')
  const [activeLayers, setActiveLayers] = useState({
    crossings: true,
    sidewalks: true,
    trees: false,
    drainage: false,
    heatmap: false,
  })
  const [zoom, setZoom] = useState(14)
  const [pinned, setPinned] = useState(false)

  return (
    <div className="space-y-6">
      <header className="flex items-end justify-between flex-wrap gap-4">
        <div>
          <h1 className="font-display text-2xl font-bold text-ink-900">Interactive Map</h1>
          <p className="text-ink-500 mt-1">Click to drop a pin or draw a boundary to analyze</p>
        </div>
        <button className="btn-primary">
          <MapPin className="w-4 h-4" />
          Analyze Selected Area
        </button>
      </header>

      <div className="grid lg:grid-cols-[1fr_320px] gap-4">
        {/* Map canvas */}
        <div className="card overflow-hidden relative h-[600px]">
          {/* Mock map */}
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 via-blue-50 to-emerald-50">
            {/* Grid lines to simulate map */}
            <svg className="absolute inset-0 w-full h-full opacity-30" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#94a3b8" strokeWidth="0.5" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
            {/* Roads */}
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 800 600" preserveAspectRatio="none">
              <line x1="0" y1="300" x2="800" y2="300" stroke="#cbd5e1" strokeWidth="14" />
              <line x1="400" y1="0" x2="400" y2="600" stroke="#cbd5e1" strokeWidth="14" />
              <line x1="0" y1="150" x2="800" y2="150" stroke="#e2e8f0" strokeWidth="6" />
              <line x1="0" y1="450" x2="800" y2="450" stroke="#e2e8f0" strokeWidth="6" />
              <line x1="200" y1="0" x2="200" y2="600" stroke="#e2e8f0" strokeWidth="6" />
              <line x1="600" y1="0" x2="600" y2="600" stroke="#e2e8f0" strokeWidth="6" />
              {/* Highlighted corridor (the "analysis zone") */}
              <rect x="180" y="270" width="440" height="60" fill="#27b06c" fillOpacity="0.15" rx="4" />
            </svg>
            {/* Crossing markers */}
            {activeLayers.crossings &&
              [
                { x: 25, y: 48 },
                { x: 45, y: 48 },
                { x: 65, y: 48 },
              ].map((c, i) => (
                <div
                  key={i}
                  className="absolute -translate-x-1/2 -translate-y-1/2"
                  style={{ left: `${c.x}%`, top: `${c.y}%` }}
                >
                  <div className="w-3 h-3 rounded-full bg-critical ring-4 ring-red-200" />
                </div>
              ))}
            {/* Pin */}
            {pinned && (
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-full">
                <MapPin className="w-8 h-8 text-brand-600 fill-brand-200" />
              </div>
            )}
          </div>

          {/* Map controls */}
          <div className="absolute top-4 right-4 flex flex-col gap-1 z-10">
            <button
              onClick={() => setZoom((z) => Math.min(z + 1, 20))}
              className="w-9 h-9 rounded-lg bg-white shadow-card border border-ink-100 flex items-center justify-center hover:bg-ink-50"
            >
              <Plus className="w-4 h-4 text-ink-700" />
            </button>
            <button
              onClick={() => setZoom((z) => Math.max(z - 1, 8))}
              className="w-9 h-9 rounded-lg bg-white shadow-card border border-ink-100 flex items-center justify-center hover:bg-ink-50"
            >
              <Minus className="w-4 h-4 text-ink-700" />
            </button>
            <button
              onClick={() => setPinned((p) => !p)}
              className={cn(
                'w-9 h-9 rounded-lg bg-white shadow-card border border-ink-100 flex items-center justify-center hover:bg-ink-50',
                pinned && 'bg-brand-50 border-brand-200 text-brand-600'
              )}
            >
              <MapPin className="w-4 h-4" />
            </button>
          </div>

          {/* Coordinates bar */}
          <div className="absolute bottom-4 left-4 right-4 z-10">
            <div className="bg-white/90 backdrop-blur rounded-lg border border-ink-100 px-3 py-2 text-xs font-mono text-ink-600 flex items-center justify-between">
              <span>Zoom {zoom} · 28.6315°N, 77.2167°E</span>
              <span className="text-ink-400">Click map to drop pin</span>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          <div className="card p-4">
            <label className="label">Search location</label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-400" />
              <input
                type="text"
                className="input pl-9"
                placeholder="Search Indian city, area..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div className="mt-3 space-y-1">
              {indianCities
                .filter((c) => !search || c.name.toLowerCase().includes(search.toLowerCase()))
                .map((c) => (
                  <button
                    key={c.name}
                    className="w-full text-left px-3 py-2 rounded-lg hover:bg-ink-50 text-sm text-ink-700 transition-colors"
                  >
                    <MapPin className="w-3.5 h-3.5 inline text-ink-400 mr-1.5" />
                    {c.name}
                  </button>
                ))}
            </div>
          </div>

          <div className="card p-4">
            <div className="flex items-center gap-2 mb-3">
              <Layers className="w-4 h-4 text-ink-500" />
              <span className="font-medium text-sm text-ink-900">Map Layers</span>
            </div>
            <div className="space-y-2">
              {Object.entries(activeLayers).map(([key, val]) => (
                <label
                  key={key}
                  className="flex items-center justify-between p-2 rounded-lg hover:bg-ink-50 cursor-pointer"
                >
                  <span className="text-sm text-ink-700 capitalize">{key}</span>
                  <button
                    onClick={() =>
                      setActiveLayers((prev) => ({ ...prev, [key]: !val }))
                    }
                    className={cn(
                      'w-9 h-5 rounded-full transition-colors relative',
                      val ? 'bg-brand-500' : 'bg-ink-200'
                    )}
                  >
                    <span
                      className={cn(
                        'absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform',
                        val ? 'left-[18px]' : 'left-0.5'
                      )}
                    />
                  </button>
                </label>
              ))}
            </div>
          </div>

          <div className="card p-4">
            <h4 className="font-medium text-sm text-ink-900 mb-2">Quick Stats</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-ink-500">Area analyzed</span>
                <span className="font-medium text-ink-900">0.78 km²</span>
              </div>
              <div className="flex justify-between">
                <span className="text-ink-500">Road length</span>
                <span className="font-medium text-ink-900">3.2 km</span>
              </div>
              <div className="flex justify-between">
                <span className="text-ink-500">Intersections</span>
                <span className="font-medium text-ink-900">12</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
