import { useEffect } from 'react'
import { A } from './assets.js'
import { LetterReveal, useLATime, usePageZoom, Divider, LogoBookmark, HeaderIdentity, StickyNav, DESCRIPTION_TEXT_STYLE } from './shared.jsx'
import { useIsMobile, MobileProductPage } from './mobile.jsx'

/* ── Eco-Tourism Hub product page — Figma node 334:96 "Ecocenter Page",
   pulled directly via MCP. Same header/nav/no-tagline structure as the
   (re-synced) Transfit page: divider at Figma y=90, nav 40px tall, so
   content below is offset by figmaY - 130.

   One Figma image (node 346:625, "12CA7918-...") sits at x=-865.5 — entirely
   off the 1440px canvas — and isn't rendered anywhere on screen in Figma
   itself; skipped here for the same reason.

   Description/quote paragraphs reuse DESCRIPTION_TEXT_STYLE (shared.jsx),
   the same treatment established on the Transfit page, rather than
   redeclaring the same font values here. ── */

const LETTER_COLUMN = [
  { ch: 'E', top: 85 },
  { ch: 'C', top: 307.64 },
  { ch: 'O', top: 530.27 },
  { ch: 'C', top: 754.1 },
  { ch: 'E', top: 977.92 },
  { ch: 'N', top: 1195.82 },
  { ch: 'T', top: 1412.53 },
  { ch: 'E', top: 1636.35 },
  { ch: 'R', top: 1854.26 },
]
const LETTER_FONT_SIZE = 337.842
const LETTER_LEFT = 1163

const HEADER_HEIGHT = 130 // divider(90) + nav(40), matches Figma exactly
const FRAME_HEIGHT = 2469
const CONTENT_HEIGHT = FRAME_HEIGHT - HEADER_HEIGHT

function DesktopEcoCenterPage() {
  const time = useLATime()
  usePageZoom()

  useEffect(() => {
    document.title = 'Eco Tourism Hub — Lloyd Jordano Wright'
  }, [])

  return (
    <div
      className="page"
      style={{ position: 'relative', fontFamily: '"neue-haas-unica", "Helvetica Neue", Arial, sans-serif', background: '#090909' }}
    >
      {/* Giant vertical "ECOCENTER" lettering — decorative background column,
          raw Figma coordinates (this layer's origin = page top, y=0). Reuses
          the same scramble-reveal component as the homepage/Transfit page,
          cascading down the page as each letter locks in. */}
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
        <div style={{ position: 'absolute', left: 29, top: 25 }}>
          <p style={{ margin: 0, fontSize: 16.376, color: '#494e5b', fontWeight: 400, letterSpacing: '0.07em' }}>Sustainable Architecture</p>
        </div>
        <p style={{ position: 'absolute', left: 29, top: 46, width: 394, margin: 0, fontSize: 43.887, color: '#e9efff', fontWeight: 400, lineHeight: 1.05, letterSpacing: '-0.015em' }}>
          Eco Tourism Hub
        </p>

        {/* Body description */}
        <p style={{ position: 'absolute', left: 29, top: 145, width: 411, margin: 0, ...DESCRIPTION_TEXT_STYLE }}>
          &ldquo;Eco-tourism hub proposal replacing a pig slaughterhouse, pitched to the mayor of Sant&apos;Angelo in Pontano, Italy, with renderings built from real topographic data.&rdquo;
        </p>

        {/* Top-right perspective render — the downloaded export is already
            rendered at this node's own box dimensions (its aspect ratio
            matches the 646x385 box exactly), so it's already cropped
            correctly; no extra percentage transform needed on top of it. */}
        <img
          src={A.ecocenterPerspectiveTop}
          alt="Eco Tourism Hub perspective render"
          style={{ position: 'absolute', left: 456, top: 40, width: 646, height: 385, objectFit: 'cover', display: 'block' }}
        />

        {/* Full-width perspective render */}
        <img
          src={A.ecocenterPerspectiveMain}
          alt="Eco Tourism Hub perspective render"
          style={{ position: 'absolute', left: 29, top: 465, width: 1073, height: 604, objectFit: 'cover', display: 'block' }}
        />

        {/* Pull quote — vertically centered between the main render above
            (bottom at content-relative 1069) and the canal render below
            (top at 1281): 212px gap total, quote is ~68.7px tall, so
            71.66px above and below keeps it exactly centered. */}
        <p style={{ position: 'absolute', left: 29, top: 1140.66, width: 1073, margin: 0, ...DESCRIPTION_TEXT_STYLE }}>
          &ldquo;Design decisions were grounded in a census I personally conducted, surveying over 80% of the town&apos;s active population to shape the center around actual community needs.&rdquo;
        </p>

        {/* Full-width perspective render (canal view) */}
        <img
          src={A.ecocenterPerspectiveCanal}
          alt="Eco Tourism Hub perspective render"
          style={{ position: 'absolute', left: 29, top: 1281, width: 1073, height: 604, objectFit: 'cover', display: 'block' }}
        />

        {/* Two half-width perspective renders, side by side */}
        <img
          src={A.ecocenterPerspectiveLeft}
          alt="Eco Tourism Hub perspective render"
          style={{ position: 'absolute', left: 29, top: 1925, width: 517, height: 291, objectFit: 'cover', display: 'block' }}
        />
        <img
          src={A.ecocenterPerspectiveRight}
          alt="Eco Tourism Hub perspective render"
          style={{ position: 'absolute', left: 582, top: 1926, width: 520, height: 291, objectFit: 'cover', display: 'block' }}
        />

        {/* Footer */}
        <div style={{ position: 'absolute', left: 0, top: 2278, width: '100%' }}>
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
      { text: "Eco-tourism hub proposal replacing a pig slaughterhouse, pitched to the mayor of Sant'Angelo in Pontano, Italy, with renderings built from real topographic data." },
      { img: A.ecocenterPerspectiveTop, alt: 'Eco Tourism Hub perspective render', ratio: 646 / 385 },
      { img: A.ecocenterPerspectiveMain, alt: 'Eco Tourism Hub perspective render', ratio: 1073 / 604 },
      { text: "Design decisions were grounded in a census I personally conducted, surveying over 80% of the town's active population to shape the center around actual community needs." },
      { img: A.ecocenterPerspectiveCanal, alt: 'Eco Tourism Hub perspective render', ratio: 1073 / 604 },
      { row: [
        { img: A.ecocenterPerspectiveLeft, alt: 'Eco Tourism Hub perspective render', ratio: 517 / 291 },
        { img: A.ecocenterPerspectiveRight, alt: 'Eco Tourism Hub perspective render', ratio: 520 / 291 },
      ] },
    ]

export default function EcoCenterPage() {
  const isMobile = useIsMobile()
  if (!isMobile) return <DesktopEcoCenterPage />
  return (
    <MobileProductPage
      docTitle="Eco Tourism Hub"
      category="Sustainable Architecture"
      titleLines={["Eco Tourism Hub"]}
      lettering="EcoCenter"
      blocks={MOBILE_BLOCKS}
    />
  )
}
