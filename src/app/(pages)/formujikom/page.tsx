'use client'

import { DropdownSelect } from '@/components/form/dropdown-select'
import { daftarPegawai } from '@/data/pegawai-data'
import { CheckCircleIcon, ChevronRightIcon } from '@heroicons/react/24/outline'
import { CheckCircleIcon as CheckSolid, PaperAirplaneIcon } from '@heroicons/react/24/solid'
import { AnimatePresence, motion } from 'framer-motion'
import { useRouter, useSearchParams } from 'next/navigation'
import { Suspense, useState } from 'react'

// ── Konstanta ──────────────────────────────────────────────────────────────
const JENJANG_JF = [
  { value: 'pemula',        label: 'Pemula' },
  { value: 'terampil',      label: 'Terampil' },
  { value: 'mahir',         label: 'Mahir' },
  { value: 'penyelia',      label: 'Penyelia' },
  { value: 'ahli_pertama',  label: 'Ahli Pertama' },
  { value: 'ahli_muda',     label: 'Ahli Muda' },
  { value: 'ahli_madya',    label: 'Ahli Madya' },
  { value: 'ahli_utama',    label: 'Ahli Utama' },
]

const JABATAN_FUNGSIONAL_KENAIKAN = [
  'PENGELOLA PENGADAAN BARANG/JASA',
  'ANALIS PENGELOLAAN KEUANGAN APBN',
  'PENATA LAKSANA BARANG',
  'AUDITOR',
  'PUSTAKAWAN',
  'PRANATA KEUANGAN APBN',
  'PENGEMBANG TEKNOLOGI PEMBELAJARAN',
  'ARSIPARIS',
  'ANALIS HUKUM',
  'PERANCANG PERATURAN PERUNDANG-UNDANGAN',
  'PENATA RUANG',
  'ANALIS ANGGARAN',
  'ANALIS KEBIJAKAN',
  'PERENCANA',
  'PENERJEMAH',
  'ANALIS SUMBER DAYA MANUSIA APARATUR',
  'PRANATA SUMBER DAYA MANUSIA APARATUR',
  'ASESOR SDM APARATUR',
  'ANALIS PENGEMBANGAN KOMPETENSI APARATUR SIPIL NEGARA',
  'PENATA KADASTRAL',
  'ASISTEN PENATA KADASTRAL',
  'PENATA PERTANAHAN',
  'PRANATA KOMPUTER',
  'PRANATA HUBUNGAN MASYARAKAT',
  'PRANATA LABORATORIUM PENDIDIKAN',
  'DOSEN',
  'PENGGERAK SWADAYA MASYARAKAT',
  'WIDYAISWARA',
  'STATISTISI',
  'SURVEYOR PEMETAAN',
  'SANDIMAN',
  'MANGGALA INFORMATIKA',
  'APOTEKER',
  'DOKTER',
  'DOKTER GIGI',
  'PERAWAT',
  'PSIKOLOG KLINIS',
  'WIDYAPRADA',
].sort().map(v => ({ value: v, label: v }))

const JENIS_PERPINDAHAN = [
  { value: 'struktural_ke_jf', label: 'Struktural ke Jabatan Fungsional' },
  { value: 'jf_a_ke_jf_b',    label: 'Jabatan Fungsional (A) ke Jabatan Fungsional (B)' },
  { value: 'pelaksana_ke_jf',  label: 'Pelaksana ke Jabatan Fungsional' },
]

// ── Types ──────────────────────────────────────────────────────────────────
interface DataPerpindahan {
  jenisPerpindahan: string
  dari: string
  ke: string
}

interface DataKenaikanJenjang {
  dari: string
  ke: string
}

type DataUjiKom = DataPerpindahan | DataKenaikanJenjang

const emptyPerpindahan = (): DataPerpindahan => ({ jenisPerpindahan: '', dari: '', ke: '' })
const emptyKenaikan = (): DataKenaikanJenjang => ({ dari: '', ke: '' })

function isValidPerpindahan(d: DataPerpindahan) {
  return !!d.jenisPerpindahan && d.dari.trim().length > 0 && d.ke.trim().length > 0
}

function isValidKenaikan(d: DataKenaikanJenjang) {
  return d.dari.trim().length > 0 && d.ke.trim().length > 0
}

// ── Field wrapper ──────────────────────────────────────────────────────────
function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {children}
    </div>
  )
}

