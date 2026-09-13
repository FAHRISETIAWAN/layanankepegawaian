export const staffInfo = {
  name: '',
  unit: '',
  shift: '08:00 - 16:00 WIB',
}

export const statsData = {
  pengajuanHariIni: { total: 0, target: 0, percentage: 0 },
  totalIPG:         { total: 0, target: 0, bulan: '', percentage: 0 },
  totalTUBEL:       { total: 0, target: 0, bulan: '', percentage: 0 },
  totalPWK:         { total: 0, target: 0, bulan: '', percentage: 0 },
  totalUJIKOM:      { total: 0, target: 0, bulan: '', percentage: 0 },
}

export const chartData: { date: string; pengajuan: number }[] = []

export const layananPhases: { phase: string; count: number; color: string }[] = []

export const totalPengajuanAktif = 0

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

export const pengajuanHariIni: PengajuanItem[] = []

export const calendarDates: { day: number; dow: string; isToday: boolean }[] = []
