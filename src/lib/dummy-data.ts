// ─── Dummy data untuk mode demo (tanpa BE) ────────────────────────────────

import type { Pegawai } from './api/pegawai'
import type { Pengajuan } from './api/pengajuan'
import type { Verifikasi } from './api/verifikasi'

const TODAY = new Date().toISOString().slice(0, 10)

// ── Pegawai ──────────────────────────────────────────────────────────────
export const DUMMY_PEGAWAI: Pegawai[] = [
  { nip: '199001012020121001', nama: 'Admin Demo',          jabatan: 'Kepala Biro',                    unit: 'Biro Sumber Daya Manusia',   email: 'admin@demo.go.id',           role: 'admin',              aktif: true,  createdAt: '2024-01-01T00:00:00Z' },
  { nip: '199002022020122002', nama: 'Sari Verifikasi',     jabatan: 'Analis Kepegawaian Ahli Muda',   unit: 'Biro Sumber Daya Manusia',   email: 'sari.vipg@demo.go.id',       role: 'verifikator_ipg',    aktif: true,  createdAt: '2024-01-01T00:00:00Z' },
  { nip: '199003032020123003', nama: 'Andi Tubel',          jabatan: 'Analis Kepegawaian Ahli Muda',   unit: 'Biro Sumber Daya Manusia',   email: 'andi.tubel@demo.go.id',      role: 'verifikator_tubel',  aktif: true,  createdAt: '2024-01-01T00:00:00Z' },
  { nip: '199004042020124004', nama: 'Dewi Pindah',         jabatan: 'Analis Kepegawaian Ahli Muda',   unit: 'Biro Sumber Daya Manusia',   email: 'dewi.pwk@demo.go.id',        role: 'verifikator_pwk',    aktif: true,  createdAt: '2024-01-01T00:00:00Z' },
  { nip: '199005052020125005', nama: 'Rudi Ujikom',         jabatan: 'Analis Kepegawaian Ahli Muda',   unit: 'Biro Sumber Daya Manusia',   email: 'rudi.ujikom@demo.go.id',     role: 'verifikator_ujikom', aktif: true,  createdAt: '2024-01-01T00:00:00Z' },
  { nip: '199006062020126006', nama: 'Lia Mutasi',          jabatan: 'Analis Kepegawaian Ahli Muda',   unit: 'Biro Sumber Daya Manusia',   email: 'lia.mutasi@demo.go.id',      role: 'verifikator_mutasi', aktif: true,  createdAt: '2024-01-01T00:00:00Z' },
  { nip: '199007072020127007', nama: 'Bima Monitor',        jabatan: 'Pengawas Kepegawaian',           unit: 'Biro Sumber Daya Manusia',   email: 'bima.monitor@demo.go.id',    role: 'monitoring',         aktif: true,  createdAt: '2024-01-01T00:00:00Z' },
  { nip: '199008082020128008', nama: 'Budi Santoso',        jabatan: 'Pranata Komputer Ahli Muda',     unit: 'Pusat Data dan Teknologi',   email: 'budi.santoso@demo.go.id',    role: 'pegawai',            aktif: true,  createdAt: '2024-01-01T00:00:00Z' },
  { nip: '198801012010011001', nama: 'Agus Setiawan',       jabatan: 'Perencana Ahli Madya',           unit: 'Biro Perencanaan',           email: 'agus.setiawan@demo.go.id',   role: 'pegawai',            aktif: true,  createdAt: '2024-01-01T00:00:00Z' },
  { nip: '198902022011012002', nama: 'Nina Kurniawati',     jabatan: 'Arsiparis Ahli Muda',            unit: 'Biro Umum',                  email: 'nina.kurniawati@demo.go.id', role: 'pegawai',            aktif: false, createdAt: '2024-01-01T00:00:00Z' },
  { nip: '199101012015011003', nama: 'Rizky Prasetyo',      jabatan: 'Pranata Humas Ahli Pertama',     unit: 'Biro Komunikasi',            email: 'rizky.prasetyo@demo.go.id',  role: 'pegawai',            aktif: true,  createdAt: '2024-01-01T00:00:00Z' },
  { nip: '199202022016022004', nama: 'Siti Rahayu',         jabatan: 'Analis Keuangan',                unit: 'Biro Keuangan',              email: 'siti.rahayu@demo.go.id',     role: 'pegawai',            aktif: true,  createdAt: '2024-01-01T00:00:00Z' },
  { nip: '199303032017033005', nama: 'Doni Firmansyah',     jabatan: 'Auditor Kepegawaian',            unit: 'Inspektorat Jenderal',       email: 'doni.firmansyah@demo.go.id', role: 'pegawai',            aktif: true,  createdAt: '2024-01-01T00:00:00Z' },
  { nip: '199404042018044006', nama: 'Endah Wulandari',     jabatan: 'Pengelola BMN',                  unit: 'Biro Umum',                  email: 'endah.wulandari@demo.go.id', role: 'pegawai',            aktif: true,  createdAt: '2024-01-01T00:00:00Z' },
  { nip: '199505052019055007', nama: 'Fajar Hidayat',       jabatan: 'Pengembang Teknologi',           unit: 'Pusat Data dan Teknologi',   email: 'fajar.hidayat@demo.go.id',   role: 'pegawai',            aktif: true,  createdAt: '2024-01-01T00:00:00Z' },
  { nip: '199606062021066008', nama: 'Hendra Gunawan',      jabatan: 'Analis Kebijakan Ahli Pertama',  unit: 'Biro Hukum',                 email: 'hendra.gunawan@demo.go.id',  role: 'pegawai',            aktif: true,  createdAt: '2024-01-01T00:00:00Z' },
  { nip: '199707072021077009', nama: 'Ika Permatasari',     jabatan: 'Penata Laporan Keuangan',        unit: 'Biro Keuangan',              email: 'ika.permatasari@demo.go.id', role: 'pegawai',            aktif: true,  createdAt: '2024-01-01T00:00:00Z' },
  { nip: '199808082022088010', nama: 'Joko Widiantoro',     jabatan: 'Pranata Komputer Ahli Pertama',  unit: 'Pusat Data dan Teknologi',   email: 'joko.widiantoro@demo.go.id', role: 'pegawai',            aktif: true,  createdAt: '2024-01-01T00:00:00Z' },
]

