import Link from 'next/link';
import { getBlogPostEntries } from '@/lib/content';
import { filterBlogPosts, getPostFilterOptions, normalizeSearchTerm } from '@/lib/content/content-query';
import ContentFilters from '@/app/components/ContentFilters';
import PageNav from '@/app/components/PageNav';

interface BlogPageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

function getSearchValue(params: Record<string, string | string[] | undefined>, key: string): string {
  const value = params[key];
  return typeof value === 'string' ? value : '';
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const resolvedSearchParams = await searchParams;
  const posts = await getBlogPostEntries();
  const publishedPosts = posts.filter((p) => p.status === 'published');
  const query = getSearchValue(resolvedSearchParams, 'q');
  const category = getSearchValue(resolvedSearchParams, 'category');
  const tag = getSearchValue(resolvedSearchParams, 'tag');
  const filteredPosts = filterBlogPosts(publishedPosts, { query, category, tag });
  const filterOptions = getPostFilterOptions(publishedPosts);

  return (
    <main>
      <PageNav />
      <section className="section">
        <span className="kicker">Blog</span>
        <h1>Studio journal and process notes</h1>
        <p className="lead">
          Reflections on composition, color, and craft from the studio. Updated regularly with
          behind-the-scenes work and technique explorations.
        </p>
      </section>

      <section className="section">
        <div className="section-header">
          <h2>All posts</h2>
          <p className="meta">
            Showing {filteredPosts.length} of {publishedPosts.length} posts
          </p>
        </div>

        <ContentFilters
          action="/blog"
          clearHref="/blog"
          searchPlaceholder="Search posts by title, excerpt, or tag"
          searchValue={normalizeSearchTerm(query)}
          selects={[
            {
              name: 'category',
              label: 'Category',
              value: normalizeSearchTerm(category),
              options: filterOptions.categories,
              placeholder: 'All categories'
            },
            {
              name: 'tag',
              label: 'Tag',
              value: normalizeSearchTerm(tag),
              options: filterOptions.tags,
              placeholder: 'All tags'
            }
          ]}
        />

        {publishedPosts.length === 0 ? (
          <p>No posts yet. Check back soon.</p>
        ) : filteredPosts.length === 0 ? (
          <div className="card">
            <p>No posts matched your filters. Try a broader search or clear the form.</p>
          </div>
        ) : (
          <div className="post-grid">
            {filteredPosts.map((post) => (
              <article key={post.slug} className="card">
                <Link href={`/blog/${post.slug}`}>
                  <h3>{post.title}</h3>
                </Link>
                <p className="meta">
                  {post.category} • {post.readingMinutes} min read
                </p>
                <p>{post.excerpt}</p>
                <div className="meta">
                  {post.tags.map((tag) => (
                    <span key={tag} style={{ marginRight: '8px' }}>
                      #{tag}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
