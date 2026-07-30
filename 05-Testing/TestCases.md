# Test Cases Suite

## 1. Authentication Suite

| Test ID | Module | Scenario | Input / Action | Expected Result | Status |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `TC-AUTH-001` | Auth | Valid User Login | Valid email & password | Returns JWT token, redirects to `/home` | Pass |
| `TC-AUTH-002` | Auth | Invalid Password Login | Invalid password | Returns `401 Unauthorized` error message | Pass |
| `TC-AUTH-003` | Auth | Google OAuth Login | Click Google Sign In button | Redirects to Google consent, issues session token | Pass |

---

## 2. Reader Engine Suite

| Test ID | Module | Scenario | Input / Action | Expected Result | Status |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `TC-READ-001` | Reader | EPUB File Render | Open `/reader/epub-1` | Renders EPUB canvas without layout shift | Pass |
| `TC-READ-002` | Reader | PDF File Render | Open `/reader/pdf-1` | Renders PDF canvas via pdfjs-dist | Pass |
| `TC-READ-003` | Reader | Theme Switch | Change theme to 'Sepia' | Background updates to `#FBF0D9` immediately | Pass |
| `TC-READ-004` | Reader | Add Bookmark | Click Bookmark icon on page 14 | Bookmark created, saved to database | Pass |
| `TC-READ-005` | Reader | Progress Sync | Navigate 5 pages & close tab | Re-opening book restores exact page/CFI | Pass |
