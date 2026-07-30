# Privacy & Data Governance (GDPR / CCPA)

## Data Privacy Principles
- **Data Minimization**: Only collect essential fields (`email`, `name`, `readingProgress`, `bookmarks`).
- **User Control**: Users can export their reading history and account data via `/profile/export`.
- **Right to be Forgotten**: Account deletion automatically triggers cascading deletion of reading progress, bookmarks, and user metadata via PostgreSQL foreign key cascade rules (`onDelete: Cascade`).
- **Analytics Anonymization**: All telemetry and reading analytics are stripped of PII prior to aggregation.