// ── Pengajuan ────────────────────────────────────────────────────────────
export const DUMMY_PENGAJUAN: Pengajuan[] = [
  // ── Hari ini (untuk Aktivitas Terkini dashboard) ──
  {
    id: 'pj-t01', kode: 'IPG-2026-T01', layanan: 'IPG Profesi',
    nomorSurat: '021/SDM/2026', tanggal: TODAY, status: 'menunggu',
    pegawaiList: [{ id: 'pp-t01', nipPegawai: '199808082022088010', namaPegawai: 'Joko Widiantoro', jenis: 'Profesi' }],
  },
  {
    id: 'pj-t02', kode: 'TUBEL-2026-T02', layanan: 'Tugas Belajar Beasiswa',
    nomorSurat: '022/SDM/2026', tanggal: TODAY, status: 'diproses',
    pegawaiList: [{ id: 'pp-t02', nipPegawai: '199707072021077009', namaPegawai: 'Ika Permatasari', jenis: '' }],
  },
  {
    id: 'pj-t03', kode: 'UJK-2026-T03', layanan: 'Uji Kompetensi JF - Kenaikan Jenjang',
    nomorSurat: '023/SDM/2026', tanggal: TODAY, status: 'diverifikasi',
    pegawaiList: [
      { id: 'pp-t03a', nipPegawai: '199606062021066008', namaPegawai: 'Hendra Gunawan', jenis: '' },
      { id: 'pp-t03b', nipPegawai: '199505052019055007', namaPegawai: 'Fajar Hidayat', jenis: '' },
    ],
  },
  {
    id: 'pj-t04', kode: 'PWK-2026-T04', layanan: 'Pindah Wilayah Kerja',
    nomorSurat: '024/SDM/2026', tanggal: TODAY, status: 'menunggu',
    pegawaiList: [{ id: 'pp-t04', nipPegawai: '199404042018044006', namaPegawai: 'Endah Wulandari', jenis: '' }],
  },
  {
    id: 'pj-t05', kode: 'IPG-2026-T05', layanan: 'IPG Sertifikasi',
    nomorSurat: '025/SDM/2026', tanggal: TODAY, status: 'ditolak',
    pegawaiList: [{ id: 'pp-t05', nipPegawai: '199303032017033005', namaPegawai: 'Doni Firmansyah', jenis: 'Sertifikasi' }],
  },

  // ── Data historis ──
  {
    id: 'pj-001', kode: 'IPG-2026-001', layanan: 'IPG Profesi',
    nomorSurat: '001/SDM/2026', tanggal: '2026-01-10', status: 'diverifikasi',
    pegawaiList: [{ id: 'pp-001', nipPegawai: '199008082020128008', namaPegawai: 'Budi Santoso', jenis: 'Profesi' }],
  },
  {
    id: 'pj-002', kode: 'IPG-2026-002', layanan: 'IPG Sertifikasi',
    nomorSurat: '002/SDM/2026', tanggal: '2026-01-15', status: 'menunggu',
    pegawaiList: [
      { id: 'pp-002', nipPegawai: '198801012010011001', namaPegawai: 'Agus Setiawan', jenis: 'Sertifikasi' },
      { id: 'pp-003', nipPegawai: '199101012015011003', namaPegawai: 'Rizky Prasetyo', jenis: 'Sertifikasi' },
    ],
  },
  {
    id: 'pj-003', kode: 'TUBEL-2026-001', layanan: 'Tugas Belajar Mandiri',
    nomorSurat: '003/SDM/2026', tanggal: '2026-02-01', status: 'diproses',
    pegawaiList: [{ id: 'pp-004', nipPegawai: '199202022016022004', namaPegawai: 'Siti Rahayu', jenis: '' }],
  },
  {
    id: 'pj-004', kode: 'PWK-2026-001', layanan: 'Pindah Wilayah Kerja',
    nomorSurat: '004/SDM/2026', tanggal: '2026-02-10', status: 'ditolak',
    pegawaiList: [{ id: 'pp-005', nipPegawai: '199303032017033005', namaPegawai: 'Doni Firmansyah', jenis: '' }],
  },
  {
    id: 'pj-005', kode: 'UJK-2026-001', layanan: 'Uji Kompetensi JF - Kenaikan Jenjang',
    nomorSurat: '005/SDM/2026', tanggal: '2026-02-20', status: 'menunggu',
    pegawaiList: [{ id: 'pp-006', nipPegawai: '199404042018044006', namaPegawai: 'Endah Wulandari', jenis: '' }],
  },
  {
    id: 'pj-006', kode: 'IPG-2026-003', layanan: 'IPG Akademik',
    nomorSurat: '006/SDM/2026', tanggal: '2026-03-01', status: 'diverifikasi',
    pegawaiList: [{ id: 'pp-007', nipPegawai: '199505052019055007', namaPegawai: 'Fajar Hidayat', jenis: '' }],
  },
  {
    id: 'pj-007', kode: 'TUBEL-2026-002', layanan: 'Tugas Belajar Beasiswa',
    nomorSurat: '007/SDM/2026', tanggal: '2026-03-05', status: 'menunggu',
    pegawaiList: [{ id: 'pp-008', nipPegawai: '199008082020128008', namaPegawai: 'Budi Santoso', jenis: '' }],
  },
  {
    id: 'pj-008', kode: 'UJK-2026-002', layanan: 'Uji Kompetensi JF - Perpindahan Jabatan',
    nomorSurat: '008/SDM/2026', tanggal: '2026-03-10', status: 'diproses',
    pegawaiList: [{ id: 'pp-009', nipPegawai: '199101012015011003', namaPegawai: 'Rizky Prasetyo', jenis: '' }],
  },
  {
    id: 'pj-009', kode: 'IPG-2026-004', layanan: 'IPG Profesi',
    nomorSurat: '009/SDM/2026', tanggal: '2026-04-03', status: 'diverifikasi',
    pegawaiList: [{ id: 'pp-010', nipPegawai: '199606062021066008', namaPegawai: 'Hendra Gunawan', jenis: 'Profesi' }],
  },
  {
    id: 'pj-010', kode: 'TUBEL-2026-003', layanan: 'Tugas Belajar Mandiri',
    nomorSurat: '010/SDM/2026', tanggal: '2026-04-15', status: 'diverifikasi',
    pegawaiList: [{ id: 'pp-011', nipPegawai: '199707072021077009', namaPegawai: 'Ika Permatasari', jenis: '' }],
  },
  {
    id: 'pj-011', kode: 'PWK-2026-002', layanan: 'Pindah Wilayah Kerja',
    nomorSurat: '011/SDM/2026', tanggal: '2026-05-02', status: 'menunggu',
    pegawaiList: [
      { id: 'pp-012', nipPegawai: '198902022011012002', namaPegawai: 'Nina Kurniawati', jenis: '' },
      { id: 'pp-013', nipPegawai: '199808082022088010', namaPegawai: 'Joko Widiantoro', jenis: '' },
    ],
  },
  {
    id: 'pj-012', kode: 'UJK-2026-003', layanan: 'Uji Kompetensi JF - Kenaikan Jenjang',
    nomorSurat: '012/SDM/2026', tanggal: '2026-05-20', status: 'ditolak',
    pegawaiList: [{ id: 'pp-014', nipPegawai: '199202022016022004', namaPegawai: 'Siti Rahayu', jenis: '' }],
  },
  {
    id: 'pj-013', kode: 'IPG-2026-005', layanan: 'IPG Sertifikasi',
    nomorSurat: '013/SDM/2026', tanggal: '2026-06-01', status: 'diproses',
    pegawaiList: [{ id: 'pp-015', nipPegawai: '198801012010011001', namaPegawai: 'Agus Setiawan', jenis: 'Sertifikasi' }],
  },
  {
    id: 'pj-014', kode: 'IPG-2026-006', layanan: 'IPG Akademik',
    nomorSurat: '014/SDM/2026', tanggal: '2026-06-10', status: 'menunggu',
    pegawaiList: [{ id: 'pp-016', nipPegawai: '199303032017033005', namaPegawai: 'Doni Firmansyah', jenis: '' }],
  },
  {
    id: 'pj-015', kode: 'TUBEL-2026-004', layanan: 'Tugas Belajar Beasiswa',
    nomorSurat: '015/SDM/2026', tanggal: '2026-07-05', status: 'diverifikasi',
    pegawaiList: [{ id: 'pp-017', nipPegawai: '199404042018044006', namaPegawai: 'Endah Wulandari', jenis: '' }],
  },
  {
    id: 'pj-016', kode: 'PWK-2026-003', layanan: 'Pindah Wilayah Kerja',
    nomorSurat: '016/SDM/2026', tanggal: '2026-07-20', status: 'diverifikasi',
    pegawaiList: [{ id: 'pp-018', nipPegawai: '199505052019055007', namaPegawai: 'Fajar Hidayat', jenis: '' }],
  },
  {
    id: 'pj-017', kode: 'UJK-2026-004', layanan: 'Uji Kompetensi JF - Perpindahan Jabatan',
    nomorSurat: '017/SDM/2026', tanggal: '2026-08-01', status: 'menunggu',
    pegawaiList: [{ id: 'pp-019', nipPegawai: '199101012015011003', namaPegawai: 'Rizky Prasetyo', jenis: '' }],
  },
  {
    id: 'pj-018', kode: 'IPG-2026-007', layanan: 'IPG Profesi',
    nomorSurat: '018/SDM/2026', tanggal: '2026-08-15', status: 'diproses',
    pegawaiList: [{ id: 'pp-020', nipPegawai: '199008082020128008', namaPegawai: 'Budi Santoso', jenis: 'Profesi' }],
  },
  {
    id: 'pj-019', kode: 'TUBEL-2026-005', layanan: 'Tugas Belajar Mandiri',
    nomorSurat: '019/SDM/2026', tanggal: '2026-09-01', status: 'menunggu',
    pegawaiList: [{ id: 'pp-021', nipPegawai: '199606062021066008', namaPegawai: 'Hendra Gunawan', jenis: '' }],
  },
  {
    id: 'pj-020', kode: 'IPG-2026-008', layanan: 'IPG Sertifikasi',
    nomorSurat: '020/SDM/2026', tanggal: '2026-09-10', status: 'diverifikasi',
    pegawaiList: [
      { id: 'pp-022', nipPegawai: '199707072021077009', namaPegawai: 'Ika Permatasari', jenis: 'Sertifikasi' },
      { id: 'pp-023', nipPegawai: '199808082022088010', namaPegawai: 'Joko Widiantoro', jenis: 'Sertifikasi' },
    ],
  },
]

