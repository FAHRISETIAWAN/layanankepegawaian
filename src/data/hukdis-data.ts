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

export const daftarHukdis: HukdisItem[] = [
  { id: 'hk-001', nip: '198801012010011001', nama: 'Agus Setiawan',    jabatan: 'Perencana Ahli Madya',          unit: 'Biro Perencanaan',         jenisPelanggaran: 'Tidak masuk kerja tanpa keterangan 5 hari',          tingkat: 'Ringan', nomorSK: 'SK-HUKDIS-2026-001', tanggalSK: '12 Januari 2026',    masaBerlaku: '12 Jan 2026 – 12 Apr 2026', status: 'Selesai' },
  { id: 'hk-002', nip: '199202022016022004', nama: 'Siti Rahayu',      jabatan: 'Analis Keuangan',               unit: 'Biro Keuangan',            jenisPelanggaran: 'Terlambat masuk kerja lebih dari 15 kali',           tingkat: 'Ringan', nomorSK: 'SK-HUKDIS-2026-002', tanggalSK: '20 Februari 2026',   masaBerlaku: '20 Feb 2026 – 20 Mei 2026', status: 'Selesai' },
  { id: 'hk-003', nip: '199303032017033005', nama: 'Doni Firmansyah',  jabatan: 'Auditor Kepegawaian',           unit: 'Inspektorat Jenderal',     jenisPelanggaran: 'Tidak mengikuti apel selama 1 bulan penuh',          tingkat: 'Ringan', nomorSK: 'SK-HUKDIS-2026-003', tanggalSK: '05 Maret 2026',      masaBerlaku: '05 Mar 2026 – 05 Jun 2026', status: 'Aktif' },
  { id: 'hk-004', nip: '199404042018044006', nama: 'Endah Wulandari',  jabatan: 'Pengelola BMN',                 unit: 'Biro Umum',                jenisPelanggaran: 'Menggunakan aset negara untuk kepentingan pribadi',   tingkat: 'Sedang', nomorSK: 'SK-HUKDIS-2026-004', tanggalSK: '10 Maret 2026',      masaBerlaku: '10 Mar 2026 – 10 Mar 2027', status: 'Aktif' },
  { id: 'hk-005', nip: '199101012015011003', nama: 'Rizky Prasetyo',   jabatan: 'Pranata Humas Ahli Pertama',    unit: 'Biro Komunikasi',          jenisPelanggaran: 'Tidak melaksanakan tugas yang diberikan atasan',      tingkat: 'Ringan', nomorSK: 'SK-HUKDIS-2026-005', tanggalSK: '15 April 2026',      masaBerlaku: '15 Apr 2026 – 15 Jul 2026', status: 'Aktif' },
  { id: 'hk-006', nip: '199505052019055007', nama: 'Fajar Hidayat',    jabatan: 'Pengembang Teknologi',          unit: 'Pusat Data dan Teknologi', jenisPelanggaran: 'Mengakses sistem tanpa otorisasi',                    tingkat: 'Sedang', nomorSK: 'SK-HUKDIS-2026-006', tanggalSK: '22 April 2026',      masaBerlaku: '22 Apr 2026 – 22 Apr 2027', status: 'Aktif' },
  { id: 'hk-007', nip: '199008082020128008', nama: 'Budi Santoso',     jabatan: 'Pranata Komputer Ahli Muda',    unit: 'Pusat Data dan Teknologi', jenisPelanggaran: 'Memalsukan data laporan kinerja',                     tingkat: 'Berat',  nomorSK: 'SK-HUKDIS-2026-007', tanggalSK: '01 Mei 2026',        masaBerlaku: '01 Mei 2026 – 01 Mei 2029', status: 'Aktif' },
  { id: 'hk-008', nip: '199606062021066008', nama: 'Hendra Gunawan',   jabatan: 'Analis Kebijakan Ahli Pertama', unit: 'Biro Hukum',               jenisPelanggaran: 'Tidak hadir tanpa izin selama 10 hari berturut-turut', tingkat: 'Sedang', nomorSK: 'SK-HUKDIS-2026-008', tanggalSK: '10 Juni 2026',       masaBerlaku: '10 Jun 2026 – 10 Jun 2027', status: 'Aktif' },
  { id: 'hk-009', nip: '199707072021077009', nama: 'Ika Permatasari',  jabatan: 'Penata Laporan Keuangan',       unit: 'Biro Keuangan',            jenisPelanggaran: 'Memberikan keterangan tidak benar kepada atasan',     tingkat: 'Ringan', nomorSK: 'SK-HUKDIS-2026-009', tanggalSK: '18 Juli 2026',       masaBerlaku: '18 Jul 2026 – 18 Okt 2026', status: 'Aktif' },
  { id: 'hk-010', nip: '198902022011012002', nama: 'Nina Kurniawati',  jabatan: 'Arsiparis Ahli Muda',           unit: 'Biro Umum',                jenisPelanggaran: 'Merusak dokumen arsip negara',                        tingkat: 'Berat',  nomorSK: 'SK-HUKDIS-2026-010', tanggalSK: '05 Agustus 2026',    masaBerlaku: '05 Ags 2026 – 05 Ags 2029', status: 'Aktif' },
  { id: 'hk-011', nip: '199808082022088010', nama: 'Joko Widiantoro',  jabatan: 'Pranata Komputer Ahli Pertama', unit: 'Pusat Data dan Teknologi', jenisPelanggaran: 'Pulang sebelum jam kerja selesai lebih dari 10 kali', tingkat: 'Ringan', nomorSK: 'SK-HUKDIS-2025-031', tanggalSK: '20 Oktober 2025',    masaBerlaku: '20 Okt 2025 – 20 Jan 2026', status: 'Selesai' },
  { id: 'hk-012', nip: '199303032017033005', nama: 'Doni Firmansyah',  jabatan: 'Auditor Kepegawaian',           unit: 'Inspektorat Jenderal',     jenisPelanggaran: 'Tidak melaporkan gratifikasi',                        tingkat: 'Sedang', nomorSK: 'SK-HUKDIS-2025-028', tanggalSK: '01 September 2025',  masaBerlaku: '01 Sep 2025 – 01 Sep 2026', status: 'Selesai' },
]
