import { BeTokenInitializer } from '@/components/auth/be-token-initializer'
import { DashboardFooter } from '@/components/dashboard/dashboard-footer'
import { DashboardSidebar } from '@/components/dashboard/dashboard-sidebar'
import { DashboardTopbar } from '@/components/dashboard/dashboard-topbar'
import React from 'react'

export default function PagesLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen bg-slate-100 dark:bg-slate-900">
      <BeTokenInitializer />
      <DashboardSidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <DashboardTopbar />
        <main className="flex-1 overflow-y-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">{children}</main>
        <div className="hidden sm:block"><DashboardFooter /></div>
      </div>
    </div>
  )
}
