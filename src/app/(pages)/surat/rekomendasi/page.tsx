'use client'

import { DatePicker } from '@/components/form/date-picker'
import { FileUpload } from '@/components/form/file-upload'
import { daftarRekomendasiUjiKom, type RekomendasiUjiKom } from '@/data/rekomendasi-data'
import {
  CheckCircleIcon,
  ChevronRightIcon,
  DocumentTextIcon,
  MagnifyingGlassIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
import { CheckCircleIcon as CheckSolid } from '@heroicons/react/24/solid'
import { Pagination } from '@/components/ui/pagination'
import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'

// ── Upload Sheet ───────────────────────────────────────────────────────────
function UploadSheet({
  pegawai,
  onClose,
  onSave,
}: {
  pegawai: RekomendasiUjiKom | null
  onClose: () => void
  onSave: (id: string, data: { nomorRekomendasi: string; tanggalSurat: string; file: File | null }) => void
}) {
  const [nomor, setNomor]     = useState(pegawai?.nomorRekomendasi ?? '')
  const [tanggal, setTanggal] = useState(pegawai?.tanggalSurat ?? '')
  const [file, setFile]       = useState<File | null>(null)
  const [done, setDone]       = useState(false)

  if (!pegawai) return null

  const canSave = nomor.trim().length >= 3 && !!tanggal && !!file

  const handleSave = () => {
    if (!canSave) return
    onSave(pegawai.id, { nomorRekomendasi: nomor, tanggalSurat: tanggal, file })
    setDone(true)
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
            {/* Header */}
            <div className="flex shrink-0 items-center gap-3 border-b border-slate-100 px-5 py-4 dark:border-slate-700">
              <button onClick={onClose}
                className="flex h-8 w-8 items-center justify-center rounded-full text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800">
                <XMarkIcon className="h-5 w-5" />
              </button>
              <div>
                <p className="font-semibold text-slate-800 dark:text-slate-100">Surat Rekomendasi UjiKom</p>
                <p className="text-xs text-slate-400">{pegawai.kode} · Uji Kompetensi JF</p>
              </div>
            </div>

            {/* Body */}
            <div className="flex-1 overflow-y-auto p-5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              <AnimatePresence mode="wait">
                {done ? (
                  <motion.div key="done"
                    initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center gap-4 py-16 text-center"
                  >
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900/30">
                      <CheckSolid className="h-9 w-9 text-emerald-500" />
                    </div>
                    <div>
                      <p className="font-semibold text-slate-800 dark:text-slate-100">Berhasil Disimpan</p>
                      <p className="mt-1 text-sm text-slate-400">Surat pemanggilan UjiKom telah diupload.</p>
                    </div>
                    <button onClick={onClose}
                      className="mt-2 rounded-xl bg-indigo-600 px-6 py-2 text-sm font-semibold text-white transition hover:bg-indigo-500">
                      Tutup
                    </button>
                  </motion.div>
                ) : (
                  <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-5">
                    {/* Info pegawai */}
                    <div className="flex items-center gap-3 rounded-xl bg-slate-50 px-4 py-3 dark:bg-slate-800">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-rose-100 text-sm font-bold text-rose-600 dark:bg-rose-900/40 dark:text-rose-400">
                        {pegawai.nama.split(' ').map(n => n[0]).slice(0, 2).join('')}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">{pegawai.nama}</p>
                        <p className="text-xs text-slate-400">{pegawai.nip} · {pegawai.jabatan}</p>
                      </div>
                    </div>

                    {/* Jenis */}
                    <div className="flex items-center gap-2 rounded-xl border border-rose-100 bg-rose-50 px-4 py-2.5 dark:border-rose-900/30 dark:bg-rose-900/10">
                      <span className="text-xs font-medium text-rose-600 dark:text-rose-400">Uji Kompetensi JF – {pegawai.subLayanan}</span>
                    </div>

                    {/* Nomor Rekomendasi */}
                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">
                        Nomor Rekomendasi <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={nomor}
                        onChange={e => setNomor(e.target.value.toUpperCase())}
                        placeholder="REC/UJIKOM/001/BKN/2026"
                        className="h-10 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm uppercase text-slate-700 placeholder-slate-400 outline-none transition focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200 dark:placeholder-slate-500"
                      />
                    </div>

                    {/* Tanggal Surat */}
                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">
                        Tanggal Surat <span className="text-red-500">*</span>
                      </label>
                      <DatePicker value={tanggal} onChange={setTanggal} placeholder="Pilih tanggal surat..." />
                    </div>

                    {/* Upload */}
                    <FileUpload
                      label="Surat Pemanggilan Uji Kompetensi"
                      required
                      value={file}
                      onChange={setFile}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Footer */}
            {!done && (
              <div className="flex shrink-0 items-center gap-3 border-t border-slate-100 px-5 py-4 dark:border-slate-700">
                <button
                  onClick={handleSave}
                  disabled={!canSave}
                  className="rounded-xl bg-indigo-600 px-5 py-2 text-sm font-semibold text-white transition hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Simpan
                </button>
                <button
                  onClick={onClose}
                  className="rounded-xl border border-slate-200 px-5 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-50 dark:border-slate-600 dark:text-slate-300 dark:hover:bg-slate-800"
                >
                  Batal
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

// ── Main Page ──────────────────────────────────────────────────────────────
export default function SuratRekomendasiPage() {
  const [data, setData]             = useState(daftarRekomendasiUjiKom)
  const [tab, setTab]               = useState<'belum' | 'sudah'>('belum')
  const [search, setSearch]         = useState('')
  const [selected, setSelected]     = useState<RekomendasiUjiKom | null>(null)
  const [page, setPage]             = useState(1)

  const PAGE_SIZE = 20

  const filtered = data.filter(d => {
    if (d.status !== tab) return false
    const q = search.toLowerCase()
    return !q || d.nama.toLowerCase().includes(q) || d.nip.includes(q) || d.kode.toLowerCase().includes(q)
  })

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE)
  const paged = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  const handleSave = (id: string, payload: { nomorRekomendasi: string; tanggalSurat: string; file: File | null }) => {
    setData(prev => prev.map(d =>
      d.id === id
        ? { ...d, nomorRekomendasi: payload.nomorRekomendasi, tanggalSurat: payload.tanggalSurat, fileSurat: payload.file?.name, status: 'sudah' as const }
        : d
    ))
    setSelected(null)
  }

  return (
    <>
      <div className="min-h-screen bg-slate-50 px-4 py-8 dark:bg-slate-950 sm:px-6 lg:px-10">
        {/* Breadcrumb */}
        <nav className="mb-6 flex items-center gap-1.5 text-xs text-slate-400">
          <span className="cursor-pointer hover:text-slate-600 dark:hover:text-slate-300">Dashboard</span>
          <ChevronRightIcon className="h-3.5 w-3.5" />
          <span className="text-slate-500 dark:text-slate-400">Kepegawaian</span>
          <ChevronRightIcon className="h-3.5 w-3.5" />
          <span className="font-medium text-slate-700 dark:text-slate-200">Surat Rekomendasi</span>
        </nav>

        <div className="rounded-2xl bg-white dark:bg-slate-900">
          {/* Card header */}
          <div className="flex flex-col gap-3 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-base font-semibold text-slate-800 dark:text-slate-100">Rekomendasi Pindah Wilayah Kerja</h2>
              <p className="mt-0.5 text-sm text-slate-400">Rekomendasi Pindah Wilayah Kerja pegawai</p>
            </div>
            <div className="relative w-full sm:w-64">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Cari nama, NIP, kode..."
                className="w-full rounded-lg border border-slate-200 bg-slate-50 py-2 pl-9 pr-4 text-sm text-slate-700 outline-none transition focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200 dark:placeholder-slate-400"
              />
            </div>
          </div>

          {/* Tabs */}
          <div className="flex border-b border-slate-100 px-6 dark:border-slate-700">
            {(['belum', 'sudah'] as const).map(t => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`mr-6 pb-3 text-sm font-medium transition-colors border-b-2 ${
                  tab === t
                    ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400 dark:border-indigo-400'
                    : 'border-transparent text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'
                }`}
              >
                {t === 'belum' ? 'Belum Upload' : 'Sudah Upload'}
                <span className={`ml-2 rounded-full px-1.5 py-0.5 text-[10px] font-semibold ${
                  tab === t ? 'bg-indigo-100 text-indigo-600 dark:bg-indigo-900/40' : 'bg-slate-100 text-slate-400 dark:bg-slate-800'
                }`}>
                  {data.filter(d => d.status === t).length}
                </span>
              </button>
            ))}
          </div>

          {/* List */}
          <div className="flex flex-col gap-3 px-6 py-4">
            {filtered.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <DocumentTextIcon className="mb-3 h-10 w-10 text-slate-200 dark:text-slate-700" />
                <p className="text-sm font-medium text-slate-400">Tidak ada data</p>
              </div>
            ) : (
              paged.map(item => (
                <div key={item.id} className="flex items-center gap-4 rounded-xl border border-slate-100 px-4 py-3.5 dark:border-slate-700/60">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-rose-100 text-sm font-bold text-rose-600 dark:bg-rose-900/40 dark:text-rose-400">
                    {item.nama.split(' ').map(n => n[0]).slice(0, 2).join('')}
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                      <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">{item.nama}</span>
                      <span className="rounded-full bg-rose-100 px-2 py-0.5 text-[10px] font-semibold text-rose-600 dark:bg-rose-900/30 dark:text-rose-400">
                        UjiKom JF – {item.subLayanan}
                      </span>
                    </div>
                    <p className="mt-0.5 text-xs text-slate-400">{item.nip} · {item.jabatan} · {item.unit}</p>
                    <p className="mt-0.5 font-mono text-xs text-slate-400">{item.kode} · {item.tanggalPengajuan}</p>
                    {item.status === 'sudah' && item.nomorRekomendasi && (
                      <p className="mt-0.5 text-xs text-emerald-600 dark:text-emerald-400">
                        {item.nomorRekomendasi} · {item.tanggalSurat}
                      </p>
                    )}
                  </div>

                  <div className="flex shrink-0 items-center gap-2">
                    {item.status === 'sudah' && (
                      <CheckCircleIcon className="h-5 w-5 text-emerald-500" />
                    )}
                    <button
                      onClick={() => setSelected(item)}
                      className="rounded-lg border border-indigo-200 bg-indigo-50 px-4 py-2 text-xs font-semibold text-indigo-600 transition hover:bg-indigo-100 dark:border-indigo-800/50 dark:bg-indigo-900/20 dark:text-indigo-400"
                    >
                      {item.status === 'sudah' ? 'Ubah' : 'Upload'}
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
          <div className="px-6 pb-5">
            <p className="text-xs text-slate-400">Menampilkan {paged.length} dari {filtered.length} pegawai</p>
          </div>
        </div>
      </div>

      <UploadSheet
        pegawai={selected}
        onClose={() => setSelected(null)}
        onSave={handleSave}
      />
    </>
  )
}
