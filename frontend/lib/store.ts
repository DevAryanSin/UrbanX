import { create } from 'zustand'

export type AnalysisStatus = 'idle' | 'uploading' | 'processing' | 'complete' | 'error'
export type DetailedStep = 'input' | 'analysis' | 'suggestions' | 'features' | 'generation' | 'review' | 'export'

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

export interface GridCell {
  id: string
  row: number
  col: number
  status: 'pending' | 'analyzing' | 'complete'
  interferenceScore: number
  illegalCrossers: number
  pedsOnRoad: number
  hardBraking: number
  speedViolations: number
  hasSchool: boolean
  hasHospital: boolean
}

export interface Suggestion {
  id: string
  type: 'zebra_crossing' | 'traffic_light' | 'speed_calming' | 'school_zone' | 'sidewalk'
  priority: 'CRITICAL' | 'HIGH' | 'MEDIUM'
  message: string
  location: string
  evidenceCount: number
}

export interface FeatureSelections {
  crossings: {
    zebra_crossing: boolean
    traffic_light: boolean
    human_crosswalk_light: boolean
    speed_table: boolean
  }
  road_markings: {
    japanese_style_markings: boolean
    crosswalk_marking: boolean
    stop_line: boolean
    directional_arrows: boolean
  }
  infrastructure: {
    sidewalks: boolean
    bike_lanes: boolean
    green_space: boolean
    street_trees: boolean
    bollards: boolean
    pedestrian_lighting: boolean
  }
  traffic_calming: {
    speed_humps: boolean
    chicanes: boolean
    narrow_lanes: boolean
    raised_crossings: boolean
  }
  drainage: {
    covered_drains: boolean
    rain_gardens: boolean
  }
}

export interface ChatMessage {
  id: string
  role: 'user' | 'agent'
  text: string
  toolCalls?: Array<{ tool: string; params: string; status: 'running' | 'done' }>
  timestamp: string
}

export interface ExportData {
  area: string
  roadWidth: number
  laneWidth: number
  laneCount: number
  sidewalkWidth: number
  bikeLaneWidth: number
  treeSpacing: number
  treeCount: number
  totalRedesignWidth: number
  beforeDeaths: number
  afterDeaths: number
  beforeNearMisses: number
  afterNearMisses: number
  beforeWaitTime: number
  afterWaitTime: number
  vehicleDelay: number
  totalCost: number
  compliance: string[]
}

interface AppState {
  // Express mode
  status: AnalysisStatus
  progress: number
  currentStep: string
  result: AnalysisResult | null
  error: string | null
  history: AnalysisResult[]

  // Detailed mode
  detailedStep: DetailedStep
  gridCells: GridCell[]
  analysisProgress: number
  analysisCurrentCell: number
  suggestions: Suggestion[]
  featureSelections: FeatureSelections
  generationProgress: number
  generationComplete: boolean
  reviewMessages: ChatMessage[]
  exportData: ExportData | null

  // Actions
  setStatus: (status: AnalysisStatus) => void
  setProgress: (progress: number, step?: string) => void
  setResult: (result: AnalysisResult) => void
  setError: (error: string) => void
  reset: () => void

  // Detailed mode actions
  setDetailedStep: (step: DetailedStep) => void
  setGridCells: (cells: GridCell[]) => void
  updateGridCell: (id: string, updates: Partial<GridCell>) => void
  setAnalysisProgress: (progress: number, currentCell: number) => void
  setSuggestions: (suggestions: Suggestion[]) => void
  setFeatureSelections: (selections: FeatureSelections) => void
  updateFeatureSelection: (group: keyof FeatureSelections, key: string, value: boolean) => void
  setGenerationProgress: (progress: number) => void
  setGenerationComplete: (complete: boolean) => void
  addReviewMessage: (message: ChatMessage) => void
  setExportData: (data: ExportData) => void
  resetDetailed: () => void
}

const defaultFeatures: FeatureSelections = {
  crossings: {
    zebra_crossing: true,
    traffic_light: true,
    human_crosswalk_light: true,
    speed_table: true,
  },
  road_markings: {
    japanese_style_markings: false,
    crosswalk_marking: true,
    stop_line: true,
    directional_arrows: false,
  },
  infrastructure: {
    sidewalks: true,
    bike_lanes: true,
    green_space: false,
    street_trees: false,
    bollards: true,
    pedestrian_lighting: true,
  },
  traffic_calming: {
    speed_humps: false,
    chicanes: false,
    narrow_lanes: true,
    raised_crossings: true,
  },
  drainage: {
    covered_drains: true,
    rain_gardens: false,
  },
}

function generateGridCells(rows = 8, cols = 10): GridCell[] {
  const cells: GridCell[] = []
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      cells.push({
        id: `cell-${r}-${c}`,
        row: r,
        col: c,
        status: 'pending',
        interferenceScore: 0,
        illegalCrossers: 0,
        pedsOnRoad: 0,
        hardBraking: 0,
        speedViolations: 0,
        hasSchool: false,
        hasHospital: false,
      })
    }
  }
  return cells
}

export const useAppStore = create<AppState>((set) => ({
  // Express mode
  status: 'idle',
  progress: 0,
  currentStep: '',
  result: null,
  error: null,
  history: [],

  // Detailed mode
  detailedStep: 'input',
  gridCells: generateGridCells(),
  analysisProgress: 0,
  analysisCurrentCell: 0,
  suggestions: [],
  featureSelections: { ...defaultFeatures },
  generationProgress: 0,
  generationComplete: false,
  reviewMessages: [],
  exportData: null,

  // Express actions
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

  // Detailed actions
  setDetailedStep: (step) => set({ detailedStep: step }),
  setGridCells: (cells) => set({ gridCells: cells }),
  updateGridCell: (id, updates) =>
    set((state) => ({
      gridCells: state.gridCells.map((c) => (c.id === id ? { ...c, ...updates } : c)),
    })),
  setAnalysisProgress: (progress, currentCell) =>
    set({ analysisProgress: progress, analysisCurrentCell: currentCell }),
  setSuggestions: (suggestions) => set({ suggestions }),
  setFeatureSelections: (selections) => set({ featureSelections: selections }),
  updateFeatureSelection: (group, key, value) =>
    set((state) => ({
      featureSelections: {
        ...state.featureSelections,
        [group]: {
          ...(state.featureSelections[group] as Record<string, boolean>),
          [key]: value,
        },
      },
    })),
  setGenerationProgress: (progress) => set({ generationProgress: progress }),
  setGenerationComplete: (complete) => set({ generationComplete: complete }),
  addReviewMessage: (message) =>
    set((state) => ({ reviewMessages: [...state.reviewMessages, message] })),
  setExportData: (data) => set({ exportData: data }),
  resetDetailed: () =>
    set({
      detailedStep: 'input',
      gridCells: generateGridCells(),
      analysisProgress: 0,
      analysisCurrentCell: 0,
      suggestions: [],
      featureSelections: { ...defaultFeatures },
      generationProgress: 0,
      generationComplete: false,
      reviewMessages: [],
      exportData: null,
    }),
}))
