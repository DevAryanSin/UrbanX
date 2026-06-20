'use client'

import { useEffect, useState } from 'react'

export function AnimatedCounter({
  target,
  suffix = '',
  duration = 2000,
}: {
  target: number
  suffix?: string
  duration?: number
}) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    let start = 0
    const startTime = Date.now()
    const tick = () => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      start = Math.floor(eased * target)
      setCount(start)
      if (progress < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [target, duration])

  return (
    <span>
      {count.toLocaleString('en-IN')}
      {suffix}
    </span>
  )
}
