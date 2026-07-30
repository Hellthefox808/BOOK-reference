# Design System – Coffee-Tone Visual System

## 1. Design Aesthetics & Philosophy
- **Vibe**: Elite, calm, minimal, book-centric, premium without excess.
- **Theme Palette**: Warm latte / mocha / espresso neutrals.
- **Micro-Interactions**: Restrained springy motion (< 200–250ms), subtle lift/scale on hover (`y: -4`, `scale: 1.01`), no exaggerated movement.
- **Glassmorphism**: Soft translucent panels (`bg-white/60`, `dark:bg-stone-950/40`, `backdrop-blur-xl`), soft borders (`border-stone-200/70`, `dark:border-stone-700/60`).
- **Accessibility & Fallbacks**:
  - Minimum WCAG 4.5:1 contrast for normal body text.
  - `prefers-reduced-motion` fallbacks to disable translate/scale animations.
  - `prefers-reduced-transparency` fallbacks flattening glass panels to solid background surfaces (`bg-[#f6efe7]`, `dark:bg-[#100d0c]`).

---

## 2. Tailwind CSS Configuration (`tailwind.config.ts`)

```typescript
import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        coffee: {
          50: "#f9f4ef",
          100: "#f2e7db",
          200: "#e3cdb5",
          300: "#cda57f",
          400: "#b78252",
          500: "#9a6738",
          600: "#7d512d",
          700: "#614022",
          800: "#44301a",
          900: "#2a1d13",
        },
        cream: {
          bg: "#f6efe7",
          card: "#ffffff",
        },
        espresso: {
          bg: "#100d0c",
          card: "#0c0a09",
        },
      },
      boxShadow: {
        soft: "0 20px 60px rgba(28, 18, 12, 0.12)",
      },
      borderRadius: {
        xl2: "1.5rem",
        '3xl': "1.875rem",
      },
    },
  },
  plugins: [],
};

export default config;
```

---

## 3. Theme Color Tokens

### Light Mode (Cream & Coffee)
- **Primary Background**: `#f6efe7` (`bg-stone-100` / `bg-cream-bg`)
- **Card Background**: `rgba(255, 255, 255, 0.7)` (`bg-white/70 backdrop-blur-xl`)
- **Primary Text**: `#1c1917` (`text-stone-900` - Contrast > 7:1)
- **Muted Text**: `#44403c` (`text-stone-700`)
- **Accent / Tag**: `#b45309` (`text-amber-700`)
- **Borders**: `rgba(231, 229, 228, 0.7)` (`border-stone-200/70`)

### Dark Mode (Espresso & Muted Caramel)
- **Primary Background**: `#100d0c` (`dark:bg-espresso-bg`)
- **Card Background**: `rgba(12, 10, 9, 0.45)` (`dark:bg-stone-950/45 backdrop-blur-xl`)
- **Primary Text**: `#f5f5f4` (`dark:text-stone-100` - Contrast > 12:1)
- **Muted Text**: `#d6d3d1` (`dark:text-stone-300`)
- **Accent / Tag**: `#fcd34d` (`dark:text-amber-300`)
- **Borders**: `rgba(68, 64, 60, 0.6)` (`dark:border-stone-700/60`)

---

## 4. Typography Hierarchy
- **Primary Interface Font**: Inter / Sans-Serif (`font-sans`)
- **Reading Serif Font**: Merriweather / Georgia (`font-serif`)
- **Dyslexic Reading Font**: OpenDyslexic (`font-dyslexic`)
- **Code / Monospace**: JetBrains Mono (`font-mono`)

---

## 5. Component Style Matrix
- **Buttons**: Rounded-full, quiet springy feel (`whileHover: { scale: 1.01 }`, `whileTap: { scale: 0.98 }`), dark background in light mode (`bg-stone-900 text-white`), light amber in dark mode (`dark:bg-amber-100 dark:text-stone-900`).
- **Cards**: Translucent glass (`backdrop-blur-xl`), subtle rounded corners (`rounded-[1.6rem]`), smooth shadow (`shadow-md`).
