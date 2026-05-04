import { Metadata } from 'next';
import Link from 'next/link';
import { getBlogPostEntries } from '@/lib/content';
import { getRelatedBlogPosts } from '@/lib/content/content-query';
import CommentSection from '@/app/components/CommentSection';
import PageNav from '@/app/components/PageNav';
import ShareButtons from '@/app/components/ShareButtons';

interface BlogDetailProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: BlogDetailProps): Promise<Metadata> {
  const { slug } = await params;
  const posts = await getBlogPostEntries();
  const post = posts.find((p) => p.slug === slug);

  if (!post) {
    return { title: 'Post not found' };
  }

  return {
    title: post.title,
    description: post.excerpt,
    authors: [{ name: 'Freeval Art' }],
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.publishedAt,
      images: post.coverImageUrl ? [{ url: post.coverImageUrl }] : undefined
    }
  };
}

export async function generateStaticParams() {
  const posts = await getBlogPostEntries();
  return posts.map((post) => ({ slug: post.slug }));
}

export default async function BlogDetailPage({ params }: BlogDetailProps) {
  const { slug } = await params;
  const posts = await getBlogPostEntries();
  const post = posts.find((p) => p.slug === slug);

  if (!post) {
    return (
      <main>
        <PageNav />
        <section className="section">
          <h1>Post not found</h1>
          <p>Sorry, this post could not be found.</p>
        </section>
      </main>
    );
  }

  const relatedPosts = getRelatedBlogPosts(
    posts.filter((entry) => entry.status === 'published'),
    post
  );

  return (
    <main>
      <PageNav />

      <section className="section">
        <span className="kicker">{post.category}</span>
        <h1>{post.title}</h1>
        <p className="meta">
          Published {new Date(post.publishedAt).toLocaleDateString()} • {post.readingMinutes} min
          read
        </p>
      </section>

      {post.coverImageUrl && (
        <section className="section">
          <img
            src={post.coverImageUrl}
            alt={post.title}
            style={{
              width: '100%',
              maxHeight: '400px',
              objectFit: 'cover',
              borderRadius: '12px'
            }}
          />
        </section>
      )}

      <section className="section">
        <article className="post-body">
          {post.body.split('\n\n').map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </article>
      </section>

      <section className="section">
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          {post.tags.map((tag) => (
            <span key={tag} className="tag">
              {tag}
            </span>
          ))}
        </div>
      </section>

      <section className="section">
        <ShareButtons description={post.excerpt} path={`/blog/${post.slug}`} title={post.title} />
      </section>

      <section className="section">
        <div className="card">
          <h3>Related posts</h3>
          {relatedPosts.length === 0 ? (
            <p>No related posts yet. Browse the full blog for more studio notes.</p>
          ) : (
            <div className="related-grid">
              {relatedPosts.map((relatedPost) => (
                <article className="card related-card" key={relatedPost.slug}>
                  <Link href={`/blog/${relatedPost.slug}`}>
                    <h4>{relatedPost.title}</h4>
                  </Link>
                  <p className="meta">{relatedPost.category}</p>
                  <p>{relatedPost.excerpt}</p>
                </article>
              ))}
            </div>
          )}
          <p>
            <Link className="button" href="/blog">
              Back to all posts
            </Link>
          </p>
        </div>
      </section>

      <CommentSection storageKey={`blog-comments:${post.slug}`} title="Comments" />
    </main>
  );
}
