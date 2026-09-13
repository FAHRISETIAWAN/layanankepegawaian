import { api } from './client'

export type Role =
  | 'admin'
  | 'verifikator_ipg'
  | 'verifikator_tubel'
  | 'verifikator_pwk'
  | 'verifikator_ujikom'
  | 'verifikator_mutasi'
  | 'monitoring'
  | 'pegawai'

export interface Pegawai {
  nip: string
  nama: string
  jabatan: string
  unit: string
  email: string
  role: Role
  aktif: boolean
  verifikatorMutasi?: string
  createdAt: string
}

export interface CreatePegawaiDto {
  nip: string
  nama: string
  jabatan: string
  unit: string
  email: string
  password: string
  role?: Role
}

export interface UpdatePegawaiDto {
  nama?: string
  jabatan?: string
  unit?: string
  email?: string
  verifikatorMutasi?: string
}

export const pegawaiApi = {
  getAll:        (role?: Role, search?: string) => {
    const params = new URLSearchParams()
    if (role)   params.set('role', role)
    if (search) params.set('search', search)
    const qs = params.toString()
    return api.get<Pegawai[]>(`/pegawai${qs ? '?' + qs : ''}`)
  },
  getOne:        (nip: string)                  => api.get<Pegawai>(`/pegawai/${nip}`),
  create:        (dto: CreatePegawaiDto)        => api.post<Pegawai>('/pegawai', dto),
  update:        (nip: string, dto: UpdatePegawaiDto) => api.patch<Pegawai>(`/pegawai/${nip}`, dto),
  updateRole:    (nip: string, role: Role)      => api.patch<Pegawai>(`/pegawai/${nip}/role`, { role }),
  toggleAktif:   (nip: string)                  => api.patch<Pegawai>(`/pegawai/${nip}/toggle-aktif`, {}),
  remove:        (nip: string)                  => api.delete<void>(`/pegawai/${nip}`),
}
