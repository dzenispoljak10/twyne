import { prisma } from '@/lib/prisma'
import LeadCenter from '@/components/admin/LeadCenter'

export const metadata = {
  title: 'Lead-Center — Admin',
}

export default async function LeadsPage() {
  const leads = await prisma.lead.findMany({
    orderBy: { createdAt: 'desc' },
  })

  const serialized = leads.map((l) => ({
    ...l,
    createdAt: l.createdAt.toISOString(),
    updatedAt: l.updatedAt.toISOString(),
  }))

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[#111111] tracking-tight">Lead-Center</h1>
        <p className="text-sm text-[#6B7280] mt-1">Demo-Anfragen und Interessenten verwalten</p>
      </div>
      <LeadCenter initialLeads={serialized} />
    </div>
  )
}
