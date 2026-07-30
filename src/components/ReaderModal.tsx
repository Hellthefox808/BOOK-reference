"use client";

import { useState, useEffect } from "react";
import { 
  X, 
  ChevronLeft, 
  ChevronRight, 
  Type, 
  Bookmark, 
  ListOrdered, 
  Maximize2, 
  Minimize2, 
  Sparkles,
  Check,
} from "lucide-react";
import { Book } from "@/lib/books-data";
import { useReaderStore, ReaderTheme, FontFamily } from "@/store/useReaderStore";
import AIAssistantDrawer from "@/components/AIAssistantDrawer";

interface ReaderModalProps {
  book: Book;
  onClose: () => void;
}

export default function ReaderModal({ book, onClose }: ReaderModalProps) {
  const {
    theme,
    setTheme,
    fontSize,
    setFontSize,
    fontFamily,
    setFontFamily,
    lineSpacing,
    activeChapterIndex,
    setChapterIndex,
    bookmarks,
    toggleBookmark,
    updateProgress,
  } = useReaderStore();

  const [showTypography, setShowTypography] = useState(false);
  const [showTOC, setShowTOC] = useState(false);
  const [showAIDrawer, setShowAIDrawer] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const totalChapters = book.sampleContent.length;
  const currentChapterText = book.sampleContent[activeChapterIndex] || book.sampleContent[0];
  const currentChapterTitle = `Chapter ${activeChapterIndex + 1}`;

  // Keyboard navigation & shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" && activeChapterIndex < totalChapters - 1) {
        setChapterIndex(activeChapterIndex + 1);
      } else if (e.key === "ArrowLeft" && activeChapterIndex > 0) {
        setChapterIndex(activeChapterIndex - 1);
      } else if (e.key.toLowerCase() === "b") {
        toggleBookmark(book.id, activeChapterIndex + 1, currentChapterTitle);
      } else if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeChapterIndex, totalChapters, book.id, currentChapterTitle, setChapterIndex, toggleBookmark, onClose]);

  // Sync progress on chapter change
  useEffect(() => {
    updateProgress(book.id, activeChapterIndex + 1, totalChapters);
  }, [activeChapterIndex, totalChapters, book.id, updateProgress]);

  // Fullscreen helper
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().then(() => setIsFullscreen(true)).catch(() => {});
    } else {
      document.exitFullscreen().then(() => setIsFullscreen(false)).catch(() => {});
    }
  };

  // Theme style mapping
  const getThemeClasses = (t: ReaderTheme) => {
    switch (t) {
      case "dark":
        return "bg-[#100d0c] text-stone-100";
      case "sepia":
        return "bg-[#fbf0d9] text-[#4a3e2a]";
      case "midnight":
        return "bg-[#0b0f19] text-[#9ca3af]";
      case "light":
      default:
        return "bg-[#f6efe7] text-stone-900";
    }
  };

  const getFontFamilyClass = (f: FontFamily) => {
    switch (f) {
      case "serif":
        return "font-serif";
      case "mono":
        return "font-mono";
      case "sans":
      default:
        return "font-sans";
    }
  };

  const isBookmarked = bookmarks.some(
    (b) => b.bookId === book.id && b.page === activeChapterIndex + 1
  );

  return (
    <div className={`fixed inset-0 z-50 flex flex-col transition-colors duration-300 ${getThemeClasses(theme)}`}>
      {/* Top Reader Controls Header */}
      <header className="flex items-center justify-between border-b border-stone-300/30 px-6 py-4 dark:border-stone-800/40">
        <div className="flex items-center gap-3">
          <button
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-stone-300/40 bg-stone-200/40 hover:bg-stone-300/60 dark:border-stone-700/50 dark:bg-stone-800/50 dark:hover:bg-stone-700"
            title="Exit Reader (Esc)"
          >
            <X className="h-4 w-4" />
          </button>
          <div>
            <h2 className="text-sm font-bold sm:text-base">{book.title}</h2>
            <p className="text-xs opacity-75">{book.author} — {currentChapterTitle}</p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          {/* AI Reading Assistant Button */}
          <button
            onClick={() => {
              setShowAIDrawer((v) => !v);
              setShowTypography(false);
              setShowTOC(false);
            }}
            className={`flex h-9 items-center gap-1.5 rounded-full px-3 text-xs font-semibold shadow-sm transition ${
              showAIDrawer
                ? "bg-amber-800 text-white dark:bg-amber-100 dark:text-stone-950"
                : "border border-amber-800/40 bg-amber-100/60 text-amber-900 dark:border-amber-300/40 dark:bg-amber-950/60 dark:text-amber-300"
            }`}
            title="AI Reading Assistant"
          >
            <Sparkles className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">AI Assistant</span>
          </button>

          {/* Typography Settings Button */}
          <button
            onClick={() => {
              setShowTypography((v) => !v);
              setShowTOC(false);
              setShowAIDrawer(false);
            }}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-stone-300/40 bg-stone-200/40 transition hover:bg-stone-300/60 dark:border-stone-700/50 dark:bg-stone-800/50"
            title="Typography & Appearance"
          >
            <Type className="h-4 w-4" />
          </button>

          {/* Table of Contents Button */}
          <button
            onClick={() => {
              setShowTOC((v) => !v);
              setShowTypography(false);
              setShowAIDrawer(false);
            }}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-stone-300/40 bg-stone-200/40 transition hover:bg-stone-300/60 dark:border-stone-700/50 dark:bg-stone-800/50"
            title="Table of Contents"
          >
            <ListOrdered className="h-4 w-4" />
          </button>

          {/* Bookmark Button */}
          <button
            onClick={() => toggleBookmark(book.id, activeChapterIndex + 1, currentChapterTitle)}
            className={`flex h-9 w-9 items-center justify-center rounded-full border border-stone-300/40 transition ${
              isBookmarked
                ? "bg-amber-800 text-white dark:bg-amber-300 dark:text-stone-950"
                : "bg-stone-200/40 hover:bg-stone-300/60 dark:bg-stone-800/50"
            }`}
            title="Bookmark Chapter (B)"
          >
            <Bookmark className={`h-4 w-4 ${isBookmarked ? "fill-current" : ""}`} />
          </button>

          {/* Fullscreen Toggle */}
          <button
            onClick={toggleFullscreen}
            className="hidden h-9 w-9 items-center justify-center rounded-full border border-stone-300/40 bg-stone-200/40 transition hover:bg-stone-300/60 sm:flex dark:border-stone-700/50 dark:bg-stone-800/50"
            title="Toggle Fullscreen (F)"
          >
            {isFullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
          </button>
        </div>
      </header>

      {/* AI Assistant Drawer */}
      {showAIDrawer && (
        <AIAssistantDrawer
          bookTitle={book.title}
          chapterTitle={currentChapterTitle}
          chapterText={currentChapterText}
          onClose={() => setShowAIDrawer(false)}
        />
      )}

      {/* Typography Drawer */}
      {showTypography && (
        <div className="absolute right-6 top-16 z-50 w-72 rounded-2xl border border-stone-300/60 bg-white/95 p-4 text-stone-900 shadow-2xl backdrop-blur-xl dark:border-stone-700 dark:bg-stone-900 dark:text-stone-100">
          <h3 className="mb-3 text-xs font-bold uppercase tracking-wider text-amber-800 dark:text-amber-300">
            Reader Settings
          </h3>

          {/* Theme Selector */}
          <div className="mb-4">
            <span className="mb-1.5 block text-xs font-medium text-stone-600 dark:text-stone-400">Theme</span>
            <div className="grid grid-cols-4 gap-1.5">
              {(["light", "sepia", "dark", "midnight"] as ReaderTheme[]).map((t) => (
                <button
                  key={t}
                  onClick={() => setTheme(t)}
                  className={`rounded-lg py-1.5 text-xs capitalize font-semibold transition ${
                    theme === t
                      ? "ring-2 ring-amber-700 dark:ring-amber-300"
                      : "opacity-70 hover:opacity-100"
                  } ${
                    t === "light"
                      ? "bg-[#f6efe7] text-stone-900"
                      : t === "sepia"
                      ? "bg-[#fbf0d9] text-[#4a3e2a]"
                      : t === "dark"
                      ? "bg-[#100d0c] text-stone-100"
                      : "bg-[#0b0f19] text-[#9ca3af]"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* Font Size Slider */}
          <div className="mb-4">
            <div className="flex items-center justify-between text-xs font-medium text-stone-600 dark:text-stone-400">
              <span>Font Size</span>
              <span>{fontSize}px</span>
            </div>
            <input
              type="range"
              min="14"
              max="28"
              value={fontSize}
              onChange={(e) => setFontSize(Number(e.target.value))}
              className="mt-1 w-full accent-amber-800 dark:accent-amber-300"
            />
          </div>

          {/* Font Family Switcher */}
          <div>
            <span className="mb-1.5 block text-xs font-medium text-stone-600 dark:text-stone-400">Font Family</span>
            <div className="grid grid-cols-3 gap-1.5">
              {(["serif", "sans", "mono"] as FontFamily[]).map((f) => (
                <button
                  key={f}
                  onClick={() => setFontFamily(f)}
                  className={`rounded-lg border px-2 py-1 text-xs capitalize font-medium ${
                    fontFamily === f
                      ? "border-amber-800 bg-amber-100 text-amber-900 dark:border-amber-300 dark:bg-amber-950 dark:text-amber-200"
                      : "border-stone-200 dark:border-stone-800"
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Table of Contents Drawer */}
      {showTOC && (
        <div className="absolute right-6 top-16 z-50 w-72 rounded-2xl border border-stone-300/60 bg-white/95 p-4 text-stone-900 shadow-2xl backdrop-blur-xl dark:border-stone-700 dark:bg-stone-900 dark:text-stone-100">
          <h3 className="mb-3 text-xs font-bold uppercase tracking-wider text-amber-800 dark:text-amber-300">
            Table of Contents
          </h3>
          <div className="space-y-1">
            {book.sampleContent.map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setChapterIndex(idx);
                  setShowTOC(false);
                }}
                className={`flex w-full items-center justify-between rounded-xl px-3 py-2 text-xs font-medium transition ${
                  activeChapterIndex === idx
                    ? "bg-amber-900 text-white dark:bg-amber-100 dark:text-stone-950"
                    : "hover:bg-stone-100 dark:hover:bg-stone-800"
                }`}
              >
                <span>Chapter {idx + 1}</span>
                {activeChapterIndex === idx && <Check className="h-3.5 w-3.5" />}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Main Reading Canvas */}
      <main className="no-scrollbar flex-1 overflow-y-auto px-6 py-10 sm:px-12 lg:px-24">
        <div className="mx-auto max-w-3xl">
          <div
            className={`prose max-w-none leading-relaxed transition-all ${getFontFamilyClass(fontFamily)}`}
            style={{
              fontSize: `${fontSize}px`,
              lineHeight: lineSpacing,
            }}
          >
            {currentChapterText.split("\n\n").map((para, i) => (
              <p key={i} className="mb-6 indent-4 leading-relaxed opacity-95">
                {para}
              </p>
            ))}
          </div>
        </div>
      </main>

      {/* Bottom Footer & Chapter Switcher Bar */}
      <footer className="flex items-center justify-between border-t border-stone-300/30 px-6 py-4 dark:border-stone-800/40">
        <button
          disabled={activeChapterIndex === 0}
          onClick={() => setChapterIndex(activeChapterIndex - 1)}
          className="flex items-center gap-1.5 rounded-full border border-stone-300/40 px-4 py-2 text-xs font-medium transition disabled:opacity-30 dark:border-stone-700/50"
        >
          <ChevronLeft className="h-4 w-4" />
          Previous
        </button>

        <div className="flex items-center gap-2 text-xs font-semibold">
          <span>Page {activeChapterIndex + 1} of {totalChapters}</span>
          <span className="opacity-40">•</span>
          <span>{Math.round(((activeChapterIndex + 1) / totalChapters) * 100)}% Completed</span>
        </div>

        <button
          disabled={activeChapterIndex === totalChapters - 1}
          onClick={() => setChapterIndex(activeChapterIndex + 1)}
          className="flex items-center gap-1.5 rounded-full border border-stone-300/40 px-4 py-2 text-xs font-medium transition disabled:opacity-30 dark:border-stone-700/50"
        >
          Next
          <ChevronRight className="h-4 w-4" />
        </button>
      </footer>
    </div>
  );
}
