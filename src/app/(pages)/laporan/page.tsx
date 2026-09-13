'use client'

import { dataLaporan, namaBulan } from '@/data/laporan-data'
import type { StatusPengajuan } from '@/data/verifikasi-data'
import {
  AcademicCapIcon,
  BriefcaseIcon,
  CheckCircleIcon,
  ChevronRightIcon,
  DocumentArrowDownIcon,
  FunnelIcon,
  MagnifyingGlassIcon,
  UserGroupIcon,
  XCircleIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
import { Pagination } from '@/components/ui/pagination'
import { useState } from 'react'

const statusConfig: Record<StatusPengajuan, { label: string; bg: string; text: string }> = {
  menunggu:     { label: 'Menunggu',     bg: 'bg-amber-100 dark:bg-amber-900/30',     text: 'text-amber-700 dark:text-amber-400' },
  diproses:     { label: 'Diproses',     bg: 'bg-indigo-100 dark:bg-indigo-900/30',   text: 'text-indigo-700 dark:text-indigo-400' },
  diverifikasi: { label: 'Diverifikasi', bg: 'bg-emerald-100 dark:bg-emerald-900/30', text: 'text-emerald-700 dark:text-emerald-400' },
  ditolak:      { label: 'Ditolak',      bg: 'bg-red-100 dark:bg-red-900/30',         text: 'text-red-700 dark:text-red-400' },
}

const tahunList = Array.from({ length: new Date().getFullYear() - 2026 + 1 }, (_, i) => 2026 + i)

const statusFilterList: { key: StatusPengajuan | 'semua'; label: string }[] = [
  { key: 'semua',        label: 'Semua Status' },
  { key: 'diverifikasi', label: 'Diverifikasi' },
  { key: 'ditolak',      label: 'Ditolak' },
  { key: 'diproses',     label: 'Diproses' },
  { key: 'menunggu',     label: 'Menunggu' },
]

export default function LaporanPage() {
  const now = new Date()
  const [bulan, setBulan]           = useState<number>(now.getMonth() + 1)
  const [tahun, setTahun]           = useState<number>(2026)
  const [status, setStatus]         = useState<StatusPengajuan | 'semua'>('semua')
  const [search, setSearch]         = useState('')
  const [showFilter, setShowFilter] = useState(false)
  const [page, setPage]             = useState(1)

  const PAGE_SIZE = 20

  const [draftBulan, setDraftBulan]   = useState<number>(now.getMonth() + 1)
  const [draftTahun, setDraftTahun]   = useState<number>(2026)
  const [draftStatus, setDraftStatus] = useState<StatusPengajuan | 'semua'>('semua')

  const openFilter = () => {
    setDraftBulan(bulan); setDraftTahun(tahun); setDraftStatus(status)
    setShowFilter(true)
  }
  const applyFilter = () => {
    setBulan(draftBulan); setTahun(draftTahun); setStatus(draftStatus)
    setShowFilter(false)
  }
  const resetFilter = () => { setDraftBulan(0); setDraftTahun(2026); setDraftStatus('semua') }

  const activeCount = (bulan !== 0 ? 1 : 0) + (status !== 'semua' ? 1 : 0)

  const bulanOptions  = [{ value: 0, label: 'Semua Bulan' }, ...namaBulan.map((n, i) => ({ value: i + 1, label: n }))]
  const tahunOptions  = tahunList.map(t => ({ value: t, label: String(t) }))
  const statusOptions = statusFilterList.map(s => ({ value: s.key, label: s.label }))

  const filtered = dataLaporan.filter((item) => {
    const matchBulan  = bulan === 0 || item.bulan === bulan
    const matchTahun  = item.tahun === tahun
    const matchStatus = status === 'semua' || item.status === status
    const q           = search.toLowerCase()
    const matchSearch = !q || item.kode.toLowerCase().includes(q) || item.nomorSurat.toLowerCase().includes(q) || item.pegawai.some(p => p.nama.toLowerCase().includes(q))
    return matchBulan && matchTahun && matchStatus && matchSearch
  })

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE)
  const paged      = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  const total           = filtered.length
  const totalVerifikasi = filtered.filter(d => d.status === 'diverifikasi').length
  const totalDitolak    = filtered.filter(d => d.status === 'ditolak').length
  const totalPegawai    = filtered.reduce((s, d) => s + d.pegawai.length, 0)
  const periodeLabel    = bulan === 0 ? `Tahun ${tahun}` : `${namaBulan[bulan - 1]} ${tahun}`

  const stats = [
    {
      label: 'Total Pengajuan', value: total, sub: periodeLabel,
      icon: <DocumentArrowDownIcon className="h-5 w-5" />,
      iconBg: 'bg-indigo-100 text-indigo-600 dark:bg-indigo-900/40 dark:text-indigo-400',
    },
    {
      label: 'Diverifikasi', value: totalVerifikasi,
      sub: `${total ? Math.round(totalVerifikasi / total * 100) : 0}% dari total`,
      icon: <CheckCircleIcon className="h-5 w-5" />,
      iconBg: 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/40 dark:text-emerald-400',
    },
    {
      label: 'Ditolak', value: totalDitolak,
      sub: `${total ? Math.round(totalDitolak / total * 100) : 0}% dari total`,
      icon: <XCircleIcon className="h-5 w-5" />,
      iconBg: 'bg-red-100 text-red-600 dark:bg-red-900/40 dark:text-red-400',
    },
    {
      label: 'Total Pegawai', value: totalPegawai, sub: 'diajukan periode ini',
      icon: <UserGroupIcon className="h-5 w-5" />,
      iconBg: 'bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-400',
    },
  ]

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-8 dark:bg-slate-950 sm:px-6 lg:px-10">

      {/* Page heading */}
      <div className="mb-6 flex flex-wrap items-start justify-between gap-3">
        <div>
          <nav className="mb-1 flex items-center gap-1.5 text-xs text-slate-400">
            <span>Dashboard</span>
            <ChevronRightIcon className="h-3 w-3" />
            <span className="font-medium text-slate-600 dark:text-slate-300">Laporan Pengajuan</span>
          </nav>
          <h1 className="text-xl font-bold text-slate-800 dark:text-slate-100">Laporan Pengajuan</h1>
          <p className="mt-0.5 text-sm text-slate-400">Rekap data IPG &amp; TUBEL · {periodeLabel}</p>
        </div>
        <button className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-600  transition hover:border-indigo-300 hover:text-indigo-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300">
          <DocumentArrowDownIcon className="h-4 w-4" />
          Export Excel
        </button>
      </div>

      {/* Stat cards */}
      <div className="mb-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {stats.map(s => (
          <div key={s.label} className="rounded-2xl bg-white p-5  dark:bg-slate-900">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{s.label}</p>
                <p className="mt-2 text-3xl font-bold text-slate-800 dark:text-slate-100">{s.value}</p>
              </div>
              <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${s.iconBg}`}>
                {s.icon}
              </div>
            </div>
            <p className="mt-3 text-xs text-slate-400">{s.sub}</p>
          </div>
        ))}
      </div>

      {/* Table card */}
      <div className="rounded-2xl bg-white  dark:bg-slate-900">
        {/* Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-4">
          <h2 className="text-sm font-semibold text-slate-700 dark:text-slate-200">
            Semua Pengajuan
            <span className="ml-2 rounded-full bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-500 dark:bg-slate-700 dark:text-slate-400">
              {filtered.length}
            </span>
          </h2>
          <div className="flex items-center gap-2">
            {/* Search */}
            <div className="relative">
              <MagnifyingGlassIcon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Cari kode, surat, pegawai..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="h-9 w-56 rounded-xl border border-slate-200 bg-slate-50 pl-9 pr-3 text-sm text-slate-700 placeholder-slate-400 outline-none transition focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
              />
            </div>
            {/* Filter button */}
            <button
              onClick={openFilter}
              className="relative flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 transition hover:border-indigo-300 hover:text-indigo-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300"
            >
              <FunnelIcon className="h-4 w-4" />
              {activeCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-indigo-600 text-[10px] font-bold text-white">
                  {activeCount}
                </span>
              )}
            </button>
          </div>
        </div>

        <div className="border-t border-slate-100 dark:border-slate-700/60" />

        {/* Table */}
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <FunnelIcon className="mb-3 h-10 w-10 text-slate-200 dark:text-slate-700" />
            <p className="text-sm font-medium text-slate-500">Tidak ada data untuk filter ini</p>
            <p className="text-xs text-slate-400">Coba ubah bulan, tahun, atau status</p>
          </div>
        ) : (
          <>
            {/* Desktop table */}
            <div className="hidden overflow-x-auto sm:block">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-100 bg-slate-50/70 dark:border-slate-700/60 dark:bg-slate-800/40">
                    <th className="px-5 py-3 text-left text-xs font-semibold text-slate-500 dark:text-slate-400">Kode</th>
                    <th className="px-5 py-3 text-left text-xs font-semibold text-slate-500 dark:text-slate-400">Layanan</th>
                    <th className="px-5 py-3 text-left text-xs font-semibold text-slate-500 dark:text-slate-400">Nomor Surat</th>
                    <th className="px-5 py-3 text-left text-xs font-semibold text-slate-500 dark:text-slate-400">Pegawai</th>
                    <th className="px-5 py-3 text-left text-xs font-semibold text-slate-500 dark:text-slate-400">Tanggal</th>
                    <th className="px-5 py-3 text-left text-xs font-semibold text-slate-500 dark:text-slate-400">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-700/60">
                  {paged.map((item) => {
                    const st    = statusConfig[item.status]
                    const isIPG = item.layanan.startsWith('IPG')
                    return (
                      <tr key={item.id} className="transition hover:bg-slate-50/80 dark:hover:bg-slate-800/30">
                        <td className="px-5 py-3.5">
                          <div className="flex items-center gap-2.5">
                            <div className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg ${
                              isIPG ? 'bg-indigo-100 text-indigo-600 dark:bg-indigo-900/40 dark:text-indigo-400'
                                    : 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/40 dark:text-emerald-400'
                            }`}>
                              {isIPG ? <BriefcaseIcon className="h-3.5 w-3.5" /> : <AcademicCapIcon className="h-3.5 w-3.5" />}
                            </div>
                            <span className="font-mono text-xs font-semibold text-slate-700 dark:text-slate-200">{item.kode}</span>
                          </div>
                        </td>
                        <td className="px-5 py-3.5 text-xs text-slate-600 dark:text-slate-300">{item.layanan}</td>
                        <td className="px-5 py-3.5 font-mono text-xs text-slate-500 dark:text-slate-400">{item.nomorSurat}</td>
                        <td className="px-5 py-3.5 text-xs text-slate-700 dark:text-slate-200">
                          {item.pegawai[0].nama}
                          {item.pegawai.length > 1 && (
                            <span className="ml-1.5 rounded-full bg-slate-100 px-1.5 py-0.5 text-[10px] text-slate-500 dark:bg-slate-700 dark:text-slate-400">
                              +{item.pegawai.length - 1}
                            </span>
                          )}
                        </td>
                        <td className="px-5 py-3.5 text-xs text-slate-500 dark:text-slate-400">{item.tanggal}</td>
                        <td className="px-5 py-3.5">
                          <span className={`rounded-full px-2.5 py-1 text-[10px] font-semibold ${st.bg} ${st.text}`}>
                            {st.label}
                          </span>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>

            {/* Mobile list */}
            <div className="divide-y divide-slate-100 px-4 dark:divide-slate-700/60 sm:hidden">
              {paged.map((item) => {
                const st    = statusConfig[item.status]
                const isIPG = item.layanan.startsWith('IPG')
                return (
                  <div key={item.id} className="flex items-center gap-3 py-3.5">
                    <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${
                      isIPG ? 'bg-indigo-100 text-indigo-600 dark:bg-indigo-900/40 dark:text-indigo-400'
                            : 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/40 dark:text-emerald-400'
                    }`}>
                      {isIPG ? <BriefcaseIcon className="h-4 w-4" /> : <AcademicCapIcon className="h-4 w-4" />}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="font-mono text-xs font-semibold text-slate-700 dark:text-slate-200">{item.kode}</p>
                      <p className="truncate text-[11px] text-slate-400">{item.layanan} · {item.tanggal}</p>
                      <p className="truncate text-[11px] text-slate-500">{item.pegawai[0].nama}{item.pegawai.length > 1 ? ` +${item.pegawai.length - 1}` : ''}</p>
                    </div>
                    <span className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold ${st.bg} ${st.text}`}>
                      {st.label}
                    </span>
                  </div>
                )
              })}
            </div>

            <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
            {/* Footer count */}
            <div className="border-t border-slate-100 px-5 py-3 dark:border-slate-700/60">
              <p className="text-xs text-slate-400">{filtered.length} data · {totalPegawai} pegawai</p>
            </div>
          </>
        )}
      </div>

      {/* Filter Sheet */}
      {showFilter && (
        <div className="fixed inset-0 z-40 flex justify-end">
          <div className="flex-1 bg-slate-950/40 backdrop-blur-sm" onClick={() => setShowFilter(false)} />
          <div className="flex w-80 flex-col bg-white shadow-2xl dark:bg-slate-900">
            <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4 dark:border-slate-700">
              <div>
                <p className="text-sm font-semibold text-slate-800 dark:text-slate-100">Filter Data</p>
                <p className="mt-0.5 text-xs text-slate-400">Bulan, tahun &amp; status pengajuan</p>
              </div>
              <button
                type="button"
                onClick={() => setShowFilter(false)}
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-slate-200 bg-slate-50 text-slate-500 transition hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800"
              >
                <XMarkIcon className="h-4 w-4" />
              </button>
            </div>

            <div className="flex-1 space-y-5 overflow-y-auto px-5 py-5">
              <div>
                <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-400">Bulan</p>
                <div className="grid grid-cols-3 gap-1.5">
                  {bulanOptions.map(opt => (
                    <button key={opt.value} type="button" onClick={() => setDraftBulan(opt.value)}
                      className={`rounded-lg px-2 py-1.5 text-xs font-medium transition ${
                        draftBulan === opt.value
                          ? 'bg-indigo-600 text-white'
                          : 'border border-slate-200 text-slate-600 hover:border-indigo-300 hover:text-indigo-600 dark:border-slate-700 dark:text-slate-300'
                      }`}
                    >{opt.label}</button>
                  ))}
                </div>
              </div>

              <div>
                <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-400">Tahun</p>
                <div className="grid grid-cols-3 gap-1.5">
                  {tahunOptions.map(opt => (
                    <button key={opt.value} type="button" onClick={() => setDraftTahun(opt.value)}
                      className={`rounded-lg px-2 py-1.5 text-xs font-medium transition ${
                        draftTahun === opt.value
                          ? 'bg-indigo-600 text-white'
                          : 'border border-slate-200 text-slate-600 hover:border-indigo-300 hover:text-indigo-600 dark:border-slate-700 dark:text-slate-300'
                      }`}
                    >{opt.label}</button>
                  ))}
                </div>
              </div>

              <div>
                <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-400">Status</p>
                <div className="space-y-1.5">
                  {statusOptions.map(opt => (
                    <button key={opt.value} type="button"
                      onClick={() => setDraftStatus(opt.value as StatusPengajuan | 'semua')}
                      className={`flex w-full items-center justify-between rounded-lg border px-3 py-2 text-sm transition ${
                        draftStatus === opt.value
                          ? 'border-indigo-500 bg-indigo-50 font-semibold text-indigo-700 dark:border-indigo-600 dark:bg-indigo-900/20 dark:text-indigo-300'
                          : 'border-slate-200 text-slate-600 hover:border-slate-300 dark:border-slate-700 dark:text-slate-300'
                      }`}
                    >
                      {opt.label}
                      {draftStatus === opt.value && <span className="h-2 w-2 rounded-full bg-indigo-500" />}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="border-t border-slate-100 px-5 py-4 dark:border-slate-700">
              <div className="flex gap-2">
                <button type="button" onClick={resetFilter}
                  className="flex-1 rounded-xl border border-slate-200 py-2.5 text-sm font-medium text-slate-600 transition hover:border-slate-300 dark:border-slate-700 dark:text-slate-300">
                  Reset
                </button>
                <button type="button" onClick={applyFilter}
                  className="flex-1 rounded-xl bg-indigo-600 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-500">
                  Terapkan
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
