# Specification

## Summary
**Goal:** Make PDF generation failures show accurate, actionable errors and prevent PDF generation when required product fields are missing or invalid.

**Planned changes:**
- Update PDF-step error handling to display messages derived from the underlying PDF error (including distinguishing jsPDF load failures vs. invalid/missing product data).
- Add pre-validation for each product before PDF generation (trimmed name/subtitle/description required), blocking “Generate” and “Generate All Products” when validation fails and reporting which product(s)/field(s) need fixes.
- Harden the PDF generator by normalizing/guarding product text inputs so jsPDF text calls only receive strings and unexpected undefined/null values fail with a clear, accurate error plus existing diagnostics logging.

**User-visible outcome:** When generating PDFs, users see specific error messages (e.g., jsPDF failed to load or exactly which fields are missing for which products), and PDF generation won’t run until required product fields are filled in correctly.
