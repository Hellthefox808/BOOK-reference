# DRM & Content Protection Strategy

## Content Protection Layers
1. **Pre-signed Ephemeral URLs**: Raw book binaries (`.epub`, `.pdf`) are never exposed publicly. Access is gated via signed Cloudflare R2 / AWS S3 URLs with a 15-minute expiration time bound to the user session.
2. **Blob Engine Streaming**: Binary files are loaded into browser memory as blob URLs (`blob:https://bookverse.com/...`), preventing straightforward file URL scraping.
3. **Canvas-Based PDF Rendering**: PDF pages are rendered directly into HTML5 canvas elements via `pdfjs-dist` to restrict text selection downloading where requested by content owners.
4. **Watermarking (Future Roadmap)**: Dynamic invisible watermarking of reader pages with user session IDs to trace unauthorized content redistribution.
