import React, { useState, useEffect } from 'react';
import { Menu, X, Code2, ArrowUpRight } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';
import './Navbar.css';

export default function Navbar() {
  const [activeSection, setActiveSection] = useState('hero');
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Home', href: '#hero', id: 'hero' },
    { name: 'About', href: '#about', id: 'about' },
    { name: 'Projects', href: '#projects', id: 'projects' },
    { name: 'Skills', href: '#skills', id: 'skills' },
    { name: 'Contact', href: '#contact', id: 'contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

      // Determine active section
      const sections = navLinks.map(link => document.getElementById(link.id));
      const scrollPosition = window.scrollY + 250;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(navLinks[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const targetElement = document.querySelector(href);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className={`navbar-header ${scrolled ? 'navbar-scrolled' : ''}`}>
      <div className="container navbar-container">
        {/* Brand Logo */}
        <a href="#hero" onClick={(e) => handleNavClick(e, '#hero')} className="navbar-brand">
          <div className="brand-icon">
            <Code2 size={20} className="brand-svg" />
          </div>
          <span className="brand-name">
            {personalInfo.name} <span className="brand-dot">.</span>
          </span>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="navbar-desktop-nav">
          <ul className="nav-list">
            {navLinks.map((link) => (
              <li key={link.id} className="nav-item">
                <a
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`nav-link ${activeSection === link.id ? 'active' : ''}`}
                >
                  {link.name}
                  {activeSection === link.id && <span className="nav-link-indicator" />}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Desktop CTA */}
        <div className="navbar-actions">
          <a
            href="#contact"
            onClick={(e) => handleNavClick(e, '#contact')}
            className="btn btn-secondary navbar-cta"
          >
            <span>Let's Talk</span>
            <ArrowUpRight size={16} />
          </a>

          {/* Mobile Menu Button */}
          <button
            className="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <div className={`mobile-drawer ${mobileMenuOpen ? 'open' : ''}`}>
        <nav className="mobile-nav">
          <ul className="mobile-nav-list">
            {navLinks.map((link) => (
              <li key={link.id}>
                <a
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`mobile-nav-link ${activeSection === link.id ? 'active' : ''}`}
                >
                  {link.name}
                </a>
              </li>
            ))}
            <li className="mobile-cta-wrapper">
              <a
                href="#contact"
                onClick={(e) => handleNavClick(e, '#contact')}
                className="btn btn-primary"
                style={{ width: '100%' }}
              >
                <span>Get In Touch</span>
                <ArrowUpRight size={18} />
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
