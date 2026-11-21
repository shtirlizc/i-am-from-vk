## Development

When starting the dev server, use background mode:

```
astro dev --background
```

Manage the background server with `astro dev stop`, `astro dev status`, and `astro dev logs`.

## Responsive CSS

These rules are mandatory for authored CSS throughout this repository, including Astro `<style>` blocks and standalone stylesheets. Follow them when adding or modifying responsive styles.

- Nest each responsive `@media` block inside the selector whose declarations it changes. Keep all responsive declarations for an element together with its base declarations.
- Within each selector, put base declarations first, then its responsive `@media` blocks, then any nested selectors. Apply this structure recursively: a nested selector must contain its own media queries.
- Inside a nested media query, write the changed declarations directly. Do not repeat the owning selector or collect several selectors into a separate page-level media block.
- Use the viewport-width conditions defined in `src/styles/media-exmple.css` by default. Read that file before writing responsive styles. A custom breakpoint is allowed only as an exception when the existing conditions cannot accommodate a concrete layout requirement, not merely for convenience.
- When a custom breakpoint is necessary, add its condition to `src/styles/media-exmple.css` with a descriptive breakpoint-name comment and a brief explanation of the layout requirement. Insert it in mobile-first order, then use the same condition and name in component styles. Do not change existing breakpoint conditions to solve a local layout issue.
- Immediately above each `@media` block, include the exact breakpoint-name comment from that file, such as `/* tablet */` or `/* desktop */`.
- Order media blocks within every selector mobile-first: narrower viewport ranges come before wider ones. The standard catalog order is `mobile`, `wide-mobile`, `wide-mobile-only`, `tablet`, `tablet-only`, `desktop`, `desktop-only`, `widescreen`, `widescreen-only`, `fullhd`; insert exceptional breakpoints at their corresponding viewport widths. At the same minimum width, put the general rule before its `-only` range. Include only the breakpoints that are needed.
- Preserve selector specificity and the intended cascade when reorganizing existing styles. Do not move responsive rules into distant blocks at the end of a component or stylesheet.

Required structure:

```css
.header {
  padding: var(--space24) 0;

  /* tablet */
  @media (width >= 768px) {
    padding: var(--space32) 0;
  }

  /* desktop */
  @media (width >= 960px) {
    padding: var(--space48) 0 var(--space40);
  }

  & .header__content {
    display: flex;
    flex-direction: column;

    /* tablet */
    @media (width >= 768px) {
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
    }

    nav {
      display: flex;
      gap: var(--space24);
    }
  }
}
```

`src/styles/media-exmple.css` is the breakpoint reference; its top-level media queries are examples, not component styles to restructure.

## Documentation

Full documentation: https://docs.astro.build

Consult these guides before working on related tasks:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Using React, Vue, Svelte, or other framework components](https://docs.astro.build/en/guides/framework-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)
