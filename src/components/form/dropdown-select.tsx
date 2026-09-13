'use client'

import { ChevronDownIcon } from '@heroicons/react/24/outline'
import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

interface Props {
  value: string
  onChange: (v: string) => void
  options: { value: string; label: string }[]
  placeholder?: string
}

export function DropdownSelect({ value, onChange, options, placeholder = 'Pilih...' }: Props) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const label = options.find(o => o.value === value)?.label

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen(v => !v)}
        className={`flex h-10 w-full items-center justify-between rounded-xl border px-3 text-sm transition ${
          open
            ? 'border-indigo-500 bg-white ring-1 ring-indigo-500 dark:border-indigo-500 dark:bg-slate-800'
            : 'border-slate-200 bg-white hover:border-slate-300 dark:border-slate-600 dark:bg-slate-800 dark:hover:border-slate-500'
        }`}
      >
        <span className={label ? 'text-slate-700 dark:text-slate-200' : 'text-slate-400 dark:text-slate-500'}>
          {label ?? placeholder}
        </span>
        <ChevronDownIcon className={`h-4 w-4 text-slate-400 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ opacity: 0, y: -4, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.97 }}
            transition={{ duration: 0.13 }}
            className="absolute left-0 top-full z-50 mt-1.5 max-h-56 w-full overflow-y-auto rounded-xl border border-slate-200 bg-white py-1 shadow-lg [scrollbar-width:none] [&::-webkit-scrollbar]:hidden dark:border-slate-700 dark:bg-slate-800"
          >
            {options.map(opt => (
              <li key={opt.value}>
                <button
                  type="button"
                  onClick={() => { onChange(opt.value); setOpen(false) }}
                  className={`flex w-full items-center justify-between px-3.5 py-2 text-sm transition ${
                    opt.value === value
                      ? 'bg-indigo-50 font-semibold text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400'
                      : 'text-slate-700 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-700/50'
                  }`}
                >
                  {opt.label}
                  {opt.value === value && <span className="h-1.5 w-1.5 rounded-full bg-indigo-500" />}
                </button>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  )
}
