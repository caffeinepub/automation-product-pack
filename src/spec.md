# Specification

## Summary
**Goal:** Fix PDF/ZIP generation failures for all three products by ensuring jsPDF and JSZip are reliably available in production builds without relying on CDN globals.

**Planned changes:**
- Replace any `window.jspdf` / `window.JSZip` dependency with direct module imports/usages so production builds always include jsPDF and JSZip.
- Make the “generate one product” and “generate all 3 products” flows handle PDF and ZIP creation reliably and route to the Export screen with 3 generated bundles.
- Improve generation error reporting to show a clear English root-cause message on the editor screen, including which step failed (cover fetch / PDF / ZIP) and which product, while logging full error details to the console.

**User-visible outcome:** Users can generate any single product or all three products successfully in production; if something fails, they see a clear English error stating the failing step and product, without crashes from missing `window` globals.
