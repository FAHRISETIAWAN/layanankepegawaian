'use client'

import { FileUpload } from '@/components/form/file-upload'
import { RichTextEditor } from '@/components/form/rich-text-editor'
import { daftarPegawai } from '@/data/pegawai-data'
import { daftarPWK } from '@/data/pwk-data'
import {
  ArrowTopRightOnSquareIcon,
  CheckCircleIcon,
  ChevronRightIcon,
  DocumentIcon,
  ExclamationCircleIcon,
  PaperClipIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
import { CheckCircleIcon as CheckSolid } from '@heroicons/react/24/solid'
import { AnimatePresence, motion } from 'framer-motion'
import { useRouter, useSearchParams } from 'next/navigation'
import { Suspense, useState } from 'react'

// ── Dokumen per layanan ────────────────────────────────────────────────────
interface DocField { key: string; label: string; required: boolean; note?: string }

const DOCS_IPG_PROFESI: DocField[] = [
  { key: 'skp',     label: 'SKP 2 Tahun Terakhir',              required: true, note: 'Minimal bernilai Baik' },
  { key: 'pangkat', label: 'SK Pangkat dan SK Jabatan Terakhir', required: true },
  { key: 'sk_pns',  label: 'SK PNS dan SK CPNS',                required: true },
  { key: 'ijazah',  label: 'Ijazah Terakhir',                   required: true },
]

const DOCS_IPG_SERTIFIKASI: DocField[] = [
  { key: 'skp',       label: 'SKP 2 Tahun Terakhir',              required: true, note: 'Minimal bernilai Baik' },
  { key: 'pangkat',   label: 'SK Pangkat dan SK Jabatan Terakhir', required: true },
  { key: 'sk_pns',    label: 'SK PNS dan SK CPNS',                required: true },
  { key: 'sertif',    label: 'Ijazah',                            required: true },
  { key: 'transkrip', label: 'Transkrip Nilai',                   required: true },
]

const DOCS_IPG_AKADEMIK: DocField[] = [
  { key: 'skp',      label: 'SKP 2 Tahun Terakhir',              required: true, note: 'Minimal bernilai Baik' },
  { key: 'pangkat',  label: 'SK Pangkat dan SK Jabatan Terakhir', required: true },
  { key: 'sk_pns',   label: 'SK PNS dan SK CPNS',                required: true },
  { key: 'ijazah',   label: 'Ijazah Terakhir',                   required: true },
  { key: 'proposal', label: 'Proposal Studi / Rencana Akademik', required: true },
]

const DOCS_TUBEL_MANDIRI: DocField[] = [
  { key: 'permohonan',  label: 'Surat Permohonan Pribadi',                        required: true,  note: 'Tertulis jelas nama univ, prodi, dan waktu kuliah' },
  { key: 'sk_pns',      label: 'SK PNS dan SK CPNS',                              required: true },
  { key: 'pangkat',     label: 'SK Pangkat dan SK Jabatan Terakhir',              required: true },
  { key: 'skp',         label: 'SKP 2 Tahun Terakhir',                            required: true,  note: 'Minimal bernilai Baik' },
  { key: 'bebas_hukdis',label: 'Surat Bebas Hukdis',                             required: true,  note: 'Dari Kakanwil / Kabiro SDM untuk PNS Pusat' },
  { key: 'pengantar',   label: 'Surat Usulan Pengantar dari Kanwil',             required: true,  note: 'Tertulis jelas nama univ, prodi, dan waktu mulai kuliah' },
  { key: 'mhs',         label: 'Surat Keterangan Mahasiswa',                      required: false, note: 'Jika sudah aktif sebagai mahasiswa' },
]

const DOCS_TUBEL_BEASISWA: DocField[] = [
  { key: 'permohonan',  label: 'Surat Permohonan Pribadi',                        required: true,  note: 'Tertulis jelas nama univ, prodi, dan waktu kuliah' },
  { key: 'sk_pns',      label: 'SK PNS dan SK CPNS',                              required: true },
  { key: 'pangkat',     label: 'SK Pangkat dan SK Jabatan Terakhir',              required: true },
  { key: 'skp',         label: 'SKP 2 Tahun Terakhir',                            required: true,  note: 'Minimal bernilai Baik' },
  { key: 'bebas_hukdis',label: 'Surat Bebas Hukdis',                             required: true,  note: 'Dari Kakanwil / Kabiro SDM untuk PNS Pusat' },
  { key: 'pengantar',   label: 'Surat Usulan Pengantar dari Kanwil',             required: true,  note: 'Tertulis jelas nama univ, prodi, dan waktu mulai kuliah' },
  { key: 'loa',         label: 'LOA (Letter of Acceptance)',                      required: true,  note: 'Beasiswa' },
  { key: 'pernyataan',  label: 'Surat Pernyataan dan Perjanjian Tugas Belajar',  required: true,  note: 'Beasiswa' },
]

const DOCS_UJIKOM: DocField[] = [
  { key: 'skp',            label: 'SKP',                      required: true },
  { key: 'sk_jabatan',     label: 'SK Jabatan Terakhir',      required: true },
  { key: 'pangkat',        label: 'Pangkat Terakhir',         required: true },
  { key: 'pns',            label: 'SK PNS',                   required: true },
  { key: 'cpns',           label: 'SK CPNS',                  required: true },
  { key: 'pak',            label: 'PAK',                      required: true },
  { key: 'bebas_hukdis',   label: 'Pernyataan Bebas Hukdis',  required: true },
  { key: 'rekomendasi',    label: 'Rekomendasi Pimpinan',     required: true },
  { key: 'penempatan',     label: 'Rekomendasi Penempatan',   required: true },
]

const DOCS_PWK: DocField[] = [
  { key: 'rekomendasi',    label: 'Rekomendasi Pimpinan',               required: true },
  { key: 'analisis',       label: 'Analisis Rekomendasi Pimpinan',       required: true },
  { key: 'bebas_tunggakan',label: 'Surat Bebas Tunggakan Pekerjaan',     required: true },
  { key: 'permohonan',     label: 'Surat Permohonan Pribadi',            required: true },
  { key: 'eviden',         label: 'Surat Eviden Alasan Perpindahan',     required: true },
  { key: 'bebas_hukdis',   label: 'Surat Bebas Hukdis',                 required: true, note: 'Diunggah saat kelengkapan dokumen' },
]

function getDocs(layanan: string, subLayanan: string): DocField[] {
  if (layanan === 'PWK')    return DOCS_PWK
  if (layanan === 'UJIKOM') return DOCS_UJIKOM
  if (layanan === 'TUBEL') {
    return subLayanan === 'Beasiswa' ? DOCS_TUBEL_BEASISWA : DOCS_TUBEL_MANDIRI
  }
  if (subLayanan === 'Sertifikasi') return DOCS_IPG_SERTIFIKASI
  if (subLayanan === 'Akademik')    return DOCS_IPG_AKADEMIK
  return DOCS_IPG_PROFESI
}

// ── Success Modal ──────────────────────────────────────────────────────────
function SuccessModal({ kode, layanan, subLayanan, totalDok, accepted, rejected, onDashboard }: {
  kode: string; layanan: string; subLayanan: string; totalDok: number; accepted: number; rejected: number; onDashboard: () => void
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.25 }}
        className="w-full max-w-sm overflow-hidden rounded-2xl bg-white dark:bg-slate-900"
      >
        <div className="h-1.5 w-full bg-gradient-to-r from-emerald-400 to-emerald-500" />
        <div className="flex flex-col items-center px-6 pb-2 pt-8 text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', damping: 10, stiffness: 200, delay: 0.1 }}
            className="relative mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900/30"
          >
            <motion.span
              initial={{ scale: 1, opacity: 0.6 }}
              animate={{ scale: 1.5, opacity: 0 }}
              transition={{ duration: 1, repeat: Infinity }}
              className="absolute inset-0 rounded-full bg-emerald-200 dark:bg-emerald-700"
            />
            <CheckSolid className="h-10 w-10 text-emerald-500" />
          </motion.div>
          <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100">Dokumen Terkirim!</h2>
          <p className="mt-1.5 text-sm leading-relaxed text-slate-400">
            Semua dokumen berhasil diunggah. Tim kami akan memverifikasi dalam 1–3 hari kerja.
          </p>
        </div>
        <div className="mx-6 my-5 divide-y divide-slate-100 rounded-xl border border-slate-100 dark:divide-slate-700 dark:border-slate-700">
          {[
            { label: 'Kode Pengajuan', value: kode, bold: true },
            { label: 'Layanan', value: `${layanan} – ${subLayanan}` },
            { label: 'Total Dokumen', value: `${totalDok} file terunggah`, green: true },
            { label: 'Pegawai Diterima', value: `${accepted} pegawai`, green: true },
            ...(rejected > 0 ? [{ label: 'Pegawai Ditolak', value: `${rejected} pegawai`, red: true }] : []),
            { label: 'Status', value: 'Menunggu Verifikasi', badge: true },
          ].map(({ label, value, bold, green, red, badge }) => (
            <div key={label} className="flex items-center justify-between px-4 py-3">
              <span className="text-sm text-slate-400">{label}</span>
              {badge ? (
                <span className="rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-semibold text-amber-700 dark:bg-amber-900/30 dark:text-amber-400">{value}</span>
              ) : (
                <span className={`text-sm ${bold ? 'font-bold text-slate-700 dark:text-slate-200' : green ? 'font-semibold text-emerald-600 dark:text-emerald-400' : red ? 'font-semibold text-red-600 dark:text-red-400' : 'text-slate-600 dark:text-slate-300'}`}>{value}</span>
              )}
            </div>
          ))}
        </div>
        <div className="px-6 pb-6">
          <button onClick={onDashboard} className="w-full rounded-xl bg-indigo-600 py-3 text-sm font-semibold text-white transition hover:bg-indigo-500">
            Kembali ke Dashboard
          </button>
        </div>
      </motion.div>
    </div>
  )
}

