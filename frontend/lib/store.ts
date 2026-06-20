import { create } from 'zustand'

export type AnalysisStatus = 'idle' | 'uploading' | 'processing' | 'complete' | 'error'

export interface AnalysisResult {
  id: string
  createdAt: string
  location: {
    address: string
    lat: number
    lng: number
  }
  scores: {
    walkability: number
    safety: number
    accessibility: number
    monsoon: number
    green: number
    infrastructure: number
    overall: number
  }
  audits: {
    sidewalkCoverage: number
    crossingSpacing: number
    speedRisk: number
    drainageCoverage: number
    canopyCoverage: number
    curbRampCoverage: number
  }
  recommendations: Array<{
    id: string
    severity: 'critical' | 'high' | 'medium' | 'low'
    title: string
    description: string
    location: string
    estimatedCost: number
  }>
  beforeImageUrl?: string
  afterImageUrl?: string
}

interface AppState {
  status: AnalysisStatus
  progress: number
  currentStep: string
  result: AnalysisResult | null
  error: string | null
  history: AnalysisResult[]

  setStatus: (status: AnalysisStatus) => void
  setProgress: (progress: number, step?: string) => void
  setResult: (result: AnalysisResult) => void
  setError: (error: string) => void
  reset: () => void
}

export const useAppStore = create<AppState>((set) => ({
  status: 'idle',
  progress: 0,
  currentStep: '',
  result: null,
  error: null,
  history: [],

  setStatus: (status) => set({ status }),
  setProgress: (progress, step) => set({ progress, currentStep: step ?? '' }),
  setResult: (result) =>
    set((state) => ({
      status: 'complete',
      result,
      history: [result, ...state.history].slice(0, 10),
    })),
  setError: (error) => set({ status: 'error', error }),
  reset: () => set({ status: 'idle', progress: 0, currentStep: '', result: null, error: null }),
}))
