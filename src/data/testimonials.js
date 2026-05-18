/**
 * Fallback testimonials shown on the site.
 * Update this when you approve a new review from your Google Form / Sheet.
 *
 * Optional auto-sync: set VITE_TESTIMONIALS_JSON_URL to a Google Apps Script
 * web app URL that returns JSON (see docs in useTestimonials.js).
 */
export const TESTIMONIALS = [
  {
    id: '1',
    name: 'Client Name',
    business: 'Business Type',
    website: '',
    rating: 5,
    quote:
      'Framely made getting our website online so easy. Great communication and beautiful work!',
  },
]

/** Google Form for new reviews — set in .env as VITE_GOOGLE_REVIEW_FORM_URL */
export const GOOGLE_REVIEW_FORM_URL =
  import.meta.env.VITE_GOOGLE_REVIEW_FORM_URL || ''
