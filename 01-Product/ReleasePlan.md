# Release Plan & Strategy

## Release Milestones

| Version | Target Date | Focus Area | Key Deliverables |
| :--- | :--- | :--- | :--- |
| `v0.1.0-alpha` | Sprint 1-2 | Architecture & Auth | Next.js setup, Prisma schema, Authentication & User profiles |
| `v0.5.0-beta` | Sprint 3-4 | Reader Engine | EPUB/PDF reader integration, typography controls, bookmarking |
| `v1.0.0-MVP` | Sprint 5-6 | Production Readiness | Admin Dashboard, R2/S3 file storage, performance tuning & audit |
| `v1.1.0` | Sprint 7-8 | Annotations & PWA | Offline service workers, highlighting, reading stats |

---

## Deployment Strategy
- **Staging**: Automated deployment on every pull request to Vercel Preview environments.
- **Production**: Tagged main branch triggers automated GitHub Action deployment to Vercel (Frontend) and Railway / Docker container (Backend).
