import {
  DashboardHeader,
  StatsCards,
  TreatmentPhases,
  UpcomingVisits,
  VisitChart,
} from '@/components/dashboard'

export default function DashboardPage() {
  return (
    <div className="overflow-y-auto p-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden lg:p-6">
      <DashboardHeader />
      <div className="mt-4 flex flex-col gap-4">
        {/* Stats cards — full width */}
        <StatsCards />

        {/* Grafik + Rekap sejajar, sama tinggi */}
        <div className="flex flex-col gap-4 lg:flex-row lg:items-stretch">
          <div className="flex-1 min-w-0">
            <VisitChart />
          </div>
          <div className="w-full shrink-0 lg:w-80 xl:w-96">
            <TreatmentPhases />
          </div>
        </div>

        {/* Aktivitas Terkini — full width */}
        <UpcomingVisits />
      </div>
    </div>
  )
}
