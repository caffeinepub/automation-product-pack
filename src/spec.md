# Specification

## Summary
**Goal:** Restore the app’s three default products to the previously selected themes and ensure they load with complete starter content so users can generate and export all three immediately on first launch.

**Planned changes:**
- Update the default product set to exactly three prefilled products: Digital Planner, Canva Templates, and Printable Wall Art, each with complete starter content (name, subtitle, description, modules/chapters, AI prompts, templates, and checklists).
- Ensure “Generate All Products” successfully generates all three bundles and proceeds to the Export screen with all three available for download.
- Prevent older local drafts from overriding the updated defaults by bumping the local draft storage version/key and falling back to the new defaults when incompatible drafts are detected.

**User-visible outcome:** On a fresh launch, users see three fully prefilled products (Digital Planner, Canva Templates, Printable Wall Art) and can click “Generate All Products” to generate and export three bundles; older saved drafts won’t replace these updated defaults.
