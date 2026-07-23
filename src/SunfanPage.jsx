import { useEffect } from 'react'
import { A } from './assets.js'
import { LetterReveal, useLATime, usePageZoom, Divider, LogoBookmark, HeaderIdentity, StickyNav, DESCRIPTION_TEXT_STYLE } from './shared.jsx'

/* ── Sunfan product page — Figma node 322:1515 "Sunfan Page", pulled
   directly via MCP. Same header/nav/no-tagline structure as the other
   product pages: divider at Figma y=90, nav 40px tall, content below
   offset by figmaY - 130.

   The description text (370:952) already includes its own quotation marks
   in the Figma content, and reuses DESCRIPTION_TEXT_STYLE (shared.jsx) —
   the same treatment established on the Transfit/EcoCenter/HealHaze
   pages — rather than redeclaring the same font values here.

   Title top is Figma's 170 minus the 130 header offset (=40), plus an
   explicit +10px per request. ── */

const LETTER_COLUMN = [
  { ch: 'S', top: 83,     fontSize: 270.016 },
  { ch: 'U', top: 256.91, fontSize: 270.016 },
  { ch: 'N', top: 432.83, fontSize: 270.016 },
  { ch: 'f', top: 600.98, fontSize: 318.966 },
  { ch: 'A', top: 814.22, fontSize: 270.016 },
  { ch: 'n', top: 991.19, fontSize: 270.016 },
]
const LETTER_LEFT = 1226

const HEADER_HEIGHT = 130 // divider(90) + nav(40), matches Figma exactly
const FRAME_HEIGHT = 1335
const CONTENT_HEIGHT = FRAME_HEIGHT - HEADER_HEIGHT

export default function SunfanPage() {
  const time = useLATime()
  usePageZoom()

  useEffect(() => {
    document.title = 'Wall Sconce — Lloyd Jordano Wright'
  }, [])

  return (
    <div
      className="page"
      style={{ position: 'relative', fontFamily: '"neue-haas-unica", "Helvetica Neue", Arial, sans-serif', background: '#090909' }}
    >
      {/* Giant vertical "SUNfAn" lettering — decorative background column,
          raw Figma coordinates (this layer's origin = page top, y=0).
          Reuses the same scramble-reveal component as the homepage/other
          product pages, cascading down the page as each letter locks in. */}
      <div style={{ position: 'absolute', inset: 0, height: FRAME_HEIGHT, overflow: 'hidden', pointerEvents: 'none' }}>
        {LETTER_COLUMN.map(({ ch, top, fontSize }, i) => (
          <div key={i} style={{ position: 'absolute', left: LETTER_LEFT, top }}>
            <LetterReveal
              text={ch}
              startDelay={200 + i * 150}
              spread={80}
              style={{
                fontFamily: '"eco", Georgia, serif',
                fontSize, fontWeight: 400, color: '#494e5b',
                lineHeight: 1, letterSpacing: -fontSize * 0.01, whiteSpace: 'nowrap',
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
        <div style={{ position: 'absolute', left: 29, top: 24 }}>
          <p style={{ margin: 0, fontSize: 16.376, color: '#494e5b', fontWeight: 400, letterSpacing: '0.07em' }}>Industrial Design</p>
        </div>
        <p style={{ position: 'absolute', left: 29, top: 50, margin: 0, fontSize: 43.887, color: '#e9efff', fontWeight: 400, lineHeight: 1.05, letterSpacing: '-0.015em' }}>
          Wall Sconce
        </p>

        {/* Description — narrow column, Figma's own text already includes
            quotation marks */}
        <p style={{ position: 'absolute', left: 29, top: 146, width: 267, margin: 0, ...DESCRIPTION_TEXT_STYLE }}>
          &ldquo;Wall sconce built on traditional Filipino fiber-weaving techniques, radial abaca cordage hand-wound in concentric rings to mimic the intensity of the Philippine sun, designed for the high-glare, high-humidity conditions of beachfront resorts.&rdquo;
        </p>

        {/* Main room photo — the downloaded export is already rendered at
            this node's own box dimensions (its aspect ratio matches the
            811x1048.348 box exactly), so it's already cropped correctly;
            no extra percentage transform needed on top of it. */}
        <img
          src={A.sunfanRoom}
          alt="Wall sconce installed in a room"
          style={{ position: 'absolute', left: 360, top: 31, width: 811, height: 1048.348, objectFit: 'cover', display: 'block' }}
        />

        {/* Sconce detail photo — same reasoning: export is already cropped
            to the 323.822x308 box's exact aspect ratio. */}
        <img
          src={A.sunfanSconceDetail}
          alt="Wall sconce detail"
          style={{ position: 'absolute', left: 6, top: 756, width: 323.822, height: 308, objectFit: 'cover', display: 'block' }}
        />

        {/* Footer */}
        <div style={{ position: 'absolute', left: 0, top: 1146, width: '100%' }}>
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
