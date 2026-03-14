---
trigger: glob
globs: /front_end/**
---

# Front-end UI Guide — Chess Premier (Tailwind-only + Locked Tokens)

## 1 Design Tokens — STRICT
MUST use ONLY the approved tokens (no new colors):
- bg: `--color-bg`
- neon: `--color-neon`
- sec: `--color-sec`
- muted: `--color-muted`
- border glass: `--color-border-glass`
- surface: `--color-surface`
- surface hover: `--color-surface-h`
- green: `--color-green`
- amber: `--color-amber`
- red: `--color-red`

### Forbidden
- ❌ No raw `#hex`, `rgb()`, `rgba()` for UI colors in TSX/CSS.
- ❌ No adding new palette tokens without approval.
- ✅ Gradients only if they match the predefined gradients.

## 2 Typography — type-* ONLY
- All UI text MUST use existing `type-*` utility classes:
  `type-h1`, `type-h2`, `type-h3`, `type-h3-spaced`,
  `type-body`, `type-body-bold`, `type-body-sm`, `type-body-sm-medium`,
  `type-caption`, `type-caption-medium`, `type-caption-heavy`,
  `type-button`, `type-mono`, `type-mono-sm`, `type-logo`
- ❌ No new typography classes.
- ❌ No inline typography styles.

## 3) Styling — Tailwind inline in TSX ONLY
- All styling MUST be written as Tailwind classes in `className` inside TSX.
- ❌ No `style={{ ... }}` for visual styling (colors, spacing, font, border, shadow).
- ❌ No custom CSS files/modules for components.
- ✅ Allowed exceptions:
  - Global tokens in `index.css` (`@theme`)
  - Predefined global keyframes/utilities (e.g., `glow-pulse`) already in the system

## 4 HTML → TSX + Tailwind Conversion (MANDATORY)
If any design is given as `.html` or raw HTML snippet:
- MUST convert to React/Next.js TSX components
- MUST translate all styles into Tailwind classes inline
- MUST comply with locked tokens + `type-*` typography
- DO NOT output “keep as HTML/CSS” as final implementation

## 5 Interaction & Motion (Policy)
- Use `motion` (`motion/react`) for animations. DO NOT use `framer-motion`.
- Hover transitions should follow the system:
  - button: ~0.18s
  - card: ~0.22s + translateY (-4px to -5px) when hover
- Glass cards/panels must follow the standard glassmorphism recipe:
  - background: `--color-surface`
  - border: `--color-border-glass`
  - blur: 20px
  - radius: 16px

## 6 Compatibility with existing rules
- This rule is additive: Clean Code + TDD + No recursion + Testing rules still apply.
- If conflict occurs, prefer: (1) test rules, (2) UI lockdown, (3) clean code.