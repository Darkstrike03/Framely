export const SITE_URL = import.meta.env.VITE_SITE_URL || 'https://framely.in'

export const SITE = {
  name: 'Framely',
  legalName: 'Framely',
  tagline: 'Professional websites for Indian small businesses',
  description:
    'Framely builds fast, mobile-first websites for cafes, clinics, salons, and small businesses across India — without the corporate price tag. Starting at ₹5,999.',
  email: 'hello@framely.in',
  locale: 'en_IN',
  language: 'en-IN',
  country: 'IN',
  region: 'India',
  themeColor: '#2D5016',
  ogImage: '/ogImage.webp',
}

export const ROUTE_SEO = {
  '/': {
    title: 'Framely — Professional Websites for Indian Small Businesses',
    description: SITE.description,
  },
  '/services': {
    title: 'Services & Pricing — Framely',
    description:
      'Template and custom website packages for Indian small businesses. Transparent pricing from ₹5,999 with fast delivery and ongoing support.',
  },
  '/templates': {
    title: 'Website Templates — Framely',
    description:
      'Browse ready-made website templates for cafes, clinics, salons, and local businesses in India. Customized and launched quickly.',
  },
  '/about': {
    title: 'About Us — Framely',
    description:
      'Framely helps Indian small businesses get online with honest pricing and local context. Learn our story and why we focus on India.',
  },
  '/contact': {
    title: 'Contact — Framely',
    description:
      'Get a free quote for your business website. Reach Framely by form, email, or WhatsApp — we serve businesses across India.',
  },
  '/policy': {
    title: 'Terms & Policies — Framely',
    description: 'Terms of service, revision policy, payments, and project guidelines for Framely website clients.',
  },
}

export function getRouteSeo(pathname) {
  return ROUTE_SEO[pathname] ?? ROUTE_SEO['/']
}

export function absoluteUrl(path = '') {
  const base = SITE_URL.replace(/\/$/, '')
  const p = path.startsWith('/') ? path : `/${path}`
  return `${base}${p}`
}

export function getOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': `${SITE_URL}/#organization`,
        name: SITE.name,
        url: SITE_URL,
        email: SITE.email,
        logo: absoluteUrl('/favicon.svg'),
        description: SITE.description,
        areaServed: {
          '@type': 'Country',
          name: SITE.region,
        },
      },
      {
        '@type': 'WebSite',
        '@id': `${SITE_URL}/#website`,
        url: SITE_URL,
        name: SITE.name,
        description: SITE.description,
        publisher: { '@id': `${SITE_URL}/#organization` },
        inLanguage: SITE.language,
      },
      {
        '@type': 'ProfessionalService',
        '@id': `${SITE_URL}/#business`,
        name: SITE.name,
        url: SITE_URL,
        email: SITE.email,
        image: absoluteUrl(SITE.ogImage),
        description: SITE.description,
        priceRange: '₹₹',
        areaServed: {
          '@type': 'Country',
          name: SITE.region,
        },
        address: {
          '@type': 'PostalAddress',
          addressCountry: SITE.country,
        },
        serviceType: [
          'Website design',
          'Website development',
          'Small business websites',
          'Website maintenance',
        ],
      },
    ],
  }
}
