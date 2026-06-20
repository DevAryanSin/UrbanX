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
        <div className="w-9 h-9 rounded-lg bg-brand-50 text-brand-600 flex items-center justify-center">
          <Icon className="w-4.5 h-4.5" />
        </div>
        <span className="text-sm font-medium text-ink-600">{label}</span>
      </div>
      <div className="font-display text-2xl font-bold text-ink-900 mb-0.5">{value}</div>
      <p className="text-xs text-ink-400">{hint}</p>
    </div>
  )
}
