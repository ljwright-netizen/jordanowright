import { useState, useEffect, useLayoutEffect, useRef } from 'react'
import { BrowserRouter, Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom'
import './App.css'
import { A } from './assets.js'
import { PRODUCTS } from './products.js'
import ProductPage from './ProductPage.jsx'
import TransfitPage from './TransfitPage.jsx'
import EcoCenterPage from './EcoCenterPage.jsx'
import HealHazePage from './HealHazePage.jsx'
import SunfanPage from './SunfanPage.jsx'
import BananaGripPage from './BananaGripPage.jsx'
import SpeakerPage from './SpeakerPage.jsx'
import BedkassiPage from './BedkassiPage.jsx'
import {
  LetterReveal, useLATime, usePageZoom,
  Divider, LogoBookmark, HeaderIdentity, StickyNav,
} from './shared.jsx'
import { useIsMobile, MobileShell, MobileFooter, GUTTER } from './mobile.jsx'

/* ── Hero carousel content ────────────────────────────────────────────────
   Loops sunfans → bedkassi → transfit → sunfans via modulo wrap in
   goToProject. Content pulled from Figma nodes 173:342 (sconceclear),
   84:785 "Frame 5" (Bedkassi), 84:888 "Frame 6" (Transfit). ── */
const HERO_PROJECTS = [
  { category: 'Industrial Design', titleLines: ['Wall Sconce'], lettering: 'SunFans' },
  { category: 'Industrial Design', titleLines: ['Adjustable', 'Bedside Table'], lettering: 'Bedkassi', letterFontSize: 311, letterTop: 476 },
  { category: 'Software Engineering', titleLines: ['Public Transit', 'Planning'], lettering: 'Transfit' },
]
const HERO_FADE_MS = 450

/* ── Chat Q&A master list — order defines both the default 3 visible options
   and the order later questions queue in as earlier ones are asked. ── */
const CHAT_QA = [
  {
    q: "What's my work experience?",
    a: ["Started at CIAO, redesigning a former slaughterhouse into an eco-tourism hub in Sant'Angelo in Pontano, Italy. Since then, I've founded my own business and worked in manufacturing and machining."],
  },
  {
    q: 'What projects excite me?',
    a: ['Innovative, disruptive projects that create new markets and new products.'],
  },
  {
    q: "What's my skill set?",
    a: ['Physical and digital design. JavaScript, HTML/CSS, 3D modeling, web development, woodworking, metalworking, laser cutting, 3D printing, injection molding, and more.'],
  },
  {
    q: "What's my background?",
    a: ['Deeply international. Visited 43 countries, lived in 5, each shaping my design perspective.'],
  },
  {
    q: 'Why did you get into this field?',
    a: [
      'Always had the itch to make things.',
      'Designing flatpack seating for an orphanage in the Philippines showed me it can genuinely improve lives.',
    ],
  },
  {
    q: 'What industries or sectors have you worked in?',
    a: ['Urban design, transportation, industrial machinery, commercial spaces, furniture, and healthcare.'],
  },
  {
    q: 'Which project are you proudest of, and why?',
    a: [
      'All of them.',
      "But Transfit stands out, a transit planning software company I co-founded and later got acquired.",
    ],
  },
  {
    q: 'Do you work solo, in teams, or both — and which do you prefer?',
    a: ["I'm no stranger to working on my own passion projects, but in teams I get to collaborate and learn constantly from coworkers, which is the best."],
  },
  {
    q: 'Are you open to relocation, remote work, freelance, etc.?',
    a: ['Yes, any location, format, or project.'],
  },
]

/* ── Photo grid (3 rows × 4 cols @ 360 px each) ──────────────────────────── */
// Crop values match Figma exactly (position:absolute within overflow:hidden inner div)
// Project tiles link to their own /projects/:slug page (see products.js);
// the two text-only "descriptor" cells aren't products, so stay plain.
function PhotoGrid() {
  const bySlug = (slug) => PRODUCTS.find((p) => p.slug === slug)
  return (
    <div className="photo-grid">
      {/* R1 C1 – Descriptor: logo → divider → text */}
      <div className="cell" style={{ background: '#090909', padding: '68px 26px 26px', display: 'flex', flexDirection: 'column' }}>
        <img src={A.group1White} alt="LJW" style={{ width: 88.77, height: 27.48, display: 'block', flexShrink: 0, marginBottom: 36 }} />
        <div style={{ height: 1, background: 'rgba(255,255,255,0.15)', marginBottom: 36, flexShrink: 0 }} />
        <p style={{ fontSize: 20, lineHeight: 1.45, color: '#ffffff', fontWeight: 400, margin: 0 }}>
          Growing up across Ecuador, South Africa, and the Philippines gave me something most design curricula can't teach.
        </p>
      </div>

      {/* R1 C2 – Transfit: full cover */}
      <Link to={`/projects/${bySlug('transfit').slug}`} className="cell cell-project">
        <img src={A.rectangle8} alt="" className="cell-img" />
        <div className="cell-overlay">
          <span style={{ fontSize: 11, color: '#e9efff', fontWeight: 400, letterSpacing: '0.1em', opacity: 0.6 }}>Software Engineering</span>
          <span style={{ fontSize: 22, color: '#e9efff', fontWeight: 400 }}>Transfit</span>
        </div>
      </Link>

      {/* R1 C3-C4 – Eco-Tourism Hub (w:128.89% h:145% l:0 t:0) */}
      <Link to={`/projects/${bySlug('eco-tourism-hub').slug}`} className="cell cell-project" style={{ gridColumn: '3 / 5' }}>
        <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
          <img src={A.rectangle9} alt="" style={{ position: 'absolute', width: '128.89%', height: '145%', left: '0%', top: '0%', maxWidth: 'none', display: 'block' }} />
        </div>
        <div className="cell-overlay">
          <span style={{ fontSize: 11, color: '#e9efff', fontWeight: 400, letterSpacing: '0.1em', opacity: 0.6 }}>Sustainable Architecture</span>
          <span style={{ fontSize: 22, color: '#e9efff', fontWeight: 400 }}>Eco-Tourism Hub</span>
        </div>
      </Link>

      {/* R2-R3 C1 – HealHaze (w:112.5% h:100% l:-12.49% t:-0.04%) */}
      <Link to={`/projects/${bySlug('healhaze').slug}`} className="cell cell-project" style={{ gridRow: '2 / 4' }}>
        <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
          <img src={A.rectangle12} alt="" style={{ position: 'absolute', width: '112.5%', height: '100%', left: '-12.49%', top: '-0.04%', maxWidth: 'none', display: 'block' }} />
        </div>
        <div className="cell-overlay">
          <span style={{ fontSize: 11, color: '#e9efff', fontWeight: 400, letterSpacing: '0.1em', opacity: 0.6 }}>Branding & Product Design</span>
          <span style={{ fontSize: 22, color: '#e9efff', fontWeight: 400 }}>HealHaze</span>
        </div>
      </Link>

      {/* R2 C2 – Sunfan (w:313.59% h:405.94% l:-51.98% t:-152.87%) */}
      <Link to={`/projects/${bySlug('sunfans').slug}`} className="cell cell-project" style={{ gridRow: 2, gridColumn: 2 }}>
        <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
          <img src={A.rectangle15} alt="" style={{ position: 'absolute', width: '313.59%', height: '405.94%', left: '-51.98%', top: '-152.87%', maxWidth: 'none', display: 'block' }} />
        </div>
        <div className="cell-overlay">
          <span style={{ fontSize: 11, color: '#e9efff', fontWeight: 400, letterSpacing: '0.1em', opacity: 0.6 }}>Industrial Design</span>
          <span style={{ fontSize: 22, color: '#e9efff', fontWeight: 400 }}>Sunfan</span>
        </div>
      </Link>

      {/* R2 C3 – Descriptor: text → divider → logo (logo right-aligned) */}
      <div className="cell" style={{ gridRow: 2, gridColumn: 3, background: '#090909', padding: '68px 26px 26px', display: 'flex', flexDirection: 'column' }}>
        <p style={{ fontSize: 20, lineHeight: 1.45, color: '#ffffff', fontWeight: 400, margin: 0, marginBottom: 36 }}>
          From childhood sketchbooks to 3D renders and material workshops, the drive has always been the same. To create things that earn their place in the world.
        </p>
        <div style={{ height: 1, background: 'rgba(255,255,255,0.15)', marginBottom: 36, flexShrink: 0 }} />
        <img src={A.group1White} alt="LJW" style={{ width: 88.77, height: 27.48, display: 'block', marginLeft: 'auto', flexShrink: 0 }} />
      </div>

      {/* R2-R3 C4 – NonSlip BananaGrip (w:298.98% h:100% l:-34.36% t:-0.06%) */}
      <Link to={`/projects/${bySlug('banana-grip').slug}`} className="cell cell-project" style={{ gridRow: '2 / 4', gridColumn: 4 }}>
        <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
          <img src={A.rectangle11} alt="" style={{ position: 'absolute', width: '298.98%', height: '100%', left: '-34.36%', top: '-0.06%', maxWidth: 'none', display: 'block' }} />
        </div>
        <div className="cell-overlay">
          <span style={{ fontSize: 11, color: '#e9efff', fontWeight: 400, letterSpacing: '0.1em', opacity: 0.6 }}>Product Design</span>
          <span style={{ fontSize: 22, color: '#e9efff', fontWeight: 400 }}>NonSlip BananaGrip</span>
        </div>
      </Link>

      {/* R3 C2 – Speaker (w:69.88% h:101.35% l:15.16% t:-0.08%) */}
      <Link to={`/projects/${bySlug('speaker').slug}`} className="cell cell-project" style={{ gridRow: 3, gridColumn: 2 }}>
        <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
          <img src={A.rectangle14} alt="" style={{ position: 'absolute', width: '69.88%', height: '101.35%', left: '15.16%', top: '-0.08%', maxWidth: 'none', display: 'block' }} />
        </div>
        <div className="cell-overlay">
          <span style={{ fontSize: 11, color: '#e9efff', fontWeight: 400, letterSpacing: '0.1em', opacity: 0.6 }}>Industrial Design</span>
          <span style={{ fontSize: 22, color: '#e9efff', fontWeight: 400 }}>Speaker</span>
        </div>
      </Link>

      {/* R3 C3 – Bedkassi (w:150.32% h:100% l:-25.17% t:0.01%) */}
      <Link to={`/projects/${bySlug('bedkassi').slug}`} className="cell cell-project" style={{ gridRow: 3, gridColumn: 3 }}>
        <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
          <img src={A.rectangle13} alt="" style={{ position: 'absolute', width: '150.32%', height: '100%', left: '-25.17%', top: '0.01%', maxWidth: 'none', display: 'block' }} />
        </div>
        <div className="cell-overlay">
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, transform: 'translateY(10px)' }}>
            <span style={{ fontSize: 11, color: '#e9efff', fontWeight: 400, letterSpacing: '0.1em', opacity: 0.6 }}>Furniture Design</span>
            <span style={{ fontSize: 22, color: '#e9efff', fontWeight: 400 }}>Bedkassi</span>
          </div>
        </div>
      </Link>
    </div>
  )
}

