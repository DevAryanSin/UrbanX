import { LucideIcon } from 'lucide-react'

export function StatCard({
  icon: Icon,
  label,
  value,
  hint,
}: {
  icon: LucideIcon
  label: string
  value: string
  hint: string
}) {
  return (
    <div className="card-hover p-5">
      <div className="flex items-center gap-2.5 mb-3">
        <div className="w-9 h-9 rounded-lg bg-brand-500/10 border border-brand-500/20 text-brand-400 flex items-center justify-center">
          <Icon className="w-4 h-4" />
        </div>
        <span className="text-sm font-medium text-white/60">{label}</span>
      </div>
      <div className="font-display text-2xl font-bold text-white mb-0.5">{value}</div>
      <p className="text-xs text-white/30">{hint}</p>
    </div>
  )
}
