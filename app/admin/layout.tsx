import { headers } from 'next/headers'
import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import Sidebar from '@/components/admin/Sidebar'

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const headersList = await headers()
  const pathname = headersList.get('x-pathname') ?? ''

  // Login-Seite: kein Auth-Check, kein Sidebar
  if (pathname === '/admin/login') {
    return <>{children}</>
  }

  const session = await auth()
  if (!session) redirect('/admin/login')

  // Fetch badge counts
  const [newAnfragen, newUploads, newLeads, kursInteresse] = await Promise.all([
    prisma.anfrage.count({ where: { status: 'NEU' } }),
    prisma.upload.count({ where: { status: 'HOCHGELADEN' } }),
    prisma.lead.count({ where: { status: 'NEU' } }),
    prisma.kursInteresse.count(),
  ])

  return (
    <div className="flex min-h-screen bg-[#F4F4F6]">
      <Sidebar newAnfragen={newAnfragen} newUploads={newUploads} newLeads={newLeads} kursInteresse={kursInteresse} />
      <main className="flex-1 min-w-0">
        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  )
}
