'use client'

import { XMarkIcon } from '@heroicons/react/24/outline'
import { ArrowUpTrayIcon } from '@heroicons/react/24/solid'
import { toast } from 'gooey-toast'
import { useRef, useState } from 'react'

interface Props {
  label: string
  required?: boolean
  accept?: string
  value: File | null
  onChange: (file: File | null) => void
}

const ACCEPTED_TYPES = '.pdf'
const MAX_SIZE = 2 * 1024 * 1024 // 2 MB

export function FileUpload({ label, required, accept = ACCEPTED_TYPES, value, onChange }: Props) {
  const [dragOver, setDragOver] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const validate = (file: File): boolean => {
    if (!file.name.toLowerCase().endsWith('.pdf')) {
      toast.error({ title: 'Format Tidak Valid', description: 'Hanya file PDF yang diperbolehkan.' })
      return false
    }
    if (file.size > MAX_SIZE) {
      toast.error({
        title: 'Ukuran File Terlalu Besar',
        description: `File "${file.name}" berukuran ${(file.size / (1024 * 1024)).toFixed(2)} MB. Maksimal 2 MB.`,
      })
      return false
    }
    return true
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(false)
    const file = e.dataTransfer.files[0]
    if (file && validate(file)) onChange(file)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null
    if (file && validate(file)) {
      onChange(file)
    } else if (!file) {
      onChange(null)
    }
    e.target.value = ''
  }

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
  }

  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">
        {label} {required && <span className="text-red-500">*</span>}
      </label>

      {value ? (
        /* File terpilih */
        <div className="flex items-center gap-3 rounded-xl border border-indigo-200 bg-indigo-50 px-3 py-2.5 dark:border-indigo-800/50 dark:bg-indigo-900/20">
          <div className="flex h-9 w-9 shrink-0 flex-col items-center justify-center rounded-lg bg-red-500 shadow-sm">
            <span className="text-[9px] font-bold leading-none tracking-wide text-white">PDF</span>
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium text-slate-700 dark:text-slate-200">{value.name}</p>
            <p className="text-xs text-slate-400">{formatSize(value.size)}</p>
          </div>
          <button
            type="button"
            onClick={() => { onChange(null); if (inputRef.current) inputRef.current.value = '' }}
            className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-slate-400 transition hover:bg-indigo-100 hover:text-slate-600 dark:hover:bg-indigo-800"
          >
            <XMarkIcon className="h-4 w-4" />
          </button>
        </div>
      ) : (
        /* Drop zone */
        <div
          onDragOver={(e) => { e.preventDefault(); setDragOver(true) }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
          onClick={() => inputRef.current?.click()}
          className={`flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed px-4 py-6 transition ${
            dragOver
              ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20'
              : 'border-slate-200 hover:border-indigo-400 hover:bg-slate-50 dark:border-slate-600 dark:hover:border-indigo-500 dark:hover:bg-slate-800/50'
          }`}
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800">
            <ArrowUpTrayIcon className="h-5 w-5 text-slate-400" />
          </div>
          <div className="text-center">
            <p className="text-sm font-medium text-slate-600 dark:text-slate-300">
              Klik atau seret file ke sini
            </p>
            <p className="mt-0.5 text-xs text-slate-400">PDF — maks. 2 MB</p>
          </div>
        </div>
      )}

      <input
        ref={inputRef}
        type="file"
        accept={accept}
        className="hidden"
        onChange={handleChange}
      />
    </div>
  )
}
