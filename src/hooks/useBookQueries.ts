"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/lib/api/api-client";
import { fetchLiveBooks } from "@/lib/api/live-books-api";
import { PaginationParams, ReadingProgressPayload, BookmarkPayload } from "@/lib/api/api-types";
import { Book } from "@/lib/books-data";

export const QUERY_KEYS = {
  books: (params?: PaginationParams) => ["books", params] as const,
  liveBooks: (query: string, category: string) => ["liveBooks", query, category] as const,
  bookDetail: (id: string) => ["book", id] as const,
  progress: (bookId: string) => ["progress", bookId] as const,
};

/**
 * Hook to fetch paginated books from seed catalog
 */
export function useBooksQuery(params?: PaginationParams) {
  return useQuery({
    queryKey: QUERY_KEYS.books(params),
    queryFn: ({ signal }) => apiClient.getBooks(params, signal),
    select: (response) => response.data,
  });
}

/**
 * Hook to fetch live public API search results (Open Library / Google Books)
 */
export function useLiveBooksQuery(query: string, category: string = "All") {
  return useQuery({
    queryKey: QUERY_KEYS.liveBooks(query, category),
    queryFn: ({ signal }) => fetchLiveBooks(query, category, signal),
    enabled: Boolean(query && query.trim().length > 1),
    staleTime: 5 * 60 * 1000,
  });
}

/**
 * Hook to fetch single book detail
 */
export function useBookDetailQuery(id: string) {
  return useQuery({
    queryKey: QUERY_KEYS.bookDetail(id),
    queryFn: ({ signal }) => apiClient.getBookById(id, signal),
    enabled: Boolean(id),
    select: (response) => response.data,
  });
}

/**
 * Mutation hook for syncing reading progress with optimistic updates
 */
export function useUpdateProgressMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: ReadingProgressPayload) => apiClient.updateProgress(payload),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ["progress", response.data.bookId] });
    },
  });
}

/**
 * Mutation hook for toggling bookmarks
 */
export function useToggleBookmarkMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: BookmarkPayload) => apiClient.toggleBookmark(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bookmarks"] });
    },
  });
}

/**
 * Mutation hook for uploading new books with automatic cache invalidation
 */
export function useUploadBookMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (newBook: Book) => apiClient.uploadBook(newBook),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["books"] });
    },
  });
}
