# Technology Stack Rationale

## Core Stack Rationale
- **Next.js & React**: SSR/SSG capabilities for public marketing/catalog SEO, fast interactive client hydrated reader rendering.
- **TypeScript**: End-to-end type safety shared between database models (Prisma) and API request/response payloads.
- **Tailwind CSS**: Rapid UI styling, theme tokenization (Light/Dark/Sepia support).
- **Zustand**: Lightweight client-side reader state management without Redux boilerplate.
- **TanStack Query**: Efficient client caching, pagination refetching, and optimistic UI updates.
- **Prisma & PostgreSQL**: Relational data integrity, schema migrations, and indexing.
- **Cloudflare R2 / AWS S3**: Low-cost, high-speed object storage for book EPUB/PDF binaries and cover images.
