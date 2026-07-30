export interface LogMetadata {
  correlationId?: string;
  userId?: string;
  bookId?: string;
  durationMs?: number;
  [key: string]: unknown;
}

export type LogLevel = "info" | "warn" | "error" | "debug";

class Logger {
  private generateCorrelationId(): string {
    return `req-${Math.random().toString(36).substring(2, 11)}-${Date.now()}`;
  }

  private log(level: LogLevel, message: string, meta?: LogMetadata): void {
    const timestamp = new Date().toISOString();
    const correlationId = meta?.correlationId || this.generateCorrelationId();
    const payload = {
      timestamp,
      level,
      message,
      correlationId,
      ...meta,
    };

    if (process.env.NODE_ENV !== "test") {
      const prefix = `[${timestamp}] [${level.toUpperCase()}] [${correlationId}]`;
      if (level === "error") {
        console.error(prefix, message, meta || "");
      } else if (level === "warn") {
        console.warn(prefix, message, meta || "");
      } else {
        console.log(prefix, message, meta || "");
      }
    }
  }

  info(message: string, meta?: LogMetadata): void {
    this.log("info", message, meta);
  }

  warn(message: string, meta?: LogMetadata): void {
    this.log("warn", message, meta);
  }

  error(message: string, meta?: LogMetadata): void {
    this.log("error", message, meta);
  }

  debug(message: string, meta?: LogMetadata): void {
    this.log("debug", message, meta);
  }

  time(label: string): () => number {
    const start = performance.now();
    return () => {
      const duration = Math.round(performance.now() - start);
      this.info(`Timer [${label}] completed in ${duration}ms`, { durationMs: duration });
      return duration;
    };
  }
}

export const logger = new Logger();
