import { api } from './client'

export interface RekapPerLayanan {
  layanan: string
  total: number
  menunggu: number
  diproses: number
  diverifikasi: number
  ditolak: number
}

export interface RekapPerBulan {
  bulan: string
  layanan: string
  total: number
}

export interface StatistikDashboard {
  perLayanan: RekapPerLayanan[]
  perStatus: Record<string, number>
}

export const laporanApi = {
  rekapPerLayanan:    (tahun?: number)                       => api.get<RekapPerLayanan[]>(`/laporan/per-layanan${tahun ? '?tahun=' + tahun : ''}`),
  rekapPerBulan:      (tahun?: number, layanan?: string)     => {
    const params = new URLSearchParams()
    if (tahun)   params.set('tahun', String(tahun))
    if (layanan) params.set('layanan', layanan)
    const qs = params.toString()
    return api.get<RekapPerBulan[]>(`/laporan/per-bulan${qs ? '?' + qs : ''}`)
  },
  statistikDashboard: ()                                     => api.get<StatistikDashboard>('/laporan/statistik'),
}
