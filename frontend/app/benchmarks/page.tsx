'use client'

import { Award, ExternalLink, MapPin, TrendingUp } from 'lucide-react'

const benchmarks = [
  { city: 'Copenhagen', country: 'Denmark', highlight: '62% cycle to work', targets: 'Connaught Place, Delhi · MG Road, Bangalore', features: ['3.5m separated cycle tracks', 'Green wave for cyclists', 'Car-free Stroget'], score: 92 },
  { city: 'Amsterdam', country: 'Netherlands', highlight: '400km cycle paths', targets: 'Residential neighborhoods', features: ['Woonerf shared-space design', 'Traffic calming on all residential', 'Pedestrian priority zones'], score: 89 },
  { city: 'Tokyo', country: 'Japan', highlight: 'Vision Zero wards', targets: 'Indian metro station areas', features: ['Underground pedestrian networks', 'Escalators at every crossing', 'Tactile paving everywhere'], score: 95 },
  { city: 'Barcelona', country: 'Spain', highlight: 'Superblock model', targets: 'Indian residential colonies', features: ['9-block superblocks', '20 km/h interior streets', 'New plazas, playgrounds, green'], score: 87 },
  { city: 'Singapore', country: 'Singapore', highlight: 'Tropical linkways', targets: 'BKC Mumbai, Gurgaon CBD', features: ['Covered walkways connecting buildings', 'Underground CBD networks', 'Garden city canopy'], score: 91 },
  { city: 'Seoul', country: 'South Korea', highlight: 'Highway removal', targets: 'Delhi BRT corridor flyovers', features: ['Cheonggyecheon stream restoration', '5.8km linear park', '3.5°C local cooling'], score: 88 },
]

const indianStandards = [
  { code: 'IRC:SP:103', name: 'Pedestrian Facilities', year: '2012' }, { code: 'IRC:86', name: 'Geometric Design (Urban Roads)', year: '2018' },
  { code: 'IRC:93', name: 'Traffic Signal Design', year: '1985' }, { code: 'IRC:103', name: 'Cyclists & Pedestrians', year: '2012' },
  { code: 'NBC 2016', name: 'National Building Code', year: '2016' }, { code: 'Harmonised Guidelines', name: 'Accessibility for Disabled', year: '2021' },
  { code: 'URDPFI', name: 'Urban & Regional Dev. Plans', year: '2015' }, { code: 'Smart Cities Mission', name: 'Urban Design Guidelines', year: '2015' },
  { code: 'AMRUT', name: 'Urban Transformation', year: '2015' },
]

export default function BenchmarksPage() {
  return (
    <div className="space-y-6">
      <header><h1 className="font-display text-2xl font-bold text-white">Benchmark Cities</h1><p className="text-white/40 mt-1">International standards UrbanX compares Indian streets against</p></header>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {benchmarks.map((b) => (
          <div key={b.city} className="card-hover p-5 flex flex-col">
            <div className="flex items-start justify-between mb-3"><div><h3 className="font-display font-semibold text-white">{b.city}</h3><span className="text-xs text-white/30">{b.country}</span></div><div className="text-right"><div className="font-display text-2xl font-bold text-brand-400">{b.score}</div><div className="text-[10px] text-white/20 uppercase tracking-wider">Ped Score</div></div></div>
            <div className="text-sm text-accent-400 font-medium mb-2">{b.highlight}</div>
            <div className="text-xs text-white/30 mb-3 flex items-center gap-1"><MapPin className="w-3 h-3" />Targets: {b.targets}</div>
            <div className="mt-auto space-y-1.5">{b.features.map((f, i) => (<div key={i} className="flex items-start gap-2 text-xs text-white/50"><TrendingUp className="w-3 h-3 text-brand-400 mt-0.5 shrink-0" />{f}</div>))}</div>
          </div>
        ))}
      </div>
      <section className="mt-8">
        <div className="flex items-end justify-between mb-4"><div><h2 className="section-title">Indian Standards Referenced</h2><p className="section-subtitle">UrbanX validates all redesigns against these codes</p></div></div>
        <div className="card overflow-hidden"><table className="w-full text-sm"><thead className="bg-white/[0.03] border-b border-white/[0.06]"><tr><th className="text-left px-4 py-3 font-medium text-white/40">Code</th><th className="text-left px-4 py-3 font-medium text-white/40">Name</th><th className="text-right px-4 py-3 font-medium text-white/40">Year</th></tr></thead><tbody>{indianStandards.map((s) => (<tr key={s.code} className="border-b border-white/[0.03] hover:bg-white/[0.02]"><td className="px-4 py-3 font-mono text-xs text-brand-400">{s.code}</td><td className="px-4 py-3 text-white/60">{s.name}</td><td className="px-4 py-3 text-right text-white/30">{s.year}</td></tr>))}</tbody></table></div>
      </section>
      <section className="card p-6 bg-gradient-to-br from-brand-500/[0.05] to-brand-600/[0.02] border-brand-500/10">
        <div className="flex items-start gap-4"><div className="w-10 h-10 rounded-lg bg-brand-500/10 border border-brand-500/20 text-brand-400 flex items-center justify-center shrink-0"><Award className="w-5 h-5" /></div>
          <div><h3 className="font-display font-semibold text-white mb-1">Vision Zero Commitment</h3><p className="text-sm text-white/50 leading-relaxed">UrbanX targets zero pedestrian deaths — the same goal as Copenhagen, Amsterdam, and Tokyo. Reducing vehicle speed from 50 km/h to 30 km/h lowers pedestrian fatality risk from 85% to 5%. Every redesign generated by UrbanX is validated against IRC:SP:103 and international best practices.</p></div></div>
      </section>
    </div>
  )
}
