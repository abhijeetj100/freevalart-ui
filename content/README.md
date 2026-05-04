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

## How to add or edit a blog post

Each blog post is a markdown file in `content/posts/`.

To add a new post:
1. Create a new `.md` file in `content/posts/`.
2. Use the filename as the slug, for example `my-new-post.md` becomes `/blog/my-new-post`.
3. Add frontmatter with the required fields:
	- `title`
	- `excerpt`
	- `status`
	- `publishedAt`
	- `tags`
	- `category`
	- `coverImageUrl`
	- `readingMinutes`
4. Write the post body below the closing `---` line.
5. Save the file and refresh the site.

To edit an existing post:
1. Open the existing file in `content/posts/`.
2. Update the frontmatter or body text as needed.
3. Keep `status: published` if you want the post visible on the site.
4. Change `publishedAt` if you want it to sort differently in the listing.

Example:

```md
---
title: My New Post
excerpt: A short summary for the blog list page.
status: published
publishedAt: 2026-05-04
tags: [studio, composition, process]
category: Studio Journal
coverImageUrl: https://example.com/image.jpg
readingMinutes: 4
---

Write the post content here.

Use blank lines to separate paragraphs.
```

Notes:
- Posts with `status: draft` will still exist in the content folder, but the current listing pages only show published entries.
- Slugs come from the filename, so renaming the file changes the URL.
- The home page and blog listing sort posts by `publishedAt` with the newest item first.
