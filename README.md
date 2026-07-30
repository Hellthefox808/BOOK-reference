<p align="center">
  <img src="https://img.shields.io/badge/Next.js-15.1-black?style=for-the-badge&logo=next.js" alt="Next.js" />
  <img src="https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React" />
  <img src="https://img.shields.io/badge/TypeScript-5.7-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/TailwindCSS-3.4-06B6D4?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/License-MIT-green?style=for-the-badge" alt="MIT License" />
  <img src="https://img.shields.io/badge/Status-Production%20Ready-brightgreen?style=for-the-badge" alt="Status" />
</p>

# ☕ BookVerse — Coffee Reader

> **A modern, distraction-free web reading platform with warm coffee-toned aesthetics, AI-assisted comprehension, and live public API integration.**

**Version:** `1.0.0` &nbsp;|&nbsp; **Status:** Production Ready &nbsp;|&nbsp; **License:** MIT

---

## 1. Executive Summary

**BookVerse** is a full-stack web reading platform designed for readers who value focused immersion and visual warmth. The platform serves a curated catalog of 120+ canonical book titles spanning 12 literary genres, rendered through a carefully crafted coffee-toned design system.

**Problem:** Existing digital reading platforms prioritize content volume over reading quality — cluttered interfaces, cold aesthetics, and lack of intelligent reading assistance create cognitive fatigue.

**Solution:** BookVerse delivers a distraction-free reading environment with customizable typography, multiple reader themes (Light / Sepia / Dark / Midnight), AI-powered chapter summarization and Q&A, live public API book search, and persistent reading progress tracking — all wrapped in a warm, accessible design system built for extended reading sessions.

**Who is it for:**
- Avid readers seeking a calm, focused digital reading environment
- Psychology, philosophy, and non-fiction enthusiasts exploring canonical works
- Developers and recruiters evaluating production-grade Next.js architecture

---

## 2. Project Overview

BookVerse operates as a Next.js 15 App Router application with client-side rendering for interactive components. The platform combines a pre-seeded catalog of 120 books with live search capabilities against two public book APIs (Open Library and Google Books).

**Primary Objectives:**
- Deliver a premium, coffee-themed reading experience across all devices
- Provide intelligent reading assistance through AI-powered chapter analysis
- Maintain sub-second interaction latency through TanStack Query caching
- Ensure WCAG 2.1 AA accessibility compliance throughout the interface

**High-Level Workflow:**
1. User browses the catalog via category filtering, search, or favorites/bookmarks
2. User opens a book detail modal to view metadata, synopsis, and reading progress
3. User enters the full-screen reader with customizable typography, bookmarking, and chapter navigation
4. User activates the AI Assistant for chapter summaries, key takeaways, or contextual Q&A
5. All preferences, bookmarks, and reading progress persist across sessions via localStorage

---

## 3. Key Features

### 🔐 Authentication
- **Dedicated Auth Portal** (`/login`) with Sign In / Register mode switching
- **Password strength meter** (4-level: Weak → Moderate → Strong) for registration
- **6-digit OTP verification** modal for email confirmation during registration
- **Forgot Password** modal with simulated reset link email flow
- **Google OAuth 2.0** single-click sign-in with branded SVG button
- **Remember Me** checkbox for persistent sessions
- **Zustand + localStorage** persisted auth state across browser sessions

### 📚 Catalog & Discovery
- **120+ pre-seeded books** across 12 genre categories
- **Live Public API Search** via Open Library (`openlibrary.org/search.json`) and Google Books (`googleapis.com/books/v1/volumes`)
- **Category carousel** with horizontal scrollable pill-style genre filters
- **Full-text search** across titles, authors, and categories
- **Lazy pagination** with "Load More" batching (16 books per page)
- **View filters**: All Books, Favorites, In-Progress & Bookmarked

### 📖 Immersive Reader
- **Full-screen reading modal** with distraction-free canvas
- **4 reader themes**: Light, Sepia, Dark, Midnight
- **Typography controls**: Font size slider (14–28px), font family (Serif / Sans / Mono), configurable line spacing
- **Chapter navigation**: Previous/Next buttons, Table of Contents drawer
- **Keyboard shortcuts**: `←` `→` for chapter navigation, `B` for bookmark, `Esc` to close
- **Fullscreen mode** via native Fullscreen API
- **Reading progress bar** with percentage completion per book

