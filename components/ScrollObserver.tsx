'use client'
import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

export default function ScrollObserver() {
  const pathname = usePathname()

  useEffect(() => {
    // Small delay to ensure the new page's DOM is fully painted
    const setup = () => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('visible')
            }
          })
        },
        { threshold: 0.1 }
      )
      const els = document.querySelectorAll('.animate-on-scroll')
      els.forEach((el) => {
        // Reset so elements hidden from a previous page don't stay visible
        el.classList.remove('visible')
        observer.observe(el)
      })
      return observer
    }

    // Run immediately (covers elements already in viewport on load)
    const observer = setup()
    return () => observer.disconnect()
  }, [pathname])

  return null
}
