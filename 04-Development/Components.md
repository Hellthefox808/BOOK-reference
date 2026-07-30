# Component Hierarchy & Breakdown

```
App Component Tree
│
├── RootLayout
│   ├── NavigationHeader
│   │   ├── Logo
│   │   ├── SearchBar
│   │   └── UserMenu / AuthButtons
│   │
│   ├── Page Content Router
│   │   ├── HomePage
│   │   │   ├── ContinueReadingWidget
│   │   │   ├── CategoryCarousel
│   │   │   └── BookGrid -> BookCard
│   │   │
│   │   ├── BookDetailPage
│   │   │   ├── BookMeta
│   │   │   ├── ActionButtons (Read, Favorite)
│   │   │   └── RelatedBooks
│   │   │
│   │   └── ReaderPage (`/reader/[bookId]`)
│   │       ├── ReaderToolbar
│   │       │   ├── FontControlsModal
│   │       │   ├── ThemeSelector
│   │       │   ├── TOCDrawer
│   │       │   └── BookmarkToggle
│   │       │
│   │       ├── ReaderEngineCanvas
│   │       │   ├── EpubViewer (epubjs)
│   │       │   └── PdfViewer (pdfjs-dist)
│   │       │
│   │       └── ReaderFooter
│   │           ├── ProgressBar
│   │           └── PageNavigation
│   │
│   └── Footer
```

---

## 2. Starter Landing Page Component (`BookReaderLanding.tsx`)

```tsx
"use client";

import { useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

const books = [
  {
    title: "The Lucifer Effect",
    author: "Philip Zimbardo",
    tag: "Psychology",
  },
  {
    title: "Influence",
    author: "Robert B. Cialdini",
    tag: "Persuasion",
  },
  {
    title: "The Art of Seduction",
    author: "Robert Greene",
    tag: "Strategy",
  },
  {
    title: "The Psychopath Test",
    author: "Jon Ronson",
    tag: "Nonfiction",
  },
];

export default function BookReaderLanding() {
  const [dark, setDark] = useState(false);
  const reduceMotion = useReducedMotion();

  const themeClass = useMemo(() => (dark ? "dark" : ""), [dark]);

  const cardMotion = reduceMotion
    ? {}
    : {
        whileHover: { y: -4, scale: 1.01 },
        whileTap: { scale: 0.98 },
      };

  return (
    <div className={themeClass}>
      <main className="min-h-screen bg-[#f6efe7] text-stone-900 transition-colors duration-300 dark:bg-[#100d0c] dark:text-stone-100">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <header className="mb-10 flex items-center justify-between rounded-3xl border border-stone-200/70 bg-white/60 px-5 py-4 shadow-sm backdrop-blur-xl dark:border-stone-700/60 dark:bg-stone-950/40">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-amber-700/80 dark:text-amber-300/80">
                Book Reader
              </p>
              <h1 className="mt-1 text-xl font-semibold sm:text-2xl">
                Coffee-tone reading experience
              </h1>
            </div>

            <button
              onClick={() => setDark((v) => !v)}
              className="rounded-full border border-stone-300 bg-stone-100 px-4 py-2 text-sm font-medium shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md dark:border-stone-700 dark:bg-stone-900"
            >
              {dark ? "Light mode" : "Dark mode"}
            </button>
          </header>

          <section className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
            <motion.div
              className="rounded-[2rem] border border-stone-200/70 bg-white/70 p-8 shadow-lg backdrop-blur-xl dark:border-stone-700/60 dark:bg-stone-950/45"
              initial={reduceMotion ? false : { opacity: 0, y: 16 }}
              animate={reduceMotion ? {} : { opacity: 1, y: 0 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
            >
              <p className="text-sm font-medium uppercase tracking-[0.28em] text-amber-700 dark:text-amber-300">
                Featured reading
              </p>
              <h2 className="mt-4 text-4xl font-semibold leading-tight sm:text-5xl">
                Read books in a calm, premium interface.
              </h2>
              <p className="mt-5 max-w-2xl text-base leading-7 text-stone-700 dark:text-stone-300">
                A clean book website with soft coffee colors, subtle glass
                panels, refined hover motion, and an uninterrupted reading
                flow.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <motion.button
                  {...cardMotion}
                  className="rounded-full bg-stone-900 px-5 py-3 text-sm font-medium text-white shadow-lg shadow-stone-900/20 transition hover:bg-stone-800 dark:bg-amber-100 dark:text-stone-900 dark:hover:bg-amber-200"
                >
                  Start reading
                </motion.button>
                <motion.button
                  {...cardMotion}
                  className="rounded-full border border-stone-300 bg-white/80 px-5 py-3 text-sm font-medium text-stone-800 shadow-sm transition hover:bg-white dark:border-stone-700 dark:bg-stone-900/70 dark:text-stone-100 dark:hover:bg-stone-900"
                >
                  Browse library
                </motion.button>
              </div>
            </motion.div>

            <motion.aside
              className="rounded-[2rem] border border-stone-200/70 bg-gradient-to-br from-[#fffaf5]/80 to-[#e6d3bf]/60 p-6 shadow-lg backdrop-blur-xl dark:border-stone-700/60 dark:from-stone-950/70 dark:to-stone-900/60"
              initial={reduceMotion ? false : { opacity: 0, y: 16 }}
              animate={reduceMotion ? {} : { opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: "easeOut", delay: 0.05 }}
            >
              <h3 className="text-lg font-semibold">Reader features</h3>
              <ul className="mt-4 space-y-3 text-sm text-stone-700 dark:text-stone-300">
                <li>• Clean typography and comfortable spacing</li>
                <li>• Light / dark coffee palette</li>
                <li>• Bookmarks and reading progress</li>
                <li>• Subtle motion, no visual overload</li>
                <li>• Glassmorphism only where it helps clarity</li>
              </ul>
            </motion.aside>
          </section>

          <section className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {books.map((book, index) => (
              <motion.article
                key={book.title}
                className="rounded-[1.6rem] border border-stone-200/70 bg-white/65 p-5 shadow-md backdrop-blur-xl transition dark:border-stone-700/60 dark:bg-stone-950/45"
                initial={reduceMotion ? false : { opacity: 0, y: 10 }}
                animate={reduceMotion ? {} : { opacity: 1, y: 0 }}
                transition={{
                  duration: 0.3,
                  ease: "easeOut",
                  delay: index * 0.05,
                }}
                whileHover={reduceMotion ? undefined : { y: -3 }}
              >
                <p className="text-xs font-medium uppercase tracking-[0.25em] text-amber-700 dark:text-amber-300">
                  {book.tag}
                </p>
                <h4 className="mt-3 text-lg font-semibold">{book.title}</h4>
                <p className="mt-1 text-sm text-stone-600 dark:text-stone-400">
                  {book.author}
                </p>
                <button className="mt-4 inline-flex rounded-full border border-stone-300 px-4 py-2 text-sm font-medium transition hover:bg-stone-900 hover:text-white dark:border-stone-700 dark:hover:bg-amber-100 dark:hover:text-stone-900">
                  Open book
                </button>
              </motion.article>
            ))}
          </section>
        </div>
      </main>
    </div>
  );
}
```

