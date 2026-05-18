import { useEffect, useState } from 'react'
import { TESTIMONIALS } from '@/data/testimonials'

const JSON_URL = import.meta.env.VITE_TESTIMONIALS_JSON_URL || ''

function normalizeRow(row) {
  const rating = Number(row.rating ?? row.Rating ?? row.stars ?? 5)
  const approved = row.approved ?? row.Approved ?? row.show_on_site
  const approvedOk =
    approved === true ||
    approved === 'TRUE' ||
    approved === 'yes' ||
    approved === 'Yes' ||
    approved === '1'

  if (JSON_URL && approved !== undefined && !approvedOk) return null

  const quote =
    row.quote ??
    row.review ??
    row.message ??
    row.Review ??
    row.Message ??
    row['Review / Message'] ??
    ''
  const name = row.name ?? row.client_name ?? row['Client Name'] ?? row.Name ?? 'Client'
  if (!quote?.trim()) return null

  return {
    id: String(row.id ?? row.timestamp ?? `${name}-${quote.slice(0, 20)}`),
    name: String(name).trim(),
    business: String(row.business ?? row.business_name ?? row['Business Name'] ?? '').trim(),
    website: String(row.website ?? row.website_url ?? row['Website Link'] ?? '').trim(),
    rating: Math.min(5, Math.max(1, Number.isFinite(rating) ? rating : 5)),
    quote: String(quote).trim(),
  }
}

export function useTestimonials() {
  const [items, setItems] = useState(TESTIMONIALS)
  const [loading, setLoading] = useState(Boolean(JSON_URL))
  const [source, setSource] = useState(JSON_URL ? 'sheet' : 'static')

  useEffect(() => {
    if (!JSON_URL) return

    let cancelled = false

    async function load() {
      try {
        const res = await fetch(JSON_URL)
        if (!res.ok) throw new Error('Failed to load reviews')
        const data = await res.json()
        const rows = Array.isArray(data) ? data : data.reviews ?? data.items ?? []
        const parsed = rows.map(normalizeRow).filter(Boolean)

        if (!cancelled && parsed.length > 0) {
          setItems(parsed.slice(0, 12))
          setSource('sheet')
        }
      } catch {
        if (!cancelled) {
          setItems(TESTIMONIALS)
          setSource('static')
        }
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    load()
    return () => {
      cancelled = true
    }
  }, [])

  return { testimonials: items, loading, source }
}