/* ── Chat bubble — bot (white, left) or user (blue, right) ─────────────────── */
function ChatBubble({ text, sender, showAvatar }) {
  const isUser = sender === 'user'
  return (
    <div
      className={isUser ? 'chat-send-in' : 'chat-bubble-in'}
      style={{ display: 'flex', alignItems: 'flex-end', gap: 12, justifyContent: isUser ? 'flex-end' : 'flex-start' }}
    >
      {!isUser && (
        <img
          src={A.ellipse7}
          alt="Bot"
          style={{ width: 39, height: 39, borderRadius: '50%', flexShrink: 0, objectFit: 'cover', visibility: showAvatar ? 'visible' : 'hidden' }}
        />
      )}
      <div
        style={{
          maxWidth: '78%',
          background: isUser ? '#0a66c2' : '#fff',
          color: isUser ? '#fff' : '#090909',
          borderRadius: 18,
          padding: '9px 16px',
          fontSize: 16.376,
          fontWeight: 400,
          lineHeight: 1.4,
        }}
      >
        {text}
      </div>
    </div>
  )
}

/* ── Typing indicator — stands in for the bot's answer during ANSWER_DELAY_MS,
   same left-aligned/avatar treatment as a real bot bubble. ── */
function TypingIndicator() {
  return (
    <div className="chat-bubble-in" style={{ display: 'flex', alignItems: 'flex-end', gap: 12, justifyContent: 'flex-start' }}>
      <img
        src={A.ellipse7}
        alt="Bot"
        style={{ width: 39, height: 39, borderRadius: '50%', flexShrink: 0, objectFit: 'cover' }}
      />
      <div style={{ background: '#fff', borderRadius: 18, padding: '13px 16px', display: 'flex', gap: 4 }}>
        <span className="typing-dot" />
        <span className="typing-dot" />
        <span className="typing-dot" />
      </div>
    </div>
  )
}

