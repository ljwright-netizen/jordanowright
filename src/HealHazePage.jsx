import { useEffect } from 'react'
import { A } from './assets.js'
import { LetterReveal, useLATime, usePageZoom, Divider, LogoBookmark, HeaderIdentity, StickyNav, DESCRIPTION_TEXT_STYLE } from './shared.jsx'

/* ── HealHaze product page — Figma node 334:2 "Healhaze Page", pulled
   directly via MCP. Same header/nav/no-tagline structure as the other
   product pages: divider at Figma y=90, nav 40px tall, content below
   offset by figmaY - 130.

   The quote/description text (370:955) already includes its own
   quotation marks in the Figma content, and reuses DESCRIPTION_TEXT_STYLE
   (shared.jsx) — the same treatment established on the Transfit and
   EcoCenter pages — rather than redeclaring the same font values here. ── */

const LETTER_COLUMN = [
  { ch: 'H', top: 89 },
  { ch: 'E', top: 269.6 },
  { ch: 'A', top: 445.82 },
  { ch: 'L', top: 622.04 },
  { ch: 'H', top: 798.26 },
  { ch: 'A', top: 974.48 },
  { ch: 'Z', top: 1150.7 },
  { ch: 'E', top: 1331.5 },
]
const LETTER_FONT_SIZE = 274.21
const LETTER_LEFT = 1219

const HEADER_HEIGHT = 130 // divider(90) + nav(40), matches Figma exactly
const FRAME_HEIGHT = 1631
const CONTENT_HEIGHT = FRAME_HEIGHT - HEADER_HEIGHT

export default function HealHazePage() {
  const time = useLATime()
  usePageZoom()

  useEffect(() => {
    document.title = 'HealHaze — Lloyd Jordano Wright'
  }, [])

  return (
    <div
      className="page"
      style={{ position: 'relative', fontFamily: '"neue-haas-unica", "Helvetica Neue", Arial, sans-serif', background: '#090909' }}
    >
      {/* Giant vertical "HEALHAZE" lettering — decorative background column,
          raw Figma coordinates (this layer's origin = page top, y=0).
          Reuses the same scramble-reveal component as the homepage/
          Transfit/EcoCenter pages, cascading down the page as each letter
          locks in. */}
      <div style={{ position: 'absolute', inset: 0, height: FRAME_HEIGHT, overflow: 'hidden', pointerEvents: 'none' }}>
        {LETTER_COLUMN.map(({ ch, top }, i) => (
          <div key={i} style={{ position: 'absolute', left: LETTER_LEFT, top }}>
            <LetterReveal
              text={ch}
              startDelay={200 + i * 150}
              spread={80}
              style={{
                fontFamily: '"eco", Georgia, serif',
                fontSize: LETTER_FONT_SIZE, fontWeight: 400, color: '#494e5b',
                lineHeight: 1, letterSpacing: -LETTER_FONT_SIZE * 0.01, whiteSpace: 'nowrap',
              }}
            />
          </div>
        ))}
      </div>

      <LogoBookmark />

      <header style={{ position: 'relative', height: 90, paddingTop: 16, paddingLeft: 19, paddingRight: 134 }}>
        <HeaderIdentity time={time} />
      </header>

      <div style={{ height: 1, background: 'rgba(73,78,91,0.35)' }} />

      <StickyNav />

      {/* Page-specific content, offset from Figma's absolute Y by -130 */}
      <div style={{ position: 'relative', height: CONTENT_HEIGHT }}>

        {/* Category + title */}
        <div style={{ position: 'absolute', left: 29, top: 27 }}>
          <p style={{ margin: 0, fontSize: 16.376, color: '#494e5b', fontWeight: 400, letterSpacing: '0.07em' }}>Branding &amp; Product Design</p>
        </div>
        <div style={{ position: 'absolute', left: 29, top: 50, fontSize: 43.887, color: '#e9efff', fontWeight: 400, lineHeight: 1.05, letterSpacing: '-0.015em' }}>
          <span style={{ display: 'block' }}>HealHaze</span>
          <span style={{ display: 'block' }}>Vitamin Cocktails</span>
        </div>

        {/* Description — Figma's own text already includes quotation marks */}
        <p style={{ position: 'absolute', left: 29, top: 228, width: 1149, margin: 0, ...DESCRIPTION_TEXT_STYLE }}>
          &ldquo;Brand identity and product design for a wellness startup, centered on a nebulizing humidifier with an IV-bag-inspired reservoir for respiratory vitamin delivery.&rdquo;
        </p>

        {/* Two poster renders, side by side */}
        <img
          src={A.healhazePosterBlue}
          alt="HealHaze poster, blue sky background"
          style={{ position: 'absolute', left: 29, top: 342, width: 564.188, height: 1003, objectFit: 'cover', display: 'block' }}
        />
        <img
          src={A.healhazePosterGray}
          alt="HealHaze poster, gray background"
          style={{ position: 'absolute', left: 614.21, top: 342, width: 564.188, height: 1003, objectFit: 'cover', display: 'block' }}
        />

        {/* Footer */}
        <div style={{ position: 'absolute', left: 0, top: 1442, width: '100%' }}>
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
