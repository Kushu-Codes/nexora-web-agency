# Nexora Web Agency

An ultra-modern, 3D-animated marketing site built with React + Vite,
Three.js (`@react-three/fiber` + `@react-three/drei`), Framer Motion,
and Tailwind CSS.

## Getting started

```bash
npm install
npm run dev
```

Open the printed local URL (usually `http://localhost:5173`).

## Build for production

```bash
npm run build
npm run preview
```

The production build is emitted to `dist/`. It's a fully static site —
deploy the `dist/` folder to Vercel, Netlify, Cloudflare Pages, or any
static host.

## What's inside

- `src/components/Hero.jsx` + `HeroScene.jsx` — full-screen animated
  network of glowing nodes/connections, staggered headline reveal,
  magnetic 3D-tilt CTA.
- `src/components/Services.jsx` + `Icon3D.jsx` — scroll-triggered
  service grid with rotating 3D icons per card.
- `src/components/Work.jsx` — horizontal swipeable/scrollable project
  carousel with 3D tilt-on-hover and a modal detail view.
- `src/components/Process.jsx` — Discover → Design → Develop → Launch
  timeline with a connecting line that draws itself on scroll.
- `src/components/Testimonials.jsx` — auto-rotating, swipeable 3D card
  stack.
- `src/components/Contact.jsx` + `ParticleField.jsx` — closing CTA with
  floating-label form inputs and an ambient particle field.
- `src/components/CustomCursor.jsx` — magnetic custom cursor
  (desktop only — automatically disabled on touch devices).
- `src/hooks/useDeviceCapability.js` — detects touch/mobile and caps
  device-pixel-ratio + node/particle counts for the 3D scenes
  accordingly (see "Performance" below).

## Performance & mobile behavior

- Touch/mobile devices are detected via `useDeviceCapability`.
- 3D scenes cap `dpr` to `[1, 1.5]` on mobile vs `[1, 2]` on desktop.
- Node/particle counts are reduced on mobile (hero network mesh: 90 →
  40 nodes; contact particle field: 200 → 60 particles).
- Mouse-parallax on the hero scene and project tilt cards is disabled
  on touch devices; the custom cursor is disabled entirely on touch.
- The project carousel uses native scroll-snap, which is swipeable by
  default on touch and drag/scroll-friendly on desktop trackpads.
- `prefers-reduced-motion` is respected globally via CSS.

## Brand tokens

Colors, fonts, and gradients live in `tailwind.config.js` under
`theme.extend` — edit `colors.void`, `colors.violet`, `colors.cyan`,
`colors.hot` to adjust the palette.
