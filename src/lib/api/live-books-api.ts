import { Book } from "@/lib/books-data";
import { logger } from "@/lib/observability/logger";

export interface LiveFetchResult {
  source: "openlibrary" | "googlebooks" | "seed_fallback";
  books: Book[];
  totalFound: number;
}

/**
 * Native schema validator for Open Library API payloads
 */
function validateOpenLibraryPayload(data: unknown): { numFound: number; docs: any[] } {
  if (typeof data !== "object" || data === null) {
    throw new Error("Invalid OpenLibrary payload: Expected object");
  }
  const obj = data as Record<string, any>;
  if (typeof obj.numFound !== "number" || !Array.isArray(obj.docs)) {
    throw new Error("Invalid OpenLibrary payload: Missing numFound or docs array");
  }
  return {
    numFound: obj.numFound,
    docs: obj.docs.filter((d) => typeof d === "object" && d !== null && typeof d.title === "string"),
  };
}

/**
 * Native schema validator for Google Books API payloads
 */
function validateGoogleBooksPayload(data: unknown): { totalItems: number; items?: any[] } {
  if (typeof data !== "object" || data === null) {
    throw new Error("Invalid GoogleBooks payload: Expected object");
  }
  const obj = data as Record<string, any>;
  if (typeof obj.totalItems !== "number") {
    throw new Error("Invalid GoogleBooks payload: Missing totalItems");
  }
  return {
    totalItems: obj.totalItems,
    items: Array.isArray(obj.items) ? obj.items : [],
  };
}

/**
 * Fetches live book data from HTTPS public APIs (Open Library & Google Books)
 * with native schema validation, timeouts, and fallback error handling.
 */
export async function fetchLiveBooks(
  query: string,
  category: string = "All",
  signal?: AbortSignal
): Promise<LiveFetchResult> {
  logger.info(`Initiating live public API fetch: query='${query}', category='${category}'`);
  const timer = logger.time("live-books-api-fetch");

  // 1. Try Open Library API first
  try {
    const searchTerm = query || (category !== "All" ? category : "psychology");
    const url = `https://openlibrary.org/search.json?q=${encodeURIComponent(searchTerm)}&limit=12`;

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8000);
    const combinedSignal = signal || controller.signal;

    const response = await fetch(url, { signal: combinedSignal });
    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`OpenLibrary HTTP ${response.status}: ${response.statusText}`);
    }

    const rawData = await response.json();
    const validatedData = validateOpenLibraryPayload(rawData);

    const books: Book[] = validatedData.docs.map((doc, idx) => {
      const firstSentence = Array.isArray(doc.first_sentence)
        ? doc.first_sentence[0]
        : doc.first_sentence || "Explore this classic volume from the public library archive.";

      return {
        id: `ol-${String(doc.key || idx).replace("/works/", "")}`,
        title: doc.title,
        author: Array.isArray(doc.author_name) ? doc.author_name[0] : "Unknown Author",
        category: category !== "All" ? category : Array.isArray(doc.subject) ? doc.subject[0] : "Classic Fiction",
        rating: 4.5 + (idx % 5) * 0.1,
        pages: 220 + ((idx * 13) % 200),
        coverColor: "from-amber-900 via-stone-800 to-amber-950",
        description: `${doc.title} published in ${doc.first_publish_year || "classic era"}. ${firstSentence}`,
        sampleContent: [
          `Chapter 1: The Beginning of ${doc.title}\n\n${firstSentence}\n\nEvery journey into knowledge opens a new window of understanding. Reading deepens empathy and sharpens focus.`,
          `Chapter 2: Core Concepts & Insights\n\nContinuing through ${doc.title}, we explore fundamental principles that shape human behavior and society.`,
        ],
      };
    });

    timer();
    logger.info(`OpenLibrary API returned ${books.length} validated books`);
    return {
      source: "openlibrary",
      books,
      totalFound: validatedData.numFound,
    };
  } catch (error: any) {
    logger.warn(`OpenLibrary fetch failed/timed out (${error.message}). Attempting Google Books API fallback...`);
  }

  // 2. Try Google Books API fallback
  try {
    const searchTerm = query || (category !== "All" ? category : "psychology");
    const url = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(searchTerm)}&maxResults=12`;

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8000);
    const combinedSignal = signal || controller.signal;

    const response = await fetch(url, { signal: combinedSignal });
    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`GoogleBooks HTTP ${response.status}: ${response.statusText}`);
    }

    const rawData = await response.json();
    const validatedData = validateGoogleBooksPayload(rawData);

    if (validatedData.items && validatedData.items.length > 0) {
      const books: Book[] = validatedData.items.map((item, idx) => {
        const info = item.volumeInfo || {};

        return {
          id: `gb-${item.id || idx}`,
          title: info.title || "Untitled Volume",
          author: Array.isArray(info.authors) ? info.authors[0] : "Unknown Author",
          category: category !== "All" ? category : Array.isArray(info.categories) ? info.categories[0] : "Nonfiction",
          rating: 4.6,
          pages: 240 + ((idx * 19) % 180),
          coverColor: "from-stone-900 via-amber-950 to-stone-800",
          description: info.description ? String(info.description).slice(0, 200) + "..." : `${info.title || "Book"} by ${info.authors?.[0] || "Author"}.`,
          sampleContent: [
            `Chapter 1: Overview\n\n${info.description || "An illuminating exploration of the subject matter."}`,
            `Chapter 2: In-Depth Perspective\n\nFurther analysis and key findings from the author's work.`,
          ],
        };
      });

      timer();
      logger.info(`Google Books API returned ${books.length} validated books`);
      return {
        source: "googlebooks",
        books,
        totalFound: validatedData.totalItems,
      };
    }
  } catch (error: any) {
    logger.error(`Google Books API fallback failed (${error.message}). Reverting to Seed Dataset fallback.`);
  }

  timer();
  return {
    source: "seed_fallback",
    books: [],
    totalFound: 0,
  };
}
