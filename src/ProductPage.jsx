import { useEffect } from 'react'
import { useParams, Link, Navigate } from 'react-router-dom'
import { PRODUCTS, getProduct } from './products.js'
import { LetterReveal, useLATime, usePageZoom, Divider, LogoBookmark, HeaderIdentity, StickyNav } from './shared.jsx'

function getRelatedProducts(current) {
  const idx = PRODUCTS.findIndex((p) => p.slug === current.slug)
  const related = []
  for (let i = 1; i <= 3; i++) {
    related.push(PRODUCTS[(idx + i) % PRODUCTS.length])
  }
  return related
}

/* ── Product detail page — Figma node 90:1208 "Frame 8", the one product-
   detail template in the file. That template's hero/gallery image slots
   were unfilled placeholders in Figma (all four pointed at the same generic
   fallback asset), so this reuses each product's own grid image instead of
   inventing photography that isn't there.

   Y-coordinates below are Figma's own absolute values minus 126 (Figma's
   divider-at-86 + nav-height-40 = where content starts), since this layout
   places the hero image in normal flow right after the nav rather than
   reproducing Figma's ~16px nav/image overlap — avoids a z-index fight over
   nav-link clickability for a difference too small to notice. Everything
   else (category/title/lettering/gallery/description/footer positions,
   the translucent lettering color, font sizes) is Figma-exact. ── */
