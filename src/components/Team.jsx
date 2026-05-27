import './Team.css';

const Team = () => {
  const teamMembers = [
    {
      id: 1,
      name: 'Prince R',
      role: 'Founder & CEO',
      description: 'Visionary leader driving innovation and business strategy',
      icon: '👨‍💼',
    },
    
  ];

  const linkedinCompanyUrl = 'www.linkedin.com/in/prince-r-74684128a';

  const handleLinkedInClick = () => {
    window.open(linkedinCompanyUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="team" className="team">
      <div className="container">
        <div className="section-title">
          <h2>Meet Our Team</h2>
          <p>Passionate professionals dedicated to excellence</p>
        </div>

        <div className="team-grid">
          {teamMembers.map((member, index) => (
            <div 
              key={member.id} 
              className="team-card glass-strong"
              style={{
                animationDelay: `${index * 0.15}s`
              }}
            >
              <div className="team-card-content">
                <div className="member-avatar">{member.icon}</div>
                <h3>{member.name}</h3>
                <p className="member-role">{member.role}</p>
                <p className="member-description">{member.description}</p>
              </div>
              
              <button 
                className="linkedin-btn"
                onClick={handleLinkedInClick}
                aria-label={`${member.name} LinkedIn`}
                title="Visit Company LinkedIn"
              >
                <span className="linkedin-icon">🔗</span>
              </button>

              <div className="team-card-glow"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;