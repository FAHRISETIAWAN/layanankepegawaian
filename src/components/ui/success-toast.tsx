'use client'

import { CheckCircleIcon, ExclamationCircleIcon, XCircleIcon } from '@heroicons/react/24/solid'
import { AnimatePresence, motion } from 'framer-motion'
import { useEffect } from 'react'

type Variant = 'success' | 'error' | 'warning'

interface Props {
  open: boolean
  onClose: () => void
  title?: string
  message?: string
  children?: React.ReactNode
  variant?: Variant
  duration?: number
}

const VARIANT = {
  success: {
    icon: CheckCircleIcon,
    iconBg: 'bg-emerald-100 dark:bg-emerald-900/40',
    iconColor: 'text-emerald-500',
  },
  error: {
    icon: XCircleIcon,
    iconBg: 'bg-red-100 dark:bg-red-900/40',
    iconColor: 'text-red-500',
  },
  warning: {
    icon: ExclamationCircleIcon,
    iconBg: 'bg-amber-100 dark:bg-amber-900/40',
    iconColor: 'text-amber-500',
  },
}

export function SuccessToast({
  open,
  onClose,
  title = 'Berhasil',
  message,
  children,
  variant = 'success',
  duration = 3000,
}: Props) {
  useEffect(() => {
    if (!open) return
    const t = setTimeout(onClose, duration)
    return () => clearTimeout(t)
  }, [open, onClose, duration])

  const v = VARIANT[variant]
  const Icon = v.icon

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 16, scale: 0.96 }}
          transition={{ duration: 0.22, ease: 'easeOut' }}
          className="fixed bottom-6 left-1/2 z-[99] -translate-x-1/2"
        >
          <div className="flex items-start gap-3 rounded-2xl bg-white px-5 py-3.5 shadow-xl ring-1 ring-slate-200 dark:bg-slate-800 dark:ring-slate-700 min-w-[280px] max-w-sm">
            <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${v.iconBg}`}>
              <Icon className={`h-5 w-5 ${v.iconColor}`} />
            </span>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-slate-800 dark:text-slate-100">{title}</p>
              {message && <p className="text-xs text-slate-400 mt-0.5">{message}</p>}
              {children && <div className="mt-1.5">{children}</div>}
            </div>
            <button
              type="button"
              onClick={onClose}
              className="ml-1 shrink-0 rounded-lg p-1 text-slate-300 hover:bg-slate-100 hover:text-slate-500 dark:hover:bg-slate-700"
            >
              <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 14 14">
                <path d="M2 2l10 10M12 2L2 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
