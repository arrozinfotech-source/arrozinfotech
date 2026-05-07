import { useEffect, useRef } from 'react';
import './Services.css';

const services = [
  { id: 1, icon: '📊', title: 'Digital Marketing',        desc: 'Amplify your online presence with data-driven marketing strategies, SEO, and impactful campaigns.',  tags: ['SEO', 'Social Media', 'Content Marketing'],  color: '#F107A3' },
  { id: 2, icon: '🌐', title: 'Web Development',          desc: 'Build scalable, modern web applications using the latest technologies and best practices.',            tags: ['React', 'Next.js', 'Full Stack'],             color: '#7B2FF7' },
  { id: 3, icon: '📱', title: 'App Development',           desc: 'Create intuitive mobile applications for iOS and Android with seamless user experiences.',             tags: ['React Native', 'Flutter', 'Native'],          color: '#F107A3' },
  { id: 4, icon: '🤖', title: 'AI Solutions',              desc: 'Leverage artificial intelligence to automate workflows and unlock powerful business insights.',         tags: ['Machine Learning', 'NLP', 'Vision'],          color: '#7B2FF7' },
  { id: 5, icon: '🎨', title: 'UI/UX Design',              desc: 'Design beautiful, user-centric interfaces that drive engagement and boost conversion rates.',           tags: ['Figma', 'Prototyping', 'User Research'],      color: '#F107A3' },
  { id: 6, icon: '🗄️', title: 'Database Solutions',       desc: 'Design and manage robust database systems for optimal performance, scale, and security.',              tags: ['SQL', 'NoSQL', 'Cloud DB'],                   color: '#7B2FF7' },
  { id: 7, icon: '🚀', title: 'Startup Support',           desc: 'Accelerate your startup journey with comprehensive tech guidance and rapid MVP delivery.',              tags: ['MVP Build', 'Strategy', 'Growth Hacking'],    color: '#F107A3' },
  { id: 8, icon: '🎓', title: 'Student Business Support',  desc: 'Empower students with affordable tech solutions, mentorship, and real-world project exposure.',         tags: ['Affordable', 'Mentorship', 'Portfolio'],      color: '#7B2FF7' },
];

const ServiceCard = ({ service, index }) => {
  const cardRef = useRef(null);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('visible');
          observer.unobserve(el);
        }
      },
      { threshold: 0.12 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const isEven = index % 2 === 0;

  return (
    <div
      ref={cardRef}
      className={`service-card glass-strong ${isEven ? 'slide-left' : 'slide-right'}`}
      style={{ '--card-delay': `${index * 80}ms`, '--glow-color': service.color }}
    >
      <div className="service-icon-wrap">
        <span className="service-icon">{service.icon}</span>
        <div className="icon-ring"></div>
      </div>
      <h3>{service.title}</h3>
      <p className="service-description">{service.desc}</p>
      <div className="service-features">
        {service.tags.map((tag, i) => (
          <span key={i} className="feature-tag">{tag}</span>
        ))}
      </div>
      <div className="card-glow"></div>
      <div className="card-border-shine"></div>
    </div>
  );
};

const Services = () => (
  <section id="services" className="services">
    <div className="container">
      <div className="section-title">
        <h2>Our Services</h2>
        <p>Comprehensive solutions tailored to your business needs</p>
      </div>
      <div className="services-grid">
        {services.map((svc, i) => (
          <ServiceCard key={svc.id} service={svc} index={i} />
        ))}
      </div>
    </div>
  </section>
);

export default Services;