'use client'

import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline'

interface Props {
  page: number
  totalPages: number
  onPageChange: (page: number) => void
}

export function Pagination({ page, totalPages, onPageChange }: Props) {
  if (totalPages <= 1) return null

  const pages = buildPageList(page, totalPages)

  return (
    <div className="flex items-center justify-between border-t border-slate-100 px-5 py-3 dark:border-slate-700/60">
      <p className="text-xs text-slate-400">
        Halaman {page} dari {totalPages}
      </p>
      <div className="flex items-center gap-1">
        <NavBtn onClick={() => onPageChange(page - 1)} disabled={page === 1}>
          <ChevronLeftIcon className="h-3.5 w-3.5" />
        </NavBtn>

        {pages.map((p, i) =>
          p === '...' ? (
            <span key={`dots-${i}`} className="flex h-8 w-8 items-center justify-center text-xs text-slate-400">
              ···
            </span>
          ) : (
            <button
              key={p}
              onClick={() => onPageChange(p as number)}
              className={`flex h-8 w-8 items-center justify-center rounded-lg text-xs font-medium transition ${
                p === page
                  ? 'bg-indigo-600 text-white'
                  : 'text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800'
              }`}
            >
              {p}
            </button>
          )
        )}

        <NavBtn onClick={() => onPageChange(page + 1)} disabled={page === totalPages}>
          <ChevronRightIcon className="h-3.5 w-3.5" />
        </NavBtn>
      </div>
    </div>
  )
}

function NavBtn({ onClick, disabled, children }: { onClick: () => void; disabled: boolean; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-500 transition hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed dark:text-slate-400 dark:hover:bg-slate-800"
    >
      {children}
    </button>
  )
}

function buildPageList(current: number, total: number): (number | '...')[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1)
  const pages: (number | '...')[] = [1]
  if (current > 3) pages.push('...')
  for (let i = Math.max(2, current - 1); i <= Math.min(total - 1, current + 1); i++) pages.push(i)
  if (current < total - 2) pages.push('...')
  pages.push(total)
  return pages
}
