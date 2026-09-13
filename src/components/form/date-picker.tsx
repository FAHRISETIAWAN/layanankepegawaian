'use client'

import { ChevronDownIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline'
import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

const BULAN = [
  'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
  'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember',
]
const HARI = ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab']

function pad(n: number) { return String(n).padStart(2, '0') }

function formatDisplay(value: string): string {
  if (!value) return ''
  const [y, m, d] = value.split('-')
  if (!y || !m || !d) return ''
  return `${pad(Number(d))} ${BULAN[Number(m) - 1]} ${y}`
}

interface Props {
  value: string        // 'YYYY-MM-DD'
  onChange: (v: string) => void
  placeholder?: string
}

export function DatePicker({ value, onChange, placeholder = 'Pilih tanggal' }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const [open, setOpen] = useState(false)

  const today = new Date()
  const initYear  = value ? Number(value.split('-')[0]) : today.getFullYear()
  const initMonth = value ? Number(value.split('-')[1]) - 1 : today.getMonth()

  const [viewYear,  setViewYear]  = useState(initYear)
  const [viewMonth, setViewMonth] = useState(initMonth)
  const [mode, setMode] = useState<'day' | 'month' | 'year'>('day')

  // Sync view when value changes externally
  useEffect(() => {
    if (value) {
      setViewYear(Number(value.split('-')[0]))
      setViewMonth(Number(value.split('-')[1]) - 1)
    }
  }, [value])

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
        setMode('day')
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  // ── helpers ──────────────────────────────────────────────────────────────
  const selectedDay   = value ? Number(value.split('-')[2]) : null
  const selectedMonth = value ? Number(value.split('-')[1]) - 1 : null
  const selectedYear  = value ? Number(value.split('-')[0]) : null

  function daysInMonth(y: number, m: number) { return new Date(y, m + 1, 0).getDate() }
  function firstDayOfMonth(y: number, m: number) { return new Date(y, m, 1).getDay() }

  function selectDate(day: number) {
    onChange(`${viewYear}-${pad(viewMonth + 1)}-${pad(day)}`)
    setOpen(false)
    setMode('day')
  }

  function prevMonth() {
    if (viewMonth === 0) { setViewMonth(11); setViewYear(y => y - 1) }
    else setViewMonth(m => m - 1)
  }
  function nextMonth() {
    if (viewMonth === 11) { setViewMonth(0); setViewYear(y => y + 1) }
    else setViewMonth(m => m + 1)
  }

  const totalDays   = daysInMonth(viewYear, viewMonth)
  const startOffset = firstDayOfMonth(viewYear, viewMonth)
  const cells       = Array.from({ length: startOffset + totalDays }, (_, i) =>
    i < startOffset ? null : i - startOffset + 1
  )

  // year range for year picker
  const yearStart = Math.floor(viewYear / 12) * 12
  const years     = Array.from({ length: 12 }, (_, i) => yearStart + i)

  return (
    <div ref={ref} className="relative">
      {/* Trigger */}
      <button
        type="button"
        onClick={() => { setOpen(v => !v); setMode('day') }}
        className={`flex h-10 w-full items-center justify-between rounded-xl border px-3 text-sm transition ${
          open
            ? 'border-indigo-500 bg-white ring-1 ring-indigo-500 dark:border-indigo-500 dark:bg-slate-800'
            : 'border-slate-200 bg-white hover:border-slate-300 dark:border-slate-600 dark:bg-slate-800 dark:hover:border-slate-500'
        }`}
      >
        <span className={value ? 'text-slate-700 dark:text-slate-200' : 'text-slate-400 dark:text-slate-500'}>
          {value ? formatDisplay(value) : placeholder}
        </span>
        <ChevronDownIcon className={`h-4 w-4 text-slate-400 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
      </button>

      {/* Calendar popup */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -4, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.97 }}
            transition={{ duration: 0.13 }}
            className="absolute left-0 top-full z-50 mt-1.5 w-72 rounded-2xl border border-slate-200 bg-white p-4 shadow-xl dark:border-slate-700 dark:bg-slate-800"
          >
            {/* ── Header ── */}
            <div className="mb-3 flex items-center justify-between">
              {mode === 'day' && (
                <button type="button" onClick={prevMonth} className="flex h-7 w-7 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 dark:hover:bg-slate-700">
                  <ChevronLeftIcon className="h-4 w-4" />
                </button>
              )}
              {mode === 'year' && (
                <button type="button" onClick={() => setViewYear(y => y - 12)} className="flex h-7 w-7 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 dark:hover:bg-slate-700">
                  <ChevronLeftIcon className="h-4 w-4" />
                </button>
              )}
              {mode === 'month' && <div className="w-7" />}

              <button
                type="button"
                onClick={() => setMode(m => m === 'day' ? 'month' : m === 'month' ? 'year' : 'day')}
                className="flex items-center gap-1 rounded-lg px-2 py-1 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-700"
              >
                {mode === 'year'
                  ? `${yearStart} – ${yearStart + 11}`
                  : mode === 'month'
                  ? viewYear
                  : `${BULAN[viewMonth]} ${viewYear}`
                }
                <ChevronDownIcon className={`h-3 w-3 text-slate-400 transition-transform ${mode !== 'day' ? 'rotate-180' : ''}`} />
              </button>

              {mode === 'day' && (
                <button type="button" onClick={nextMonth} className="flex h-7 w-7 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 dark:hover:bg-slate-700">
                  <ChevronRightIcon className="h-4 w-4" />
                </button>
              )}
              {mode === 'year' && (
                <button type="button" onClick={() => setViewYear(y => y + 12)} className="flex h-7 w-7 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 dark:hover:bg-slate-700">
                  <ChevronRightIcon className="h-4 w-4" />
                </button>
              )}
              {mode === 'month' && <div className="w-7" />}
            </div>

            {/* ── Day view ── */}
            {mode === 'day' && (
              <>
                <div className="mb-1 grid grid-cols-7 text-center">
                  {HARI.map(h => (
                    <span key={h} className="py-1 text-[11px] font-semibold text-slate-400">{h}</span>
                  ))}
                </div>
                <div className="grid grid-cols-7 gap-y-0.5 text-center">
                  {cells.map((day, i) => {
                    if (!day) return <div key={i} />
                    const isSelected = day === selectedDay && viewMonth === selectedMonth && viewYear === selectedYear
                    const isToday    = day === today.getDate() && viewMonth === today.getMonth() && viewYear === today.getFullYear()
                    return (
                      <button
                        key={i}
                        type="button"
                        onClick={() => selectDate(day)}
                        className={`mx-auto flex h-8 w-8 items-center justify-center rounded-lg text-sm transition ${
                          isSelected
                            ? 'bg-indigo-600 font-semibold text-white'
                            : isToday
                            ? 'font-semibold text-indigo-600 ring-1 ring-indigo-400 dark:text-indigo-400'
                            : 'text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-700'
                        }`}
                      >
                        {day}
                      </button>
                    )
                  })}
                </div>
              </>
            )}

            {/* ── Month view ── */}
            {mode === 'month' && (
              <div className="grid grid-cols-3 gap-2">
                {BULAN.map((b, i) => {
                  const isSelected = i === selectedMonth && viewYear === selectedYear
                  return (
                    <button
                      key={b}
                      type="button"
                      onClick={() => { setViewMonth(i); setMode('day') }}
                      className={`rounded-xl py-2 text-xs font-medium transition ${
                        isSelected
                          ? 'bg-indigo-600 text-white'
                          : i === today.getMonth() && viewYear === today.getFullYear()
                          ? 'font-semibold text-indigo-600 ring-1 ring-indigo-400 dark:text-indigo-400'
                          : 'text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-700'
                      }`}
                    >
                      {b.slice(0, 3)}
                    </button>
                  )
                })}
              </div>
            )}

            {/* ── Year view ── */}
            {mode === 'year' && (
              <div className="grid grid-cols-3 gap-2">
                {years.map(y => {
                  const isSelected = y === selectedYear
                  return (
                    <button
                      key={y}
                      type="button"
                      onClick={() => { setViewYear(y); setMode('month') }}
                      className={`rounded-xl py-2 text-xs font-medium transition ${
                        isSelected
                          ? 'bg-indigo-600 text-white'
                          : y === today.getFullYear()
                          ? 'font-semibold text-indigo-600 ring-1 ring-indigo-400 dark:text-indigo-400'
                          : 'text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-700'
                      }`}
                    >
                      {y}
                    </button>
                  )
                })}
              </div>
            )}

            {/* Footer */}
            {value && mode === 'day' && (
              <div className="mt-3 border-t border-slate-100 pt-2 dark:border-slate-700">
                <button
                  type="button"
                  onClick={() => { onChange(''); setOpen(false) }}
                  className="text-xs text-slate-400 transition hover:text-red-500"
                >
                  Hapus tanggal
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
