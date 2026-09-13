'use client'

import { ROLE_CONFIG, type Role } from '@/data/pegawai-role-data'
import { pegawaiApi, type Pegawai } from '@/lib/api/pegawai'
import { DropdownSelect } from '@/components/form/dropdown-select'
import { referensiApi, type MasterPegawai } from '@/lib/api/referensi'
import {
  ChevronRightIcon,
  MagnifyingGlassIcon,
  PencilSquareIcon,
  PlusIcon,
  UserGroupIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

const ROLES: Role[] = ['admin', 'verifikator_ipg', 'verifikator_tubel', 'verifikator_pwk', 'verifikator_ujikom', 'verifikator_mutasi', 'monitoring']

const filterTabs: { key: Role | 'semua'; label: string }[] = [
  { key: 'semua',                label: 'Semua' },
  { key: 'admin',                label: 'Admin' },
  { key: 'verifikator_ipg',      label: 'Verifikator IPG' },
  { key: 'verifikator_tubel',    label: 'Verifikator TUBEL' },
  { key: 'verifikator_pwk',      label: 'Verifikator PWK' },
  { key: 'verifikator_ujikom',   label: 'Verifikator UjiKom' },
  { key: 'verifikator_mutasi',   label: 'Verifikator Mutasi' },
  { key: 'monitoring',           label: 'Monitoring' },
  { key: 'pegawai',              label: 'Pegawai' },
]

// ── Add Pegawai Sheet ──────────────────────────────────────────────────────
function AddPegawaiSheet({
  open,
  onClose,
  onSaved,
}: {
  open: boolean
  onClose: () => void
  onSaved: () => void
}) {
  const [query, setQuery]           = useState('')
  const [results, setResults]       = useState<MasterPegawai[]>([])
  const [selected, setSelected]     = useState<MasterPegawai | null>(null)
  const [dropOpen, setDropOpen]     = useState(false)
  const [role, setRole]             = useState<Role>('pegawai')
  const [loading, setLoading]       = useState(false)
  const [saving, setSaving]         = useState(false)
  const [error, setError]           = useState('')
  const dropRef                     = useRef<HTMLDivElement>(null)

  // Load kantor pusat list on open
  useEffect(() => {
    if (!open) return
    setQuery(''); setSelected(null); setRole('pegawai'); setError('')
    setLoading(true)
    referensiApi.getKantorPusat().then(setResults).finally(() => setLoading(false))
  }, [open])

  // Debounced search
  useEffect(() => {
    if (!open) return
    const t = setTimeout(() => {
      referensiApi.getKantorPusat(query || undefined).then(setResults)
    }, 300)
    return () => clearTimeout(t)
  }, [query, open])

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropRef.current && !dropRef.current.contains(e.target as Node)) setDropOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const handleSave = async () => {
    if (!selected) return
    setSaving(true); setError('')
    try {
      await pegawaiApi.create({
        nip: selected.nip,
        nama: selected.nama,
        jabatan: selected.namajabatan,
        unit: selected.satker,
        email: selected.email ?? '',
        password: selected.nip,
        role,
      })
      onSaved()
      onClose()
    } catch (e: any) {
      setError(e?.message ?? 'Gagal menyimpan')
    } finally {
      setSaving(false)
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div key="bd" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm" onClick={onClose} />

          <motion.div key="sh" initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 340, damping: 38 }}
            className="fixed inset-y-0 right-0 z-50 flex w-full max-w-md flex-col bg-white shadow-2xl dark:bg-slate-900"
          >
            {/* Header */}
            <div className="flex shrink-0 items-center gap-3 border-b border-slate-100 px-5 py-4 dark:border-slate-700">
              <button onClick={onClose} className="flex h-8 w-8 items-center justify-center rounded-full text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800">
                <XMarkIcon className="h-5 w-5" />
              </button>
              <div>
                <p className="font-semibold text-slate-800 dark:text-slate-100">Tambah Pengguna</p>
                <p className="text-xs text-slate-400">Pilih dari pegawai Biro SDM Kantor Pusat</p>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden space-y-5">
              {/* Pegawai picker */}
              <div>
                <p className="mb-1.5 text-sm font-medium text-slate-700 dark:text-slate-200">Pegawai <span className="text-red-500">*</span></p>
                <div ref={dropRef} className="relative">
                  <div
                    onClick={() => setDropOpen(v => !v)}
                    className="flex min-h-10 cursor-pointer items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm transition hover:border-slate-300 dark:border-slate-700 dark:bg-slate-800"
                  >
                    {selected ? (
                      <div className="flex flex-1 items-center justify-between">
                        <div>
                          <p className="font-medium text-slate-700 dark:text-slate-200">{selected.nama}</p>
                          <p className="text-xs text-slate-400">{selected.nip} · {selected.namajabatan}</p>
                        </div>
                        <button type="button" onClick={e => { e.stopPropagation(); setSelected(null) }}
                          className="ml-2 text-slate-400 hover:text-slate-600">
                          <XMarkIcon className="h-4 w-4" />
                        </button>
                      </div>
                    ) : (
                      <span className="text-slate-400">Pilih pegawai...</span>
                    )}
                  </div>

                  {dropOpen && (
                    <div className="absolute left-0 top-full z-10 mt-1.5 w-full rounded-xl border border-slate-200 bg-white shadow-lg dark:border-slate-700 dark:bg-slate-800">
                      <div className="p-2">
                        <div className="relative">
                          <MagnifyingGlassIcon className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
                          <input
                            autoFocus
                            type="text"
                            value={query}
                            onChange={e => setQuery(e.target.value)}
                            placeholder="Cari nama atau NIP..."
                            className="h-8 w-full rounded-lg border border-slate-200 bg-slate-50 pl-8 pr-2 text-sm outline-none focus:border-indigo-400 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-200"
                          />
                        </div>
                      </div>
                      <ul className="max-h-56 overflow-y-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                        {loading ? (
                          <li className="px-3 py-4 text-center text-xs text-slate-400">Memuat...</li>
                        ) : results.length === 0 ? (
                          <li className="px-3 py-4 text-center text-xs text-slate-400">Tidak ditemukan</li>
                        ) : results.map(p => (
                          <li key={p.nip}>
                            <button
                              type="button"
                              onClick={() => { setSelected(p); setDropOpen(false) }}
                              className="flex w-full flex-col px-3 py-2.5 text-left hover:bg-slate-50 dark:hover:bg-slate-700/50"
                            >
                              <span className="text-sm font-medium text-slate-700 dark:text-slate-200">{p.nama}</span>
                              <span className="text-xs text-slate-400">{p.nip} · {p.namajabatan}</span>
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>

              {/* Role selector */}
              <div>
                <p className="mb-2 text-sm font-medium text-slate-700 dark:text-slate-200">Hak Akses</p>
                <div className="space-y-2">
                  {ROLES.map(r => {
                    const cfg = ROLE_CONFIG[r]
                    return (
                      <button key={r} type="button" onClick={() => setRole(r)}
                        className={`flex w-full items-start gap-3 rounded-xl border p-3.5 text-left transition ${
                          role === r
                            ? 'border-indigo-400 bg-indigo-50 dark:border-indigo-600 dark:bg-indigo-900/20'
                            : 'border-slate-200 bg-white hover:border-slate-300 dark:border-slate-700 dark:bg-slate-800'
                        }`}
                      >
                        <span className={`mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border-2 ${
                          role === r ? 'border-indigo-500 bg-indigo-500' : 'border-slate-300 dark:border-slate-600'
                        }`}>
                          {role === r && <span className="h-1.5 w-1.5 rounded-full bg-white" />}
                        </span>
                        <div className="flex-1">
                          <div className="flex items-center gap-1.5">
                            <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">{cfg.label}</span>
                            <span className={`rounded-full px-1.5 py-0.5 text-[10px] font-semibold ${cfg.bg} ${cfg.text}`}>{cfg.label}</span>
                          </div>
                          <p className="mt-0.5 text-xs text-slate-400">{cfg.desc}</p>
                        </div>
                      </button>
                    )
                  })}
                </div>
              </div>

              {error && <p className="rounded-xl bg-red-50 px-3 py-2 text-xs text-red-600 dark:bg-red-900/20 dark:text-red-400">{error}</p>}
            </div>

            {/* Footer */}
            <div className="shrink-0 border-t border-slate-100 px-5 py-4 dark:border-slate-700">
              <div className="flex gap-3">
                <button onClick={onClose}
                  className="flex-1 rounded-xl border border-slate-200 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-50 dark:border-slate-600 dark:text-slate-300 dark:hover:bg-slate-800">
                  Batal
                </button>
                <button onClick={handleSave} disabled={!selected || saving}
                  className="flex-1 rounded-xl bg-indigo-600 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-500 disabled:opacity-40">
                  {saving ? 'Menyimpan...' : 'Tambah'}
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

// ── Edit Role Sheet ────────────────────────────────────────────────────────
function EditRoleSheet({
  pegawai,
  onClose,
  onSave,
}: {
  pegawai: Pegawai | null
  onClose: () => void
  onSave: (nip: string, role: Role) => Promise<void>
}) {
  const [selectedRole, setSelectedRole] = useState<Role>((pegawai?.role as Role) ?? 'verifikator_ipg')
  const [saving, setSaving] = useState(false)

  if (!pegawai) return null

  const handleSave = async () => {
    setSaving(true)
    await onSave(pegawai.nip, selectedRole)
    setSaving(false)
    onClose()
  }

  return (
    <AnimatePresence>
      {pegawai && (
        <>
          <motion.div key="bd" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm" onClick={onClose} />

          <motion.div key="sh" initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 340, damping: 38 }}
            className="fixed inset-y-0 right-0 z-50 flex w-full max-w-md flex-col bg-white shadow-2xl dark:bg-slate-900"
          >
            <div className="flex shrink-0 items-center gap-3 px-5 py-4">
              <button onClick={onClose} className="flex h-8 w-8 items-center justify-center rounded-full text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800">
                <XMarkIcon className="h-5 w-5" />
              </button>
              <div>
                <p className="font-semibold text-slate-800 dark:text-slate-100">Edit Akses</p>
                <p className="text-xs text-slate-400">{pegawai.nama}</p>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              <div className="mb-6 flex items-center gap-3 rounded-2xl bg-slate-50 p-4 dark:bg-slate-800">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-base font-bold text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-400">
                  {pegawai.nama.split(' ').map(n => n[0]).slice(0, 2).join('')}
                </div>
                <div className="min-w-0">
                  <p className="font-semibold text-slate-800 dark:text-slate-100">{pegawai.nama}</p>
                  <p className="truncate text-xs text-slate-400">{pegawai.nip}</p>
                  <p className="truncate text-xs text-slate-500">{pegawai.jabatan} · {pegawai.unit}</p>
                </div>
              </div>

              <div>
                <p className="mb-3 text-sm font-semibold text-slate-700 dark:text-slate-200">Hak Akses</p>
                <div className="space-y-2">
                  {ROLES.map(role => {
                    const cfg = ROLE_CONFIG[role]
                    return (
                      <button key={role} onClick={() => setSelectedRole(role)}
                        className={`flex w-full items-start gap-3 rounded-xl border p-4 text-left transition ${
                          selectedRole === role
                            ? 'border-indigo-400 bg-indigo-50 dark:border-indigo-600 dark:bg-indigo-900/20'
                            : 'border-slate-200 bg-white hover:border-slate-300 dark:border-slate-700 dark:bg-slate-800 dark:hover:border-slate-600'
                        }`}
                      >
                        <span className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 ${
                          selectedRole === role ? 'border-indigo-500 bg-indigo-500' : 'border-slate-300 dark:border-slate-600'
                        }`}>
                          {selectedRole === role && <span className="h-2 w-2 rounded-full bg-white" />}
                        </span>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">{cfg.label}</span>
                            <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${cfg.bg} ${cfg.text}`}>{cfg.label}</span>
                          </div>
                          <p className="mt-0.5 text-xs text-slate-400">{cfg.desc}</p>
                        </div>
                      </button>
                    )
                  })}
                </div>
              </div>
            </div>

            <div className="shrink-0 px-5 py-4">
              <div className="flex gap-3">
                <button onClick={onClose}
                  className="flex-1 rounded-xl border border-slate-200 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-50 dark:border-slate-600 dark:text-slate-300 dark:hover:bg-slate-800">
                  Batal
                </button>
                <button onClick={handleSave} disabled={saving}
                  className="flex-1 rounded-xl bg-indigo-600 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-500 disabled:opacity-60">
                  {saving ? 'Menyimpan...' : 'Simpan'}
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

// ── Page ───────────────────────────────────────────────────────────────────
export default function PegawaiPage() {
  const [data, setData]             = useState<Pegawai[]>([])
  const [loading, setLoading]       = useState(true)
  const [error, setError]           = useState('')
  const [activeFilter, setActiveFilter] = useState<Role | 'semua'>('semua')
  const [search, setSearch]         = useState('')
  const [editTarget, setEditTarget] = useState<Pegawai | null>(null)
  const [showAdd, setShowAdd]       = useState(false)

  async function load() {
    setLoading(true)
    try {
      const res = await pegawaiApi.getAll()
      setData(res)
    } catch (e: any) {
      setError(e?.message ?? 'Gagal memuat data')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { load() }, [])

  const filtered = data.filter(p => {
    const matchRole   = activeFilter === 'semua' || p.role === activeFilter
    const q = search.toLowerCase()
    const matchSearch = !q || p.nama.toLowerCase().includes(q) || p.nip.includes(q) || p.unit.toLowerCase().includes(q)
    return matchRole && matchSearch
  })

  const counts: Record<string, number> = { semua: data.length }
  data.forEach(p => { counts[p.role] = (counts[p.role] ?? 0) + 1 })

  const handleSave = async (nip: string, role: Role) => {
    await pegawaiApi.updateRole(nip, role)
    setData(prev => prev.map(p => p.nip === nip ? { ...p, role } : p))
  }

  const summary = [
    'admin', 'verifikator_ipg', 'verifikator_tubel', 'verifikator_pwk',
    'verifikator_ujikom', 'verifikator_mutasi', 'pegawai',
  ].map(r => ({ role: r as Role, count: data.filter(p => p.role === r).length }))

  return (
    <>
      <div className="min-h-screen bg-slate-50 px-4 py-8 dark:bg-slate-950 sm:px-6 lg:px-10">
        <nav className="mb-6 flex items-center gap-1.5 text-xs text-slate-400">
          <span className="cursor-pointer hover:text-slate-600 dark:hover:text-slate-300">Dashboard</span>
          <ChevronRightIcon className="h-3.5 w-3.5" />
          <span className="font-medium text-slate-700 dark:text-slate-200">Manajemen Pegawai</span>
        </nav>

        <div className="rounded-2xl bg-white dark:bg-slate-900">
          <div className="px-6 py-5">
            <h2 className="text-base font-semibold text-slate-800 dark:text-slate-100">Manajemen Pegawai</h2>
            <p className="mt-0.5 text-sm text-slate-400">Kelola hak akses dan role pengguna sistem</p>
          </div>

          <div className="flex flex-col gap-3 px-6 pb-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="w-full sm:w-52">
              <DropdownSelect
                value={activeFilter}
                onChange={v => setActiveFilter(v as Role | 'semua')}
                options={[
                  { value: 'semua', label: `Semua (${data.length})` },
                  ...summary.map(({ role, count }) => ({
                    value: role,
                    label: `${ROLE_CONFIG[role].label} (${count})`,
                  })),
                ]}
                placeholder="Filter role..."
              />
            </div>
            <div className="flex items-center gap-2">
              <div className="relative w-full sm:w-60">
                <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input value={search} onChange={e => setSearch(e.target.value)}
                  placeholder="Cari nama, NIP, unit..."
                  className="w-full rounded-lg border border-slate-200 bg-slate-50 py-2 pl-9 pr-4 text-sm text-slate-700 outline-none transition focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200 dark:placeholder-slate-400"
                />
              </div>
              <button onClick={() => setShowAdd(true)}
                className="flex shrink-0 items-center gap-1.5 rounded-lg bg-indigo-600 px-3 py-2 text-sm font-semibold text-white transition hover:bg-indigo-500">
                <PlusIcon className="h-4 w-4" />
                <span className="hidden sm:inline">Tambah</span>
              </button>
            </div>
          </div>

          <div className="border-t border-slate-100 dark:border-slate-700" />

          <div className="divide-y divide-slate-100 px-6 dark:divide-slate-700/50">
            {loading ? (
              <div className="divide-y divide-slate-100 dark:divide-slate-700/50">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="flex items-start gap-4 py-4">
                    <div className="h-10 w-10 shrink-0 animate-pulse rounded-xl bg-slate-200 dark:bg-slate-700" />
                    <div className="flex-1 space-y-2">
                      <div className="h-3.5 w-40 animate-pulse rounded bg-slate-200 dark:bg-slate-700" />
                      <div className="h-3 w-24 animate-pulse rounded bg-slate-100 dark:bg-slate-800" />
                      <div className="h-3 w-56 animate-pulse rounded bg-slate-100 dark:bg-slate-800" />
                    </div>
                    <div className="h-6 w-20 animate-pulse rounded-full bg-slate-200 dark:bg-slate-700" />
                  </div>
                ))}
              </div>
            ) : error ? (
              <div className="py-16 text-center">
                <p className="text-sm text-red-500">{error}</p>
                <button onClick={load} className="mt-3 text-xs text-indigo-600 underline">Coba lagi</button>
              </div>
            ) : filtered.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <UserGroupIcon className="mb-3 h-10 w-10 text-slate-300 dark:text-slate-600" />
                <p className="text-sm font-medium text-slate-500">Tidak ada data pegawai</p>
              </div>
            ) : (
              filtered.map(p => {
                const cfg = ROLE_CONFIG[p.role as Role] ?? ROLE_CONFIG['pegawai']
                return (
                  <div key={p.nip} className="flex items-center gap-4 py-4">
                    <div className={`relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-bold ${
                      p.aktif ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-400' : 'bg-slate-100 text-slate-400 dark:bg-slate-700'
                    }`}>
                      {p.nama.split(' ').map(n => n[0]).slice(0, 2).join('')}
                      {!p.aktif && (
                        <span className="absolute -bottom-0.5 -right-0.5 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-red-500 ring-2 ring-white dark:ring-slate-900">
                          <XMarkIcon className="h-2 w-2 text-white" />
                        </span>
                      )}
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">{p.nama}</span>
                        <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${cfg.bg} ${cfg.text}`}>{cfg.label}</span>
                        {!p.aktif && <span className="rounded-full bg-red-100 px-2 py-0.5 text-[10px] font-semibold text-red-600 dark:bg-red-900/30 dark:text-red-400">Nonaktif</span>}
                      </div>
                      <p className="mt-0.5 truncate text-xs text-slate-400">{p.nip} · {p.jabatan} · {p.unit}</p>
                      <p className="truncate text-[11px] text-slate-400">{p.email}</p>
                    </div>

                    <button onClick={() => setEditTarget(p)}
                      className="flex shrink-0 items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-600 transition hover:border-indigo-300 hover:text-indigo-600 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-300"
                    >
                      <PencilSquareIcon className="h-3.5 w-3.5" />
                      <span className="hidden sm:inline">Edit Akses</span>
                    </button>
                  </div>
                )
              })
            )}
          </div>

          <div className="px-6 py-4">
            <p className="text-xs text-slate-400">Menampilkan {filtered.length} dari {data.length} pegawai</p>
          </div>
        </div>
      </div>

      <AddPegawaiSheet
        open={showAdd}
        onClose={() => setShowAdd(false)}
        onSaved={load}
      />

      <EditRoleSheet
        pegawai={editTarget}
        onClose={() => setEditTarget(null)}
        onSave={handleSave}
      />
    </>
  )
}
