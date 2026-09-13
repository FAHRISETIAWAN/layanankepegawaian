'use client'

import clsx from 'clsx'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import {
  ArrowPathIcon,
  ArrowsRightLeftIcon,
  ChartBarIcon,
  ChevronDownIcon,
  ChevronLeftIcon,
  ClipboardDocumentCheckIcon,
  ClipboardDocumentListIcon,
  DocumentCheckIcon,
  HomeIcon,
  ShieldExclamationIcon,
  UserGroupIcon,
} from '@heroicons/react/24/outline'
import {
  ArrowPathIcon as ArrowPathSolid,
  ArrowsRightLeftIcon as ArrowsRightLeftSolid,
  ChartBarIcon as ChartBarSolid,
  ClipboardDocumentCheckIcon as ClipboardCheckSolid,
  ClipboardDocumentListIcon as ClipboardSolid,
  DocumentCheckIcon as DocumentCheckSolid,
  HomeIcon as HomeSolid,
  ShieldExclamationIcon as ShieldSolid,
  UserGroupIcon as UserGroupSolid,
} from '@heroicons/react/24/solid'

const SURAT_CHILDREN = [
  { label: 'Rekomendasi PWK', href: '/surat/rekomendasi' },
  { label: 'Surat Keputusan', href: '/sk' },
  { label: 'Sertifikat',      href: '/surat/sertifikat' },
]

const navItems = [
  {
    label: 'Dashboard',       href: '/dashboard',
    icon: HomeIcon,           iconActive: HomeSolid,
    color: 'bg-indigo-500',   colorLight: 'bg-indigo-50 text-indigo-600',
    activeText: 'text-indigo-600',
  },
  {
    label: 'Form Permintaan', href: '/formpermintaan',
    icon: ClipboardDocumentListIcon, iconActive: ClipboardSolid,
    color: 'bg-violet-500',   colorLight: 'bg-violet-50 text-violet-600',
    activeText: 'text-violet-600',
  },
  {
    label: 'Pindah Wilayah Kerja', href: '/pwk',
    icon: ArrowsRightLeftIcon, iconActive: ArrowsRightLeftSolid,
    color: 'bg-sky-500',      colorLight: 'bg-sky-50 text-sky-600',
    activeText: 'text-sky-600',
  },
  {
    label: 'Verifikasi',      href: '/verifikasi',
    icon: ClipboardDocumentCheckIcon, iconActive: ClipboardCheckSolid,
    color: 'bg-emerald-500',  colorLight: 'bg-emerald-50 text-emerald-600',
    activeText: 'text-emerald-600',
  },
  {
    label: 'Perpanjangan',    href: '/perpanjangan',
    icon: ArrowPathIcon,      iconActive: ArrowPathSolid,
    color: 'bg-amber-500',    colorLight: 'bg-amber-50 text-amber-600',
    activeText: 'text-amber-600',
  },
  {
    label: 'Laporan',         href: '/laporan',
    icon: ChartBarIcon,       iconActive: ChartBarSolid,
    color: 'bg-orange-500',   colorLight: 'bg-orange-50 text-orange-600',
    activeText: 'text-orange-600',
  },
  {
    label: 'Hukuman Disiplin', href: '/hukdis',
    icon: ShieldExclamationIcon, iconActive: ShieldSolid,
    color: 'bg-red-500',      colorLight: 'bg-red-50 text-red-600',
    activeText: 'text-red-600',
  },
  {
    label: 'Pegawai',         href: '/pegawai',
    icon: UserGroupIcon,      iconActive: UserGroupSolid,
    color: 'bg-teal-500',     colorLight: 'bg-teal-50 text-teal-600',
    activeText: 'text-teal-600',
  },
]

const dokumenColor = {
  color: 'bg-pink-500',
  colorLight: 'bg-pink-50 text-pink-600',
  activeText: 'text-pink-600',
}

const bottomNavItems = [
  { label: 'Dashboard', href: '/dashboard',      icon: HomeIcon,                   iconActive: HomeSolid,         color: 'text-indigo-600' },
  { label: 'Form',      href: '/formpermintaan', icon: ClipboardDocumentListIcon,  iconActive: ClipboardSolid,    color: 'text-violet-600' },
  { label: 'Verifikasi',href: '/verifikasi',     icon: ClipboardDocumentCheckIcon, iconActive: ClipboardCheckSolid, color: 'text-emerald-600' },
  { label: 'Laporan',   href: '/laporan',        icon: ChartBarIcon,               iconActive: ChartBarSolid,     color: 'text-orange-600' },
]

