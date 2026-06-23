'use client'

import { cn } from '@/lib/utils'

export function ScoreRing({
  score,
  size = 120,
  strokeWidth = 8,
}: {
  score: number
  size?: number
  strokeWidth?: number
}) {
  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (score / 100) * circumference

  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="rgba(255,255,255,0.06)"
          strokeWidth={strokeWidth}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className={cn('transition-all duration-1000', scoreRingColor(score))}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="font-display text-3xl font-bold text-white">{score}</span>
        <span className="text-[10px] text-white/30 uppercase tracking-wider">/ 100</span>
      </div>
    </div>
  )
}

function scoreRingColor(score: number) {
  if (score >= 80) return 'stroke-success'
  if (score >= 60) return 'stroke-brand-500'
  if (score >= 40) return 'stroke-warning'
  return 'stroke-critical'
}
