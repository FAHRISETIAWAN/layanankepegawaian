import { NextRequest, NextResponse } from 'next/server'

const API_URL = `${process.env.INTEROP_API_URL}/persuratan/cari-surat`
const BEARER  = process.env.INTEROP_BEARER_TOKEN ?? ''

export async function GET(req: NextRequest) {
  const noSurat = req.nextUrl.searchParams.get('no_surat')
  if (!noSurat) return NextResponse.json({ error: 'no_surat required' }, { status: 400 })

  try {
    // Decode dulu jika sudah ter-encode (%2F → /), lalu encode ulang sekali
    const decoded = decodeURIComponent(noSurat)
    const url = `${API_URL}?no_surat=${encodeURIComponent(decoded)}`
    const res = await fetch(url, {
      headers: { Authorization: `Bearer ${BEARER}` },
      cache: 'no-store',
    })

    if (!res.ok) return NextResponse.json({ error: 'Surat tidak ditemukan' }, { status: 404 })

    const data = await res.json()
    return NextResponse.json(data)
  } catch {
    return NextResponse.json({ error: 'Gagal menghubungi server' }, { status: 500 })
  }
}
