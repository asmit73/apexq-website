import './App.css';
import React, { useState } from 'react';

const t = {
  heroTitle: (
    <>
      <span><span className="wave-text">APEXQ QUALITY VENTURES PRIVATE LIMITED</span></span>
    </>
  ),
  heroSubtitle: 'Third-party inspection, audit, and testing service in India.',
  learnMore: 'Learn more',
  keyServices: 'Our Key Services',
  services: [
    {
      icon: '🧪',
      title: 'Testing',
      text: 'Comprehensive testing services using state-of-the-art technology to guarantee the highest standards of quality and performance.'
    },
    {
      icon: '🔍',
      title: 'Inspections',
      text: 'Inspection team ensures your assets and processes meet all regulatory and safety requirements, minimizing risk and maximizing value.'
    },
    {
      icon: '📜',
      title: 'Certification',
      text: 'Industry-recognized certifications to help your business demonstrate compliance and build trust with your clients.'
    },
    {
      icon: '💡',
      title: 'Consulting',
      text: 'Experts offer consulting services to optimize your processes, improve quality, and ensure regulatory compliance.'
    },
    {
      icon: '🎓',
      title: 'Training',
      text: 'Professional training programs to empower your team with the latest industry knowledge and best practices.'
    }
  ],
  help: 'Need help or have a question?',
  sendRequest: 'Send Us A Request',
  venturesLine: 'Testing | Inspections | Certification | Consulting | Training',
  disclaimer: 'Disclaimer',
  terms: 'Terms',
  privacy: 'Privacy',
  cookies: 'Cookies',
  modernSlavery: 'Modern Slavery Act Statement',
  login: 'LOG IN',
  signup: 'SIGN UP',
  username: 'Username',
  password: 'Password',
  selectRole: 'Select Role',
  admin: 'Admin',
  inspector: 'Inspector',
  client: 'Client Coordinator',
  submit: 'Submit',
  logout: 'Logout',
  welcomeAdmin: 'Welcome, Admin!',
  welcomeClient: 'Welcome, Client Coordinator!',
  inspectorProfile: 'Inspector Profile',
  region: 'Region',
  specialization: 'Specialization',
  inspectorId: 'Inspector ID',
  history: 'History',
  noHistory: 'No history available.',
  contactUs: 'Contact Us',
  yourQuery: 'Your Query',
  yourEmail: 'Your Email',
  send: 'Send',
  cancel: 'Cancel',
  queryPlaceholder: 'Please describe your query or question...',
  emailPlaceholder: 'Enter your email address',
  querySent: 'Email client opened successfully!',
  queryError: 'Error sending query. Please try again.'
};

const featureButtons = [
  { icon: '👥', label: 'ApexQ Clients' },
  { icon: '📋', label: 'Inspection Management' },
  { icon: '🛡️', label: 'ApexQ QC' }
];

