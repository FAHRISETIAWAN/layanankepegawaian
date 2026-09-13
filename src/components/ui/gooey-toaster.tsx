'use client'

import { mountToaster } from 'gooey-toast'
import 'gooey-toast/styles.css'
import { useEffect } from 'react'

export function GooeyToaster() {
  useEffect(() => {
    mountToaster({ position: 'top-right' })
  }, [])
  return null
}
