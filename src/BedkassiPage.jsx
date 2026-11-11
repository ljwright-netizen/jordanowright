import { useEffect } from 'react'
import { A } from './assets.js'
import { LetterReveal, useLATime, usePageZoom, Divider, LogoBookmark, HeaderIdentity, StickyNav, DESCRIPTION_TEXT_STYLE } from './shared.jsx'
import { useIsMobile, MobileProductPage } from './mobile.jsx'

/* ── Bedkassi product page — Figma node 334:284 "Bedkassi Page", pulled
   directly via MCP. Same header/nav/no-tagline structure as the other
   product pages: divider at Figma y=90, nav 40px tall, content below
   offset by figmaY - 130.

   Unlike Transfit/Speaker/Banana Grip, the two description blocks here
   are single continuous bold quotes in Figma — no separate italic
   lead-in phrase — so DESCRIPTION_TEXT_STYLE is applied directly with
   fontWeight bumped to 700 (Figma: Neue Haas Unica Bold) rather than the
   shared default weight, matching this page's spec exactly.

   Re-synced 2026-07-23: the design changed since this page was first
   built — the three top photos are now larger, repositioned, reordered,
   background-removed, and each has a horizontal mirror (Figma: rotate180
   + flipY on the layer, net effect = scaleX(-1), same technique as the
   Banana Grip overlay). The large detail photo and both circular
   callouts also moved/resized, and description 2 shifted slightly.

   The three top photos and the large detail photo all have asymmetric
   Figma crops (overflow isn't flush to one edge), so each is reproduced
   literally as an overflow-hidden container with a percentage-positioned
   inner <img>, copied straight from get_design_context's Tailwind
   percentages rather than approximated as a flat cover box — the mirror
   is applied to the outer container so the crop itself is computed in
   the image's own (un-mirrored) coordinate space first, exactly matching
   Figma's layer/crop order. The two circular callouts (pin-adjustment
   close-ups) are pre-cropped circular PNG exports from Figma — no CSS
   border-radius masking needed. ── */

const LETTER_COLUMN = [
  { ch: 'B', top: 103 },
  { ch: 'E', top: 317.69 },
  { ch: 'D', top: 534.86 },
  { ch: 'K', top: 748.49 },
  { ch: 'A', top: 962.84 },
  { ch: 'S', top: 1181.52 },
  { ch: 'S', top: 1339.24 },
  { ch: 'I', top: 1497 },
]
const LETTER_FONT_SIZE = 333.328
const LETTER_LEFT = 1163

const HEADER_HEIGHT = 130 // divider(90) + nav(40), matches Figma exactly
const FRAME_HEIGHT = 1958
const CONTENT_HEIGHT = FRAME_HEIGHT - HEADER_HEIGHT

