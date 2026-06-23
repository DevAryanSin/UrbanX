import Link from 'next/link'
import { ArrowRight, FileText, MapPin, Upload } from 'lucide-react'

export function QuickActions() {
  return (
    <section>
      <h2 className="section-title mb-4">Quick Actions</h2>
      <div className="grid sm:grid-cols-3 gap-4">
        <Link href="/analysis" className="card-hover p-5 group">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-lg bg-brand-500/10 border border-brand-500/20 text-brand-400 flex items-center justify-center">
              <Upload className="w-5 h-5" />
            </div>
            <ArrowRight className="w-4 h-4 text-white/20 group-hover:text-brand-400 group-hover:translate-x-0.5 transition-all" />
          </div>
          <h3 className="font-display font-semibold text-white mb-1">Upload Photo</h3>
          <p className="text-sm text-white/40">Analyze a street-level image</p>
        </Link>
        <Link href="/map" className="card-hover p-5 group">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-lg bg-accent-500/10 border border-accent-500/20 text-accent-400 flex items-center justify-center">
              <MapPin className="w-5 h-5" />
            </div>
            <ArrowRight className="w-4 h-4 text-white/20 group-hover:text-accent-400 group-hover:translate-x-0.5 transition-all" />
          </div>
          <h3 className="font-display font-semibold text-white mb-1">Pick on Map</h3>
          <p className="text-sm text-white/40">Drop a pin or draw boundary</p>
        </Link>
        <Link href="/report" className="card-hover p-5 group">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-lg bg-purple-500/10 border border-purple-500/20 text-purple-400 flex items-center justify-center">
              <FileText className="w-5 h-5" />
            </div>
            <ArrowRight className="w-4 h-4 text-white/20 group-hover:text-purple-400 group-hover:translate-x-0.5 transition-all" />
          </div>
          <h3 className="font-display font-semibold text-white mb-1">View Reports</h3>
          <p className="text-sm text-white/40">Browse analysis history</p>
        </Link>
      </div>
    </section>
  )
}
