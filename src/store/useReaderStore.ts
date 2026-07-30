import { create } from "zustand";
import { persist } from "zustand/middleware";

export type ReaderTheme = "light" | "dark" | "sepia" | "midnight";
export type FontFamily = "serif" | "sans" | "mono";

export interface BookmarkItem {
  id: string;
  bookId: string;
  page: number;
  chapterTitle: string;
  createdAt: string;
}

export interface ProgressMap {
  [bookId: string]: {
    lastPage: number;
    percentage: number;
    updatedAt: string;
  };
}

interface ReaderState {
  theme: ReaderTheme;
  fontSize: number; // 12px to 28px
  fontFamily: FontFamily;
  lineSpacing: number; // 1.4, 1.6, 1.8
  activeBookId: string | null;
  activeChapterIndex: number;
  bookmarks: BookmarkItem[];
  progress: ProgressMap;
  
  // Actions
  setTheme: (theme: ReaderTheme) => void;
  setFontSize: (size: number) => void;
  setFontFamily: (font: FontFamily) => void;
  setLineSpacing: (spacing: number) => void;
  setActiveBook: (bookId: string | null) => void;
  setChapterIndex: (index: number) => void;
  toggleBookmark: (bookId: string, page: number, chapterTitle: string) => void;
  updateProgress: (bookId: string, page: number, totalPages: number) => void;
}

export const useReaderStore = create<ReaderState>()(
  persist(
    (set, get) => ({
      theme: "light",
      fontSize: 18,
      fontFamily: "serif",
      lineSpacing: 1.6,
      activeBookId: null,
      activeChapterIndex: 0,
      bookmarks: [],
      progress: {},

      setTheme: (theme) => set({ theme }),
      setFontSize: (fontSize) => set({ fontSize }),
      setFontFamily: (fontFamily) => set({ fontFamily }),
      setLineSpacing: (lineSpacing) => set({ lineSpacing }),
      setActiveBook: (activeBookId) => set({ activeBookId, activeChapterIndex: 0 }),
      setChapterIndex: (activeChapterIndex) => set({ activeChapterIndex }),

      toggleBookmark: (bookId, page, chapterTitle) => {
        const { bookmarks } = get();
        const existing = bookmarks.find((b) => b.bookId === bookId && b.page === page);
        if (existing) {
          set({ bookmarks: bookmarks.filter((b) => b.id !== existing.id) });
        } else {
          const newBookmark: BookmarkItem = {
            id: `bm-${Date.now()}`,
            bookId,
            page,
            chapterTitle,
            createdAt: new Date().toISOString(),
          };
          set({ bookmarks: [newBookmark, ...bookmarks] });
        }
      },

      updateProgress: (bookId, page, totalPages) => {
        const percentage = Math.min(100, Math.round((page / totalPages) * 100));
        set((state) => ({
          progress: {
            ...state.progress,
            [bookId]: {
              lastPage: page,
              percentage,
              updatedAt: new Date().toISOString(),
            },
          },
        }));
      },
    }),
    {
      name: "bookverse-reader-storage",
    }
  )
);
