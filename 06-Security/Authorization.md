# Authorization & Role-Based Access Control (RBAC)

## RBAC Matrix

| Resource / Endpoint | Guest | User | Admin |
| :--- | :--- | :--- | :--- |
| Public Landing / Catalog (`/`, `/books`) | Read | Read | Read |
| Read Public Book (`/reader/:id`) | Read | Read | Read |
| Save Reading Progress (`PUT /progress`) | Denied | Write | Write |
| Save Bookmarks (`POST /bookmark`) | Denied | Write | Write |
| Manage Favorites (`POST /favorites`) | Denied | Write | Write |
| Upload / Delete Book (`/admin/books`) | Denied | Denied | Full Access |
| User Analytics Dashboard (`/admin/users`) | Denied | Denied | Full Access |
