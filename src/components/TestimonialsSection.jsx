import { ExternalLink, Star } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { GOOGLE_REVIEW_FORM_URL } from '@/data/testimonials'
import { useTestimonials } from '@/hooks/useTestimonials'

function StarRating({ rating }) {
  return (
    <div className="mb-4 flex" aria-label={`${rating} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          size={16}
          className={
            star <= rating ? 'fill-yellow-400 text-yellow-400' : 'fill-muted text-muted-foreground/30'
          }
        />
      ))}
    </div>
  )
}

export default function TestimonialsSection() {
  const { testimonials, loading } = useTestimonials()
  const hasForm = Boolean(GOOGLE_REVIEW_FORM_URL)

  return (
    <section className="py-20 md:py-32 bg-background">
      <div className="container">
        <div className="mb-12 text-center">
          <h2 className="font-display text-4xl font-bold md:text-5xl">What Our Clients Say</h2>
          <p className="mx-auto mt-4 max-w-xl text-foreground/70">
            Real feedback from businesses we&apos;ve helped get online.
          </p>
          {hasForm && (
            <a
              href={GOOGLE_REVIEW_FORM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-block"
            >
              <Button
                variant="outline"
                className="border-primary text-primary hover:bg-primary/5"
              >
                Rate Us
                <ExternalLink size={16} className="ml-2" />
              </Button>
            </a>
          )}
          {!hasForm && (
            <p className="mt-4 text-sm text-foreground/50">
              Add <code className="rounded bg-muted px-1">VITE_GOOGLE_REVIEW_FORM_URL</code> in your .env to
              enable the review form link.
            </p>
          )}
        </div>

        {loading ? (
          <p className="text-center text-foreground/60">Loading reviews…</p>
        ) : (
          <div className="grid gap-8 md:grid-cols-3">
            {testimonials.map((t) => (
              <article
                key={t.id}
                className="rounded-lg border border-border bg-white p-8 transition-shadow hover:shadow-lg"
              >
                <StarRating rating={t.rating} />
                <p className="mb-4 italic text-foreground/70">&ldquo;{t.quote}&rdquo;</p>
                <p className="font-display font-semibold">— {t.name}</p>
                {t.business && (
                  <p className="text-sm text-foreground/50">{t.business}</p>
                )}
                {t.website && (
                  <a
                    href={t.website.startsWith('http') ? t.website : `https://${t.website}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-block text-sm text-primary hover:underline"
                  >
                    Visit website
                  </a>
                )}
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
