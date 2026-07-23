import { useState, useEffect, useMemo } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { A } from './assets.js'

/* ── Scramble reveal (each char cycles random glyphs then locks) ─────────── */
const GLYPHS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'

export function ScrambleReveal({ text, startDelay = 0, spread = 600, scrambleDuration = 500, style, className }) {
  const chars = useMemo(() => text.split(''), [text])

  // Per-character start delays (same distribution as old LetterReveal)
  const delays = useMemo(() =>
    chars.map(c => c === ' ' ? null : Math.round(startDelay + Math.random() * spread))
  , []) // eslint-disable-line react-hooks/exhaustive-deps

  const [displayed, setDisplayed] = useState(() =>
    chars.map(c => (c === ' ' ? ' ' : ' '))
  )

  useEffect(() => {
    const timers = []
    chars.forEach((char, i) => {
      if (char === ' ') return
      const delay = delays[i]
      const startT = setTimeout(() => {
        // Scramble phase: swap in random glyphs every 40ms
        const scrambleT = setInterval(() => {
          setDisplayed(prev => {
            const next = [...prev]
            next[i] = GLYPHS[Math.floor(Math.random() * GLYPHS.length)]
            return next
          })
        }, 80)
        // Lock to real character after scrambleDuration
        const lockT = setTimeout(() => {
          clearInterval(scrambleT)
          setDisplayed(prev => {
            const next = [...prev]
            next[i] = char
            return next
          })
        }, scrambleDuration)
        timers.push(scrambleT, lockT)
      }, delay)
      timers.push(startT)
    })
    return () => timers.forEach(t => { clearTimeout(t); clearInterval(t) })
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  // Group into words to preserve line-break behaviour
  const words = useMemo(() => {
    const result = []
    let idx = 0
    text.split(' ').forEach(word => {
      result.push({ word, start: idx })
      idx += word.length + 1
    })
    return result
  }, [text])

  return (
    <span className={className} style={style}>
      {words.map(({ word, start }, wi) => (
        <span key={wi}>
          <span style={{ display: 'inline-block', whiteSpace: 'nowrap' }}>
            {word.split('').map((ch, li) => {
              const snapped = displayed[start + li] === ch
              return (
                <span key={li} style={{ display: 'inline-block', position: 'relative' }}>
                  <span style={{ visibility: 'hidden' }}>{ch}</span>
                  <span style={{ position: 'absolute', inset: 0, textAlign: 'center', color: snapped ? 'inherit' : '#494e5b', transition: 'color 0.12s ease' }}>
                    {displayed[start + li]}
                  </span>
                </span>
              )
            })}
          </span>
          {wi < words.length - 1 && ' '}
        </span>
      ))}
    </span>
  )
}

// Alias so existing call-sites don't need renaming
export const LetterReveal = ScrambleReveal

/* ── Live LA time ─────────────────────────────────────────────────────────── */
export function useLATime() {
  const fmt = () =>
    new Date().toLocaleTimeString('en-US', {
      timeZone: 'America/Los_Angeles',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    })
  const [time, setTime] = useState(fmt)
  useEffect(() => {
    const id = setInterval(() => setTime(fmt()), 60_000)
    return () => clearInterval(id)
  }, [])
  return time
}

/* ── Scroll Y tracker ──────────────────────────────────────────────────────── */
export function useScrollY() {
  const [y, setY] = useState(0)
  useEffect(() => {
    const handler = () => setY(window.scrollY)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])
  return y
}

/* ── Page scale: zoom html to fill viewports wider than 1440px. Self-contained
   (calculates + applies the effect) so every page can call it once and get
   identical behavior, rather than each page re-deriving the same logic. ── */
export function usePageZoom() {
  const [scale, setScale] = useState(() => Math.max(1, window.innerWidth / 1440))
  useEffect(() => {
    const handler = () => setScale(Math.max(1, window.innerWidth / 1440))
    window.addEventListener('resize', handler, { passive: true })
    return () => window.removeEventListener('resize', handler)
  }, [])
  useEffect(() => {
    document.documentElement.style.zoom = String(scale)
    return () => { document.documentElement.style.zoom = '1' }
  }, [scale])
}

/* ── Shared product-page description/body-copy style — established on the
   Transfit page (Figma spec'd Bold/26.423, lightened to Regular per
   request), reused as-is on every product page rather than each page
   redeclaring the same values. ── */
export const DESCRIPTION_TEXT_STYLE = { fontSize: 26.423, fontWeight: 400, color: '#e9efff', lineHeight: 1.3 }

/* ── Full-width horizontal rule using the Figma divider asset ─────────────── */
export function Divider() {
  return (
    <div style={{ width: '100%', height: 1, overflow: 'hidden' }}>
      <img src={A.divider} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
    </div>
  )
}

/* ── Logo bookmark — two states, CSS-animated. Identical on every page since
   every page renders this exact component (not a re-implementation). ── */
export function LogoBookmark() {
  const scrollY = useScrollY()
  const isCompact = scrollY > 100
  return (
    <div style={{
      position: 'fixed', top: 0, right: 59,
      width: 114,
      height: isCompact ? 103 : 201,
      background: '#3f9f53',
      zIndex: 100,
      overflow: 'hidden',
      transition: 'height 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
      willChange: 'height',
    }}>
      {/* LJW wordmark anchored to bottom — always visible, rises as bookmark collapses */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: 103 }}>
        <img src={A.group1} alt="LJW" style={{ display: 'block', width: '100%', height: '100%', objectFit: 'cover' }} />
      </div>
    </div>
  )
}

/* ── Header identity — name + status line. Same position/content on every
   page (homepage additionally renders its own tagline below this). ── */
export function HeaderIdentity({ time }) {
  return (
    <>
      <div style={{ lineHeight: 'normal' }}>
        <span style={{ fontSize: 16.376, color: '#e9efff', fontWeight: 400, whiteSpace: 'nowrap' }}>
          Lloyd Jordano Wright
        </span>
      </div>
      <div style={{ marginTop: 5, fontSize: 16.376, color: '#494e5b', fontWeight: 400, lineHeight: 'normal', whiteSpace: 'nowrap' }}>
        Right Now · {time} — Los Angeles, California
      </div>
    </>
  )
}

/* ── Sticky nav bar — identical component on every page, so sticky trigger
   point / transition / solid background are guaranteed to match. Nav actions
   work cross-page: on the homepage they scroll directly; anywhere else they
   navigate home first (via location state) and let the homepage finish the
   scroll once it mounts (see App.jsx's arrival-scroll effect). ── */
export function StickyNav() {
  const navigate = useNavigate()
  const location = useLocation()
  const isHome = location.pathname === '/'

  const goToSection = (id, { pulse } = {}) => (e) => {
    e.preventDefault()
    if (isHome) {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      if (pulse) window.dispatchEvent(new CustomEvent('contact-pulse'))
    } else {
      navigate('/', { state: { scrollTo: id, pulseContact: !!pulse } })
    }
  }

  const goHome = (e) => {
    e.preventDefault()
    if (isHome) {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else {
      navigate('/')
    }
  }

  return (
    <nav style={{
      position: 'sticky', top: 0, zIndex: 50,
      background: '#090909',
      display: 'flex', alignItems: 'center',
      height: 40,
      paddingLeft: 29,
    }}>
      <a className="nav-new" href="/" onClick={goHome}>NEW</a>

      {/* Figma item positions: NEW@29, Projects@89, Work@171, About@229, Contact@293 → ~25px gap */}
      <div style={{ marginLeft: 25, display: 'flex', gap: 25 }}>
        <a className="nav-link" href="/#work" onClick={goToSection('work')}>Projects</a>
        <a
          className="nav-link"
          href="https://www.linkedin.com/in/lloyd-jordano-wright"
          target="_blank"
          rel="noreferrer"
        >Work</a>
        <a className="nav-link" href="/#about" onClick={goToSection('about')}>About</a>
        <a className="nav-link" href="/#contact" onClick={goToSection('contact', { pulse: true })}>Contact</a>
      </div>
    </nav>
  )
}
