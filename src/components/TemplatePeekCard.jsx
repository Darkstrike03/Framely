import { useState } from 'react'
import { Link } from 'react-router-dom'
import TemplatePeekViewport from '@/components/TemplatePeekViewport'
import { TemplateView } from '@/components/ui/template-view'
import { Button } from '@/components/ui/button'

export default function TemplatePeekCard({ image, name, tier, className = '' }) {
  const [open, setOpen] = useState(false)

  const bookHref = `/contact?template=${encodeURIComponent(name)}`

  return (
    <>
      <article className={`w-full ${className}`}>
        <div
          className="group/card cursor-pointer"
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
        </div>

        <div className="mt-3 flex items-center justify-between gap-2">
          <h3 className="font-display text-lg font-semibold leading-tight">{name}</h3>
          <div className="flex shrink-0 items-center gap-2">
            <span
              className={`rounded-full px-3 py-1 text-xs font-medium ${
                tier === 'Starter' ? 'bg-primary/10 text-primary' : 'bg-secondary text-secondary-foreground'
              }`}
            >
              {tier}
            </span>
            <Button
              asChild
              size="sm"
              className="bg-primary text-primary-foreground hover:bg-primary/90 h-8 px-3 text-xs font-semibold"
            >
              <Link to={bookHref}>Book</Link>
            </Button>
          </div>
        </div>
      </article>

      <TemplateView
        open={open}
        onClose={() => setOpen(false)}
        image={image}
        name={name}
        tier={tier}
        bookHref={bookHref}
      />
    </>
  )
}
