import { useCallback, useEffect, useRef, useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'

const VARIANTS = {
  card: {
    container:
      'relative aspect-16/10 w-full overflow-hidden rounded-xl border border-border bg-stone-900 shadow-sm transition-shadow group-hover/card:shadow-lg',
    imgHover:
      'md:transition-transform md:duration-[4s] md:ease-in-out md:group-hover/card:-translate-y-[var(--peek-scroll)]',
    hint: 'md:opacity-0 md:transition-opacity md:group-hover/card:opacity-100',
  },
  modal: {
    container:
      'relative aspect-16/10 w-full overflow-hidden rounded-xl border border-border bg-stone-900 shadow-md',
    imgHover:
      'md:transition-transform md:duration-[4s] md:ease-in-out md:group-hover/modal:-translate-y-[var(--peek-scroll)]',
    hint: 'md:opacity-100',
  },
}

export default function TemplatePeekViewport({ image, name, variant = 'card', className }) {
  const styles = VARIANTS[variant] ?? VARIANTS.card
  const containerRef = useRef(null)
  const imgRef = useRef(null)
  const [scrollMax, setScrollMax] = useState(0)

  const measure = useCallback(() => {
    const container = containerRef.current
    const img = imgRef.current
    if (!container || !img) return

    const extra = img.offsetHeight - container.clientHeight
    setScrollMax(extra > 24 ? Math.round(extra) : 0)
  }, [])

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(container)
    return () => ro.disconnect()
  }, [measure, image])

  const canScroll = scrollMax > 0

  return (
    <div
      ref={containerRef}
      className={cn(styles.container, className)}
      style={{ '--peek-scroll': `${scrollMax}px` }}
    >
      <div
        className={cn(
          'template-peek-scroll absolute inset-0 overscroll-contain scrollbar-none [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden',
          canScroll ? 'overflow-y-auto md:overflow-hidden' : 'overflow-hidden',
        )}
      >
        <img
          ref={imgRef}
          src={image}
          alt={`${name} template preview`}
          className={cn('block w-full h-auto', canScroll && styles.imgHover)}
          loading={variant === 'modal' ? 'eager' : 'lazy'}
          decoding="async"
          draggable={false}
          onLoad={measure}
        />
      </div>

      <div
        className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-b from-white/5 via-transparent to-black/25"
        aria-hidden="true"
      />

      {canScroll && (
        <>
          <div
            className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-12 bg-gradient-to-t from-black/45 to-transparent"
            aria-hidden="true"
          />
          <div
            className={cn(
              'pointer-events-none absolute bottom-2 left-1/2 z-20 flex -translate-x-1/2 items-center gap-1 rounded-full bg-black/45 px-2.5 py-1 text-[10px] font-medium text-white/90 backdrop-blur-sm',
              styles.hint,
            )}
          >
            <ChevronDown size={12} className="max-md:animate-bounce" />
            <span className="max-md:hidden">Hover to explore</span>
            <span className="md:hidden">Scroll to explore</span>
          </div>
        </>
      )}
    </div>
  )
}
