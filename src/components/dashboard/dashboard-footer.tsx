export function DashboardFooter() {
  return (
    <footer className="mb-16 flex flex-col items-center gap-1 bg-white px-4 py-3 dark:bg-slate-900 sm:mb-0 sm:h-10 sm:flex-row sm:justify-between sm:py-0">
      <p className="text-[11px] text-slate-400 dark:text-slate-600">
        &copy; 2025 Layanan Pegawai. All rights reserved.
      </p>
      <div className="flex items-center gap-4">
        <a href="#" className="text-[11px] text-slate-400 transition-colors hover:text-slate-600 dark:text-slate-600 dark:hover:text-slate-400">
          Privacy Policy
        </a>
        <a href="#" className="text-[11px] text-slate-400 transition-colors hover:text-slate-600 dark:text-slate-600 dark:hover:text-slate-400">
          Help & Support
        </a>
        <span className="text-[11px] text-slate-300 dark:text-slate-700">v1.0.0</span>
      </div>
    </footer>
  )
}
