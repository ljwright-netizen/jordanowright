import { useState, useEffect } from 'react'
import { A } from './assets.js'
import { LetterReveal, useLATime, useScrollY, StickyNav } from './shared.jsx'

/* ── Mobile layer ──────────────────────────────────────────────────────────
   The desktop pages are Figma-exact absolute layouts on a fixed 1440px
   canvas, which can't reflow. Below MOBILE_BREAKPOINT every page renders a
   separate stacked layout built from the same content and assets instead,
   so the desktop build stays pixel-identical. ── */
export const MOBILE_BREAKPOINT = 768
const QUERY = `(max-width: ${MOBILE_BREAKPOINT - 1}px)`

export function useIsMobile() {
  const [isMobile, setIsMobile] = useState(() => window.matchMedia(QUERY).matches)
  useEffect(() => {
    const mql = window.matchMedia(QUERY)
    const handler = (e) => setIsMobile(e.matches)
    mql.addEventListener('change', handler)
    return () => mql.removeEventListener('change', handler)
  }, [])
  return isMobile
}

export const FONT = '"neue-haas-unica", "Helvetica Neue", Arial, sans-serif'
export const GUTTER = 16

/* Smaller bookmark: same two-state collapse as desktop, scaled to ~half. */
function MobileBookmark() {
  const isCompact = useScrollY() > 60
  return (
    <div style={{
      position: 'fixed', top: 0, right: GUTTER, width: 57,
      height: isCompact ? 52 : 100,
      background: '#3f9f53', zIndex: 100, overflow: 'hidden',
      transition: 'height 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
    }}>
      <img src={A.group1} alt="LJW" style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: 52, objectFit: 'cover' }} />
    </div>
  )
}

function MobileHeader({ children }) {
  const time = useLATime()
  return (
    <header style={{ padding: `14px ${GUTTER + 57 + 12}px 22px ${GUTTER}px` }}>
      <p style={{ fontSize: 15, color: '#e9efff' }}>Lloyd Jordano Wright</p>
      <p style={{ marginTop: 3, fontSize: 13, color: '#494e5b', lineHeight: 1.35 }}>
        Right Now · {time} — Los Angeles, California
      </p>
      {children}
    </header>
  )
}

export function MobileFooter({ pulse, onPulseEnd }) {
  const cls = pulse ? 'contact-link contact-pulse' : 'contact-link'
  const link = { fontSize: 15, textDecoration: 'none' }
  return (
    <footer id="contact" style={{ scrollMarginTop: 40, borderTop: '1px solid rgba(73,78,91,0.35)', padding: `20px ${GUTTER}px 28px` }}>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px 22px' }}>
        <a href="mailto:jordano.wright07@gmail.com" className={cls} onAnimationEnd={onPulseEnd} style={link}>jordano.wright07@gmail.com</a>
        <a href="https://www.linkedin.com/in/lloyd-jordano-wright" target="_blank" rel="noreferrer" className={cls} style={link}>LinkedIn</a>
        <a href="https://instagram.com/jordano.wright" target="_blank" rel="noreferrer" className={cls} style={link}>Instagram</a>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 22, fontSize: 13, color: '#494e5b' }}>
        <a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>Privacy Policy</a>
        <span>© 2025-2026 LJW</span>
      </div>
    </footer>
  )
}

/* Page frame shared by every mobile page: bookmark, header, divider, the
   same StickyNav component desktop uses (restyled via .mobile-page CSS). */
export function MobileShell({ headerExtra, children, footer }) {
  return (
    <div className="page mobile-page" style={{ fontFamily: FONT, background: '#090909', overflowX: 'clip' }}>
      <MobileBookmark />
      <MobileHeader>{headerExtra}</MobileHeader>
      <div style={{ height: 1, background: 'rgba(73,78,91,0.35)' }} />
      <StickyNav />
      {children}
      {footer ?? <MobileFooter />}
    </div>
  )
}

/* ── Product case-study page ──────────────────────────────────────────────
   blocks: { img, alt, ratio, flip?, rotate?, crop? } | { text, lead?, bold? }
   ratio = width/height of the box the image sits in (desktop Figma box), so
   crops stay as designed. crop = desktop percentage crop for the img. ── */
export function MobileProductPage({ docTitle, category, titleLines, lettering, link, blocks }) {
  useEffect(() => { document.title = `${docTitle} — Lloyd Jordano Wright` }, [docTitle])
  return (
    <MobileShell>
      <main style={{ position: 'relative', padding: `26px ${GUTTER}px 40px` }}>
        <p style={{ fontSize: 13, color: '#494e5b', letterSpacing: '0.07em' }}>{category}</p>
        <h1 style={{ fontSize: 34, fontWeight: 400, color: '#e9efff', lineHeight: 1.05, letterSpacing: '-0.015em', marginTop: 4 }}>
          {titleLines.map((l, i) => <span key={i} style={{ display: 'block' }}>{l}</span>)}
        </h1>
        {link && (
          <a href={link} target="_blank" rel="noreferrer" style={{ display: 'inline-block', marginTop: 12, fontSize: 14, color: '#494e5b', textDecoration: 'none', wordBreak: 'break-all' }}>{link}</a>
        )}

        <div style={{ overflow: 'hidden', margin: `18px -${GUTTER}px 4px`, pointerEvents: 'none' }}>
          <p style={{ fontFamily: '"eco", Georgia, serif', fontSize: 'min(30vw, 150px)', color: '#494e5b', lineHeight: 0.9, whiteSpace: 'nowrap', paddingLeft: GUTTER - 4 }}>
            <LetterReveal text={lettering} startDelay={150} spread={350} />
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 18, marginTop: 18 }}>
          {blocks.map((b, i) => <Block key={i} {...b} />)}
        </div>
      </main>
    </MobileShell>
  )
}

function Block(b) {
  if (b.row) {
    return (
      <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
        {b.row.map((c, i) => <div key={i} style={{ flex: 1, minWidth: 0 }}><Block {...c} /></div>)}
      </div>
    )
  }
  return b.text ? <TextBlock {...b} /> : <ImageBlock {...b} />
}

function TextBlock({ text, lead, bold }) {
  return (
    <p style={{ fontSize: 19, lineHeight: 1.35, color: '#e9efff', fontWeight: bold ? 700 : 400, margin: '8px 0' }}>
      {lead && <><span style={{ fontStyle: 'italic' }}>{lead}</span><br /></>}
      &ldquo;{text}&rdquo;
    </p>
  )
}

function ImageBlock({ img, alt, ratio, flip, rotate, crop }) {
  const box = { position: 'relative', width: '100%', aspectRatio: String(ratio), overflow: 'hidden', transform: flip ? 'scaleX(-1)' : undefined }
  if (rotate) {
    // Source is portrait; rotate 90deg to fill a landscape box (Speaker page).
    return (
      <div style={{ ...box, containerType: 'inline-size' }}>
        <img src={img} alt={alt} style={{
          position: 'absolute', left: '50%', top: '50%',
          width: `calc(100cqw / ${ratio})`, height: '100cqw',
          transform: 'translate(-50%, -50%) rotate(90deg)', objectFit: 'cover', maxWidth: 'none',
        }} />
      </div>
    )
  }
  return (
    <div style={box}>
      <img src={img} alt={alt} style={crop
        ? { position: 'absolute', maxWidth: 'none', ...crop }
        : { width: '100%', height: '100%', objectFit: 'cover' }} />
    </div>
  )
}
