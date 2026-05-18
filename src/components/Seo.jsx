import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { SITE, SITE_URL, absoluteUrl, getOrganizationSchema, getRouteSeo } from '@/lib/seo'

const JSON_LD_ID = 'framely-jsonld'

function upsertMeta(attr, key, content) {
  if (!content) return
  let el = document.querySelector(`meta[${attr}="${key}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

function upsertLink(rel, href) {
  if (!href) return
  let el = document.querySelector(`link[rel="${rel}"]`)
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', rel)
    document.head.appendChild(el)
  }
  el.setAttribute('href', href)
}

export default function Seo() {
  const { pathname } = useLocation()
  const { title, description } = getRouteSeo(pathname)
  const canonical = absoluteUrl(pathname === '/' ? '/' : pathname)
  const ogImage = absoluteUrl(SITE.ogImage)

  useEffect(() => {
    document.title = title
    document.documentElement.lang = 'en'

    upsertMeta('name', 'description', description)
    upsertMeta('name', 'author', SITE.name)
    upsertMeta('name', 'robots', 'index, follow, max-image-preview:large')
    upsertMeta('name', 'googlebot', 'index, follow')
    upsertMeta('name', 'geo.region', 'IN')
    upsertMeta('name', 'geo.placename', SITE.region)
    upsertMeta('name', 'language', SITE.language)
    upsertMeta('name', 'content-language', SITE.language)
    upsertMeta('name', 'theme-color', SITE.themeColor)

    upsertLink('canonical', canonical)

    upsertMeta('property', 'og:type', 'website')
    upsertMeta('property', 'og:site_name', SITE.name)
    upsertMeta('property', 'og:title', title)
    upsertMeta('property', 'og:description', description)
    upsertMeta('property', 'og:url', canonical)
    upsertMeta('property', 'og:image', ogImage)
    upsertMeta('property', 'og:locale', SITE.locale)

    upsertMeta('name', 'twitter:card', 'summary_large_image')
    upsertMeta('name', 'twitter:title', title)
    upsertMeta('name', 'twitter:description', description)
    upsertMeta('name', 'twitter:image', ogImage)

    let script = document.getElementById(JSON_LD_ID)
    if (!script) {
      script = document.createElement('script')
      script.id = JSON_LD_ID
      script.type = 'application/ld+json'
      document.head.appendChild(script)
    }
    script.textContent = JSON.stringify(getOrganizationSchema())
  }, [title, description, canonical, ogImage, pathname])

  return null
}
