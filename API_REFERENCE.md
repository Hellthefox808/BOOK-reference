# OpenAPI Reference & API Contract Specification

## Base URL: `https://api.bookverse.com/v1`

| Endpoint | Method | Auth Required | Description |
| :--- | :--- | :--- | :--- |
| `/api/auth/register` | `POST` | Public | Register new reader account |
| `/api/auth/login` | `POST` | Public | Authenticate reader & issue JWT |
| `/api/books` | `GET` | Public | Get paginated catalog with search/category filter |
| `/api/books/:id` | `GET` | Public | Get book metadata & chapter content |
| `/api/progress` | `PUT` | Bearer Token | Sync reading progress position & percentage |
| `/api/bookmark` | `POST` | Bearer Token | Toggle chapter bookmark |
| `/api/admin/books` | `POST` | Admin Bearer | Upload new EPUB/PDF file binary and metadata |
| `/api/ai/summarize` | `POST` | Bearer Token | AI chapter summarization & takeaways |
| `/api/ai/qa` | `POST` | Bearer Token | Contextual AI reading assistant Q&A |
