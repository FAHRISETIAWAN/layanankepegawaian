export type JenisSK = 'IPG' | 'TUBEL'

export interface SKPegawai {
  id: string
  nip: string
  nama: string
  jabatan: string
  unit: string
  kode: string
  layanan: string
  jenis: JenisSK
  tanggalPengajuan: string
  nomorSK?: string
  tanggalSK?: string
  nomorST?: string
  masaTugas?: string
  tmtSelesai?: string
  fileSK?: string
  filePerjanjian?: string
  fileST?: string
  tanggalST?: string
  status: 'belum' | 'sudah'
}

export const daftarSKPegawai: SKPegawai[] = []
