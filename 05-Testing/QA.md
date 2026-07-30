# Quality Assurance (QA) Guidelines & Gate Checklists

## Release Quality Gates
Prior to merging any pull request into `main` or deploying a release candidate:

1. **Automated CI Pass**: All unit, integration, and Playwright E2E tests must pass cleanly.
2. **TypeScript & Linting**: Zero TypeScript errors (`tsc --noEmit`), zero ESLint warnings.
3. **Lighthouse Performance Score**:
   - Performance: `>= 90`
   - Accessibility: `>= 95`
   - Best Practices: `100`
   - SEO: `>= 95`
4. **Security Audit**: `npm audit --audit-level=high` reports zero vulnerabilities.
