import { redirect } from 'next/navigation'

export default async function CrmProjektDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  redirect(`/admin/projekte/${id}`)
}
