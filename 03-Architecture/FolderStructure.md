# Application Directory & Folder Structure

```
bookverse-app/
├── apps/
│   ├── web/                     # Next.js Frontend Application
│   │   ├── public/              # Static assets, fonts, icons
│   │   ├── src/
│   │   │   ├── app/             # Next.js App Router (/home, /books, /reader, /admin)
│   │   │   ├── components/      # React UI Components (ui, reader, layout)
│   │   │   ├── hooks/           # Custom React hooks (useReader, useAuth, useBookmarks)
│   │   │   ├── store/           # Zustand state management stores
│   │   │   ├── lib/             # API client, EPUB/PDF parser helpers
│   │   │   └── types/           # TypeScript type definitions
│   │   ├── package.json
│   │   └── tailwind.config.js
│   │
│   └── api/                     # Node.js + Express API Server
│       ├── src/
│       │   ├── controllers/     # Route handler logic
│       │   ├── middlewares/     # Auth, RBAC, Rate-limiting, Error handler
│       │   ├── services/        # Business logic & S3 storage integration
│       │   ├── routes/          # API route definitions
│       │   └── index.ts         # Server entrypoint
│       ├── package.json
│       └── tsconfig.json
│
├── packages/
│   ├── database/                # Prisma ORM schema, migrations, seeds
│   │   ├── prisma/
│   │   │   └── schema.prisma
│   │   └── index.ts
│   └── config/                  # Shared ESLint, Prettier, TypeScript configs
│
└── package.json                 # Monorepo root configuration
```
