'use client'

import {
  alasanPenolakan,
  type DataPendidikanPegawai,
  type DataProfesiPegawai,
  type DataUjiKomKenaikan,
  type DataUjiKomPerpindahan,
  type PegawaiPengajuan,
  type PengajuanVerifikasi,
} from '@/data/verifikasi-data'
import {
  CheckCircleIcon,
  ChevronDownIcon,
  EyeIcon,
  DocumentTextIcon,
  UserGroupIcon,
  XCircleIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
import { CheckCircleIcon as CheckCircleSolid } from '@heroicons/react/24/solid'
import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import { RichTextEditor } from '@/components/form/rich-text-editor'

const SAMPLE_PDF = 'https://www.orimi.com/pdf-test.pdf'

function PdfViewerModal({ nama, onClose }: { nama: string; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-[60] flex flex-col bg-slate-950">
      {/* Header */}
      <div className="flex shrink-0 items-center justify-between bg-white px-4 py-3 shadow-sm dark:bg-slate-900">
        <div className="flex items-center gap-2">
          <DocumentTextIcon className="h-5 w-5 text-red-500" />
          <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">{nama}</span>
        </div>
        <button
          onClick={onClose}
          className="flex h-8 w-8 items-center justify-center rounded-full text-slate-400 transition hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-800"
        >
          <XMarkIcon className="h-5 w-5" />
        </button>
      </div>
      {/* PDF iframe — browser native viewer */}
      <div className="flex-1 overflow-hidden">
        <iframe
          src={`${SAMPLE_PDF}#toolbar=1&navpanes=0`}
          className="h-full w-full border-0"
          title={nama}
        />
      </div>
    </div>
  )
}

interface DetailSheetProps {
  item: PengajuanVerifikasi | null
  onClose: () => void
  onVerifikasi: (id: string) => void
  onTolak: (id: string, alasan: string) => void
}

type Phase = 'detail' | 'tolak-pilih' | 'success' | 'tolak-success'

const statusColor: Record<string, { bg: string; text: string; label: string }> = {
  menunggu:    { bg: 'bg-amber-100 dark:bg-amber-900/30',   text: 'text-amber-700 dark:text-amber-400',   label: 'Menunggu' },
  diproses:    { bg: 'bg-indigo-100 dark:bg-indigo-900/30', text: 'text-indigo-700 dark:text-indigo-400', label: 'Diproses' },
  diverifikasi:{ bg: 'bg-emerald-100 dark:bg-emerald-900/30', text: 'text-emerald-700 dark:text-emerald-400', label: 'Diverifikasi' },
  ditolak:     { bg: 'bg-red-100 dark:bg-red-900/30',       text: 'text-red-700 dark:text-red-400',       label: 'Ditolak' },
}

const layananColor: Record<string, string> = {
  'IPG Profesi':                              'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400',
  'IPG Sertifikasi':                          'bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-400',
  'IPG Akademik':                             'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
  'Tugas Belajar Mandiri':                    'bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-400',
  'Tugas Belajar Beasiswa':                   'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400',
  'Pindah Wilayah Kerja':                     'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400',
  'Uji Kompetensi JF - Perpindahan Jabatan':  'bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400',
  'Uji Kompetensi JF - Kenaikan Jenjang':     'bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-400',
}

function isProfesi(data: object): data is DataProfesiPegawai {
  return 'namaProfesi' in data
}
function isPendidikan(data: object): data is DataPendidikanPegawai {
  return 'namaUniversitas' in data
}
function isUjiKomPerpindahan(data: object): data is DataUjiKomPerpindahan {
  return 'jenisPerpindahan' in data
}
function isUjiKomKenaikan(data: object): data is DataUjiKomKenaikan {
  return !('jenisPerpindahan' in data) && !('namaProfesi' in data) && !('namaUniversitas' in data) && 'dari' in data
}

function FormDataProfesi({ data }: { data: DataProfesiPegawai }) {
  const fields = [
    { label: 'Klasifikasi Profesi', value: data.klasifikasiProfesi },
    { label: 'Nama Profesi/Sertifikasi', value: data.namaProfesi },
    { label: 'Nomor Sertifikat', value: data.nomorSertifikat },
    { label: 'Tanggal Terbit', value: data.tanggalTerbit },
    { label: 'Lembaga Penyelenggara', value: data.lembagaPenyelenggara },
    { label: 'Jenis Profesi', value: data.jenisProfesi },
    ...(data.gelarDepan  ? [{ label: 'Gelar Depan',  value: data.gelarDepan }]  : []),
    ...(data.gelarBelakang ? [{ label: 'Gelar Belakang', value: data.gelarBelakang }] : []),
  ]
  return <FieldGrid fields={fields} />
}

function FormDataUjiKomPerpindahan({ data }: { data: DataUjiKomPerpindahan }) {
  const fields = [
    { label: 'Jenis Perpindahan', value: data.jenisPerpindahan },
    { label: 'Dari', value: data.dari },
    { label: 'Ke', value: data.ke },
  ]
  return <FieldGrid fields={fields} />
}

function FormDataUjiKomKenaikan({ data }: { data: DataUjiKomKenaikan }) {
  const fields = [
    { label: 'Dari Jenjang', value: data.dari },
    { label: 'Ke Jenjang', value: data.ke },
  ]
  return <FieldGrid fields={fields} />
}

function FormDataPendidikan({ data }: { data: DataPendidikanPegawai }) {
  const fields = [
    { label: 'Nama', value: data.nama },
    { label: 'NIP', value: data.nip },
    { label: 'Golongan', value: data.golongan },
    { label: 'Jabatan', value: data.jabatan },
    { label: 'Unit Kerja', value: data.unitKerja },
    { label: 'Sponsor', value: data.sponsor },
    { label: 'Jurusan', value: data.jurusan },
    { label: 'Program Studi', value: data.programStudi },
    { label: 'Nama Universitas', value: data.namaUniversitas },
    ...(data.namaJabatan ? [{ label: 'Nama Jabatan', value: data.namaJabatan }] : []),
  ]
  return <FieldGrid fields={fields} />
}

function FieldGrid({ fields }: { fields: { label: string; value: string }[] }) {
  return (
    <dl className="grid grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-2">
      {fields.map(f => (
        <div key={f.label}>
          <dt className="text-[11px] text-slate-400">{f.label}</dt>
          <dd className="mt-0.5 text-sm font-medium text-slate-700 dark:text-slate-200">{f.value}</dd>
        </div>
      ))}
    </dl>
  )
}

function formDataLabel(layanan: string): string {
  if (layanan === 'IPG Profesi' || layanan === 'IPG Sertifikasi') return 'Data Profesi / Sertifikasi'
  if (layanan.startsWith('Uji Kompetensi JF')) return 'Data Uji Kompetensi JF'
  return 'Data Pendidikan'
}

function PegawaiAccordion({ p, layanan, defaultOpen }: { p: PegawaiPengajuan; layanan: string; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen ?? false)
  const [viewingDoc, setViewingDoc] = useState<string | null>(null)

  return (
    <>
    {viewingDoc && <PdfViewerModal nama={viewingDoc} onClose={() => setViewingDoc(null)} />}
    <div className="overflow-hidden rounded-xl border border-slate-200 dark:border-slate-700">
      {/* Accordion header */}
      <button
        onClick={() => setOpen(v => !v)}
        className="flex w-full items-center gap-3 px-4 py-3.5 text-left transition hover:bg-slate-50 dark:hover:bg-slate-700/30"
      >
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-sm font-bold text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-400">
          {p.nama.split(' ').map(n => n[0]).slice(0, 2).join('')}
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold text-slate-700 dark:text-slate-200">{p.nama}</p>
          <p className="truncate text-[11px] text-slate-400">{p.nip} · {p.jabatan} · {p.unit}</p>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <span className="hidden text-[11px] text-slate-400 sm:block">{(p.dokumen ?? []).length} dokumen</span>
          <ChevronDownIcon className={`h-4 w-4 text-slate-400 transition-transform ${open ? 'rotate-180' : ''}`} />
        </div>
      </button>

      {/* Accordion body */}
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="body"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="space-y-4 border-t border-slate-100 p-4 dark:border-slate-700">
              {/* Form data */}
              {p.formData && (
                <div>
                  <p className="mb-3 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                    {formDataLabel(layanan)}
                  </p>
                  <div className="rounded-xl bg-slate-50 p-4 dark:bg-slate-800/50">
                    {isProfesi(p.formData) ? (
                      <FormDataProfesi data={p.formData} />
                    ) : isPendidikan(p.formData) ? (
                      <FormDataPendidikan data={p.formData} />
                    ) : isUjiKomPerpindahan(p.formData) ? (
                      <FormDataUjiKomPerpindahan data={p.formData} />
                    ) : isUjiKomKenaikan(p.formData) ? (
                      <FormDataUjiKomKenaikan data={p.formData} />
                    ) : null}
                  </div>
                </div>
              )}

              {/* Dokumen */}
              <div>
                <p className="mb-3 text-[11px] font-semibold uppercase tracking-wider text-slate-400">Dokumen Persyaratan</p>
                <ul className="space-y-2">
                  {(p.dokumen ?? []).map((dok, i) => (
                    <li key={i} className="flex items-center gap-3 rounded-xl bg-slate-50 px-4 py-2.5 dark:bg-slate-800/50">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-red-100 dark:bg-red-900/30">
                        <DocumentTextIcon className="h-4 w-4 text-red-500" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium text-slate-700 dark:text-slate-200">{dok.nama}</p>
                        <p className="text-[11px] text-slate-400">{dok.file} · {dok.ukuran}</p>
                      </div>
                      <button
                        onClick={() => setViewingDoc(dok.nama)}
                        className="flex shrink-0 items-center gap-1 rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-600 transition hover:border-indigo-300 hover:text-indigo-600 dark:border-slate-600 dark:text-slate-400 dark:hover:border-indigo-500 dark:hover:text-indigo-400"
                      >
                        <EyeIcon className="h-3.5 w-3.5" />
                        Lihat
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
    </>
  )
}

export function DetailSheet({ item, onClose, onVerifikasi, onTolak }: DetailSheetProps) {
  const [phase, setPhase] = useState<Phase>('detail')
  const [selectedAlasan, setSelectedAlasan] = useState('')
  const [customAlasan, setCustomAlasan] = useState('')

  const handleClose = () => {
    setPhase('detail')
    setSelectedAlasan('')
    setCustomAlasan('')
    onClose()
  }

  const handleVerifikasi = () => {
    if (!item) return
    onVerifikasi(item.id)
    setPhase('success')
  }

  const handleTolak = () => {
    if (!item) return
    const alasan = selectedAlasan === 'Lainnya' ? customAlasan : selectedAlasan
    if (!alasan) return
    onTolak(item.id, alasan)
    setPhase('tolak-success')
  }

  return (
    <AnimatePresence>
      {item && (
        <>
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
            onClick={handleClose}
          />

          <motion.div
            key="sheet"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 340, damping: 38 }}
            className="fixed inset-y-0 right-0 z-50 flex w-screen flex-col bg-slate-50 dark:bg-slate-900"
          >
            {/* Header */}
            <div className="flex shrink-0 items-center justify-between border-b border-slate-200 bg-white px-4 py-4 dark:border-slate-700 dark:bg-slate-800 sm:px-6">
              <div className="flex items-center gap-3">
                <button
                  onClick={handleClose}
                  className="flex h-8 w-8 items-center justify-center rounded-full text-slate-400 transition hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-700 dark:hover:text-slate-200"
                >
                  <XMarkIcon className="h-5 w-5" />
                </button>
                <div>
                  <h2 className="text-sm font-semibold text-slate-800 dark:text-slate-100">{item.kode}</h2>
                  <p className="text-xs text-slate-400">{item.tanggal}</p>
                </div>
              </div>
              <span className={`rounded-full px-3 py-1 text-xs font-semibold ${statusColor[item.status].bg} ${statusColor[item.status].text}`}>
                {statusColor[item.status].label}
              </span>
            </div>

            {/* Body */}
            <div className="flex-1 overflow-y-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              <AnimatePresence mode="wait">
                {/* ── Detail View ── */}
                {phase === 'detail' && (
                  <motion.div
                    key="detail"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.18 }}
                    className="space-y-5 p-4 sm:p-6"
                  >
                    {/* Info Pengajuan */}
                    <section className="rounded-2xl bg-white p-5 ring-1 ring-slate-200 dark:bg-slate-800 dark:ring-0">
                      <h3 className="mb-4 text-xs font-semibold uppercase tracking-wider text-slate-400">Informasi Pengajuan</h3>
                      <dl className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                        <div>
                          <dt className="text-[11px] text-slate-400">Jenis Layanan</dt>
                          <dd className="mt-1">
                            <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${layananColor[item.layanan]}`}>
                              {item.layanan}
                            </span>
                          </dd>
                        </div>
                        <div>
                          <dt className="text-[11px] text-slate-400">Nomor Surat</dt>
                          <dd className="mt-1 font-mono text-sm font-semibold text-slate-700 dark:text-slate-200">{item.nomorSurat}</dd>
                        </div>
                        <div>
                          <dt className="text-[11px] text-slate-400">Tanggal Pengajuan</dt>
                          <dd className="mt-1 text-sm text-slate-700 dark:text-slate-200">{item.tanggal}</dd>
                        </div>
                        <div>
                          <dt className="text-[11px] text-slate-400">Jumlah Pegawai</dt>
                          <dd className="mt-1 text-sm text-slate-700 dark:text-slate-200">{item.pegawai.length} orang</dd>
                        </div>
                      </dl>
                    </section>

                    {/* Per-pegawai accordion */}
                    <section className="rounded-2xl bg-white p-5 ring-1 ring-slate-200 dark:bg-slate-800 dark:ring-0">
                      <div className="mb-4 flex items-center gap-2">
                        <UserGroupIcon className="h-4 w-4 text-indigo-500" />
                        <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400">Data Pegawai</h3>
                      </div>
                      <div className="space-y-2">
                        {item.pegawai.map((p, i) => (
                          <PegawaiAccordion
                            key={p.nip}
                            p={p}
                            layanan={item.layanan}
                            defaultOpen={i === 0}
                          />
                        ))}
                      </div>
                    </section>
                  </motion.div>
                )}

                {/* ── Pilih Alasan Tolak ── */}
                {phase === 'tolak-pilih' && (
                  <motion.div
                    key="tolak"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.18 }}
                    className="space-y-4 p-4 sm:p-6"
                  >
                    <div className="rounded-2xl bg-white p-5 ring-1 ring-slate-200 dark:bg-slate-800 dark:ring-0">
                      <div className="mb-1 flex items-center gap-2">
                        <XCircleIcon className="h-5 w-5 text-red-500" />
                        <h3 className="font-semibold text-slate-800 dark:text-slate-100">Alasan Penolakan</h3>
                      </div>
                      <p className="mb-5 text-sm text-slate-400">Pilih alasan penolakan untuk pengajuan ini.</p>

                      <ul className="space-y-2">
                        {alasanPenolakan.map((a) => (
                          <li key={a}>
                            <button
                              onClick={() => setSelectedAlasan(a)}
                              className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm transition ${
                                selectedAlasan === a
                                  ? 'bg-red-50 text-red-700 ring-1 ring-red-300 dark:bg-red-900/20 dark:text-red-400 dark:ring-red-600'
                                  : 'bg-slate-50 text-slate-700 hover:bg-slate-100 dark:bg-slate-700/40 dark:text-slate-300 dark:hover:bg-slate-700/70'
                              }`}
                            >
                              <span className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 ${
                                selectedAlasan === a ? 'border-red-500 bg-red-500' : 'border-slate-300 dark:border-slate-500'
                              }`}>
                                {selectedAlasan === a && <span className="h-2 w-2 rounded-full bg-white" />}
                              </span>
                              {a}
                            </button>
                          </li>
                        ))}
                      </ul>

                      {selectedAlasan === 'Lainnya' && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          className="mt-3 overflow-hidden"
                        >
                          <RichTextEditor
                            value={customAlasan}
                            onChange={setCustomAlasan}
                            placeholder="Tulis alasan penolakan..."
                          />
                        </motion.div>
                      )}
                    </div>
                  </motion.div>
                )}

                {/* ── Verifikasi Success ── */}
                {phase === 'success' && (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.25, type: 'spring' }}
                    className="flex h-full min-h-[60vh] items-center justify-center p-6"
                  >
                    <div className="text-center">
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', stiffness: 260, damping: 20, delay: 0.1 }}
                        className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900/30"
                      >
                        <CheckCircleSolid className="h-10 w-10 text-emerald-500" />
                      </motion.div>
                      <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100">Pengajuan Diverifikasi</h3>
                      <p className="mt-2 text-sm text-slate-500">
                        Pengajuan <span className="font-semibold text-slate-700 dark:text-slate-300">{item.kode}</span> telah berhasil diverifikasi.
                      </p>
                      <button
                        onClick={handleClose}
                        className="mt-6 rounded-xl bg-emerald-600 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-700"
                      >
                        Tutup
                      </button>
                    </div>
                  </motion.div>
                )}

                {/* ── Tolak Success ── */}
                {phase === 'tolak-success' && (
                  <motion.div
                    key="tolak-success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.25, type: 'spring' }}
                    className="flex h-full min-h-[60vh] items-center justify-center p-6"
                  >
                    <div className="text-center">
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', stiffness: 260, damping: 20, delay: 0.1 }}
                        className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/30"
                      >
                        <XCircleIcon className="h-10 w-10 text-red-500" />
                      </motion.div>
                      <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100">Pengajuan Ditolak</h3>
                      <p className="mt-2 text-sm text-slate-500">
                        Pengajuan <span className="font-semibold text-slate-700 dark:text-slate-300">{item.kode}</span> telah ditolak.
                      </p>
                      <button
                        onClick={handleClose}
                        className="mt-6 rounded-xl bg-red-600 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700"
                      >
                        Tutup
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Footer Actions */}
            {(phase === 'detail' || phase === 'tolak-pilih') && (
              <div className="shrink-0 border-t border-slate-200 bg-white px-4 py-4 dark:border-slate-700 dark:bg-slate-800 sm:px-6">
                <div className="flex items-center justify-end gap-3">
                  {phase === 'detail' ? (
                    <>
                      <button
                        onClick={() => setPhase('tolak-pilih')}
                        disabled={item.status !== 'menunggu' && item.status !== 'diproses'}
                        className="flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 px-5 py-2.5 text-sm font-semibold text-red-600 transition hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-40 dark:border-red-800/50 dark:bg-red-900/20 dark:text-red-400 dark:hover:bg-red-900/30"
                      >
                        <XCircleIcon className="h-4 w-4" />
                        Tolak
                      </button>
                      <button
                        onClick={handleVerifikasi}
                        disabled={item.status !== 'menunggu' && item.status !== 'diproses'}
                        className="flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-40"
                      >
                        <CheckCircleIcon className="h-4 w-4" />
                        Verifikasi
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => { setPhase('detail'); setSelectedAlasan(''); setCustomAlasan('') }}
                        className="rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-50 dark:border-slate-600 dark:bg-slate-700/50 dark:text-slate-300"
                      >
                        Batal
                      </button>
                      <button
                        onClick={handleTolak}
                        disabled={!selectedAlasan || (selectedAlasan === 'Lainnya' && !customAlasan.trim())}
                        className="flex items-center gap-2 rounded-xl bg-red-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-40"
                      >
                        <XCircleIcon className="h-4 w-4" />
                        Konfirmasi Penolakan
                      </button>
                    </>
                  )}
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
