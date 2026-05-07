import { useState, useRef, useEffect } from 'react';
import './Contact.css';

/*
  ╔══════════════════════════════════════════════════════╗
  ║  DIRECT EMAIL SETUP — EmailJS (free, no backend)    ║
  ║  1. Go to https://emailjs.com  and create account   ║
  ║  2. Add a service (Gmail) → copy SERVICE_ID         ║
  ║  3. Create a template using these variables:        ║
  ║       {{from_name}}  {{from_email}}  {{message}}    ║
  ║     → copy TEMPLATE_ID                              ║
  ║  4. Go to Account → copy PUBLIC_KEY                 ║
  ║  5. npm install @emailjs/browser                    ║
  ║  6. Paste your keys in the 3 constants below        ║
  ╚══════════════════════════════════════════════════════╝
*/
const EMAILJS_SERVICE_ID  = 'YOUR_SERVICE_ID';   // ← replace
const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID';  // ← replace
const EMAILJS_PUBLIC_KEY  = 'YOUR_PUBLIC_KEY';   // ← replace

const WHATSAPP_NUMBER = '917397551808';
const WHATSAPP_MSG    = encodeURIComponent(
  'Hi Arroz Infotech! I would like to know more about your services.'
);

const contactItems = [
  {
    icon: '📧',
    label: 'Email',
    value: 'arrozinfotech@gmail.com',
    href: 'mailto:arrozinfotech@gmail.com',
    className: '',
  },
  {
    icon: '💬',
    label: 'WhatsApp',
    value: '+91 7397551808',
    href: `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MSG}`,
    className: 'whatsapp-item',
    external: true,
  },
  {
    icon: '🔗',
    label: 'LinkedIn',
    value: 'Arroz Infotech',
    href: 'https://www.linkedin.com/in/arroz-infotech-7230a5408',
    className: 'linkedin-item',
    external: true,
  },
   {
    icon: '📸',
    label: 'Instagram',
    value: '@arrozinfotech',
    href: 'https://www.instagram.com/arrozinfotech?igsh=Y2d1a3lvanZpMTh4',
    className: 'instagram-item',
    external: true,
  },
  { icon: '📍', label: 'Location',      value: 'Chennai Tamil Nadu',       href: null },
  { icon: '⏰', label: 'Response Time', value: '24–48 hours', href: null },
  
];

const Contact = () => {
  const sectionRef = useRef(null);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle | loading | success | error

  /* scroll reveal */
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) el.classList.add('section-visible'); },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const handleChange = (e) => {
    setFormData((p) => ({ ...p, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');

    try {
      /* ── EmailJS send ── */
      // Uncomment the 3 lines below once you install @emailjs/browser and add your keys:
      // import emailjs from '@emailjs/browser';
      // await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID,
      //   { from_name: formData.name, from_email: formData.email, message: formData.message,
      //     to_email: 'arrozinfotech@gmail.com' },
      //   EMAILJS_PUBLIC_KEY);

      /* ── Fallback: open mailto (works without EmailJS) ── */
      const subject = encodeURIComponent(`Portfolio Enquiry from ${formData.name}`);
      const body    = encodeURIComponent(
        `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
      );
      window.location.href = `mailto:arrozinfotech@gmail.com?subject=${subject}&body=${body}`;

      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setStatus('idle'), 6000);
    } catch (err) {
      console.error('Email error:', err);
      setStatus('error');
      setTimeout(() => setStatus('idle'), 5000);
    }
  };
  

  return (
    <section id="contact" className="contact" ref={sectionRef}>
      <div className="container contact-wrap">

        {/* ── LEFT: info ── */}
        <div className="contact-info reveal-left">
          <div className="section-title">
            <h2>Get In Touch</h2>
            <p>Have a project in mind? Let's turn your idea into reality.</p>
          </div>

          <ul className="contact-list">
            {contactItems.map(({ icon, label, value, href, className, external }) => (
              <li key={label} className={`contact-item ${className || ''}`}>
                <span className="c-icon">{icon}</span>
                <div className="c-info">
                  <span className="c-label">{label}</span>
                  {href ? (
                    <a
                      href={href}
                      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                      className="c-value c-link"
                    >
                      {value}
                    </a>
                  ) : (
                    <span className="c-value">{value}</span>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* ── RIGHT: form ── */}
        <form className="contact-form glass-strong reveal-right" onSubmit={handleSubmit} noValidate>
          <h3>Send a Message</h3>
          <p className="form-sub">Message goes directly to <strong>arrozinfotech@gmail.com</strong></p>

          <div className="form-group">
            <label htmlFor="name">Your Name</label>
            <input
              id="name" name="name" type="text"
              value={formData.name} onChange={handleChange}
              placeholder="John Doe" required
              disabled={status === 'loading'}
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              id="email" name="email" type="email"
              value={formData.email} onChange={handleChange}
              placeholder="john@example.com" required
              disabled={status === 'loading'}
            />
          </div>

          <div className="form-group">
            <label htmlFor="message">Message</label>
            <textarea
              id="message" name="message"
              value={formData.message} onChange={handleChange}
              placeholder="Tell us about your project..."
              rows={5} required
              disabled={status === 'loading'}
            />
          </div>

          <button type="submit" className="btn btn-primary send-btn" disabled={status === 'loading'}>
            {status === 'loading' ? (
              <><span className="spinner"></span> Sending…</>
            ) : '✉ Send Message'}
          </button>

          {status === 'success' && (
            <div className="form-alert success-alert">
              ✅ Message sent! We'll reply within 24–48 hours.
            </div>
          )}
          {status === 'error' && (
            <div className="form-alert error-alert">
              ❌ Something went wrong. Please email us directly.
            </div>
          )}
        </form>

      </div>
    </section>
  );
};

export default Contact;