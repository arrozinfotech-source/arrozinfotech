import { useState, useEffect } from 'react';
import './Navbar.css';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  return (
    <nav className={`navbar ${scrolled ? 'navbar-scrolled' : ''}`}>
      <div className="navbar-container">

        {/* LOGO — text only */}
        <div className="navbar-logo" onClick={() => scrollToSection('home')}>
          <span className="logo-text">Arroz Infotech</span>
        </div>

        {/* HAMBURGER */}
        <button
          className={`hamburger ${isMenuOpen ? 'active' : ''}`}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle navigation menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        {/* NAV LINKS */}
        <ul className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
          {[
            { id: 'home',     label: 'Home'     },
            { id: 'services', label: 'Services' },
            { id: 'team',     label: 'Team'     },
            { id: 'contact',  label: 'Contact'  },
          ].map(({ id, label }) => (
            <li key={id}>
              <button onClick={() => scrollToSection(id)} className="nav-link">
                {label}
              </button>
            </li>
          ))}
        </ul>

      </div>
    </nav>
  );
};

export default Navbar;