### 🤖 AI Reading Assistant
- **Chapter Summarization**: Generates structured summaries with 3 key takeaways
- **Contextual Q&A**: Ask questions about the current chapter with relevant quote extraction
- **Vocabulary Explanation**: Term definitions with etymology and synonyms
- **Tabbed interface**: Summary tab and Ask AI tab in a side drawer panel

### ❤️ Personalization
- **Favorites system**: Heart toggle on every book card and detail modal
- **Bookmarks**: Per-chapter bookmarks with timestamp tracking
- **Reading progress**: Automatic percentage tracking per book, synced to localStorage
- **Dark/Light theme toggle** persistent across sessions

### 📊 Admin & Content Management
- **Admin Upload Modal**: Title, author, category selector, file upload (EPUB/PDF), synopsis textarea
- **Optimistic cache invalidation**: Uploaded books appear instantly in the catalog via TanStack Query mutation

### ♿ Accessibility
- **WCAG 2.1 AA** contrast compliance (≥ 4.5:1 ratio)
- **`prefers-reduced-motion`** respected via Framer Motion's `useReducedMotion`
- **`prefers-reduced-transparency`** CSS media query fallbacks for glassmorphism
- **Keyboard navigation** throughout the reader and modals
- **Semantic HTML** with proper heading hierarchy and ARIA-compatible structure

### ⚡ Performance
- **TanStack Query** server-state caching with 5-minute stale time and 30-minute garbage collection
- **Request deduplication** and automatic abort signal cancellation
- **Skeleton loading states** for perceived performance
- **Framer Motion** animations with reduced-motion bypass
- **Static page generation** for `/` and `/login` routes

---

## 4. Technology Stack

| Layer | Technology | Version | Purpose |
|-------|-----------|---------|---------|
| **Framework** | Next.js (App Router) | 15.1 | Server/client rendering, routing, static generation |
| **UI Library** | React | 19.0 | Component architecture and hooks |
| **Language** | TypeScript | 5.7 | Type safety across the entire codebase |
| **Styling** | Tailwind CSS | 3.4 | Utility-first CSS with custom coffee design tokens |
| **Animation** | Framer Motion | 12.0 | Physics-based animations with accessibility bypass |
| **State (Client)** | Zustand | 5.0 | Lightweight persisted stores (auth, reader) |
| **State (Server)** | TanStack React Query | 5.64 | Async data fetching, caching, mutations |
| **Icons** | Lucide React | 0.474 | Consistent SVG icon system |
| **Utilities** | clsx + tailwind-merge | 2.1 / 3.0 | Conditional class merging |
| **Build** | PostCSS + Autoprefixer | 8.5 / 10.4 | CSS processing pipeline |
| **CI/CD** | GitHub Actions | — | Automated build, type-check, and security audit |
| **Package Manager** | npm | — | Dependency management with lockfile |

---

## 5. Architecture Overview

### System Architecture

```
┌─────────────────────────────────────────────────────────┐
│                     Browser Client                       │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌─────────┐ │
│  │ Next.js  │  │ Zustand  │  │ TanStack │  │ Framer  │ │
│  │ App      │  │ Stores   │  │ Query    │  │ Motion  │ │
│  │ Router   │  │ (Auth,   │  │ Cache    │  │ Engine  │ │
│  │          │  │  Reader) │  │ Layer    │  │         │ │
│  └────┬─────┘  └────┬─────┘  └────┬─────┘  └─────────┘ │
│       │              │             │                     │
│       ▼              ▼             ▼                     │
│  ┌─────────────────────────────────────┐                │
│  │         API Client Layer            │                │
│  │  api-client.ts │ live-books-api.ts  │                │
│  └────────┬───────────────┬────────────┘                │
│           │               │                              │
└───────────┼───────────────┼──────────────────────────────┘
            │               │
            ▼               ▼
   ┌────────────┐  ┌──────────────────┐
   │ Seed Data  │  │ Public HTTPS APIs │
   │ (120 books)│  │ • Open Library   │
   │            │  │ • Google Books   │
   └────────────┘  └──────────────────┘
```

### Application Layers

