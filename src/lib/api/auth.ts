export interface AuthUser {
  nip: string
  nama: string
  jabatan: string
  unit: string
  email: string
  role: string
}

// Demo mode: selalu return admin tanpa perlu session/login
export function logout() {
  window.location.href = '/login'
}

export async function getMe(): Promise<AuthUser> {
  return {
    nip:     '199001012020121001',
    nama:    'Admin Demo',
    jabatan: 'Kepala Biro',
    unit:    'Biro Sumber Daya Manusia',
    email:   'admin@demo.go.id',
    role:    'admin',
  }
}
