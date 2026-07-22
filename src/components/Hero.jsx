import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ArrowRight, Mail, Sparkles } from 'lucide-react';
import { GithubIcon, LinkedinIcon, YoutubeIcon } from './SocialIcons';
import { personalInfo } from '../data/portfolioData';
import profileImg from '../assets/profile.jpg';
import './Hero.css';

export default function Hero() {
  const heroRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.05 });

      tl.fromTo(
        '.hero-status-pill',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' }
      )
      .fromTo(
        '.hero-title',
        { opacity: 0, y: 25 },
        { opacity: 1, y: 0, duration: 0.55, ease: 'power3.out' },
        '-=0.35'
      )
      .fromTo(
        '.hero-description',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' },
        '-=0.35'
      )
      .fromTo(
        '.hero-actions',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' },
        '-=0.35'
      )
      .fromTo(
        '.hero-visual',
        { opacity: 0, scale: 0.95, y: 25 },
        { opacity: 1, scale: 1, y: 0, duration: 0.6, ease: 'back.out(1.2)' },
        '-=0.35'
      );

      // Continuous subtle ambient float animation for portrait card
      gsap.to('.hero-portrait-card', {
        y: -8,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: 0.8,
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const handleScrollToProjects = (e) => {
    e.preventDefault();
    const projectsSection = document.getElementById('projects');
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleScrollToContact = (e) => {
    e.preventDefault();
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" ref={heroRef} className="hero-section">
      <div className="container hero-container">
        {/* Entrance Container */}
        <div className="hero-content">
          {/* Status Badge */}
          <div className="hero-status-pill">
            <span className="status-indicator">
              <span className="status-dot"></span>
              <span className="status-ping"></span>
            </span>
            <span className="status-text">{personalInfo.availability}</span>
          </div>

          {/* Main Title & Role */}
          <h1 className="hero-title">
            Hi, I'm <span className="hero-name-highlight">{personalInfo.name}</span>.
            <br />
            <span className="hero-role-text">{personalInfo.role}</span>
          </h1>

          {/* Positioning Statement */}
          <p className="hero-description">
            {personalInfo.positioning}
          </p>

          {/* Action CTAs & Social Links */}
          <div className="hero-actions">
            <a
              href="#projects"
              onClick={handleScrollToProjects}
              className="btn btn-primary hero-btn-main"
            >
              <span>Explore Selected Work</span>
              <ArrowRight size={18} />
            </a>

            <a
              href="#contact"
              onClick={handleScrollToContact}
              className="btn btn-secondary"
            >
              <Mail size={18} />
              <span>Get In Touch</span>
            </a>

            <div className="hero-social-divider"></div>

            <div className="hero-social-links">
              <a
                href={personalInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-icon"
                aria-label="GitHub Profile"
                title="GitHub Profile"
              >
                <GithubIcon size={20} />
              </a>

              <a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-icon"
                aria-label="LinkedIn Profile"
                title="LinkedIn Profile"
              >
                <LinkedinIcon size={20} />
              </a>

              <a
                href={personalInfo.youtubeMain}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-icon"
                aria-label="YouTube Raydth Channel"
                title="YouTube Raydth Channel"
              >
                <YoutubeIcon size={20} />
              </a>
            </div>
          </div>
        </div>

        {/* Hero Profile Photo Card */}
        <div className="hero-visual">
          <div className="glass-card hero-portrait-card">
            {/* Window Header Bar */}
            <div className="portrait-header">
              <div className="portrait-dots">
                <span className="dot dot-red"></span>
                <span className="dot dot-yellow"></span>
                <span className="dot dot-green"></span>
              </div>
              <span className="portrait-filename">profile.png</span>
            </div>

            {/* Inner Image Frame */}
            <div className="portrait-frame">
              {/* Corner Plus Accents */}
              <span className="corner-plus top-left">+</span>
              <span className="corner-plus top-right">+</span>

              <div className="portrait-image-wrapper">
                <img
                  src={profileImg}
                  alt="Beartil Rajan"
                  className="hero-profile-img"
                />
                <div className="portrait-overlay-glow"></div>
              </div>

              {/* Floating Bottom Status Pill */}
              <div className="portrait-badge-pill">
                <span className="badge-dot"></span>
                <span className="badge-text">CS Engineer & Product Builder</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
