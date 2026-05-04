import { Metadata } from 'next';
import PageNav from '../components/PageNav';
import ContactForm from '../components/ContactForm';
import contactData from '@/content/contact.json';

export const metadata: Metadata = {
  title: 'Contact | Artist Portfolio',
  description: 'Get in touch for commissions, custom orders, classes, and general inquiries.',
  openGraph: {
    title: 'Contact',
    description: 'Reach out to discuss your project, class enrollment, or inquiry.',
    type: 'website',
    url: 'https://artistportfolio.com/contact',
  },
};

export default function ContactPage() {
  return (
    <main>
      <PageNav />

      {/* Hero Section */}
      <section className="section contact-hero">
        <span className="kicker">Get in touch</span>
        <h1>Let&apos;s talk about your project</h1>
        <p className="lead">
          Whether you&apos;re interested in commissioning a piece, taking a class, or just have a question,
          I&apos;d love to hear from you. Fill out the form below and I&apos;ll get back to you as soon as possible.
        </p>
      </section>

      {/* Main Contact Section */}
      <section className="section contact-main">
        <div className="contact-layout">
          {/* Form */}
          <div className="contact-form-wrapper">
            <h2>Send a Message</h2>
            <ContactForm />
          </div>

          {/* Contact Info Sidebar */}
          <div className="contact-info">
            {/* Business Hours */}
            <div className="contact-block">
              <h3>Business Hours</h3>
              <div className="hours-list">
                {contactData.businessHours.map((item, idx) => (
                  <div key={idx} className="hours-item">
                    <div className="hours-day">{item.day}</div>
                    <div className="hours-time">{item.hours}</div>
                  </div>
                ))}
              </div>
              <p className="response-time">{contactData.responseTime}</p>
            </div>

            {/* Contact Details */}
            <div className="contact-block">
              <h3>Contact Details</h3>
              <div className="contact-detail">
                <a href={`tel:${contactData.phone}`} className="contact-link">
                  📞 {contactData.phone}
                </a>
              </div>
              <div className="contact-detail">
                <a href={`mailto:${contactData.email}`} className="contact-link">
                  ✉️ {contactData.email}
                </a>
              </div>
            </div>

            {/* Studio Address */}
            <div className="contact-block">
              <h3>Studio Location</h3>
              <address className="studio-address">
                {contactData.studioAddress.street}<br />
                {contactData.studioAddress.city}, {contactData.studioAddress.state} {contactData.studioAddress.zip}<br />
                {contactData.studioAddress.country}
              </address>
            </div>

            {/* Social Links */}
            <div className="contact-block">
              <h3>Follow Along</h3>
              <div className="social-links">
                {contactData.socialLinks.map((social, idx) => (
                  <a
                    key={idx}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-link"
                    title={`Visit ${social.platform}`}
                  >
                    {social.platform}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
