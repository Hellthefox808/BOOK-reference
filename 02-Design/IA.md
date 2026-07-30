# Information Architecture (IA)

```
BookVerse Map
│
├── Public Site
│   ├── Landing Page (`/`)
│   ├── Login (`/login`)
│   ├── Register (`/register`)
│   └── Forgot Password (`/forgot-password`)
│
├── App Portal (Authenticated)
│   ├── Home Dashboard (`/home`)
│   │   ├── Trending Books Carousel
│   │   ├── Continue Reading Widget
│   │   └── Recommended for You
│   │
│   ├── Library & Discovery
│   │   ├── Catalog (`/books`)
│   │   ├── Categories (`/categories`)
│   │   └── Search (`/search?q=`)
│   │
│   ├── Book Detail Page (`/books/[id]`)
│   │   ├── Metadata, Cover, Summary
│   │   └── Read / Continue / Favorite Buttons
│   │
│   ├── Reader View (`/reader/[bookId]`)
│   │   ├── Reader Toolbar (Font, Theme, TOC, Bookmark, Fullscreen)
│   │   ├── Reading Canvas (EPUB/PDF engine)
│   │   └── Annotation Drawer
│   │
│   └── Profile & Account
│       ├── User Profile (`/profile`)
│       ├── Reading Favorites (`/favorites`)
│       └── Settings (`/settings`)
│
└── Admin Portal (`/admin`)
    ├── Overview / Analytics (`/admin/dashboard`)
    ├── Book Upload & Catalog Management (`/admin/books`)
    └── User Management (`/admin/users`)
```