function ReadonlyInput({ value }: { value: string }) {
  return (
    <div className="flex h-10 items-center rounded-xl border border-slate-100 bg-slate-50 px-3 text-sm text-slate-500 dark:border-slate-700 dark:bg-slate-800/50 dark:text-slate-400">
      {value || '—'}
    </div>
  )
}

function TextInput({ value, onChange, placeholder }: { value: string; onChange: (v: string) => void; placeholder?: string }) {
  return (
    <input
      type="text"
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
      className="h-10 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-700 placeholder-slate-400 outline-none transition focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200 dark:placeholder-slate-500"
    />
  )
}

// ── Form per pegawai: Perpindahan Jabatan ──────────────────────────────────
function FormPerpindahan({ data, onChange }: {
  data: DataPerpindahan
  onChange: (d: DataPerpindahan) => void
}) {
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
      <div className="sm:col-span-2">
        <Field label="Jenis Perpindahan Jabatan" required>
          <DropdownSelect
            value={data.jenisPerpindahan}
            onChange={v => onChange({ ...data, jenisPerpindahan: v })}
            options={JENIS_PERPINDAHAN}
            placeholder="Pilih jenis perpindahan..."
          />
        </Field>
      </div>
      <Field label="Dari" required>
        <TextInput
          value={data.dari}
          onChange={v => onChange({ ...data, dari: v })}
          placeholder="Jabatan/jenjang asal"
        />
      </Field>
      <Field label="Ke" required>
        <TextInput
          value={data.ke}
          onChange={v => onChange({ ...data, ke: v })}
          placeholder="Jabatan/jenjang tujuan"
        />
      </Field>
    </div>
  )
}

// ── Form per pegawai: Kenaikan Jenjang ────────────────────────────────────
function FormKenaikanJenjang({ data, onChange }: {
  data: DataKenaikanJenjang
  onChange: (d: DataKenaikanJenjang) => void
}) {
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
      <Field label="Dari Jenjang" required>
        <DropdownSelect
          value={data.dari}
          onChange={v => onChange({ ...data, dari: v })}
          options={JABATAN_FUNGSIONAL_KENAIKAN}
          placeholder="Pilih jabatan fungsional asal..."
        />
      </Field>
      <Field label="Ke Jenjang" required>
        <DropdownSelect
          value={data.ke}
          onChange={v => onChange({ ...data, ke: v })}
          options={JABATAN_FUNGSIONAL_KENAIKAN}
          placeholder="Pilih jabatan fungsional tujuan..."
        />
      </Field>
    </div>
  )
}

