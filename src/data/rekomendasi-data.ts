export interface RekomendasiUjiKom {
  id: string
  nip: string
  nama: string
  jabatan: string
  unit: string
  kode: string
  subLayanan: string
  tanggalPengajuan: string
  nomorRekomendasi?: string
  tanggalSurat?: string
  fileSurat?: string
  status: 'belum' | 'sudah'
}

export const daftarRekomendasiUjiKom: RekomendasiUjiKom[] = []
