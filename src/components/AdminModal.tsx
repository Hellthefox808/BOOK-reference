"use client";

import { useState } from "react";
import { X, Upload, FileText, CheckCircle2, AlertCircle } from "lucide-react";
import { CATEGORIES, Book } from "@/lib/books-data";

interface AdminModalProps {
  onClose: () => void;
  onAddBook: (newBook: Book) => void;
}

export default function AdminModal({ onClose, onAddBook }: AdminModalProps) {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [category, setCategory] = useState("Psychology / Behavior");
  const [description, setDescription] = useState("");
  const [fileName, setFileName] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !author) return;

    const newBook: Book = {
      id: `book-user-${Date.now()}`,
      title,
      author,
      category,
      description: description || "Custom uploaded book in BookVerse digital library.",
      pages: 240,
      rating: 5.0,
      coverColor: "from-amber-900 via-stone-800 to-amber-950",
      sampleContent: [
        `CHAPTER 1: INTRODUCTION TO ${title.toUpperCase()}\n\nWelcome to your newly uploaded digital volume. BookVerse parsing engines have successfully ingested your EPUB/PDF binary stream into private Cloudflare R2 object storage.`,
        `CHAPTER 2: COMPREHENSIVE TEXT\n\nReading experience rendered smoothly in coffee-toned warmth with custom typography controls, dark mode, and cloud bookmarking.`
      ],
      trending: true,
    };

    onAddBook(newBook);
    setSubmitted(true);
    setTimeout(() => {
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-950/60 p-4 backdrop-blur-md">
      <div className="relative w-full max-w-lg rounded-[2rem] border border-stone-200/80 bg-white p-6 shadow-2xl transition dark:border-stone-800 dark:bg-stone-950 sm:p-8">
        <button
          onClick={onClose}
          className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-full bg-stone-100 text-stone-600 transition hover:bg-stone-200 dark:bg-stone-900 dark:text-stone-300 dark:hover:bg-stone-800"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-amber-100 text-amber-900 dark:bg-amber-950 dark:text-amber-300">
            <Upload className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-stone-900 dark:text-stone-100">
              Upload New Book
            </h3>
            <p className="text-xs text-stone-500 dark:text-stone-400">
              Admin & Publisher Content Ingestion Portal
            </p>
          </div>
        </div>

        {submitted ? (
          <div className="my-8 flex flex-col items-center justify-center py-6 text-center">
            <CheckCircle2 className="h-12 w-12 text-emerald-600 dark:text-emerald-400" />
            <h4 className="mt-3 text-lg font-bold text-stone-900 dark:text-stone-100">
              Book Successfully Ingested!
            </h4>
            <p className="mt-1 text-xs text-stone-500 dark:text-stone-400">
              {title} by {author} is now live in the catalog.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div>
              <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300">
                Book Title *
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Cognitive Psychology & Mind"
                className="mt-1 w-full rounded-xl border border-stone-300 bg-stone-50/80 px-3.5 py-2 text-sm text-stone-900 outline-none focus:border-amber-700 dark:border-stone-700 dark:bg-stone-900 dark:text-stone-100"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300">
                Author Name *
              </label>
              <input
                type="text"
                required
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                placeholder="e.g. Dr. Sarah Jenkins"
                className="mt-1 w-full rounded-xl border border-stone-300 bg-stone-50/80 px-3.5 py-2 text-sm text-stone-900 outline-none focus:border-amber-700 dark:border-stone-700 dark:bg-stone-900 dark:text-stone-100"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300">
                  Category Genre
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="mt-1 w-full rounded-xl border border-stone-300 bg-stone-50/80 px-3 py-2 text-xs font-medium text-stone-900 outline-none dark:border-stone-700 dark:bg-stone-900 dark:text-stone-100"
                >
                  {CATEGORIES.filter((c) => c !== "All").map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300">
                  Upload Binary File
                </label>
                <label className="mt-1 flex cursor-pointer items-center justify-center gap-1.5 rounded-xl border border-dashed border-stone-300 bg-stone-50 px-3 py-2 text-xs font-medium text-stone-700 hover:bg-stone-100 dark:border-stone-700 dark:bg-stone-900 dark:text-stone-300 dark:hover:bg-stone-850">
                  <FileText className="h-4 w-4 text-amber-800 dark:text-amber-300" />
                  <span className="truncate">{fileName || ".EPUB / .PDF"}</span>
                  <input
                    type="file"
                    accept=".epub,.pdf"
                    className="hidden"
                    onChange={(e) => {
                      if (e.target.files?.[0]) {
                        setFileName(e.target.files[0].name);
                      }
                    }}
                  />
                </label>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300">
                Book Synopsis / Summary
              </label>
              <textarea
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Short summary of key themes..."
                className="mt-1 w-full rounded-xl border border-stone-300 bg-stone-50/80 px-3.5 py-2 text-sm text-stone-900 outline-none focus:border-amber-700 dark:border-stone-700 dark:bg-stone-900 dark:text-stone-100"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full rounded-full bg-amber-900 py-3 text-sm font-bold text-amber-100 shadow-md transition hover:bg-amber-800 dark:bg-amber-100 dark:text-stone-950 dark:hover:bg-amber-200"
              >
                Publish Book to Catalog
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
