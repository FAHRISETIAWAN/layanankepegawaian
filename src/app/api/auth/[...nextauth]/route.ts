import NextAuth from 'next-auth/next'
import CredentialsProvider from 'next-auth/providers/credentials'

// Dummy users untuk demo
const DUMMY_USERS = [
  { nip: '199001012020121001', nama: 'Admin Demo',          jabatan: 'Kepala Biro',           unit: 'Biro Sumber Daya Manusia', email: 'admin@demo.go.id',          role: 'admin' },
  { nip: '199002022020122002', nama: 'Verifikator IPG',     jabatan: 'Analis Kepegawaian',    unit: 'Biro Sumber Daya Manusia', email: 'vipg@demo.go.id',            role: 'verifikator_ipg' },
  { nip: '199003032020123003', nama: 'Verifikator TUBEL',   jabatan: 'Analis Kepegawaian',    unit: 'Biro Sumber Daya Manusia', email: 'vtubel@demo.go.id',          role: 'verifikator_tubel' },
  { nip: '199004042020124004', nama: 'Verifikator PWK',     jabatan: 'Analis Kepegawaian',    unit: 'Biro Sumber Daya Manusia', email: 'vpwk@demo.go.id',            role: 'verifikator_pwk' },
  { nip: '199005052020125005', nama: 'Verifikator UjiKom',  jabatan: 'Analis Kepegawaian',    unit: 'Biro Sumber Daya Manusia', email: 'vujikom@demo.go.id',         role: 'verifikator_ujikom' },
  { nip: '199006062020126006', nama: 'Verifikator Mutasi',  jabatan: 'Analis Kepegawaian',    unit: 'Biro Sumber Daya Manusia', email: 'vmutasi@demo.go.id',         role: 'verifikator_mutasi' },
  { nip: '199007072020127007', nama: 'Monitoring Demo',     jabatan: 'Pengawas',              unit: 'Biro Sumber Daya Manusia', email: 'monitoring@demo.go.id',      role: 'monitoring' },
  { nip: '199008082020128008', nama: 'Budi Santoso',        jabatan: 'Pranata Komputer',      unit: 'Pusat Data dan Teknologi', email: 'budi.santoso@demo.go.id',    role: 'pegawai' },
]

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Demo Login',
      credentials: {
        nip:      { label: 'NIP',      type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const user = DUMMY_USERS.find(u => u.nip === credentials?.nip)
        if (!user) return null
        // Password apapun diterima di mode demo
        return {
          id:    user.nip,
          nip:   user.nip,
          name:  user.nama,
          email: user.email,
          role:  user.role,
          jabatan: user.jabatan,
          unit:  user.unit,
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.nip     = (user as any).nip
        token.role    = (user as any).role
        token.jabatan = (user as any).jabatan
        token.unit    = (user as any).unit
      }
      return token
    },
    async session({ session, token }) {
      ;(session as any).nip          = token.nip
      ;(session.user as any).role    = token.role
      ;(session.user as any).jabatan = token.jabatan
      ;(session.user as any).unit    = token.unit
      return session
    },
  },
  pages: {
    signIn: '/login',
  },
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt',
    maxAge: 8 * 60 * 60,
  },
  cookies: {
    sessionToken: {
      name: 'sdm-access-token',
      options: {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        path: '/',
        sameSite: 'lax',
      },
    },
  },
})

export { handler as GET, handler as POST }
