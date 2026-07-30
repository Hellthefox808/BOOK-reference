# Bug Tracking & Issue Lifecycle

## Severity Matrix

| Severity | Description | SLA Response | Resolution Time |
| :--- | :--- | :--- | :--- |
| **P0 - Blocker** | Security breach, data loss, total authentication/reader failure | `< 1 Hour` | `< 4 Hours` |
| **P1 - High** | EPUB rendering bug, progress sync failing, admin upload down | `< 4 Hours` | `< 24 Hours` |
| **P2 - Medium** | Minor visual alignment glitch, theme color mismatch | `< 24 Hours` | Next Sprint |
| **P3 - Low** | Cosmetic text update, minor enhancement request | Triage | Backlog |

---

## Bug Report Template
```markdown
### Summary
Brief description of the defect.

### Environment
- OS: [e.g., Windows 11 / iOS 17]
- Browser: [e.g., Chrome 124 / Safari 17]
- User Role: [e.g., Reader / Admin]

### Steps to Reproduce
1. Go to '/reader/bk-123'
2. Click on 'Font Settings'
3. Change font size to 24px

### Expected Result
Font resizes smoothly.

### Actual Result
Reader crashes with unhandled TypeError.

### Logs / Screenshots
Attach console logs or screenshot artifacts.
```
