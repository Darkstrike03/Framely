import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import { X } from 'lucide-react'
import TemplatePeekViewport from '@/components/TemplatePeekViewport'
import { cn } from '@/lib/utils'

export function TemplateView({ open, onClose, image, name, tier }) {
  useEffect(() => {
    if (!open) return

    const onKeyDown = (e) => {
      if (e.key === 'Escape') onClose()
    }

    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKeyDown)

    return () => {
      document.body.style.overflow = prevOverflow
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [open, onClose])

  if (!open) return null

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="template-view-title"
    >
      <button
        type="button"
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
        aria-label="Close preview"
      />

      <div className="group/modal relative z-10 w-full max-w-2xl rounded-2xl border border-border bg-background p-4 shadow-2xl sm:p-5">
        <div className="mb-4 flex items-start justify-between gap-4">
          <div>
            <h2 id="template-view-title" className="font-display text-xl font-bold sm:text-2xl">
              {name}
            </h2>
            {tier && (
              <span
                className={cn(
                  'mt-2 inline-block rounded-full px-3 py-1 text-xs font-medium',
                  tier === 'Starter' ? 'bg-primary/10 text-primary' : 'bg-secondary text-secondary-foreground',
                )}
              >
                {tier}
              </span>
            )}
          </div>

          <button
            type="button"
            onClick={onClose}
            className="shrink-0 rounded-full border border-border bg-muted p-2 text-foreground transition-colors hover:bg-muted/80"
            aria-label="Close"
          >
            <X size={18} />
          </button>
        </div>

        <TemplatePeekViewport image={image} name={name} variant="modal" />
      </div>
    </div>,
    document.body,
  )
}
