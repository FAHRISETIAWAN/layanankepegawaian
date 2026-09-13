export type StatusPengajuan = 'menunggu' | 'diproses' | 'diverifikasi' | 'ditolak'
export type JenisLayanan =
  | 'IPG Profesi' | 'IPG Sertifikasi' | 'IPG Akademik'
  | 'Tugas Belajar Mandiri' | 'Tugas Belajar Beasiswa'
  | 'Pindah Wilayah Kerja'
  | 'Uji Kompetensi JF - Perpindahan Jabatan'
  | 'Uji Kompetensi JF - Kenaikan Jenjang'

export interface DokumenItem {
  nama: string
  file: string
  ukuran: string
}

export interface DataProfesiPegawai {
  klasifikasiProfesi: string
  namaProfesi: string
  nomorSertifikat: string
  tanggalTerbit: string
  gelarDepan?: string
  gelarBelakang?: string
  lembagaPenyelenggara: string
  jenisProfesi: string
}

export interface DataPendidikanPegawai {
  nama: string
  nip: string
  golongan: string
  jabatan: string
  unitKerja: string
  sponsor: string
  jurusan: string
  programStudi: string
  namaUniversitas: string
  namaJabatan?: string
}

export interface DataUjiKomPerpindahan {
  jenisPerpindahan: string
  dari: string
  ke: string
}

export interface DataUjiKomKenaikan {
  dari: string
  ke: string
}

export interface PegawaiPengajuan {
  nama: string
  nip: string
  jabatan: string
  unit: string
  formData?: DataProfesiPegawai | DataPendidikanPegawai | DataUjiKomPerpindahan | DataUjiKomKenaikan
  dokumen: DokumenItem[]
}

export interface PengajuanVerifikasi {
  id: string
  kode: string
  tanggal: string
  layanan: JenisLayanan
  nomorSurat: string
  status: StatusPengajuan
  pegawai: PegawaiPengajuan[]
}

export const alasanPenolakan = [
  'Dokumen tidak lengkap',
  'Format dokumen tidak sesuai',
  'NIP pegawai tidak valid',
  'Nomor surat tidak terdaftar',
  'Pegawai tidak memenuhi syarat',
  'Masa kerja belum mencukupi',
  'Kuota sudah terpenuhi',
  'Lainnya',
]

export const daftarPengajuan: PengajuanVerifikasi[] = []
