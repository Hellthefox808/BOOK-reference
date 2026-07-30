"use client";

import { useState } from "react";
import { 
  BookOpen, 
  Search, 
  Sun, 
  Moon, 
  Bookmark, 
  Heart, 
  PlusCircle, 
  User, 
  SlidersHorizontal,
  LogOut
} from "lucide-react";
import { useReaderStore } from "@/store/useReaderStore";
import { useAuthStore } from "@/store/useAuthStore";
import { CATEGORIES } from "@/lib/books-data";

interface HeaderProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  selectedCategory: string;
  onSelectCategory: (cat: string) => void;
  onOpenAdmin: () => void;
  onOpenBookmarks: () => void;
  onOpenFavorites: () => void;
}

export default function Header({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onSelectCategory,
  onOpenAdmin,
  onOpenBookmarks,
  onOpenFavorites,
}: HeaderProps) {
  const { theme, setTheme, bookmarks } = useReaderStore();
  const { user, isAuthenticated, logout, favorites } = useAuthStore();
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const toggleDarkMode = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <header className="sticky top-4 z-40 mb-8 rounded-3xl border border-stone-200/70 bg-white/70 px-5 py-4 shadow-sm backdrop-blur-xl transition dark:border-stone-700/60 dark:bg-stone-950/50">
      <div className="flex flex-wrap items-center justify-between gap-4">
        {/* Brand Logo */}
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-amber-900 text-amber-100 shadow-md dark:bg-amber-100 dark:text-stone-950">
            <BookOpen className="h-6 w-6" />
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-amber-800 dark:text-amber-300">
              BookVerse
            </p>
            <h1 className="text-lg font-semibold text-stone-900 dark:text-stone-100 sm:text-xl">
              Coffee Reader
            </h1>
          </div>
        </div>

        {/* Search Input Bar */}
        <div className="relative flex-1 max-w-md min-w-[240px]">
          <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400 dark:text-stone-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search 120+ titles, authors, or genres..."
            className="w-full rounded-full border border-stone-300/80 bg-stone-50/80 pl-11 pr-4 py-2.5 text-sm text-stone-800 placeholder-stone-400 outline-none transition focus:border-amber-700 focus:bg-white focus:ring-2 focus:ring-amber-700/20 dark:border-stone-700 dark:bg-stone-900/60 dark:text-stone-100 dark:placeholder-stone-500 dark:focus:border-amber-300 dark:focus:ring-amber-300/20"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-stone-400 hover:text-stone-600 dark:hover:text-stone-200"
            >
              Clear
            </button>
          )}
        </div>

        {/* Header Action Buttons */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Category Dropdown (Mobile/Compact) */}
          <div className="relative md:hidden">
            <select
              value={selectedCategory}
              onChange={(e) => onSelectCategory(e.target.value)}
              className="rounded-full border border-stone-300 bg-white/80 px-3 py-2 text-xs font-medium text-stone-800 outline-none dark:border-stone-700 dark:bg-stone-900 dark:text-stone-200"
            >
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Bookmarks Button */}
          <button
            onClick={onOpenBookmarks}
            className="relative flex items-center gap-1.5 rounded-full border border-stone-300/80 bg-stone-100/70 px-3.5 py-2 text-xs font-medium text-stone-800 transition hover:bg-white dark:border-stone-700 dark:bg-stone-900/70 dark:text-stone-200 dark:hover:bg-stone-900"
            title="Saved Bookmarks"
          >
            <Bookmark className="h-4 w-4 text-amber-800 dark:text-amber-300" />
            <span className="hidden sm:inline">Bookmarks</span>
            {bookmarks.length > 0 && (
              <span className="ml-1 flex h-4 w-4 items-center justify-center rounded-full bg-amber-800 text-[10px] font-bold text-white dark:bg-amber-300 dark:text-stone-950">
                {bookmarks.length}
              </span>
            )}
          </button>

          {/* Favorites Button */}
          <button
            onClick={onOpenFavorites}
            className="relative flex items-center gap-1.5 rounded-full border border-stone-300/80 bg-stone-100/70 px-3.5 py-2 text-xs font-medium text-stone-800 transition hover:bg-white dark:border-stone-700 dark:bg-stone-900/70 dark:text-stone-200 dark:hover:bg-stone-900"
            title="My Favorites"
          >
            <Heart className="h-4 w-4 text-rose-600 dark:text-rose-400" />
            <span className="hidden sm:inline">Favorites</span>
            {favorites.length > 0 && (
              <span className="ml-1 flex h-4 w-4 items-center justify-center rounded-full bg-rose-600 text-[10px] font-bold text-white dark:bg-rose-400 dark:text-stone-950">
                {favorites.length}
              </span>
            )}
          </button>

          {/* Upload / Admin Button */}
          <button
            onClick={onOpenAdmin}
            className="flex items-center gap-1.5 rounded-full bg-amber-900 px-3.5 py-2 text-xs font-medium text-amber-100 transition hover:bg-amber-800 dark:bg-amber-100 dark:text-stone-950 dark:hover:bg-amber-200 shadow-sm"
          >
            <PlusCircle className="h-4 w-4" />
            <span className="hidden sm:inline">Upload Book</span>
          </button>

          {/* Light / Dark Mode Toggle */}
          <button
            onClick={toggleDarkMode}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-stone-300 bg-stone-100/80 text-stone-700 transition hover:bg-stone-200 dark:border-stone-700 dark:bg-stone-900 dark:text-stone-200 dark:hover:bg-stone-800"
            title={theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"}
          >
            {theme === "dark" ? (
              <Sun className="h-4 w-4 text-amber-300" />
            ) : (
              <Moon className="h-4 w-4 text-stone-700" />
            )}
          </button>

          {/* User Profile Avatar & Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowProfileMenu((prev) => !prev)}
              className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border-2 border-amber-800/60 transition hover:scale-105 dark:border-amber-300/60"
            >
              {user?.avatar ? (
                // eslint-disable-next-next/no-img-element
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="h-full w-full object-cover"
                />
              ) : (
                <User className="h-4 w-4 text-stone-700 dark:text-stone-200" />
              )}
            </button>

            {showProfileMenu && (
              <div className="absolute right-0 mt-3 w-56 rounded-2xl border border-stone-200/80 bg-white p-3 shadow-xl backdrop-blur-xl dark:border-stone-700/70 dark:bg-stone-900">
                <div className="border-b border-stone-100 pb-2.5 dark:border-stone-800">
                  <p className="text-sm font-semibold text-stone-900 dark:text-stone-100">
                    {user?.name || "Guest Reader"}
                  </p>
                  <p className="text-xs text-stone-500 dark:text-stone-400">
                    {user?.email || "guest@bookverse.com"}
                  </p>
                </div>
                <div className="pt-2">
                  <button
                    onClick={() => {
                      logout();
                      setShowProfileMenu(false);
                    }}
                    className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-xs font-medium text-rose-600 hover:bg-rose-50 dark:text-rose-400 dark:hover:bg-rose-950/40"
                  >
                    <LogOut className="h-3.5 w-3.5" />
                    Sign Out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