| Layer | Responsibility | Key Files |
|-------|---------------|-----------|
| **Presentation** | UI components, animations, theme rendering | `src/components/`, `src/app/` |
| **State Management** | Client state (auth, reader prefs, bookmarks) | `src/store/` |
| **Data Access** | API client, live API fetching, query hooks | `src/lib/api/`, `src/hooks/` |
| **AI Services** | Chapter summarization, Q&A, vocabulary | `src/lib/ai/` |
| **Observability** | Structured logging with correlation IDs | `src/lib/observability/` |
| **Data** | Book catalog, categories, type definitions | `src/lib/books-data.ts` |

### Authentication Flow

```
User visits /login
       │
       ├── Sign In ──▶ useAuthStore.login() ──▶ router.push("/")
       │
       ├── Register ──▶ OTP Modal ──▶ Verify ──▶ login() ──▶ "/"
       │
       └── Google OAuth ──▶ login() ──▶ "/"
```

### Data Flow

```
User Action (search, filter, browse)
       │
       ▼
  useBooksQuery() / useLiveBooksQuery()
       │
       ▼
  TanStack Query Cache (5min stale, 30min GC)
       │
       ├── Cache HIT ──▶ Return cached data
       │
       └── Cache MISS ──▶ apiClient.getBooks() or fetchLiveBooks()
                              │
                              ├── Seed catalog (120 books)
                              │
                              ├── Open Library API (primary)
                              │
                              └── Google Books API (fallback)
```

---

## 6. Project Structure

```
bookverse/
├── .github/
│   ├── workflows/ci.yml          # CI/CD: build, type-check, security audit
│   ├── dependabot.yml            # Automated dependency updates
│   ├── CODEOWNERS                # Code review ownership rules
│   ├── PULL_REQUEST_TEMPLATE.md  # PR template
│   └── ISSUE_TEMPLATE/           # Issue templates
│
├── src/
│   ├── app/
│   │   ├── layout.tsx            # Root layout with QueryProvider
│   │   ├── page.tsx              # Home page — catalog, hero, grid
│   │   ├── globals.css           # Base styles, scrollbar, a11y media queries
│   │   └── login/
│   │       └── page.tsx          # Auth portal — login, register, OTP, OAuth
│   │
│   ├── components/
│   │   ├── Header.tsx            # Sticky header — search, nav, profile menu
│   │   ├── Footer.tsx            # Site footer — branding, docs, tech specs
│   │   ├── BookCard.tsx          # Book grid card — cover, rating, progress
│   │   ├── BookDetailModal.tsx   # Book detail overlay — synopsis, actions
│   │   ├── ReaderModal.tsx       # Full-screen reader — themes, typography, TOC
│   │   ├── AIAssistantDrawer.tsx # AI side panel — summaries, Q&A
│   │   ├── AdminModal.tsx        # Book upload form — admin ingestion
│   │   └── CategoryCarousel.tsx  # Horizontal genre filter pills
│   │
│   ├── hooks/
│   │   └── useBookQueries.ts     # TanStack Query hooks — books, live search, mutations
│   │
│   ├── lib/
│   │   ├── books-data.ts         # Book interface, categories, 120-book seed catalog
│   │   ├── ai/
│   │   │   └── ai-assistant.ts   # AI engine — summarize, Q&A, vocabulary
│   │   ├── api/
│   │   │   ├── api-client.ts     # Internal API client — CRUD operations
│   │   │   ├── api-types.ts      # Type definitions — ApiResponse, ApiError, payloads
│   │   │   └── live-books-api.ts # Live public API fetcher — Open Library, Google Books
│   │   └── observability/
│   │       └── logger.ts         # Structured logger — correlation IDs, timing
│   │
│   ├── store/
│   │   ├── useAuthStore.ts       # Auth state — user profile, favorites, login/logout
│   │   └── useReaderStore.ts     # Reader state — theme, fonts, bookmarks, progress
│   │
│   └── providers/
│       └── QueryProvider.tsx     # TanStack Query client configuration
│
├── 01-Product/                   # PRD, BRD, MRD, Vision, Roadmap, Release Plan
├── 02-Design/                    # Design System, IA, UX, UI Guidelines, Wireframes
├── 03-Architecture/              # System, API, Database, Security, Folder Structure
├── 04-Development/               # API docs, Components, State, Coding Standards
├── 05-Testing/                   # Test Plan, Test Cases, QA, Bug Tracking
├── 06-Security/                  # Authentication, Authorization, OWASP, DRM, Privacy
│
├── tailwind.config.ts            # Coffee design tokens, custom fonts, shadows
├── next.config.mjs               # Next.js configuration
├── tsconfig.json                 # TypeScript configuration with path aliases
├── postcss.config.js             # PostCSS with Tailwind and Autoprefixer
├── package.json                  # Dependencies and scripts
│
├── API_REFERENCE.md              # API endpoint documentation
├── DATA_FLOW.md                  # Data pipeline documentation
├── DEPLOYMENT.md                 # Deployment guide
├── SECURITY.md                   # Security practices summary
├── SYSTEM_DESIGN.md              # System design overview
├── CHANGELOG.md                  # Version history
├── CONTRIBUTING.md               # Contribution guidelines
├── CODE_OF_CONDUCT.md            # Community code of conduct
├── LICENSE                       # MIT License
└── PROJECT_OVERVIEW.md           # Project brief and vision document
```

