'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, Inbox, FolderOpen, Package, FileText, Settings, LogOut, UserCheck, Images, GraduationCap, Users } from 'lucide-react'
import LogoLight from '@/components/logo/LogoLight'
import { signOut } from 'next-auth/react'

interface NavItem {
  href: string
  label: string
  icon: React.ElementType
  badge?: number
}

interface NavGroup {
  title: string
  items: NavItem[]
}

interface SidebarProps {
  newAnfragen?: number
  newUploads?: number
  newLeads?: number
  kursInteresse?: number
}

export default function Sidebar({ newAnfragen = 0, newUploads = 0, newLeads = 0, kursInteresse = 0 }: SidebarProps) {
  const pathname = usePathname()

  const navGroups: NavGroup[] = [
    {
      title: 'Übersicht',
      items: [
        { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
      ],
    },
    {
      title: 'Akquise',
      items: [
        { href: '/admin/leads', label: 'Lead-Center', icon: UserCheck, badge: newLeads },
        { href: '/admin/kunden', label: 'Kunden', icon: Users },
        { href: '/admin/anfragen', label: 'Anfragen', icon: Inbox, badge: newAnfragen },
        { href: '/admin/projekte', label: 'Projekte', icon: FolderOpen },
      ],
    },
    {
      title: 'Inhalte',
      items: [
        { href: '/admin/portfolio', label: 'Portfolio', icon: Images },
        { href: '/admin/uploads', label: 'Uploads', icon: Package, badge: newUploads },
        { href: '/admin/blog', label: 'Blog', icon: FileText },
        { href: '/admin/kurs-interesse', label: 'Kurs-Interesse', icon: GraduationCap, badge: kursInteresse },
      ],
    },
    {
      title: 'System',
      items: [
        { href: '/admin/einstellungen', label: 'Einstellungen', icon: Settings },
      ],
    },
  ]

  function NavLink({ item }: { item: NavItem }) {
    const Icon = item.icon
    const isActive = pathname === item.href || (item.href !== '/admin' && pathname.startsWith(item.href))
    return (
      <Link
        href={item.href}
        className={`flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium transition-all duration-150 ${
          isActive
            ? 'bg-violet-50 text-[#7C3AED]'
            : 'text-[#374151] hover:bg-[#F4F4F6] hover:text-[#111111]'
        }`}
      >
        <div className="flex items-center gap-2.5">
          <Icon size={17} />
          {item.label}
        </div>
        {item.badge !== undefined && item.badge > 0 && (
          <span className="text-[10px] font-bold bg-[#7C3AED] text-white px-1.5 py-0.5 rounded-full min-w-[18px] text-center">
            {item.badge}
          </span>
        )}
      </Link>
    )
  }

  return (
    <aside className="w-60 flex-shrink-0 bg-white border-r border-[#E8E8ED] flex flex-col min-h-screen">
      {/* Logo */}
      <div className="px-5 py-4 border-b border-[#E8E8ED]">
        <LogoLight width={120} height={28} />
        <p className="text-[10px] text-[#6B7280] mt-1 font-medium uppercase tracking-wider">Admin</p>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-5 overflow-y-auto">
        {navGroups.map((group) => (
          <div key={group.title}>
            <p className="px-3 mb-1 text-[10px] font-semibold text-[#9CA3AF] uppercase tracking-wider">
              {group.title}
            </p>
            <div className="space-y-0.5">
              {group.items.map((item) => (
                <NavLink key={item.href} item={item} />
              ))}
            </div>
          </div>
        ))}
      </nav>

      {/* Logout */}
      <div className="px-3 pb-4 border-t border-[#E8E8ED] pt-3">
        <button
          onClick={() => signOut({ callbackUrl: '/admin/login' })}
          className="flex items-center gap-2.5 px-3 py-2 w-full rounded-lg text-sm font-medium text-[#6B7280] hover:bg-red-50 hover:text-red-600 transition-all duration-150"
        >
          <LogOut size={17} />
          Abmelden
        </button>
      </div>
    </aside>
  )
}
