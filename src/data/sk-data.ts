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

export const daftarSKPegawai: SKPegawai[] = [
  { id: 'sk-001', nip: '199008082020128008', nama: 'Budi Santoso',    jabatan: 'Pranata Komputer Ahli Muda',    unit: 'Pusat Data dan Teknologi', kode: 'IPG-2026-001', layanan: 'IPG Profesi',           jenis: 'IPG',   tanggalPengajuan: '10 Januari 2026',   nomorSK: 'SK-IPG-2026-001', tanggalSK: '20 Januari 2026',   tmtSelesai: '20 Januari 2029',   status: 'sudah' },
  { id: 'sk-002', nip: '198801012010011001', nama: 'Agus Setiawan',   jabatan: 'Perencana Ahli Madya',          unit: 'Biro Perencanaan',         kode: 'IPG-2026-002', layanan: 'IPG Sertifikasi',       jenis: 'IPG',   tanggalPengajuan: '15 Januari 2026',   status: 'belum' },
  { id: 'sk-003', nip: '199101012015011003', nama: 'Rizky Prasetyo',  jabatan: 'Pranata Humas Ahli Pertama',   unit: 'Biro Komunikasi',          kode: 'IPG-2026-002', layanan: 'IPG Sertifikasi',       jenis: 'IPG',   tanggalPengajuan: '15 Januari 2026',   status: 'belum' },
  { id: 'sk-004', nip: '199202022016022004', nama: 'Siti Rahayu',     jabatan: 'Analis Keuangan',               unit: 'Biro Keuangan',            kode: 'TUBEL-2026-001', layanan: 'Tugas Belajar Mandiri', jenis: 'TUBEL', tanggalPengajuan: '01 Februari 2026',  nomorSK: 'SK-TUBEL-2026-001', tanggalSK: '10 Februari 2026', masaTugas: '3 Tahun', tmtSelesai: '28 Februari 2029', nomorST: 'ST-TUBEL-2026-001', tanggalST: '10 Februari 2026', status: 'sudah' },
  { id: 'sk-005', nip: '199505052019055007', nama: 'Fajar Hidayat',   jabatan: 'Pengembang Teknologi',          unit: 'Pusat Data dan Teknologi', kode: 'IPG-2026-003', layanan: 'IPG Akademik',          jenis: 'IPG',   tanggalPengajuan: '01 Maret 2026',     nomorSK: 'SK-IPG-2026-002', tanggalSK: '12 Maret 2026',     tmtSelesai: '12 Maret 2029',     status: 'sudah' },
  { id: 'sk-006', nip: '199008082020128008', nama: 'Budi Santoso',    jabatan: 'Pranata Komputer Ahli Muda',    unit: 'Pusat Data dan Teknologi', kode: 'TUBEL-2026-002', layanan: 'Tugas Belajar Beasiswa', jenis: 'TUBEL', tanggalPengajuan: '05 Maret 2026',     status: 'belum' },
  { id: 'sk-007', nip: '199606062021066008', nama: 'Hendra Gunawan',  jabatan: 'Analis Kebijakan Ahli Pertama', unit: 'Biro Hukum',               kode: 'IPG-2026-004', layanan: 'IPG Profesi',           jenis: 'IPG',   tanggalPengajuan: '03 April 2026',     nomorSK: 'SK-IPG-2026-003', tanggalSK: '14 April 2026',     tmtSelesai: '14 April 2029',     status: 'sudah' },
  { id: 'sk-008', nip: '199707072021077009', nama: 'Ika Permatasari', jabatan: 'Penata Laporan Keuangan',       unit: 'Biro Keuangan',            kode: 'TUBEL-2026-003', layanan: 'Tugas Belajar Mandiri', jenis: 'TUBEL', tanggalPengajuan: '15 April 2026',     nomorSK: 'SK-TUBEL-2026-002', tanggalSK: '25 April 2026', masaTugas: '2 Tahun', tmtSelesai: '30 April 2028', nomorST: 'ST-TUBEL-2026-002', tanggalST: '25 April 2026', status: 'sudah' },
  { id: 'sk-009', nip: '198801012010011001', nama: 'Agus Setiawan',   jabatan: 'Perencana Ahli Madya',          unit: 'Biro Perencanaan',         kode: 'IPG-2026-005', layanan: 'IPG Sertifikasi',       jenis: 'IPG',   tanggalPengajuan: '01 Juni 2026',      status: 'belum' },
  { id: 'sk-010', nip: '199303032017033005', nama: 'Doni Firmansyah', jabatan: 'Auditor Kepegawaian',           unit: 'Inspektorat Jenderal',     kode: 'IPG-2026-006', layanan: 'IPG Akademik',          jenis: 'IPG',   tanggalPengajuan: '10 Juni 2026',      status: 'belum' },
  { id: 'sk-011', nip: '199404042018044006', nama: 'Endah Wulandari', jabatan: 'Pengelola BMN',                 unit: 'Biro Umum',                kode: 'TUBEL-2026-004', layanan: 'Tugas Belajar Beasiswa', jenis: 'TUBEL', tanggalPengajuan: '05 Juli 2026',      nomorSK: 'SK-TUBEL-2026-003', tanggalSK: '16 Juli 2026', masaTugas: '2 Tahun', tmtSelesai: '31 Juli 2028', nomorST: 'ST-TUBEL-2026-003', tanggalST: '16 Juli 2026', status: 'sudah' },
  { id: 'sk-012', nip: '199101012015011003', nama: 'Rizky Prasetyo',  jabatan: 'Pranata Humas Ahli Pertama',   unit: 'Biro Komunikasi',          kode: 'IPG-2026-007', layanan: 'IPG Profesi',           jenis: 'IPG',   tanggalPengajuan: '15 Agustus 2026',   nomorSK: 'SK-IPG-2026-004', tanggalSK: '25 Agustus 2026',   tmtSelesai: '25 Agustus 2029',   status: 'sudah' },
  { id: 'sk-013', nip: '199606062021066008', nama: 'Hendra Gunawan',  jabatan: 'Analis Kebijakan Ahli Pertama', unit: 'Biro Hukum',               kode: 'TUBEL-2026-005', layanan: 'Tugas Belajar Mandiri', jenis: 'TUBEL', tanggalPengajuan: '01 September 2026', status: 'belum' },
  { id: 'sk-014', nip: '199707072021077009', nama: 'Ika Permatasari', jabatan: 'Penata Laporan Keuangan',       unit: 'Biro Keuangan',            kode: 'IPG-2026-008', layanan: 'IPG Sertifikasi',       jenis: 'IPG',   tanggalPengajuan: '10 September 2026', status: 'belum' },
  { id: 'sk-015', nip: '199808082022088010', nama: 'Joko Widiantoro', jabatan: 'Pranata Komputer Ahli Pertama', unit: 'Pusat Data dan Teknologi', kode: 'IPG-2026-008', layanan: 'IPG Sertifikasi',       jenis: 'IPG',   tanggalPengajuan: '10 September 2026', status: 'belum' },
]
