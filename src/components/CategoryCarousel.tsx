"use client";

import { CATEGORIES } from "@/lib/books-data";

interface CategoryCarouselProps {
  selectedCategory: string;
  onSelectCategory: (cat: string) => void;
}

export default function CategoryCarousel({
  selectedCategory,
  onSelectCategory,
}: CategoryCarouselProps) {
  return (
    <div className="no-scrollbar mb-8 flex gap-2 overflow-x-auto pb-2 pt-1">
      {CATEGORIES.map((category) => {
        const isSelected = selectedCategory === category;
        return (
          <button
            key={category}
            onClick={() => onSelectCategory(category)}
            className={`whitespace-nowrap rounded-full px-4 py-2 text-xs font-medium transition-all duration-200 ${
              isSelected
                ? "bg-amber-900 text-white shadow-md dark:bg-amber-100 dark:text-stone-950"
                : "border border-stone-200/80 bg-white/60 text-stone-700 hover:bg-white dark:border-stone-800 dark:bg-stone-900/40 dark:text-stone-300 dark:hover:bg-stone-900"
            }`}
          >
            {category}
          </button>
        );
      })}
    </div>
  );
}
