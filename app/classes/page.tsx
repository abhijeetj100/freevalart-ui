import PageNav from '../components/PageNav';

export default function ClassesPage() {
  return (
    <main>
      <PageNav />
      <section className="section">
        <span className="kicker">Classes</span>
        <h1>Teaching, workshops, and scheduled sessions</h1>
        <p className="lead">
          This section is reserved for class listings, levels, venues, capacity, waitlists, and
          registration payment.
        </p>
        <div className="status">Status: MVP — Placeholder</div>
      </section>
    </main>
  );
}
