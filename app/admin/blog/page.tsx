import { prisma } from '@/lib/prisma'
import { Calendar, Eye, EyeOff } from 'lucide-react'

export const dynamic = 'force-dynamic'

export default async function BlogAdminPage() {
  const posts = await prisma.blogPost.findMany({
    orderBy: { createdAt: 'desc' },
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#111111]" style={{ letterSpacing: '-0.5px' }}>Blog</h1>
          <p className="text-sm text-[#6B7280] mt-1">{posts.length} Artikel</p>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-[#E8E8ED] overflow-hidden">
        {posts.length === 0 ? (
          <div className="px-6 py-16 text-center">
            <p className="text-sm text-[#6B7280]">Noch keine Blog-Artikel vorhanden.</p>
            <p className="text-xs text-[#6B7280] mt-1">Blog-Posts können direkt in der Datenbank oder via Prisma Studio angelegt werden.</p>
          </div>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#E8E8ED] bg-[#F4F4F6]">
                <th className="text-left px-6 py-3 text-xs font-semibold text-[#6B7280] uppercase tracking-wider">Titel</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-[#6B7280] uppercase tracking-wider hidden md:table-cell">Datum</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-[#6B7280] uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E8E8ED]">
              {posts.map((post) => (
                <tr key={post.id} className="hover:bg-[#F4F4F6] transition-colors">
                  <td className="px-6 py-4">
                    <p className="text-sm font-medium text-[#111111]">{post.titelDe}</p>
                    <p className="text-xs text-[#6B7280]">/blog/{post.slugDe}</p>
                  </td>
                  <td className="px-6 py-4 hidden md:table-cell">
                    <div className="flex items-center gap-1.5 text-sm text-[#6B7280]">
                      <Calendar size={13} />
                      {new Date(post.createdAt).toLocaleDateString('de-CH')}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    {post.veroeffentlicht ? (
                      <div className="flex items-center gap-1.5 text-xs text-green-600 font-medium">
                        <Eye size={14} /> Veröffentlicht
                      </div>
                    ) : (
                      <div className="flex items-center gap-1.5 text-xs text-[#6B7280] font-medium">
                        <EyeOff size={14} /> Entwurf
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}
