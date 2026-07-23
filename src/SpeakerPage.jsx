import { useEffect } from 'react'
import { A } from './assets.js'
import { LetterReveal, useLATime, usePageZoom, Divider, LogoBookmark, HeaderIdentity, StickyNav, DESCRIPTION_TEXT_STYLE } from './shared.jsx'

/* ── Modular Speaker product page — Figma node 334:378 "Speaker Page",
   pulled directly via MCP. Same header/nav/no-tagline structure as the
   other product pages: divider at Figma y=90, nav 40px tall, content below
   offset by figmaY - 130.

   Two description blocks pair a short italic lead-in with a bold quote
   (same two-part construct as the Banana Grip page); both reuse
   DESCRIPTION_TEXT_STYLE (shared.jsx) with the lead-in additionally
   italicized. Quotation marks are already part of the Figma text content.

   Node 346:690 (the glowing modular-speaker photo) has a 90deg rotation
   applied in Figma as a layer transform, not baked into the source pixels
   — get_design_context returns the un-rotated 850x1232.813 portrait
   export, so the CSS reproduces Figma's own node structure: an outer
   1232.813x850 box (left=-50, top=1148-130=1018) centering an inner
   850x1232.813 wrapper that's rotated 90deg to become the landscape
   footprint. ── */

const LETTER_COLUMN = [
  { ch: 'S', top: 90 },
  { ch: 'P', top: 296.45 },
  { ch: 'E', top: 503.22 },
  { ch: 'A', top: 704.68 },
  { ch: 'K', top: 905.81 },
  { ch: 'E', top: 1114 },
  { ch: 'R', top: 1315 },
]
const LETTER_FONT_SIZE = 312.771
const LETTER_LEFT = 1183

const HEADER_HEIGHT = 130 // divider(90) + nav(40), matches Figma exactly
const FRAME_HEIGHT = 3237
const CONTENT_HEIGHT = FRAME_HEIGHT - HEADER_HEIGHT

export default function SpeakerPage() {
  const time = useLATime()
  usePageZoom()

  useEffect(() => {
    document.title = 'Speaker — Lloyd Jordano Wright'
  }, [])

  return (
    <div
      className="page"
      style={{ position: 'relative', fontFamily: '"neue-haas-unica", "Helvetica Neue", Arial, sans-serif', background: '#090909' }}
    >
      {/* Giant vertical "SPEAKER" lettering — decorative background column,
          raw Figma coordinates (this layer's origin = page top, y=0).
          Reuses the same scramble-reveal component as the homepage/other
          product pages, cascading down the page as each letter locks in. */}
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
        <div style={{ position: 'absolute', left: 29, top: 24 }}>
          <p style={{ margin: 0, fontSize: 16.376, color: '#494e5b', fontWeight: 400, letterSpacing: '0.07em' }}>Industrial Design</p>
        </div>
        <p style={{ position: 'absolute', left: 29, top: 50, margin: 0, fontSize: 43.887, color: '#e9efff', fontWeight: 400, lineHeight: 1.05, letterSpacing: '-0.015em' }}>
          Speaker
        </p>

        {/* Main hero product photo — intentionally bleeds off the left
            edge (Figma positions it at x=-27) */}
        <img
          src={A.speakerHero}
          alt="Modular speaker"
          style={{ position: 'absolute', left: -27, top: 24, width: 835, height: 1085, objectFit: 'cover', display: 'block' }}
        />

        {/* Description 1 — right-aligned per Figma, sits beside the hero
            photo near the lettering column. Re-pulled from Figma: this
            block was repositioned from y=823 to y=577 since the page was
            first built. */}
        <p style={{ position: 'absolute', left: 666, top: 447, width: 413, margin: 0, textAlign: 'right', ...DESCRIPTION_TEXT_STYLE }}>
          <span style={{ fontStyle: 'italic' }}>One system, every setting.</span>
          <br />
          &ldquo;Four detachable units connect into one speaker or split apart, compact for portability, full-sized for a room. The circular housing rests stably on any side.&rdquo;
        </p>

        {/* Modular speaker glow photo — Figma rotates this layer 90deg.
            The export itself is the un-rotated source (850x1232.813
            portrait, confirmed via get_design_context), so the rotation
            is applied here via CSS on a portrait-sized wrapper, matching
            Figma's own node structure: outer box centers the rotated
            wrapper, which becomes the 1232.813x850 landscape footprint. */}
        <div style={{ position: 'absolute', left: -50, top: 1018, width: 1232.813, height: 850, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
          <div style={{ width: 850, height: 1232.813, flexShrink: 0, transform: 'rotate(90deg)' }}>
            <img
              src={A.speakerModular}
              alt="Modular speaker, assembled configuration"
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            />
          </div>
        </div>

        {/* Description 2 */}
        <p style={{ position: 'absolute', left: 181, top: 2034, width: 413, margin: 0, ...DESCRIPTION_TEXT_STYLE }}>
          <span style={{ fontStyle: 'italic' }}>Built to adapt.</span>
          <br />
          &ldquo;Intuitive docking make the modular speaker easy to configure for any setting, shaped by testing across beach trips, room setups, and parties.&rdquo;
        </p>

        {/* Bottom product photo */}
        <img
          src={A.speakerBottom}
          alt="Modular speaker, detail view"
          style={{ position: 'absolute', left: 358, top: 1818, width: 1157, height: 1245, objectFit: 'cover', display: 'block' }}
        />

        {/* Footer */}
        <div style={{ position: 'absolute', left: 0, top: 3044, width: '100%' }}>
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
