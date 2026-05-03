import Link from 'next/link';
import { getBlogPostEntries } from '@/lib/content';
import PageNav from '@/app/components/PageNav';

export default async function BlogPage() {
  const posts = await getBlogPostEntries();
  const publishedPosts = posts.filter((p) => p.status === 'published');

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
        <h2>All posts</h2>
        {publishedPosts.length === 0 ? (
          <p>No posts yet. Check back soon.</p>
        ) : (
          <div className="post-grid">
            {publishedPosts.map((post) => (
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
