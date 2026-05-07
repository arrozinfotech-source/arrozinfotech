import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const linkedinUrl = 'https://www.linkedin.com/in/zorvexa-technologies-975523406';

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <div className="footer-logo">
            <span className="logo-icon">◆</span>
            <span className="logo-text">Arroz Infotech</span>
          </div>
          <p className="footer-description">
            Innovating tomorrow's solutions today with cutting-edge technology and expertise.
          </p>
        </div>

        <div className="footer-links">
          <div className="link-group">
            <h4>Quick Links</h4>
            <ul>
              <li><a href="#home">Home</a></li>
              <li><a href="#services">Services</a></li>
              <li><a href="#team">Team</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </div>

          <div className="link-group">
            <h4>Connect</h4>
            <ul>
              <li>
                <a href={linkedinUrl} target="_blank" rel="noopener noreferrer">
                  LinkedIn
                </a>
              </li>
              <li><a href="mailto:info@arroz.tech">Email</a></li>
            </ul>
          </div>
        </div>
      </div>

      <div className="footer-divider"></div>

      <div className="footer-bottom">
        <p className="copyright">
          © {currentYear} Arroz Infotech. All rights reserved.
        </p>
        <p className="footer-tagline">
          Built with precision. Delivered with excellence.
        </p>
      </div>
    </footer>
  );
};

export default Footer;