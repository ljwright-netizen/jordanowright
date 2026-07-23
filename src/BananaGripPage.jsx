import { useEffect } from 'react'
import { A } from './assets.js'
import { LetterReveal, useLATime, usePageZoom, Divider, LogoBookmark, HeaderIdentity, StickyNav, DESCRIPTION_TEXT_STYLE } from './shared.jsx'

/* ── Non-Slip Banana Grip product page — Figma node 334:190 "Nonslip Page",
   pulled directly via MCP. Same header/nav/no-tagline structure as the
   other product pages: divider at Figma y=90, nav 40px tall, content below
   offset by figmaY - 130.

   Three description blocks each pair a short italic lead-in phrase with a
   quoted body sentence (Figma: lead-in is Italic, quote is Bold) — a
   two-part construct distinct from the single-block quotes on the other
   product pages. Both parts reuse DESCRIPTION_TEXT_STYLE (shared.jsx, the
   size/weight/line-height/color already established on Transfit/EcoCenter/
   HealHaze/Sunfan), with the lead-in additionally set to italic to
   preserve that structural distinction from Figma — quotation marks are
   already part of the Figma text content, kept as-is.

   Node 356:872 is a secondary product shot that Figma rotates 180deg and
   flips vertically in its own layer transform (net effect: a horizontal
   mirror of the source photo). Now that the source has had its background
   removed in Figma, get_screenshot on this node was used to pull the
   already-cropped, already-mirrored 415x594 render directly — bypassing
   the crop-percentage ambiguity get_design_context has for transformed
   fills — so the asset here needs no CSS transform or object-fit crop,
   just placement at its exact Figma box (left:0, top:238 raw-368 minus
   the 130px header offset). It sits on top of the main hero image where
   they overlap (later in Figma's paint order). ── */

const LETTER_COLUMN = [
  { ch: 'N', top: 83,     fontSize: 377.452 },
  { ch: 'O', top: 331.73, fontSize: 377.452 },
  { ch: 'N', top: 573.07, fontSize: 377.452 },
  { ch: 'S', top: 804.94, fontSize: 445.878 },
  { ch: 'L', top: 997.8,  fontSize: 377.452 },
  { ch: 'I', top: 1238.73, fontSize: 377.452 },
  { ch: 'P', top: 1487.02, fontSize: 377.452 },
]
const LETTER_LEFT = 1147

const HEADER_HEIGHT = 130 // divider(90) + nav(40), matches Figma exactly
const FRAME_HEIGHT = 4824
const CONTENT_HEIGHT = FRAME_HEIGHT - HEADER_HEIGHT

export default function BananaGripPage() {
  const time = useLATime()
  usePageZoom()

  useEffect(() => {
    document.title = 'Non Slip Banana Grip — Lloyd Jordano Wright'
  }, [])

  return (
    <div
      className="page"
      style={{ position: 'relative', fontFamily: '"neue-haas-unica", "Helvetica Neue", Arial, sans-serif', background: '#090909' }}
    >
      {/* Giant vertical "NONSLIP" lettering — decorative background column,
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
          <p style={{ margin: 0, fontSize: 16.376, color: '#494e5b', fontWeight: 400, letterSpacing: '0.07em' }}>Product Design</p>
        </div>
        <div style={{ position: 'absolute', left: 29, top: 50, fontSize: 43.887, color: '#e9efff', fontWeight: 400, lineHeight: 1.05, letterSpacing: '-0.015em' }}>
          <span style={{ display: 'block' }}>Non Slip</span>
          <span style={{ display: 'block' }}>Banana Grip</span>
        </div>

        {/* Main hero product photo */}
        <img
          src={A.bananagripHero}
          alt="Non-Slip Banana Grip"
          style={{ position: 'absolute', left: 461, top: 20, width: 623, height: 882, objectFit: 'cover', display: 'block' }}
        />

        {/* Secondary shot — overlaps on top of the hero photo (matches
            Figma's own paint order). Pre-cropped/mirrored export, see file
            header comment. */}
        <img
          src={A.bananagripOverlay}
          alt="Non-Slip Banana Grip, alternate view"
          style={{ position: 'absolute', left: 0, top: 238, width: 415, height: 594, objectFit: 'cover', display: 'block' }}
        />

        {/* Two side-by-side detail photos */}
        <img
          src={A.bananagripSideA}
          alt="Non-Slip Banana Grip detail"
          style={{ position: 'absolute', left: 25, top: 919, width: 520, height: 735, objectFit: 'cover', display: 'block' }}
        />
        <img
          src={A.bananagripSideB}
          alt="Non-Slip Banana Grip detail"
          style={{ position: 'absolute', left: 564, top: 919, width: 520, height: 735, objectFit: 'cover', display: 'block' }}
        />

        {/* Description 1 */}
        <p style={{ position: 'absolute', left: 23, top: 1694, width: 1340, margin: 0, ...DESCRIPTION_TEXT_STYLE }}>
          <span style={{ fontStyle: 'italic' }}>Simple is beautiful.</span>
          <br />
          &ldquo;Ergonomic design and intuitive functionality make the Banana Grip easy to adapt to any user. Extensive testing across uneven, wet terrain informed the grip&apos;s shape, size, and material choice.&rdquo;
        </p>

        {/* Full-width screenshot 1 */}
        <img
          src={A.bananagripScreenshot1}
          alt="Non-Slip Banana Grip renders"
          style={{ position: 'absolute', left: 23, top: 1854, width: 1367, height: 769, objectFit: 'cover', display: 'block' }}
        />

        {/* Full-width screenshot 2 */}
        <img
          src={A.bananagripScreenshot2}
          alt="Non-Slip Banana Grip renders"
          style={{ position: 'absolute', left: 22, top: 2645, width: 1368, height: 811, objectFit: 'cover', display: 'block' }}
        />

        {/* Description 2 */}
        <p style={{ position: 'absolute', left: 23, top: 3490, width: 1340, margin: 0, ...DESCRIPTION_TEXT_STYLE }}>
          <span style={{ fontStyle: 'italic' }}>One grip, any umbrella</span>
          <br />
          &ldquo;A universal top attachment lets the same grip fit multiple umbrella types, so users aren&apos;t locked into a single design.&rdquo;
        </p>

        {/* Full-width screenshot 3 */}
        <img
          src={A.bananagripScreenshot3}
          alt="Non-Slip Banana Grip renders"
          style={{ position: 'absolute', left: 22, top: 3644, width: 1368, height: 770, objectFit: 'cover', display: 'block' }}
        />

        {/* Description 3 */}
        <p style={{ position: 'absolute', left: 23, top: 4448, width: 1367, margin: 0, ...DESCRIPTION_TEXT_STYLE }}>
          <span style={{ fontStyle: 'italic' }}>Reshape it yourself</span>
          <br />
          &ldquo;The grip is molded from Polymorph plastic — dip it in hot water and it softens enough to reshape by hand, letting each user form-fit it to their own grip size and shape, then cool back into a rigid hold.&rdquo;
        </p>

        {/* Footer */}
        <div style={{ position: 'absolute', left: 0, top: 4633, width: '100%' }}>
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
