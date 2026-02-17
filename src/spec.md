# Specification

## Summary
**Goal:** Restore the Product Editor’s intended visual styling (blue primary actions, non-white surfaced editor background) and make the Instructions modal fully readable by removing transparency.

**Planned changes:**
- Update global theme tokens in `frontend/src/index.css` so primary buttons render with a clearly blue fill (not purple) and maintain readable contrast in both light and dark themes.
- Adjust Product Editor workspace and editor card surface styling in `frontend/src/components/products/ProductsWorkspace.tsx` and `frontend/src/components/products/ProductEditor.tsx` to avoid a flat “completely white” look and keep the editor card visually distinct.
- Update `frontend/src/components/onboarding/OnboardingInstructionsModal.tsx` to apply an opaque background plus appropriate border/shadow styling to the modal `DialogContent` for legibility, without changing layout/scroll behavior or content.

**User-visible outcome:** Primary actions in the Product Editor appear consistently blue with readable text in light/dark themes, the editor area has a clear surfaced/tinted treatment instead of flat white, and the Instructions modal is fully opaque and easy to read.
