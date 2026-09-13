import { api } from './client'

export type StatusPengajuan = 'menunggu' | 'diproses' | 'diverifikasi' | 'ditolak'
export type JenisLayanan =
  | 'IPG Profesi' | 'IPG Sertifikasi' | 'IPG Akademik'
  | 'Tugas Belajar Mandiri' | 'Tugas Belajar Beasiswa'
  | 'Pindah Wilayah Kerja'
  | 'Uji Kompetensi JF - Perpindahan Jabatan'
  | 'Uji Kompetensi JF - Kenaikan Jenjang'

export interface PengajuanPegawai {
  id: string
  nipPegawai: string
  namaPegawai: string
  jenis: string
}

export interface Pengajuan {
  id: string
  kode: string
  layanan: JenisLayanan
  subLayanan?: string
  nomorSurat: string
  tanggal: string
  status: StatusPengajuan
  pegawaiList: PengajuanPegawai[]
}

export interface CreatePengajuanDto {
  layanan: JenisLayanan
  subLayanan?: string
  nomorSurat: string
  tanggal: string
  pegawaiList: { nipPegawai: string; namaPegawai: string; jenis?: string }[]
}

export const pengajuanApi = {
  getAll:        (layanan?: JenisLayanan, status?: StatusPengajuan) => {
    const params = new URLSearchParams()
    if (layanan) params.set('layanan', layanan)
    if (status)  params.set('status', status)
    const qs = params.toString()
    return api.get<Pengajuan[]>(`/pengajuan${qs ? '?' + qs : ''}`)
  },
  getOne:        (id: string)                   => api.get<Pengajuan>(`/pengajuan/${id}`),
  getByKode:     (kode: string)                 => api.get<Pengajuan>(`/pengajuan/kode/${kode}`),
  create:        (dto: CreatePengajuanDto)      => api.post<Pengajuan>('/pengajuan', dto),
  updateStatus:  (id: string, status: StatusPengajuan) => api.patch<Pengajuan>(`/pengajuan/${id}/status`, { status }),
}