/* ── Animated suggested-question list — FLIP-slides remaining items into
   place when one is removed/appended, rather than snapping. ── */
function ChatOptionList({ items, onSelect, disabled, padX = 28 }) {
  const containerRef = useRef(null)
  const prevRects = useRef({})

  useLayoutEffect(() => {
    const container = containerRef.current
    if (!container) return
    const children = Array.from(container.children)
    children.forEach((child) => {
      const id = child.dataset.id
      const oldRect = prevRects.current[id]
      if (!oldRect) return
      const newRect = child.getBoundingClientRect()
      const deltaY = oldRect.top - newRect.top
      if (!deltaY) return
      child.style.transition = 'none'
      child.style.transform = `translateY(${deltaY}px)`
      requestAnimationFrame(() => {
        child.style.transition = 'transform 0.35s ease'
        child.style.transform = ''
      })
    })
    const nextRects = {}
    children.forEach((child) => { nextRects[child.dataset.id] = child.getBoundingClientRect() })
    prevRects.current = nextRects
  }, [items])

  return (
    <div ref={containerRef} style={{ display: 'flex', flexDirection: 'column', gap: 8, padding: `0 ${padX}px`, marginBottom: 12, alignItems: 'flex-start' }}>
      {items.map((idx) => (
        <button
          key={idx}
          data-id={idx}
          className="suggest-btn chat-option-in"
          onClick={() => onSelect(idx)}
          disabled={disabled}
          style={{ opacity: disabled ? 0.5 : 1, cursor: disabled ? 'default' : 'pointer', transition: 'opacity 0.2s ease' }}
        >
          {CHAT_QA[idx].q}
        </button>
      ))}
    </div>
  )
}

/* ── Chat widget ──────────────────────────────────────────────────────────── */
const CHAT_ANSWER_DELAY_MS = 800

function ChatWidget({ mobile = false }) {
  // Greeting is message zero — part of the same scrollable log/history as
  // everything else, not a pinned header, so it scrolls away like a real thread.
  const [messages, setMessages] = useState([{ id: 'greeting', sender: 'bot', text: 'Hey! Any questions?' }])
  const [queue, setQueue] = useState({ visible: [0, 1, 2], nextIndex: 3 })
  const [pendingIdx, setPendingIdx] = useState(null) // question awaiting its "typing" delay
  const [emailPrompted, setEmailPrompted] = useState(false) // only add the email bubble once per session
  const messagesRef = useRef(null)
  const pendingTimer = useRef(null)

  useEffect(() => {
    const el = messagesRef.current
    if (el) el.scrollTop = el.scrollHeight
  }, [messages, pendingIdx])

  useEffect(() => () => clearTimeout(pendingTimer.current), [])

  const handleSelect = (idx) => {
    if (pendingIdx !== null) return // one exchange at a time, like a real chat
    const item = CHAT_QA[idx]
    setMessages((prev) => [...prev, { id: `${idx}-q`, sender: 'user', text: item.q }])
    setQueue((prev) => {
      const visible = prev.visible.filter((i) => i !== idx)
      let nextIndex = prev.nextIndex
      if (nextIndex < CHAT_QA.length) {
        visible.push(nextIndex)
        nextIndex += 1
      }
      return { visible, nextIndex }
    })
    setPendingIdx(idx)
    clearTimeout(pendingTimer.current)
    pendingTimer.current = setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        ...item.a.map((text, i) => ({ id: `${idx}-a${i}`, sender: 'bot', text })),
      ])
      setPendingIdx(null)
    }, CHAT_ANSWER_DELAY_MS)
  }

  // Free-text input isn't wired to a real chat backend, so clicking it opens
  // an email to the same address instead of accepting typed input.
  const handleInputActivate = () => {
    window.location.href = `mailto:jordano.wright07@gmail.com?subject=${encodeURIComponent('Question from your portfolio site')}`
    if (!emailPrompted) {
      setMessages((prev) => [
        ...prev,
        { id: 'email-prompt', sender: 'bot', text: 'Want to keep talking? Email me directly at jordano.wright07@gmail.com.' },
      ])
      setEmailPrompted(true)
    }
  }

  return (
    <div
      style={{
        width: mobile ? '100%' : 671,
        height: mobile ? 540 : 582,
        background: 'rgba(224,224,225,0.9)',
        borderRadius: mobile ? 22 : 30,
        position: 'relative',
        flexShrink: 0,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Conversation history — greeting included, scrolls as it grows. Soft
          fade mask at both edges (not a hard clip) so messages scrolling out
          of view dissolve rather than cut off. */}
      <div
        ref={messagesRef}
        className="chat-scroll-fade"
        style={{
          flex: 1,
          minHeight: 0,
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
          gap: 8,
          padding: mobile ? '20px 16px 12px' : '28px 28px 12px',
        }}
      >
        {messages.map((m, i) => (
          <ChatBubble
            key={m.id}
            text={m.text}
            sender={m.sender}
            showAvatar={m.sender === 'bot' && (i === messages.length - 1 || messages[i + 1].sender !== 'bot')}
          />
        ))}
        {pendingIdx !== null && <TypingIndicator />}
      </div>

      {/* Suggested question buttons */}
      <ChatOptionList items={queue.visible} onSelect={handleSelect} disabled={pendingIdx !== null} padX={mobile ? 16 : 28} />

      {/* Message input row */}
      <div style={{ display: 'flex', alignItems: 'center', gap: mobile ? 8 : 12, padding: mobile ? '0 16px 18px' : '0 28px 28px' }}>
        {/* Social icon links */}
        <div style={{ display: 'flex', alignItems: 'center', gap: mobile ? 6 : 10, flexShrink: 0 }}>
          {/* LinkedIn */}
          <a href="https://www.linkedin.com/in/lloyd-jordano-wright" target="_blank" rel="noreferrer" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 34, height: 34, borderRadius: '50%', background: '#0a66c2', flexShrink: 0 }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="#ffffff">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
          </a>
          {/* Instagram */}
          <a href="https://instagram.com/jordano.wright" target="_blank" rel="noreferrer" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 34, height: 34, borderRadius: '50%', background: 'radial-gradient(circle at 30% 107%, #fdf497 0%, #fdf497 5%, #fd5949 45%, #d6249f 60%, #285AEB 90%)', flexShrink: 0 }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="#ffffff">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
          </a>
          {/* Mail */}
          <a href="mailto:jordano.wright07@gmail.com" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 34, height: 34, borderRadius: '50%', background: '#494e5b', flexShrink: 0 }}>
            <svg width="16" height="14" viewBox="0 0 24 18" fill="#ffffff">
              <path d="M0 0h24v18H0V0zm2 2v14h20V2L12 11 2 2zm0 0l10 9 10-9H2z"/>
            </svg>
          </a>
        </div>
        <div
          className="chat-input-area"
          role="button"
          tabIndex={0}
          onClick={handleInputActivate}
          onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleInputActivate() } }}
          style={{
            background: '#f2f2f2',
            borderRadius: 20,
            height: 38,
            flex: 1,
            minWidth: 0,
            display: 'flex',
            alignItems: 'center',
            padding: '0 16px',
            cursor: 'pointer',
          }}
        >
          <span style={{ fontSize: 16.376, color: '#090909', opacity: 0.4 }}>Message...</span>
        </div>
      </div>
    </div>
  )
}