// ── Main Content ───────────────────────────────────────────────────────────
function FormUjiKomContent() {
  const params     = useSearchParams()
  const router     = useRouter()
  const subLayanan = params.get('subLayanan') ?? ''
  const kode       = params.get('kode') ?? '-'
  const nips       = (params.get('nips') ?? '').split(',').filter(Boolean)

  const pegawaiList = nips
    .map(nip => daftarPegawai.find(p => p.nip === nip))
    .filter(Boolean) as typeof daftarPegawai

  const list = pegawaiList.length > 0 ? pegawaiList : [{ nip: '-', nama: 'Pegawai', jabatan: '', unit: '' }]

  const isPerpindahan = subLayanan === 'Perpindahan Jabatan'

  const [step, setStep] = useState(0)

  const [allData, setAllData] = useState<DataUjiKom[]>(
    list.map(() => isPerpindahan ? emptyPerpindahan() : emptyKenaikan())
  )

  const current = list[step]
  const currentData = allData[step]

  const isComplete = (d: DataUjiKom) =>
    isPerpindahan ? isValidPerpindahan(d as DataPerpindahan) : isValidKenaikan(d as DataKenaikanJenjang)

  const isLast = step === list.length - 1

  const handleNext = () => {
    if (!isLast) {
      setStep(step + 1)
    } else {
      const jenisList = isPerpindahan
        ? (allData as DataPerpindahan[]).map(d => d.jenisPerpindahan || 'none').join(',')
        : ''
      const kelengkapanParams = new URLSearchParams({
        layanan: 'UJIKOM',
        subLayanan,
        kode,
        nips: nips.join(','),
        ...(jenisList ? { jenisList } : {}),
      })
      router.push(`/formkelengkapan?${kelengkapanParams.toString()}`)
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-8 dark:bg-slate-950 sm:px-6 lg:px-10">
      {/* Breadcrumb */}
      <nav className="mb-6 flex items-center gap-1.5 text-xs text-slate-400">
        <span className="cursor-pointer hover:text-slate-600 dark:hover:text-slate-300" onClick={() => router.push('/dashboard')}>Dashboard</span>
        <ChevronRightIcon className="h-3.5 w-3.5" />
        <span className="cursor-pointer hover:text-slate-600 dark:hover:text-slate-300" onClick={() => router.push('/formpermintaan')}>Form Permintaan</span>
        <ChevronRightIcon className="h-3.5 w-3.5" />
        <span className="font-medium text-slate-700 dark:text-slate-200">Uji Kompetensi JF</span>
      </nav>

      {/* Header */}
      <div className="mb-5 flex flex-wrap items-center justify-between gap-2">
        <div>
          <h1 className="text-base font-semibold text-slate-800 dark:text-slate-100">Data Uji Kompetensi JF</h1>
          <p className="mt-0.5 text-sm text-slate-400">{kode} · {subLayanan}</p>
        </div>
        <span className="text-sm text-slate-500 dark:text-slate-400">
          Pegawai <span className="font-semibold text-slate-800 dark:text-slate-100">{step + 1}</span> dari <span className="font-semibold text-slate-800 dark:text-slate-100">{list.length}</span>
        </span>
      </div>

      {/* Stepper */}
      {list.length > 1 && (
        <div className="mb-5 flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {list.map((p, i) => (
            <button
              key={p.nip}
              onClick={() => setStep(i)}
              className={`flex shrink-0 items-center gap-2 rounded-full px-3.5 py-1.5 text-xs font-medium transition ${
                i === step
                  ? 'bg-indigo-600 text-white'
                  : isComplete(allData[i])
                  ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400'
                  : 'bg-white text-slate-600 ring-1 ring-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:ring-slate-700'
              }`}
            >
              {isComplete(allData[i]) && i !== step
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
          {/* Card header — info pegawai */}
          <div className="flex flex-col gap-4 px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-sm font-bold text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-400">
                {current.nama.split(' ').map((n: string) => n[0]).slice(0, 2).join('')}
              </div>
              <div>
                <p className="font-semibold text-slate-800 dark:text-slate-100">{current.nama}</p>
                <p className="text-xs text-slate-400">{current.nip !== '-' ? current.nip : ''}</p>
              </div>
            </div>
          </div>

          {/* Fields */}
          <div className="px-6 pb-6 pt-2">
            {/* NIP & Nama readonly */}
            <div className="mb-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
              <Field label="NIP">
                <ReadonlyInput value={current.nip} />
              </Field>
              <Field label="Nama">
                <ReadonlyInput value={current.nama} />
              </Field>
            </div>

            <div className="mb-5 border-t border-slate-100 dark:border-slate-700" />

            {isPerpindahan ? (
              <FormPerpindahan
                data={currentData as DataPerpindahan}
                onChange={d => {
                  const next = [...allData]
                  next[step] = d
                  setAllData(next)
                }}
              />
            ) : (
              <FormKenaikanJenjang
                data={currentData as DataKenaikanJenjang}
                onChange={d => {
                  const next = [...allData]
                  next[step] = d
                  setAllData(next)
                }}
              />
            )}
          </div>

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
              disabled={!isComplete(currentData)}
              className="flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-2 text-sm font-medium text-white transition hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-40"
            >
              {isLast ? (
                <><PaperAirplaneIcon className="h-4 w-4" /> Lanjut Upload Dokumen</>
              ) : (
                <>Pegawai Berikutnya <ChevronRightIcon className="h-4 w-4" /></>
              )}
            </button>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Progress bar */}
      {list.length > 1 && (
        <div className="mt-4">
          <div className="mb-1 flex items-center justify-between text-xs text-slate-400">
            <span>Progress keseluruhan</span>
            <span>{allData.filter(isComplete).length} / {list.length} pegawai selesai</span>
          </div>
          <div className="h-1.5 w-full rounded-full bg-slate-200 dark:bg-slate-700">
            <motion.div
              className="h-1.5 rounded-full bg-indigo-600"
              animate={{ width: `${(allData.filter(isComplete).length / list.length) * 100}%` }}
              transition={{ duration: 0.4 }}
            />
          </div>
        </div>
      )}
    </div>
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

export default function FormUjiKomPage() {
  return (
    <Suspense fallback={<FormPageSkeleton />}>
      <FormUjiKomContent />
    </Suspense>
  )
}
