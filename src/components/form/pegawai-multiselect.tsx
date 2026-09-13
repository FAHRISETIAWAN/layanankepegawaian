'use client'

import { daftarPegawai, type Pegawai } from '@/data/pegawai-data'
import { MagnifyingGlassIcon, UserGroupIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { CheckIcon } from '@heroicons/react/24/solid'
import { useState } from 'react'
import { Sheet } from './sheet'

interface Props {
  value: Pegawai[]
  onChange: (val: Pegawai[]) => void
}

export function PegawaiMultiSelect({ value, onChange }: Props) {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')

  const filtered = daftarPegawai.filter((p) => {
    const q = query.toLowerCase()
    return (
      p.nip.includes(q) ||
      p.nama.toLowerCase().includes(q) ||
      p.unit.toLowerCase().includes(q)
    )
  })

  const isSelected = (p: Pegawai) => value.some((v) => v.nip === p.nip)

  const toggle = (p: Pegawai) => {
    if (isSelected(p)) {
      onChange(value.filter((v) => v.nip !== p.nip))
    } else {
      onChange([...value, p])
    }
  }

  const remove = (nip: string) => onChange(value.filter((v) => v.nip !== nip))

  return (
    <>
      {/* Trigger field */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="flex min-h-10 w-full items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-left transition hover:border-slate-300 focus:outline-none focus:ring-1 focus:ring-indigo-500 dark:border-slate-600 dark:bg-slate-800 dark:hover:border-slate-500"
      >
        {value.length === 0 ? (
          <span className="flex items-center gap-2 text-sm text-slate-400">
            <UserGroupIcon className="h-4 w-4" />
            Klik untuk memilih pegawai...
          </span>
        ) : (
          <div className="flex flex-wrap gap-1.5">
            {value.map((p) => (
              <span
                key={p.nip}
                className="flex items-center gap-1 rounded-full bg-indigo-100 px-2.5 py-0.5 text-xs font-medium text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300"
              >
                {p.nama}
                <span
                  role="button"
                  onClick={(e) => { e.stopPropagation(); remove(p.nip) }}
                  className="ml-0.5 cursor-pointer rounded-full text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-200"
                >
                  <XMarkIcon className="h-3 w-3" />
                </span>
              </span>
            ))}
          </div>
        )}
      </button>

      {/* Sheet */}
      <Sheet
        open={open}
        onClose={() => setOpen(false)}
        title="Pilih Pegawai"
        description="Dapat memilih lebih dari satu pegawai"
      >
        {/* Search */}
        <div className="border-b border-slate-100 px-4 py-3 dark:border-slate-700">
          <div className="relative">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              autoFocus
              type="text"
              placeholder="Cari NIP atau nama pegawai..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="h-10 w-full rounded-lg border border-slate-200 bg-slate-50 pl-9 pr-3 text-sm text-slate-700 placeholder-slate-400 outline-none transition focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200 dark:placeholder-slate-500"
            />
          </div>
        </div>

        {/* Selected count badge */}
        {value.length > 0 && (
          <div className="flex items-center justify-between border-b border-slate-100 bg-indigo-50 px-4 py-2 dark:border-slate-700 dark:bg-indigo-900/20">
            <span className="text-xs font-medium text-indigo-700 dark:text-indigo-300">
              {value.length} pegawai dipilih
            </span>
            <button
              type="button"
              onClick={() => onChange([])}
              className="text-xs text-indigo-500 hover:text-indigo-700 dark:text-indigo-400"
            >
              Hapus semua
            </button>
          </div>
        )}

        {/* List */}
        <div className="flex-1 overflow-y-auto">
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-slate-400">
              <UserGroupIcon className="mb-2 h-10 w-10 opacity-30" />
              <p className="text-sm">Pegawai tidak ditemukan</p>
            </div>
          ) : (
            <ul className="divide-y divide-slate-100 dark:divide-slate-700/50">
              {filtered.map((p) => {
                const selected = isSelected(p)
                return (
                  <li key={p.nip}>
                    <button
                      type="button"
                      onClick={() => toggle(p)}
                      className={`flex w-full items-center gap-4 px-4 py-3 text-left transition ${
                        selected
                          ? 'bg-indigo-50 dark:bg-indigo-900/20'
                          : 'hover:bg-slate-50 dark:hover:bg-slate-800'
                      }`}
                    >
                      {/* Checkbox */}
                      <span className={`flex h-5 w-5 shrink-0 items-center justify-center rounded border-2 transition ${
                        selected
                          ? 'border-indigo-600 bg-indigo-600'
                          : 'border-slate-300 dark:border-slate-600'
                      }`}>
                        {selected && <CheckIcon className="h-3 w-3 text-white" />}
                      </span>

                      {/* Avatar */}
                      <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-semibold ${
                        selected
                          ? 'bg-indigo-600 text-white'
                          : 'bg-slate-100 text-slate-500 dark:bg-slate-700 dark:text-slate-300'
                      }`}>
                        {p.nama.charAt(0)}
                      </span>

                      {/* Info */}
                      <div className="min-w-0 flex-1">
                        <p className={`truncate text-sm font-medium ${selected ? 'text-indigo-700 dark:text-indigo-300' : 'text-slate-700 dark:text-slate-200'}`}>
                          {p.nama}
                        </p>
                        <p className="truncate text-xs text-slate-400">{p.nip}</p>
                        <p className="truncate text-xs text-slate-400">{p.jabatan} · {p.unit}</p>
                      </div>
                    </button>
                  </li>
                )
              })}
            </ul>
          )}
        </div>

        {/* Footer action */}
        <div className="border-t border-slate-100 px-4 py-4 dark:border-slate-700">
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="w-full rounded-lg bg-indigo-600 py-2.5 text-sm font-medium text-white transition hover:bg-indigo-500"
          >
            Konfirmasi {value.length > 0 ? `(${value.length} pegawai)` : ''}
          </button>
        </div>
      </Sheet>
    </>
  )
}
