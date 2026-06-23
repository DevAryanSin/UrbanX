'use client'

import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowRight, Bot, CheckCircle2, Download, Eye, MapPin, MessageSquare, Send, Sparkles, User, Wrench, X, Zap } from 'lucide-react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { useAppStore } from '@/lib/store'
import type { ChatMessage } from '@/lib/store'

const agentResponses: Record<string, { text: string; toolCalls: Array<{ tool: string; params: string; status: 'running' | 'done' }> }> = {
  'add crossing': { text: "I've added a raised zebra crossing with refuge island 30m from the school gate. The pedestrian interference score improved from 87 to 62. Would you like me to also add a traffic light?", toolCalls: [{ tool: 'add_crossing', params: 'location=school_gate, type=zebra, raised=true, refuge_island=true', status: 'done' }, { tool: 'rerun_simulation', params: '', status: 'done' }] },
  'add trees': { text: "Done. Planted 12 Neem trees (every 8m) along the hospital road. Updated interference score: 62 → 41. The design now has 3 new zebra crossings, 2 traffic lights, 12 street trees, and 1.5m sidewalk on both sides.", toolCalls: [{ tool: 'add_feature', params: 'type=street_trees, species=Neem, spacing=8m, location=hospital_road', status: 'done' }, { tool: 'rerun_simulation', params: '', status: 'done' }] },
  'widen sidewalk': { text: "I've widened the sidewalk to 3.0m near the market area. Interference score: 41 → 35. Estimated additional cost: ₹1,20,000.", toolCalls: [{ tool: 'widen_sidewalk', params: 'width_m=3.0, location=market_area', status: 'done' }, { tool: 'rerun_simulation', params: '', status: 'done' }] },
  'remove bike lane': { text: "I've removed the bike lane from the main road segment. Space reallocated to wider sidewalk (3.0m). Score: 35 → 38. Consider adding a protected bike lane on the parallel street instead.", toolCalls: [{ tool: 'remove_feature', params: 'type=bike_lane, location=main_road', status: 'done' }, { tool: 'rerun_simulation', params: '', status: 'done' }] },
  'default': { text: "I've analyzed your request and updated the design accordingly. The interference score has been recalculated.", toolCalls: [{ tool: 'rerun_simulation', params: '', status: 'done' }] },
}

function getAgentResponse(message: string) {
  const l = message.toLowerCase()
  if (l.includes('crossing') || l.includes('zebra')) return agentResponses['add crossing']
  if (l.includes('tree') || l.includes('green')) return agentResponses['add trees']
  if (l.includes('sidewalk') || l.includes('wider') || l.includes('widen')) return agentResponses['widen sidewalk']
  if (l.includes('remove') && l.includes('bike')) return agentResponses['remove bike lane']
  return agentResponses['default']
}

