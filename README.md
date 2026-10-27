# Library Cafe

Next.js (App Router) + TypeScript + Tailwind CSS. The UI is built from the Figma design and styled with clean, global, kebab-case classes backed by rem-based design tokens.

```bash
npm install
npm run dev     # http://localhost:3000  (use -- -p 3004 for port 3004)
npm run build
npm run lint
```

---

# Project rules

These rules apply to every page, section, and component in this repo.

## Unit rules

Use `rem` for all final CSS values.

Do not use `em` in the final code. The only exception is typographic tracking (`letter-spacing`), and this project uses `rem` for that too.

Inspect the value in the design tool or browser, take the final `px` value, and convert it to `rem`. Assume the root font size is `16px`.

```txt
rem = px / 16
```

```txt
4px = 0.25rem      24px = 1.5rem      64px = 4rem
8px = 0.5rem       28px = 1.75rem     72px = 4.5rem
12px = 0.75rem     32px = 2rem        80px = 5rem
14px = 0.875rem    40px = 2.5rem      96px = 6rem
16px = 1rem        48px = 3rem        120px = 7.5rem
18px = 1.125rem    56px = 3.5rem      160px = 10rem
20px = 1.25rem
```

Allowed exceptions:

```txt
0
1px borders
100%
auto
vw / vh only for true viewport-based layouts
transform values where needed
animation durations in ms
Next.js Image width and height props
```

Bad:

```css
font-size: 4.5em;
padding: 80px 40px;
gap: 2em;
border-radius: 24px;
```

Good:

```css
font-size: var(--font-size-hero);
padding: var(--space-80) var(--container-padding-desktop);
gap: var(--space-32);
border-radius: var(--radius-lg);
```

## Design token rules

All repeated values live in design tokens. Do not hardcode colors, font sizes, spacing, padding, margin, gap, width, max-width, border radius, or layout values inside components or class definitions. Tokens are rem-based.

```txt
src/styles/tokens.css       colors, type scale, spacing, layout, radius, buttons
src/styles/typography.css   reusable text and heading classes
src/styles/globals.css      Tailwind import, base elements, layout primitives
src/styles/components.css   reusable UI classes (buttons, cards, links, forms)
src/styles/sections.css     page-section classes (header, hero, events, footer...)
```

New value needed? Add a token to `tokens.css` first, then use the token.

```css
:root {
  /* Colors */
  --color-bg-primary: #ffffff;
  --color-text-primary: #1e1b1d;
  --color-brand-primary: #e50695;

  /* Typography */
  --font-primary: var(--font-montserrat);
  --font-size-sm: 0.875rem;
  --font-size-hero: 4.375rem;

  /* Spacing */
  --space-8: 0.5rem;
  --space-80: 5rem;

  /* Layout */
  --container-max: 86.6875rem;
  --container-padding-desktop: 5rem;

  /* Radius */
  --radius-sm: 0.5rem;
}
```

## Design value conversion workflow

1. Inspect the element in the design file or browser.
2. Read the final computed `px` value.
3. Convert it to `rem`.
4. Save it in `tokens.css`.
5. Use the token in the class.

```txt
Design value: 80px
Converted:    5rem
Token:        --space-80: 5rem;
```

## Typography rules

Match the design exactly. For every heading and paragraph capture the font size, line height, weight, and letter spacing, convert to `rem`, store as tokens, and use a reusable class.

Do not create random heading sizes. Use these classes:

```txt
.text-label
.text-body
.text-body-large
.heading-sm
.heading-md
.heading-lg
.heading-xl
.heading-hero
```

## Color rules

Pick colors from the design, add them to `tokens.css`, and use CSS variables only. No ad-hoc hex values in components.

## Spacing and padding rules

For every section check: top and bottom padding, left/right container padding, gap between heading and paragraph, gap between cards, gap between buttons, and max width of text blocks. Use spacing tokens.

```css
.section {
  padding-block: var(--space-80);
}

.container {
  max-width: var(--container-max);
  margin-inline: auto;
  padding-inline: var(--container-padding-desktop);
}
```

Responsive container padding:

```css
@media (max-width: 61.9375rem) {
  .container { padding-inline: var(--container-padding-tablet); }
}

@media (max-width: 47.9375rem) {
  .container { padding-inline: var(--container-padding-mobile); }
}
```

Breakpoints:

```txt
1440px = 90rem
1280px = 80rem
1024px = 64rem
991px  = 61.9375rem
767px  = 47.9375rem
480px  = 30rem
375px  = 23.4375rem
```

## Image and asset rules

Production images, icons, videos, and other visual assets should be served from the configured Pixelbin organization. Do not hotlink design-tool or third-party CDN URLs in finished code.

Until an asset is uploaded, keep it locally under the matching folder:

```txt
public/
  assets/
    images/
      home/
      shared/
    icons/
    videos/
```

