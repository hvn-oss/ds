# Docs site uses headless Fumadocs on Void, with Astryx for all UI

The docs site runs on Void and uses only `fumadocs-core` and `fumadocs-mdx` (Config API, `source.config.ts`) for content, the page tree, TOC, breadcrumbs and previous/next links. Every visible piece is built from Astryx components, so the docs dogfood the design system and pick up the theme when it is finalised.

## Considered Options

- **`fumadocs-ui`**: rejected. It brings its own look and component library, which would compete with Astryx and hide how the design system's own components hold up in a real docs site.
- **`@void/md`** (Void's built-in Markdown pages): rejected. It has no MDX, only islands, and the docs need live component previews written inline in content.

## Consequences

- Void loaders can only return serialisable props, so a `.server.ts` loader returns the page path, tree, TOC and neighbours, and the page component renders the compiled MDX on the client through the `collections/browser` entry.
- Fumadocs' built-in Shiki highlighting (`rehype-code`) is turned off. Code blocks go to Astryx `CodeBlock`, so syntax colours come from the theme. Highlighting happens at runtime instead of at build time.
