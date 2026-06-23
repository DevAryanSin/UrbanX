'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  Camera,
  CheckCircle2,
  FileUp,
  Loader2,
  MapPin,
  Sparkles,
  Upload,
  X,
  Zap,
} from 'lucide-react'
import Link from 'next/link'
import { cn } from '@/lib/utils'

export default function ExpressUploadPage() {
  const router = useRouter()
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [uploading, setUploading] = useState(false)
  const [uploaded, setUploaded] = useState(false)

  const handleFile = (f: File) => {
    setFile(f)
    const reader = new FileReader()
    reader.onload = (e) => setPreview(e.target?.result as string)
    reader.readAsDataURL(f)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    const f = e.dataTransfer.files[0]
    if (f && f.type.startsWith('image/')) handleFile(f)
  }

  const startGeneration = async () => {
    setUploading(true)
    await new Promise((r) => setTimeout(r, 1500))
    setUploaded(true)
    await new Promise((r) => setTimeout(r, 800))
    setUploading(false)
    router.push('/express/result')
  }

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <div className="flex items-center gap-2 text-xs text-white/30">
        <Link href="/" className="hover:text-brand-400">Home</Link>
        <span>/</span>
        <span className="text-brand-400 font-medium">Express Mode</span>
      </div>

      <header>
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-brand-500/10 border border-brand-500/20 flex items-center justify-center">
            <Zap className="w-5 h-5 text-brand-400" />
          </div>
          <div>
            <h1 className="font-display text-2xl font-bold text-white">Express Mode</h1>
            <p className="text-white/40 text-sm">Quick Redesign — Upload photo, get result</p>
          </div>
        </div>
      </header>

      {/* How it works */}
      <div className="card p-5 bg-brand-500/[0.03] border-brand-500/10">
        <div className="flex items-start gap-4">
          <div className="flex flex-col items-center gap-1">
            <div className="w-8 h-8 rounded-full bg-brand-500 text-white flex items-center justify-center text-xs font-bold">1</div>
            <div className="w-px h-6 bg-brand-500/30" />
            <div className="w-8 h-8 rounded-full bg-brand-500 text-white flex items-center justify-center text-xs font-bold">2</div>
            <div className="w-px h-6 bg-brand-500/30" />
            <div className="w-8 h-8 rounded-full bg-brand-500 text-white flex items-center justify-center text-xs font-bold">3</div>
          </div>
          <div className="space-y-6">
            <div>
              <div className="text-sm font-medium text-white">Upload any street photo</div>
              <div className="text-xs text-white/40">Phone photos work great — EXIF GPS auto-detected</div>
            </div>
            <div>
              <div className="text-sm font-medium text-white">Pre-trained model runs automatically</div>
              <div className="text-xs text-white/40">pix2pix generates pedestrian-friendly version</div>
            </div>
            <div>
              <div className="text-sm font-medium text-white">Export in multiple formats</div>
              <div className="text-xs text-white/40">GeoJSON, LandXML, PDF, PNG</div>
            </div>
          </div>
        </div>
      </div>

      {/* Upload area */}
      <div className="card p-6">
        {!preview ? (
          <label
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop}
            className="flex flex-col items-center justify-center w-full h-72 border-2 border-dashed border-white/[0.08] rounded-xl cursor-pointer hover:border-brand-500/50 hover:bg-brand-500/[0.03] transition-all group"
          >
            <div className="flex flex-col items-center text-center px-4">
              <div className="w-14 h-14 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-400 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <FileUp className="w-7 h-7" />
              </div>
              <span className="text-sm font-medium text-white/70 mb-1">
                Drop a street photo or click to browse
              </span>
              <span className="text-xs text-white/30">JPG, PNG up to 10MB · GPS EXIF auto-detected</span>
            </div>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
            />
          </label>
        ) : (
          <div className="relative rounded-xl overflow-hidden bg-ink-950 aspect-video">
            <img src={preview} alt="Preview" className="w-full h-full object-contain" />
            {!uploading && !uploaded && (
              <button
                onClick={() => { setFile(null); setPreview(null) }}
                className="absolute top-3 right-3 p-1.5 rounded-lg bg-black/60 hover:bg-black/80 text-white/80"
              >
                <X className="w-4 h-4" />
              </button>
            )}
            <div className="absolute bottom-3 left-3 inline-flex items-center gap-1.5 rounded-full bg-black/70 backdrop-blur px-2.5 py-1 text-xs text-white/80">
              <CheckCircle2 className="w-3 h-3 text-brand-400" />
              {file?.name}
            </div>
            {uploaded && (
              <div className="absolute top-3 left-3 inline-flex items-center gap-1.5 rounded-full bg-brand-500/90 px-3 py-1 text-xs text-white">
                <MapPin className="w-3 h-3" />
                GPS: 28.6139°N, 77.2090°E
              </div>
            )}
          </div>
        )}
      </div>

      {preview && !uploading && !uploaded && (
        <div className="flex items-center justify-between">
          <button onClick={() => { setFile(null); setPreview(null) }} className="btn-secondary">
            Choose different photo
          </button>
          <button onClick={startGeneration} className="btn-primary px-8">
            <Sparkles className="w-4 h-4" />
            Generate Redesign
          </button>
        </div>
      )}

      {uploading && (
        <div className="card p-8 text-center">
          <Loader2 className="w-10 h-10 text-brand-400 animate-spin mx-auto mb-4" />
          <h3 className="font-display text-lg font-semibold text-white mb-1">Processing Photo</h3>
          <p className="text-sm text-white/40">Running pre-trained pix2pix model...</p>
          <div className="mt-4 w-full bg-white/[0.06] rounded-full h-2 overflow-hidden">
            <div className="h-full bg-gradient-to-r from-brand-500 to-brand-400 rounded-full animate-pulse" style={{ width: '70%' }} />
          </div>
        </div>
      )}

      {uploaded && !uploading && (
        <div className="card p-8 text-center">
          <div className="w-10 h-10 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <h3 className="font-display text-lg font-semibold text-white mb-1">Photo Processed!</h3>
          <p className="text-sm text-white/40">Redirecting to results...</p>
        </div>
      )}
    </div>
  )
}
