import { prisma } from '@/lib/prisma'
import PortfolioManager from '@/components/admin/PortfolioManager'

export const dynamic = 'force-dynamic'

export default async function AdminPortfolioPage() {
  const items = await prisma.portfolio.findMany({
    orderBy: [{ reihenfolge: 'asc' }, { createdAt: 'desc' }],
  })

  const serialized = items.map((item) => ({
    ...item,
    createdAt: item.createdAt.toISOString(),
    updatedAt: item.updatedAt.toISOString(),
  }))

  return <PortfolioManager initialItems={serialized} />
}
