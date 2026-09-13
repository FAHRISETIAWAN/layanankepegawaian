'use client'

import { DatePicker } from '@/components/form/date-picker'
import { DropdownSelect } from '@/components/form/dropdown-select'
import { daftarPegawai } from '@/data/pegawai-data'
import { CheckCircleIcon, ChevronRightIcon } from '@heroicons/react/24/outline'
import { CheckCircleIcon as CheckSolid } from '@heroicons/react/24/solid'
import { AnimatePresence, motion } from 'framer-motion'
import { useRouter, useSearchParams } from 'next/navigation'
import { Suspense, useState } from 'react'

// ── Types ──────────────────────────────────────────────────────────────────
interface DataPendidikan {
  nama: string
  nip: string
  golongan: string
  jabatan: string
  unitKerja: string
  sponsor: string
  jurusan: string
  programStudi: string
  namaUniversitas: string
  namaJabatan: string
}

interface DataProfesi {
  klasifikasiProfesi: string
  namaProfesi: string
  nomorSertifikat: string
  tanggalTerbit: string
  gelarDepanProfesi: string
  gelarBelakangProfesi: string
  lembagaPenyelenggara: string
  fakultas: string
  nomorIjazahProfesi: string
  tahunLulusProfesi: string
  tanggalIjazahProfesi: string
  jenisProfesi: string
}

const emptyPendidikan = (): DataPendidikan => ({
  nama: '', nip: '', golongan: '', jabatan: '', unitKerja: '',
  sponsor: '', jurusan: '', programStudi: '', namaUniversitas: '', namaJabatan: '',
})

const emptyProfesi = (): DataProfesi => ({
  klasifikasiProfesi: '', namaProfesi: '', nomorSertifikat: '', tanggalTerbit: '',
  gelarDepanProfesi: '', gelarBelakangProfesi: '', lembagaPenyelenggara: '', fakultas: '', nomorIjazahProfesi: '', tahunLulusProfesi: '', tanggalIjazahProfesi: '', jenisProfesi: '',
})

const tingkatOptions  = ['SD', 'SMP', 'SMA/SMK', 'D-1', 'D-2', 'D-3', 'D-4', 'S-1', 'S-2', 'S-3']
const tahunOptions    = Array.from({ length: 30 }, (_, i) => String(new Date().getFullYear() - i))

const klasifikasiOptions = [
  'AKUNTAN DAN ANGGARAN', 'DOKTER DAN TENAGA KESEHATAN', 'HUKUM DAN PERUNDANGAN',
  'INFORMATIKA DAN TEKNOLOGI', 'KEUANGAN DAN PAJAK', 'MANAJEMEN DAN ADMINISTRASI',
  'PENDIDIKAN DAN PELATIHAN', 'PENELITIAN DAN PENGEMBANGAN', 'TEKNIK DAN REKAYASA',
]

const jenisProfesiOptions = [
  'Profesi Akuntan', 'Profesi Dokter', 'Profesi Hukum', 'Profesi IT',
  'Profesi Keuangan', 'Profesi Manajemen', 'Profesi Peneliti', 'Lainnya',
]

// ── Shared field components ────────────────────────────────────────────────
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

function TextInput({ placeholder, value, onChange }: { placeholder?: string; value: string; onChange: (v: string) => void }) {
  return (
    <input
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={e => onChange(e.target.value.toUpperCase())}
      className="h-10 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm uppercase text-slate-700 placeholder-slate-400 outline-none transition focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200 dark:placeholder-slate-500"
    />
  )
}

function Dropdown({ value, onChange, options, placeholder }: { value: string; onChange: (v: string) => void; options: string[]; placeholder?: string }) {
  return (
    <DropdownSelect
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      options={options.map(o => ({ value: o, label: o }))}
    />
  )
}

