'use client'

import { DetailSheet } from '@/components/verifikasi/detail-sheet'
import { pengajuanApi, type Pengajuan } from '@/lib/api/pengajuan'
import { verifikasiApi } from '@/lib/api/verifikasi'
import type { PengajuanVerifikasi } from '@/data/verifikasi-data'
import {
  AcademicCapIcon,
  ArrowsRightLeftIcon,
  BriefcaseIcon,
  ChevronRightIcon,
  ClipboardDocumentCheckIcon,
  MagnifyingGlassIcon,
  MapPinIcon,
  TrophyIcon,
} from '@heroicons/react/24/outline'
import { Pagination } from '@/components/ui/pagination'
import { useEffect, useState } from 'react'

// Adapter: konversi Pengajuan API → PengajuanVerifikasi (shape yg dipakai DetailSheet)
function toVerifikasiShape(p: Pengajuan): PengajuanVerifikasi {
  return {
    id: p.id,
    kode: p.kode,
    tanggal: new Date(p.tanggal).toLocaleDateString('id-ID', { day: '2-digit', month: 'long', year: 'numeric' }),
    layanan: p.layanan,
    nomorSurat: p.nomorSurat,
    status: p.status,
    pegawai: (p.pegawaiList ?? []).map(pg => ({
      nama: pg.namaPegawai,
      nip: pg.nipPegawai,
      jabatan: pg.jenis ?? '',
      unit: '',
      dokumen: [],
    })),
  }
}

