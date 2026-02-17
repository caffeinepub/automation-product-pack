# Specification

## Summary
**Goal:** Reintroduce subtle, cohesive color accents across the app UI (light and dark themes) to reduce the “bland” look without changing functionality or copy.

**Planned changes:**
- Update global CSS theme variables in `frontend/src/index.css` to add gentle tinted backgrounds/surfaces and harmonized accent/secondary/border/ring colors for both light and dark modes while preserving readable contrast and existing Tailwind token mapping.
- Update `frontend/src/components/layout/AppLayout.tsx` styling so the header and main container reflect the refreshed accent palette (e.g., tinted backdrop/gradient/border) without changing layout structure or navigation behavior.
- Refresh surface and interactive styling (cards, muted panels, dividers, hover/focus states) in ExportScreen, UnifiedPreviewScreen, StorefrontScreen, StorefrontProductCard, and ProductEditor to consistently pick up the updated palette while keeping all behaviors unchanged.

**User-visible outcome:** The app looks more vibrant and cohesive in both light and dark mode with subtle color-tinted surfaces and consistent accents (including clearly visible focus rings), while all screens, controls, and text remain the same.
