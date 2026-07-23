import { A } from './assets.js'

/* ── Product detail pages ─────────────────────────────────────────────────
   Each entry maps 1:1 to a project-grid tile (see PhotoGrid in App.jsx) —
   same image, category, and title already established there. Layout matches
   Figma node 90:1208 "Frame 8" (the one product-detail template in the
   file); that template's own image slots were unfilled placeholders in
   Figma, so each product page reuses its own grid image rather than
   inventing photography that doesn't exist. "description" is a placeholder
   — there's no per-product project narrative anywhere in Figma or the
   codebase to draw from; replace with real copy. ── */
export const PRODUCTS = [
  {
    slug: 'sunfans',
    category: 'Industrial Design',
    title: 'Sunfan',
    lettering: 'Sunfan',
    image: A.rectangle15,
    description: 'An industrial design exploration in lighting and form.',
  },
  {
    slug: 'transfit',
    category: 'Software Engineering',
    title: 'Transfit',
    lettering: 'Transfit',
    image: A.rectangle8,
    description: 'A transit planning software platform, later acquired.',
  },
  {
    slug: 'eco-tourism-hub',
    category: 'Sustainable Architecture',
    title: 'Eco-Tourism Hub',
    lettering: 'EcoTourism',
    image: A.rectangle9,
    description: "A former slaughterhouse in Sant'Angelo in Pontano, Italy, redesigned into an eco-tourism hub.",
  },
  {
    slug: 'healhaze',
    category: 'Branding & Product Design',
    title: 'HealHaze',
    lettering: 'HealHaze',
    image: A.rectangle12,
    description: 'A branding and product design project built around calm, considered form.',
  },
  {
    slug: 'banana-grip',
    category: 'Product Design',
    title: 'NonSlip BananaGrip',
    lettering: 'BananaGrip',
    image: A.rectangle11,
    description: 'A product design study in ergonomic, non-slip grip.',
  },
  {
    slug: 'speaker',
    category: 'Industrial Design',
    title: 'Speaker',
    lettering: 'Speaker',
    image: A.rectangle14,
    description: 'An industrial design speaker concept.',
  },
  {
    slug: 'bedkassi',
    category: 'Furniture Design',
    title: 'Bedkassi',
    lettering: 'Bedkassi',
    image: A.rectangle13,
    description: 'An adjustable bedside table designed for small spaces.',
  },
]

export function getProduct(slug) {
  return PRODUCTS.find((p) => p.slug === slug)
}
