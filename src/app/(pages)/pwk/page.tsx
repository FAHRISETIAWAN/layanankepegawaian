'use client'

import { FileUpload } from '@/components/form/file-upload'
import { Pagination } from '@/components/ui/pagination'
import { daftarPWK, type DokumenPWK, type PWKRekomendasi, type StatusVerifikasi } from '@/data/pwk-data'
import { toast } from 'gooey-toast'
import { referensiApi, type MasterPegawai, type Satker } from '@/lib/api/referensi'
import {
  ArrowsRightLeftIcon,
  CheckCircleIcon,
  ChevronRightIcon,
  ClockIcon,
  MagnifyingGlassIcon,
  PaperClipIcon,
  PlusIcon,
  XCircleIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

function PegawaiCombobox({ value, onChange }: { value: MasterPegawai[]; onChange: (v: MasterPegawai[]) => void }) {
  const [query, setQuery] = useState('')
  const [open, setOpen] = useState(false)
  const [results, setResults] = useState<MasterPegawai[]>([])
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const t = setTimeout(() => {
      referensiApi.getMasterPegawai(query || undefined).then(setResults).catch(() => {})
    }, 300)
    return () => clearTimeout(t)
  }, [query])

  const filtered = results

  const isSelected = (p: MasterPegawai) => value.some(v => v.nip === p.nip)

  const toggle = (p: MasterPegawai) => {
    if (isSelected(p)) onChange(value.filter(v => v.nip !== p.nip))
    else onChange([...value, p])
    setQuery('')
  }

  return (
    <div ref={ref} className="space-y-2">
      <div className="relative">
        <div className={`flex h-10 items-center rounded-xl border px-3 text-sm transition ${
          open ? 'border-indigo-500 ring-1 ring-indigo-500' : 'border-slate-200 dark:border-slate-600'
        } bg-white dark:bg-slate-800`}>
          <MagnifyingGlassIcon className="mr-2 h-4 w-4 shrink-0 text-slate-400" />
          <input
            type="text"
            value={query}
            onChange={e => { setQuery(e.target.value); setOpen(true) }}
            onFocus={() => setOpen(true)}
            onBlur={() => setTimeout(() => setOpen(false), 150)}
            placeholder="Cari nama, NIP, unit..."
            className="flex-1 bg-transparent text-slate-700 placeholder-slate-400 outline-none dark:text-slate-200 dark:placeholder-slate-500"
          />
          {query && (
            <button type="button" onClick={() => setQuery('')} className="ml-1 text-slate-400 hover:text-slate-600">×</button>
          )}
        </div>

        <AnimatePresence>
          {open && filtered.length > 0 && (
            <motion.ul initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }} transition={{ duration: 0.12 }}
              className="absolute left-0 top-full z-50 mt-1.5 max-h-52 w-full overflow-y-auto rounded-xl border border-slate-200 bg-white py-1 shadow-lg dark:border-slate-700 dark:bg-slate-800">
              {filtered.map(p => {
                const sel = isSelected(p)
                return (
                  <li key={p.nip}>
                    <button type="button" onMouseDown={e => e.preventDefault()} onClick={() => toggle(p)}
                      className={`flex w-full items-center gap-3 px-3.5 py-2.5 text-left text-sm transition ${
                        sel ? 'bg-indigo-50 dark:bg-indigo-900/30' : 'hover:bg-slate-50 dark:hover:bg-slate-700/50'
                      }`}>
                      <span className={`flex h-4 w-4 shrink-0 items-center justify-center rounded border-2 ${
                        sel ? 'border-indigo-600 bg-indigo-600' : 'border-slate-300 dark:border-slate-600'
                      }`}>
                        {sel && <svg className="h-2.5 w-2.5 text-white" fill="none" viewBox="0 0 12 12">
                          <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>}
                      </span>
                      <div className="min-w-0">
                        <p className={`truncate font-medium ${sel ? 'text-indigo-700 dark:text-indigo-300' : 'text-slate-700 dark:text-slate-200'}`}>{p.nama}</p>
                        <p className="truncate text-xs text-slate-400">{p.nip} · {p.namajabatan}</p>
                      </div>
                    </button>
                  </li>
                )
              })}
            </motion.ul>
          )}
        </AnimatePresence>
      </div>

      {/* Badges pegawai terpilih */}
      {value.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {value.map(p => (
            <span key={p.nip} className="flex items-center gap-1.5 rounded-lg bg-indigo-50 px-2.5 py-1 text-xs font-medium text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300">
              {p.nama}
              <button type="button" onClick={() => onChange(value.filter(v => v.nip !== p.nip))}
                className="text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-200">
                <XMarkIcon className="h-3 w-3" />
              </button>
            </span>
          ))}
        </div>
      )}
    </div>
  )
}