// ── Form IPG (Profesi/Sertifikasi) ─────────────────────────────────────────
function FormIPG({ data, update }: { data: DataProfesi; update: (k: keyof DataProfesi, v: string) => void }) {
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
      <Field label="Klasifikasi Profesi" required>
        <Dropdown value={data.klasifikasiProfesi} onChange={v => update('klasifikasiProfesi', v)}
          options={klasifikasiOptions} placeholder="Pilih klasifikasi" />
      </Field>
      <Field label="Nama Profesi/Sertifikasi" required>
        <TextInput placeholder="Akuntan" value={data.namaProfesi} onChange={v => update('namaProfesi', v)} />
      </Field>
      <Field label="Nomor Sertifikat" required>
        <TextInput placeholder="145/H5.2.1.5/LLS/PPAk/2010" value={data.nomorSertifikat} onChange={v => update('nomorSertifikat', v)} />
      </Field>
      <Field label="Tanggal Terbit Sertifikat" required>
        <DatePicker value={data.tanggalTerbit} onChange={v => update('tanggalTerbit', v)} placeholder="Pilih tanggal terbit" />
      </Field>
      <Field label="Gelar Depan Profesi">
        <TextInput placeholder="Dr." value={data.gelarDepanProfesi} onChange={v => update('gelarDepanProfesi', v)} />
      </Field>
      <Field label="Gelar Belakang Profesi">
        <TextInput placeholder="Ak." value={data.gelarBelakangProfesi} onChange={v => update('gelarBelakangProfesi', v)} />
      </Field>
      <Field label="Lembaga Penyelenggara" required>
        <TextInput placeholder="Universitas Sumatera Utara" value={data.lembagaPenyelenggara} onChange={v => update('lembagaPenyelenggara', v)} />
      </Field>
      <Field label="Fakultas">
        <TextInput placeholder="Fakultas Ekonomi dan Bisnis" value={data.fakultas} onChange={v => update('fakultas', v)} />
      </Field>
      <Field label="Nomor Ijazah">
        <TextInput placeholder="001002601012026100004" value={data.nomorIjazahProfesi} onChange={v => update('nomorIjazahProfesi', v)} />
      </Field>
      <Field label="Tahun Lulus">
        <input
          type="text"
          inputMode="numeric"
          maxLength={4}
          placeholder="2026"
          value={data.tahunLulusProfesi}
          onChange={e => update('tahunLulusProfesi', e.target.value.replace(/\D/g, '').slice(0, 4))}
          className="h-10 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-700 placeholder-slate-400 outline-none transition focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200 dark:placeholder-slate-500"
        />
      </Field>
      <Field label="Tanggal Ijazah">
        <DatePicker value={data.tanggalIjazahProfesi} onChange={v => update('tanggalIjazahProfesi', v)} placeholder="Pilih tanggal ijazah" />
      </Field>
      <Field label="Jenis Profesi">
        <Dropdown value={data.jenisProfesi} onChange={v => update('jenisProfesi', v)}
          options={jenisProfesiOptions} placeholder="Pilih jenis profesi" />
      </Field>
    </div>
  )
}

const programStudiOptions = ['S-1', 'S-2', 'S-3']

// ── Form TUBEL/IPG Akademik (Pendidikan) ───────────────────────────────────
function FormPendidikan({ data, update, showJabatan = true }: { data: DataPendidikan; update: (k: keyof DataPendidikan, v: string) => void; showJabatan?: boolean }) {
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
      <Field label="Nama" required>
        <TextInput placeholder="Ahmad Fauzi" value={data.nama} onChange={v => update('nama', v)} />
      </Field>
      <Field label="NIP" required>
        <TextInput placeholder="198501012010011001" value={data.nip} onChange={v => update('nip', v)} />
      </Field>
      <Field label="Golongan" required>
        <TextInput placeholder="III/C" value={data.golongan} onChange={v => update('golongan', v)} />
      </Field>
      <Field label="Jabatan" required>
        <TextInput placeholder="Analis Kebijakan" value={data.jabatan} onChange={v => update('jabatan', v)} />
      </Field>
      <Field label="Unit Kerja" required>
        <TextInput placeholder="Biro Perencanaan" value={data.unitKerja} onChange={v => update('unitKerja', v)} />
      </Field>
      <Field label="Sponsor" required>
        <TextInput placeholder="Pemerintah / Mandiri" value={data.sponsor} onChange={v => update('sponsor', v)} />
      </Field>
      <Field label="Jurusan" required>
        <TextInput placeholder="Ilmu Ekonomi" value={data.jurusan} onChange={v => update('jurusan', v)} />
      </Field>
      <Field label="Program Studi" required>
        <Dropdown value={data.programStudi} onChange={v => update('programStudi', v)}
          options={programStudiOptions} placeholder="Pilih program studi" />
      </Field>
      <div className="sm:col-span-2">
        <Field label="Nama Universitas" required>
          <TextInput placeholder="Universitas Indonesia" value={data.namaUniversitas} onChange={v => update('namaUniversitas', v)} />
        </Field>
      </div>
      {showJabatan && (
        <div className="sm:col-span-2">
          <Field label="Nama Jabatan Kepegawaian Eselon 1 atau 2">
            <TextInput placeholder="Kepala Biro Sumber Daya Manusia" value={data.namaJabatan} onChange={v => update('namaJabatan', v)} />
          </Field>
        </div>
      )}
    </div>
  )
}

