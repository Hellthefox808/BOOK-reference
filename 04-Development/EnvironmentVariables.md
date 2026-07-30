# Environment Variables Specification

## `.env.example` Template

```env
# Application Settings
NODE_ENV=development
PORT=4000
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Database Connection (PostgreSQL)
DATABASE_URL="postgresql://postgres:password@localhost:5432/bookverse?schema=public"

# NextAuth / JWT Authentication
NEXTAUTH_SECRET="super-secret-nextauth-key-32-chars"
NEXTAUTH_URL="http://localhost:3000"
JWT_SECRET="super-secret-jwt-signing-key"
JWT_REFRESH_SECRET="super-secret-refresh-key"

# Google OAuth Credentials
GOOGLE_CLIENT_ID="your-google-oauth-client-id"
GOOGLE_CLIENT_SECRET="your-google-oauth-client-secret"

# Cloudflare R2 / AWS S3 Storage
STORAGE_PROVIDER=r2
S3_ENDPOINT="https://<account-id>.r2.cloudflarestorage.com"
S3_BUCKET_NAME="bookverse-assets"
S3_ACCESS_KEY_ID="your-access-key-id"
S3_SECRET_ACCESS_KEY="your-secret-access-key"
S3_PUBLIC_DOMAIN="https://assets.bookverse.com"
```