const DOCS_PWK = [
  { key: 'rekomendasi',    label: 'Rekomendasi Pimpinan',           required: true },
  { key: 'analisis',       label: 'Analisis Rekomendasi Pimpinan',   required: true },
  { key: 'bebas_tunggakan',label: 'Surat Bebas Tunggakan Pekerjaan', required: true },
  { key: 'permohonan',     label: 'Surat Permohonan Pribadi',        required: true },
  { key: 'eviden',         label: 'Surat Eviden Alasan Perpindahan', required: true },
]

const TIMELINE_STEPS = [
  { key: 'verifikasiKanwil',       label: 'Kanwil' },
  { key: 'verifikasiKanwilTujuan', label: 'Kanwil Tujuan' },
  { key: 'verifikasiBiroSDM',      label: 'Biro SDM' },
  { key: 'selesai',                label: 'Selesai' },
] as const

function StatusTimeline({ r }: { r: PWKRekomendasi }) {
  const steps = [
    r.verifikasiKanwil,
    r.verifikasiKanwilTujuan,
    r.verifikasiBiroSDM,
    r.selesai ? 'disetujui' : 'menunggu',
  ] as StatusVerifikasi[]

  return (
    <div className="flex items-center gap-0">
      {TIMELINE_STEPS.map((step, i) => {
        const status = steps[i]
        const isDone = status === 'disetujui'
        const isRejected = status === 'ditolak'
        const isLast = i === TIMELINE_STEPS.length - 1

        return (
          <div key={step.key} className="flex items-center">
            {/* Node */}
            <div className="group relative flex flex-col items-center">
              <div className={`flex h-6 w-6 items-center justify-center rounded-full border-2 transition ${
                isDone
                  ? 'border-emerald-500 bg-emerald-500'
                  : isRejected
                  ? 'border-red-400 bg-red-400'
                  : 'border-slate-300 bg-white dark:border-slate-600 dark:bg-slate-800'
              }`}>
                {isDone && <CheckCircleIcon className="h-3.5 w-3.5 text-white" />}
                {isRejected && <XCircleIcon className="h-3.5 w-3.5 text-white" />}
                {!isDone && !isRejected && <ClockIcon className="h-3 w-3 text-slate-400 dark:text-slate-500" />}
              </div>
              {/* Tooltip label */}
              <span className="pointer-events-none absolute top-8 z-10 whitespace-nowrap rounded-lg bg-slate-800 px-2 py-1 text-[10px] text-slate-100 opacity-0 shadow-lg transition-opacity group-hover:opacity-100 dark:bg-slate-700">
                {step.label}
              </span>
            </div>
            {/* Connector */}
            {!isLast && (
              <div className={`h-0.5 w-5 ${isDone ? 'bg-emerald-400' : 'bg-slate-200 dark:bg-slate-700'}`} />
            )}
          </div>
        )
      })}
    </div>
  )
}

