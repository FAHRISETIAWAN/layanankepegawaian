export const staffInfo = {
  name: 'Admin Demo',
  unit: 'Biro Sumber Daya Manusia',
  shift: '08:00 - 16:00 WIB',
}

export const statsData = {
  pengajuanHariIni: { total: 5,  target: 10, percentage: 50 },
  totalIPG:         { total: 8,  target: 20, bulan: 'Sep 2026', percentage: 40 },
  totalTUBEL:       { total: 5,  target: 15, bulan: 'Sep 2026', percentage: 33 },
  totalPWK:         { total: 4,  target: 10, bulan: 'Sep 2026', percentage: 40 },
  totalUJIKOM:      { total: 4,  target: 10, bulan: 'Sep 2026', percentage: 40 },
}

// Data 30 hari terakhir (14 Agustus – 13 September 2026)
export const chartData: { date: string; pengajuan: number }[] = [
  { date: '14 Ags', pengajuan: 2 },
  { date: '15 Ags', pengajuan: 1 },
  { date: '16 Ags', pengajuan: 0 },
  { date: '17 Ags', pengajuan: 3 },
  { date: '18 Ags', pengajuan: 2 },
  { date: '19 Ags', pengajuan: 1 },
  { date: '20 Ags', pengajuan: 0 },
  { date: '21 Ags', pengajuan: 4 },
  { date: '22 Ags', pengajuan: 2 },
  { date: '23 Ags', pengajuan: 1 },
  { date: '24 Ags', pengajuan: 3 },
  { date: '25 Ags', pengajuan: 2 },
  { date: '26 Ags', pengajuan: 5 },
  { date: '27 Ags', pengajuan: 1 },
  { date: '28 Ags', pengajuan: 0 },
  { date: '29 Ags', pengajuan: 2 },
  { date: '30 Ags', pengajuan: 3 },
  { date: '31 Ags', pengajuan: 4 },
  { date: '01 Sep', pengajuan: 2 },
  { date: '02 Sep', pengajuan: 1 },
  { date: '03 Sep', pengajuan: 3 },
  { date: '04 Sep', pengajuan: 2 },
  { date: '05 Sep', pengajuan: 4 },
  { date: '06 Sep', pengajuan: 1 },
  { date: '07 Sep', pengajuan: 0 },
  { date: '08 Sep', pengajuan: 3 },
  { date: '09 Sep', pengajuan: 2 },
  { date: '10 Sep', pengajuan: 4 },
  { date: '11 Sep', pengajuan: 1 },
  { date: '13 Sep', pengajuan: 5 },
]

export const layananPhases: { phase: string; count: number; color: string }[] = [
  { phase: 'IPG',            count: 8, color: '#6366f1' },
  { phase: 'Tugas Belajar',  count: 5, color: '#10b981' },
  { phase: 'Pindah Wilayah', count: 4, color: '#f97316' },
  { phase: 'Uji Kompetensi', count: 4, color: '#f43f5e' },
]

export const totalPengajuanAktif = 21

export type JenisPengajuan = 'ipg' | 'tubel' | 'rapat'

export interface PengajuanItem {
  id: string
  nama: string
  nip: string
  waktu: string
  waktuSelesai: string
  jenis: JenisPengajuan
  layanan: string
  color: string
}

export const pengajuanHariIni: PengajuanItem[] = [
  { id: '1', nama: 'Joko Widiantoro',  nip: '199808082022088010', waktu: '08:10', waktuSelesai: '09:00', jenis: 'ipg',   layanan: 'IPG Profesi',                          color: '#6366f1' },
  { id: '2', nama: 'Ika Permatasari',  nip: '199707072021077009', waktu: '09:30', waktuSelesai: '10:30', jenis: 'tubel', layanan: 'Tugas Belajar Beasiswa',                color: '#10b981' },
  { id: '3', nama: 'Hendra Gunawan',   nip: '199606062021066008', waktu: '10:00', waktuSelesai: '11:00', jenis: 'ipg',   layanan: 'Uji Kompetensi JF - Kenaikan Jenjang', color: '#f43f5e' },
  { id: '4', nama: 'Endah Wulandari',  nip: '199404042018044006', waktu: '11:15', waktuSelesai: '12:00', jenis: 'rapat', layanan: 'Pindah Wilayah Kerja',                  color: '#f97316' },
  { id: '5', nama: 'Doni Firmansyah',  nip: '199303032017033005', waktu: '13:00', waktuSelesai: '14:00', jenis: 'ipg',   layanan: 'IPG Sertifikasi',                       color: '#6366f1' },
]

export const calendarDates: { day: number; dow: string; isToday: boolean }[] = []
