# Specification

## Summary
**Goal:** Make key dialogs fully opaque and readable across themes, improve the Product Editor workspace surface depth, and include a subtle always-visible styling sanity check to confirm fresh deployments.

**Planned changes:**
- Remove forced `!bg-popover` styling from the onboarding instructions modal container and header/body/footer; apply an opaque surface background (e.g., `bg-card`) with consistent border/shadow so it is never translucent in any browser.
- Apply the same opaque dialog surface treatment to the Profile Setup dialog while keeping its existing behavior unchanged (including dismissal rules and form submission).
- Update the onboarding instructions modal header/title copy to match the app’s current neutral branding shown in the header (English-only) and remove outdated branding text.
- Strengthen the Product Editor workspace page surface styling with a subtle tinted/gradient background and softened borders/shadows consistent with existing theme tokens, without changing any editor logic or navigation.
- Add a small, non-functional, always-rendered styling tweak within the Product Editor workspace container to serve as a deterministic deployment sanity check.

**User-visible outcome:** Dialogs (onboarding instructions and Profile Setup) are fully opaque and easier to read in light/dark themes, and the Product Editor workspace has more visible depth and a subtle always-present styling cue that confirms the latest build is deployed.
