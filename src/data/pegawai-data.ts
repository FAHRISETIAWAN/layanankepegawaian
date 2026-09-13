export interface Pegawai {
  nip: string
  nama: string
  jabatan: string
  unit: string
  verifikatorMutasi?: string
}

export const daftarPegawai: Pegawai[] = []
