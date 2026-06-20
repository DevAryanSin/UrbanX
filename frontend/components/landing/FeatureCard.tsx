import { LucideIcon } from 'lucide-react'

export function FeatureCard({
  icon: Icon,
  title,
  description,
  step,
}: {
  icon: LucideIcon
  title: string
  description: string
  step: string
}) {
  return (
    <div className="group relative rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-6 hover:bg-white/10 hover:border-brand-500/40 transition-all duration-500 hover:-translate-y-1">
      <span className="absolute top-4 right-5 text-[10px] font-mono text-brand-400/40 uppercase tracking-widest">
        {step}
      </span>
      <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-brand-500/20 to-brand-600/10 border border-brand-500/20 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:border-brand-400/40 transition-all duration-500">
        <Icon className="w-5 h-5 text-brand-400" />
      </div>
      <h3 className="font-display text-lg font-semibold text-white mb-2">{title}</h3>
      <p className="text-sm text-ink-400 leading-relaxed">{description}</p>
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
        <div className="absolute -inset-px rounded-2xl bg-gradient-to-br from-brand-500/10 via-transparent to-accent-500/10" />
      </div>
    </div>
  )
}