// ── Main Content ───────────────────────────────────────────────────────────
function FormKelengkapanContent() {
  const params           = useSearchParams()
  const router           = useRouter()
  const layanan          = params.get('layanan') ?? ''
  const subLayanan       = params.get('subLayanan') ?? ''
  const kode             = params.get('kode') ?? '-'
  const nips             = (params.get('nips') ?? '').split(',').filter(Boolean)
  const jenisList = (params.get('jenisList') ?? '').split(',').filter(Boolean)

  const pegawaiList = nips
    .map(nip => daftarPegawai.find(p => p.nip === nip))
    .filter(Boolean) as typeof daftarPegawai

  // fallback: jika tidak ada pegawai dari URL, buat satu slot kosong
  const list = pegawaiList.length > 0 ? pegawaiList : [{ nip: '-', nama: 'Pegawai', jabatan: '', unit: '' }]

  const getDocsForStep = (idx: number): DocField[] => {
    const base = getDocs(layanan, subLayanan)
    if (layanan === 'UJIKOM' && jenisList[idx] === 'struktural_ke_jf') {
      return [...base, { key: 'lepas_jabatan', label: 'Surat Pernyataan Lepas Jabatan', required: true }]
    }
    return base
  }

  const isPWK = layanan === 'PWK'

  const [step, setStep]           = useState(0)
  const [submitted, setSubmitted] = useState(false)
  const [pwkAgreed, setPwkAgreed] = useState<boolean[]>(list.map(() => false))
  const [pwkTolak, setPwkTolak]   = useState<boolean[]>(list.map(() => false))
  const [pwkCatatan, setPwkCatatan] = useState<string[]>(list.map(() => ''))
  const [docSheet, setDocSheet] = useState<{ nama: string; ukuran: string } | null>(null)
  const [pdfViewer, setPdfViewer] = useState<string | null>(null)

  // files per pegawai: array of Record<key, File|null>
  const [allFiles, setAllFiles] = useState<Record<string, File | null>[]>(
    list.map((_, i) => Object.fromEntries(getDocsForStep(i).map(d => [d.key, null])))
  )

  const docs         = getDocsForStep(step)
  const currentFiles = allFiles[step]
  const setFile = (key: string, file: File | null) => {
    setAllFiles(prev => {
      const next = [...prev]
      next[step] = { ...next[step], [key]: file }
      return next
    })
  }

  const uploadedCount  = (f: Record<string, File | null>) => Object.values(f).filter(Boolean).length
  const isComplete = (f: Record<string, File | null>, idx: number) => {
    if (isPWK) {
      if (pwkTolak[idx]) return true  // ditolak = sudah diputuskan, bisa lanjut
      return (pwkAgreed[idx] ?? false) && !!f['bebas_hukdis']
    }
    return getDocsForStep(idx).every(d => !d.required || f[d.key])
  }
  const totalDokumen   = allFiles.reduce((s, f) => s + uploadedCount(f), 0)
  const isLast         = step === list.length - 1

  // Cari dokumen PWK dari daftarPWK per NIP
  const getPWKDokumen = (nip: string) =>
    daftarPWK.find(r => r.pegawai.nip === nip)?.dokumen ?? []

  const acceptedCount = list.filter((_, i) => !pwkTolak[i]).length
  const rejectedCount = list.filter((_, i) => pwkTolak[i]).length

  const handleNext = () => {
    if (!isLast) { setStep(step + 1) }
    else { setSubmitted(true) }
  }

  if (submitted) {
    return <SuccessModal kode={kode} layanan={layanan} subLayanan={subLayanan} totalDok={totalDokumen} accepted={acceptedCount} rejected={rejectedCount} onDashboard={() => router.push('/dashboard')} />
  }

  const current = list[step]

  return (
    <>
    <div className="min-h-screen bg-slate-50 px-4 py-8 dark:bg-slate-950 sm:px-6 lg:px-10">
      {/* Breadcrumb */}
      <nav className="mb-6 flex items-center gap-1.5 text-xs text-slate-400">
        <span className="cursor-pointer hover:text-slate-600 dark:hover:text-slate-300" onClick={() => router.push('/dashboard')}>Dashboard</span>
        <ChevronRightIcon className="h-3.5 w-3.5" />
        <span className="cursor-pointer hover:text-slate-600 dark:hover:text-slate-300" onClick={() => router.push('/formpermintaan')}>Form Permintaan</span>
        <ChevronRightIcon className="h-3.5 w-3.5" />
        <span className="font-medium text-slate-700 dark:text-slate-200">Kelengkapan Dokumen</span>
      </nav>

      {/* Header info */}
      <div className="mb-5 flex flex-wrap items-center justify-between gap-2">
        <div>
          <h1 className="text-base font-semibold text-slate-800 dark:text-slate-100">Kelengkapan Dokumen</h1>
          <p className="mt-0.5 text-sm text-slate-400">{kode} · {layanan}{subLayanan ? ` ${subLayanan}` : ''}</p>
        </div>
        <span className="text-sm text-slate-500 dark:text-slate-400">
          Pegawai <span className="font-semibold text-slate-800 dark:text-slate-100">{step + 1}</span> dari <span className="font-semibold text-slate-800 dark:text-slate-100">{list.length}</span>
        </span>
      </div>

      {/* Stepper pill */}
      {list.length > 1 && (
        <div className="mb-5 flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {list.map((p, i) => (
            <button
              key={p.nip}
              onClick={() => setStep(i)}
              className={`flex shrink-0 items-center gap-2 rounded-full px-3.5 py-1.5 text-xs font-medium transition ${
                i === step
                  ? pwkTolak[i] ? 'bg-red-600 text-white' : 'bg-indigo-600 text-white'
                  : pwkTolak[i]
                  ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                  : isComplete(allFiles[i], i)
                  ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400'
                  : 'bg-white text-slate-600 ring-1 ring-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:ring-slate-700'
              }`}
            >
              {pwkTolak[i] && i !== step
                ? <XMarkIcon className="h-3.5 w-3.5" />
                : isComplete(allFiles[i], i) && i !== step
                ? <CheckCircleIcon className="h-3.5 w-3.5" />
                : <span className="flex h-4 w-4 items-center justify-center rounded-full bg-white/20 text-[10px] font-bold">{i + 1}</span>
              }
              <span className="max-w-[120px] truncate">{p.nama.split(' ')[0]}</span>
            </button>
          ))}
        </div>
      )}

      {/* Form card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.2 }}
          className="rounded-2xl bg-white dark:bg-slate-900"
        >
          {/* Card header */}
          <div className="flex flex-col gap-4 px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-sm font-bold text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-400">
                {current.nama.split(' ').map(n => n[0]).slice(0, 2).join('')}
              </div>
              <div>
                <p className="font-semibold text-slate-800 dark:text-slate-100">{current.nama}</p>
                <p className="text-xs text-slate-400">{current.nip !== '-' ? `${current.nip} · ` : ''}{current.jabatan}</p>
              </div>
            </div>

            {/* Progress ring */}
            {isPWK ? (
              <div className={`flex items-center gap-2 self-start rounded-xl border px-4 py-2.5 sm:self-auto ${
                pwkTolak[step]
                  ? 'border-red-200 bg-red-50 dark:border-red-800/30 dark:bg-red-900/10'
                  : pwkAgreed[step]
                  ? 'border-emerald-200 bg-emerald-50 dark:border-emerald-800/30 dark:bg-emerald-900/10'
                  : 'border-slate-100 bg-slate-50 dark:border-slate-700 dark:bg-slate-800'
              }`}>
                {pwkTolak[step]
                  ? <XMarkIcon className="h-5 w-5 text-red-500" />
                  : pwkAgreed[step]
                  ? <CheckCircleIcon className="h-5 w-5 text-emerald-500" />
                  : <PaperClipIcon className="h-5 w-5 text-slate-400" />}
                <span className={`text-xs font-medium ${
                  pwkTolak[step] ? 'text-red-700 dark:text-red-400'
                  : pwkAgreed[step] ? 'text-emerald-700 dark:text-emerald-400'
                  : 'text-slate-500 dark:text-slate-400'
                }`}>
                  {pwkTolak[step] ? 'Ditolak' : pwkAgreed[step] ? 'Disetujui' : 'Menunggu persetujuan'}
                </span>
              </div>
            ) : (
              <div className="flex items-center gap-3 self-start rounded-xl border border-slate-100 bg-slate-50 px-4 py-2.5 dark:border-slate-700 dark:bg-slate-800 sm:self-auto">
                <div className="text-right">
                  <p className="text-xs text-slate-400">Dokumen</p>
                  <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                    {uploadedCount(currentFiles)} / {docs.length}
                  </p>
                </div>
                <div className="relative h-10 w-10">
                  <svg className="h-10 w-10 -rotate-90" viewBox="0 0 36 36">
                    <circle cx="18" cy="18" r="15" fill="none" stroke="#e2e8f0" strokeWidth="3" className="dark:stroke-slate-700" />
                    <circle cx="18" cy="18" r="15" fill="none" stroke="#6366f1" strokeWidth="3"
                      strokeDasharray={`${(uploadedCount(currentFiles) / docs.length) * 94.2} 94.2`}
                      strokeLinecap="round"
                    />
                  </svg>
                  {isComplete(currentFiles, step) && <CheckCircleIcon className="absolute inset-0 m-auto h-5 w-5 text-indigo-500" />}
                </div>
              </div>
            )}
          </div>

          {/* Body */}
          {isPWK ? (
            /* ── PWK ── */
            <div className="px-6 pb-6 space-y-5">

              {/* Dokumen dari menu PWK (kecuali bebas_hukdis) */}
              <div>
                <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-slate-400">
                  Dokumen dari Menu PWK
                </p>
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                  {DOCS_PWK.filter(d => d.key !== 'bebas_hukdis').map((doc, i) => {
                    const pwkDok = getPWKDokumen(current.nip)
                    const found  = pwkDok[i] ?? null
                    return (
                      <button
                        key={doc.key}
                        type="button"
                        onClick={() => found && setDocSheet(found)}
                        className={`flex w-full items-center gap-3 rounded-xl border px-4 py-3 text-left transition ${found ? 'border-emerald-100 bg-emerald-50 hover:border-emerald-300 dark:border-emerald-800/30 dark:bg-emerald-900/10' : 'border-slate-200 bg-slate-50 dark:border-slate-700 dark:bg-slate-800/50'} ${found ? 'cursor-pointer' : 'cursor-default'}`}
                      >
                        {found
                          ? <CheckCircleIcon className="h-4 w-4 shrink-0 text-emerald-500" />
                          : <DocumentIcon className="h-4 w-4 shrink-0 text-slate-400" />}
                        <div className="min-w-0 flex-1">
                          <p className={`text-xs font-medium ${found ? 'text-emerald-700 dark:text-emerald-400' : 'text-slate-500 dark:text-slate-400'}`}>{doc.label}</p>
                          {found
                            ? <p className="truncate text-[10px] text-slate-400">{found.nama} · {found.ukuran} — <span className="text-emerald-600">klik untuk lihat</span></p>
                            : <p className="text-[10px] text-amber-500">Belum diunggah</p>}
                        </div>
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Upload Surat Bebas Hukdis */}
              <div>
                <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-slate-400">
                  Upload Surat Bebas Hukdis
                </p>
                <FileUpload
                  label="Surat Bebas Hukdis"
                  required
                  value={currentFiles['bebas_hukdis'] ?? null}
                  onChange={file => setFile('bebas_hukdis', file)}
                />
                <p className="mt-1 text-[11px] text-slate-400">Diunggah langsung saat proses kelengkapan dokumen</p>
              </div>

              {/* Catatan */}
              <div>
                <label className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-slate-400">
                  <ExclamationCircleIcon className="h-3.5 w-3.5" />
                  Catatan (opsional)
                </label>
                <RichTextEditor
                  value={pwkCatatan[step] ?? ''}
                  onChange={html => setPwkCatatan(prev => { const n = [...prev]; n[step] = html; return n })}
                  placeholder="Tuliskan catatan jika ada dokumen yang tidak sesuai atau perlu diperhatikan..."
                />
              </div>

              {/* Keputusan: Setuju / Tolak */}
              <div>
                <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-400">Keputusan</p>
                <div className="grid grid-cols-2 gap-3">
                  {/* Setuju */}
                  <button
                    type="button"
                    onClick={() => {
                      setPwkAgreed(prev => { const n = [...prev]; n[step] = true; return n })
                      setPwkTolak(prev => { const n = [...prev]; n[step] = false; return n })
                    }}
                    className={`flex items-center gap-3 rounded-xl border px-4 py-3.5 text-left transition ${
                      pwkAgreed[step]
                        ? 'border-emerald-400 bg-emerald-50 dark:border-emerald-600 dark:bg-emerald-900/20'
                        : 'border-slate-200 bg-white hover:border-emerald-300 hover:bg-emerald-50/50 dark:border-slate-700 dark:bg-slate-800 dark:hover:border-emerald-700'
                    }`}
                  >
                    <div className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full border-2 transition ${
                      pwkAgreed[step] ? 'border-emerald-500 bg-emerald-500' : 'border-slate-300 dark:border-slate-600'
                    }`}>
                      {pwkAgreed[step] && <div className="h-1.5 w-1.5 rounded-full bg-white" />}
                    </div>
                    <div>
                      <p className={`text-sm font-semibold ${pwkAgreed[step] ? 'text-emerald-700 dark:text-emerald-400' : 'text-slate-600 dark:text-slate-300'}`}>Setuju</p>
                      <p className="text-[10px] text-slate-400">Dokumen lengkap & sesuai</p>
                    </div>
                  </button>

                  {/* Tolak */}
                  <button
                    type="button"
                    onClick={() => {
                      setPwkTolak(prev => { const n = [...prev]; n[step] = true; return n })
                      setPwkAgreed(prev => { const n = [...prev]; n[step] = false; return n })
                    }}
                    className={`flex items-center gap-3 rounded-xl border px-4 py-3.5 text-left transition ${
                      pwkTolak[step]
                        ? 'border-red-400 bg-red-50 dark:border-red-600 dark:bg-red-900/20'
                        : 'border-slate-200 bg-white hover:border-red-300 hover:bg-red-50/50 dark:border-slate-700 dark:bg-slate-800 dark:hover:border-red-700'
                    }`}
                  >
                    <div className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full border-2 transition ${
                      pwkTolak[step] ? 'border-red-500 bg-red-500' : 'border-slate-300 dark:border-slate-600'
                    }`}>
                      {pwkTolak[step] && <div className="h-1.5 w-1.5 rounded-full bg-white" />}
                    </div>
                    <div>
                      <p className={`text-sm font-semibold ${pwkTolak[step] ? 'text-red-700 dark:text-red-400' : 'text-slate-600 dark:text-slate-300'}`}>Tolak</p>
                      <p className="text-[10px] text-slate-400">Dokumen tidak memenuhi syarat</p>
                    </div>
                  </button>
                </div>

                {/* Keterangan keputusan */}
                {pwkTolak[step] && (
                  <p className="mt-2 text-[11px] text-red-500 dark:text-red-400">
                    Pegawai ini tidak akan dilanjutkan ke tahap berikutnya.
                  </p>
                )}
                {pwkAgreed[step] && (
                  <p className="mt-2 text-[11px] text-emerald-600 dark:text-emerald-400">
                    Saya menyatakan dokumen <strong>sesuai, lengkap, dan dapat dipertanggungjawabkan</strong>.
                  </p>
                )}
              </div>
            </div>
          ) : (
            /* ── Non-PWK: upload per dokumen ── */
            <div className="grid grid-cols-1 gap-5 px-6 py-6 sm:grid-cols-2">
              {docs.map((doc, idx) => {
                const isFullWidth = layanan !== 'UJIKOM' && (doc.key === 'permohonan' || doc.key === 'pengantar')
                const isLastOdd   = docs.length % 2 !== 0 && idx === docs.length - 1
                return (
                  <div key={doc.key} className={isFullWidth || isLastOdd ? 'sm:col-span-2' : ''}>
                    <FileUpload
                      label={doc.label}
                      required={doc.required}
                      value={currentFiles[doc.key]}
                      onChange={file => setFile(doc.key, file)}
                    />
                    {doc.note && <p className="mt-1 text-[11px] text-slate-400">{doc.note}</p>}
                  </div>
                )
              })}
            </div>
          )}

          {/* Footer */}
          <div className="flex items-center justify-between px-6 py-4">
            <button
              type="button"
              onClick={() => step > 0 ? setStep(step - 1) : router.back()}
              className="rounded-xl border border-slate-200 bg-white px-5 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-50 dark:border-slate-600 dark:bg-transparent dark:text-slate-300 dark:hover:bg-slate-800"
            >
              {step === 0 ? 'Kembali' : 'Sebelumnya'}
            </button>

            <button
              type="button"
              onClick={handleNext}
              disabled={!isComplete(currentFiles, step)}
              className="flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-2 text-sm font-medium text-white transition hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-40"
            >
              {isLast ? (
                <><CheckSolid className="h-4 w-4" /> Kirim Semua Dokumen</>
              ) : (
                <>Pegawai Berikutnya <ChevronRightIcon className="h-4 w-4" /></>
              )}
            </button>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* PDF Viewer fullscreen */}
      {pdfViewer && (
        <div className="fixed inset-0 z-[70] flex flex-col bg-slate-950">
          <div className="flex items-center gap-3 border-b border-slate-800 bg-slate-900 px-4 py-3">
            <div className="flex h-6 w-6 items-center justify-center rounded bg-red-500">
              <span className="text-[9px] font-bold text-white">PDF</span>
            </div>
            <span className="flex-1 truncate text-sm font-medium text-slate-200">{pdfViewer}</span>
            <button type="button" onClick={() => setPdfViewer(null)}
              className="flex h-8 w-8 items-center justify-center rounded-full text-slate-400 transition hover:bg-slate-800 hover:text-slate-200">
              <XMarkIcon className="h-5 w-5" />
            </button>
          </div>
          <div className="flex-1 overflow-hidden">
            <iframe
              src={`https://www.orimi.com/pdf-test.pdf#toolbar=1&navpanes=0`}
              className="h-full w-full border-0"
              title={pdfViewer}
            />
          </div>
        </div>
      )}

      {/* Sheet view dokumen */}
      <AnimatePresence>
        {docSheet && (
          <>
            <motion.div key="doc-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-slate-950/40 backdrop-blur-sm" onClick={() => setDocSheet(null)} />
            <motion.div key="doc-sheet" initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed inset-y-0 right-0 z-50 flex w-full max-w-sm flex-col border-l border-slate-200 bg-white shadow-xl dark:border-slate-700 dark:bg-slate-900">
              <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4 dark:border-slate-700">
                <div>
                  <p className="text-sm font-semibold text-slate-800 dark:text-slate-100">Detail Dokumen</p>
                  <p className="text-xs text-slate-400">Pratinjau informasi file</p>
                </div>
                <button type="button" onClick={() => setDocSheet(null)} className="rounded-lg p-1 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800">
                  <XMarkIcon className="h-5 w-5" />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto p-5 space-y-4">
                {/* File card */}
                <div className="flex items-center gap-4 rounded-2xl border border-slate-100 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-800">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-red-500 shadow">
                    <span className="text-sm font-bold text-white">PDF</span>
                  </div>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-slate-800 dark:text-slate-100">{docSheet.nama}</p>
                    <p className="mt-0.5 text-xs text-slate-400">{docSheet.ukuran}</p>
                    <span className="mt-1 inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-medium text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400">
                      <CheckCircleIcon className="h-3 w-3" /> Terunggah
                    </span>
                  </div>
                </div>
                {/* Info */}
                <div className="rounded-xl border border-slate-100 dark:border-slate-700 divide-y divide-slate-100 dark:divide-slate-700">
                  {[
                    { label: 'Nama File', value: docSheet.nama },
                    { label: 'Ukuran',    value: docSheet.ukuran },
                    { label: 'Format',    value: 'PDF' },
                    { label: 'Status',    value: 'Sudah diunggah' },
                  ].map(({ label, value }) => (
                    <div key={label} className="flex items-start justify-between px-4 py-3">
                      <span className="text-xs text-slate-400 w-24 shrink-0">{label}</span>
                      <span className="text-xs font-medium text-slate-700 dark:text-slate-200 text-right break-all">{value}</span>
                    </div>
                  ))}
                </div>
                {/* Buka PDF */}
                <button
                  type="button"
                  onClick={() => setPdfViewer(docSheet.nama)}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-500"
                >
                  <ArrowTopRightOnSquareIcon className="h-4 w-4" />
                  Buka PDF
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Progress bar */}
      <div className="mt-4">
        <div className="mb-1 flex items-center justify-between text-xs text-slate-400">
          <span>Progress keseluruhan</span>
          <span>{allFiles.filter((f, i) => isComplete(f, i)).length} / {list.length} pegawai selesai</span>
        </div>
        <div className="h-1.5 w-full rounded-full bg-slate-200 dark:bg-slate-700">
          <motion.div
            className="h-1.5 rounded-full bg-indigo-600"
            animate={{ width: `${(allFiles.filter((f, i) => isComplete(f, i)).length / list.length) * 100}%` }}
            transition={{ duration: 0.4 }}
          />
        </div>
      </div>
    </div>
    </>
  )
}

function FormPageSkeleton() {
  return (
    <div className="min-h-screen bg-slate-50 px-4 py-8 dark:bg-slate-950 sm:px-6 lg:px-10">
      <div className="mb-6 h-4 w-48 animate-pulse rounded bg-slate-200 dark:bg-slate-700" />
      <div className="rounded-2xl bg-white p-6 dark:bg-slate-900">
        <div className="mb-6 space-y-1">
          <div className="h-5 w-40 animate-pulse rounded bg-slate-200 dark:bg-slate-700" />
          <div className="h-3.5 w-64 animate-pulse rounded bg-slate-100 dark:bg-slate-800" />
        </div>
        <div className="grid gap-5 sm:grid-cols-2">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="space-y-1.5">
              <div className="h-3.5 w-28 animate-pulse rounded bg-slate-200 dark:bg-slate-700" />
              <div className="h-10 w-full animate-pulse rounded-xl bg-slate-100 dark:bg-slate-800" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function FormKelengkapanPage() {
  return (
    <Suspense fallback={<FormPageSkeleton />}>
      <FormKelengkapanContent />
    </Suspense>
  )
}
