# Specification

## Summary
**Goal:** Fix PDF generation validation errors by ensuring backend-seeded products and backend-synced product data match the frontend’s three digital product defaults and always include required fields.

**Planned changes:**
- Update backend `populateDefaultProducts` to seed only the three digital products: “Digital Planner Mastery”, “Canva Templates Empire”, and “Printable Wall Art Studio”, and stop creating the prior tshirt/mug/cap products.
- Align the backend product data model and API responses with the frontend `ProductEntry` shape so required PDF fields (name, subtitle, description) are always present and non-empty for default products.
- Ensure the frontend uses correctly populated local and/or backend-synced product data so “Generate All Products” and single-product generation succeed for the three defaults.
- Add targeted frontend error messaging and console diagnostics to identify which product and which required field(s) were empty when generation fails, without showing stack traces in the production UI.

**User-visible outcome:** Generating PDFs for “Digital Planner Mastery”, “Canva Templates Empire”, and “Printable Wall Art Studio” works with default data (and after repopulating defaults), and any missing-field failures clearly indicate the affected product and field(s).
