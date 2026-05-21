---
tags: [architecture, stable]
updated: 2026-05-21
---

# Folder Structure

Where everything lives and what belongs where. The repo has two top-level concerns:
the **app** (`src/`) and this **vault** (`obsidian/`).

## Repo root

```
next16-claude-starter/
├── src/                     ← application code (see below)
├── public/                  ← static assets, icons, manifest
├── obsidian/                ← this Obsidian vault — ALL project documentation
├── .claude/settings.json    ← Claude Code hooks — automate the vault workflow
├── app config files         ← next.config.ts, tsconfig, eslint, postcss
├── README.md                ← project README → points into the vault
├── AGENTS.md                ← agent guide — breaking-change warning, hard rules, vault pointer
├── CLAUDE.md                ← Claude Code entry → @AGENTS.md
└── .cursorrules             ← Cursor entry → @AGENTS.md
```

All documentation lives in the vault. The root `AGENTS.md` / `CLAUDE.md` /
`.cursorrules` are thin shims that carry the hard rules and point into it —
see [[ai-agent-guide]]. `.claude/settings.json` holds hooks that enforce the
documentation workflow automatically — also see [[ai-agent-guide]].

## `src/` — application code

```
src/
├── app/                    # Next.js routes — keep lean, routing only
│   ├── layout.tsx          # Root layout — provider tree lives here
│   ├── page.tsx            # Route → delegates to a view
│   ├── loading.tsx         # Suspense fallback (enables streaming)
│   ├── error.tsx           # Route-segment error boundary
│   ├── not-found.tsx       # 404 page
│   ├── robots.ts           # → /robots.txt
│   ├── sitemap.ts          # → /sitemap.xml
│   ├── globals.css         # Tailwind v4 config + design tokens
│   └── favicon.ico
│
├── views/                  # Page-level components — one per route
│   ├── home.tsx            # HomeView (Server Component, demo)
│   └── home-showcase.tsx   # HomeShowcase — client animation leaf
│
├── layouts/                # Reusable layout wrappers
│   └── scroll-layout.tsx   # Lenis smooth-scroll wrapper
│
├── components/
│   ├── ui/                 # Design-system primitives (Button, Input…) — empty, add as needed
│   ├── common/             # Shared infrastructure (Cookie, grid, ReducedMotion, Skeletons)
│   └── animation/springs/  # ⚠️ Animation engine — #do-not-modify
│
├── hooks/                  # Custom hooks, grouped by domain
│   ├── animation/          # ⚠️ Animation hooks — #do-not-modify
│   ├── smooth-scroll/      # useScroll Zustand store
│   └── use-window-size.ts
│
├── lib/                    # Third-party client init / global config
│   ├── animation/ticker.ts # Shared app-wide requestAnimationFrame loop
│   ├── site.ts             # Site-wide SEO config (single source of truth)
│   └── springs/config.ts   # Global animation config
│
├── utils/                  # Pure utility functions (no side effects)
│   ├── animation/coords.ts
│   ├── seo/generate-page-metadata.ts · seo/structured-data.ts
│   ├── is-bot.ts · lvh.ts · math.ts · scroll-to.ts
│
├── types/                  # Shared TypeScript types
│   └── springs.ts
│
└── style/                  # Extra CSS layers imported into globals.css
    └── index.css
```

## Placement rules — where do I put a new file?

| I am adding… | It goes in… |
|--------------|-------------|
| A route | `app/<route>/page.tsx` — 3 lines, delegates to a view |
| A page's UI | `views/<page-name>.tsx` — see [[new-page]] |
| A reusable design primitive | `components/ui/` |
| Shared infra (provider-dependent) | `components/common/` |
| A feature-specific component | next to the feature, **not** in `components/` |
| A custom hook | `hooks/<domain>/` |
| A pure helper | `utils/<domain>/` |
| A shared type | `types/` |
| Mock/placeholder data | `src/data/mocks/<page-name>.ts` (create folder as needed) |
| A third-party client init | `lib/` |

## Do-not-modify zones

`components/animation/springs/` and `hooks/animation/` are the animation engine.
Treat them as a vendored library — consume them, never edit them. See [[animation-system]].

## Related

[[system-overview]] · [[component-conventions]] · [[routing]]
