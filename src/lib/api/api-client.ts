import { ApiResponse, ApiError, PaginationParams, ReadingProgressPayload, BookmarkPayload } from "./api-types";
import { Book, BOOKS } from "@/lib/books-data";

class ApiClient {
  private baseUrl: string;
  private timeoutMs: number;

  constructor(baseUrl = "/api", timeoutMs = 8000) {
    this.baseUrl = baseUrl;
    this.timeoutMs = timeoutMs;
  }

  /**
   * Helper to normalize network or application errors into a structured ApiError
   */
  private normalizeError(error: unknown, status = 500): ApiError {
    if (error instanceof Error) {
      if (error.name === "AbortError") {
        return {
          code: "REQUEST_CANCELLED",
          message: "The request was cancelled by the client or timed out.",
          status: 408,
          timestamp: new Date().toISOString(),
        };
      }
      return {
        code: "INTERNAL_ERROR",
        message: error.message,
        status,
        timestamp: new Date().toISOString(),
      };
    }
    return {
      code: "UNKNOWN_ERROR",
      message: "An unknown error occurred during API communication.",
      status,
      timestamp: new Date().toISOString(),
    };
  }

  /**
   * Standard simulated delay for data-access layer calls
   */
  private async delay(ms = 120): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  /**
   * Fetch paginated list of books with optional category filter
   */
  async getBooks(params?: PaginationParams, signal?: AbortSignal): Promise<ApiResponse<Book[]>> {
    try {
      await this.delay(100);
      let results = [...BOOKS];

      if (params?.category && params.category !== "All") {
        results = results.filter((b) => b.category === params.category);
      }

      if (params?.search && params.search.trim()) {
        const q = params.search.toLowerCase();
        results = results.filter(
          (b) =>
            b.title.toLowerCase().includes(q) ||
            b.author.toLowerCase().includes(q) ||
            b.category.toLowerCase().includes(q)
        );
      }

      const page = params?.page || 1;
      const limit = params?.limit || 120;

      return {
        success: true,
        data: results.slice((page - 1) * limit, page * limit),
        meta: {
          page,
          limit,
          total: results.length,
          timestamp: new Date().toISOString(),
        },
      };
    } catch (err) {
      throw this.normalizeError(err);
    }
  }

  /**
   * Fetch a single book by ID
   */
  async getBookById(id: string, signal?: AbortSignal): Promise<ApiResponse<Book>> {
    try {
      await this.delay(80);
      const book = BOOKS.find((b) => b.id === id);

      if (!book) {
        throw new Error(`Book with ID '${id}' was not found in catalog.`);
      }

      return {
        success: true,
        data: book,
        meta: { timestamp: new Date().toISOString() },
      };
    } catch (err) {
      throw this.normalizeError(err, 404);
    }
  }

  /**
   * Sync user reading progress
   */
  async updateProgress(
    payload: ReadingProgressPayload,
    signal?: AbortSignal
  ): Promise<ApiResponse<ReadingProgressPayload>> {
    try {
      await this.delay(90);
      return {
        success: true,
        data: payload,
        meta: { timestamp: new Date().toISOString() },
      };
    } catch (err) {
      throw this.normalizeError(err);
    }
  }

  /**
   * Toggle a chapter bookmark
   */
  async toggleBookmark(
    payload: BookmarkPayload,
    signal?: AbortSignal
  ): Promise<ApiResponse<BookmarkPayload>> {
    try {
      await this.delay(70);
      return {
        success: true,
        data: payload,
        meta: { timestamp: new Date().toISOString() },
      };
    } catch (err) {
      throw this.normalizeError(err);
    }
  }

  /**
   * Admin Upload Book endpoint
   */
  async uploadBook(newBook: Book, signal?: AbortSignal): Promise<ApiResponse<Book>> {
    try {
      await this.delay(150);
      BOOKS.unshift(newBook);
      return {
        success: true,
        data: newBook,
        meta: { timestamp: new Date().toISOString() },
      };
    } catch (err) {
      throw this.normalizeError(err);
    }
  }
}

export const apiClient = new ApiClient();
