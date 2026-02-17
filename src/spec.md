# Specification

## Summary
**Goal:** Add a new “Unified Preview” screen that lets users review all three products together, including in-app PDF previews when available.

**Planned changes:**
- Add a clearly labeled navigation option “Unified Preview” that opens a new combined preview screen.
- Build a responsive Unified Preview layout showing three product sections/cards on one page (stacked on small screens, multi-column on larger screens).
- In each product section, display the cover image thumbnail, product name, subtitle (if present), and a short description snippet or expandable description area.
- For each product, render an in-app PDF preview panel when a generated PDF blob exists; otherwise show a clear, non-error empty state message.
- Wire the Unified Preview screen into the existing view-state flow so users can enter/exit without clearing or regenerating existing in-memory generated bundles; ensure object URLs used for previews are revoked on unmount/no longer needed.

**User-visible outcome:** Users can navigate to “Unified Preview” to see all three products on one screen, with PDF previews for generated products and clear empty states for products not yet generated, without losing existing generated bundles when switching views.