---

## 7. Installation

### Prerequisites

| Requirement | Minimum Version |
|------------|----------------|
| Node.js | 18.17+ |
| npm | 9.0+ |
| Git | 2.30+ |

### Setup

```bash
# 1. Clone the repository
git clone https://github.com/Hellthefox808/BOOK-reference.git
cd BOOK-reference

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev
```

The application will be available at `http://localhost:3000`.

### Build for Production

```bash
# Production build
npm run build

# Start production server
npm start
```

### Available Scripts

| Script | Command | Description |
|--------|---------|-------------|
| `dev` | `npm run dev` | Start Next.js development server with hot reload |
| `build` | `npm run build` | Create optimized production build |
| `start` | `npm start` | Serve production build |
| `lint` | `npm run lint` | Run ESLint across the codebase |

---

## 8. Configuration

### Environment Variables

BookVerse operates with **zero required environment variables** for local development. The application uses a pre-seeded catalog and client-side state that requires no external database or API keys.

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `NODE_ENV` | No | `development` | Runtime environment |
| `NEXT_PUBLIC_BASE_URL` | No | `/api` | API client base URL |

### Design Token Configuration

The visual design system is configured in `tailwind.config.ts`:

- **Coffee palette**: 10-shade scale (`coffee-50` through `coffee-900`)
- **Semantic backgrounds**: `cream-bg` (#f6efe7), `espresso-bg` (#100d0c)
- **Font families**: Georgia/Merriweather (serif), Inter (sans), JetBrains Mono (mono)
- **Custom shadows**: `soft` and `glow` presets for depth and ambient effects

### Reader Settings

Reader preferences are persisted in `localStorage` under `bookverse-reader-storage`:

| Setting | Options | Default |
|---------|---------|---------|
| Theme | `light`, `sepia`, `dark`, `midnight` | `light` |
| Font Size | `14px` – `28px` | `18px` |
| Font Family | `serif`, `sans`, `mono` | `serif` |
| Line Spacing | `1.4`, `1.6`, `1.8` | `1.6` |

---

## 9. Usage Guide

### Reader Workflow
1. Browse the catalog or search for a title
2. Click a book cover to view the **Detail Modal** with synopsis and metadata
3. Click **Start Reading Now** to enter the full-screen reader
4. Use the **Typography** panel to customize font, size, and theme
5. Press `B` or click the Bookmark icon to save your position
6. Open the **AI Assistant** for chapter summaries or ask contextual questions

### Admin Workflow
1. Click the **Upload Book** button in the header
2. Fill in title, author, category, and optional file upload
3. Click **Publish Book to Catalog** — the book appears instantly via optimistic mutation

### Keyboard Shortcuts (Reader)

| Key | Action |
|-----|--------|
| `←` Arrow Left | Previous chapter |
| `→` Arrow Right | Next chapter |
| `B` | Toggle bookmark on current chapter |
| `Esc` | Close reader |

---

## 10. API Overview

### Internal API Client (`api-client.ts`)

| Method | Signature | Description |
|--------|-----------|-------------|
| `getBooks` | `(params?, signal?) → ApiResponse<Book[]>` | Fetch paginated catalog with category/search filters |
| `getBookById` | `(id, signal?) → ApiResponse<Book>` | Fetch single book by ID |
| `updateProgress` | `(payload, signal?) → ApiResponse<ReadingProgressPayload>` | Sync reading progress |
| `toggleBookmark` | `(payload, signal?) → ApiResponse<BookmarkPayload>` | Toggle chapter bookmark |
| `uploadBook` | `(newBook, signal?) → ApiResponse<Book>` | Admin book upload |

### Live Public API Fetcher (`live-books-api.ts`)

| API | Endpoint | Timeout | Validation |
|-----|----------|---------|------------|
| **Open Library** (primary) | `https://openlibrary.org/search.json` | 8s | Native schema validation |
| **Google Books** (fallback) | `https://www.googleapis.com/books/v1/volumes` | 8s | Native schema validation |

### Response Format

```typescript
interface ApiResponse<T> {
  success: boolean;
  data: T;
  meta?: {
    page?: number;
    limit?: number;
    total?: number;
    timestamp?: string;
  };
}
```

### Error Handling

All errors are normalized into a structured `ApiError`:

```typescript
interface ApiError {
  code: string;       // e.g., "REQUEST_CANCELLED", "INTERNAL_ERROR"
  message: string;
  status: number;     // HTTP status code
  timestamp: string;  // ISO 8601
}
```

---

## 11. Security

- **Input validation**: All form inputs use HTML5 validation attributes (`required`, `type="email"`, `maxLength`)
- **Password strength enforcement**: 4-tier visual meter (length ≥ 8, uppercase, digit, symbol)
- **XSS protection**: React's automatic JSX escaping; no `dangerouslySetInnerHTML` usage
- **AbortSignal cancellation**: All API requests support `AbortController` for request cancellation
- **Error normalization**: API errors are sanitized through `normalizeError()` — no raw stack traces exposed to UI
- **Dependency auditing**: Automated `npm audit --audit-level=high` in CI pipeline
- **Hydration safety**: `suppressHydrationWarning` on `<html>` element for Zustand rehydration
- **OWASP mapping**: Documented in `06-Security/OWASP.md`

---

## 12. Performance

| Strategy | Implementation |
|----------|---------------|
| **Server-state caching** | TanStack Query: 5-minute stale time, 30-minute garbage collection |
| **Request deduplication** | Identical queries share a single network request |
| **Abort cancellation** | All fetch calls accept `AbortSignal` for component unmount cleanup |
| **Skeleton loading** | 8-card pulse animation grid during initial data fetch |
| **Static generation** | `/` and `/login` routes pre-rendered at build time |
| **Lazy pagination** | 16 books rendered initially, "Load More" on demand |
| **Reduced motion** | Framer Motion `useReducedMotion` bypass for all animations |
| **Optimistic mutations** | Book uploads invalidate cache immediately for instant UI updates |

---

## 13. Accessibility

| Feature | Implementation |
|---------|---------------|
| **Contrast** | All text meets WCAG 2.1 AA (≥ 4.5:1 ratio) across all 4 reader themes |
| **Reduced motion** | `useReducedMotion()` disables all Framer Motion animations |
| **Reduced transparency** | `@media (prefers-reduced-transparency: reduce)` removes all backdrop-blur |
| **Keyboard navigation** | Full reader keyboard support (arrow keys, `B`, `Esc`) |
| **Semantic HTML** | `<header>`, `<main>`, `<footer>`, `<article>`, `<section>` used throughout |
| **Color independence** | Status indicators use icons + text, not color alone |
| **Focus indicators** | `focus:border` and `focus:ring` styles on all interactive elements |

---

## 14. Testing

### CI Pipeline (`ci.yml`)

| Step | Command | Purpose |
|------|---------|---------|
| TypeScript check | `npx tsc --noEmit` | Zero-tolerance type safety |
| Production build | `npm run build` | Full static generation verification |
| Security audit | `npm audit --audit-level=high` | Dependency vulnerability scanning |

### Manual Verification

- **Build verification**: `npm run build` produces 5 static pages (including `/` and `/login`)
- **Theme persistence**: All 4 reader themes persist across page reloads
- **Search pipeline**: Live API queries validated against Open Library and Google Books
- **Bookmark/progress**: State persists in `localStorage` across sessions

---

## 15. Deployment

### Production Build

```bash
npm run build    # Generates .next/ output
npm start        # Serves on port 3000
```

### CI/CD Pipeline

The GitHub Actions workflow (`ci.yml`) runs on every push and PR to `main` and `develop`:

1. **Checkout** → `actions/checkout@v4`
2. **Node.js setup** → Node 20 with npm caching
3. **Install** → `npm ci` (clean, deterministic install)
4. **Type-check** → `npx tsc --noEmit`
5. **Build** → `npm run build`
6. **Security audit** → `npm audit --audit-level=high`

### Deployment Targets

BookVerse is compatible with any Node.js hosting platform:

| Platform | Method |
|----------|--------|
| **Vercel** | `vercel --prod` (zero-config Next.js deployment) |
| **Docker** | Standard Node.js Dockerfile with `npm run build && npm start` |
| **AWS / GCP** | Cloud Run, App Engine, or EC2 with Node.js runtime |

---

## 16. Documentation

| Document | Path | Description |
|----------|------|-------------|
| **Project Overview** | [`PROJECT_OVERVIEW.md`](PROJECT_OVERVIEW.md) | Vision, architecture summary, engineering principles |
| **System Design** | [`SYSTEM_DESIGN.md`](SYSTEM_DESIGN.md) | High-level system architecture |
| **API Reference** | [`API_REFERENCE.md`](API_REFERENCE.md) | Endpoint documentation and response formats |
| **Data Flow** | [`DATA_FLOW.md`](DATA_FLOW.md) | Data pipeline and caching strategy |
| **Deployment** | [`DEPLOYMENT.md`](DEPLOYMENT.md) | Production deployment guide |
| **Security** | [`SECURITY.md`](SECURITY.md) | Security practices and policies |
| **Changelog** | [`CHANGELOG.md`](CHANGELOG.md) | Version history and release notes |
| **Contributing** | [`CONTRIBUTING.md`](CONTRIBUTING.md) | Contribution guidelines |
| **Code of Conduct** | [`CODE_OF_CONDUCT.md`](CODE_OF_CONDUCT.md) | Community standards |

### Architecture Documentation Suite

| Category | Documents |
|----------|-----------|
| **01-Product** | PRD, BRD, MRD, Vision, Roadmap, Release Plan |
| **02-Design** | Design System, Information Architecture, UX Principles, UI Guidelines, User Flows, Wireframes |
| **03-Architecture** | System Architecture, API Architecture, Database Design, Security Architecture, Tech Stack |
| **04-Development** | API Docs, Components, State Management, Coding Standards, File Briefs |
| **05-Testing** | Test Plan, Test Cases, QA, Bug Tracking |
| **06-Security** | Authentication, Authorization, OWASP ASVS Mapping, DRM, Privacy |

---

## 17. Roadmap

### Planned Improvements

- [ ] **Backend API server** — Replace client-side simulation with Express/Fastify REST API
- [ ] **Database integration** — PostgreSQL with Prisma ORM for persistent user data
- [ ] **Real AI integration** — Connect AI Assistant to OpenAI or Google Gemini APIs
- [ ] **EPUB/PDF parsing** — Client-side file parsing with `epub.js` and `pdf.js`
- [ ] **Social features** — Reading groups, shared annotations, public bookshelves
- [ ] **Offline support** — Service Worker with IndexedDB for offline reading
- [ ] **Search enhancements** — Elasticsearch or Algolia for full-text catalog search
- [ ] **Analytics dashboard** — Reading statistics, time tracking, genre preferences
- [ ] **Internationalization** — i18n support for multiple languages
- [ ] **Mobile apps** — React Native or Capacitor for iOS/Android

---

## 18. License

This project is licensed under the **MIT License**. See the [LICENSE](LICENSE) file for details.

```
MIT License
Copyright (c) 2026 BookVerse Team
```

---

## 19. Author

**Ravi Ranjan Singh**

- **Role:** Software Engineer · Software Architect · Full Stack Developer · AI SaaS Developer
- **GitHub:** [@Hellthefox808](https://github.com/Hellthefox808)
- **Repository Maintainer:** Ravi Ranjan Singh

---

<p align="center">
  <sub>Built with precision. Designed for focus. Engineered for production.</sub>
</p>
