import React from "react"

// Lightweight SVG-based mock analytics graphic used on the Real-Time Coach page
// Purely illustrative – no dynamic data binding.
export function ProgressMockGraphic({ className = "" }: { className?: string }) {
  return (
    <div className={`w-full h-full rounded-2xl border bg-card/70 backdrop-blur-sm p-4 md:p-6 relative overflow-hidden ${className}`}>
      <svg viewBox="0 0 640 400" className="w-full h-full" role="img" aria-labelledby="progressMockTitle progressMockDesc">
        <title id="progressMockTitle">Mock Skill Progress Dashboard</title>
        <desc id="progressMockDesc">Illustrative skill trend lines, recent change card, focus recommendation and a mini chart.</desc>
        {/* Outer frame (for devices that don't show parent bg) */}
        <rect x="0" y="0" width="640" height="400" rx="24" fill="var(--background)" fillOpacity="0.85" />

        {/* Chart area */}
        <g transform="translate(70 70)">
          <rect x="0" y="0" width="300" height="210" rx="8" fill="none" stroke="rgba(0,0,0,0.06)" />
          {/* Grid lines */}
          {[0,42,84,126,168].map(y => (
            <line key={y} x1={0} x2={300} y1={y} y2={y} stroke="rgba(0,0,0,0.07)" strokeWidth={1} />
          ))}
          {/* Trend lines (Problem Solving, Strategy, Communication, Execution) */}
          <polyline fill="none" stroke="#0B56D0" strokeWidth={4} strokeLinecap="round" points="10,150 60,120 110,105 160,96 210,84 260,70 290,55" />
          <polyline fill="none" stroke="#1E88FF" strokeWidth={3} strokeLinecap="round" points="10,165 60,140 110,132 160,123 210,108 260,94 300,80" />
          <polyline fill="none" stroke="#4EA8FF" strokeWidth={3} strokeLinecap="round" points="10,170 60,150 110,140 160,130 210,120 260,110 300,100" />
          <polyline fill="none" stroke="#74BFFF" strokeWidth={3} strokeLinecap="round" points="10,180 60,162 110,150 160,143 210,134 260,126 300,118" />
          {/* Y axis labels */}
          {['100','80','60','40'].map((t,i) => (
            <text key={t} x={-20} y={5 + i*42} textAnchor="end" fontSize={11} fill="rgba(0,0,0,0.55)">{t}</text>
          ))}
          {/* Title */}
          <text x={0} y={-24} fontSize={24} fontWeight={600} fill="rgba(0,0,0,0.85)">Skill Trend Lines</text>
        </g>

        {/* Legend */}
        <g transform="translate(70 300)" fontSize={13} fontWeight={500} fill="rgba(0,0,0,0.75)" >
          {[
            { c:'#0B56D0', t:'Problem Solving' },
            { c:'#1E88FF', t:'Strategy' },
            { c:'#4EA8FF', t:'Communication' },
            { c:'#74BFFF', t:'Execution' },
          ].map((l,i) => (
            <g key={l.t} transform={`translate(${i*150} 0)`}>
              <rect x={0} y={-10} width={32} height={4} rx={2} fill={l.c} />
              <text x={40} y={0}>{l.t}</text>
            </g>
          ))}
        </g>

        {/* +12 Change Card */}
        <g transform="translate(410 70)">
          <rect x={0} y={0} width={180} height={100} rx={18} fill="#fff" stroke="rgba(0,0,0,0.08)" />
          <text x={90} y={48} fontSize={48} fontWeight={600} textAnchor="middle" fill="rgba(0,0,0,0.9)">+12</text>
          <text x={90} y={78} fontSize={14} textAnchor="middle" fill="rgba(0,0,0,0.65)">Skill score change</text>
        </g>

        {/* Focus Recommendation */}
        <g transform="translate(410 190)">
          <rect x={0} y={0} width={180} height={130} rx={18} fill="#fff" stroke="rgba(0,0,0,0.08)" />
          <text x={90} y={42} fontSize={28} fontWeight={600} textAnchor="middle" fill="rgba(0,0,0,0.85)">Focus</text>
          <text x={90} y={64} fontSize={14} fontWeight={600} textAnchor="middle" fill="rgba(0,0,0,0.85)">Recommendation</text>
          <text x={90} y={92} fontSize={16} textAnchor="middle" fill="rgba(0,0,0,0.75)">Identify Growth</text>
          <text x={90} y={112} fontSize={16} textAnchor="middle" fill="rgba(0,0,0,0.75)">Opportunities</text>
        </g>

        {/* Mini Focus Score Chart */}
        <g transform="translate(470 340)">
          <rect x={0} y={-50} width={120} height={70} rx={12} fill="#fff" stroke="rgba(0,0,0,0.08)" />
          <polyline fill="none" stroke="#0B56D0" strokeWidth={3} strokeLinecap="round" points="10,10 30,-5 50,0 70,-8 90,-2 108,-12" />
          <text x={60} y={18} fontSize={12} textAnchor="middle" fill="rgba(0,0,0,0.7)">Focus Score Over Time</text>
        </g>
      </svg>
    </div>
  )
}

export default ProgressMockGraphic
