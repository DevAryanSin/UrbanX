'use client'

/**
 * Animated SVG map background — stylized Indian city grid with
 * flowing data particles, crossing markers, and a pulsing "analysis zone".
 * Pure SVG + CSS animations, zero JS runtime cost after mount.
 */
export function MapBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <radialGradient id="glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#27b06c" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#27b06c" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="road" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#3b424f" stopOpacity="0.3" />
            <stop offset="50%" stopColor="#4cc587" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#3b424f" stopOpacity="0.3" />
          </linearGradient>
        </defs>

        <ellipse cx="720" cy="450" rx="500" ry="350" fill="url(#glow)">
          <animate attributeName="rx" values="500;540;500" dur="8s" repeatCount="indefinite" />
          <animate attributeName="ry" values="350;380;350" dur="8s" repeatCount="indefinite" />
        </ellipse>

        {/* Grid lines */}
        <g stroke="#4cc587" strokeWidth="0.5" strokeOpacity="0.15">
          {Array.from({ length: 18 }).map((_, i) => (
            <line key={`v${i}`} x1={80 + i * 80} y1={0} x2={80 + i * 80} y2={900}>
              <animate attributeName="strokeOpacity" values="0.08;0.2;0.08" dur={`${4 + (i % 5)}s`} begin={`${i * 0.2}s`} repeatCount="indefinite" />
            </line>
          ))}
          {Array.from({ length: 12 }).map((_, i) => (
            <line key={`h${i}`} x1={0} y1={75 + i * 75} x2={1440} y2={75 + i * 75}>
              <animate attributeName="strokeOpacity" values="0.08;0.2;0.08" dur={`${4 + (i % 4)}s`} begin={`${i * 0.15}s`} repeatCount="indefinite" />
            </line>
          ))}
        </g>

        {/* Arterial roads */}
        <g stroke="url(#road)" strokeWidth="3" fill="none" strokeLinecap="round">
          <path d="M0,650 Q360,450 720,400 T1440,200">
            <animate attributeName="stroke-dasharray" values="0,3000;3000,0" dur="6s" fill="freeze" />
          </path>
          <path d="M200,900 Q500,500 720,400 T1240,100">
            <animate attributeName="stroke-dasharray" values="0,3000;3000,0" dur="7s" begin="1s" fill="freeze" />
          </path>
          <ellipse cx="720" cy="450" rx="420" ry="280" strokeWidth="2" strokeDasharray="8 6">
            <animateTransform attributeName="transform" type="rotate" from="0 720 450" to="360 720 450" dur="120s" repeatCount="indefinite" />
          </ellipse>
        </g>

        {/* Building blocks */}
        <g fill="#1a1d24" fillOpacity="0.4">
          {[
            [160,160],[280,200],[400,140],[520,180],[640,120],[820,160],[940,200],[1060,140],[1180,180],[1300,160],
            [200,340],[340,380],[480,320],[620,360],[760,300],[900,340],[1040,380],[1180,320],[1320,360],
            [180,520],[320,560],[460,500],[600,540],[740,480],[880,520],[1020,560],[1160,500],[1300,540],
            [220,700],[380,740],[540,680],[700,720],[860,660],[1020,700],[1180,740],[1340,680],
          ].map(([x, y], i) => (
            <rect key={i} x={x} y={y} width={24 + (i % 4) * 8} height={24 + (i % 3) * 8} rx="3">
              <animate attributeName="opacity" values="0.2;0.6;0.2" dur={`${3 + (i % 4)}s`} begin={`${i * 0.1}s`} repeatCount="indefinite" />
            </rect>
          ))}
        </g>

        {/* Crossing markers */}
        <g>
          {[
            [320,400],[520,380],[720,400],[920,380],[1120,400],
            [420,540],[620,520],[820,540],[1020,520],
            [380,260],[580,240],[780,260],[980,240],
          ].map(([cx, cy], i) => (
            <g key={i}>
              <circle cx={cx} cy={cy} r="4" fill="#dc2626" fillOpacity="0.8">
                <animate attributeName="r" values="3;7;3" dur="2s" begin={`${i * 0.3}s`} repeatCount="indefinite" />
                <animate attributeName="fillOpacity" values="0.8;0.2;0.8" dur="2s" begin={`${i * 0.3}s`} repeatCount="indefinite" />
              </circle>
              <circle cx={cx} cy={cy} r="2" fill="#dc2626" />
            </g>
          ))}
        </g>

        {/* Data particles */}
        <g>
          {Array.from({ length: 12 }).map((_, i) => (
            <circle key={i} r="2.5" fill="#4cc587" fillOpacity="0.9">
              <animateMotion dur={`${8 + (i % 4) * 2}s`} begin={`${i * 0.8}s`} repeatCount="indefinite" path={i % 2 === 0 ? "M0,650 Q360,450 720,400 T1440,200" : "M200,900 Q500,500 720,400 T1240,100"} />
              <animate attributeName="opacity" values="0;1;1;0" dur={`${8 + (i % 4) * 2}s`} begin={`${i * 0.8}s`} repeatCount="indefinite" />
            </circle>
          ))}
        </g>

        {/* Analysis zone */}
        <polygon points="520,300 920,300 920,580 520,580" fill="none" stroke="#27b06c" strokeWidth="1.5" strokeDasharray="6 4" strokeOpacity="0.5">
          <animate attributeName="strokeOpacity" values="0.2;0.6;0.2" dur="3s" repeatCount="indefinite" />
        </polygon>
        <polygon points="560,340 880,340 880,540 560,540" fill="#27b06c" fillOpacity="0.04" stroke="#27b06c" strokeWidth="0.5" strokeOpacity="0.3">
          <animate attributeName="fillOpacity" values="0.02;0.08;0.02" dur="4s" repeatCount="indefinite" />
        </polygon>

        {/* Scanning line */}
        <line x1="520" y1="300" x2="520" y2="580" stroke="#4cc587" strokeWidth="1" strokeOpacity="0.6">
          <animate attributeName="x1" values="520;920;520" dur="5s" repeatCount="indefinite" />
          <animate attributeName="x2" values="520;920;520" dur="5s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0;0.8;0" dur="5s" repeatCount="indefinite" />
        </line>

        {/* Labels */}
        <g fontSize="10" fontFamily="monospace" fill="#4cc587" fillOpacity="0.7">
          <text x="540" y="330">LAT: 28.6139°N<animate attributeName="opacity" values="0.4;1;0.4" dur="2.5s" repeatCount="indefinite" /></text>
          <text x="540" y="348">LNG: 77.2090°E<animate attributeName="opacity" values="0.4;1;0.4" dur="2.5s" begin="0.5s" repeatCount="indefinite" /></text>
          <text x="540" y="560">ZONE: 500m radius<animate attributeName="opacity" values="0.4;1;0.4" dur="3s" repeatCount="indefinite" /></text>
        </g>

        {/* Compass */}
        <g transform="translate(1340, 80)" strokeOpacity="0.3" stroke="#4cc587" fill="none" strokeWidth="1">
          <circle r="20" />
          <line x1="0" y1="-22" x2="0" y2="22" />
          <line x1="-22" y1="0" x2="22" y2="0" />
          <text x="-3" y="-26" fontSize="9" fill="#4cc587" fillOpacity="0.5" stroke="none">N</text>
        </g>
      </svg>

      <div className="absolute inset-0 bg-gradient-to-b from-ink-950/60 via-transparent to-ink-950/80" />
      <div className="absolute inset-0 bg-gradient-to-r from-ink-950/50 via-transparent to-ink-950/50" />
    </div>
  )
}