const inspectorSample = {
  username: 'inspector1',
  region: 'North India',
  specialization: 'Electrical Safety',
  inspectorId: 'INSP-001',
  history: [
    { date: '2024-05-01', details: 'Inspection at ABC Corp, Delhi' },
    { date: '2024-04-15', details: 'Inspection at XYZ Ltd, Chandigarh' },
    { date: '2024-03-28', details: 'Inspection at LMN Pvt, Jaipur' }
  ]
};

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState(null); // {role, username}
  const [loginForm, setLoginForm] = useState({ username: '', password: '', role: 'admin' });
  const [signupForm, setSignupForm] = useState({ username: '', password: '', role: 'admin' });
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [showContact, setShowContact] = useState(false);
  const [contactForm, setContactForm] = useState({ query: '', email: '' });
  const [aboutDropdown, setAboutDropdown] = useState(false);
  const [servicesDropdown, setServicesDropdown] = useState(false);
  const [productDropdown, setProductDropdown] = useState(false);
  const [resourcesDropdown, setResourcesDropdown] = useState(false);

  function handleLogin(e) {
    e.preventDefault();
    setUser({ role: loginForm.role, username: loginForm.username });
    setShowLogin(false);
  }
  function handleLogout() {
    setUser(null);
    setLoginForm({ username: '', password: '', role: 'admin' });
  }
  function handleSignup(e) {
    e.preventDefault();
    setUser({ role: signupForm.role, username: signupForm.username });
    setShowSignup(false);
  }

  function handleContactSubmit(e) {
    e.preventDefault();
    
    // Show loading state
    const submitButton = e.target.querySelector('.send-btn');
    const originalText = submitButton.textContent;
    submitButton.textContent = 'Sending...';
    submitButton.disabled = true;
    
    // Send email via backend API
    fetch('http://localhost:5000/api/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: contactForm.email,
        query: contactForm.query
      })
    })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        alert('Email sent successfully! We will get back to you soon.');
        setContactForm({ query: '', email: '' });
        setShowContact(false);
      } else {
        alert('Error: ' + data.message);
      }
    })
    .catch(error => {
      console.error('Error sending email:', error);
      alert('Failed to send email. Please try again or contact us directly.');
    })
    .finally(() => {
      // Reset button state
      submitButton.textContent = originalText;
      submitButton.disabled = false;
    });
  }

  function handleContactCancel() {
    setContactForm({ query: '', email: '' });
    setShowContact(false);
  }

  return (
    <div className="App">
      {/* Login Modal */}
      {showLogin && !user && (
        <div className="login-modal">
          <form className="login-form" onSubmit={handleLogin}>
            <h2>{t.login}</h2>
            <input
              type="text"
              placeholder={t.username}
              value={loginForm.username}
              onChange={e => setLoginForm({ ...loginForm, username: e.target.value })}
              required
            />
            <input
              type="password"
              placeholder={t.password}
              value={loginForm.password}
              onChange={e => setLoginForm({ ...loginForm, password: e.target.value })}
              required
            />
            <select
              value={loginForm.role}
              onChange={e => setLoginForm({ ...loginForm, role: e.target.value })}
            >
              <option value="admin">{t.admin}</option>
              <option value="inspector">{t.inspector}</option>
              <option value="client">{t.client}</option>
            </select>
            <div className="login-form-actions">
              <button type="submit">{t.submit}</button>
              <button type="button" className="cancel-btn" onClick={() => setShowLogin(false)}>Cancel</button>
            </div>
          </form>
        </div>
      )}
      {/* Signup Modal */}
      {showSignup && !user && (
        <div className="login-modal">
          <form className="login-form" onSubmit={handleSignup}>
            <h2>{t.signup}</h2>
            <input
              type="text"
              placeholder={t.username}
              value={signupForm.username}
              onChange={e => setSignupForm({ ...signupForm, username: e.target.value })}
              required
            />
            <input
              type="password"
              placeholder={t.password}
              value={signupForm.password}
              onChange={e => setSignupForm({ ...signupForm, password: e.target.value })}
              required
            />
            <select
              value={signupForm.role}
              onChange={e => setSignupForm({ ...signupForm, role: e.target.value })}
            >
              <option value="admin">{t.admin}</option>
              <option value="inspector">{t.inspector}</option>
              <option value="client">{t.client}</option>
            </select>
            <div className="login-form-actions">
              <button type="submit">{t.submit}</button>
              <button type="button" className="cancel-btn" onClick={() => setShowSignup(false)}>Cancel</button>
            </div>
          </form>
        </div>
      )}

      {/* Main Header (Testcoo-style) */}
      <header className="main-header testcoo-header">
        <div className="header-logo">
          <img
            src="/logo.png"
            className="App-logo-large"
            alt="ApexQ Logo"
            draggable={false}
            style={{ cursor: 'pointer', height: '96px', width: 'auto', objectFit: 'contain' }}
            onClick={() => window.location.reload()}
          />
          <div className="header-tagline">Integrity. Accuracy. Excellence.</div>
        </div>
        {/* Hamburger menu button for mobile */}
        <div
          className="hamburger"
          style={{ position: 'fixed', top: 18, right: 18, zIndex: 2001, background: '#fff', border: '3px solid #b71c1c', boxShadow: '0 4px 24px 0 #b71c1c55' }}
          onClick={() => setMenuOpen(v => !v)}
        >
          <div className="bar" style={{ background: '#b71c1c' }}></div>
          <div className="bar" style={{ background: '#b71c1c' }}></div>
          <div className="bar" style={{ background: '#b71c1c' }}></div>
        </div>
        <nav className="main-nav testcoo-nav">
          <div className="nav-link nav-link-small product-dropdown-parent" onMouseEnter={() => setProductDropdown(true)} onMouseLeave={() => setProductDropdown(false)}>
            <span onClick={() => setProductDropdown(v => !v)} style={{cursor:'pointer'}}>PRODUCT <span style={{fontSize:'1.1em',marginLeft:'2px'}}>▼</span></span>
            {productDropdown && (
              <div className="product-dropdown-list">
                <div className="product-col">
                  <div className="product-col-title">Softlines</div>
                  <ul>
                    <li className="about-dropdown-bullet"><span className="arrow">➔</span> Garments and Apparel Inspection</li>
                    <li className="about-dropdown-bullet"><span className="arrow">➔</span> Footwear Inspection</li>
                    <li className="about-dropdown-bullet"><span className="arrow">➔</span> Luggage and Bags Inspection</li>
                    <li className="about-dropdown-bullet"><span className="arrow">➔</span> Fashion Accessories Inspection</li>
                    <li className="about-dropdown-bullet"><span className="arrow">➔</span> Home Textile Inspection</li>
                    <li className="about-dropdown-bullet"><span className="arrow">➔</span> Outdoor Textile Inspection</li>
                    <li className="about-dropdown-bullet"><span className="arrow">➔</span> Fabric Inspection</li>
                  </ul>
                </div>
                <div className="product-col">
                  <div className="product-col-title">Hardlines</div>
                  <ul>
                    <li className="about-dropdown-bullet"><span className="arrow">➔</span> Fitness Equipment Inspection</li>
                    <li className="about-dropdown-bullet"><span className="arrow">➔</span> Baby Products Inspection</li>
                    <li className="about-dropdown-bullet"><span className="arrow">➔</span> Furniture Inspection</li>
                    <li className="about-dropdown-bullet"><span className="arrow">➔</span> Garden Tools Inspection</li>
                    <li className="about-dropdown-bullet"><span className="arrow">➔</span> Hardware and Building Material Inspection</li>
                    <li className="about-dropdown-bullet"><span className="arrow">➔</span> Home Decoration Products Inspection</li>
                    <li className="about-dropdown-bullet"><span className="arrow">➔</span> Kitchenware and Tableware Inspection</li>
                    <li className="about-dropdown-bullet"><span className="arrow">➔</span> Stationery and Office Supply Inspection</li>
                    <li className="about-dropdown-bullet"><span className="arrow">➔</span> Toys Quality Control Inspection</li>
                  </ul>
                </div>
                <div className="product-col">
                  <div className="product-col-title">Electronics & Electricals</div>
                  <ul>
                    <li className="about-dropdown-bullet"><span className="arrow">➔</span> Mobile Accessories Inspection</li>
                    <li className="about-dropdown-bullet"><span className="arrow">➔</span> Medical Device Inspection</li>
                    <li className="about-dropdown-bullet"><span className="arrow">➔</span> Power Tools Inspection</li>
                    <li className="about-dropdown-bullet"><span className="arrow">➔</span> Lighting Inspection</li>
                    <li className="about-dropdown-bullet"><span className="arrow">➔</span> Home Appliances Inspection</li>
                    <li className="about-dropdown-bullet"><span className="arrow">➔</span> Consumer Electronics Inspection</li>
                  </ul>
                </div>
                <div className="product-col">
                  <div className="product-col-title">Industrial Products</div>
                  <ul>
                    <li className="about-dropdown-bullet"><span className="arrow">➔</span> Industrial Products Inspection</li>
                  </ul>
                </div>
              </div>
            )}
          </div>
          <div className="nav-link nav-link-small about-dropdown-parent" onMouseEnter={() => setAboutDropdown(true)} onMouseLeave={() => setAboutDropdown(false)}>
            <span onClick={() => setAboutDropdown(v => !v)} style={{cursor:'pointer'}}>ABOUT US <span style={{fontSize:'1.1em',marginLeft:'2px'}}>▼</span></span>
            {aboutDropdown && (
              <ul className="about-dropdown-list">
                <li className="about-dropdown-bullet"><span className="arrow">➔</span> Company</li>
                <li className="about-dropdown-bullet"><span className="arrow">➔</span> Inspection System</li>
                <li className="about-dropdown-bullet"><span className="arrow">➔</span> Careers</li>
                <li className="about-dropdown-bullet"><span className="arrow">➔</span> Customer Feedback</li>
                <li className="about-dropdown-bullet"><span className="arrow">➔</span> Team Building</li>
              </ul>
            )}
          </div>
          <div className="nav-link nav-link-small services-dropdown-parent" onMouseEnter={() => setServicesDropdown(true)} onMouseLeave={() => setServicesDropdown(false)}>
            <span onClick={() => setServicesDropdown(v => !v)} style={{cursor:'pointer'}}>SERVICES <span style={{fontSize:'1.1em',marginLeft:'2px'}}>▼</span></span>
            {servicesDropdown && (
              <div className="services-dropdown-list">
                <div className="services-col">
                  <div className="services-col-title">Consumer Goods Inspection</div>
                  <ul>
                    <li className="about-dropdown-bullet"><span className="arrow">➔</span> Initial Production Check (IPC)</li>
                    <li className="about-dropdown-bullet"><span className="arrow">➔</span> During Production Check (DUPRO)</li>
                    <li className="about-dropdown-bullet"><span className="arrow">➔</span> Final Random Inspection (FRI)</li>
                    <li className="about-dropdown-bullet"><span className="arrow">➔</span> Loading Supervision (LS)</li>
                    <li className="about-dropdown-bullet"><span className="arrow">➔</span> 100% Inspection</li>
                    <li className="about-dropdown-bullet"><span className="arrow">➔</span> Sample Picking Service (SPS)</li>
                    <li className="about-dropdown-bullet"><span className="arrow">➔</span> Virtual Inspection</li>
                  </ul>
                </div>
                <div className="services-col">
                  <div className="services-col-title">Industrial Products Inspection</div>
                  <ul>
                    <li className="about-dropdown-bullet"><span className="arrow">➔</span> Industrial Inspection</li>
                  </ul>
                </div>
                <div className="services-col">
                  <div className="services-col-title">Supplier Audit</div>
                  <ul>
                    <li className="about-dropdown-bullet"><span className="arrow">➔</span> Quality Assessment</li>
                    <li className="about-dropdown-bullet"><span className="arrow">➔</span> Social Compliance Audit</li>
                    <li className="about-dropdown-bullet"><span className="arrow">➔</span> Environmental Management Audit</li>
                    <li className="about-dropdown-bullet"><span className="arrow">➔</span> Textile Exchange Supply Chain Supervision Series Standards Certification Program</li>
                    <li className="about-dropdown-bullet"><span className="arrow">➔</span> Supplier Assessment</li>
                    <li className="about-dropdown-bullet"><span className="arrow">➔</span> C-TPAT</li>
                    <li className="about-dropdown-bullet"><span className="arrow">➔</span> VR Factory Audit</li>
                    <li className="about-dropdown-bullet"><span className="arrow">➔</span> E-commerce Quality Control Inspection</li>
                  </ul>
                </div>
              </div>
            )}
          </div>
          <div className="nav-link nav-link-small resources-dropdown-parent" onMouseEnter={() => setResourcesDropdown(true)} onMouseLeave={() => setResourcesDropdown(false)}>
            <span onClick={() => setResourcesDropdown(v => !v)} style={{cursor:'pointer'}}>RESOURCES <span style={{fontSize:'1.1em',marginLeft:'2px'}}>▼</span></span>
            {resourcesDropdown && (
              <div className="resources-dropdown-list">
                <ul className="resources-col">
                  <li className="about-dropdown-bullet"><span className="arrow">➔</span> CES</li>
                  <li className="about-dropdown-bullet"><span className="arrow">➔</span> Booking Guideline</li>
                  <li className="about-dropdown-bullet"><span className="arrow">➔</span> Blog</li>
                  <li className="about-dropdown-bullet"><span className="arrow">➔</span> Sample Report</li>
                  <li className="about-dropdown-bullet"><span className="arrow">➔</span> AQL</li>
                  <li className="about-dropdown-bullet"><span className="arrow">➔</span> FAQ</li>
                  <li className="about-dropdown-bullet"><span className="arrow">➔</span> Coverage</li>
                </ul>
              </div>
            )}
          </div>
          <a href="#contact" className="nav-link nav-link-small" onClick={e => { 
            e.preventDefault(); 
            setShowContact(v => !v); 
            if (!showContact) {
              setTimeout(() => {
                document.querySelector('.contact-dropdown')?.scrollIntoView({ 
                  behavior: 'smooth', 
                  block: 'nearest' 
                });
              }, 100);
            }
          }}>CONTACT US <span style={{fontSize:'1.1em',marginLeft:'2px'}}>▼</span></a>
          {showContact && (
            <div className="contact-dropdown">
              <form className="contact-form" onSubmit={handleContactSubmit}>
                <div className="form-group">
                  <label htmlFor="email">{t.yourEmail}</label>
                  <input
                    id="email"
                    type="email"
                    placeholder={t.emailPlaceholder}
                    value={contactForm.email}
                    onChange={e => setContactForm({ ...contactForm, email: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="query">{t.yourQuery}</label>
                  <textarea
                    id="query"
                    placeholder={t.queryPlaceholder}
                    value={contactForm.query}
                    onChange={e => setContactForm({ ...contactForm, query: e.target.value })}
                    rows="3"
                    required
                  />
                </div>
                <div className="contact-form-actions">
                  <button type="submit" className="send-btn">{t.send}</button>
                  <button type="button" className="cancel-btn" onClick={handleContactCancel}>{t.cancel}</button>
                </div>
              </form>
            </div>
          )}
        </nav>
      </header>

      {/* Hero Section (Testcoo-style) */}
      <section className="hero-section testcoo-hero">
        <div className="hero-content">
          <h1 className="hero-title">{t.heroTitle}</h1>
          <p className="hero-subtitle">{t.heroSubtitle}</p>
          <div className="feature-btn-row">
            {featureButtons.map(btn => (
              <button className="feature-btn" key={btn.label}><span className="feature-icon">{btn.icon}</span>{btn.label}</button>
            ))}
            <button className="feature-btn main-red">Get a Sample Report</button>
          </div>
          <div className="hero-desc">
          </div>
        </div>
        <div className="hero-image">
          {/* You can add a background image or illustration here if desired */}
        </div>
      </section>

      {/* Inspector Profile (if logged in as inspector) */}
      {user && user.role === 'inspector' && (
        <section className="inspector-profile">
          <h2>{t.inspectorProfile}</h2>
          <div className="inspector-details">
            <div><b>{t.username}:</b> {inspectorSample.username}</div>
            <div><b>{t.region}:</b> {inspectorSample.region}</div>
            <div><b>{t.specialization}:</b> {inspectorSample.specialization}</div>
            <div><b>{t.inspectorId}:</b> {inspectorSample.inspectorId}</div>
          </div>
          <div className="inspector-history">
            <b>{t.history}:</b>
            <ul>
              {inspectorSample.history.length === 0 ? (
                <li>{t.noHistory}</li>
              ) : (
                inspectorSample.history.map((h, i) => (
                  <li key={i}>{h.date}: {h.details}</li>
                ))
              )}
            </ul>
          </div>
        </section>
      )}

      {/* Admin/Client Coordinator Dashboard (if logged in as admin/client) */}
      {user && user.role === 'admin' && (
        <section className="dashboard-section"><h2>{t.welcomeAdmin}</h2></section>
      )}
      {user && user.role === 'client' && (
        <section className="dashboard-section"><h2>{t.welcomeClient}</h2></section>
      )}

      {/* Description Bullets Section (always visible) */}
      <section className="description-section">
        <h2 className="desc-title">Our Key Services</h2>
        <div className="services-grid">
          {/* Row 1 */}
          <div className="service-row">
            <div className="service-card">
              <div className="service-info">
                <span className="service-title">Testing</span>
                <span className="service-arrow">&#8594;</span>
              </div>
            </div>
            <div className="service-card">
              <div className="service-info">
                <span className="service-title">Inspection</span>
                <span className="service-arrow">&#8594;</span>
              </div>
            </div>
          </div>
          {/* Row 2 */}
          <div className="service-row">
            <div className="service-card">
              <div className="service-info">
                <span className="service-title">Consulting</span>
                <span className="service-arrow">&#8594;</span>
              </div>
            </div>
            <div className="service-card">
              <div className="service-info">
                <span className="service-title">Training</span>
                <span className="service-arrow">&#8594;</span>
              </div>
            </div>
          </div>
          {/* Row 3 */}
          <div className="service-row">
            <div className="service-card">
              <div className="service-info">
                <span className="service-title">IMPACT NOW for Sustainability</span>
                <span className="service-arrow">&#8594;</span>
              </div>
            </div>
            <div className="service-card">
              <div className="service-info">
                <span className="service-title">Digital Trust</span>
                <span className="service-arrow">&#8594;</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Help Section (moved above footer with extra margin) */}
      <section className="help-section" style={{ marginBottom: '64px' }}>
        <div className="help-content">
          <span className="help-question">{t.help}</span>
          <div className="help-actions">
            <button className="help-btn">+852 3008 2099</button>
            <button className="help-btn primary" onClick={() => setShowContact(true)}>{t.sendRequest}</button>
          </div>
        </div>
      </section>

      {/* Footer (always visible) */}
      <footer className="main-footer">
        <div className="footer-top">
          <img src="/logo.png" className="footer-logo" alt="ApexQ Logo" draggable={false} style={{ cursor: 'default', height: '40px', width: 'auto', objectFit: 'contain' }} />
          <span className="footer-ventures">{t.venturesLine}</span>
        </div>
        <div className="footer-links">
          <a href="#disclaimer" className="footer-link">{t.disclaimer}</a>
          <a href="#terms" className="footer-link">{t.terms}</a>
          <a href="#privacy" className="footer-link">{t.privacy}</a>
          <a href="#cookies" className="footer-link">{t.cookies}</a>
          <a href="#modernslavery" className="footer-link">{t.modernSlavery}</a>
        </div>
      </footer>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="mobile-menu">
          <div className="mobile-dropdown">
            <span className="nav-link nav-link-small">PRODUCT</span>
            <ul className="mobile-dropdown-list">
              <li className="about-dropdown-bullet">Softlines
                <ul>
                  <li className="about-dropdown-bullet">Garments and Apparel Inspection</li>
                  <li className="about-dropdown-bullet">Footwear Inspection</li>
                  <li className="about-dropdown-bullet">Luggage and Bags Inspection</li>
                  <li className="about-dropdown-bullet">Fashion Accessories Inspection</li>
                  <li className="about-dropdown-bullet">Home Textile Inspection</li>
                  <li className="about-dropdown-bullet">Outdoor Textile Inspection</li>
                  <li className="about-dropdown-bullet">Fabric Inspection</li>
                </ul>
              </li>
              <li className="about-dropdown-bullet">Hardlines
                <ul>
                  <li className="about-dropdown-bullet">Fitness Equipment Inspection</li>
                  <li className="about-dropdown-bullet">Baby Products Inspection</li>
                  <li className="about-dropdown-bullet">Furniture Inspection</li>
                  <li className="about-dropdown-bullet">Garden Tools Inspection</li>
                  <li className="about-dropdown-bullet">Hardware and Building Material Inspection</li>
                  <li className="about-dropdown-bullet">Home Decoration Products Inspection</li>
                  <li className="about-dropdown-bullet">Kitchenware and Tableware Inspection</li>
                  <li className="about-dropdown-bullet">Stationery and Office Supply Inspection</li>
                  <li className="about-dropdown-bullet">Toys Quality Control Inspection</li>
                </ul>
              </li>
              <li className="about-dropdown-bullet">Electronics & Electricals
                <ul>
                  <li className="about-dropdown-bullet">Mobile Accessories Inspection</li>
                  <li className="about-dropdown-bullet">Medical Device Inspection</li>
                  <li className="about-dropdown-bullet">Power Tools Inspection</li>
                  <li className="about-dropdown-bullet">Lighting Inspection</li>
                  <li className="about-dropdown-bullet">Home Appliances Inspection</li>
                  <li className="about-dropdown-bullet">Consumer Electronics Inspection</li>
                </ul>
              </li>
              <li className="about-dropdown-bullet">Industrial Products
                <ul>
                  <li className="about-dropdown-bullet">Industrial Products Inspection</li>
                </ul>
              </li>
            </ul>
          </div>
          <div className="mobile-dropdown">
            <span className="nav-link nav-link-small">ABOUT US</span>
            <ul className="mobile-dropdown-list">
              <li className="about-dropdown-bullet">Company</li>
              <li className="about-dropdown-bullet">Inspection System</li>
              <li className="about-dropdown-bullet">Careers</li>
              <li className="about-dropdown-bullet">Customer Feedback</li>
              <li className="about-dropdown-bullet">Team Building</li>
            </ul>
          </div>
          <div className="mobile-dropdown">
            <span className="nav-link nav-link-small">SERVICES</span>
            <ul className="mobile-dropdown-list">
              <li className="about-dropdown-bullet">Consumer Goods Inspection
                <ul>
                  <li className="about-dropdown-bullet">Initial Production Check (IPC)</li>
                  <li className="about-dropdown-bullet">During Production Check (DUPRO)</li>
                  <li className="about-dropdown-bullet">Final Random Inspection (FRI)</li>
                  <li className="about-dropdown-bullet">Loading Supervision (LS)</li>
                  <li className="about-dropdown-bullet">100% Inspection</li>
                  <li className="about-dropdown-bullet">Sample Picking Service (SPS)</li>
                  <li className="about-dropdown-bullet">Virtual Inspection</li>
                </ul>
              </li>
              <li className="about-dropdown-bullet">Industrial Products Inspection
                <ul>
                  <li className="about-dropdown-bullet">Industrial Inspection</li>
                </ul>
              </li>
              <li className="about-dropdown-bullet">Supplier Audit
                <ul>
                  <li className="about-dropdown-bullet">Quality Assessment</li>
                  <li className="about-dropdown-bullet">Social Compliance Audit</li>
                  <li className="about-dropdown-bullet">Environmental Management Audit</li>
                  <li className="about-dropdown-bullet">Textile Exchange Supply Chain Supervision Series Standards Certification Program</li>
                  <li className="about-dropdown-bullet">Supplier Assessment</li>
                  <li className="about-dropdown-bullet">C-TPAT</li>
                  <li className="about-dropdown-bullet">VR Factory Audit</li>
                  <li className="about-dropdown-bullet">E-commerce Quality Control Inspection</li>
                </ul>
              </li>
            </ul>
          </div>
          <div className="mobile-dropdown">
            <span className="nav-link nav-link-small">RESOURCES</span>
            <ul className="mobile-dropdown-list">
              <li className="about-dropdown-bullet">CES</li>
              <li className="about-dropdown-bullet">Booking Guideline</li>
              <li className="about-dropdown-bullet">Blog</li>
              <li className="about-dropdown-bullet">Sample Report</li>
              <li className="about-dropdown-bullet">AQL</li>
              <li className="about-dropdown-bullet">FAQ</li>
              <li className="about-dropdown-bullet">Coverage</li>
            </ul>
          </div>
          <a href="#contact" className="nav-link nav-link-small" onClick={() => setMenuOpen(false)}>CONTACT US</a>
        </div>
      )}
    </div>
  );
}

export default App;