/* ── Skill tag (icon + background) ───────────────────────────────────────── */
function SkillTag({ logo, width, fill }) {
  return (
    <div style={{ position: 'relative', width, height: fill ? '100%' : 60, flexShrink: 0 }}>
      <img src={A.rectangle86} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
      <img src={logo}          alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
    </div>
  )
}

/* ── About panel ──────────────────────────────────────────────────────────── */
function AboutPanel({ mobile = false }) {
  const tags = [
    { logo: A.rectangle87, w: 122.356 },
    { logo: A.rectangle88, w: 122.836 },
    { logo: A.rectangle89, w: 121.876 },
    { logo: A.rectangle90, w: 122.836 },
    { logo: A.rectangle91, w: 122.356 },
  ]

  return (
    <div style={{ width: mobile ? '100%' : 627 }}>
      {/* Profile photo, with "About" label + name stacked to its right */}
      <div style={{ display: 'flex', alignItems: 'flex-end', gap: 17, marginBottom: 20 }}>
        <div style={{ position: 'relative', width: 89, height: 89, borderRadius: 0, overflow: 'hidden', flexShrink: 0 }}>
          <img
            src={A.rectangle18}
            alt="Profile"
            style={{ position: 'absolute', width: '100%', height: '150.24%', left: 0, top: '-4.46%', maxWidth: 'none' }}
          />
        </div>
        <div>
          <p style={{ fontSize: 16.376, color: '#494e5b', fontWeight: 400, letterSpacing: '0.07em', margin: 0 }}>About</p>
          <p style={{ fontSize: 16.376, color: '#e9efff', fontWeight: 700, margin: 0 }}>Lloyd Jordano Wright</p>
        </div>
      </div>

      {/* Bio text */}
      <div style={{ fontSize: 16.376, color: '#e9efff', fontWeight: 300, lineHeight: 1.65, maxWidth: 627 }}>
        <p>
          Born in Ecuador, raised in South Africa, and educated in the Philippines and the United States,
          with experience spanning startups, freelance design, and software development for architecture and urban planning.
        </p>
        <br />
        <p>
          Currently pursuing a Bachelor of Science in Arts, Technology and the Business of Innovation
          at the University of Southern California.
        </p>
      </div>

      {/* Short divider — CSS line extending to right edge (692px wide) */}
      <div style={{ width: mobile ? '100%' : 692, height: 1, background: 'rgba(73,78,91,0.35)', margin: '24px 0' }} />

      {/* Skill tags */}
      {mobile ? (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
          {tags.map(({ logo, w }, i) => (
            <div key={i} style={{ aspectRatio: `${w} / 60`, position: 'relative' }}><SkillTag logo={logo} width="100%" fill /></div>
          ))}
        </div>
      ) : (
        <div style={{ display: 'flex', gap: 13.5 }}>
          {tags.map(({ logo, w }, i) => (
            <SkillTag key={i} logo={logo} width={w} />
          ))}
        </div>
      )}
    </div>
  )
}

/* ── Scroll-to-top on plain navigation. Skipped when the incoming navigation
   carries a scrollTo target (HomePage's own arrival effect handles that
   case instead), so "NEW"/product-page visits start at the top while
   Projects/About/Contact cross-page jumps land on their target section. ── */
function ScrollManager() {
  const location = useLocation()
  useEffect(() => {
    if (!location.state?.scrollTo) window.scrollTo(0, 0)
  }, [location.pathname]) // eslint-disable-line react-hooks/exhaustive-deps
  return null
}

