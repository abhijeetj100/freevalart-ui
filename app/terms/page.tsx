import PageNav from '../components/PageNav';

export default function TermsPage() {
  return (
    <main>
      <PageNav />
      <section className="section">
        <span className="kicker">Terms</span>
        <h1>Website and purchase terms</h1>
        <p className="lead">
          Add the terms of service, payment terms, shipping policy, and commission policy here.
        </p>
        <div className="status">Status: Coming soon</div>
      </section>
    </main>
  );
}
