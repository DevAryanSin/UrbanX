import Link from 'next/link'
import { ArrowRight, FileText, MapPin, Upload } from 'lucide-react'

export function QuickActions() {
  return (
    <section>
      <h2 className="section-title mb-4">Quick Actions</h2>
      <div className="grid sm:grid-cols-3 gap-4">
        <Link href="/analysis" className="card-hover p-5 group">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-lg bg-brand-50 text-brand-600 flex items-center justify-center">
              <Upload className="w-5 h-5" />
            </div>
            <ArrowRight className="w-4 h-4 text-ink-300 group-hover:text-brand-500 group-hover:translate-x-0.5 transition-all" />
          </div>
          <h3 className="font-display font-semibold text-ink-900 mb-1">Upload Photo</h3>
          <p className="text-sm text-ink-500">Analyze a street-level image</p>
        </Link>
        <Link href="/map" className="card-hover p-5 group">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-lg bg-accent-100 text-accent-600 flex items-center justify-center">
              <MapPin className="w-5 h-5" />
            </div>
            <ArrowRight className="w-4 h-4 text-ink-300 group-hover:text-brand-500 group-hover:translate-x-0.5 transition-all" />
          </div>
          <h3 className="font-display font-semibold text-ink-900 mb-1">Pick on Map</h3>
          <p className="text-sm text-ink-500">Drop a pin or draw boundary</p>
        </Link>
        <Link href="/report" className="card-hover p-5 group">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-lg bg-purple-100 text-purple-600 flex items-center justify-center">
              <FileText className="w-5 h-5" />
            </div>
            <ArrowRight className="w-4 h-4 text-ink-300 group-hover:text-brand-500 group-hover:translate-x-0.5 transition-all" />
          </div>
          <h3 className="font-display font-semibold text-ink-900 mb-1">View Reports</h3>
          <p className="text-sm text-ink-500">Browse analysis history</p>
        </Link>
      </div>
    </section>
  )
}
