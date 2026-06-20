import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPercent(n: number, digits = 1) {
  return `${n.toFixed(digits)}%`
}

export function formatNumber(n: number) {
  return new Intl.NumberFormat('en-IN').format(n)
}

export function formatCurrency(n: number) {
  if (n >= 1_00_00_000) return `₹${(n / 1_00_00_000).toFixed(2)} Cr`
  if (n >= 1_00_000) return `₹${(n / 1_00_000).toFixed(2)} L`
  return `₹${formatNumber(n)}`
}

export function scoreColor(score: number) {
  if (score >= 80) return 'text-success'
  if (score >= 60) return 'text-brand-600'
  if (score >= 40) return 'text-warning'
  return 'text-critical'
}

export function scoreRingColor(score: number) {
  if (score >= 80) return 'stroke-success'
  if (score >= 60) return 'stroke-brand-500'
  if (score >= 40) return 'stroke-warning'
  return 'stroke-critical'
}

export function severityColor(severity: 'critical' | 'high' | 'medium' | 'low') {
  switch (severity) {
    case 'critical': return 'border-l-critical bg-red-50'
    case 'high': return 'border-l-accent-500 bg-orange-50'
    case 'medium': return 'border-l-warning bg-yellow-50'
    case 'low': return 'border-l-info bg-blue-50'
  }
}

export function severityBadge(severity: string) {
  switch (severity) {
    case 'critical': return 'badge-critical'
    case 'high': return 'badge-high'
    case 'medium': return 'badge-medium'
    case 'low': return 'badge-low'
    default: return 'badge'
  }
}
