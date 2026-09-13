export interface PerpanjanganTubel {
  id: string
  nip: string
  nama: string
  jabatan: string
  unit: string
  kode: string
  tanggalPengajuan: string
  nomorSKPerpanjangan?: string
  tanggalSKPerpanjangan?: string
  tmtSelesaiPerpanjangan?: string
  fileSKPerpanjangan?: string
  status: 'belum' | 'sudah'
}

export const daftarPerpanjangan: PerpanjanganTubel[] = [
  { id: 'pp-001', nip: '199202022016022004', nama: 'Siti Rahayu',     jabatan: 'Analis Keuangan',               unit: 'Biro Keuangan',            kode: 'TUBEL-2026-001', tanggalPengajuan: '01 Februari 2026',  status: 'belum' },
  { id: 'pp-002', nip: '199008082020128008', nama: 'Budi Santoso',    jabatan: 'Pranata Komputer Ahli Muda',    unit: 'Pusat Data dan Teknologi', kode: 'TUBEL-2026-002', tanggalPengajuan: '05 Maret 2026',     status: 'belum' },
  { id: 'pp-003', nip: '199707072021077009', nama: 'Ika Permatasari', jabatan: 'Penata Laporan Keuangan',       unit: 'Biro Keuangan',            kode: 'TUBEL-2026-003', tanggalPengajuan: '15 April 2026',     nomorSKPerpanjangan: 'SK-PERPANJ-2026-001', tanggalSKPerpanjangan: '25 April 2026',  tmtSelesaiPerpanjangan: '31 Desember 2027', status: 'sudah' },
  { id: 'pp-004', nip: '199404042018044006', nama: 'Endah Wulandari', jabatan: 'Pengelola BMN',                 unit: 'Biro Umum',                kode: 'TUBEL-2026-004', tanggalPengajuan: '05 Juli 2026',       nomorSKPerpanjangan: 'SK-PERPANJ-2026-002', tanggalSKPerpanjangan: '15 Juli 2026',   tmtSelesaiPerpanjangan: '30 Juni 2028',     status: 'sudah' },
  { id: 'pp-005', nip: '199606062021066008', nama: 'Hendra Gunawan',  jabatan: 'Analis Kebijakan Ahli Pertama', unit: 'Biro Hukum',               kode: 'TUBEL-2026-005', tanggalPengajuan: '01 September 2026', status: 'belum' },
  { id: 'pp-006', nip: '198801012010011001', nama: 'Agus Setiawan',   jabatan: 'Perencana Ahli Madya',          unit: 'Biro Perencanaan',         kode: 'TUBEL-2025-008', tanggalPengajuan: '10 November 2025',  nomorSKPerpanjangan: 'SK-PERPANJ-2025-005', tanggalSKPerpanjangan: '20 November 2025', tmtSelesaiPerpanjangan: '31 Agustus 2027', status: 'sudah' },
]
