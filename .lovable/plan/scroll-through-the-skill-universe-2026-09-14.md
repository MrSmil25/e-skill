# Scroll Through the Skill Universe

## Goal
Replace the static “How It Works” cards with a cinematic four-stage journey that makes EXCHANGE feel like a professional skill identity ecosystem rather than a course marketplace.

## Experience
- Create a desktop split layout with scrolling story copy on the left and a large sticky visual stage on the right.
- Progress through Discover, Exchange, Validate, and Unlock Opportunities as each chapter enters the viewport.
- Build four distinct visual states: connected student network, flowing knowledge and Credits, holographic Skill Passport, and career opportunity matching.
- Add restrained depth, particles, glows, parallax, and mouse-reactive card tilt while preserving readability.
- Adapt the experience into a clear vertical sequence on mobile and provide a reduced-motion fallback.

## Technical details
- Use React state, `IntersectionObserver`, CSS transforms, and SVG paths instead of adding a heavy 3D dependency.
- Keep colors in semantic design tokens and use existing glass/signal styling.
- Keep Syne for story headlines only; use Inter tabular numerals for step numbers, scores, Credits, and match percentages.
- Limit animated properties to transforms, opacity, and SVG drawing for smooth performance.

## Validation
- Confirm all four scenes change at the correct scroll positions.
- Check desktop and mobile layouts for overlap, clipping, and readable text.
- Verify reduced-motion behavior, console health, and the latest build result.