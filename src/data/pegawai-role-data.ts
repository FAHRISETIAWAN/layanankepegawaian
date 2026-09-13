export type Role = 'admin' | 'verifikator_ipg' | 'verifikator_tubel' | 'verifikator_pwk' | 'verifikator_ujikom' | 'verifikator_mutasi' | 'monitoring' | 'pegawai'

export const ROLE_CONFIG: Record<Role, { label: string; bg: string; text: string; desc: string }> = {
  admin:               { label: 'Admin',                 bg: 'bg-violet-100 dark:bg-violet-900/30',  text: 'text-violet-700 dark:text-violet-400',  desc: 'Kelola semua data & pengguna sistem' },
  verifikator_ipg:     { label: 'Verifikator IPG',       bg: 'bg-indigo-100 dark:bg-indigo-900/30',  text: 'text-indigo-700 dark:text-indigo-400',  desc: 'Verifikasi pengajuan IPG' },
  verifikator_tubel:   { label: 'Verifikator TUBEL',     bg: 'bg-emerald-100 dark:bg-emerald-900/30',text: 'text-emerald-700 dark:text-emerald-400', desc: 'Verifikasi pengajuan Tugas Belajar' },
  verifikator_pwk:     { label: 'Verifikator PWK',       bg: 'bg-orange-100 dark:bg-orange-900/30',  text: 'text-orange-700 dark:text-orange-400',  desc: 'Verifikasi pengajuan Pindah Wilayah Kerja' },
  verifikator_ujikom:  { label: 'Verifikator UjiKom',    bg: 'bg-rose-100 dark:bg-rose-900/30',      text: 'text-rose-700 dark:text-rose-400',      desc: 'Verifikasi pengajuan Uji Kompetensi JF' },
  verifikator_mutasi:  { label: 'Verifikator Mutasi',    bg: 'bg-sky-100 dark:bg-sky-900/30',        text: 'text-sky-700 dark:text-sky-400',        desc: 'Verifikasi pengajuan Mutasi Pegawai' },
  monitoring:          { label: 'Monitoring',             bg: 'bg-teal-100 dark:bg-teal-900/30',      text: 'text-teal-700 dark:text-teal-400',      desc: 'Pantau seluruh aktivitas pengajuan' },
  pegawai:             { label: 'Pegawai',                bg: 'bg-slate-100 dark:bg-slate-700',       text: 'text-slate-600 dark:text-slate-400',    desc: 'Mengajukan IPG / TUBEL / PWK / UjiKom' },
}

export interface PegawaiRole {
  nip: string
  nama: string
  jabatan: string
  unit: string
  email: string
  role: Role
  aktif: boolean
}

export const daftarPegawaiRole: PegawaiRole[] = []