function DesktopBedkassiPage() {
  const time = useLATime()
  usePageZoom()

  useEffect(() => {
    document.title = 'Bedkassi — Lloyd Jordano Wright'
  }, [])

  return (
    <div
      className="page"
      style={{ position: 'relative', fontFamily: '"neue-haas-unica", "Helvetica Neue", Arial, sans-serif', background: '#090909' }}
    >
      {/* Giant vertical "BEDKASSI" lettering — decorative background column,
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
          <p style={{ margin: 0, fontSize: 16.376, color: '#494e5b', fontWeight: 400, letterSpacing: '0.07em' }}>Furniture Design</p>
        </div>
        <div style={{ position: 'absolute', left: 29, top: 50, fontSize: 43.887, color: '#e9efff', fontWeight: 400, lineHeight: 1.05, letterSpacing: '-0.015em' }}>
          <span style={{ display: 'block' }}>Adjustable</span>
          <span style={{ display: 'block' }}>Bedside Table</span>
        </div>

        {/* Three product photos, side by side, each mirrored — an
            overflow-hidden container (crop computed first, in the
            image's own un-mirrored space) with a CSS scaleX(-1) flip
            applied to the container, matching Figma's layer order */}
        <div style={{ position: 'absolute', left: -38, top: 23, width: 526, height: 702, overflow: 'hidden', transform: 'scaleX(-1)' }}>
          <img
            src={A.bedkassiAdjustable3}
            alt="Adjustable Bedside Table, desk height"
            style={{ position: 'absolute', left: '-2.46%', top: '0.08%', width: '110.47%', height: '110.47%', maxWidth: 'none', display: 'block' }}
          />
        </div>
        <div style={{ position: 'absolute', left: 325, top: 7, width: 494, height: 701, overflow: 'hidden', transform: 'scaleX(-1)' }}>
          <img
            src={A.bedkassiAdjustable2}
            alt="Adjustable Bedside Table, nightstand height"
            style={{ position: 'absolute', left: '-5.74%', top: '-15.52%', width: '122.89%', height: '115.52%', maxWidth: 'none', display: 'block' }}
          />
        </div>
        <div style={{ position: 'absolute', left: 677, top: 30, width: 535, height: 702, overflow: 'hidden', transform: 'scaleX(-1)' }}>
          <img
            src={A.bedkassiAdjustable1}
            alt="Adjustable Bedside Table, tray height"
            style={{ position: 'absolute', left: '0%', top: '-18.34%', width: '116.28%', height: '118.27%', maxWidth: 'none', display: 'block' }}
          />
        </div>

        {/* Description 1 — short version */}
        <p style={{ position: 'absolute', left: 38, top: 720, width: 1087, margin: 0, ...DESCRIPTION_TEXT_STYLE, fontWeight: 700 }}>
          &ldquo;Adjustable bedside table shifting between three levels of use, nightstand, bed tray, and desk, built to be easily moved between them.&rdquo;
        </p>

        {/* Large detail photo, with two circular pin-mechanism callouts
            overlaid on top (matches Figma's paint order) */}
        <div style={{ position: 'absolute', left: 133, top: 847, width: 1087, height: 716, overflow: 'hidden' }}>
          <img
            src={A.bedkassiDetail}
            alt="Adjustable Bedside Table, height-pin detail"
            style={{ position: 'absolute', left: '-22.78%', top: '-0.02%', width: '138.96%', height: '100.07%', maxWidth: 'none', display: 'block' }}
          />
        </div>
        <img
          src={A.bedkassiCallout1}
          alt="Height-adjustment pin, upper position"
          style={{ position: 'absolute', left: 252, top: 847, width: 336.023, height: 334.646, objectFit: 'cover', display: 'block' }}
        />
        <img
          src={A.bedkassiCallout2}
          alt="Height-adjustment pin, lower position"
          style={{ position: 'absolute', left: 55, top: 1182, width: 336.023, height: 336.023, objectFit: 'cover', display: 'block' }}
        />

        {/* Description 2 — longer version */}
        <p style={{ position: 'absolute', left: 38, top: 1583, width: 1077, margin: 0, ...DESCRIPTION_TEXT_STYLE, fontWeight: 700 }}>
          &ldquo;Height adjusts by pulling a side pin and repositioning it into one of three preset holes, a fast, tool-free way to shift the table between its nightstand, tray, and desk configurations.&rdquo;
        </p>

        {/* Footer */}
        <div style={{ position: 'absolute', left: 0, top: 1767, width: '100%' }}>
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

const MOBILE_BLOCKS = [
      { img: A.bedkassiAdjustable1, alt: 'Adjustable Bedside Table, tray height', ratio: 535 / 702, flip: true, crop: { left: '0%', top: '-18.34%', width: '116.28%', height: '118.27%' } },
      { row: [
        { img: A.bedkassiAdjustable2, alt: 'Adjustable Bedside Table, nightstand height', ratio: 494 / 701, flip: true, crop: { left: '-5.74%', top: '-15.52%', width: '122.89%', height: '115.52%' } },
        { img: A.bedkassiAdjustable3, alt: 'Adjustable Bedside Table, desk height', ratio: 526 / 702, flip: true, crop: { left: '-2.46%', top: '0.08%', width: '110.47%', height: '110.47%' } },
      ] },
      { bold: true, text: 'Adjustable bedside table shifting between three levels of use, nightstand, bed tray, and desk, built to be easily moved between them.' },
      { img: A.bedkassiDetail, alt: 'Adjustable Bedside Table, height-pin detail', ratio: 1087 / 716, crop: { left: '-22.78%', top: '-0.02%', width: '138.96%', height: '100.07%' } },
      { row: [
        { img: A.bedkassiCallout1, alt: 'Height-adjustment pin, upper position', ratio: 1 },
        { img: A.bedkassiCallout2, alt: 'Height-adjustment pin, lower position', ratio: 1 },
      ] },
      { bold: true, text: 'Height adjusts by pulling a side pin and repositioning it into one of three preset holes, a fast, tool-free way to shift the table between its nightstand, tray, and desk configurations.' },
    ]

export default function BedkassiPage() {
  const isMobile = useIsMobile()
  if (!isMobile) return <DesktopBedkassiPage />
  return (
    <MobileProductPage
      docTitle="Bedkassi"
      category="Furniture Design"
      titleLines={["Adjustable", "Bedside Table"]}
      lettering="Bedkassi"
      blocks={MOBILE_BLOCKS}
    />
  )
}
