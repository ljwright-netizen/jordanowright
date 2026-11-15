import { useEffect } from 'react'
import { A } from './assets.js'
import { LetterReveal, useLATime, usePageZoom, Divider, LogoBookmark, HeaderIdentity, StickyNav, DESCRIPTION_TEXT_STYLE } from './shared.jsx'
import { useIsMobile, MobileProductPage } from './mobile.jsx'

/* ── Transfit product page — Figma node 322:1421 "Transfit Page", the actual
   dedicated case-study frame for this product (distinct from the generic
   90:1208 template used by the other product pages). Pulled directly via
   MCP get_design_context; every position/size/color/font below is Figma-
   exact unless noted.

   Header uses a fixed height (90px, matching Figma's divider position)
   rather than relying on padding to absorb the tagline paragraph's natural
   line-height — the tagline itself is intentionally omitted here per
   request (homepage-only), and a fixed height keeps the divider/nav
   landing at the exact same pixel regardless of that. Figma's own frame
   was separately edited to remove that same tagline row (divider moved
   from y=232 to y=90, frame height 3040 -> 2893) — re-pulled and verified
   this is the current source of truth.

   Everything below the nav is positioned inside one `relative` wrapper,
   using each element's Figma Y minus 130 (90 header + 40 nav) as its
   `top`. The one exception is the giant vertical "TRANSFIT" lettering
   column, which Figma positions starting at y=225 — above the divider,
   bleeding up into the header. That column is its own full-page absolute
   layer (raw Figma coordinates, no offset) placed first in the DOM so
   header/nav content — and the nav's own opaque background — naturally
   paints over it, matching the Figma screenshot.

   MacBook screen contents (address bar + dashboard screenshot) are
   nested inside the "Dark Screen" bezel using offsets local to that
   bezel's own Figma box (not the outer Lid, and not double-nested through
   an intermediate wrapper) — Figma's own absolute coordinates for those
   two layers only overlap by ~2px with no gap, so matching that reference
   point exactly avoids introducing a seam. ── */

const LETTER_COLUMN = [
  { ch: 'T', top: 83,      left: 1177,    fontSize: 312.771 },
  { ch: 'R', top: 284.45,  left: 1177,    fontSize: 312.771 },
  { ch: 'A', top: 488.22,  left: 1177,    fontSize: 312.771 },
  { ch: 'n', top: 688.68,  left: 1177,    fontSize: 312.771 },
  { ch: 'S', top: 889.81,  left: 1177,    fontSize: 312.771 },
  { ch: 'f', top: 1083,    left: 1177,    fontSize: 369.472 },
  { ch: 'I', top: 1363.84, left: 1178.21, fontSize: 312.771 },
  { ch: 'T', top: 1564.99, left: 1177,    fontSize: 312.771 },
]

const HEADER_HEIGHT = 130 // divider(90) + nav(40), matches current Figma exactly
const CONTENT_HEIGHT = 2893 - HEADER_HEIGHT

