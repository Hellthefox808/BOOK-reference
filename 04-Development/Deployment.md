# Deployment & CI/CD Pipeline Guide

## 1. Environment Topology
- **Development**: Local environment with Dockerized PostgreSQL and local MinIO (S3 mock).
- **Staging**: Vercel preview environments + Railway staging PostgreSQL database.
- **Production**: Vercel Production deployment + Managed PostgreSQL (Supabase / AWS RDS) + Cloudflare R2 object storage.

---

## 2. GitHub Actions CI/CD Pipeline

```yaml
name: BookVerse CI/CD

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  build-and-test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm ci
      - run: npm run lint
      - run: npm run type-check
      - run: npm run test
      - run: npm run build
```
