import type { JenisLayanan, StatusPengajuan } from './verifikasi-data'

export interface LaporanItem {
  id: string
  kode: string
  tanggal: string
  bulan: number
  tahun: number
  layanan: JenisLayanan
  nomorSurat: string
  status: StatusPengajuan
  pegawai: { nama: string; nip: string; jabatan: string; unit: string }[]
}

export const dataLaporan: LaporanItem[] = []

export const namaBulan = [
  'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
  'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember',
]