Use Next.js `Image`. Every image needs a useful `alt`; decorative icons use `alt=""`. `width` and `height` props are intrinsic dimensions and may stay numeric.

```tsx
<Image src="/assets/images/home/hero-image.png" alt="Library Cafe interior" width={1200} height={800} priority />
<Image src="/assets/icons/clock.svg" alt="" width={24} height={24} />
```

## Page build workflow

1. Open the design for the page or section.
2. Break it into reusable components.
3. Extract design tokens.
4. Convert all values to `rem`.
5. Download required assets.
6. Build the page in Next.js.
7. Use clean global class names.
8. Make it responsive.
9. Compare visually with the design.
10. Fix spacing, typography, colors, and image sizes until it matches closely.

## Component structure

```txt
src/
  app/
    page.tsx
    layout.tsx
  components/
    layout/      Header.tsx, Footer.tsx
    sections/    HeroSection.tsx, AboutSection.tsx, EventsSection.tsx, FaqSection.tsx, NewsletterSection.tsx
    ui/          TextLink.tsx, InfoRow.tsx, EventCard.tsx
  styles/
    tokens.css, typography.css, globals.css, components.css, sections.css
```

Name components for what they are (`HeroSection`, `EventCard`, `SectionHeader`), never `DivBlock1`, `NewSection2`, or `CardWrapperCopy`.

## Class naming rules

- Global CSS with clean, readable, **kebab-case** class names.
- No CSS Modules for sections, layout, or reusable UI.
- No hashed, auto-generated, or tool-style names (`styles.hero`, `_hero_1a2b3`, `div-block-23`).
- No inline styles unless absolutely necessary.

```tsx
// Bad
import styles from "./Hero.module.css";
<section className={styles.hero}>
<div style={{ padding: "5rem", color: "#111" }}>

// Good
<section className="hero-section">
```

Preferred names:

```txt
page-wrapper  main-wrapper  container  section
hero-section  hero-content  hero-heading  hero-description
section-header  section-title  section-description
card-grid  event-card  info-row
button  button-primary  button-secondary  button-ghost  button-outline
```

Imported in `src/app/layout.tsx`:

```tsx
import "@/styles/tokens.css";
import "@/styles/typography.css";
import "@/styles/globals.css";
import "@/styles/components.css";
import "@/styles/sections.css";
```

## Tailwind CSS

Tailwind is installed and its base layer is imported in `globals.css`. Use it as a helper, not as a replacement for the class system:

- Tokens are registered with `@theme` so Tailwind utilities and our classes share one source of truth.
- Inside global class definitions, `@apply` may be used for structural utilities (`flex`, `items-center`, `shrink-0`, ...). Sizes, colors, spacing, and radii still come from tokens.
- Do not put long Tailwind utility strings in JSX. Name the class and define it in CSS.
- No arbitrary-value utilities (`w-[766px]`, `text-[#e50695]`).

## Button rules

Check height, padding, radius, font size, weight, background, text color, border, hover state, and icon spacing against the design. Variants: `button-primary`, `button-secondary`, `button-ghost`, `button-outline`. All values come from button tokens.

```css
.button {
  min-height: var(--button-height-md);
  padding-inline: var(--button-padding-x-md);
  border-radius: var(--radius-pill);
  font-size: var(--font-size-sm);
}
```

## Header and footer rules

Header and footer must match the design's structure and spacing. On mobile the header collapses to a menu button and panel.

```txt
site-header  header-container  header-logo  header-nav  header-nav-link  header-actions  mobile-menu-button  mobile-menu
site-footer  footer-container  footer-main-row  footer-links  footer-social  footer-disclaimer
```

## Responsive rules

Check every page at `90rem`, `80rem`, `64rem`, `61.9375rem`, `47.9375rem`, `30rem`, and `23.4375rem`. No horizontal overflow, no badly broken text, images resize, buttons are tappable, menus work, section padding shrinks, cards stack.

## Animation rules

Only recreate animations that exist in the design. Keep them subtle. Durations in `ms`.

```css
transition: opacity 300ms ease, transform 300ms ease;
```

## Content rules

Use the copy from the design. Do not rewrite headings, product names, menu names, or CTA labels unless asked.

## Quality checklist

- [ ] Fonts, sizes, colors, padding, spacing match the design
- [ ] Reusable sizes are rem-based tokens
- [ ] No `em` values and no unnecessary hardcoded `px`
- [ ] No CSS Modules for sections; no hashed class names
- [ ] All classes are readable kebab-case
- [ ] Assets are local or on Pixelbin; no third-party CDN hotlinks
- [ ] Components are reusable
- [ ] Responsive at every breakpoint; header and footer work
- [ ] No console, TypeScript, or hydration errors
- [ ] `npm run dev` and `npm run build` work

## Important

Do not build from imagination. Compare with the design, take exact values, convert them to `rem`, store them as tokens, then build with clean global classes.
