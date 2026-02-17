# Specification

## Summary
**Goal:** Fix deployment/build failures by removing CDN-loaded jsPDF/JSZip globals and bundling these dependencies via the frontend build system, while keeping PDF/ZIP generation working with clear runtime error handling.

**Planned changes:**
- Remove external CDN `<script>` tags for jsPDF and JSZip from `frontend/index.html`.
- Update `frontend/src/lib/pdf/generateProductPdf.ts` to import jsPDF as a module (no `window.jspdf` usage).
- Update `frontend/src/lib/zip/buildProductZip.ts` to import JSZip as a module (no `window.JSZip` usage).
- Ensure TypeScript builds without any global `Window` type declarations for jsPDF/JSZip.
- Add user-facing (English) error handling in the UI so PDF/ZIP generation failures show a message without crashing the app.

**User-visible outcome:** The app builds and deploys reliably without external runtime script dependencies, and users can still generate PDFs and ZIPs; if generation fails, they see a clear English error message and can continue using the app.