function KantahCombobox({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const [query, setQuery] = useState(value)
  const [open, setOpen] = useState(false)
  const [results, setResults] = useState<Satker[]>([])
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const t = setTimeout(() => {
      referensiApi.getSatker(query || undefined).then(setResults).catch(() => {})
    }, 300)
    return () => clearTimeout(t)
  }, [query])

  const filtered = results

  const handleSelect = (s: Satker) => { setQuery(s.satker); onChange(s.satkerid); setOpen(false) }

  return (
    <div ref={ref} className="relative">
      <div className={`flex h-10 items-center rounded-xl border px-3 text-sm transition ${open ? 'border-indigo-500 ring-1 ring-indigo-500' : 'border-slate-200 dark:border-slate-600'} bg-white dark:bg-slate-800`}>
        <MagnifyingGlassIcon className="mr-2 h-4 w-4 shrink-0 text-slate-400" />
        <input
          type="text"
          value={query}
          onChange={e => { setQuery(e.target.value); onChange(''); setOpen(true) }}
          onFocus={() => setOpen(true)}
          onBlur={() => setTimeout(() => setOpen(false), 150)}
          placeholder="Ketik nama kantah..."
          className="flex-1 bg-transparent text-slate-700 placeholder-slate-400 outline-none dark:text-slate-200 dark:placeholder-slate-500"
        />
        {query && <button type="button" onClick={() => { setQuery(''); onChange('') }} className="ml-1 text-slate-400 hover:text-slate-600">×</button>}
      </div>
      <AnimatePresence>
        {open && filtered.length > 0 && (
          <motion.ul initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }} transition={{ duration: 0.12 }}
            className="absolute left-0 top-full z-50 mt-1.5 max-h-48 w-full overflow-y-auto rounded-xl border border-slate-200 bg-white py-1 shadow-lg dark:border-slate-700 dark:bg-slate-800">
            {filtered.map(s => (
              <li key={s.satkerid}>
                <button type="button" onMouseDown={e => e.preventDefault()} onClick={() => handleSelect(s)}
                  className={`flex w-full items-center justify-between px-3.5 py-2 text-sm transition ${s.satkerid === value ? 'bg-indigo-50 font-semibold text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400' : 'text-slate-700 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-700/50'}`}>
                  {s.satker}
                  {s.satkerid === value && <span className="h-1.5 w-1.5 rounded-full bg-indigo-500" />}
                </button>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function PWKPage() {
  const [data, setData] = useState<PWKRekomendasi[]>(daftarPWK)
  const [search, setSearch] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [detail, setDetail] = useState<PWKRekomendasi | null>(null)
  const [page, setPage] = useState(1)

  const PAGE_SIZE = 20

  // Form state
  const [pegawaiList, setPegawaiList] = useState<MasterPegawai[]>([])
  const [kantahAsal, setKantahAsal] = useState('')
  const [kantahTujuan, setKantahTujuan] = useState('')
  const [dokumenMap, setDokumenMap] = useState<Record<string, File | null>>({})

  const filtered = data.filter(r => {
    const q = search.toLowerCase()
    return !q || r.pegawai.nama.toLowerCase().includes(q) || r.pegawai.nip.includes(q) || r.kantahTujuan.toLowerCase().includes(q)
  })

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE)
  const paged = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  const handleSimpan = () => {
    if (pegawaiList.length === 0 || !kantahTujuan) return
    const now = new Date()
    const tgl = `${String(now.getDate()).padStart(2, '0')} ${['Jan','Feb','Mar','Apr','Mei','Jun','Jul','Agu','Sep','Okt','Nov','Des'][now.getMonth()]} ${now.getFullYear()}`
    const dokumen: DokumenPWK[] = DOCS_PWK
      .map(d => {
        const f = dokumenMap[d.key]
        if (!f) return null
        return {
          nama: f.name,
          ukuran: f.size > 1024 * 1024 ? `${(f.size / 1024 / 1024).toFixed(1)} MB` : `${Math.round(f.size / 1024)} KB`,
        }
      })
      .filter((d): d is DokumenPWK => d !== null)
    const newEntries: PWKRekomendasi[] = pegawaiList.map((p, i) => ({
      id: `PWK-${String(data.length + i + 1).padStart(3, '0')}`,
      pegawai: { nip: p.nip, nama: p.nama, jabatan: p.namajabatan, unit: p.satker },
      kantahAsal: kantahAsal || p.satker,
      kantahTujuan,
      dokumen,
      tanggal: tgl,
      verifikasiKanwil: 'menunggu' as const,
      verifikasiKanwilTujuan: 'menunggu' as const,
      verifikasiBiroSDM: 'menunggu' as const,
      selesai: false,
    }))
    const updated = [...data, ...newEntries]
    setData(updated)
    daftarPWK.splice(0, daftarPWK.length, ...updated)
    setPegawaiList([])
    setKantahAsal('')
    setKantahTujuan('')
    setDokumenMap({} as Record<string, File | null>)
    setShowForm(false)
    toast.success({ title: 'Rekomendasi Ditambahkan', description: 'Data berhasil disimpan ke daftar PWK.' })
  }

  const canSimpan = pegawaiList.length > 0 && kantahTujuan.trim().length > 0

  return (
    <>
    <div className="min-h-screen bg-slate-50 px-4 py-8 dark:bg-slate-950 sm:px-6 lg:px-10">
      {/* Breadcrumb */}
      <nav className="mb-6 flex items-center gap-1.5 text-xs text-slate-400">
        <span className="cursor-pointer hover:text-slate-600 dark:hover:text-slate-300">Dashboard</span>
        <ChevronRightIcon className="h-3.5 w-3.5" />
        <span className="font-medium text-slate-700 dark:text-slate-200">Pindah Wilayah Kerja</span>
      </nav>

      <div className="rounded-2xl bg-white dark:bg-slate-900">
        {/* Header */}
        <div className="flex flex-col gap-3 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-100 dark:bg-orange-900/30">
              <ArrowsRightLeftIcon className="h-5 w-5 text-orange-600 dark:text-orange-400" />
            </div>
            <div>
              <h2 className="text-base font-semibold text-slate-800 dark:text-slate-100">Rekomendasi PWK</h2>
              <p className="mt-0.5 text-sm text-slate-400">Daftar pegawai yang direkomendasikan pindah wilayah kerja</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Cari nama, NIP, kantah..."
                className="h-9 w-full rounded-xl border border-slate-200 bg-white pl-9 pr-3 text-sm text-slate-700 placeholder-slate-400 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200 sm:w-60" />
            </div>
            <button onClick={() => setShowForm(true)}
              className="flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-indigo-500">
              <PlusIcon className="h-4 w-4" /> Tambah
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-y border-slate-100 bg-slate-50 dark:border-slate-700 dark:bg-slate-800/50">
                <th className="px-5 py-3 text-left text-xs font-medium uppercase tracking-wide text-slate-400">Pegawai</th>
                <th className="px-5 py-3 text-left text-xs font-medium uppercase tracking-wide text-slate-400">Kantah Asal</th>
                <th className="px-5 py-3 text-left text-xs font-medium uppercase tracking-wide text-slate-400">Kantah Tujuan</th>
                <th className="px-5 py-3 text-left text-xs font-medium uppercase tracking-wide text-slate-400">Dokumen</th>
                <th className="px-5 py-3 text-left text-xs font-medium uppercase tracking-wide text-slate-400 whitespace-nowrap">Tanggal</th>
                <th className="px-5 py-3 text-left text-xs font-medium uppercase tracking-wide text-slate-400">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
              {filtered.length === 0 ? (
                <tr><td colSpan={6} className="py-12 text-center text-sm text-slate-400">Tidak ada data</td></tr>
              ) : paged.map(r => (
                <tr key={r.id} onClick={() => setDetail(r)} className="cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/50">
                  {/* Pegawai */}
                  <td className="px-5 py-4">
                    <p className="font-medium text-slate-800 dark:text-slate-100">{r.pegawai.nama}</p>
                    <p className="mt-0.5 text-xs text-slate-400">{r.pegawai.nip}</p>
                    <p className="text-xs text-slate-400">{r.pegawai.jabatan}</p>
                  </td>
                  {/* Kantah */}
                  <td className="px-5 py-4 max-w-[150px]">
                    <span className="text-xs text-slate-600 line-clamp-2 dark:text-slate-300">{r.kantahAsal}</span>
                  </td>
                  <td className="px-5 py-4 max-w-[150px]">
                    <span className="text-xs text-slate-600 line-clamp-2 dark:text-slate-300">{r.kantahTujuan}</span>
                  </td>
                  {/* Dokumen ringkas */}
                  <td className="px-5 py-4">
                    {r.dokumen.length === 0 ? (
                      <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-500 dark:bg-slate-700 dark:text-slate-400">
                        Belum ada
                      </span>
                    ) : r.dokumen.length >= DOCS_PWK.length ? (
                      <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-medium text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400">
                        <CheckCircleIcon className="h-3 w-3" /> Lengkap
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-medium text-amber-700 dark:bg-amber-900/30 dark:text-amber-400">
                        <PaperClipIcon className="h-3 w-3" /> {r.dokumen.length}/{DOCS_PWK.length}
                      </span>
                    )}
                  </td>
                  {/* Tanggal */}
                  <td className="px-5 py-4 text-xs text-slate-500 whitespace-nowrap dark:text-slate-400">{r.tanggal}</td>
                  {/* Status timeline */}
                  <td className="px-5 py-4">
                    <StatusTimeline r={r} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
        <div className="border-t border-slate-100 px-6 py-3 dark:border-slate-700">
          <p className="text-xs text-slate-400">{filtered.length} dari {data.length} data</p>
        </div>
      </div>

      {/* Sheet Tambah — slide dari kanan */}
      <AnimatePresence>
        {showForm && (
          <>
            <motion.div key="overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-slate-950/40 backdrop-blur-sm" onClick={() => setShowForm(false)} />
            <motion.div key="sheet" initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed inset-y-0 right-0 z-50 flex w-full flex-col bg-white shadow-2xl dark:bg-slate-900">

              {/* Header */}
              <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4 dark:border-slate-700">
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-orange-100 dark:bg-orange-900/30">
                    <ArrowsRightLeftIcon className="h-4 w-4 text-orange-600 dark:text-orange-400" />
                  </div>
                  <h3 className="font-semibold text-slate-800 dark:text-slate-100">Tambah Rekomendasi PWK</h3>
                </div>
                <button onClick={() => setShowForm(false)} className="rounded-lg p-1 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800">
                  <XMarkIcon className="h-5 w-5" />
                </button>
              </div>

              {/* Body — scrollable */}
              <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">

                {/* Pilih pegawai */}
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">
                    Pegawai <span className="text-red-500">*</span>
                  </label>
                  <p className="mb-2 text-xs text-slate-400">Dapat memilih lebih dari satu pegawai</p>
                  <PegawaiCombobox value={pegawaiList} onChange={setPegawaiList} />
                </div>

                {/* Kantah asal */}
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">Kantah Asal</label>
                  <KantahCombobox value={kantahAsal} onChange={setKantahAsal} />
                </div>

                {/* Kantah tujuan */}
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">
                    Kantah Tujuan <span className="text-red-500">*</span>
                  </label>
                  <KantahCombobox value={kantahTujuan} onChange={setKantahTujuan} />
                </div>

                {/* Dokumen per jenis — grid 2 kolom */}
                <div>
                  <p className="mb-3 text-sm font-medium text-slate-700 dark:text-slate-300">Dokumen Pendukung</p>
                  <div className="grid grid-cols-2 gap-4">
                    {DOCS_PWK.map((doc, idx) => {
                      const isLastOdd = DOCS_PWK.length % 2 !== 0 && idx === DOCS_PWK.length - 1
                      return (
                        <div key={doc.key} className={isLastOdd ? 'col-span-2' : ''}>
                          <FileUpload
                            label={doc.label}
                            required={doc.required}
                            value={dokumenMap[doc.key] ?? null}
                            onChange={file => setDokumenMap(prev => ({ ...prev, [doc.key]: file }))}
                          />
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="flex gap-3 border-t border-slate-100 px-6 pb-6 pt-4 dark:border-slate-700">
                <button onClick={() => setShowForm(false)}
                  className="flex-1 rounded-xl border border-slate-200 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-50 dark:border-slate-600 dark:text-slate-300">
                  Batal
                </button>
                <button disabled={!canSimpan} onClick={handleSimpan}
                  className="flex-1 rounded-xl bg-indigo-600 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-40">
                  Simpan
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Sheet Detail */}
      <AnimatePresence>
        {detail && (
          <>
            <motion.div key="detail-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-slate-950/40 backdrop-blur-sm" onClick={() => setDetail(null)} />
            <motion.div key="detail-sheet" initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed inset-y-0 right-0 z-50 flex w-full max-w-md flex-col bg-white shadow-2xl dark:bg-slate-900">

              {/* Header */}
              <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4 dark:border-slate-700">
                <div>
                  <p className="text-xs font-medium text-slate-400">{detail.id}</p>
                  <h3 className="font-semibold text-slate-800 dark:text-slate-100">{detail.pegawai.nama}</h3>
                </div>
                <button onClick={() => setDetail(null)} className="rounded-lg p-1 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800">
                  <XMarkIcon className="h-5 w-5" />
                </button>
              </div>

              {/* Body */}
              <div className="flex-1 overflow-y-auto px-6 py-5 space-y-5">

                {/* Info pegawai */}
                <div className="rounded-xl border border-slate-100 dark:border-slate-700 divide-y divide-slate-100 dark:divide-slate-700">
                  {[
                    { label: 'NIP',        value: detail.pegawai.nip },
                    { label: 'Jabatan',    value: detail.pegawai.jabatan },
                    { label: 'Unit',       value: detail.pegawai.unit },
                    { label: 'Kantah Asal',   value: detail.kantahAsal },
                    { label: 'Kantah Tujuan', value: detail.kantahTujuan },
                    { label: 'Tanggal',    value: detail.tanggal },
                  ].map(({ label, value }) => (
                    <div key={label} className="flex items-start justify-between px-4 py-3">
                      <span className="text-xs text-slate-400 w-28 shrink-0">{label}</span>
                      <span className="text-xs font-medium text-slate-700 dark:text-slate-200 text-right">{value}</span>
                    </div>
                  ))}
                </div>

                {/* Status timeline */}
                <div>
                  <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-slate-400">Status Verifikasi</p>
                  <div className="space-y-2">
                    {([
                      { label: 'Verifikasi Kanwil',        status: detail.verifikasiKanwil },
                      { label: 'Verifikasi Kanwil Tujuan', status: detail.verifikasiKanwilTujuan },
                      { label: 'Verifikasi Biro SDM',      status: detail.verifikasiBiroSDM },
                      { label: 'Selesai',                  status: detail.selesai ? 'disetujui' : 'menunggu' },
                    ] as { label: string; status: StatusVerifikasi }[]).map(({ label, status }) => (
                      <div key={label} className="flex items-center justify-between rounded-xl border border-slate-100 px-4 py-2.5 dark:border-slate-700">
                        <span className="text-sm text-slate-600 dark:text-slate-300">{label}</span>
                        <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                          status === 'disetujui' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400'
                          : status === 'ditolak'  ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                          : 'bg-slate-100 text-slate-500 dark:bg-slate-700 dark:text-slate-400'
                        }`}>
                          {status === 'disetujui' ? <CheckCircleIcon className="h-3 w-3" />
                           : status === 'ditolak'  ? <XCircleIcon className="h-3 w-3" />
                           : <ClockIcon className="h-3 w-3" />}
                          {status === 'disetujui' ? 'Disetujui' : status === 'ditolak' ? 'Ditolak' : 'Menunggu'}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Dokumen */}
                <div>
                  <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-slate-400">Dokumen ({detail.dokumen.length}/{DOCS_PWK.length})</p>
                  {detail.dokumen.length === 0 ? (
                    <p className="text-sm text-slate-400">Belum ada dokumen diunggah.</p>
                  ) : (
                    <div className="space-y-2">
                      {detail.dokumen.map((dok, i) => (
                        <div key={i} className="flex items-center gap-3 rounded-xl border border-slate-100 px-4 py-2.5 dark:border-slate-700">
                          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-red-500">
                            <span className="text-[9px] font-bold text-white">PDF</span>
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="truncate text-xs font-medium text-slate-700 dark:text-slate-200">{dok.nama}</p>
                            <p className="text-[10px] text-slate-400">{dok.ukuran}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
    </>
  )
}
