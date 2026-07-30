"use client";

import { X, BookOpen, Star, Heart, Share2, Layers, CheckCircle2 } from "lucide-react";
import { Book } from "@/lib/books-data";
import { useAuthStore } from "@/store/useAuthStore";
import { useReaderStore } from "@/store/useReaderStore";

interface BookDetailModalProps {
  book: Book;
  onClose: () => void;
  onStartReading: (book: Book) => void;
}

export default function BookDetailModal({
  book,
  onClose,
  onStartReading,
}: BookDetailModalProps) {
  const { favorites, toggleFavorite } = useAuthStore();
  const { progress } = useReaderStore();

  const isFavorite = favorites.includes(book.id);
  const bookProgress = progress[book.id];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-950/60 p-4 backdrop-blur-md">
      <div className="relative w-full max-w-2xl overflow-hidden rounded-[2.2rem] border border-stone-200/80 bg-white p-6 shadow-2xl transition dark:border-stone-800 dark:bg-stone-950 sm:p-8">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-full bg-stone-100 text-stone-600 transition hover:bg-stone-200 dark:bg-stone-900 dark:text-stone-300 dark:hover:bg-stone-800"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="grid gap-6 sm:grid-cols-[180px_1fr]">
          {/* Cover Art Banner */}
          <div
            className={`flex h-64 w-full flex-col justify-end rounded-2xl bg-gradient-to-br ${book.coverColor} p-5 shadow-lg sm:h-full`}
          >
            <span className="text-[10px] font-bold uppercase tracking-widest text-amber-200/80">
              {book.category}
            </span>
            <h3 className="mt-2 text-lg font-bold leading-snug text-white">
              {book.title}
            </h3>
            <p className="mt-0.5 text-xs text-amber-100/90">{book.author}</p>
          </div>

          {/* Details Content */}
          <div className="flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3">
                <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-bold text-amber-900 dark:bg-amber-950 dark:text-amber-300">
                  {book.category}
                </span>
                <div className="flex items-center gap-1 text-xs font-bold text-amber-700 dark:text-amber-300">
                  <Star className="h-4 w-4 fill-amber-500 text-amber-500" />
                  <span>{book.rating} / 5.0</span>
                </div>
              </div>

              <h2 className="mt-3 text-2xl font-bold text-stone-900 dark:text-stone-100 sm:text-3xl">
                {book.title}
              </h2>
              <p className="text-sm font-medium text-stone-600 dark:text-stone-400">
                By {book.author}
              </p>

              <p className="mt-4 text-xs leading-relaxed text-stone-700 dark:text-stone-300 sm:text-sm">
                {book.description}
              </p>

              <div className="mt-4 flex flex-wrap gap-4 text-xs font-medium text-stone-500 dark:text-stone-400">
                <div className="flex items-center gap-1">
                  <Layers className="h-3.5 w-3.5 text-amber-800 dark:text-amber-300" />
                  <span>{book.pages} Pages</span>
                </div>
                <div className="flex items-center gap-1">
                  <BookOpen className="h-3.5 w-3.5 text-amber-800 dark:text-amber-300" />
                  <span>EPUB & PDF Format</span>
                </div>
              </div>

              {bookProgress && (
                <div className="mt-4 rounded-xl bg-amber-50/80 p-3 dark:bg-amber-950/40">
                  <div className="flex items-center justify-between text-xs font-medium text-amber-900 dark:text-amber-200">
                    <span className="flex items-center gap-1">
                      <CheckCircle2 className="h-3.5 w-3.5 text-amber-700 dark:text-amber-300" />
                      Reading Progress
                    </span>
                    <span>{bookProgress.percentage}%</span>
                  </div>
                  <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-amber-200 dark:bg-amber-900">
                    <div
                      className="h-full bg-amber-900 dark:bg-amber-300"
                      style={{ width: `${bookProgress.percentage}%` }}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Modal Actions */}
            <div className="mt-6 flex flex-wrap gap-3">
              <button
                onClick={() => {
                  onClose();
                  onStartReading(book);
                }}
                className="flex flex-1 items-center justify-center gap-2 rounded-full bg-stone-900 py-3 text-sm font-bold text-white shadow-lg transition hover:bg-stone-800 dark:bg-amber-100 dark:text-stone-950 dark:hover:bg-amber-200"
              >
                <BookOpen className="h-4 w-4" />
                {bookProgress ? "Continue Reading" : "Start Reading Now"}
              </button>
              <button
                onClick={() => toggleFavorite(book.id)}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-stone-300 bg-stone-50 text-stone-700 transition hover:bg-rose-50 hover:text-rose-600 dark:border-stone-700 dark:bg-stone-900 dark:text-stone-300 dark:hover:bg-rose-950/40 dark:hover:text-rose-400"
                title={isFavorite ? "Remove from Favorites" : "Add to Favorites"}
              >
                <Heart
                  className={`h-4 w-4 ${
                    isFavorite ? "fill-rose-500 text-rose-500" : ""
                  }`}
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
