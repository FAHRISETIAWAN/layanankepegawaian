'use client'

import { DropdownSelect } from '@/components/form/dropdown-select'
import { daftarHukdis, type HukdisItem, type TingkatHukdis } from '@/data/hukdis-data'
import { Pagination } from '@/components/ui/pagination'
import { ChevronRightIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import { useState } from 'react'

const TINGKAT_OPTIONS = [
  { value: '',       label: 'Semua Tingkat' },
  { value: 'Ringan', label: 'Ringan' },
  { value: 'Sedang', label: 'Sedang' },
  { value: 'Berat',  label: 'Berat' },
]

const TINGKAT_STYLE: Record<TingkatHukdis, string> = {
  Ringan: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
  Sedang: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400',
  Berat:  'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
}

const STATUS_STYLE: Record<HukdisItem['status'], string> = {
  Aktif:   'bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400',
  Selesai: 'bg-slate-100 text-slate-500 dark:bg-slate-700 dark:text-slate-400',
}

export default function HukdisPage() {
  const [search, setSearch] = useState('')
  const [tingkatFilter, setTingkatFilter] = useState<TingkatHukdis | ''>('')
  const [page, setPage] = useState(1)

  const PAGE_SIZE = 20

  const filtered = daftarHukdis.filter(item => {
    const q = search.toLowerCase()
    const matchSearch = !q ||
      item.nama.toLowerCase().includes(q) ||
      item.nip.includes(q) ||
      item.nomorSK.toLowerCase().includes(q) ||
      item.jenisPelanggaran.toLowerCase().includes(q) ||
      item.unit.toLowerCase().includes(q)
    const matchTingkat = !tingkatFilter || item.tingkat === tingkatFilter
    return matchSearch && matchTingkat
  })

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE)
  const paged = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-8 dark:bg-slate-950 sm:px-6 lg:px-10">
      {/* Breadcrumb */}
      <nav className="mb-6 flex items-center gap-1.5 text-xs text-slate-400">
        <span className="cursor-pointer hover:text-slate-600 dark:hover:text-slate-300">Dashboard</span>
        <ChevronRightIcon className="h-3.5 w-3.5" />
        <span className="font-medium text-slate-700 dark:text-slate-200">Hukuman Disiplin</span>
      </nav>

      <div className="rounded-2xl bg-white dark:bg-slate-900">
        {/* Header */}
        <div className="flex flex-col gap-3 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-base font-semibold text-slate-800 dark:text-slate-100">Hukuman Disiplin</h2>
            <p className="mt-0.5 text-sm text-slate-400">Daftar pegawai yang menerima hukuman disiplin</p>
          </div>
          <div className="flex items-center gap-2">
            {/* Filter tingkat */}
            <div className="w-44">
              <DropdownSelect
                value={tingkatFilter}
                onChange={v => setTingkatFilter(v as TingkatHukdis | '')}
                options={TINGKAT_OPTIONS}
                placeholder="Semua Tingkat"
              />
            </div>
            {/* Search */}
            <div className="relative w-full sm:w-64">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Cari nama, NIP, nomor SK..."
                className="h-9 w-full rounded-xl border border-slate-200 bg-white pl-9 pr-3 text-sm text-slate-700 placeholder-slate-400 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200 dark:placeholder-slate-500"
              />
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-y border-slate-100 bg-slate-50 dark:border-slate-700 dark:bg-slate-800/50">
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wide text-slate-400">Nama</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wide text-slate-400">Jabatan</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wide text-slate-400">Satker</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wide text-slate-400">Pelanggaran</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wide text-slate-400">Tingkat</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wide text-slate-400">Nomor SK</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wide text-slate-400">Tanggal SK</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wide text-slate-400">Masa Berlaku</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wide text-slate-400">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={9} className="py-12 text-center text-sm text-slate-400">
                    Tidak ada data ditemukan
                  </td>
                </tr>
              ) : paged.map(item => (
                <tr key={item.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                  <td className="px-6 py-4">
                    <p className="font-medium text-slate-800 dark:text-slate-100">{item.nama}</p>
                    <p className="text-xs text-slate-400">{item.nip}</p>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-300">{item.jabatan}</td>
                  <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-300">{item.unit}</td>
                  <td className="px-6 py-4 text-slate-600 dark:text-slate-300">{item.jenisPelanggaran}</td>
                  <td className="px-6 py-4">
                    <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${TINGKAT_STYLE[item.tingkat]}`}>
                      {item.tingkat}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-mono text-xs text-slate-500 dark:text-slate-400">{item.nomorSK}</td>
                  <td className="px-6 py-4 text-slate-600 dark:text-slate-300">{item.tanggalSK}</td>
                  <td className="px-6 py-4 text-slate-600 dark:text-slate-300">{item.masaBerlaku}</td>
                  <td className="px-6 py-4">
                    <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${STATUS_STYLE[item.status]}`}>
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
        {/* Footer count */}
        <div className="border-t border-slate-100 px-6 py-3 dark:border-slate-700">
          <p className="text-xs text-slate-400">{filtered.length} dari {daftarHukdis.length} data</p>
        </div>
      </div>
    </div>
  )
}
