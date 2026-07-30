# System Architecture

## Architecture Diagram

```mermaid
graph TD
    Client[Web Browsers / Mobile PWA] --> CDN[Cloudflare Edge CDN]
    CDN --> NextFS[Next.js App Server / Vercel]
    
    NextFS -->|REST / API Routes| API[Express Node.js Service]
    NextFS -->|Auth Session| NextAuth[NextAuth / Auth.js]
    
    API -->|ORM Queries| Prisma[Prisma ORM]
    Prisma --> DB[(PostgreSQL Database)]
    
    API -->|Pre-signed Signed URLs| S3[Cloudflare R2 / AWS S3 Storage]
    
    subgraph Storage Layer
        DB
        S3
    end
```

---

## Service Boundaries
1. **Frontend (Next.js)**: SSR pages, catalog discovery, client-side EPUB/PDF reader engine, state management.
2. **Backend Services (Express + Prisma)**: Authentication API, book management, user reading progress API, search services.
3. **Storage (Cloudflare R2 / S3)**: Book assets (`.epub`, `.pdf`), cover image media files.
4. **Database (PostgreSQL)**: User accounts, book metadata, reading logs, bookmarks, and categories.
