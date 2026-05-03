import PageNav from '../components/PageNav';

export default function BlogPage() {
  return (
    <main>
      <PageNav />
      <section className="section">
        <span className="kicker">Blog</span>
        <h1>Daily artwork posts, categories, and search</h1>
        <p className="lead">
          This section is reserved for the artwork journal, image galleries, tags, filters,
          comments, and social sharing.
        </p>
        <div className="status">Status: MVP — Placeholder</div>
      </section>
    </main>
  );
}