export default function ProductPage() {
  const { slug } = useParams()
  const product = getProduct(slug)
  const time = useLATime()
  usePageZoom()

  useEffect(() => {
    if (product) document.title = `${product.title} — Lloyd Jordano Wright`
  }, [product])

  if (!product) return <Navigate to="/" replace />

  const related = getRelatedProducts(product)

  return (
    <div
      className="page"
      style={{ fontFamily: '"neue-haas-unica", "Helvetica Neue", Arial, sans-serif', background: '#090909' }}
    >
      <LogoBookmark />

      <header style={{ paddingTop: 16, paddingLeft: 19, paddingRight: 134, paddingBottom: 20 }}>
        <HeaderIdentity time={time} />
      </header>

      <div style={{ height: 1, background: 'rgba(73,78,91,0.35)' }} />

      <StickyNav />

      {/* Content — one relative container, Figma-relative absolute children
          (see file header comment for the Y-offset translation). */}
      <div style={{ position: 'relative', height: 1270 }}>

        {/* Hero image — Figma "Rectangle 92", 966x445 at (435,110→0 here) */}
        <div style={{ position: 'absolute', left: 435, top: 0, width: 966, height: 445, overflow: 'hidden' }}>
          <img src={product.image} alt={product.title} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
        </div>

        {/* Category + title — same type treatment as the homepage hero */}
        <div style={{ position: 'absolute', zIndex: 60, left: 29, top: 29, maxWidth: 380 }}>
          <p style={{ fontSize: 16.376, color: '#494e5b', fontWeight: 400, letterSpacing: '0.07em' }}>{product.category}</p>
          <p style={{ fontSize: 43.887, color: '#e9efff', fontWeight: 400, lineHeight: 1.05, letterSpacing: '-0.015em' }}>{product.title}</p>
        </div>

        {/* Carousel dots — decorative, matches homepage's dot colors (no
            functional carousel on a static product page). */}
        <div style={{ position: 'absolute', zIndex: 65, left: 1336, top: 806, width: 74, height: 15 }}>
          <svg viewBox="0 0 74 15" width="100%" height="100%" fill="none">
            <circle cx="7.5" cy="7.5" r="7.5" fill="#494E5B" />
            <ellipse cx="37" cy="7.5" rx="8" ry="7.5" fill="#494E5B" />
            <circle cx="66.5" cy="7.5" r="7.5" fill="#3F9F53" />
          </svg>
        </div>

        {/* Large background lettering — Figma node 90:1234, translucent
            (rgba(233,239,255,0.25)) unlike the homepage hero's opaque
            version. Reuses the same scramble-reveal component. */}
        <div style={{ position: 'absolute', left: 0, top: 602, right: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 1 }}>
          <p style={{
            position: 'relative',
            fontFamily: '"eco", Georgia, serif',
            fontSize: 315.688, fontWeight: 400, color: 'rgba(233,239,255,0.25)',
            lineHeight: 1, whiteSpace: 'nowrap', margin: 0,
          }}>
            <LetterReveal key={product.slug} text={product.lettering} startDelay={150} spread={350} />
          </p>
        </div>

        {/* "More Projects" — Figma's own 3 gallery slots (Rectangle75/76/77)
            were unfilled placeholders; reused here as related-project links
            rather than repeating this product's own single image 3x. Widths/
            positions (including the left/right bleed past the viewport
            edges) are Figma-exact. */}
        <div style={{ position: 'absolute', left: -97, top: 491, width: 519, height: 292 }}>
          <RelatedTile product={related[0]} />
        </div>
        <div style={{ position: 'absolute', left: 460, top: 491, width: 520, height: 292 }}>
          <RelatedTile product={related[1]} />
        </div>
        <div style={{ position: 'absolute', left: 1018, top: 491, width: 519, height: 292 }}>
          <RelatedTile product={related[2]} />
        </div>

        <div style={{ position: 'absolute', left: 0, top: 875, width: 1440, height: 1, background: 'rgba(73,78,91,0.35)' }} />

        {/* Project description */}
        <p style={{ position: 'absolute', left: 39, top: 929, fontSize: 16.376, color: '#e9efff', fontWeight: 700, letterSpacing: '0.07em' }}>
          Project Description
        </p>
        <p style={{ position: 'absolute', left: 39, top: 974, width: 627, fontSize: 16.376, color: '#e9efff', fontWeight: 300, lineHeight: 1.65 }}>
          {product.description}
        </p>

        {/* Footer — same content/positions as the homepage footer */}
        <div style={{ position: 'absolute', left: 0, top: 1204, width: '100%' }}>
          <Divider />
          <div style={{ position: 'relative', height: 61 }}>
            <a href="mailto:jordano.wright07@gmail.com" className="contact-link" style={{ position: 'absolute', left: 55, top: 19, fontSize: 16.376, fontWeight: 400, textDecoration: 'none', whiteSpace: 'nowrap' }}>jordano.wright07@gmail.com</a>
            <a href="https://www.linkedin.com/in/lloyd-jordano-wright" target="_blank" rel="noreferrer" className="contact-link" style={{ position: 'absolute', left: 280, top: 19, fontSize: 16.376, fontWeight: 400, textDecoration: 'none', whiteSpace: 'nowrap' }}>LinkedIn</a>
            <a href="https://instagram.com/jordano.wright" target="_blank" rel="noreferrer" className="contact-link" style={{ position: 'absolute', left: 358, top: 19, fontSize: 16.376, fontWeight: 400, textDecoration: 'none', whiteSpace: 'nowrap' }}>Instagram</a>
            <a href="#" style={{ position: 'absolute', left: 1163, top: 19, fontSize: 16.376, color: '#494e5b', fontWeight: 400, textDecoration: 'none', whiteSpace: 'nowrap' }}>Privacy Policy</a>
            <span style={{ position: 'absolute', left: 1290, top: 19, fontSize: 16.376, color: '#494e5b', fontWeight: 400, whiteSpace: 'nowrap' }}>© 2025-2026 LJW</span>
          </div>
        </div>
      </div>
    </div>
  )
}

function RelatedTile({ product }) {
  return (
    <Link
      to={`/projects/${product.slug}`}
      className="cell-project"
      style={{ position: 'absolute', inset: 0, display: 'block' }}
    >
      <img src={product.image} alt="" className="cell-img" />
      <div className="cell-overlay">
        <span style={{ fontSize: 11, color: '#e9efff', fontWeight: 400, letterSpacing: '0.1em', opacity: 0.6 }}>{product.category}</span>
        <span style={{ fontSize: 22, color: '#e9efff', fontWeight: 400 }}>{product.title}</span>
      </div>
    </Link>
  )
}
