---
name: Vivid Raw Brutalism
colors:
  surface: '#f9f9f9'
  surface-dim: '#dadada'
  surface-bright: '#f9f9f9'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f3f3f4'
  surface-container: '#eeeeee'
  surface-container-high: '#e8e8e8'
  surface-container-highest: '#e2e2e2'
  on-surface: '#1a1c1c'
  on-surface-variant: '#4a4455'
  inverse-surface: '#2f3131'
  inverse-on-surface: '#f0f1f1'
  outline: '#7b7487'
  outline-variant: '#ccc3d8'
  surface-tint: '#732ee4'
  primary: '#630ed4'
  on-primary: '#ffffff'
  primary-container: '#7c3aed'
  on-primary-container: '#ede0ff'
  inverse-primary: '#d2bbff'
  secondary: '#b5005d'
  on-secondary: '#ffffff'
  secondary-container: '#e20476'
  on-secondary-container: '#fffbff'
  tertiary: '#005669'
  on-tertiary: '#ffffff'
  tertiary-container: '#007088'
  on-tertiary-container: '#bcedff'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#eaddff'
  primary-fixed-dim: '#d2bbff'
  on-primary-fixed: '#25005a'
  on-primary-fixed-variant: '#5a00c6'
  secondary-fixed: '#ffd9e1'
  secondary-fixed-dim: '#ffb1c6'
  on-secondary-fixed: '#3f001c'
  on-secondary-fixed-variant: '#8e0048'
  tertiary-fixed: '#b4ebff'
  tertiary-fixed-dim: '#3cd7ff'
  on-tertiary-fixed: '#001f27'
  on-tertiary-fixed-variant: '#004e5f'
  background: '#f9f9f9'
  on-background: '#1a1c1c'
  surface-variant: '#e2e2e2'
  brutal-black: '#0A0A0F'
  acid-green: '#ADFF2F'
  caution-yellow: '#FFD600'
typography:
  display-xl:
    fontFamily: Space Grotesk
    fontSize: 80px
    fontWeight: '700'
    lineHeight: '1.1'
    letterSpacing: -0.04em
  headline-lg:
    fontFamily: Space Grotesk
    fontSize: 48px
    fontWeight: '700'
    lineHeight: '1.2'
  headline-lg-mobile:
    fontFamily: Space Grotesk
    fontSize: 32px
    fontWeight: '700'
    lineHeight: '1.2'
  headline-md:
    fontFamily: Space Grotesk
    fontSize: 32px
    fontWeight: '700'
    lineHeight: '1.2'
  body-lg:
    fontFamily: Space Grotesk
    fontSize: 20px
    fontWeight: '500'
    lineHeight: '1.5'
  body-md:
    fontFamily: Space Grotesk
    fontSize: 16px
    fontWeight: '500'
    lineHeight: '1.5'
  label-code:
    fontFamily: JetBrains Mono
    fontSize: 14px
    fontWeight: '400'
    lineHeight: '1.4'
spacing:
  border-width: 4px
  shadow-offset: 8px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 64px
---

## Brand & Style

This design system is built on **Neo-Brutalism**, a style that rejects the polished, overly-sanitized norms of modern SaaS design in favor of raw, high-impact visuals. It is designed for creators and developers who want to stand out with an aesthetic that is both "funky" and "technical."

The personality is unapologetically loud, youthful, and high-energy. It utilizes high-contrast color pairings, heavy black strokes, and intentional layout "errors" like overlapping containers to create a sense of tactile depth and digital grit. The target audience is the creative tech community, where personality and distinctiveness are valued over corporate neutrality.

## Colors

The color strategy uses a **saturated, high-contrast palette**. The primary brand colors are Vivid Purple and Electric Pink, supported by a technical Cyan. 

Unlike traditional systems that use subtle grays, this design system uses `#0A0A0F` (Brutal Black) for all structural elements, including borders, shadows, and text. Backgrounds should rotate between the primary palette colors to maintain a "funky" rhythm. "Acid Green" and "Caution Yellow" are reserved for high-priority call-to-actions or "warning" style UI elements to maintain the raw, industrial aesthetic.

## Typography

The typography is centered around **Space Grotesk**, a geometric sans-serif with quirky details that align with the Neo-Brutalist vibe. It is used for all major headings and body copy to ensure legibility despite the loud visual environment.

For technical details, tags, and small metadata, **JetBrains Mono** is employed. This monospaced font reinforces the "raw/developer" feel of the system. Headlines should always be bold (`700` weight) and may occasionally use "All Caps" for display purposes to increase visual impact.

## Layout & Spacing

The system uses a **rigid 12-column grid** on desktop and a **4-column grid** on mobile. However, the "Brutalist" twist comes from intentional overlapping. Content blocks should frequently break the grid by 8-16px to create a layered, collage-like feel.

Spacing is governed by an 8px base unit, but the most important spacing rule is the **gutter and border consistency**. Every primary container must have a `4px` black border. Margins between major sections should be generous (`64px+`) to prevent the high-contrast elements from feeling cluttered.

## Elevation & Depth

This system rejects soft shadows and blurs. Depth is conveyed exclusively through **Hard Shadows (Offset Shadows)**. 

- **Level 1:** `4px 4px 0px 0px #0A0A0F` (Used for small components like chips)
- **Level 2:** `8px 8px 0px 0px #0A0A0F` (Used for standard cards and buttons)
- **Level 3:** `16px 16px 0px 0px #0A0A0F` (Used for featured portfolio items)

When an item is hovered or active, the shadow should "collapse" (offset moves to 0px and the element translates) to simulate a physical button being pressed into the page.

## Shapes

The shape language is strictly **Sharp**. All corners are `0px` to maintain a raw, industrial, and architectural feel. 

The only exception to this rule is for specific decorative elements (like "sticker" style badges or circular avatars) which should be perfectly round (`50%` or pill-shaped) to provide a "funky" geometric contrast against the otherwise rectangular and sharp grid.

## Components

### Buttons
Buttons feature a solid background color (Yellow, Green, or Pink), a `4px` black border, and a `4px` hard shadow. On hover, the button should shift down and right by 4px, while the shadow disappears, creating a tactile "click" effect.

### Cards
Cards are the workhorse of the system. They must have a white or vibrant background, a `4px` black border, and an `8px` hard black shadow. Content inside cards should have a `24px` padding.

### Input Fields
Inputs should look like physical boxes: white background, `4px` black border, and `JetBrains Mono` for the placeholder text. Focus states should swap the border color to the primary purple but keep the shadow.

### Chips & Tags
Use solid black backgrounds with white `JetBrains Mono` text for high contrast, or white backgrounds with `4px` black borders for a "label" look.

### Navigation
The navigation bar should be a simple horizontal strip with a bottom `4px` border. Link items should use bold `Space Grotesk` and show a background color fill on hover rather than a subtle underline.