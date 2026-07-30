# State Management Architecture

## Zustand Stores Breakdown

### 1. Reader Preference Store (`useReaderStore`)
```typescript
interface ReaderState {
  theme: 'light' | 'dark' | 'sepia' | 'midnight';
  fontSize: number; // 12 - 32
  fontFamily: 'serif' | 'sans' | 'dyslexic' | 'mono';
  lineSpacing: number; // 1.2, 1.6, 2.0
  scrollMode: 'paginated' | 'continuous';
  isFullscreen: boolean;
  setTheme: (theme: ReaderState['theme']) => void;
  setFontSize: (size: number) => void;
  toggleFullscreen: () => void;
}
```

### 2. Reading Progress Store (`useProgressStore`)
```typescript
interface ProgressState {
  currentBookId: string | null;
  page: number;
  percentage: number;
  cfi: string | null;
  updatePosition: (page: number, percentage: number, cfi?: string) => void;
  syncToCloud: () => Promise<void>;
}
```

---

## Server State (TanStack Query)
- Handled via TanStack Query hooks for server cache invalidation:
  - `useBook(id)`
  - `useSearchBooks(query)`
  - `useBookmarks(bookId)`
  - `useReadingHistory()`
