# Specification

## Summary
**Goal:** Let users restore the three shipped default product drafts in the Product Editor after local drafts have expired or been overwritten.

**Planned changes:**
- Add a clearly labeled “Restore default products” action in the ProductsWorkspace/Product Editor to reset local drafts and repopulate the workspace with the three `DEFAULT_PRODUCTS` entries.
- Add a confirmation prompt before performing the destructive reset; cancel keeps current drafts, confirm resets and switches to the first product tab (product-1).
- Ensure PDF/ZIP generation after restore uses the restored in-memory product data, and show specific, actionable English error messages if PDF or ZIP generation fails.

**User-visible outcome:** Users can one-click restore “Digital Planner Mastery”, “Canva Templates Empire”, and “Printable Wall Art Studio” (after confirming), then immediately generate PDFs/ZIPs from the restored products with clear error messaging if something goes wrong.
