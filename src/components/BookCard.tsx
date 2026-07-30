"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Star, BookOpen, Heart, CheckCircle2 } from "lucide-react";
import { Book } from "@/lib/books-data";
import { useAuthStore } from "@/store/useAuthStore";
import { useReaderStore } from "@/store/useReaderStore";

interface BookCardProps {
  book: Book;
  onOpenDetails: (book: Book) => void;
  onStartReading: (book: Book) => void;
}

export default function BookCard({ book, onOpenDetails, onStartReading }: BookCardProps) {
  const reduceMotion = useReducedMotion();
  const { favorites, toggleFavorite } = useAuthStore();
  const { progress } = useReaderStore();

  const isFavorite = favorites.includes(book.id);
  const bookProgress = progress[book.id];

  return (
    <motion.article
      className="group relative flex flex-col justify-between rounded-[1.6rem] border border-stone-200/70 bg-white/70 p-5 shadow-sm backdrop-blur-xl transition hover:shadow-lg dark:border-stone-800/80 dark:bg-stone-950/40"
      initial={reduceMotion ? false : { opacity: 0, y: 10 }}
      animate={reduceMotion ? {} : { opacity: 1, y: 0 }}
      whileHover={reduceMotion ? undefined : { y: -4, scale: 1.01 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
    >
      {/* Top Bar: Category Badge & Favorite Heart */}
      <div className="flex items-center justify-between gap-2">
        <span className="rounded-full bg-amber-100/80 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-amber-900 dark:bg-amber-950/80 dark:text-amber-300">
          {book.category}
        </span>
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleFavorite(book.id);
          }}
          className="flex h-7 w-7 items-center justify-center rounded-full bg-stone-100 text-stone-400 transition hover:bg-rose-50 hover:text-rose-600 dark:bg-stone-900 dark:text-stone-500 dark:hover:bg-rose-950/40 dark:hover:text-rose-400"
          title={isFavorite ? "Remove from Favorites" : "Add to Favorites"}
        >
          <Heart
            className={`h-4 w-4 transition ${
              isFavorite ? "fill-rose-500 text-rose-500" : ""
            }`}
          />
        </button>
      </div>

      {/* Book Cover Banner */}
      <div 
        onClick={() => onOpenDetails(book)}
        className={`my-4 flex h-36 w-full cursor-pointer flex-col justify-end rounded-2xl bg-gradient-to-br ${book.coverColor} p-4 shadow-md transition group-hover:shadow-xl`}
      >
        <span className="text-[10px] uppercase tracking-widest text-amber-200/80">
          BookVerse Edition
        </span>
        <h4 className="line-clamp-2 text-base font-bold leading-snug text-white">
          {book.title}
        </h4>
        <p className="mt-0.5 text-xs text-amber-100/90">{book.author}</p>
      </div>

      {/* Metadata & Progress Bar */}
      <div>
        <div className="flex items-center justify-between text-xs text-stone-500 dark:text-stone-400">
          <div className="flex items-center gap-1 font-medium text-amber-700 dark:text-amber-300">
            <Star className="h-3.5 w-3.5 fill-amber-500 text-amber-500" />
            <span>{book.rating}</span>
          </div>
          <span>{book.pages} pages</span>
        </div>

        {bookProgress && (
          <div className="mt-3">
            <div className="flex items-center justify-between text-[11px] font-medium text-stone-600 dark:text-stone-400">
              <span className="flex items-center gap-1 text-amber-800 dark:text-amber-300">
                <CheckCircle2 className="h-3 w-3" />
                Reading Progress
              </span>
              <span>{bookProgress.percentage}%</span>
            </div>
            <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-stone-200 dark:bg-stone-800">
              <div
                className="h-full bg-amber-800 transition-all duration-300 dark:bg-amber-300"
                style={{ width: `${bookProgress.percentage}%` }}
              />
            </div>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="mt-4 flex gap-2">
        <button
          onClick={() => onStartReading(book)}
          className="flex flex-1 items-center justify-center gap-1.5 rounded-full bg-stone-900 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-stone-800 dark:bg-amber-100 dark:text-stone-950 dark:hover:bg-amber-200"
        >
          <BookOpen className="h-3.5 w-3.5" />
          {bookProgress ? "Continue" : "Read Now"}
        </button>
        <button
          onClick={() => onOpenDetails(book)}
          className="rounded-full border border-stone-300 bg-white px-3 py-2 text-xs font-medium text-stone-700 transition hover:bg-stone-50 dark:border-stone-700 dark:bg-stone-900 dark:text-stone-300 dark:hover:bg-stone-800"
        >
          Details
        </button>
      </div>
    </motion.article>
  );
}
