'use client'

import { HukdisCheckDialog, type PWKTujuan } from '@/components/form/hukdis-check-dialog'
import { KonfirmasiDialog } from '@/components/form/konfirmasi-dialog'
import { PegawaiMultiSelect } from '@/components/form/pegawai-multiselect'
import type { Pegawai } from '@/data/pegawai-data'
import { toast } from 'gooey-toast'
import { daftarPWK } from '@/data/pwk-data'
import {
  ArrowsRightLeftIcon,
  CheckCircleIcon,
  ChevronRightIcon,
  ExclamationCircleIcon,
  MagnifyingGlassIcon,
  UserGroupIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
import Link from 'next/link'
import { useRef, useState } from 'react'

interface SuratResult {
  NOMORSURAT: string
  PERIHAL: string
  PENGIRIM: string
  TANGGAL_SURAT: string
}

type Layanan = 'IPG' | 'TUBEL' | 'PWK' | 'UJIKOM' | ''
type SubLayananIPG = 'Profesi' | 'Sertifikasi' | 'Akademik' | ''
type SubLayananTUBEL = 'Mandiri' | 'Beasiswa' | ''
type SubLayananUJIKOM = 'Perpindahan Jabatan' | 'Kenaikan Jenjang' | ''

const SUB_IPG: SubLayananIPG[] = ['Profesi', 'Sertifikasi', 'Akademik']
const SUB_TUBEL: SubLayananTUBEL[] = ['Mandiri', 'Beasiswa']
const SUB_UJIKOM: SubLayananUJIKOM[] = ['Perpindahan Jabatan', 'Kenaikan Jenjang']

const LAYANAN_OPTIONS: { value: Layanan; label: string }[] = [
  { value: 'IPG',    label: 'IPG' },
  { value: 'TUBEL',  label: 'Tugas Belajar' },
  { value: 'PWK',    label: 'Pindah Wilayah Kerja' },
  { value: 'UJIKOM', label: 'Uji Kompetensi JF' },
]

function RadioCard({
  label, checked, onClick,
}: { label: string; checked: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex flex-1 items-center justify-center rounded-xl border-2 py-3 text-sm font-medium transition ${
        checked
          ? 'border-indigo-600 bg-indigo-50 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300 dark:border-indigo-500'
          : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300'
      }`}
    >
      <span className={`mr-2 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border-2 ${
        checked ? 'border-indigo-600 dark:border-indigo-400' : 'border-slate-300 dark:border-slate-600'
      }`}>
        {checked && <span className="h-2 w-2 rounded-full bg-indigo-600 dark:bg-indigo-400" />}
      </span>
      {label}
    </button>
  )
}

export default function FormPermintaanPage() {
  const [layanan, setLayanan] = useState<Layanan>('')
  const [subIPG, setSubIPG] = useState<SubLayananIPG>('')
  const [subTUBEL, setSubTUBEL] = useState<SubLayananTUBEL>('')
  const [subUJIKOM, setSubUJIKOM] = useState<SubLayananUJIKOM>('')
  const [nomorSurat, setNomorSurat] = useState('')
  const [suratResult, setSuratResult] = useState<SuratResult | null>(null)
  const [suratError, setSuratError] = useState('')
  const [suratLoading, setSuratLoading] = useState(false)
  const [pegawai, setPegawai] = useState<Pegawai[]>([])
  const [showHukdisCheck, setShowHukdisCheck] = useState(false)
  const [showKonfirmasi, setShowKonfirmasi] = useState(false)
  const [showPwkSheet, setShowPwkSheet] = useState(false)
  const [pwkSearch, setPwkSearch] = useState('')
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const handleNomorSurat = (val: string) => {
    setNomorSurat(val)
    setSuratResult(null)
    setSuratError('')
    if (debounceRef.current) clearTimeout(debounceRef.current)
    if (val.trim().length < 5) return
    debounceRef.current = setTimeout(async () => {
      setSuratLoading(true)
      try {
        const params = new URLSearchParams({ no_surat: val.trim() })
        const res = await fetch(`https://api-interop.atrbpn.go.id/manajemen/interop/api/persuratan/cari-surat?${params}`, {
          headers: { Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiI5ZDFhZTJjNS01ZjRhLWIxYzgtZTA1My0wYzFkMTQwYTBlN2EiLCJlbWFpbCI6ImFyZGlhbnN5YWguaWxoYW1AYXRyYnBuLmdvLmlkIiwicm9sZSI6IlVzZXIiLCJuYmYiOjE2ODc1MDc0MzksImV4cCI6MjAwMzEyNjYzOSwiaWF0IjoxNjg3NTA3NDM5LCJpc3MiOiJ5b3VyaXNzdWVyMTIzIiwiYXVkIjoieW91cmF1ZGllbmNlMTIzIn0.6Q6aIkJYQDjrzf9R2MZ8z7rQ0LR7tRq4El3AbxEi6x0' },
        })
        const json = await res.json()
        const rows = Array.isArray(json) ? json : Array.isArray(json?.data) ? json.data : []
        if (!res.ok || rows.length === 0) {
          setSuratError('Surat tidak ditemukan')
          toast.error({ title: 'Surat Tidak Ditemukan', description: 'Nomor surat tidak ada di sistem.' })
        } else {
          const r = rows[0] as SuratResult
          setSuratResult(r)
          toast.success({
            title: 'Surat Ditemukan',
            description: `${r.PENGIRIM} · ${r.TANGGAL_SURAT}`,
            timeoutIndicator: true,
          })
        }
      } catch {
        setSuratError('Gagal menghubungi server')
        toast.error({ title: 'Gagal', description: 'Tidak dapat menghubungi server.' })
      } finally {
        setSuratLoading(false)
      }
    }, 600)
  }

  const handleLayanan = (val: Layanan) => {
    setLayanan(val)
    setSubIPG('')
    setSubTUBEL('')
    setSubUJIKOM('')
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setShowHukdisCheck(true)
  }

  const handleHukdisConfirm = (_extra?: PWKTujuan[]) => {
    setShowHukdisCheck(false)
    setShowKonfirmasi(true)
  }

  const subLayanan = layanan === 'IPG' ? subIPG : layanan === 'TUBEL' ? subTUBEL : layanan === 'UJIKOM' ? subUJIKOM : ''

  return (
    <>
    <HukdisCheckDialog
      open={showHukdisCheck}
      onClose={() => setShowHukdisCheck(false)}
      onConfirm={handleHukdisConfirm}
      pegawai={pegawai}
      layanan={layanan}
    />
    <KonfirmasiDialog
      open={showKonfirmasi}
      onClose={() => setShowKonfirmasi(false)}
      data={{ layanan, subLayanan, nomorSurat, pegawai }}
    />
    <div className="bg-slate-50 dark:bg-slate-950 px-4 pt-8 pb-10 sm:px-6 lg:px-10">
      {/* Breadcrumb */}
      <nav className="mb-6 flex items-center gap-1.5 text-xs text-slate-400">
        <span className="hover:text-slate-600 cursor-pointer dark:hover:text-slate-300">Dashboard</span>
        <ChevronRightIcon className="h-3.5 w-3.5" />
        <span className="font-medium text-slate-700 dark:text-slate-200">Form Permintaan</span>
      </nav>

      <form id="form-permintaan" onSubmit={handleSubmit} className="w-full">
        <div className="rounded-2xl bg-white dark:bg-slate-900">
          {/* Card header */}
          <div className="px-6 py-5">
            <h2 className="text-base font-semibold text-slate-800 dark:text-slate-100">Informasi Permintaan</h2>
            <p className="mt-0.5 text-sm text-slate-400">Lengkapi data permintaan layanan di bawah ini</p>
          </div>

          {/* Card body */}
          <div className="space-y-6 px-6 py-6">

            {/* 1. Nomor Surat Entri */}
            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">
                Nomor Surat Entri <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="974/ND-100.2.KP.01.01/VII/2026"
                  value={nomorSurat}
                  onChange={(e) => handleNomorSurat(e.target.value)}
                  className={`h-10 w-full rounded-xl border px-3 pr-10 text-sm text-slate-700 placeholder-slate-400 outline-none transition focus:ring-1 dark:text-slate-200 dark:placeholder-slate-500 ${
                    suratResult
                      ? 'border-emerald-400 bg-emerald-50 focus:border-emerald-500 focus:ring-emerald-500 dark:border-emerald-600 dark:bg-emerald-900/10'
                      : suratError
                      ? 'border-red-400 bg-red-50 focus:border-red-500 focus:ring-red-500 dark:border-red-600 dark:bg-red-900/10'
                      : 'border-slate-200 bg-white focus:border-indigo-500 focus:ring-indigo-500 dark:border-slate-600 dark:bg-slate-800'
                  }`}
                />
                <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2">
                  {suratLoading ? (
                    <svg className="h-4 w-4 animate-spin text-indigo-400" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                    </svg>
                  ) : suratResult ? (
                    <CheckCircleIcon className="h-4 w-4 text-emerald-500" />
                  ) : suratError ? (
                    <ExclamationCircleIcon className="h-4 w-4 text-red-500" />
                  ) : (
                    <MagnifyingGlassIcon className="h-4 w-4 text-slate-300" />
                  )}
                </div>
              </div>

              {/* Indikator kecil di bawah input jika ditemukan */}
              {suratResult && (
                <p className="mt-1.5 flex items-center gap-1 text-xs text-emerald-600 dark:text-emerald-400">
                  <CheckCircleIcon className="h-3.5 w-3.5" /> {suratResult.PENGIRIM} · {suratResult.TANGGAL_SURAT}
                </p>
              )}
            </div>

            {/* 2–4: hanya aktif setelah nomor surat valid */}
            <div className={!suratResult ? 'pointer-events-none opacity-40 select-none' : ''}>

            {/* Divider */}
            <div className="border-t border-slate-100 dark:border-slate-700" />

            {/* 2. Pilih Layanan */}
            <div className="pt-6">
              <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
                Pilih Layanan <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                {LAYANAN_OPTIONS.map(opt => (
                  <RadioCard
                    key={opt.value}
                    label={opt.label}
                    checked={layanan === opt.value}
                    onClick={() => handleLayanan(opt.value)}
                  />
                ))}
              </div>
            </div>

            {/* 3. Sub layanan — conditional */}
            {layanan === 'IPG' && (
              <div className="pt-6">
                <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
                  Jenis IPG <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {SUB_IPG.map((item) => (
                    <RadioCard key={item} label={item} checked={subIPG === item} onClick={() => setSubIPG(item)} />
                  ))}
                </div>
              </div>
            )}

            {layanan === 'TUBEL' && (
              <div className="pt-6">
                <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
                  Jenis Tugas Belajar <span className="text-red-500">*</span>
                </label>
                <div className="flex gap-3">
                  {SUB_TUBEL.map((item) => (
                    <RadioCard key={item} label={item} checked={subTUBEL === item} onClick={() => setSubTUBEL(item)} />
                  ))}
                </div>
              </div>
            )}

            {layanan === 'UJIKOM' && (
              <div className="pt-6">
                <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
                  Jenis Uji Kompetensi JF <span className="text-red-500">*</span>
                </label>
                <div className="flex gap-3">
                  {SUB_UJIKOM.map((item) => (
                    <RadioCard key={item} label={item} checked={subUJIKOM === item} onClick={() => setSubUJIKOM(item)} />
                  ))}
                </div>
              </div>
            )}

            {/* Divider */}
            <div className="mt-6 border-t border-slate-100 dark:border-slate-700" />

            {/* 4. Nama Pegawai */}
            <div className="pt-6">
              <label className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">
                Nama Pegawai <span className="text-red-500">*</span>
              </label>

              {layanan === 'PWK' ? (
                /* PWK — pilih dari sheet */
                <div>
                  <button
                    type="button"
                    onClick={() => { setShowPwkSheet(true); setPwkSearch('') }}
                    className="flex w-full items-center justify-between rounded-xl border-2 border-dashed border-slate-200 px-4 py-3 text-sm text-slate-500 transition hover:border-indigo-400 hover:text-indigo-600 dark:border-slate-700 dark:text-slate-400"
                  >
                    <span className="flex items-center gap-2">
                      <UserGroupIcon className="h-4 w-4" />
                      {pegawai.length === 0 ? 'Pilih pegawai rekomendasi PWK...' : `${pegawai.length} pegawai dipilih`}
                    </span>
                    <ChevronRightIcon className="h-4 w-4" />
                  </button>
                  {pegawai.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-2">
                      {pegawai.map(p => (
                        <span key={p.nip} className="inline-flex items-center gap-1.5 rounded-full bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300">
                          {p.nama}
                          <button type="button" onClick={() => setPegawai(prev => prev.filter(x => x.nip !== p.nip))}>
                            <XMarkIcon className="h-3 w-3" />
                          </button>
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <>
                  <p className="mb-2 text-xs text-slate-400 dark:text-slate-500">
                    Dapat memilih lebih dari satu pegawai. Cari berdasarkan NIP atau nama.
                  </p>
                  <PegawaiMultiSelect value={pegawai} onChange={setPegawai} />
                </>
              )}
            </div>

            </div>

          </div>

          {/* Actions */}
          <div className="flex gap-3 border-t border-slate-100 px-6 py-4 dark:border-slate-700">
            <button
              type="submit"
              disabled={!suratResult}
              className="rounded-lg bg-indigo-600 px-5 py-2 text-sm font-medium text-white transition hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-indigo-600"
            >
              Simpan
            </button>
            <button
              type="button"
              className="rounded-lg border border-slate-200 bg-white px-5 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-50 dark:border-slate-600 dark:bg-transparent dark:text-slate-300 dark:hover:bg-slate-800"
            >
              Batal
            </button>
          </div>
        </div>
      </form>
    </div>

    {/* PWK Pegawai Sheet */}
    {showPwkSheet && (
      <div className="fixed inset-0 z-40 flex">
        <div className="flex-1 bg-slate-950/40 backdrop-blur-sm" onClick={() => setShowPwkSheet(false)} />
        <div className="flex w-full max-w-sm flex-col bg-white shadow-2xl dark:bg-slate-900 sm:max-w-md">

          {/* Header */}
          <div className="border-b border-slate-100 px-5 pt-5 pb-4 dark:border-slate-700">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-base font-semibold text-slate-800 dark:text-slate-100">Pilih Pegawai</p>
                <p className="mt-0.5 text-xs text-slate-400">Dapat memilih lebih dari satu pegawai</p>
              </div>
              <button
                type="button"
                onClick={() => setShowPwkSheet(false)}
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-slate-200 bg-slate-50 text-slate-500 transition hover:border-slate-300 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:hover:bg-slate-700"
              >
                <XMarkIcon className="h-4 w-4" />
              </button>
            </div>
            {/* Search */}
            <div className="relative mt-3">
              <MagnifyingGlassIcon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                autoFocus
                type="text"
                placeholder="Cari NIP atau nama pegawai..."
                value={pwkSearch}
                onChange={e => setPwkSearch(e.target.value)}
                className="h-9 w-full rounded-xl border border-slate-200 bg-slate-50 pl-9 pr-3 text-sm text-slate-700 placeholder-slate-400 outline-none transition focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
              />
            </div>
          </div>

          {/* Selected badge */}
          {pegawai.length > 0 && (
            <div className="flex items-center justify-between border-b border-slate-100 bg-indigo-50 px-5 py-2 dark:border-slate-700 dark:bg-indigo-900/20">
              <span className="text-xs font-medium text-indigo-700 dark:text-indigo-300">
                {pegawai.length} pegawai dipilih
              </span>
              <button type="button" onClick={() => setPegawai([])} className="text-xs text-indigo-500 hover:text-indigo-700">
                Hapus semua
              </button>
            </div>
          )}

          {/* List */}
          <div className="flex-1 overflow-y-auto p-4">
            {(() => {
              const q = pwkSearch.toLowerCase()
              const rekList = daftarPWK.filter(r => r.verifikasiKanwil === 'menunggu' && (!q || r.pegawai.nama.toLowerCase().includes(q) || r.pegawai.nip.includes(q)))
              if (rekList.length === 0) return (
                <div className="flex flex-col items-center gap-4 py-16 text-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50 dark:border-slate-700 dark:bg-slate-800">
                    <XMarkIcon className="h-8 w-8 text-slate-300 dark:text-slate-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-600 dark:text-slate-300">Belum ada rekomendasi PWK</p>
                    <p className="mt-0.5 text-xs text-slate-400">Tambahkan pegawai di menu PWK terlebih dahulu</p>
                  </div>
                  <Link
                    href="/pwk"
                    onClick={() => setShowPwkSheet(false)}
                    className="flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-indigo-500"
                  >
                    <ArrowsRightLeftIcon className="h-4 w-4" />
                    Ke Menu PWK
                  </Link>
                </div>
              )
              return (
                <div className="space-y-2">
                  {rekList.map(r => {
                    const checked = pegawai.some(p => p.nip === r.pegawai.nip)
                    return (
                      <label key={r.id} className={`flex cursor-pointer items-start gap-3 rounded-xl border-2 p-4 transition ${checked ? 'border-indigo-500 bg-indigo-50 dark:border-indigo-600 dark:bg-indigo-900/20' : 'border-slate-200 bg-white hover:border-slate-300 dark:border-slate-700 dark:bg-slate-800'}`}>
                        <div className={`mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded border-2 transition ${checked ? 'border-indigo-600 bg-indigo-600' : 'border-slate-300 bg-white dark:border-slate-600 dark:bg-slate-700'}`}>
                          {checked && <svg className="h-2.5 w-2.5 text-white" fill="none" viewBox="0 0 12 12"><path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>}
                        </div>
                        <input type="checkbox" checked={checked} className="sr-only" onChange={e => {
                          if (e.target.checked) setPegawai(prev => [...prev, r.pegawai])
                          else setPegawai(prev => prev.filter(p => p.nip !== r.pegawai.nip))
                        }} />
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-semibold text-slate-800 dark:text-slate-100">{r.pegawai.nama}</p>
                          <p className="text-xs text-slate-400">{r.pegawai.nip} · {r.pegawai.jabatan}</p>
                          <div className="mt-2 space-y-0.5">
                            <p className="text-xs text-slate-500 dark:text-slate-400"><span className="font-medium">Kantah Asal&nbsp;&nbsp;:</span> {r.kantahAsal}</p>
                            <p className="text-xs text-slate-500 dark:text-slate-400"><span className="font-medium">Kantah Tujuan :</span> {r.kantahTujuan}</p>
                          </div>
                        </div>
                      </label>
                    )
                  })}
                </div>
              )
            })()}
          </div>

          {/* Footer */}
          <div className="border-t border-slate-100 px-5 py-4 dark:border-slate-700">
            <button
              type="button"
              onClick={() => setShowPwkSheet(false)}
              className="w-full rounded-xl bg-indigo-600 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-500 disabled:opacity-40"
            >
              Selesai {pegawai.length > 0 ? `(${pegawai.length} dipilih)` : ''}
            </button>
          </div>
        </div>
      </div>
    )}
</>
  )
}
