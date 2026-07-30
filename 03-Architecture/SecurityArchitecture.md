# Security Architecture

## Defense-in-Depth Strategy
```
[ Client Request ]
       │
       ▼
[ Cloudflare Web Application Firewall (WAF) & Rate Limiter ]
       │
       ▼
[ TLS 1.3 / HTTPS Encryption in Transit ]
       │
       ▼
[ Express Auth Middleware (JWT Token Rotation & RBAC Validation) ]
       │
       ▼
[ Prisma ORM (Parameterized Queries - SQLi Prevention) ]
       │
       ▼
[ PostgreSQL (Encrypted at Rest - AES-256) ]
```

## Content Security Architecture
- Book files (`.epub`, `.pdf`) are stored in private Cloudflare R2 / AWS S3 buckets.
- Files are accessed exclusively via short-lived signed URLs (valid for 15 minutes).
- Direct file download endpoints are restricted using token authorization headers.
