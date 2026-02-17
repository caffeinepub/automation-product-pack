# Specification

## Summary
**Goal:** Add a first-launch onboarding modal that shows the existing in-app usage and Gumroad/Etsy upload instructions, without interfering with first-time profile setup.

**Planned changes:**
- Add an onboarding instructions modal that auto-opens on the first app load per browser and can be dismissed via Close button or Escape.
- Persist a local “seen/dismissed” flag (e.g., in localStorage) so the modal does not auto-open again in the same browser after it’s closed.
- Ensure the onboarding modal does not appear while the ProfileSetupDialog is open; show onboarding only after profile setup completes (or when profile setup is not needed).
- Add a persistent UI entry point (e.g., “Instructions”/“Help” button or link) to re-open the onboarding modal from both editor and export views without resetting the “seen” flag.
- Reuse the existing instructions content already present in the app (do not create conflicting or new instruction steps).

**User-visible outcome:** On first visit, users see an onboarding modal with the same instructions they can find in the app; after dismissing it, it won’t auto-open again, but they can re-open it anytime via an “Instructions/Help” control, and it won’t interrupt required profile setup.
