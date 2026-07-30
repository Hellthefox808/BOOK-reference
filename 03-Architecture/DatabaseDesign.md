# Database Design & Schema Specification

## Prisma Schema Specification

```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

enum Role {
  USER
  ADMIN
}

model User {
  id               String            @id @default(uuid())
  name             String?
  email            String            @unique
  password         String?           // Nullable for OAuth users
  avatar           String?
  role             Role              @default(USER)
  createdAt        DateTime          @default(now())
  updatedAt        DateTime          @updatedAt

  readingProgresses ReadingProgress[]
  bookmarks        Bookmark[]
  favorites        Favorite[]
}

model Book {
  id          String   @id @default(uuid())
  title       String
  author      String
  description String   @db.Text
  cover       String
  fileUrl     String
  language    String   @default("en")
  pages       Int      @default(0)
  categoryId  String
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  category          Category          @relation(fields: [categoryId], references: [id])
  readingProgresses ReadingProgress[]
  bookmarks        Bookmark[]
  favorites        Favorite[]

  @@index([title])
  @@index([author])
}

model Category {
  id    String @id @default(uuid())
  name  String @unique
  books Book[]
}

model ReadingProgress {
  id         String   @id @default(uuid())
  userId     String
  bookId     String
  lastPage   Int      @default(1)
  percentage Float    @default(0.0)
  cfi        String?  // EPUB Canvas Location Index
  updatedAt  DateTime @updatedAt

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)
  book Book @relation(fields: [bookId], references: [id], onDelete: Cascade)

  @@unique([userId, bookId])
}

model Bookmark {
  id        String   @id @default(uuid())
  userId    String
  bookId    String
  page      Int
  title     String?
  cfi       String?
  createdAt DateTime @default(now())

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)
  book Book @relation(fields: [bookId], references: [id], onDelete: Cascade)
}

model Favorite {
  id        String   @id @default(uuid())
  userId    String
  bookId    String
  createdAt DateTime @default(now())

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)
  book Book @relation(fields: [bookId], references: [id], onDelete: Cascade)

  @@unique([userId, bookId])
}
```
