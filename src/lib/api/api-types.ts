export interface ApiResponse<T> {
  success: boolean;
  data: T;
  meta?: {
    page?: number;
    limit?: number;
    total?: number;
    timestamp?: string;
  };
}

export interface ApiError {
  code: string;
  message: string;
  status: number;
  details?: Record<string, unknown>;
  timestamp: string;
}

export interface PaginationParams {
  page?: number;
  limit?: number;
  category?: string;
  search?: string;
}

export interface ReadingProgressPayload {
  bookId: string;
  page: number;
  totalPages: number;
  percentage: number;
  cfi?: string;
}

export interface BookmarkPayload {
  bookId: string;
  page: number;
  chapterTitle: string;
}
