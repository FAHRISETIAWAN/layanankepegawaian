import type { Pegawai } from './pegawai-data'

export type StatusVerifikasi = 'menunggu' | 'disetujui' | 'ditolak'

export interface DokumenPWK {
  nama: string
  ukuran: string
}

export interface PWKRekomendasi {
  id: string
  pegawai: Pegawai
  kantahAsal: string
  kantahTujuan: string
  dokumen: DokumenPWK[]
  tanggal: string
  verifikasiKanwil: StatusVerifikasi
  verifikasiKanwilTujuan: StatusVerifikasi
  verifikasiBiroSDM: StatusVerifikasi
  selesai: boolean
  nomorSurat?: string
  nomorSK?: string
}

export const daftarPWK: PWKRekomendasi[] = []