function DesktopTransfitPage() {
  const time = useLATime()
  usePageZoom()

  useEffect(() => {
    document.title = 'Public Transit Planning — Lloyd Jordano Wright'
  }, [])

  return (
    <div
      className="page"
      style={{ position: 'relative', fontFamily: '"neue-haas-unica", "Helvetica Neue", Arial, sans-serif', background: '#090909' }}
    >
      {/* Giant vertical "TRANSFIT" lettering — decorative background column,
          raw Figma coordinates (this layer's origin = page top, y=0).
          Each letter reuses the homepage's scramble-reveal component;
          scrambling and locked colors are both #494e5b (Figma-exact), so
          the effect reads as glyphs settling into place, cascading down
          the page as each letter's delay fires. */}
      <div style={{ position: 'absolute', inset: 0, height: 2893, overflow: 'hidden', pointerEvents: 'none' }}>
        {LETTER_COLUMN.map(({ ch, top, left, fontSize }, i) => (
          <div key={i} style={{ position: 'absolute', left, top }}>
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

      {/* Page-specific content, offset from Figma's absolute Y by -272 */}
      <div style={{ position: 'relative', height: CONTENT_HEIGHT }}>

        {/* Category + title */}
        <div style={{ position: 'absolute', left: 29, top: 24 }}>
          <p style={{ margin: 0, fontSize: 16.376, color: '#494e5b', fontWeight: 400, letterSpacing: '0.07em' }}>Software Engineering</p>
        </div>
        <div style={{ position: 'absolute', left: 29, top: 46, fontSize: 43.887, color: '#e9efff', fontWeight: 400, lineHeight: 1.05, letterSpacing: '-0.015em' }}>
          <span style={{ display: 'block' }}>Public Transit</span>
          <span style={{ display: 'block' }}>Planning</span>
        </div>

        {/* Product URL — kept subtle/secondary: reuses the site's own muted
            label color (#494e5b, same as the "Software Engineering"
            category text and footer copy) and that same smaller label size,
            rather than reading as a prominent link. */}
        <a
          href="https://www.usetransfit.com/"
          target="_blank"
          rel="noreferrer"
          style={{ position: 'absolute', left: 29, top: 172, fontSize: 16.376, color: '#494e5b', fontWeight: 400, textDecoration: 'none', whiteSpace: 'nowrap' }}
        >
          https://www.usetransfit.com/
        </a>

        {/* MacBook Pro mockup — chassis in plain CSS (vector rects in Figma,
            no image fill), base/hinge + shadow use the flattened Figma
            exports since those are curved vector shapes. Address bar +
            dashboard screenshot are children of the Dark Screen bezel,
            positioned using offsets local to THAT box (336.29,316.29 in
            Figma), so their ~2px intentional overlap matches Figma exactly
            with no gap. */}
        <div style={{
          position: 'absolute', left: 332, top: 40, width: 699.429, height: 474.857,
          background: '#1a202c', border: '1.714px solid #4a5568', borderRadius: '24px 24px 3.429px 3.429px',
        }}>
          <div style={{
            position: 'absolute', left: 4.29, top: 4.29, width: 690.857, height: 452.571,
            background: '#000', borderRadius: '18.857px 18.857px 0 0', overflow: 'hidden',
          }}>
            <img
              src={A.transfitScreenAddressbar}
              alt=""
              style={{ position: 'absolute', left: 13.71, top: 18.71, width: 661, height: 22, borderRadius: 3, display: 'block' }}
            />
            <img
              src={A.transfitScreenDashboard}
              alt="Transfit dashboard"
              style={{ position: 'absolute', left: 13.71, top: 38.71, width: 661, height: 394, objectFit: 'cover', display: 'block' }}
            />
          </div>
        </div>
        <img
          src={A.transfitLaptopBase}
          alt=""
          style={{ position: 'absolute', left: 248, top: 511.43, width: 864, height: 25.71, display: 'block' }}
        />
        <img
          src={A.transfitLaptopShadow}
          alt=""
          style={{ position: 'absolute', left: 292.57, top: 538, width: 775.71, height: 8.571, display: 'block' }}
        />

        {/* Floating UI panel beside the laptop */}
        <div style={{ position: 'absolute', left: 832, top: 379, width: 260, height: 288, borderRadius: 5, overflow: 'hidden' }}>
          <img src={A.transfitFloatingPanel} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
        </div>

        {/* Pull quote */}
        <p style={{ position: 'absolute', left: 53, top: 596, width: 739, margin: 0, ...DESCRIPTION_TEXT_STYLE }}>
          &ldquo;AI agent for transit planners, cleaning and merging agency data to turn plain-language requests into optimized stop placements, route networks, and cost estimates.&rdquo;
        </p>

        {/* Product screenshots */}
        <img
          src={A.transfitScreenshotLocations}
          alt="Transfit locations view"
          style={{ position: 'absolute', left: 29, top: 801, width: 1102, height: 279, objectFit: 'cover', display: 'block' }}
        />
        <img
          src={A.transfitScreenshotMap}
          alt="Transfit map view"
          style={{ position: 'absolute', left: 29, top: 1119, width: 1102, height: 558, objectFit: 'cover', display: 'block' }}
        />

        {/* Body description — matches the pull quote's styling exactly, so
            the two paragraphs read as one consistent text treatment. */}
        <p style={{ position: 'absolute', left: 29, top: 1761, width: 1372, margin: 0, ...DESCRIPTION_TEXT_STYLE }}>
          &ldquo;Planners define a study area, upload their own data or pull it in automatically, then describe their goals in plain language, and the agent configures the network and runs the optimization. Multiple scenarios can be compared side by side with full cost and coverage breakdowns before exporting.&rdquo;
        </p>

        {/* Final full-width screenshot */}
        <img
          src={A.transfitScreenshotNetwork}
          alt="Transfit network view"
          style={{ position: 'absolute', left: 29, top: 1965, width: 1385, height: 706, objectFit: 'cover', display: 'block' }}
        />

        {/* Footer */}
        <div style={{ position: 'absolute', left: 0, top: 2706, width: '100%' }}>
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
      { img: A.transfitHero, alt: 'Transfit on a laptop', ratio: 5760 / 3880 },
      { text: 'AI agent for transit planners, cleaning and merging agency data to turn plain-language requests into optimized stop placements, route networks, and cost estimates.' },
      { img: A.transfitScreenshotLocations, alt: 'Transfit locations view', ratio: 1102 / 279 },
      { img: A.transfitScreenshotMap, alt: 'Transfit map view', ratio: 1102 / 558 },
      { text: 'Planners define a study area, upload their own data or pull it in automatically, then describe their goals in plain language, and the agent configures the network and runs the optimization. Multiple scenarios can be compared side by side with full cost and coverage breakdowns before exporting.' },
      { img: A.transfitScreenshotNetwork, alt: 'Transfit network view', ratio: 1385 / 706 },
    ]

export default function TransfitPage() {
  const isMobile = useIsMobile()
  if (!isMobile) return <DesktopTransfitPage />
  return (
    <MobileProductPage
      docTitle="Public Transit Planning"
      category="Software Engineering"
      titleLines={["Public Transit", "Planning"]}
      lettering="Transfit"
      link="https://www.usetransfit.com/"
      blocks={MOBILE_BLOCKS}
    />
  )
}
