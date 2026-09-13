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

export const daftarRekomendasiUjiKom: RekomendasiUjiKom[] = [
  { id: 'rk-001', nip: '199404042018044006', nama: 'Endah Wulandari', jabatan: 'Pengelola BMN',                 unit: 'Biro Umum',                kode: 'UJK-2026-001', subLayanan: 'Kenaikan Jenjang',      tanggalPengajuan: '20 Februari 2026',  status: 'belum' },
  { id: 'rk-002', nip: '199101012015011003', nama: 'Rizky Prasetyo',  jabatan: 'Pranata Humas Ahli Pertama',   unit: 'Biro Komunikasi',          kode: 'UJK-2026-002', subLayanan: 'Perpindahan Jabatan',   tanggalPengajuan: '10 Maret 2026',     nomorRekomendasi: 'R-UJK-2026-001', tanggalSurat: '20 Maret 2026',     status: 'sudah' },
  { id: 'rk-003', nip: '199606062021066008', nama: 'Hendra Gunawan',  jabatan: 'Analis Kebijakan Ahli Pertama', unit: 'Biro Hukum',               kode: 'UJK-2026-T03', subLayanan: 'Kenaikan Jenjang',      tanggalPengajuan: '13 September 2026', status: 'belum' },
  { id: 'rk-004', nip: '199505052019055007', nama: 'Fajar Hidayat',   jabatan: 'Pengembang Teknologi',          unit: 'Pusat Data dan Teknologi', kode: 'UJK-2026-T03', subLayanan: 'Kenaikan Jenjang',      tanggalPengajuan: '13 September 2026', nomorRekomendasi: 'R-UJK-2026-002', tanggalSurat: '13 September 2026', status: 'sudah' },
  { id: 'rk-005', nip: '199202022016022004', nama: 'Siti Rahayu',     jabatan: 'Analis Keuangan',               unit: 'Biro Keuangan',            kode: 'UJK-2026-003', subLayanan: 'Kenaikan Jenjang',      tanggalPengajuan: '20 Mei 2026',       status: 'belum' },
  { id: 'rk-006', nip: '199808082022088010', nama: 'Joko Widiantoro', jabatan: 'Pranata Komputer Ahli Pertama', unit: 'Pusat Data dan Teknologi', kode: 'UJK-2026-004', subLayanan: 'Perpindahan Jabatan',   tanggalPengajuan: '01 Agustus 2026',   nomorRekomendasi: 'R-UJK-2026-003', tanggalSurat: '10 Agustus 2026',   status: 'sudah' },
]
