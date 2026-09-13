import { api } from './client'

export type StatusVerifikasi = 'menunggu' | 'disetujui' | 'ditolak'

export interface Verifikasi {
  id: string
  pengajuanId: string
  nipVerifikator: string
  status: StatusVerifikasi
  alasanPenolakan?: string
  catatanVerifikator?: string
  updatedAt: string
}

export interface UpdateVerifikasiDto {
  status: StatusVerifikasi
  alasanPenolakan?: string
  catatanVerifikator?: string
}

export const verifikasiApi = {
  getAll:   (status?: StatusVerifikasi, verifikator?: string) => {
    const params = new URLSearchParams()
    if (status)      params.set('status', status)
    if (verifikator) params.set('verifikator', verifikator)
    const qs = params.toString()
    return api.get<Verifikasi[]>(`/verifikasi${qs ? '?' + qs : ''}`)
  },
  getStats: ()                               => api.get<Record<string, number>>('/verifikasi/stats'),
  getByPengajuan: (pengajuanId: string)      => api.get<Verifikasi>(`/verifikasi/${pengajuanId}`),
  init:     (pengajuanId: string, nipVerifikator: string) =>
    api.post<Verifikasi>(`/verifikasi/${pengajuanId}/init`, { nipVerifikator }),
  update:   (pengajuanId: string, dto: UpdateVerifikasiDto) =>
    api.patch<Verifikasi>(`/verifikasi/${pengajuanId}`, dto),
}