// ── Inner Content ──────────────────────────────────────────────────────────
function FormContent() {
  const router     = useRouter()
  const params     = useSearchParams()
  const layanan    = params.get('layanan') ?? ''
  const subLayanan = params.get('subLayanan') ?? ''
  const kode       = params.get('kode') ?? ''
  const nips       = (params.get('nips') ?? '').split(',').filter(Boolean)

  const pegawaiList = nips
    .map(nip => daftarPegawai.find(p => p.nip === nip))
    .filter(Boolean) as typeof daftarPegawai

  // IPG Profesi & Sertifikasi pakai form profesi, sisanya pakai form pendidikan
  const isIPGProfesiOrSertif = layanan === 'IPG' && (subLayanan === 'Profesi' || subLayanan === 'Sertifikasi')

  const [step, setStep] = useState(0)
  const [profesiData,   setProfesiData]   = useState<DataProfesi[]>(pegawaiList.map(() => emptyProfesi()))
  const [pendidikanData, setPendidikanData] = useState<DataPendidikan[]>(pegawaiList.map(() => emptyPendidikan()))

  if (pegawaiList.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <p className="text-sm text-slate-500">Data pegawai tidak ditemukan.</p>
        <button onClick={() => router.push('/formpermintaan')} className="mt-4 text-sm text-indigo-600 underline">Kembali ke Form Permintaan</button>
      </div>
    )
  }

  const currentProfesi    = profesiData[step]
  const currentPendidikan = pendidikanData[step]

  const updateProfesi = (k: keyof DataProfesi, v: string) =>
    setProfesiData(prev => { const n = [...prev]; n[step] = { ...n[step], [k]: v }; return n })

  const updatePendidikan = (k: keyof DataPendidikan, v: string) =>
    setPendidikanData(prev => { const n = [...prev]; n[step] = { ...n[step], [k]: v }; return n })

  const isValidProfesi   = (d: DataProfesi)    => !!(d.klasifikasiProfesi && d.namaProfesi && d.nomorSertifikat && d.tanggalTerbit && d.lembagaPenyelenggara && d.jenisProfesi)
  const isValidPendidikan = (d: DataPendidikan) => !!(d.nama && d.nip && d.golongan && d.jabatan && d.unitKerja && d.jurusan && d.programStudi && d.namaUniversitas)

  const isCurrentValid = isIPGProfesiOrSertif
    ? isValidProfesi(currentProfesi)
    : isValidPendidikan(currentPendidikan)

  const completedCount = isIPGProfesiOrSertif
    ? profesiData.filter(isValidProfesi).length
    : pendidikanData.filter(isValidPendidikan).length

  const isAllDone = (i: number) => isIPGProfesiOrSertif
    ? isValidProfesi(profesiData[i])
    : isValidPendidikan(pendidikanData[i])

  const isLast = step === pegawaiList.length - 1

  const handleNext = () => {
    if (!isLast) { setStep(step + 1) }
    else {
      const urlParams = new URLSearchParams({ layanan, subLayanan, kode, nips: nips.join(',') })
      router.push(`/formkelengkapan?${urlParams.toString()}`)
    }
  }

  const current     = pegawaiList[step]
  const formTitle   = isIPGProfesiOrSertif ? 'Data Profesi/Sertifikasi Pegawai' : 'Data Pendidikan Pegawai'
  const sectionTitle = isIPGProfesiOrSertif ? 'Profesi / Sertifikasi' : 'Pendidikan'

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-8 dark:bg-slate-950 sm:px-6 lg:px-10">
      {/* Breadcrumb */}
      <nav className="mb-6 flex items-center gap-1.5 text-xs text-slate-400">
        <span className="cursor-pointer hover:text-slate-600 dark:hover:text-slate-300" onClick={() => router.push('/dashboard')}>Dashboard</span>
        <ChevronRightIcon className="h-3.5 w-3.5" />
        <span className="cursor-pointer hover:text-slate-600 dark:hover:text-slate-300" onClick={() => router.push('/formpermintaan')}>Form Permintaan</span>
        <ChevronRightIcon className="h-3.5 w-3.5" />
        <span className="font-medium text-slate-700 dark:text-slate-200">Data Pegawai</span>
      </nav>

      {/* Header */}
      <div className="mb-5 flex flex-wrap items-center justify-between gap-2">
        <div>
          <h1 className="text-base font-semibold text-slate-800 dark:text-slate-100">{formTitle}</h1>
          <p className="mt-0.5 text-sm text-slate-400">{kode} · {layanan} {subLayanan}</p>
        </div>
        <span className="text-sm text-slate-500 dark:text-slate-400">
          Pegawai <span className="font-semibold text-slate-800 dark:text-slate-100">{step + 1}</span> dari <span className="font-semibold text-slate-800 dark:text-slate-100">{pegawaiList.length}</span>
        </span>
      </div>

      {/* Stepper pill */}
      {pegawaiList.length > 1 && (
        <div className="mb-5 flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {pegawaiList.map((p, i) => (
            <button key={p.nip} onClick={() => setStep(i)}
              className={`flex shrink-0 items-center gap-2 rounded-full px-3.5 py-1.5 text-xs font-medium transition ${
                i === step ? 'bg-indigo-600 text-white'
                : isAllDone(i) ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400'
                : 'bg-white text-slate-600 ring-1 ring-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:ring-slate-700'
              }`}
            >
              {isAllDone(i) && i !== step
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
        <motion.div key={step} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.2 }}
          className="rounded-2xl bg-white dark:bg-slate-900"
        >
          {/* Card header */}
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-sm font-bold text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-400">
                {current.nama.split(' ').map(n => n[0]).slice(0, 2).join('')}
              </div>
              <div>
                <p className="font-semibold text-slate-800 dark:text-slate-100">{current.nama}</p>
                <p className="text-xs text-slate-400">{current.nip} · {current.jabatan} · {current.unit}</p>
              </div>
            </div>
            <span className="hidden rounded-full bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400 sm:inline">
              {sectionTitle}
            </span>
          </div>

          {/* Form fields */}
          <div className="px-6 py-6">
            {isIPGProfesiOrSertif
              ? <FormIPG data={currentProfesi} update={updateProfesi} />
              : <FormPendidikan data={currentPendidikan} update={updatePendidikan} showJabatan={layanan !== 'TUBEL'} />
            }
          </div>

          {/* Card footer */}
          <div className="flex items-center justify-between px-6 py-4">
            <button type="button"
              onClick={() => step > 0 ? setStep(step - 1) : router.push('/formpermintaan')}
              className="rounded-xl border border-slate-200 bg-white px-5 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-50 dark:border-slate-600 dark:bg-transparent dark:text-slate-300 dark:hover:bg-slate-800"
            >
              {step === 0 ? 'Kembali' : 'Sebelumnya'}
            </button>
            <button type="button" onClick={handleNext} disabled={!isCurrentValid}
              className="flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-2 text-sm font-medium text-white transition hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-40"
            >
              {isLast ? (<><CheckSolid className="h-4 w-4" />Lanjut ke Kelengkapan Dokumen</>) : (<>Pegawai Berikutnya<ChevronRightIcon className="h-4 w-4" /></>)}
            </button>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Progress bar */}
      <div className="mt-4">
        <div className="mb-1 flex items-center justify-between text-xs text-slate-400">
          <span>Progress pengisian data</span>
          <span>{completedCount} / {pegawaiList.length} selesai</span>
        </div>
        <div className="h-1.5 w-full rounded-full bg-slate-200 dark:bg-slate-700">
          <motion.div className="h-1.5 rounded-full bg-indigo-600"
            animate={{ width: `${(completedCount / pegawaiList.length) * 100}%` }}
            transition={{ duration: 0.4 }}
          />
        </div>
      </div>
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

export default function FormDataPegawaiPage() {
  return (
    <Suspense fallback={<FormPageSkeleton />}>
      <FormContent />
    </Suspense>
  )
}
