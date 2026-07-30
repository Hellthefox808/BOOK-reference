# Authentication Architecture & Protocol

## Token Rotation Strategy
- **Access Tokens**: Short-lived JWTs (15-minute expiration) stored in memory / Authorization headers.
- **Refresh Tokens**: Long-lived secure tokens (7-day expiration) stored in `HttpOnly`, `SameSite=Strict`, `Secure` cookies.
- **OAuth 2.0 Integration**: Handled via NextAuth / Auth.js with Google OAuth provider credentials.

---

## Token Payload Structure
```json
{
  "sub": "usr-123456",
  "email": "user@bookverse.com",
  "role": "USER",
  "iat": 1785458144,
  "exp": 1785459044
}
```
