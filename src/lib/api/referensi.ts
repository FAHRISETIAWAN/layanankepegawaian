import { api } from './client'

export interface Satker {
  satkerid: string
  satker: string
}

export interface MasterPegawai {
  nip: string
  nama: string
  statuspegawai: string
  namajabatan: string
  satkerinduk: string
  satkerid: string
  satker: string
  email: string
}

export const referensiApi = {
  getSatker: (search?: string) => {
    const qs = search ? `?search=${encodeURIComponent(search)}` : ''
    return api.get<Satker[]>(`/referensi/satker${qs}`)
  },
  getMasterPegawai: (search?: string) => {
    const qs = search ? `?search=${encodeURIComponent(search)}` : ''
    return api.get<MasterPegawai[]>(`/referensi/masterpegawai${qs}`)
  },
  getKantorPusat: (search?: string) => {
    const qs = search ? `?search=${encodeURIComponent(search)}` : ''
    return api.get<MasterPegawai[]>(`/referensi/masterpegawai/kantorpusat${qs}`)
  },
}
