import PageNav from '../components/PageNav';

export default function AboutPage() {
  return (
    <main>
      <PageNav />
      <section className="section">
        <span className="kicker">About me</span>
        <h1>Artist biography, achievements, and statement</h1>
        <p className="lead">
          This page is reserved for the artist story, profile photography, exhibitions, awards,
          press mentions, and a concise philosophy of the work.
        </p>
        <div className="status">Status: Coming soon</div>
      </section>
    </main>
  );
}