/* ── DesktopHome ─────────────────────────────────────────────────────────────── */
function DesktopHome() {
  const time      = useLATime()
  const location  = useLocation()
  const navigate  = useNavigate()
  usePageZoom()
  const TOTAL_PROJECTS = HERO_PROJECTS.length
  const [activeProject, setActiveProject] = useState(0)
  // displayProject lags activeProject by HERO_FADE_MS — content only swaps once
  // the fade-out has finished, so the crossfade never shows a hard cut.
  const [displayProject, setDisplayProject] = useState(0)
  const [heroFading, setHeroFading] = useState(false)
  const heroFadeTimer = useRef(null)
  useEffect(() => () => clearTimeout(heroFadeTimer.current), [])

  const goToProject = (index) => {
    const next = ((index % TOTAL_PROJECTS) + TOTAL_PROJECTS) % TOTAL_PROJECTS
    if (next === activeProject) return
    setActiveProject(next)
    setHeroFading(true)
    clearTimeout(heroFadeTimer.current)
    heroFadeTimer.current = setTimeout(() => {
      setDisplayProject(next)
      setHeroFading(false)
    }, HERO_FADE_MS)
  }
  const prevProject = () => goToProject(activeProject - 1)
  const nextProject = () => goToProject(activeProject + 1)
  const heroFadeStyle = { opacity: heroFading ? 0 : 1, transition: `opacity ${HERO_FADE_MS}ms ease` }

  const [contactPulse, setContactPulse] = useState(false)
  const scrollToId = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
  // Same-page "Contact" clicks dispatch this event (see StickyNav in shared.jsx).
  useEffect(() => {
    const handler = () => setContactPulse(true)
    window.addEventListener('contact-pulse', handler)
    return () => window.removeEventListener('contact-pulse', handler)
  }, [])

  // Cross-page arrival: a nav click from a product page navigates here with
  // { scrollTo, pulseContact } in location.state. Finish the job once mounted,
  // then clear the state so back/forward navigation doesn't re-trigger it.
  useEffect(() => {
    const state = location.state
    if (!state?.scrollTo) return
    requestAnimationFrame(() => {
      scrollToId(state.scrollTo)
      if (state.pulseContact) setContactPulse(true)
    })
    navigate(location.pathname, { replace: true, state: null })
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  // Hero sconce clip height: measured against the actual grid position (rather
  // than a hardcoded Figma pixel value) since webfont swap-in reflows the
  // header's tagline and shifts where the grid starts by several px.
  const HERO_CLIP_TOP = 138
  const [heroClipHeight, setHeroClipHeight] = useState(981)
  useEffect(() => {
    const measure = () => {
      const work = document.getElementById('work')
      if (!work) return
      const top = work.getBoundingClientRect().top + window.scrollY
      setHeroClipHeight(Math.ceil(top) + 1) // +1px buffer so it always slightly overlaps rather than gaps
    }
    measure()
    document.fonts?.ready?.then(measure)
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [])
  const heroCropBoxHeight = heroClipHeight - HERO_CLIP_TOP
  const HERO_CROP_BOTTOM = 50
  const heroVisibleHeight = heroClipHeight - HERO_CROP_BOTTOM
  const HERO_IMG_SCALE = 0.95
  // Width/left stay relative to the (fixed) 996px box width. Height/top are relative
  // to the (dynamic) box height, but scaled by 832/heroCropBoxHeight so the image's
  // own pixel dimensions — and therefore its aspect ratio — stay constant regardless
  // of how tall the box ends up being.
  const heroImgWidthPct = 158.66 * HERO_IMG_SCALE
  const heroImgHeightPct = 253.25 * (832 / heroCropBoxHeight) * HERO_IMG_SCALE
  const heroImgLeftPct = -16.98 * HERO_IMG_SCALE
  const heroImgTopPct = -60.94 * (832 / heroCropBoxHeight) * HERO_IMG_SCALE

  return (
    <div
      className="page"
      style={{ fontFamily: '"neue-haas-unica", "Helvetica Neue", Arial, sans-serif', background: '#090909' }}
    >
      {/* ── Hero product image — clipped flush to the grid's actual top edge.
          Height is measured live against #work (see heroClipHeight above) rather
          than a hardcoded Figma pixel value, since webfont swap-in reflows the
          header's tagline and shifts the grid's start position by several px —
          a static number kept leaving (or overshooting) a seam here.
          Crossfades between products via heroFadeStyle; each product uses its
          own Figma-exact crop (sconce: percentage crop box; bedkassi: fixed
          centered box, node 84:1043, mirrored per its rotate-180+scaleY(-1);
          transfit: flattened MacBook mockup export, node 297:738, since it's a
          composite of nested UI elements rather than a simple photo). ── */}
      <div style={{ position: 'absolute', top: 0, left: 0, width: 1440, height: heroVisibleHeight, overflow: 'hidden', pointerEvents: 'none', zIndex: 55 }}>
        <div style={heroFadeStyle}>
          {displayProject === 0 && (
            <div style={{ position: 'absolute', top: HERO_CLIP_TOP, left: 444, width: 996, height: heroCropBoxHeight, overflow: 'hidden' }}>
              <img
                src={A.sconce}
                alt="Wall Sconce"
                style={{ position: 'absolute', width: `${heroImgWidthPct}%`, height: `${heroImgHeightPct}%`, left: `${heroImgLeftPct}%`, top: `${heroImgTopPct}%`, maxWidth: 'none', display: 'block' }}
              />
            </div>
          )}
          {displayProject === 1 && (
            <div style={{ position: 'absolute', left: -33, top: 16, width: 1984, height: 1320 }}>
              <img
                src={A.bedkassiHero}
                alt="Adjustable Bedside Table"
                style={{ width: '100%', height: '100%', objectFit: 'cover', transform: 'scaleX(-1)', display: 'block' }}
              />
            </div>
          )}
          {displayProject === 2 && (
            /* Figma node 297:738 "transfit hero image" ("header frame 3", 292:359).
               Exported in-context against its ancestor's 1440x970 canvas (matching
               this hero section's own coordinate frame 1:1), at 4x scale (5760x3880) —
               confirmed not to exceed native resolution of the embedded raster content
               (the dashboard screenshot needs ~2222x2078px at 4x; source is 3024x1964,
               comfortable headroom) while vector chassis/text render losslessly at any
               scale. Background matted to transparent via flood-fill from the image
               edges (canvas was a uniform near-black, not the laptop's own bezel). */
            <div style={{ position: 'absolute', left: 0, top: 0, width: 1440, height: 970 }}>
              <img
                src={A.transfitHero}
                alt="Public Transit Planning"
                style={{ width: '100%', height: '100%', display: 'block' }}
              />
            </div>
          )}
        </div>
      </div>

      <LogoBookmark />

      {/* ── Header (scrolls away with page) ──────────────────────────────────
          Figma measurements (from page top):
            name   → y = 16 px
            status → y = 41 px  (25 px below name top ≈ 5 px gap below ~20 px line)
            tagline→ y = 79 px  (38 px below status top ≈ 18 px gap below ~20 px line)
            divider→ y = 232 px → paddingBottom fills the remaining space
      ────────────────────────────────────────────────────────────────────── */}
      <header style={{
        paddingTop: 16,
        paddingLeft: 19,
        paddingRight: 134,   // 114 px flag + 20 px breathing room
        paddingBottom: 37,
      }}>
        <HeaderIdentity time={time} />

        {/* Tagline — 18 px gap brings it to Figma y=79 */}
        <p style={{ margin: '18px 0 0', fontSize: 38.375, color: '#ffffff', fontWeight: 400, lineHeight: 1.14, letterSpacing: '-0.01em', maxWidth: 1215 }}>
          <LetterReveal
            text="Hi, I'm Jordano, a designer creating physical and digital products that bring new ideas into everyday life."
            spread={600}
          />
        </p>
      </header>

      {/* ── Full-width divider (Figma y=232, edge-to-edge, no padding) ── */}
      <div style={{ height: 1, background: 'rgba(73,78,91,0.35)' }} />

      <StickyNav />

      {/* ── Wall sconce / hero section ──
          overflow: visible so the sconce container's top:-94 extends above into
          the nav area (z:55 > nav z:50, so it renders in front of the nav bg).
          SunFans text is clipped separately to prevent it bleeding below.
      ── */}
      <section id="projects" style={{ position: 'relative', height: 728 }}>

        {/* z:1 — Product lettering, clipped to section bounds. key={displayProject}
            forces a remount on swap, replaying the same scramble-reveal effect
            used on the initial page-load text (reused per the feature request
            rather than building a separate transition). letterFontSize lets an
            individual word (e.g. "Bedkassi", one char longer than the others)
            opt into a slightly smaller size so it doesn't overflow/clip more
            than "SunFans"/"Transfit" already do — SunFans and Transfit are
            untouched, keeping their existing fontSize. letterTop similarly
            lets an individual word nudge its vertical position (Bedkassi:
            +2px per Figma) without affecting the other two. */}
        <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 1, ...heroFadeStyle }}>
          <p style={{
            position: 'absolute',
            left: 0, top: HERO_PROJECTS[displayProject].letterTop ?? 474,
            fontFamily: '"eco", Georgia, serif',
            fontSize: HERO_PROJECTS[displayProject].letterFontSize || 317.799, fontWeight: 400, color: '#e9efff',
            lineHeight: 1, whiteSpace: 'nowrap', margin: 0,
          }}>
            <LetterReveal key={displayProject} text={HERO_PROJECTS[displayProject].lettering} startDelay={150} spread={350} />
          </p>
        </div>

        {/* z:60 — Product labels */}
        <div style={{ position: 'absolute', zIndex: 60, left: 29, top: 60, ...heroFadeStyle }}>
          <p style={{ fontSize: 16.376, color: '#494e5b', fontWeight: 400, letterSpacing: '0.07em' }}>{HERO_PROJECTS[displayProject].category}</p>
          <p style={{ fontSize: 43.887, color: '#e9efff', fontWeight: 400, lineHeight: 1.05, letterSpacing: '-0.015em' }}>
            {HERO_PROJECTS[displayProject].titleLines.map((line, i) => (
              <span key={i} style={{ display: 'block' }}>{line}</span>
            ))}
          </p>
        </div>

        {/* z:65 — Left/Right nav arrows + active carousel dots */}
        <div style={{ position: 'absolute', zIndex: 65, left: 50, top: 325, width: 1360, height: 390 }}>
          <svg viewBox="0 0 1360 390" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg" overflow="visible" style={{ display: 'block' }}>
            {/* Carousel dots: left=0, mid=1, right=2 */}
            <circle cx="1293.5" cy="382.5" r="7.5" fill={activeProject === 0 ? '#3F9F53' : '#494E5B'} style={{ transition: 'fill 0.2s' }} />
            <ellipse cx="1323"   cy="382.5" rx="8" ry="7.5" fill={activeProject === 1 ? '#3F9F53' : '#494E5B'} style={{ transition: 'fill 0.2s' }} />
            <circle cx="1352.5" cy="382.5" r="7.5" fill={activeProject === 2 ? '#3F9F53' : '#494E5B'} style={{ transition: 'fill 0.2s' }} />
            {/* Left arrow */}
            <g className="arrow-btn" role="button" aria-label="Previous project" onClick={prevProject}>
              <circle cx="26.1016" cy="26.1016" r="26.1016" fill="#D9D9D9" fillOpacity="0.2" />
              <path d="M15.163 27.5579C14.3588 26.7536 14.3588 25.4496 15.1631 24.6453L28.2696 11.539C29.0739 10.7347 30.3779 10.7347 31.1821 11.539C31.9864 12.3433 31.9864 13.6473 31.1821 14.4515L19.5319 26.1016L31.182 37.7519C31.9862 38.5562 31.9862 39.8601 31.1819 40.6644C30.3777 41.4687 29.0737 41.4687 28.2694 40.6644L15.163 27.5579ZM18.4546 26.1016L18.4546 28.1611L16.6193 28.1611L16.6193 26.1016L16.6193 24.0421L18.4546 24.0422L18.4546 26.1016Z" fill="white" />
            </g>
            {/* Right arrow */}
            <g className="arrow-btn" role="button" aria-label="Next project" onClick={nextProject}>
              <circle cx="1314.1" cy="26.1017" r="26.1016" fill="#D9D9D9" fillOpacity="0.2" />
              <path d="M1325.04 27.5579C1325.84 26.7537 1325.84 25.4497 1325.04 24.6454L1311.93 11.539C1311.13 10.7348 1309.83 10.7348 1309.02 11.5391C1308.22 12.3433 1308.22 13.6473 1309.02 14.4516L1320.67 26.1017L1309.02 37.7519C1308.22 38.5562 1308.22 39.8602 1309.02 40.6645C1309.83 41.4688 1311.13 41.4687 1311.93 40.6645L1325.04 27.5579ZM1321.75 26.1017L1321.75 28.1612L1323.58 28.1612L1323.58 26.1017L1323.58 24.0422L1321.75 24.0422L1321.75 26.1017Z" fill="white" />
            </g>
          </svg>
        </div>
      </section>

      {/* ── Photo grid ── */}
      <section id="work" style={{ scrollMarginTop: 40 }}>
        <PhotoGrid />
      </section>

      {/* ── About + Chat ── */}
      <section
        id="about"
        style={{ position: 'relative', height: 711, overflow: 'hidden', scrollMarginTop: 40 }}
      >
        {/* "lju" display text (decorative, behind content)
            Figma: left=728 top=2531 → section starts at y=2050 → relative top=481 */}
        {/* "lju" and "u" absolutely positioned per Figma: lju@x=728, u@x=1241 */}
        <div style={{
          position: 'absolute',
          top: 481, left: 0, right: 0,
          fontFamily: '"eco", Georgia, serif',
          fontSize: 292.935,
          fontWeight: 400,
          color: '#494e5b',
          lineHeight: 1,
          whiteSpace: 'nowrap',
          pointerEvents: 'none',
          zIndex: 0,
        }}>
          <span style={{ position: 'absolute', left: 728 }}>lju</span>
          <span style={{ position: 'absolute', left: 1241 }}>u</span>
        </div>

        {/* Content row (above the lju text) */}
        <div style={{
          position: 'relative', zIndex: 1,
          display: 'flex',
          paddingLeft: 33,
          paddingTop: 68,
        }}>
          <ChatWidget />

          {/* About panel: Figma x=748 → gap after chat (33+671=704) = 748-704=44 px */}
          <div style={{ paddingLeft: 44 }}>
            <AboutPanel />
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer id="contact" style={{ scrollMarginTop: 40 }}>
        <Divider />
        {/* Figma: divider y=2759, all text y=2778 → top:19. Page bottom y=2820 → height:61 */}
        <div style={{ position: 'relative', height: 61 }}>
          <a
            href="mailto:jordano.wright07@gmail.com"
            className={contactPulse ? 'contact-link contact-pulse' : 'contact-link'}
            onAnimationEnd={() => setContactPulse(false)}
            style={{
              position: 'absolute', left: 55, top: 19,
              fontSize: 16.376, fontWeight: 400, textDecoration: 'none', whiteSpace: 'nowrap',
            }}>jordano.wright07@gmail.com</a>
          <a
            href="https://www.linkedin.com/in/lloyd-jordano-wright"
            target="_blank"
            rel="noreferrer"
            className={contactPulse ? 'contact-link contact-pulse' : 'contact-link'}
            style={{
              position: 'absolute', left: 280, top: 19,
              fontSize: 16.376, fontWeight: 400, textDecoration: 'none', whiteSpace: 'nowrap',
            }}>LinkedIn</a>
          <a
            href="https://instagram.com/jordano.wright"
            target="_blank"
            rel="noreferrer"
            className={contactPulse ? 'contact-link contact-pulse' : 'contact-link'}
            style={{
              position: 'absolute', left: 358, top: 19,
              fontSize: 16.376, fontWeight: 400, textDecoration: 'none', whiteSpace: 'nowrap',
            }}>Instagram</a>
          <a href="#" style={{
            position: 'absolute', left: 1163, top: 19,
            fontSize: 16.376, color: '#494e5b', fontWeight: 400, textDecoration: 'none', whiteSpace: 'nowrap',
          }}>Privacy Policy</a>
          <span style={{
            position: 'absolute', left: 1290, top: 19,
            fontSize: 16.376, color: '#494e5b', fontWeight: 400, whiteSpace: 'nowrap',
          }}>© 2025-2026 LJW</span>
        </div>
      </footer>
    </div>
  )
}

/* ── Mobile homepage ──────────────────────────────────────────────────────
   Same content as DesktopHome, restacked for phones: hero carousel (with
   swipe), a 2-column project grid that keeps each tile's desktop aspect
   ratio (so the Figma crops still hold), then chat + about full-width. ── */
const MOBILE_HERO = [
  { img: A.sconce, fit: 'cover', position: '50% 45%', scale: 1.45 },
  { img: A.bedkassiHero, fit: 'cover', position: '35% 50%', flip: true },
  { img: A.transfitHero, fit: 'contain', position: '50% 35%', scale: 1.15 },
]

const MOBILE_TILES = [
  { desc: 'Growing up across Ecuador, South Africa, and the Philippines gave me something most design curricula can’t teach.' },
  { slug: 'transfit', category: 'Software Engineering', title: 'Transfit', ratio: 1, img: A.rectangle8 },
  { slug: 'sunfans', category: 'Industrial Design', title: 'Sunfan', ratio: 1, img: A.rectangle15, crop: { width: '313.59%', height: '405.94%', left: '-51.98%', top: '-152.87%' } },
  { slug: 'eco-tourism-hub', category: 'Sustainable Architecture', title: 'Eco-Tourism Hub', ratio: 2, span: true, img: A.rectangle9, crop: { width: '128.89%', height: '145%', left: '0%', top: '0%' } },
  { slug: 'healhaze', category: 'Branding & Product Design', title: 'HealHaze', ratio: 0.5, img: A.rectangle12, crop: { width: '112.5%', height: '100%', left: '-12.49%', top: '-0.04%' } },
  { slug: 'banana-grip', category: 'Product Design', title: 'NonSlip BananaGrip', ratio: 0.5, img: A.rectangle11, crop: { width: '298.98%', height: '100%', left: '-34.36%', top: '-0.06%' } },
  { desc: 'From childhood sketchbooks to 3D renders and material workshops, the drive has always been the same. To create things that earn their place in the world.', logoRight: true },
  { slug: 'speaker', category: 'Industrial Design', title: 'Speaker', ratio: 1, img: A.rectangle14, crop: { width: '69.88%', height: '101.35%', left: '15.16%', top: '-0.08%' } },
  { slug: 'bedkassi', category: 'Furniture Design', title: 'Bedkassi', ratio: 1, img: A.rectangle13, crop: { width: '150.32%', height: '100%', left: '-25.17%', top: '0.01%' } },
]

function MobilePhotoGrid() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
      {MOBILE_TILES.map((t, i) => {
        if (t.desc) {
          const logo = <img src={A.group1White} alt="LJW" style={{ width: 72, height: 22, marginLeft: t.logoRight ? 'auto' : 0 }} />
          const rule = <div style={{ height: 1, background: 'rgba(255,255,255,0.15)', margin: '20px 0' }} />
          return (
            <div key={i} style={{ gridColumn: 'span 2', padding: `36px ${GUTTER}px 32px`, display: 'flex', flexDirection: 'column' }}>
              {!t.logoRight && <>{logo}{rule}</>}
              <p style={{ fontSize: 18, lineHeight: 1.45, color: '#fff' }}>{t.desc}</p>
              {t.logoRight && <>{rule}{logo}</>}
            </div>
          )
        }
        return (
          <Link key={i} to={`/projects/${t.slug}`} className="m-tile" style={{ aspectRatio: String(t.ratio), gridColumn: t.span ? 'span 2' : undefined }}>
            {t.crop
              ? <img src={t.img} alt="" style={{ position: 'absolute', maxWidth: 'none', ...t.crop }} />
              : <img src={t.img} alt="" className="cell-img" />}
            <div className="m-tile-label">
              <span style={{ fontSize: 10, color: '#e9efff', letterSpacing: '0.1em', opacity: 0.7 }}>{t.category}</span>
              <span style={{ fontSize: 17, color: '#e9efff' }}>{t.title}</span>
            </div>
          </Link>
        )
      })}
    </div>
  )
}

