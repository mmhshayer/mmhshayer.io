'use client'

import { useState, useEffect } from 'react'

export default function ScrollProgressBar() {
  const [height, setHeight] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight
      const documentHeight = document.body.scrollHeight || document.documentElement.scrollHeight
      const scrolled = window.scrollY

      const progress = Math.min((scrolled / (documentHeight - windowHeight)) * 100, 100)
      setHeight(progress)
    }

    window.addEventListener('scroll', handleScroll)

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="fixed left-0 top-0 z-40 w-1 bg-gray-500" style={{ height: height + '%' }}></div>
  )
}