// ── Verifikasi ───────────────────────────────────────────────────────────
export const DUMMY_VERIFIKASI: Verifikasi[] = [
  { id: 'vf-t01', pengajuanId: 'pj-t01', nipVerifikator: '199002022020122002', status: 'menunggu',  updatedAt: `${TODAY}T08:10:00Z` },
  { id: 'vf-t02', pengajuanId: 'pj-t02', nipVerifikator: '199003032020123003', status: 'menunggu',  catatanVerifikator: 'Sedang review', updatedAt: `${TODAY}T09:30:00Z` },
  { id: 'vf-t03', pengajuanId: 'pj-t03', nipVerifikator: '199005052020125005', status: 'disetujui', catatanVerifikator: 'Lengkap', updatedAt: `${TODAY}T10:00:00Z` },
  { id: 'vf-t04', pengajuanId: 'pj-t04', nipVerifikator: '199004042020124004', status: 'menunggu',  updatedAt: `${TODAY}T11:15:00Z` },
  { id: 'vf-t05', pengajuanId: 'pj-t05', nipVerifikator: '199002022020122002', status: 'ditolak',   alasanPenolakan: 'Tidak memenuhi syarat', updatedAt: `${TODAY}T13:00:00Z` },
  { id: 'vf-001', pengajuanId: 'pj-001', nipVerifikator: '199002022020122002', status: 'disetujui', catatanVerifikator: 'Dokumen lengkap dan sesuai', updatedAt: '2026-01-12T10:00:00Z' },
  { id: 'vf-002', pengajuanId: 'pj-002', nipVerifikator: '199002022020122002', status: 'menunggu',  updatedAt: '2026-01-15T09:00:00Z' },
  { id: 'vf-003', pengajuanId: 'pj-003', nipVerifikator: '199003032020123003', status: 'menunggu',  catatanVerifikator: 'Sedang dalam proses review', updatedAt: '2026-02-02T08:00:00Z' },
  { id: 'vf-004', pengajuanId: 'pj-004', nipVerifikator: '199004042020124004', status: 'ditolak',   alasanPenolakan: 'Dokumen tidak memenuhi syarat', updatedAt: '2026-02-15T14:00:00Z' },
  { id: 'vf-005', pengajuanId: 'pj-005', nipVerifikator: '199005052020125005', status: 'menunggu',  updatedAt: '2026-02-20T09:00:00Z' },
  { id: 'vf-006', pengajuanId: 'pj-006', nipVerifikator: '199002022020122002', status: 'disetujui', catatanVerifikator: 'Sudah sesuai ketentuan', updatedAt: '2026-03-03T11:00:00Z' },
  { id: 'vf-007', pengajuanId: 'pj-007', nipVerifikator: '199003032020123003', status: 'menunggu',  updatedAt: '2026-03-05T09:00:00Z' },
  { id: 'vf-008', pengajuanId: 'pj-008', nipVerifikator: '199005052020125005', status: 'menunggu',  updatedAt: '2026-03-10T08:00:00Z' },
  { id: 'vf-009', pengajuanId: 'pj-009', nipVerifikator: '199002022020122002', status: 'disetujui', updatedAt: '2026-04-05T10:00:00Z' },
  { id: 'vf-010', pengajuanId: 'pj-010', nipVerifikator: '199003032020123003', status: 'disetujui', updatedAt: '2026-04-17T11:00:00Z' },
  { id: 'vf-011', pengajuanId: 'pj-011', nipVerifikator: '199004042020124004', status: 'menunggu',  updatedAt: '2026-05-03T08:00:00Z' },
  { id: 'vf-012', pengajuanId: 'pj-012', nipVerifikator: '199005052020125005', status: 'ditolak',   alasanPenolakan: 'Belum memenuhi syarat jenjang', updatedAt: '2026-05-22T14:00:00Z' },
  { id: 'vf-013', pengajuanId: 'pj-013', nipVerifikator: '199002022020122002', status: 'menunggu',  updatedAt: '2026-06-02T09:00:00Z' },
  { id: 'vf-014', pengajuanId: 'pj-014', nipVerifikator: '199002022020122002', status: 'menunggu',  updatedAt: '2026-06-11T08:00:00Z' },
  { id: 'vf-015', pengajuanId: 'pj-015', nipVerifikator: '199003032020123003', status: 'disetujui', updatedAt: '2026-07-07T10:00:00Z' },
  { id: 'vf-016', pengajuanId: 'pj-016', nipVerifikator: '199004042020124004', status: 'disetujui', updatedAt: '2026-07-22T11:00:00Z' },
  { id: 'vf-017', pengajuanId: 'pj-017', nipVerifikator: '199005052020125005', status: 'menunggu',  updatedAt: '2026-08-02T09:00:00Z' },
  { id: 'vf-018', pengajuanId: 'pj-018', nipVerifikator: '199002022020122002', status: 'menunggu',  updatedAt: '2026-08-16T08:00:00Z' },
  { id: 'vf-019', pengajuanId: 'pj-019', nipVerifikator: '199003032020123003', status: 'menunggu',  updatedAt: '2026-09-02T09:00:00Z' },
  { id: 'vf-020', pengajuanId: 'pj-020', nipVerifikator: '199002022020122002', status: 'disetujui', updatedAt: '2026-09-11T10:00:00Z' },
]
