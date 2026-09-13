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

export const daftarPWK: PWKRekomendasi[] = [
  {
    id: 'pwk-001',
    pegawai: { nip: '199303032017033005', nama: 'Doni Firmansyah', jabatan: 'Auditor Kepegawaian', unit: 'Inspektorat Jenderal' },
    kantahAsal: 'Kantor Pusat – Jakarta', kantahTujuan: 'Kanwil BPN Jawa Barat',
    dokumen: [{ nama: 'Surat Permohonan.pdf', ukuran: '245 KB' }, { nama: 'SK Penempatan.pdf', ukuran: '512 KB' }],
    tanggal: '10 Februari 2026',
    verifikasiKanwil: 'disetujui', verifikasiKanwilTujuan: 'disetujui', verifikasiBiroSDM: 'disetujui',
    selesai: true, nomorSurat: 'S-001/SDM.1/2026', nomorSK: 'SK-PWK-2026-001',
  },
  {
    id: 'pwk-002',
    pegawai: { nip: '198902022011012002', nama: 'Nina Kurniawati', jabatan: 'Arsiparis Ahli Muda', unit: 'Biro Umum' },
    kantahAsal: 'Kantor Pusat – Jakarta', kantahTujuan: 'Kanwil BPN Jawa Tengah',
    dokumen: [{ nama: 'Surat Permohonan.pdf', ukuran: '198 KB' }, { nama: 'Rekomendasi Atasan.pdf', ukuran: '301 KB' }],
    tanggal: '02 Mei 2026',
    verifikasiKanwil: 'disetujui', verifikasiKanwilTujuan: 'menunggu', verifikasiBiroSDM: 'menunggu',
    selesai: false,
  },
  {
    id: 'pwk-003',
    pegawai: { nip: '199808082022088010', nama: 'Joko Widiantoro', jabatan: 'Pranata Komputer Ahli Pertama', unit: 'Pusat Data dan Teknologi' },
    kantahAsal: 'Kantor Pusat – Jakarta', kantahTujuan: 'Kanwil BPN DI Yogyakarta',
    dokumen: [{ nama: 'Surat Permohonan.pdf', ukuran: '220 KB' }],
    tanggal: '02 Mei 2026',
    verifikasiKanwil: 'menunggu', verifikasiKanwilTujuan: 'menunggu', verifikasiBiroSDM: 'menunggu',
    selesai: false,
  },
  {
    id: 'pwk-004',
    pegawai: { nip: '199505052019055007', nama: 'Fajar Hidayat', jabatan: 'Pengembang Teknologi', unit: 'Pusat Data dan Teknologi' },
    kantahAsal: 'Kantor Pusat – Jakarta', kantahTujuan: 'Kanwil BPN Jawa Timur',
    dokumen: [{ nama: 'Surat Permohonan.pdf', ukuran: '267 KB' }, { nama: 'Data Keluarga.pdf', ukuran: '189 KB' }],
    tanggal: '20 Juli 2026',
    verifikasiKanwil: 'disetujui', verifikasiKanwilTujuan: 'disetujui', verifikasiBiroSDM: 'disetujui',
    selesai: true, nomorSurat: 'S-002/SDM.1/2026', nomorSK: 'SK-PWK-2026-002',
  },
  {
    id: 'pwk-005',
    pegawai: { nip: '199404042018044006', nama: 'Endah Wulandari', jabatan: 'Pengelola BMN', unit: 'Biro Umum' },
    kantahAsal: 'Kantor Pusat – Jakarta', kantahTujuan: 'Kanwil BPN Sumatera Utara',
    dokumen: [{ nama: 'Surat Permohonan.pdf', ukuran: '234 KB' }],
    tanggal: '13 September 2026',
    verifikasiKanwil: 'menunggu', verifikasiKanwilTujuan: 'menunggu', verifikasiBiroSDM: 'menunggu',
    selesai: false,
  },
]
