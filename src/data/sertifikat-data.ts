export interface SertifikatUjiKom {
  id: string
  nip: string
  nama: string
  jabatan: string
  unit: string
  kode: string
  subLayanan: 'Perpindahan Jabatan' | 'Kenaikan Jenjang'
  tanggalPengajuan: string
  nomorND?: string
  tanggalND?: string
  perihal?: string
  fileSertifikat?: string
  status: 'belum' | 'sudah'
}

export const daftarSertifikatUjiKom: SertifikatUjiKom[] = []
