'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  Activity,
  BarChart3,
  Home,
  Menu,
  Settings,
  X,
  Zap,
  Layers,
} from 'lucide-react'
import { useState } from 'react'
import { cn } from '@/lib/utils'

const nav = [
  { href: '/dashboard', label: 'Dashboard', icon: Home },
  { href: '/express/upload', label: 'Express Mode', icon: Zap },
  { href: '/detailed/input', label: 'Detailed Mode', icon: Layers },
  { href: '/benchmarks', label: 'Benchmarks', icon: BarChart3 },
]

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)

  const isLanding = pathname === '/'

  if (isLanding) {
    return <div className="min-h-screen bg-ink-950">{children}</div>
  }

  return (
    <div className="min-h-screen bg-ink-950">
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex fixed inset-y-0 left-0 w-64 flex-col bg-ink-950 border-r border-white/[0.04] z-30">
        <Brand />
        <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
          {nav.map((item) => (
            <NavLink key={item.href} item={item} active={pathname === item.href} />
          ))}
        </nav>
        <div className="p-3 border-t border-white/[0.04]">
          <NavLink
            item={{ href: '/settings', label: 'Settings', icon: Settings }}
            active={pathname === '/settings'}
          />
        </div>
      </aside>

      {/* Mobile header */}
      <header className="lg:hidden sticky top-0 z-40 bg-ink-950/95 backdrop-blur-xl border-b border-white/[0.04]">
        <div className="flex items-center justify-between px-4 h-14">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center">
              <Activity className="w-4 h-4 text-white" />
            </div>
            <span className="font-display font-bold text-lg text-white">UrbanX</span>
          </div>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="p-2 rounded-lg hover:bg-white/[0.06] text-white/60"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
        {mobileOpen && (
          <nav className="px-3 pb-3 space-y-0.5 border-t border-white/[0.04] pt-2 animate-fade-in">
            {nav.map((item) => (
              <NavLink
                key={item.href}
                item={item}
                active={pathname === item.href}
                onClick={() => setMobileOpen(false)}
              />
            ))}
          </nav>
        )}
      </header>

      {/* Main content */}
      <main className="lg:pl-64 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8 animate-fade-in">
          {children}
        </div>
      </main>
    </div>
  )
}

function Brand() {
  return (
    <div className="px-4 py-5 border-b border-white/[0.04] flex items-center gap-2.5">
      <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center shadow-glow-green">
        <Activity className="w-5 h-5 text-white" />
      </div>
      <div>
        <div className="font-display font-bold text-lg text-white leading-none">UrbanX</div>
        <div className="text-[10px] text-white/30 uppercase tracking-wider mt-0.5">Pedestrian Redesign</div>
      </div>
    </div>
  )
}

function NavLink({
  item,
  active,
  onClick,
}: {
  item: { href: string; label: string; icon: React.ElementType }
  active: boolean
  onClick?: () => void
}) {
  return (
    <Link
      href={item.href}
      onClick={onClick}
      className={cn(
        'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all',
        active
          ? 'bg-brand-500/10 text-brand-400 border border-brand-500/20 shadow-glow-green'
          : 'text-white/50 hover:bg-white/[0.04] hover:text-white/80 border border-transparent'
      )}
    >
      <item.icon className={cn('w-4 h-4', active ? 'text-brand-400' : 'text-white/30')} />
      {item.label}
    </Link>
  )
}