export default function DetailedReviewPage() {
  const router = useRouter()
  const { reviewMessages, addReviewMessage, setDetailedStep } = useAppStore()
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const chatEndRef = useRef<HTMLDivElement>(null)
  useEffect(() => { chatEndRef.current?.scrollIntoView({ behavior: 'smooth' }) }, [reviewMessages])

  const sendMessage = async () => {
    if (!input.trim() || isTyping) return
    addReviewMessage({ id: crypto.randomUUID(), role: 'user', text: input, timestamp: new Date().toISOString() })
    setInput(''); setIsTyping(true)
    await new Promise((r) => setTimeout(r, 1500))
    const response = getAgentResponse(input)
    addReviewMessage({ id: crypto.randomUUID(), role: 'agent', text: response.text, toolCalls: response.toolCalls, timestamp: new Date().toISOString() })
    setIsTyping(false)
  }

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="flex items-center gap-2 text-xs text-white/30">
        <Link href="/" className="hover:text-brand-400">Home</Link><span>/</span>
        <Link href="/detailed/input" className="hover:text-brand-400">Detailed Mode</Link><span>/</span>
        <span className="text-accent-400 font-medium">Review</span>
      </div>
      <header>
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-accent-500/10 border border-accent-500/20 flex items-center justify-center"><Eye className="w-5 h-5 text-accent-400" /></div>
          <div><h1 className="font-display text-2xl font-bold text-white">Review & Iterate</h1><p className="text-white/40 text-sm">Step 6 of 6 — Human-in-the-loop with LLM agent</p></div>
        </div>
      </header>

      <div className="grid lg:grid-cols-[1fr_400px] gap-6">
        <div className="space-y-4">
          <div className="card p-5">
            <h3 className="font-display font-semibold text-white mb-4">Design Scores</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[{ l: 'Safety Score', v: '62/100', c: 'text-accent-400' }, { l: 'Constraint Compliance', v: '85/100', c: 'text-brand-400' }, { l: 'Interference', v: '41/100', c: 'text-warning' }, { l: 'Overall Grade', v: 'B', c: 'text-brand-400' }].map((s) => (
                <div key={s.l} className="text-center p-3 rounded-lg bg-white/[0.03] border border-white/[0.06]">
                  <div className="text-xs text-white/30 mb-1">{s.l}</div>
                  <div className={cn('font-display text-2xl font-bold', s.c)}>{s.v}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="card p-5">
            <h3 className="font-display font-semibold text-white mb-3 flex items-center gap-2"><MapPin className="w-4 h-4 text-accent-400" />Proposed Changes Map</h3>
            <div className="rounded-xl bg-ink-950 border border-white/[0.06] h-64 relative overflow-hidden">
              <svg className="absolute inset-0 w-full h-full opacity-20"><defs><pattern id="reviewGrid" width="30" height="30" patternUnits="userSpaceOnUse"><path d="M 30 0 L 0 0 0 30" fill="none" stroke="#fff" strokeWidth="0.3" /></pattern></defs><rect width="100%" height="100%" fill="url(#reviewGrid)" /></svg>
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 250">
                <line x1="20" y1="125" x2="380" y2="125" stroke="#363d49" strokeWidth="20" />
                <rect x="80" y="110" width="30" height="30" fill="none" stroke="#22c55e" strokeWidth="2" strokeDasharray="4 2" rx="3" />
                <rect x="190" y="110" width="30" height="30" fill="none" stroke="#22c55e" strokeWidth="2" strokeDasharray="4 2" rx="3" />
                <rect x="300" y="110" width="30" height="30" fill="none" stroke="#22c55e" strokeWidth="2" strokeDasharray="4 2" rx="3" />
                <circle cx="100" cy="95" r="5" fill="#f59e0b" /><circle cx="210" cy="95" r="5" fill="#f59e0b" />
                {[40, 120, 250, 340].map((x, i) => <g key={i}><circle cx={x} cy="80" r="6" fill="#16a34a" opacity="0.7" /><circle cx={x} cy="170" r="6" fill="#16a34a" opacity="0.7" /></g>)}
                <line x1="20" y1="100" x2="380" y2="100" stroke="#22c55e" strokeWidth="1" strokeDasharray="4 2" opacity="0.5" />
                <line x1="20" y1="150" x2="380" y2="150" stroke="#22c55e" strokeWidth="1" strokeDasharray="4 2" opacity="0.5" />
              </svg>
              <div className="absolute bottom-3 left-3 flex items-center gap-3 text-xs bg-black/60 backdrop-blur rounded-lg px-3 py-2 text-white/70">
                <div className="flex items-center gap-1"><div className="w-3 h-3 rounded border border-brand-400 border-dashed" />Crossing</div>
                <div className="flex items-center gap-1"><div className="w-2.5 h-2.5 rounded-full bg-warning" />Signal</div>
                <div className="flex items-center gap-1"><div className="w-2.5 h-2.5 rounded-full bg-success" />Tree</div>
              </div>
            </div>
          </div>

          <div className="card p-5">
            <h3 className="font-display font-semibold text-white mb-3">Before / After</h3>
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-lg bg-white/[0.03] border border-white/[0.06] h-32 flex items-center justify-center">
                <div className="text-center"><div className="w-16 h-16 mx-auto rounded-lg bg-white/[0.04] flex items-center justify-center mb-2"><X className="w-8 h-8 text-white/20" /></div><span className="text-xs text-white/30">Original</span></div>
              </div>
              <div className="rounded-lg bg-brand-500/[0.05] border border-brand-500/10 h-32 flex items-center justify-center">
                <div className="text-center"><div className="w-16 h-16 mx-auto rounded-lg bg-brand-500/10 flex items-center justify-center mb-2"><Sparkles className="w-8 h-8 text-brand-400" /></div><span className="text-xs text-brand-400">Redesigned</span></div>
              </div>
            </div>
          </div>
        </div>

        <div className="card flex flex-col h-[700px]">
          <div className="px-4 py-3 border-b border-white/[0.06] flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-accent-500 to-accent-600 flex items-center justify-center"><Bot className="w-4 h-4 text-white" /></div>
            <div><div className="text-sm font-medium text-white">Redesign Agent</div><div className="text-xs text-white/30">LLM-powered · 7 tools available</div></div>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {reviewMessages.length === 0 && (
              <div className="text-center py-8">
                <div className="w-12 h-12 rounded-full bg-accent-500/10 border border-accent-500/20 text-accent-400 flex items-center justify-center mx-auto mb-3"><MessageSquare className="w-6 h-6" /></div>
                <h3 className="font-display font-semibold text-white mb-1">Request Changes</h3>
                <p className="text-xs text-white/30 max-w-xs mx-auto">Type your request below. The agent can add crossings, remove features, widen sidewalks, and more.</p>
                <div className="mt-4 space-y-2">
                  {['"Add a crossing near the school"', '"Remove the bike lane on the main road"', '"Add more trees near the hospital"', '"Make the sidewalk wider near the market"'].map((s) => (
                    <button key={s} onClick={() => setInput(s.replace(/"/g, ''))} className="block w-full text-left px-3 py-2 rounded-lg bg-white/[0.03] hover:bg-accent-500/10 text-xs text-white/50 hover:text-accent-400 transition-colors border border-white/[0.04] hover:border-accent-500/20">{s}</button>
                  ))}
                </div>
              </div>
            )}
            {reviewMessages.map((msg) => (
              <div key={msg.id} className={cn('flex gap-2', msg.role === 'user' ? 'flex-row-reverse' : 'flex-row')}>
                <div className={cn('w-7 h-7 rounded-lg flex items-center justify-center shrink-0', msg.role === 'user' ? 'bg-brand-500/20 text-brand-400' : 'bg-accent-500/10 text-accent-400')}>
                  {msg.role === 'user' ? <User className="w-3.5 h-3.5" /> : <Bot className="w-3.5 h-3.5" />}
                </div>
                <div className={cn('max-w-[85%] rounded-xl px-3 py-2 text-sm', msg.role === 'user' ? 'bg-brand-600 text-white' : 'bg-white/[0.06] text-white/80 border border-white/[0.06]')}>
                  <p>{msg.text}</p>
                  {msg.toolCalls && msg.toolCalls.length > 0 && (
                    <div className="mt-2 space-y-1">
                      {msg.toolCalls.map((tc, i) => (
                        <div key={i} className="flex items-center gap-1.5 text-xs">
                          <Wrench className="w-3 h-3 text-accent-400" />
                          <code className="bg-white/[0.06] px-1.5 py-0.5 rounded text-[10px] text-white/60">{tc.tool}</code>
                          <span className="text-white/20">({tc.params})</span>
                          {tc.status === 'done' && <CheckCircle2 className="w-3 h-3 text-green-400" />}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex gap-2">
                <div className="w-7 h-7 rounded-lg bg-accent-500/10 text-accent-400 flex items-center justify-center"><Bot className="w-3.5 h-3.5" /></div>
                <div className="bg-white/[0.06] rounded-xl px-3 py-2"><div className="flex gap-1"><div className="w-2 h-2 rounded-full bg-white/20 animate-bounce" style={{ animationDelay: '0ms' }} /><div className="w-2 h-2 rounded-full bg-white/20 animate-bounce" style={{ animationDelay: '150ms' }} /><div className="w-2 h-2 rounded-full bg-white/20 animate-bounce" style={{ animationDelay: '300ms' }} /></div></div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>
          <div className="p-3 border-t border-white/[0.06]">
            <div className="flex gap-2">
              <input type="text" value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && sendMessage()} placeholder="Request changes..." className="flex-1 rounded-lg border border-white/[0.08] bg-surface-200 px-3 py-2 text-sm text-white placeholder:text-white/20 focus:border-accent-500 focus:outline-none focus:ring-2 focus:ring-accent-500/20" disabled={isTyping} />
              <button onClick={sendMessage} disabled={!input.trim() || isTyping} className="w-10 h-10 rounded-lg bg-accent-600 hover:bg-accent-500 disabled:bg-white/[0.06] text-white flex items-center justify-center transition-colors"><Send className="w-4 h-4" /></button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <Link href="/detailed/generation" className="btn-secondary">Back</Link>
        <button onClick={() => { setDetailedStep('export'); router.push('/detailed/export') }} className="btn-primary bg-accent-600 hover:bg-accent-500 px-8">Looks Good — Export <Download className="w-4 h-4" /></button>
      </div>
    </div>
  )
}
