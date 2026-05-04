import PageNav from '../components/PageNav';
import { Metadata } from 'next';
import aboutData from '@/content/about.json';

export const metadata: Metadata = {
  title: 'About | Artist Portfolio',
  description: 'Learn about the artist, their work, philosophy, exhibitions, and awards.',
  openGraph: {
    title: 'About the Artist',
    description: 'Discover the story, practice, and achievements behind the work.',
    type: 'website',
    url: 'https://artistportfolio.com/about',
  },
};

export default function AboutPage() {
  return (
    <main>
      <PageNav />

      {/* Hero Section */}
      <section className="section about-hero">
        <div className="about-hero-content">
          <div className="about-intro">
            <span className="kicker">About</span>
            <h1>{aboutData.intro}</h1>
            <p className="lead">{aboutData.biography}</p>
          </div>
          <div className="about-profile-image">
            <img src={aboutData.profileImage} alt="Artist profile" />
          </div>
        </div>
      </section>

      {/* Artist Journey */}
      <section className="section about-journey">
        <h2>Artistic Journey</h2>
        <div className="timeline">
          {aboutData.artistJourney.map((item, idx) => (
            <div key={idx} className="timeline-item">
              <div className="timeline-year">{item.year}</div>
              <div className="timeline-content">{item.milestone}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Artist Statement */}
      <section className="section about-statement">
        <h2>Artist Statement</h2>
        <blockquote className="artist-statement">
          {aboutData.artistStatement}
        </blockquote>
      </section>

      {/* Professional Background */}
      <section className="section about-background">
        <h2>Professional Background</h2>
        <p>{aboutData.professionalBackground}</p>
      </section>

      {/* Exhibitions */}
      <section className="section about-exhibitions">
        <h2>Exhibitions</h2>
        <div className="exhibitions-list">
          {aboutData.exhibitions.map((ex, idx) => (
            <div key={idx} className="exhibition-item">
              <div className="exhibition-header">
                <h3>{ex.title}</h3>
                <span className="exhibition-year">{ex.year}</span>
              </div>
              <p className="exhibition-venue">
                {ex.venue} <span className="exhibition-type">({ex.type})</span>
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Awards */}
      <section className="section about-awards">
        <h2>Awards & Recognition</h2>
        <div className="awards-list">
          {aboutData.awards.map((award, idx) => (
            <div key={idx} className="award-item">
              <h3>{award.title}</h3>
              <p>{award.organization} — {award.year}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Press */}
      <section className="section about-press">
        <h2>Press & Publications</h2>
        <div className="press-list">
          {aboutData.press.map((item, idx) => (
            <div key={idx} className="press-item">
              <h3>{item.title}</h3>
              <p>
                <em>{item.publication}</em> — {item.year}
              </p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
