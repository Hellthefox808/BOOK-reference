# Security & DRM Policy Document

## 1. Authentication & RBAC
- JWT access tokens (15-min expiry) paired with `HttpOnly`, `SameSite=Strict` refresh cookies.
- Role-Based Access Control (RBAC): `USER` (read catalog, save progress, bookmarks) vs `ADMIN` (upload catalog, manage users).

## 2. Content DRM & Storage Security
- Cloudflare R2 / AWS S3 pre-signed URLs with 15-minute expiration time.
- Direct binary downloads prohibited; streaming handled via encrypted browser Blob URLs.
- Sanitized input validation on all AI prompt requests to prevent prompt injection attacks.
