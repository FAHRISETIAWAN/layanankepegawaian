import { api } from './client'

export type KeputusanKelengkapan = 'menunggu' | 'setuju' | 'tolak'

export interface Kelengkapan {
  id: string
  pengajuanId: string
  nipPegawai: string
  keputusan: KeputusanKelengkapan
  catatan?: string
  bebasHukdisPath?: string
  bebasHukdisFilename?: string
}

export interface UpdateKelengkapanDto {
  keputusan: KeputusanKelengkapan
  catatan?: string
  bebasHukdisPath?: string
  bebasHukdisFilename?: string
}

export interface KelengkapanSummary {
  total: number
  setuju: number
  tolak: number
  menunggu: number
  selesai: boolean
}

export const kelengkapanApi = {
  getByPengajuan: (pengajuanId: string)        => api.get<Kelengkapan[]>(`/kelengkapan/${pengajuanId}`),
  getSummary:     (pengajuanId: string)        => api.get<KelengkapanSummary>(`/kelengkapan/${pengajuanId}/summary`),
  getOne:         (pengajuanId: string, nip: string) => api.get<Kelengkapan>(`/kelengkapan/${pengajuanId}/${nip}`),
  update:         (pengajuanId: string, nip: string, dto: UpdateKelengkapanDto) =>
    api.patch<Kelengkapan>(`/kelengkapan/${pengajuanId}/${nip}`, dto),
}
