# VHTI Design System

VHTI guides European citizens into investing in markets beyond their home market. The brand should feel calm, precise and trustworthy: a regulated financial service that is easy to start with, not a trading terminal.

## Status

- Palette and type scale are refined and ready for review.
- The logo is not yet in this system. The supplied image is a mockup that carries a "BRANDGROUND - VOORBEELD" (example) watermark, so the mark may be a template placeholder. Supply the master logo as SVG before it is used anywhere public.
- Hex values were estimated from the supplied image and must be checked against the brand master files.

## Logo

The lockup is a stylised V mark with a sage accent stroke, followed by the VHTI wordmark in a heavy geometric sans.

- Use brand-primary on light surfaces and the dark-theme equivalent on dark surfaces.
- Keep clear space around the mark equal to the height of the V.
- Do not recolour the sage stroke or rebuild the mark by hand.

## Colour

Colour roles are defined in `tokens.json`. The charcoal and sage pair carries the identity; the neutrals keep the interface quiet.

| Role | Light | Dark | Use |
| --- | --- | --- | --- |
| brand-primary | #2E2A26 | #E9E4DC | Primary buttons, wordmark |
| brand-accent | #5B6B5A | #9CAE97 | Active states, links, focus |
| surface-page | #F5F4F1 | #171411 | Page background |
| surface-card | #FFFFFF | #221E1A | Cards and inputs |
| gain | #2D6A4F | #7BC29A | Positive price change |
| loss | #A23E2E | #F08A74 | Negative price change |

### Contrast

Text pairs were checked against WCAG thresholds in both themes:

- ink and ink-muted meet 4.5:1 on every surface token.
- brand-accent and gain meet 4.5:1 on surface-card and surface-page in the light theme, and on surface-card in the dark theme.
- border-strong meets 3:1 on surface-card in both themes, for control outlines.

### Market movement

Gain and loss are the most important colours in a portfolio product, and red and green are hard to tell apart for many people. Every price change must therefore carry a sign and an arrow, and the colour is reinforcement only. Do not use gain or loss for anything other than market movement.

## Typography

The proposed family is Inter, a hosted sans-serif that is free and legible at small sizes. Confirm the brand typeface before launch; if the wordmark's typeface is licensed, the interface type can still be Inter.

- Numbers in portfolios and price tables use tabular figures so columns align.
- Headings use weight 600 to 700. Body text stays at weight 400.
- Sentence case for headings and buttons.

## Spacing and shape

Spacing follows a 4px base (4, 8, 12, 16, 24, 32, 48). Radii are restrained: 4px for tags, 8px for controls and cards, 12px for large panels. Avoid heavy shadows; separate surfaces with the border and surface tokens instead.

## Voice

Plain, direct and calm. Explain what a term means the first time it appears. Avoid hype, urgency and words that promise returns. Describe the market as it moves, not as an opportunity to act on.

## Open items

- Supply the master logo as SVG, in light and dark versions.
- Confirm hex values against the brand master files.
- Confirm the typeface for the wordmark and the interface.
- Review the palette with compliance before it is used on the regulated investment screens.
