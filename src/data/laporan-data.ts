import type { JenisLayanan, StatusPengajuan } from './verifikasi-data'

export interface LaporanItem {
  id: string
  kode: string
  tanggal: string
  bulan: number
  tahun: number
  layanan: JenisLayanan
  nomorSurat: string
  status: StatusPengajuan
  pegawai: { nama: string; nip: string; jabatan: string; unit: string }[]
}

export const dataLaporan: LaporanItem[] = [
  // ── Januari 2026 ──
  { id: 'lp-001', kode: 'IPG-2026-001', tanggal: '10 Januari 2026',  bulan: 1,  tahun: 2026, layanan: 'IPG Profesi',    nomorSurat: '001/SDM/2026', status: 'diverifikasi', pegawai: [{ nama: 'Budi Santoso',    nip: '199008082020128008', jabatan: 'Pranata Komputer Ahli Muda',    unit: 'Pusat Data dan Teknologi' }] },
  { id: 'lp-002', kode: 'IPG-2026-002', tanggal: '15 Januari 2026',  bulan: 1,  tahun: 2026, layanan: 'IPG Sertifikasi', nomorSurat: '002/SDM/2026', status: 'menunggu',    pegawai: [{ nama: 'Agus Setiawan',   nip: '198801012010011001', jabatan: 'Perencana Ahli Madya',          unit: 'Biro Perencanaan' }, { nama: 'Rizky Prasetyo', nip: '199101012015011003', jabatan: 'Pranata Humas Ahli Pertama', unit: 'Biro Komunikasi' }] },
  // ── Februari 2026 ──
  { id: 'lp-003', kode: 'TUBEL-2026-001', tanggal: '01 Februari 2026', bulan: 2, tahun: 2026, layanan: 'Tugas Belajar Mandiri',  nomorSurat: '003/SDM/2026', status: 'diproses',    pegawai: [{ nama: 'Siti Rahayu',     nip: '199202022016022004', jabatan: 'Analis Keuangan',               unit: 'Biro Keuangan' }] },
  { id: 'lp-004', kode: 'PWK-2026-001',   tanggal: '10 Februari 2026', bulan: 2, tahun: 2026, layanan: 'Pindah Wilayah Kerja',   nomorSurat: '004/SDM/2026', status: 'ditolak',     pegawai: [{ nama: 'Doni Firmansyah', nip: '199303032017033005', jabatan: 'Auditor Kepegawaian',           unit: 'Inspektorat Jenderal' }] },
  { id: 'lp-005', kode: 'UJK-2026-001',   tanggal: '20 Februari 2026', bulan: 2, tahun: 2026, layanan: 'Uji Kompetensi JF - Kenaikan Jenjang', nomorSurat: '005/SDM/2026', status: 'menunggu', pegawai: [{ nama: 'Endah Wulandari', nip: '199404042018044006', jabatan: 'Pengelola BMN', unit: 'Biro Umum' }] },
  // ── Maret 2026 ──
  { id: 'lp-006', kode: 'IPG-2026-003',   tanggal: '01 Maret 2026',   bulan: 3,  tahun: 2026, layanan: 'IPG Akademik',   nomorSurat: '006/SDM/2026', status: 'diverifikasi', pegawai: [{ nama: 'Fajar Hidayat',    nip: '199505052019055007', jabatan: 'Pengembang Teknologi',          unit: 'Pusat Data dan Teknologi' }] },
  { id: 'lp-007', kode: 'TUBEL-2026-002', tanggal: '05 Maret 2026',   bulan: 3,  tahun: 2026, layanan: 'Tugas Belajar Beasiswa',  nomorSurat: '007/SDM/2026', status: 'menunggu',    pegawai: [{ nama: 'Budi Santoso',    nip: '199008082020128008', jabatan: 'Pranata Komputer Ahli Muda',    unit: 'Pusat Data dan Teknologi' }] },
  { id: 'lp-008', kode: 'UJK-2026-002',   tanggal: '10 Maret 2026',   bulan: 3,  tahun: 2026, layanan: 'Uji Kompetensi JF - Perpindahan Jabatan', nomorSurat: '008/SDM/2026', status: 'diproses', pegawai: [{ nama: 'Rizky Prasetyo', nip: '199101012015011003', jabatan: 'Pranata Humas Ahli Pertama', unit: 'Biro Komunikasi' }] },
  // ── April 2026 ──
  { id: 'lp-009', kode: 'IPG-2026-004',   tanggal: '03 April 2026',   bulan: 4,  tahun: 2026, layanan: 'IPG Profesi',    nomorSurat: '009/SDM/2026', status: 'diverifikasi', pegawai: [{ nama: 'Hendra Gunawan',   nip: '199606062021066008', jabatan: 'Analis Kebijakan Ahli Pertama', unit: 'Biro Hukum' }] },
  { id: 'lp-010', kode: 'TUBEL-2026-003', tanggal: '15 April 2026',   bulan: 4,  tahun: 2026, layanan: 'Tugas Belajar Mandiri',  nomorSurat: '010/SDM/2026', status: 'diverifikasi', pegawai: [{ nama: 'Ika Permatasari',  nip: '199707072021077009', jabatan: 'Penata Laporan Keuangan',      unit: 'Biro Keuangan' }] },
  // ── Mei 2026 ──
  { id: 'lp-011', kode: 'PWK-2026-002',   tanggal: '02 Mei 2026',     bulan: 5,  tahun: 2026, layanan: 'Pindah Wilayah Kerja',   nomorSurat: '011/SDM/2026', status: 'menunggu',    pegawai: [{ nama: 'Nina Kurniawati', nip: '198902022011012002', jabatan: 'Arsiparis Ahli Muda',           unit: 'Biro Umum' }, { nama: 'Joko Widiantoro', nip: '199808082022088010', jabatan: 'Pranata Komputer Ahli Pertama', unit: 'Pusat Data dan Teknologi' }] },
  { id: 'lp-012', kode: 'UJK-2026-003',   tanggal: '20 Mei 2026',     bulan: 5,  tahun: 2026, layanan: 'Uji Kompetensi JF - Kenaikan Jenjang', nomorSurat: '012/SDM/2026', status: 'ditolak', pegawai: [{ nama: 'Siti Rahayu', nip: '199202022016022004', jabatan: 'Analis Keuangan', unit: 'Biro Keuangan' }] },
  // ── Juni 2026 ──
  { id: 'lp-013', kode: 'IPG-2026-005',   tanggal: '01 Juni 2026',    bulan: 6,  tahun: 2026, layanan: 'IPG Sertifikasi', nomorSurat: '013/SDM/2026', status: 'diproses',    pegawai: [{ nama: 'Agus Setiawan',   nip: '198801012010011001', jabatan: 'Perencana Ahli Madya',          unit: 'Biro Perencanaan' }] },
  { id: 'lp-014', kode: 'IPG-2026-006',   tanggal: '10 Juni 2026',    bulan: 6,  tahun: 2026, layanan: 'IPG Akademik',   nomorSurat: '014/SDM/2026', status: 'menunggu',    pegawai: [{ nama: 'Doni Firmansyah', nip: '199303032017033005', jabatan: 'Auditor Kepegawaian',           unit: 'Inspektorat Jenderal' }] },
  // ── Juli 2026 ──
  { id: 'lp-015', kode: 'TUBEL-2026-004', tanggal: '05 Juli 2026',    bulan: 7,  tahun: 2026, layanan: 'Tugas Belajar Beasiswa',  nomorSurat: '015/SDM/2026', status: 'diverifikasi', pegawai: [{ nama: 'Endah Wulandari', nip: '199404042018044006', jabatan: 'Pengelola BMN', unit: 'Biro Umum' }] },
  { id: 'lp-016', kode: 'PWK-2026-003',   tanggal: '20 Juli 2026',    bulan: 7,  tahun: 2026, layanan: 'Pindah Wilayah Kerja',   nomorSurat: '016/SDM/2026', status: 'diverifikasi', pegawai: [{ nama: 'Fajar Hidayat',   nip: '199505052019055007', jabatan: 'Pengembang Teknologi',          unit: 'Pusat Data dan Teknologi' }] },
  // ── Agustus 2026 ──
  { id: 'lp-017', kode: 'UJK-2026-004',   tanggal: '01 Agustus 2026', bulan: 8,  tahun: 2026, layanan: 'Uji Kompetensi JF - Perpindahan Jabatan', nomorSurat: '017/SDM/2026', status: 'menunggu', pegawai: [{ nama: 'Rizky Prasetyo', nip: '199101012015011003', jabatan: 'Pranata Humas Ahli Pertama', unit: 'Biro Komunikasi' }] },
  { id: 'lp-018', kode: 'IPG-2026-007',   tanggal: '15 Agustus 2026', bulan: 8,  tahun: 2026, layanan: 'IPG Profesi',    nomorSurat: '018/SDM/2026', status: 'diproses',    pegawai: [{ nama: 'Budi Santoso',    nip: '199008082020128008', jabatan: 'Pranata Komputer Ahli Muda',    unit: 'Pusat Data dan Teknologi' }] },
  // ── September 2026 ──
  { id: 'lp-019', kode: 'TUBEL-2026-005', tanggal: '01 September 2026', bulan: 9, tahun: 2026, layanan: 'Tugas Belajar Mandiri', nomorSurat: '019/SDM/2026', status: 'menunggu',    pegawai: [{ nama: 'Hendra Gunawan',  nip: '199606062021066008', jabatan: 'Analis Kebijakan Ahli Pertama', unit: 'Biro Hukum' }] },
  { id: 'lp-020', kode: 'IPG-2026-008',   tanggal: '10 September 2026', bulan: 9, tahun: 2026, layanan: 'IPG Sertifikasi', nomorSurat: '020/SDM/2026', status: 'diverifikasi', pegawai: [{ nama: 'Ika Permatasari',  nip: '199707072021077009', jabatan: 'Penata Laporan Keuangan',      unit: 'Biro Keuangan' }, { nama: 'Joko Widiantoro', nip: '199808082022088010', jabatan: 'Pranata Komputer Ahli Pertama', unit: 'Pusat Data dan Teknologi' }] },
]

export const namaBulan = [
  'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
  'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember',
]
