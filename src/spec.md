# Specification

## Summary
**Goal:** Let users define exactly three AI-automation digital products and generate downloadable deliverables (PDF + ZIP bundles), with previews and an export/download hub, supporting local drafts and optional authenticated sync via Internet Identity.

**Planned changes:**
- Build an editor workflow to create/edit exactly three product entries (title, subtitle, description, included modules/chapters, prompts/templates/checklists, optional branding fields) with validation, local draft persistence, and on-demand regeneration (per product or all).
- Generate per-product downloadable assets fully in-browser: a multi-page PDF and a deterministic, safe-named ZIP containing the PDF plus structured supplementary files.
- Add an export screen (“Gumroad/Etsy export”) listing the three products with included files, file sizes, last-generated timestamp, cover thumbnail, per-product download, and a “Download all products” ZIP containing the three product ZIPs; disable downloads until generated.
- Add in-app previews: PDF preview (key pages/sections) and ZIP contents preview (file/folder tree/list) that update after regeneration.
- Add a lightweight backend canister API (single Motoko actor) with Internet Identity login to store/retrieve each user’s three product definitions and generation metadata (e.g., last-generated time, version tag), with local-only mode when not authenticated and a prompt to sign in to sync.
- Apply a coherent visual theme across screens using Tailwind and existing UI components via composition, keeping all user-facing text in English.
- Include one static cover image per product (served from `frontend/public/assets/generated`) in the ZIP bundle and as UI thumbnails.

**User-visible outcome:** Users can edit three product definitions, preview what will be generated, produce per-product PDF+ZIP bundles (and an all-products ZIP), see an export summary with thumbnails and file details, and optionally sign in with Internet Identity to sync their products across devices.
