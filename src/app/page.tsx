"use client";

import { useState, useMemo } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { BookOpen, Sparkles, AlertCircle, RefreshCw } from "lucide-react";
import { Book } from "@/lib/books-data";
import { useBooksQuery, useUploadBookMutation } from "@/hooks/useBookQueries";
import { useReaderStore } from "@/store/useReaderStore";
import { useAuthStore } from "@/store/useAuthStore";
import Header from "@/components/Header";
import CategoryCarousel from "@/components/CategoryCarousel";
import BookCard from "@/components/BookCard";
import BookDetailModal from "@/components/BookDetailModal";
import ReaderModal from "@/components/ReaderModal";
import AdminModal from "@/components/AdminModal";
import Footer from "@/components/Footer";

export default function HomePage() {
  const reduceMotion = useReducedMotion();
  const { theme } = useReaderStore();
  const { favorites } = useAuthStore();
  const { bookmarks, progress } = useReaderStore();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const [selectedBookDetail, setSelectedBookDetail] = useState<Book | null>(null);
  const [activeReaderBook, setActiveReaderBook] = useState<Book | null>(null);
  const [showAdminModal, setShowAdminModal] = useState(false);
  const [viewFilter, setViewFilter] = useState<"all" | "bookmarks" | "favorites">("all");

  const [visibleCount, setVisibleCount] = useState(16);

  // TanStack Query server-state hook
  const { data: booksData, isLoading, isError, error, refetch } = useBooksQuery({
    category: selectedCategory,
    search: searchQuery,
  });

  const uploadMutation = useUploadBookMutation();

  const catalog = booksData || [];

  // Filter books by view tab (Favorites, Bookmarks, All)
  const filteredBooks = useMemo(() => {
    return catalog.filter((book) => {
      if (viewFilter === "favorites" && !favorites.includes(book.id)) {
        return false;
      }
      if (viewFilter === "bookmarks") {
        const hasBookmark = bookmarks.some((b) => b.bookId === book.id);
        const hasProgress = Boolean(progress[book.id]);
        if (!hasBookmark && !hasProgress) return false;
      }
      return true;
    });
  }, [catalog, viewFilter, favorites, bookmarks, progress]);

  const displayedBooks = filteredBooks.slice(0, visibleCount);

  const cardMotion = reduceMotion
    ? {}
    : {
        whileHover: { y: -4, scale: 1.01 },
        whileTap: { scale: 0.98 },
      };

  return (
    <div className={theme === "dark" ? "dark" : ""}>
      <main className="min-h-screen bg-[#f6efe7] text-stone-900 transition-colors duration-300 dark:bg-[#100d0c] dark:text-stone-100">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          {/* Header Component */}
          <Header
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
            onOpenAdmin={() => setShowAdminModal(true)}
            onOpenBookmarks={() => setViewFilter(viewFilter === "bookmarks" ? "all" : "bookmarks")}
            onOpenFavorites={() => setViewFilter(viewFilter === "favorites" ? "all" : "favorites")}
          />

          {/* Featured Hero Banner */}
          <section className="mb-10 grid gap-6 lg:grid-cols-[1.5fr_1fr]">
            <motion.div
              className="rounded-[2.2rem] border border-stone-200/70 bg-white/70 p-8 shadow-lg backdrop-blur-xl dark:border-stone-800/80 dark:bg-stone-950/45 sm:p-10"
              initial={reduceMotion ? false : { opacity: 0, y: 16 }}
              animate={reduceMotion ? {} : { opacity: 1, y: 0 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
            >
              <div className="inline-flex items-center gap-2 rounded-full bg-amber-100 px-3.5 py-1 text-xs font-bold uppercase tracking-[0.25em] text-amber-900 dark:bg-amber-950/80 dark:text-amber-300">
                <Sparkles className="h-3.5 w-3.5" />
                Featured Reading
              </div>
              <h2 className="mt-5 text-4xl font-semibold leading-tight text-stone-900 dark:text-stone-100 sm:text-5xl">
                Read 120+ canonical titles in a calm, coffee-toned environment.
              </h2>
              <p className="mt-5 max-w-2xl text-base leading-relaxed text-stone-700 dark:text-stone-300">
                A modern web reading experience designed for focus. Enjoy customizable typography, fast EPUB/PDF page rendering, light/dark/sepia themes, and seamless cloud bookmarks.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <motion.button
                  {...cardMotion}
                  onClick={() => catalog.length > 0 && setActiveReaderBook(catalog[0])}
                  className="rounded-full bg-stone-900 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-stone-900/20 transition hover:bg-stone-800 dark:bg-amber-100 dark:text-stone-950 dark:hover:bg-amber-200"
                >
                  Start Reading Now
                </motion.button>
                <motion.button
                  {...cardMotion}
                  onClick={() => {
                    setSelectedCategory("Psychology / Behavior");
                    window.scrollTo({ top: 500, behavior: "smooth" });
                  }}
                  className="rounded-full border border-stone-300 bg-white/80 px-6 py-3 text-sm font-semibold text-stone-800 shadow-sm transition hover:bg-white dark:border-stone-700 dark:bg-stone-900/70 dark:text-stone-100 dark:hover:bg-stone-900"
                >
                  Explore Catalog
                </motion.button>
              </div>
            </motion.div>

            {/* Quick Metrics & Highlights */}
            <motion.aside
              className="flex flex-col justify-between rounded-[2.2rem] border border-stone-200/70 bg-gradient-to-br from-[#fffaf5]/90 to-[#e6d3bf]/70 p-8 shadow-lg backdrop-blur-xl dark:border-stone-800/80 dark:from-stone-950/70 dark:to-stone-900/60"
              initial={reduceMotion ? false : { opacity: 0, y: 16 }}
              animate={reduceMotion ? {} : { opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: "easeOut", delay: 0.05 }}
            >
              <div>
                <h3 className="text-xl font-bold text-stone-900 dark:text-stone-100">
                  Data Architecture v150
                </h3>
                <ul className="mt-4 space-y-3 text-sm text-stone-700 dark:text-stone-300">
                  <li className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-amber-800 dark:bg-amber-300" />
                    Centralized API layer & TanStack Query caching
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-amber-800 dark:bg-amber-300" />
                    Automatic request deduplication & cancellation
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-amber-800 dark:bg-amber-300" />
                    Zero-loss optimistic reading progress sync
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-amber-800 dark:bg-amber-300" />
                    Structured error normalization & retry policies
                  </li>
                </ul>
              </div>

              <div className="mt-6 border-t border-stone-300/60 pt-5 dark:border-stone-800/60">
                <div className="flex justify-between text-xs font-bold uppercase tracking-wider text-amber-900 dark:text-amber-300">
                  <span>Server-State Status</span>
                  <span>{isLoading ? "Fetching..." : `${catalog.length} Loaded`}</span>
                </div>
              </div>
            </motion.aside>
          </section>

          {/* Category Carousel Filter */}
          <CategoryCarousel
            selectedCategory={selectedCategory}
            onSelectCategory={(cat) => {
              setSelectedCategory(cat);
              setViewFilter("all");
            }}
          />

          {/* Active View Indicator */}
          <div className="mb-6 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-bold text-stone-900 dark:text-stone-100">
                {viewFilter === "favorites"
                  ? "My Favorite Books"
                  : viewFilter === "bookmarks"
                  ? "In-Progress & Bookmarked Books"
                  : selectedCategory === "All"
                  ? "All Books Catalog"
                  : selectedCategory}
              </h3>
              <span className="rounded-full bg-stone-200/80 px-2.5 py-0.5 text-xs font-bold text-stone-700 dark:bg-stone-800 dark:text-stone-300">
                {filteredBooks.length}
              </span>
            </div>

            {viewFilter !== "all" && (
              <button
                onClick={() => setViewFilter("all")}
                className="text-xs font-semibold text-amber-800 underline hover:text-amber-950 dark:text-amber-300 dark:hover:text-amber-200"
              >
                Reset Filter
              </button>
            )}
          </div>

          {/* Error State Banner */}
          {isError && (
            <div className="my-6 flex items-center justify-between rounded-2xl border border-rose-200 bg-rose-50/80 p-4 text-xs text-rose-900 dark:border-rose-900/60 dark:bg-rose-950/40 dark:text-rose-200">
              <div className="flex items-center gap-2">
                <AlertCircle className="h-4 w-4 text-rose-600 dark:text-rose-400" />
                <span>Failed to load books: {(error as any)?.message || "Network error"}</span>
              </div>
              <button
                onClick={() => refetch()}
                className="flex items-center gap-1 font-bold text-rose-800 underline dark:text-rose-300"
              >
                <RefreshCw className="h-3 w-3" /> Retry
              </button>
            </div>
          )}

          {/* Loading Skeleton or Books Grid */}
          {isLoading ? (
            <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {Array.from({ length: 8 }).map((_, idx) => (
                <div
                  key={idx}
                  className="h-80 animate-pulse rounded-[1.6rem] border border-stone-200/60 bg-white/40 p-5 dark:border-stone-800/40 dark:bg-stone-950/20"
                />
              ))}
            </div>
          ) : displayedBooks.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {displayedBooks.map((book) => (
                <BookCard
                  key={book.id}
                  book={book}
                  onOpenDetails={(b) => setSelectedBookDetail(b)}
                  onStartReading={(b) => setActiveReaderBook(b)}
                />
              ))}
            </div>
          ) : (
            <div className="my-16 flex flex-col items-center justify-center rounded-3xl border border-dashed border-stone-300 p-12 text-center dark:border-stone-800">
              <BookOpen className="h-10 w-10 text-stone-400" />
              <h4 className="mt-4 text-base font-bold text-stone-900 dark:text-stone-100">
                No matching books found
              </h4>
              <p className="mt-1 text-xs text-stone-500">
                Try resetting your search query or selecting another category.
              </p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("All");
                  setViewFilter("all");
                }}
                className="mt-4 rounded-full bg-amber-900 px-5 py-2 text-xs font-bold text-white dark:bg-amber-100 dark:text-stone-950"
              >
                Show All Books
              </button>
            </div>
          )}

          {/* Load More Button */}
          {displayedBooks.length < filteredBooks.length && (
            <div className="mt-10 flex justify-center">
              <button
                onClick={() => setVisibleCount((prev) => prev + 16)}
                className="rounded-full border border-stone-300 bg-white/80 px-8 py-3 text-xs font-bold text-stone-800 shadow-sm transition hover:bg-white dark:border-stone-700 dark:bg-stone-900 dark:text-stone-200 dark:hover:bg-stone-800"
              >
                Load More Books ({filteredBooks.length - displayedBooks.length} Remaining)
              </button>
            </div>
          )}
        </div>

        {/* Footer */}
        <Footer />
      </main>

      {/* Book Details Modal */}
      {selectedBookDetail && (
        <BookDetailModal
          book={selectedBookDetail}
          onClose={() => setSelectedBookDetail(null)}
          onStartReading={(b) => {
            setSelectedBookDetail(null);
            setActiveReaderBook(b);
          }}
        />
      )}

      {/* Reader Modal */}
      {activeReaderBook && (
        <ReaderModal
          book={activeReaderBook}
          onClose={() => setActiveReaderBook(null)}
        />
      )}

      {/* Admin Upload Modal */}
      {showAdminModal && (
        <AdminModal
          onClose={() => setShowAdminModal(false)}
          onAddBook={(newBook) => {
            uploadMutation.mutate(newBook);
          }}
        />
      )}
    </div>
  );
}
