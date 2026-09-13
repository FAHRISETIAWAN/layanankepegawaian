import { ThemeProvider } from '@/components/theme-provider'
import { GooeyToaster } from '@/components/ui/gooey-toaster'
import '@/styles/tailwind.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: {
    template: '%s - Layanan Pegawai',
    default: 'Layanan Pegawai',
  },
  description: 'Sistem Manajemen Izin Pengembangan dan Tugas Belajar Aparatur Sipil Negara.',
  keywords: ['IPG', 'TUBEL', 'ASN', 'BKN', 'Izin Pengembangan', 'Tugas Belajar'],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body className="font-sans antialiased">
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
          {children}
          <GooeyToaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
