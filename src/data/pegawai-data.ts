export interface Pegawai {
  nip: string
  nama: string
  jabatan: string
  unit: string
  verifikatorMutasi?: string
}

export const daftarPegawai: Pegawai[] = [
  { nip: '199008082020128008', nama: 'Budi Santoso',    jabatan: 'Pranata Komputer Ahli Muda',    unit: 'Pusat Data dan Teknologi' },
  { nip: '198801012010011001', nama: 'Agus Setiawan',   jabatan: 'Perencana Ahli Madya',          unit: 'Biro Perencanaan' },
  { nip: '198902022011012002', nama: 'Nina Kurniawati', jabatan: 'Arsiparis Ahli Muda',           unit: 'Biro Umum' },
  { nip: '199101012015011003', nama: 'Rizky Prasetyo',  jabatan: 'Pranata Humas Ahli Pertama',   unit: 'Biro Komunikasi' },
  { nip: '199202022016022004', nama: 'Siti Rahayu',     jabatan: 'Analis Keuangan',               unit: 'Biro Keuangan' },
  { nip: '199303032017033005', nama: 'Doni Firmansyah', jabatan: 'Auditor Kepegawaian',           unit: 'Inspektorat Jenderal' },
  { nip: '199404042018044006', nama: 'Endah Wulandari', jabatan: 'Pengelola BMN',                 unit: 'Biro Umum' },
  { nip: '199505052019055007', nama: 'Fajar Hidayat',   jabatan: 'Pengembang Teknologi',          unit: 'Pusat Data dan Teknologi' },
  { nip: '199606062021066008', nama: 'Hendra Gunawan',  jabatan: 'Analis Kebijakan Ahli Pertama', unit: 'Biro Hukum' },
  { nip: '199707072021077009', nama: 'Ika Permatasari', jabatan: 'Penata Laporan Keuangan',       unit: 'Biro Keuangan' },
  { nip: '199808082022088010', nama: 'Joko Widiantoro', jabatan: 'Pranata Komputer Ahli Pertama', unit: 'Pusat Data dan Teknologi' },
]
