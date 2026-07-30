# API Endpoints Specification

## Authentication Endpoints

### 1. Register User
- **Method**: `POST`
- **Endpoint**: `/api/auth/register`
- **Body**:
  ```json
  {
    "name": "Jane Doe",
    "email": "jane@example.com",
    "password": "SecurePassword123!"
  }
  ```
- **Response** (`201 Created`):
  ```json
  {
    "success": true,
    "data": {
      "id": "usr-12345",
      "email": "jane@example.com",
      "accessToken": "eyJhbGci..."
    }
  }
  ```

---

### 2. Login User
- **Method**: `POST`
- **Endpoint**: `/api/auth/login`
- **Body**:
  ```json
  {
    "email": "jane@example.com",
    "password": "SecurePassword123!"
  }
  ```

---

## Books & Library Endpoints

### 3. Get Books Catalog
- **Method**: `GET`
- **Endpoint**: `/api/books?category=psychology&page=1&limit=20`

### 4. Get Book Details
- **Method**: `GET`
- **Endpoint**: `/api/books/:id`

### 5. Search Books
- **Method**: `GET`
- **Endpoint**: `/api/books/search?q=cognitive`

---

## Reader & Progress Endpoints

### 6. Get Reader Stream / Signed URL
- **Method**: `GET`
- **Endpoint**: `/api/reader/:bookId`
- **Response**:
  ```json
  {
    "success": true,
    "data": {
      "bookId": "bk-98765",
      "signedFileUrl": "https://r2.bookverse.com/signed/book.epub?token=...",
      "lastProgress": {
        "page": 42,
        "percentage": 18.5,
        "cfi": "epubcfi(/6/4[chap01]!/4/2/1:0)"
      }
    }
  }
  ```

### 7. Update Reading Progress
- **Method**: `PUT`
- **Endpoint**: `/api/progress`
- **Body**:
  ```json
  {
    "bookId": "bk-98765",
    "lastPage": 43,
    "percentage": 19.1,
    "cfi": "epubcfi(/6/4[chap01]!/4/4/1:0)"
  }
  ```

---

## Bookmark Endpoints

### 8. Add Bookmark
- **Method**: `POST`
- **Endpoint**: `/api/bookmark`
- **Body**:
  ```json
  {
    "bookId": "bk-98765",
    "page": 43,
    "title": "Chapter 2 - Cognitive Perception",
    "cfi": "epubcfi(/6/4[chap01]!/4/4/1:0)"
  }
  ```

---

## Admin Endpoints

### 9. Upload Book (Admin Only)
- **Method**: `POST`
- **Endpoint**: `/api/admin/books`
- **Headers**: `Authorization: Bearer <AdminToken>`
- **Body**: `multipart/form-data` (`title`, `author`, `categoryId`, `coverImage`, `bookFile`)
