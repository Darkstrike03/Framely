import { useCallback, useEffect, useRef, useState } from 'react'

const HERO_IMAGES = [
  '/showcase-1.webp',
  '/showcase-2.webp',
  '/showcase-3.webp',
  '/showcase-4.webp',
  '/showcase-5.webp',
]

const ROTATE_MS = 5000
const TRANSITION_MS = 800
const SHEEN_MS = 750

export default function HeroEditorialCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  // Track the incoming image explicitly so it never updates out of sync
  const [nextIndex, setNextIndex] = useState(1)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const sheenCanvasRef = useRef(null)

  const triggerSheen = useCallback(() => {
    const canvas = sheenCanvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    const width = canvas.width
    const height = canvas.height
    if (!width || !height) return

    let start = null

    function animateSheen(timestamp) {
      if (!start) start = timestamp
      const progress = (timestamp - start) / SHEEN_MS

      ctx.clearRect(0, 0, width, height)

      if (progress < 1) {
        const x = progress * (width * 2) - width
        const gradient = ctx.createLinearGradient(x, 0, x + 150, height)
        gradient.addColorStop(0, 'rgba(255, 255, 255, 0)')
        gradient.addColorStop(0.3, 'rgba(255, 255, 255, 0.25)')
        gradient.addColorStop(0.5, 'rgba(255, 255, 255, 0.4)')
        gradient.addColorStop(0.7, 'rgba(255, 255, 255, 0.25)')
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0)')

        ctx.fillStyle = gradient
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x + 200, 0)
        ctx.lineTo(x + 200 - height, height)
        ctx.lineTo(x - height, height)
        ctx.closePath()
        ctx.fill()

        requestAnimationFrame(animateSheen)
      }
    }

    requestAnimationFrame(animateSheen)
  }, [])

  useEffect(() => {
    const canvas = sheenCanvasRef.current
    if (!canvas) return

    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      canvas.width = Math.round(rect.width)
      canvas.height = Math.round(rect.height)
    }

    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(canvas)
    return () => ro.disconnect()
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      // Calculate what the next index will be right before starting the animation
      const targetNext = (currentIndex + 1) % HERO_IMAGES.length
      setNextIndex(targetNext)
      
      setIsTransitioning(true)
      triggerSheen()

      setTimeout(() => {
        // Swap the base image underneath *after* the animation finishes
        setCurrentIndex(targetNext)
        setIsTransitioning(false)
      }, TRANSITION_MS)
    }, ROTATE_MS)

    return () => clearInterval(interval)
  }, [currentIndex, triggerSheen]) // Added currentIndex dependency to keep calculations precise

  return (
    <div
      className="relative shrink-0 w-[420px] max-w-full h-[315px] p-3 bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl overflow-hidden"
      aria-hidden="true"
    >
      {/* Dynamic Background Blur / Ambient Glow */}
      <aside className="absolute inset-3 z-0 overflow-hidden pointer-events-none brightness-95 opacity-30 blur-xl transition-all duration-1000">
        <img
          src={HERO_IMAGES[currentIndex]}
          alt=""
          className="w-full h-full object-cover scale-125"
        />
      </aside>

      {/* Main Framed Display */}
      <figure className="absolute inset-3 z-10 m-0 overflow-hidden shadow-md bg-stone-100">
        {/* Outgoing Image */}
        <img
          src={HERO_IMAGES[currentIndex]}
          alt=""
          className={`absolute inset-0 w-full h-full object-cover transition-all duration-800 ease-out ${
            isTransitioning ? 'opacity-0 scale-105 blur-[2px]' : 'opacity-100 scale-100'
          }`}
        />

        {/* Incoming Image */}
        <img
          src={HERO_IMAGES[nextIndex]}
          alt=""
          className={`absolute inset-0 w-full h-full object-cover transition-all duration-[800ms] ease-out ${
            isTransitioning ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-4'
          }`}
        />

        {/* Canvas Reflection Overlay Layer */}
        <canvas
          ref={sheenCanvasRef}
          className="absolute inset-0 w-full h-full pointer-events-none mix-blend-overlay z-20"
        />

        {/* Framing border overlay */}
        <span className="absolute inset-0 pointer-events-none border border-black/5 rounded-xl z-30" />
      </figure>
    </div>
  )
}