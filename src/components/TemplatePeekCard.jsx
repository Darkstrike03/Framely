import { useState } from 'react'
import TemplatePeekViewport from '@/components/TemplatePeekViewport'
import { TemplateView } from '@/components/ui/template-view'

export default function TemplatePeekCard({ image, name, tier, className = '' }) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <article
        className={`group/card w-full cursor-pointer ${className}`}
        onClick={() => setOpen(true)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            setOpen(true)
          }
        }}
        role="button"
        tabIndex={0}
        aria-label={`View ${name} template preview`}
      >
        <TemplatePeekViewport image={image} name={name} variant="card" />

        <div className="mt-3 flex items-center justify-between gap-2">
          <h3 className="font-display text-lg font-semibold leading-tight">{name}</h3>
          <span
            className={`shrink-0 rounded-full px-3 py-1 text-xs font-medium ${
              tier === 'Starter' ? 'bg-primary/10 text-primary' : 'bg-secondary text-secondary-foreground'
            }`}
          >
            {tier}
          </span>
        </div>
      </article>

      <TemplateView
        open={open}
        onClose={() => setOpen(false)}
        image={image}
        name={name}
        tier={tier}
      />
    </>
  )
}
