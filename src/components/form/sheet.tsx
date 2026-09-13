'use client'

import * as Headless from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { AnimatePresence, motion } from 'framer-motion'

interface SheetProps {
  open: boolean
  onClose: () => void
  title?: string
  description?: string
  children: React.ReactNode
}

export function Sheet({ open, onClose, title, description, children }: SheetProps) {
  return (
    <Headless.Dialog open={open} onClose={onClose}>
      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-slate-950/40 backdrop-blur-sm"
              aria-hidden="true"
            />

            {/* Sheet panel */}
            <div className="fixed inset-0 z-50 flex justify-end">
              <motion.div
                key="sheet"
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'spring', damping: 30, stiffness: 300 }}
                className="flex h-full w-full max-w-md flex-col bg-white shadow-xl dark:bg-slate-900"
              >
                {/* Header */}
                <div className="flex items-start justify-between border-b border-slate-100 px-6 py-5 dark:border-slate-700">
                  <div>
                    {title && (
                      <Headless.DialogTitle className="text-base font-semibold text-slate-800 dark:text-slate-100">
                        {title}
                      </Headless.DialogTitle>
                    )}
                    {description && (
                      <p className="mt-0.5 text-sm text-slate-400">{description}</p>
                    )}
                  </div>
                  <button
                    onClick={onClose}
                    className="ml-4 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-800 dark:hover:text-slate-200"
                  >
                    <XMarkIcon className="h-5 w-5" />
                  </button>
                </div>

                {/* Content */}
                <div className="flex flex-1 flex-col overflow-hidden">
                  {children}
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </Headless.Dialog>
  )
}
