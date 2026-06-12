---
name: SoundBench
description: Bench-side repair companion for vintage audio gear — diagnose, fix, log.
colors:
  bench-white: "#f2f0e3"
  schematic-ink: "#2e2e2e"
  signal-coral: "#f76f53"
---

<!-- SEED: re-run /impeccable document once there's code to capture the actual tokens and components. -->

# Design System: SoundBench

## Overview

**Creative North Star: "The Annotated Service Manual"**

SoundBench looks like the service literature its users already trust —
reprinted with modern clarity and made interactive. Vintage Marantz and
Technics service manuals are the reference: dense but rigorously organized,
numbered procedures, monospaced test tables, schematic line-art on warm
paper stock. The app borrows that genre's *graphic discipline*, not its
hardware. Period character comes from typography, the committed palette,
and line-art iconography; the interaction layer is a contemporary,
bench-first product tool — large targets, glanceable steps, quiet motion.

This system explicitly rejects skeuomorphic retro pastiche: no fake wood
grain, no brushed-metal textures, no literal VU-meter widgets or knob
controls. If an element imitates hardware, it has failed; if it reads like
a beautifully typeset procedure page, it has succeeded.

**Key Characteristics:**
- Light, paper-warm surface with near-black ink — print-like, readable in workshop light
- One coral accent, used sparingly enough to always mean something
- Monospace reserved for bench data: voltages, part references, model numbers
- Flat, structured, line-drawn; depth only where interaction demands it
- Responsive motion (150–250ms state feedback), never choreography

## Colors

A restrained print palette: warm paper, dark ink, one coral signal.

### Primary
- **Signal Coral** (#f76f53): The single accent. Primary actions, current
  selection, active step markers, schematic highlight overlays, diagnosis
  confidence indicators. Used on well under 10% of any screen — its rarity
  is what makes it instantly findable mid-repair.

### Neutral
- **Bench White** (#f2f0e3): The body background. Warm paper stock, the
  committed brand surface. Panels and cards derive from it by small
  lightness steps toward ink `[exact surface/border steps to be resolved
  during implementation]`.
- **Schematic Ink** (#2e2e2e): All body text, headings, line-art icons,
  borders. 12:1 against Bench White — print-grade contrast, deliberately
  generous for arm's-length bench reading.

### Semantic (to be resolved during implementation)
- **Hazard / error red, success green, info tone:** `[to be resolved]` —
  constrained by the rules below; hazard red must be visually distinct from
  Signal Coral.

### Named Rules
**The Quiet Coral Rule.** Signal Coral carries ≤10% of any screen. It marks
the primary action, the current selection, and the suspect circuit — never
decoration, never large fills, never inactive states.

**The Coral Is Never a Warning Rule.** Coral sits near danger-orange, and
this app delivers mains-voltage safety warnings. Hazard UI uses a dedicated
red *always paired with an icon and text* — never color alone, and never
the accent. If a user could mistake a "Next step" button for a hazard
banner, the screen is wrong.

**The Ink-on-Coral Rule.** Signal Coral fails contrast as a text color on
Bench White (≈2.5:1) — coral is a fill and marker color only. Text placed
*on* a coral fill is set in Schematic Ink (≈4.8:1), not white (≈2.9:1,
fails).

## Typography

**UI Font:** `[warm humanist sans, to be chosen at implementation]`
**Data Font:** `[monospace, to be chosen at implementation]`

**Character:** A warm, legible sans carries the interface; a monospace
carries the bench data. The mono is where the service-manual flavor lives —
test-point tables, part references, model numbers — earning the vintage
feel through genre, not decoration.

### Hierarchy
Fixed rem scale, ratio ≈1.2 (product UI; no fluid clamp headings).
`[exact sizes to be resolved during implementation]`, within these
constraints:
- **Body** (regular, ≥17px, 1.5): bench-readable at arm's length; prose
  capped at 65–75ch.
- **Title / Headline** (semibold, 1.2–1.25 ratio steps up): screen and
  section titles; device names.
- **Data** (mono, body-size or one step down): voltages, component refs
  (Q507), part numbers, model numbers. Tables may run dense.
- **Label** (medium, one step down): form labels, step counts, badges.

### Named Rules
**The Mono Means Data Rule.** Monospace is reserved for measured and
identifying data — voltages, component references, part and model numbers.
Never UI labels, never buttons, never prose. The moment mono becomes
decoration, the service-manual genre collapses into pastiche.

## Elevation

Flat by default — a printed page has no shadows. Structure comes from ink
borders (1px Schematic Ink at reduced opacity) and small tonal steps of
Bench White. Shadows exist only where something genuinely floats above the
page: dialogs, dropdowns, the schematic viewer's overlay callouts. One soft
ambient shadow vocabulary, defined at implementation.

**The Printed Page Rule.** Surfaces at rest are flat. A shadow asserts that
an element is temporarily above the document — if it isn't, it doesn't get
one.

## Do's and Don'ts

### Do:
- **Do** keep Signal Coral (#f76f53) under 10% of any screen — primary
  action, current selection, suspect-circuit highlight only.
- **Do** set text on coral fills in Schematic Ink (#2e2e2e), never white.
- **Do** size for the bench: ≥44px touch targets, ≥17px body text,
  glanceable step instructions readable at arm's length.
- **Do** pair every hazard warning with icon + text in a dedicated red,
  distinct from the accent — color alone never carries safety meaning.
- **Do** use monospace for voltages, part references, and model numbers —
  that's where the vintage service-manual character lives.
- **Do** use line-art iconography in Schematic Ink, in the drafting style
  of schematic symbols.

### Don't:
- **Don't** use skeuomorphic retro pastiche: no fake wood grain, no
  brushed-metal textures, no literal VU-meter widgets or knob controls
  (PRODUCT.md anti-reference, verbatim).
- **Don't** revive the abandoned dark-charcoal/amber direction from the
  first mockup round; the committed surface is light Bench White.
- **Don't** set Signal Coral text on Bench White — 2.5:1 fails contrast at
  every size.
- **Don't** use mono for UI labels or buttons, and don't use display fonts
  anywhere in the UI.
- **Don't** add decorative motion; transitions are 150–250ms state
  feedback, with reduced-motion alternatives, and nothing choreographs.
- **Don't** use colored side-stripe borders, gradient text, or glass
  effects — structure comes from ink borders and tonal steps.
