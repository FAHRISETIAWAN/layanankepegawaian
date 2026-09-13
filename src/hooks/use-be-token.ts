'use client'

const STORAGE_KEY = 'be_token'

export function getBeToken(): string | null {
  if (typeof window === 'undefined') return null
  return 'demo-token'
}

// Demo mode: token selalu tersedia, tidak perlu exchange Keycloak
export function useBeToken() {
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEY, 'demo-token')
  }
}
