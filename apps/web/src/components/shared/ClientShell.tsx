'use client'

import dynamic from 'next/dynamic'

// These components require browser APIs — they must be dynamically imported
// with ssr: false inside a Client Component wrapper
const LoadingScreen = dynamic(() => import('./LoadingScreen'), { ssr: false })
const ScrollProgress = dynamic(() => import('./ScrollProgress'), { ssr: false })
const CustomCursor = dynamic(() => import('./CustomCursor'), { ssr: false })
const Navbar = dynamic(() => import('./Navbar'), { ssr: false })

export default function ClientShell() {
  return (
    <>
      <LoadingScreen />
      <ScrollProgress />
      <CustomCursor />
      <Navbar />
    </>
  )
}