export function DashboardSidebar() {
  const pathname = usePathname()
  const [collapsed, setCollapsed] = useState(true)
  const isSuratActive = SURAT_CHILDREN.some(c => pathname === c.href)
  const [suratOpen, setSuratOpen] = useState(isSuratActive)

  return (
    <>
      {/* Desktop sidebar */}
      <aside
        className={clsx(
          'hidden flex-col bg-white py-6 transition-all duration-200 dark:bg-slate-900 lg:flex',
          collapsed ? 'w-16 items-center' : 'w-60 items-stretch'
        )}
      >
        {/* Logo */}
        <div className={clsx('mb-8 flex shrink-0', collapsed ? 'justify-center' : 'items-center gap-2.5 px-4')}>
          {collapsed ? (
            <button
              onClick={() => setCollapsed(false)}
              title="Perluas sidebar"
              className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-600 transition hover:bg-indigo-500"
            >
              <span className="text-sm font-bold text-white">IP</span>
            </button>
          ) : (
            <>
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-indigo-600">
                <span className="text-sm font-bold text-white">IP</span>
              </div>
              <span className="flex-1 text-sm font-bold text-slate-800 dark:text-slate-100">Layanan Pegawai</span>
              <button
                onClick={() => setCollapsed(true)}
                title="Ciutkan sidebar"
                className="flex h-7 w-7 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-800"
              >
                <ChevronLeftIcon className="h-4 w-4" />
              </button>
            </>
          )}
        </div>

        {/* Nav */}
        <nav className={clsx('flex flex-1 flex-col gap-0.5', collapsed ? 'items-center' : 'px-3')}>
          {navItems.slice(0, 3).map((item) => {
            const isActive = pathname === item.href
            const Icon = isActive ? item.iconActive : item.icon
            return (
              <Link
                key={item.href}
                href={item.href}
                title={collapsed ? item.label : undefined}
                className={clsx(
                  'group relative flex h-10 items-center rounded-xl transition-colors',
                  collapsed ? 'w-10 justify-center' : 'w-full gap-3 px-2',
                  isActive
                    ? `${item.colorLight} dark:bg-opacity-20`
                    : 'hover:bg-slate-50 dark:hover:bg-slate-800'
                )}
              >
                <span className={clsx(
                  'flex h-7 w-7 shrink-0 items-center justify-center rounded-lg',
                  isActive ? item.color : 'bg-slate-100 dark:bg-slate-700'
                )}>
                  <Icon className={clsx('h-4 w-4', isActive ? 'text-white' : 'text-slate-500 dark:text-slate-400')} />
                </span>
                {collapsed ? (
                  <span className="pointer-events-none absolute left-14 z-50 whitespace-nowrap rounded-lg bg-slate-800 px-2.5 py-1 text-xs font-medium text-slate-100 opacity-0 shadow-lg transition-opacity group-hover:opacity-100">
                    {item.label}
                  </span>
                ) : (
                  <span className={clsx('text-sm font-medium', isActive ? item.activeText : 'text-slate-600 dark:text-slate-300')}>
                    {item.label}
                  </span>
                )}
              </Link>
            )
          })}

          {/* Dokumen — submenu */}
          {collapsed ? (
            <div className="group relative">
              <button
                title="Dokumen"
                onClick={() => { setCollapsed(false); setSuratOpen(true) }}
                className={clsx(
                  'flex h-10 w-10 items-center justify-center rounded-xl transition-colors',
                  isSuratActive ? `${dokumenColor.colorLight} dark:bg-opacity-20` : 'hover:bg-slate-50 dark:hover:bg-slate-800'
                )}
              >
                <span className={clsx('flex h-7 w-7 items-center justify-center rounded-lg', isSuratActive ? dokumenColor.color : 'bg-slate-100 dark:bg-slate-700')}>
                  {isSuratActive
                    ? <DocumentCheckSolid className="h-4 w-4 text-white" />
                    : <DocumentCheckIcon className="h-4 w-4 text-slate-500 dark:text-slate-400" />}
                </span>
                <span className="pointer-events-none absolute left-14 z-50 whitespace-nowrap rounded-lg bg-slate-800 px-2.5 py-1 text-xs font-medium text-slate-100 opacity-0 shadow-lg transition-opacity group-hover:opacity-100">
                  Dokumen
                </span>
              </button>
            </div>
          ) : (
            <div>
              <button
                onClick={() => setSuratOpen(v => !v)}
                className={clsx(
                  'flex h-10 w-full items-center gap-3 rounded-xl px-2 transition-colors',
                  isSuratActive ? `${dokumenColor.colorLight} dark:bg-opacity-20` : 'hover:bg-slate-50 dark:hover:bg-slate-800'
                )}
              >
                <span className={clsx('flex h-7 w-7 shrink-0 items-center justify-center rounded-lg', isSuratActive ? dokumenColor.color : 'bg-slate-100 dark:bg-slate-700')}>
                  {isSuratActive
                    ? <DocumentCheckSolid className="h-4 w-4 text-white" />
                    : <DocumentCheckIcon className="h-4 w-4 text-slate-500 dark:text-slate-400" />}
                </span>
                <span className={clsx('flex-1 text-left text-sm font-medium', isSuratActive ? dokumenColor.activeText : 'text-slate-600 dark:text-slate-300')}>
                  Dokumen
                </span>
                <ChevronDownIcon className={clsx('h-3.5 w-3.5 text-slate-400 transition-transform duration-200', suratOpen ? 'rotate-180' : '')} />
              </button>

              {suratOpen && (
                <div className="ml-9 mt-0.5 flex flex-col gap-0.5">
                  {SURAT_CHILDREN.map(child => {
                    const isActive = pathname === child.href
                    return (
                      <Link
                        key={child.href}
                        href={child.href}
                        className={clsx(
                          'flex h-8 items-center rounded-lg px-3 text-xs font-medium transition-colors',
                          isActive
                            ? 'bg-pink-50 text-pink-600 dark:bg-pink-900/20 dark:text-pink-400'
                            : 'text-slate-400 hover:bg-slate-50 hover:text-slate-600 dark:hover:bg-slate-800 dark:hover:text-slate-300'
                        )}
                      >
                        <span className={clsx('mr-2 h-1.5 w-1.5 rounded-full', isActive ? 'bg-pink-500' : 'bg-slate-300 dark:bg-slate-600')} />
                        {child.label}
                      </Link>
                    )
                  })}
                </div>
              )}
            </div>
          )}

          {navItems.slice(3).map((item) => {
            const isActive = pathname === item.href
            const Icon = isActive ? item.iconActive : item.icon
            return (
              <Link
                key={item.href}
                href={item.href}
                title={collapsed ? item.label : undefined}
                className={clsx(
                  'group relative flex h-10 items-center rounded-xl transition-colors',
                  collapsed ? 'w-10 justify-center' : 'w-full gap-3 px-2',
                  isActive
                    ? `${item.colorLight} dark:bg-opacity-20`
                    : 'hover:bg-slate-50 dark:hover:bg-slate-800'
                )}
              >
                <span className={clsx(
                  'flex h-7 w-7 shrink-0 items-center justify-center rounded-lg',
                  isActive ? item.color : 'bg-slate-100 dark:bg-slate-700'
                )}>
                  <Icon className={clsx('h-4 w-4', isActive ? 'text-white' : 'text-slate-500 dark:text-slate-400')} />
                </span>
                {collapsed ? (
                  <span className="pointer-events-none absolute left-14 z-50 whitespace-nowrap rounded-lg bg-slate-800 px-2.5 py-1 text-xs font-medium text-slate-100 opacity-0 shadow-lg transition-opacity group-hover:opacity-100">
                    {item.label}
                  </span>
                ) : (
                  <span className={clsx('text-sm font-medium', isActive ? item.activeText : 'text-slate-600 dark:text-slate-300')}>
                    {item.label}
                  </span>
                )}
              </Link>
            )
          })}
        </nav>

      </aside>

      {/* Mobile bottom navigation */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 flex items-center justify-around border-t border-slate-200 bg-white px-2 pb-safe pt-2 dark:border-slate-700/50 dark:bg-slate-900 lg:hidden">
        {bottomNavItems.map((item) => {
          const isActive = pathname === item.href
          const Icon = isActive ? item.iconActive : item.icon
          return (
            <Link
              key={item.href}
              href={item.href}
              className={clsx(
                'flex flex-col items-center gap-0.5 rounded-xl px-3 py-1.5 transition-colors',
                isActive ? item.color : 'text-slate-400 dark:text-slate-500'
              )}
            >
              <Icon className="h-5 w-5" />
              <span className="text-[10px] font-medium">{item.label}</span>
            </Link>
          )
        })}
      </nav>
    </>
  )
}
