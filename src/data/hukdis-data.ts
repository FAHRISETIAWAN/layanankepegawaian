export type TingkatHukdis = 'Ringan' | 'Sedang' | 'Berat'
export type StatusHukdis  = 'Aktif' | 'Selesai'

export interface HukdisItem {
  id: string
  nip: string
  nama: string
  jabatan: string
  unit: string
  jenisPelanggaran: string
  tingkat: TingkatHukdis
  nomorSK: string
  tanggalSK: string
  masaBerlaku: string
  status: StatusHukdis
}

export const daftarHukdis: HukdisItem[] = []
