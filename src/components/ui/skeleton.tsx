import { cn } from '@/lib/utils'

export function Skeleton({ className }: { className?: string }) {
  return (
    <div className={cn('animate-pulse rounded-md bg-slate-200 dark:bg-slate-700', className)} />
  )
}

export function SkeletonTableRow({ cols = 5 }: { cols?: number }) {
  const widths = ['w-24', 'w-32', 'w-40', 'w-28', 'w-20', 'w-16']
  return (
    <tr className="border-b border-slate-100 dark:border-slate-700/60">
      {Array.from({ length: cols }).map((_, i) => (
        <td key={i} className="px-5 py-3.5">
          <Skeleton className={`h-4 ${widths[i % widths.length]}`} />
        </td>
      ))}
    </tr>
  )
}

export function SkeletonTable({ rows = 6, cols = 5 }: { rows?: number; cols?: number }) {
  return (
    <tbody>
      {Array.from({ length: rows }).map((_, i) => (
        <SkeletonTableRow key={i} cols={cols} />
      ))}
    </tbody>
  )
}

export function SkeletonCard() {
  return (
    <div className="space-y-3 rounded-2xl border border-slate-100 bg-white p-5 dark:border-slate-700 dark:bg-slate-900">
      <Skeleton className="h-4 w-24" />
      <Skeleton className="h-8 w-16" />
      <Skeleton className="h-3 w-32" />
    </div>
  )
}

export function SkeletonFormField() {
  return (
    <div className="space-y-1.5">
      <Skeleton className="h-3.5 w-28" />
      <Skeleton className="h-10 w-full" />
    </div>
  )
}