function MobileHome() {
  const location = useLocation()
  const navigate = useNavigate()
  const [active, setActive] = useState(0)
  const [shown, setShown] = useState(0)
  const [fading, setFading] = useState(false)
  const fadeTimer = useRef(null)
  const touchX = useRef(null)
  const [contactPulse, setContactPulse] = useState(false)
  useEffect(() => () => clearTimeout(fadeTimer.current), [])

  const goTo = (index) => {
    const next = ((index % HERO_PROJECTS.length) + HERO_PROJECTS.length) % HERO_PROJECTS.length
    if (next === active) return
    setActive(next)
    setFading(true)
    clearTimeout(fadeTimer.current)
    fadeTimer.current = setTimeout(() => { setShown(next); setFading(false) }, HERO_FADE_MS)
  }
  const fade = { opacity: fading ? 0 : 1, transition: `opacity ${HERO_FADE_MS}ms ease` }

  useEffect(() => {
    const handler = () => setContactPulse(true)
    window.addEventListener('contact-pulse', handler)
    return () => window.removeEventListener('contact-pulse', handler)
  }, [])
  useEffect(() => {
    const state = location.state
    if (!state?.scrollTo) return
    requestAnimationFrame(() => {
      document.getElementById(state.scrollTo)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      if (state.pulseContact) setContactPulse(true)
    })
    navigate(location.pathname, { replace: true, state: null })
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const project = HERO_PROJECTS[shown]
  const hero = MOBILE_HERO[shown]
  const arrow = (dir) => (
    <button
      aria-label={dir < 0 ? 'Previous project' : 'Next project'}
      onClick={() => goTo(active + dir)}
      style={{ width: 44, height: 44, borderRadius: '50%', border: 'none', background: 'rgba(217,217,217,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
    >
      <svg width="14" height="22" viewBox="0 0 14 22" fill="none" style={{ transform: dir > 0 ? 'scaleX(-1)' : undefined }}>
        <path d="M11.5 2L2.5 11L11.5 20" stroke="white" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  )

  return (
    <MobileShell
      headerExtra={
        <p style={{ marginTop: 16, fontSize: 26, color: '#fff', lineHeight: 1.15, letterSpacing: '-0.01em' }}>
          <LetterReveal text="Hi, I'm Jordano, a designer creating physical and digital products that bring new ideas into everyday life." spread={600} />
        </p>
      }
      footer={<MobileFooter pulse={contactPulse} onPulseEnd={() => setContactPulse(false)} />}
    >
      <section id="projects" style={{ paddingTop: 24 }}>
        <div style={{ padding: `0 ${GUTTER}px`, minHeight: 92, ...fade }}>
          <p style={{ fontSize: 13, color: '#494e5b', letterSpacing: '0.07em' }}>{project.category}</p>
          <p style={{ fontSize: 34, color: '#e9efff', lineHeight: 1.05, letterSpacing: '-0.015em', marginTop: 2 }}>
            {project.titleLines.map((l, i) => <span key={i} style={{ display: 'block' }}>{l}</span>)}
          </p>
        </div>

        <div
          onTouchStart={(e) => { touchX.current = e.touches[0].clientX }}
          onTouchEnd={(e) => {
            if (touchX.current == null) return
            const dx = e.changedTouches[0].clientX - touchX.current
            if (Math.abs(dx) > 40) goTo(active + (dx < 0 ? 1 : -1))
            touchX.current = null
          }}
          style={{ position: 'relative', marginTop: 16, aspectRatio: '4 / 5', overflow: 'hidden' }}
        >
          <p style={{
            position: 'absolute', left: 0, bottom: -14, margin: 0, pointerEvents: 'none',
            fontFamily: '"eco", Georgia, serif', fontSize: '31vw', color: '#e9efff', lineHeight: 1,
            whiteSpace: 'nowrap', ...fade,
          }}>
            <LetterReveal key={shown} text={project.lettering} startDelay={150} spread={350} />
          </p>
          <div style={{ position: 'absolute', inset: 0, ...fade }}>
            <img src={hero.img} alt={project.titleLines.join(' ')} style={{ width: '100%', height: '100%', objectFit: hero.fit, objectPosition: hero.position, transform: `${hero.flip ? 'scaleX(-1)' : ''} scale(${hero.scale || 1})` }} />
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: `14px ${GUTTER}px 22px` }}>
          {arrow(-1)}
          <div style={{ display: 'flex', gap: 10 }}>
            {HERO_PROJECTS.map((_, i) => (
              <button key={i} aria-label={`Show project ${i + 1}`} onClick={() => goTo(i)} style={{ width: 12, height: 12, padding: 0, border: 'none', borderRadius: '50%', background: active === i ? '#3F9F53' : '#494E5B', transition: 'background 0.2s', cursor: 'pointer' }} />
            ))}
          </div>
          {arrow(1)}
        </div>
      </section>

      <section id="work" style={{ scrollMarginTop: 40 }}>
        <MobilePhotoGrid />
      </section>

      <section id="about" style={{ scrollMarginTop: 40, padding: `40px ${GUTTER}px 48px`, display: 'flex', flexDirection: 'column', gap: 40 }}>
        <ChatWidget mobile />
        <AboutPanel mobile />
      </section>
    </MobileShell>
  )
}

function HomePage() {
  return useIsMobile() ? <MobileHome /> : <DesktopHome />
}

/* ── App ──────────────────────────────────────────────────────────────────── */
export default function App() {
  return (
    <BrowserRouter>
      <ScrollManager />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/projects/transfit" element={<TransfitPage />} />
        <Route path="/projects/eco-tourism-hub" element={<EcoCenterPage />} />
        <Route path="/projects/healhaze" element={<HealHazePage />} />
        <Route path="/projects/sunfans" element={<SunfanPage />} />
        <Route path="/projects/banana-grip" element={<BananaGripPage />} />
        <Route path="/projects/speaker" element={<SpeakerPage />} />
        <Route path="/projects/bedkassi" element={<BedkassiPage />} />
        <Route path="/projects/:slug" element={<ProductPage />} />
      </Routes>
    </BrowserRouter>
  )
}
