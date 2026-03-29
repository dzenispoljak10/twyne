import { redirect } from 'next/navigation'

export default function CrmProjektePage({ searchParams }: { searchParams: Promise<{ status?: string }> }) {
  redirect('/admin/projekte')
}