const layananMeta: Record<string, { bg: string; icon: React.ReactNode }> = {
  'IPG Profesi':                             { bg: 'bg-indigo-100 text-indigo-600 dark:bg-indigo-900/40 dark:text-indigo-400', icon: <BriefcaseIcon className="h-5 w-5" /> },
  'IPG Sertifikasi':                         { bg: 'bg-violet-100 text-violet-600 dark:bg-violet-900/40 dark:text-violet-400', icon: <BriefcaseIcon className="h-5 w-5" /> },
  'IPG Akademik':                            { bg: 'bg-blue-100 text-blue-600 dark:bg-blue-900/40 dark:text-blue-400',         icon: <BriefcaseIcon className="h-5 w-5" /> },
  'Tugas Belajar Mandiri':                   { bg: 'bg-teal-100 text-teal-600 dark:bg-teal-900/40 dark:text-teal-400',         icon: <AcademicCapIcon className="h-5 w-5" /> },
  'Tugas Belajar Beasiswa':                  { bg: 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/40 dark:text-emerald-400', icon: <AcademicCapIcon className="h-5 w-5" /> },
  'Pindah Wilayah Kerja':                    { bg: 'bg-orange-100 text-orange-600 dark:bg-orange-900/40 dark:text-orange-400',   icon: <MapPinIcon className="h-5 w-5" /> },
  'Uji Kompetensi JF - Perpindahan Jabatan': { bg: 'bg-rose-100 text-rose-600 dark:bg-rose-900/40 dark:text-rose-400',           icon: <ArrowsRightLeftIcon className="h-5 w-5" /> },
  'Uji Kompetensi JF - Kenaikan Jenjang':    { bg: 'bg-pink-100 text-pink-600 dark:bg-pink-900/40 dark:text-pink-400',           icon: <TrophyIcon className="h-5 w-5" /> },
}

export default function VerifikasiPage() {
  const [data, setData]           = useState<PengajuanVerifikasi[]>([])
  const [loading, setLoading]     = useState(true)
  const [error, setError]         = useState('')
  const [search, setSearch]       = useState('')
  const [selectedItem, setSelectedItem] = useState<PengajuanVerifikasi | null>(null)
  const [page, setPage] = useState(1)

  async function load() {
    setLoading(true)
    try {
      const list = await pengajuanApi.getAll(undefined, 'menunggu')
      setData(list.map(toVerifikasiShape))
    } catch (e: any) {
      setError(e?.message ?? 'Gagal memuat data')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { load() }, [])

  const PAGE_SIZE = 20

  const filtered = data.filter((item) => {
    const q = search.toLowerCase()
    return (
      !q ||
      item.kode.toLowerCase().includes(q) ||
      item.nomorSurat.toLowerCase().includes(q) ||
      item.layanan.toLowerCase().includes(q) ||
      item.pegawai.some((p) => p.nama.toLowerCase().includes(q) || p.nip.includes(q))
    )
  })

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE)
  const paged = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  const handleVerifikasi = async (id: string) => {
    await verifikasiApi.update(id, { status: 'disetujui' }).catch(() => {})
    await pengajuanApi.updateStatus(id, 'diverifikasi').catch(() => {})
    setData((prev) => prev.filter((item) => item.id !== id))
  }

  const handleTolak = async (id: string, alasan: string) => {
    await verifikasiApi.update(id, { status: 'ditolak', alasanPenolakan: alasan }).catch(() => {})
    await pengajuanApi.updateStatus(id, 'ditolak').catch(() => {})
    setData((prev) => prev.filter((item) => item.id !== id))
  }

  return (
    <>
      <div className="min-h-screen bg-slate-50 px-4 py-8 dark:bg-slate-950 sm:px-6 lg:px-10">
        <nav className="mb-6 flex items-center gap-1.5 text-xs text-slate-400">
          <span className="cursor-pointer hover:text-slate-600 dark:hover:text-slate-300">Dashboard</span>
          <ChevronRightIcon className="h-3.5 w-3.5" />
          <span className="font-medium text-slate-700 dark:text-slate-200">Verifikasi Pengajuan</span>
        </nav>

        <div className="rounded-2xl bg-white dark:bg-slate-900">
          <div className="flex flex-col gap-3 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-base font-semibold text-slate-800 dark:text-slate-100">Verifikasi Pengajuan</h2>
              <p className="mt-0.5 text-sm text-slate-400">Daftar pengajuan yang menunggu verifikasi</p>
            </div>
            <div className="relative w-full sm:w-72">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Cari nomor surat, kode, pegawai..."
                className="w-full rounded-lg border border-slate-200 bg-slate-50 py-2 pl-9 pr-4 text-sm text-slate-700 outline-none transition focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200 dark:placeholder-slate-400"
              />
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
                <ClipboardDocumentCheckIcon className="mb-3 h-10 w-10 text-slate-300 dark:text-slate-600" />
                <p className="text-sm font-medium text-slate-500">Tidak ada pengajuan yang menunggu verifikasi</p>
                <p className="text-xs text-slate-400">Semua pengajuan sudah diproses</p>
              </div>
            ) : (
              paged.map((item) => {
                const meta = layananMeta[item.layanan] ?? { bg: 'bg-slate-100 text-slate-600', icon: <BriefcaseIcon className="h-5 w-5" /> }
                return (
                  <div key={item.id} className="flex items-center gap-4 py-4">
                    <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${meta.bg}`}>
                      {meta.icon}
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                        <span className="font-mono text-sm font-semibold text-slate-700 dark:text-slate-200">{item.kode}</span>
                        <span className="rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-semibold text-amber-700 dark:bg-amber-900/30 dark:text-amber-400">
                          Menunggu
                        </span>
                      </div>
                      <p className="mt-0.5 truncate text-xs text-slate-400">
                        {item.layanan} · {item.nomorSurat} · {item.tanggal}
                      </p>
                      <p className="mt-0.5 truncate text-xs text-slate-500 dark:text-slate-400">
                        {item.pegawai.map(p => p.nama).join(', ')}
                        <span className="text-slate-400"> ({item.pegawai.length} orang)</span>
                      </p>
                    </div>

                    <button
                      onClick={() => setSelectedItem(item)}
                      className="shrink-0 rounded-lg border border-indigo-200 bg-indigo-50 px-4 py-2 text-xs font-semibold text-indigo-600 transition hover:bg-indigo-100 dark:border-indigo-800/50 dark:bg-indigo-900/20 dark:text-indigo-400"
                    >
                      Detail
                    </button>
                  </div>
                )
              })
            )}
          </div>

          <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
          <div className="px-6 py-3">
            <p className="text-xs text-slate-400">Menampilkan {paged.length} dari {filtered.length} pengajuan</p>
          </div>
        </div>
      </div>

      <DetailSheet
        item={selectedItem}
        onClose={() => setSelectedItem(null)}
        onVerifikasi={handleVerifikasi}
        onTolak={handleTolak}
      />
    </>
  )
}
