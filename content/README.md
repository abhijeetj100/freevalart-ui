# Markdown Content Model (Section 3)

This project starts with a markdown-first content workflow and can migrate to Sanity later.

## Collections

- `content/artworks/*.md`: portfolio items
- `content/posts/*.md`: blog posts

## Frontmatter expectations

Artworks:
- `title`, `excerpt`, `status`, `publishedAt`, `tags`
- `medium`, `dimensions`, `year`, `style`, `theme`, `imageUrl`

Posts:
- `title`, `excerpt`, `status`, `publishedAt`, `tags`
- `category`, `coverImageUrl`, `readingMinutes`

## Publishing workflow

Allowed statuses:
- `draft`
- `scheduled`
- `published`
- `archived`

## Deferred collections (schema-ready)

Type models are already scaffolded for:
- products
- custom orders
- classes
- users/customers
- testimonials
- media assets

Those can move from in-code models to CMS tables/documents in a later phase without changing page-level contracts.
