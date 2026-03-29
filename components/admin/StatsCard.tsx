import { LucideIcon } from 'lucide-react'

interface StatsCardProps {
  title: string
  value: number | string
  icon: LucideIcon
  description?: string
  color?: string
}

export default function StatsCard({ title, value, icon: Icon, description, color = '#7C3AED' }: StatsCardProps) {
  return (
    <div className="bg-white rounded-xl border border-[#E8E8ED] p-5 shadow-[0_1px_3px_rgba(0,0,0,0.06)]">
      <div className="flex items-start justify-between mb-4">
        <div
          className="w-10 h-10 rounded-lg flex items-center justify-center"
          style={{ background: `${color}15` }}
        >
          <Icon size={20} style={{ color }} />
        </div>
      </div>
      <div className="text-3xl font-extrabold text-[#111111] mb-1" style={{ letterSpacing: '-1px' }}>
        {value}
      </div>
      <div className="text-sm font-medium text-[#374151]">{title}</div>
      {description && (
        <div className="text-xs text-[#6B7280] mt-0.5">{description}</div>
      )}
    </div>
  )
}
