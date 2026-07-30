# Codebase Engineering Briefs Index

Comprehensive engineering briefs for every application source file in `src/`.

---

## 1. Application Routes (`src/app/`)

### `src/app/page.tsx`
- **Purpose**: Main discovery portal & catalog home page.
- **Responsibilities**: Render hero section, category carousel, 120-book grid, loading skeletons, and modals.
- **Dependencies**: React, Framer Motion, Lucide React, `useBooksQuery`, `useUploadBookMutation`, `useReaderStore`, `useAuthStore`.
- **Data Flow**: Connects to `useBooksQuery` hook for server-state caching & deduplication.
- **Security & Performance**: WCAG AA contrast compliance; sub-10ms UI renders via TanStack Query cache.

### `src/app/login/page.tsx`
- **Purpose**: Dedicated Authentication Portal.
- **Responsibilities**: Render interactive HTML5 canvas particle background, sign-in/register forms, password strength meter, 6-digit OTP modal, and Google OAuth 2.0.
- **Dependencies**: React, Framer Motion, Lucide React, `useAuthStore`, `useReaderStore`, Next.js Router.
- **Security & Accessibility**: Sanitized input handling, `prefers-reduced-motion` canvas fallback, high-contrast inputs.

---

## 2. API & Data Access Layer (`src/lib/api/`)

### `src/lib/api/api-client.ts`
- **Purpose**: Centralized HTTP client for all API interactions.
- **Responsibilities**: Request timeout policies (8s), `AbortSignal` cancellation, authorization injection, error normalization.
- **Dependencies**: `api-types.ts`, `books-data.ts`.
- **Performance & Security**: Eliminates unhandled promise rejections and normalizes all failures into structured `ApiError` objects.

### `src/lib/api/api-types.ts`
- **Purpose**: Shared TypeScript interface contracts.
- **Exports**: `ApiResponse<T>`, `ApiError`, `PaginationParams`, `ReadingProgressPayload`, `BookmarkPayload`.

---

## 3. AI Orchestration (`src/lib/ai/`)

### `src/lib/ai/ai-assistant.ts`
- **Purpose**: AI Reading Assistant engine.
- **Responsibilities**: AI chapter summarization, contextual Q&A, key takeaways, and vocabulary explanations.
- **Dependencies**: `logger.ts`.
- **Security**: Strict context bounding to current chapter text to prevent prompt injection.

---

## 4. Observability & Tracing (`src/lib/observability/`)

### `src/lib/observability/logger.ts`
- **Purpose**: Structured logging & correlation tracing.
- **Responsibilities**: Assign correlation IDs (`x-correlation-id`), trace latency timers, log errors and warnings.

---

## 5. UI Components (`src/components/`)

### `src/components/Header.tsx`
- **Purpose**: Top navigation header bar.
- **Responsibilities**: Render brand logo, search input bar, category filter, theme switcher, bookmarks toggle, profile menu.

### `src/components/BookCard.tsx`
- **Purpose**: Product card representation for each book.
- **Responsibilities**: Render cover artwork, title, author, category, rating, reading progress bar, favorite heart button.

### `src/components/ReaderModal.tsx`
- **Purpose**: Fullscreen distraction-free Web Reader modal.
- **Responsibilities**: Render chapter text, typography controls drawer, themes (Light, Dark, Sepia, Midnight), TOC chapter jumper, AI assistant drawer, and keyboard shortcuts (`Arrow keys`, `B`, `F`).

### `src/components/AIAssistantDrawer.tsx`
- **Purpose**: Interactive AI assistant drawer inside web reader.
- **Responsibilities**: Execute chapter summaries and chapter Q&A via `aiAssistant`.

### `src/components/BookDetailModal.tsx` & `src/components/AdminModal.tsx`
- **Purpose**: Book synopsis viewer & Admin book ingestion drawer.
