'use client'

import { chartData } from '@/data/dashboard-data'
import { ChevronDownIcon } from '@heroicons/react/24/outline'
import { useState } from 'react'

const CHART_WIDTH = 560
const CHART_HEIGHT = 160
const PADDING = { top: 20, right: 10, bottom: 30, left: 30 }

// Smooth bezier curve path
function buildSmoothPath(points: { x: number; y: number }[]): string {
  if (points.length < 2) return ''
  let d = `M ${points[0].x} ${points[0].y}`
  for (let i = 1; i < points.length; i++) {
    const prev = points[i - 1]
    const curr = points[i]
    const cpX = (prev.x + curr.x) / 2
    d += ` C ${cpX} ${prev.y}, ${cpX} ${curr.y}, ${curr.x} ${curr.y}`
  }
  return d
}

function buildSmoothAreaPath(points: { x: number; y: number }[], bottomY: number): string {
  if (points.length < 2) return ''
  const line = buildSmoothPath(points)
  return `${line} L ${points[points.length - 1].x} ${bottomY} L ${points[0].x} ${bottomY} Z`
}

export function VisitChart() {
  const [tooltip, setTooltip] = useState<{ x: number; y: number; value: number; date: string } | null>(null)

  const innerW = CHART_WIDTH - PADDING.left - PADDING.right
  const innerH = CHART_HEIGHT - PADDING.top - PADDING.bottom
  const isEmpty = chartData.length === 0
  const maxVal = isEmpty ? 1 : Math.max(...chartData.map((d) => d.pengajuan))
  const minVal = isEmpty ? 0 : Math.min(...chartData.map((d) => d.pengajuan))
  const total = chartData.reduce((s, d) => s + d.pengajuan, 0)
  const avg = isEmpty ? 0 : Math.round(total / chartData.length)

  const points = chartData.map((d, i) => ({
    x: PADDING.left + (chartData.length > 1 ? i / (chartData.length - 1) : 0.5) * innerW,
    y: PADDING.top + (1 - (maxVal === minVal ? 0.5 : (d.pengajuan - minVal) / (maxVal - minVal))) * innerH,
    value: d.pengajuan,
    date: d.date,
  }))

  const yLabels = [5, 10, 15]

  return (
    <div className="h-full rounded-2xl bg-white p-4 dark:bg-slate-800 sm:p-5">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-200">
            Rata-rata pengajuan harian dalam{' '}
            <button className="flex items-center gap-1 text-indigo-600 dark:text-indigo-400">
              30 hari <ChevronDownIcon className="h-3 w-3" />
            </button>
          </div>
          <p className="mt-0.5 text-xs text-slate-400 dark:text-slate-500">
            Total: {total} pengajuan
          </p>
        </div>
        <div className="text-3xl font-bold text-slate-800 dark:text-slate-100">~{avg}</div>
      </div>

      {isEmpty ? (
        <div className="flex h-[160px] items-center justify-center text-sm text-slate-400 dark:text-slate-500">
          Belum ada data pengajuan
        </div>
      ) : (
      <div className="relative mt-4">
        <svg viewBox={`0 0 ${CHART_WIDTH} ${CHART_HEIGHT}`} className="w-full" onMouseLeave={() => setTooltip(null)}>
          <defs>
            <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#6366f1" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#6366f1" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Grid lines */}
          {yLabels.map((label) => {
            const y = PADDING.top + (1 - (label - minVal) / (maxVal - minVal)) * innerH
            return (
              <g key={label}>
                <line x1={PADDING.left} y1={y} x2={CHART_WIDTH - PADDING.right} y2={y}
                  stroke="#e2e8f0" strokeWidth="1" strokeDasharray="4 4" className="dark:stroke-slate-700" />
                <text x={PADDING.left - 6} y={y + 4} textAnchor="end" fontSize="10" fill="#94a3b8">{label}</text>
              </g>
            )
          })}

          {/* Area */}
          <path d={buildSmoothAreaPath(points, CHART_HEIGHT - PADDING.bottom)} fill="url(#areaGrad)" />

          {/* Smooth line */}
          <path
            d={buildSmoothPath(points)}
            fill="none"
            stroke="#6366f1"
            strokeWidth="1.5"
            strokeLinejoin="round"
            strokeLinecap="round"
          />

          {/* Hover targets */}
          {points.map((p, i) => (
            <circle key={i} cx={p.x} cy={p.y} r="12" fill="transparent"
              onMouseEnter={() => setTooltip({ x: p.x, y: p.y, value: p.value, date: p.date })} />
          ))}

          {/* Tooltip */}
          {tooltip && (
            <g>
              <circle cx={tooltip.x} cy={tooltip.y} r="4" fill="#6366f1" stroke="#fff" strokeWidth="2" />
              <rect x={Math.min(tooltip.x - 44, CHART_WIDTH - 98)} y={tooltip.y - 46} width="88" height="38"
                rx="8" fill="#1e293b" stroke="#6366f1" strokeWidth="1" />
              <text x={Math.min(tooltip.x, CHART_WIDTH - 54) + 0} y={tooltip.y - 28}
                textAnchor="middle" fontSize="12" fontWeight="bold" fill="#fff">{tooltip.value} pengajuan</text>
              <text x={Math.min(tooltip.x, CHART_WIDTH - 54) + 0} y={tooltip.y - 14}
                textAnchor="middle" fontSize="9" fill="#94a3b8">{tooltip.date}</text>
            </g>
          )}
        </svg>
      </div>
      )}
    </div>
  )
}
