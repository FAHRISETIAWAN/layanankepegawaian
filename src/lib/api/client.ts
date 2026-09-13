// ── Demo mode: semua request dihandle oleh dummy handler ─────────────────
import {
  DUMMY_PEGAWAI,
  DUMMY_PENGAJUAN,
  DUMMY_VERIFIKASI,
} from '../dummy-data'

export function getBeToken(): string | null { return 'demo-token' }
export function clearBeToken() {}

let _pegawai   = [...DUMMY_PEGAWAI]
let _pengajuan = [...DUMMY_PENGAJUAN]
let _verif     = [...DUMMY_VERIFIKASI]

function delay<T>(data: T, ms = 300): Promise<T> {
  return new Promise(res => setTimeout(() => res(data), ms))
}

function handle(method: string, path: string, body?: unknown): Promise<unknown> {
  // ── Auth ──────────────────────────────────────────────────────────────
  if (path === '/auth/me') {
    return delay({ nip: '199001012020121001', nama: 'Admin Demo', jabatan: 'Kepala Biro', unit: 'Biro SDM', email: 'admin@demo.go.id', role: 'admin' })
  }

  // ── Pegawai ───────────────────────────────────────────────────────────
  if (path === '/pegawai' && method === 'GET') return delay([..._pegawai])
  if (path.startsWith('/pegawai?')) {
    const qs = new URLSearchParams(path.slice(9))
    const role   = qs.get('role')
    const search = qs.get('search')?.toLowerCase()
    return delay(_pegawai.filter(p => {
      if (role   && p.role !== role) return false
      if (search && !p.nama.toLowerCase().includes(search) && !p.nip.includes(search) && !p.unit.toLowerCase().includes(search)) return false
      return true
    }))
  }
  if (path === '/pegawai' && method === 'POST') {
    const d = body as any
    const p = { ...d, aktif: true, createdAt: new Date().toISOString() }
    _pegawai = [..._pegawai, p]
    return delay(p)
  }
  if (path.match(/^\/pegawai\/[\w]+\/role$/) && method === 'PATCH') {
    const nip = path.split('/')[2]
    _pegawai = _pegawai.map(p => p.nip === nip ? { ...p, role: (body as any).role } : p)
    return delay(_pegawai.find(p => p.nip === nip))
  }
  if (path.match(/^\/pegawai\/[\w]+\/toggle-aktif$/) && method === 'PATCH') {
    const nip = path.split('/')[2]
    _pegawai = _pegawai.map(p => p.nip === nip ? { ...p, aktif: !p.aktif } : p)
    return delay(_pegawai.find(p => p.nip === nip))
  }
  if (path.match(/^\/pegawai\/\w+$/) && method === 'DELETE') {
    const nip = path.split('/')[2]
    _pegawai = _pegawai.filter(p => p.nip !== nip)
    return delay(undefined)
  }

  // ── Pengajuan ─────────────────────────────────────────────────────────
  if (path.startsWith('/pengajuan') && method === 'GET') {
    const qs      = path.includes('?') ? new URLSearchParams(path.split('?')[1]) : null
    const layanan = qs?.get('layanan')
    const status  = qs?.get('status')
    const kode    = path.match(/^\/pengajuan\/kode\/(.+)$/)
    if (kode) return delay(_pengajuan.find(p => p.kode === kode[1]))
    const id = path.match(/^\/pengajuan\/(pj-\w+)$/)
    if (id)   return delay(_pengajuan.find(p => p.id === id[1]))
    return delay(_pengajuan.filter(p => {
      if (layanan && p.layanan !== layanan) return false
      if (status  && p.status  !== status)  return false
      return true
    }))
  }
  if (path === '/pengajuan' && method === 'POST') {
    const d = body as any
    const p = { ...d, id: 'pj-' + Date.now(), kode: 'PJ-' + Date.now(), status: 'menunggu', pegawaiList: d.pegawaiList.map((x: any, i: number) => ({ ...x, id: 'pp-' + Date.now() + i })) }
    _pengajuan = [..._pengajuan, p]
    return delay(p)
  }
  if (path.match(/^\/pengajuan\/[\w-]+\/status$/) && method === 'PATCH') {
    const id = path.split('/')[2]
    _pengajuan = _pengajuan.map(p => p.id === id ? { ...p, status: (body as any).status } : p)
    return delay(_pengajuan.find(p => p.id === id))
  }

  // ── Verifikasi ────────────────────────────────────────────────────────
  if (path.startsWith('/verifikasi') && method === 'GET') {
    if (path === '/verifikasi/stats') {
      const stats = { menunggu: 0, disetujui: 0, ditolak: 0 }
      _verif.forEach(v => { stats[v.status as keyof typeof stats] = (stats[v.status as keyof typeof stats] ?? 0) + 1 })
      return delay(stats)
    }
    const byPj = path.match(/^\/verifikasi\/(pj-[\w-]+)$/)
    if (byPj) return delay(_verif.find(v => v.pengajuanId === byPj[1]))
    const qs     = path.includes('?') ? new URLSearchParams(path.split('?')[1]) : null
    const status = qs?.get('status')
    return delay(_verif.filter(v => !status || v.status === status))
  }
  if (path.match(/^\/verifikasi\/[\w-]+\/init$/) && method === 'POST') {
    const pengajuanId = path.split('/')[2]
    const d = body as any
    const v = { id: 'vf-' + Date.now(), pengajuanId, nipVerifikator: d.nipVerifikator, status: 'menunggu', updatedAt: new Date().toISOString() }
    _verif = [..._verif, v]
    return delay(v)
  }
  if (path.match(/^\/verifikasi\/[\w-]+$/) && method === 'PATCH') {
    const pengajuanId = path.split('/')[2]
    _verif = _verif.map(v => v.pengajuanId === pengajuanId ? { ...v, ...(body as any), updatedAt: new Date().toISOString() } : v)
    return delay(_verif.find(v => v.pengajuanId === pengajuanId))
  }

  // ── Laporan ───────────────────────────────────────────────────────────
  if (path.startsWith('/laporan/per-layanan')) {
    const layananList = ['IPG Profesi', 'IPG Sertifikasi', 'IPG Akademik', 'Tugas Belajar Mandiri', 'Tugas Belajar Beasiswa', 'Pindah Wilayah Kerja', 'Uji Kompetensi JF - Kenaikan Jenjang', 'Uji Kompetensi JF - Perpindahan Jabatan']
    return delay(layananList.map(l => ({
      layanan: l, total: Math.floor(Math.random() * 20) + 1,
      menunggu: Math.floor(Math.random() * 5), diproses: Math.floor(Math.random() * 3),
      diverifikasi: Math.floor(Math.random() * 10), ditolak: Math.floor(Math.random() * 3),
    })))
  }
  if (path.startsWith('/laporan/per-bulan')) {
    const hasil = []
    for (let b = 1; b <= 9; b++) {
      hasil.push({ bulan: `2026-${String(b).padStart(2,'0')}`, layanan: 'IPG Profesi', total: Math.floor(Math.random() * 8) + 1 })
      hasil.push({ bulan: `2026-${String(b).padStart(2,'0')}`, layanan: 'Tugas Belajar Mandiri', total: Math.floor(Math.random() * 5) + 1 })
    }
    return delay(hasil)
  }
  if (path === '/laporan/statistik') {
    return delay({ perLayanan: [], perStatus: { menunggu: 5, diproses: 3, diverifikasi: 8, ditolak: 2 } })
  }

  // ── Referensi ─────────────────────────────────────────────────────────
  if (path.startsWith('/referensi/satker')) {
    const search = new URLSearchParams(path.split('?')[1] ?? '').get('search')?.toLowerCase()
    const list = [
      { satkerid: '001', satker: 'Biro Sumber Daya Manusia' },
      { satkerid: '002', satker: 'Biro Keuangan' },
      { satkerid: '003', satker: 'Biro Perencanaan' },
      { satkerid: '004', satker: 'Pusat Data dan Teknologi' },
      { satkerid: '005', satker: 'Inspektorat Jenderal' },
    ]
    return delay(search ? list.filter(s => s.satker.toLowerCase().includes(search)) : list)
  }
  if (path.startsWith('/referensi/masterpegawai/kantorpusat')) {
    const search = new URLSearchParams(path.split('?')[1] ?? '').get('search')?.toLowerCase()
    const list = [
      { nip: '199601012020121010', nama: 'Ahmad Fauzi',     statuspegawai: 'PNS', namajabatan: 'Analis SDM', satkerinduk: 'Sekjen', satkerid: '001', satker: 'Kantor Pusat Nomenklatur Baru | Sekretariat Jenderal | Biro Sumber Daya Manusia', email: 'ahmad.fauzi@demo.go.id' },
      { nip: '199702022021022011', nama: 'Bella Novitasari', statuspegawai: 'PNS', namajabatan: 'Pengolah Data', satkerinduk: 'Sekjen', satkerid: '001', satker: 'Kantor Pusat Nomenklatur Baru | Sekretariat Jenderal | Biro Sumber Daya Manusia', email: 'bella.novitasari@demo.go.id' },
      { nip: '199803032021033012', nama: 'Cahyo Wibowo',    statuspegawai: 'PNS', namajabatan: 'Perencana Ahli Pertama', satkerinduk: 'Sekjen', satkerid: '001', satker: 'Kantor Pusat Nomenklatur Baru | Sekretariat Jenderal | Biro Sumber Daya Manusia', email: 'cahyo.wibowo@demo.go.id' },
      { nip: '199904042021044013', nama: 'Dina Safitri',    statuspegawai: 'PNS', namajabatan: 'Arsiparis Ahli Pertama', satkerinduk: 'Sekjen', satkerid: '001', satker: 'Kantor Pusat Nomenklatur Baru | Sekretariat Jenderal | Biro Sumber Daya Manusia', email: 'dina.safitri@demo.go.id' },
      { nip: '200005052022055014', nama: 'Eko Prasetya',    statuspegawai: 'PNS', namajabatan: 'Pranata Komputer Ahli Pertama', satkerinduk: 'Sekjen', satkerid: '001', satker: 'Kantor Pusat Nomenklatur Baru | Sekretariat Jenderal | Biro Sumber Daya Manusia', email: 'eko.prasetya@demo.go.id' },
    ]
    return delay(search ? list.filter(p => p.nama.toLowerCase().includes(search) || p.nip.includes(search)) : list)
  }
  if (path.startsWith('/referensi/masterpegawai')) {
    const search = new URLSearchParams(path.split('?')[1] ?? '').get('search')?.toLowerCase()
    const list = DUMMY_PEGAWAI.map(p => ({ nip: p.nip, nama: p.nama, statuspegawai: 'PNS', namajabatan: p.jabatan, satkerinduk: 'Sekjen', satkerid: '001', satker: p.unit, email: p.email }))
    return delay(search ? list.filter(p => p.nama.toLowerCase().includes(search) || p.nip.includes(search)) : list)
  }

  // ── Kelengkapan / Pengajuan detail ────────────────────────────────────
  if (path.startsWith('/kelengkapan') || path.startsWith('/pengajuan/kelengkapan')) {
    return delay([])
  }

  // ── Surat ────────────────────────────────────────────────────────────
  if (path.startsWith('/surat')) {
    return delay([])
  }

  // Fallback
  console.warn('[DEMO] unhandled API:', method, path)
  return delay(null)
}

export const api = {
  get:    <T>(path: string)                => handle('GET',    path)           as Promise<T>,
  post:   <T>(path: string, body: unknown) => handle('POST',   path, body)     as Promise<T>,
  patch:  <T>(path: string, body: unknown) => handle('PATCH',  path, body)     as Promise<T>,
  delete: <T>(path: string)               => handle('DELETE',  path)           as Promise<T>,
}
