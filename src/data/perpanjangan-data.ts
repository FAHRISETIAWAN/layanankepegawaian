export interface PerpanjanganTubel {
  id: string
  nip: string
  nama: string
  jabatan: string
  unit: string
  kode: string
  tanggalPengajuan: string
  nomorSKPerpanjangan?: string
  tanggalSKPerpanjangan?: string
  tmtSelesaiPerpanjangan?: string
  fileSKPerpanjangan?: string
  status: 'belum' | 'sudah'
}

export const daftarPerpanjangan: PerpanjanganTubel[] = []
