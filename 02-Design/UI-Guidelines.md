# UI Guidelines & Motion Standards

## 1. Visual Hierarchy & Spacing
- **Grid System**: 8pt grid system across all layouts (`8px`, `16px`, `24px`, `32px`, `48px`).
- **Border Radius Tokens**: `sm` (4px), `md` (8px), `lg` (12px), `xl2` (24px / 1.5rem), `3xl` (30px / 1.875rem), `full` (9999px).

## 2. Motion & Micro-Interactions Standards
- **Duration Cap**: Keep all transitions and Framer Motion animations strictly under `200ms – 250ms` (`duration: 0.25`, `ease: "easeOut"`).
- **Hover Lift**: Small lift (`y: -3px` or `y: -4px`) and scale (`scale: 1.01`). No exaggerated or jarring movement.
- **Button Feedback**: Tactile, slightly springy press effect (`whileTap: { scale: 0.98 }`).
- **Reduced Motion Fallback**: Always check `useReducedMotion()` from Framer Motion. When `reduceMotion` is true, omit `y` translation and scale effects entirely (`initial={false}`, `animate={{}}`).

## 3. Transparency & Contrast Rules
- **Legibility First**: WCAG recommends at least 4.5:1 contrast for normal body text. Ensure coffee tones do not reduce legibility.
- **Controlled Blur**: Use `backdrop-blur-xl` sparingly on headers, hero cards, and modal drawers. Avoid blur overuse on main reading text canvases.
- **Reduced Transparency Fallback**: For users with `prefers-reduced-transparency`, flatten glass panels into solid, opaque surfaces (`bg-[#f6efe7]`, `dark:bg-[#100d0c]`).

## 4. Responsive Breakpoints
- Mobile: `< 640px` (single column navigation, full screen reader view).
- Tablet: `640px - 1024px` (2-column library grid, expandable reader drawer).
- Desktop: `> 1024px` (multi-column grids, dual-page reader view options).

## 5. Reader Typography Standards
- Base reading font sizes: `14px`, `16px` (Default), `18px`, `20px`, `24px`.
- Line Heights: `1.4` (Compact), `1.6` (Optimal), `1.8` (Relaxed).
