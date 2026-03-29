import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { leistungenData } from '@/lib/leistungen-data'
import LeistungTemplate from '@/components/public/LeistungTemplate'

interface Props {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return Object.keys(leistungenData).map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const data = leistungenData[slug]
  if (!data) return {}
  return {
    title: data.meta.title,
    description: data.meta.description,
    keywords: data.meta.keywords,
    alternates: {
      canonical: `https://twyne.ch/leistungen/${slug}`,
    },
    openGraph: {
      title: data.meta.title,
      description: data.meta.description,
      url: `https://twyne.ch/leistungen/${slug}`,
    },
  }
}

export default async function LeistungPage({ params }: Props) {
  const { slug } = await params
  const data = leistungenData[slug]
  if (!data) notFound()
  return <LeistungTemplate data={data} slug={slug} />
}
