'use client'

import { getMe } from '@/lib/api/auth'
import { useEffect, useState } from 'react'

export function DashboardHeader() {
  const [nama, setNama] = useState('')
  const [unit, setUnit] = useState('')

  useEffect(() => {
    getMe()
      .then((u) => { setNama(u.nama); setUnit(u.unit) })
      .catch(() => {})
  }, [])

  return (
    <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
      <h1 className="text-xl font-semibold text-slate-800 dark:text-white sm:text-2xl">
        Selamat Datang,{' '}
        <span className="text-indigo-600 dark:text-indigo-400">{nama || '...'}</span>
      </h1>
      <p className="text-xs text-slate-500 dark:text-slate-400 sm:text-sm">
        {unit}&nbsp;·&nbsp;
        <span className="font-medium text-slate-700 dark:text-slate-200">08:00 - 16:00 WIB</span>
      </p>
    </div>
  )
}
