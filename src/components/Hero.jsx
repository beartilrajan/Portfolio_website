import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ArrowRight, Mail, Sparkles, Terminal } from 'lucide-react';
import { GithubIcon, LinkedinIcon, YoutubeIcon } from './SocialIcons';
import { personalInfo } from '../data/portfolioData';
import './Hero.css';

export default function Hero() {
  const heroRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.15 });

      tl.fromTo(
        '.hero-status-pill',
        { opacity: 0, y: 25 },
        { opacity: 1, y: 0, duration: 0.65, ease: 'power3.out' }
      )
      .fromTo(
        '.hero-title',
        { opacity: 0, y: 35 },
        { opacity: 1, y: 0, duration: 0.75, ease: 'power3.out' },
        '-=0.45'
      )
      .fromTo(
        '.hero-description',
        { opacity: 0, y: 25 },
        { opacity: 1, y: 0, duration: 0.65, ease: 'power3.out' },
        '-=0.45'
      )
      .fromTo(
        '.hero-actions',
        { opacity: 0, y: 25 },
        { opacity: 1, y: 0, duration: 0.65, ease: 'power3.out' },
        '-=0.45'
      )
      .fromTo(
        '.hero-visual',
        { opacity: 0, scale: 0.9, y: 35 },
        { opacity: 1, scale: 1, y: 0, duration: 0.85, ease: 'back.out(1.2)' },
        '-=0.55'
      );

      // Continuous subtle ambient float animation for code card
      gsap.to('.hero-code-card', {
        y: -10,
        duration: 3.5,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: 1.2,
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

  return (
    <section id="hero" ref={heroRef} className="hero-section">
      <div className="container hero-container">
        {/* Entrance Container with Staggered Keyframes */}
        <div className="hero-content">
          {/* Status Badge */}
          <div className="hero-status-pill hero-entrance-1">
            <span className="status-indicator">
              <span className="status-dot"></span>
              <span className="status-ping"></span>
            </span>
            <span className="status-text">{personalInfo.availability}</span>
          </div>

          {/* Main Title & Role */}
          <h1 className="hero-title hero-entrance-2">
            Hi, I'm <span className="hero-name-highlight">{personalInfo.name}</span>.
            <br />
            <span className="hero-role-text">{personalInfo.role}</span>
          </h1>

          {/* Positioning Statement */}
          <p className="hero-description hero-entrance-3">
            {personalInfo.positioning}
          </p>

          {/* Action CTAs & Social Links */}
          <div className="hero-actions hero-entrance-4">
            <a
              href="#projects"
              onClick={handleScrollToProjects}
              className="btn btn-primary hero-btn-main"
            >
              <span>Explore Selected Work</span>
              <ArrowRight size={18} />
            </a>

            <a
              href={`mailto:${personalInfo.email}`}
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

        {/* Decorative Code Artifact / Tech Snapshot */}
        <div className="hero-visual hero-entrance-3">
          <div className="glass-card hero-code-card">
            <div className="code-card-header">
              <div className="code-window-dots">
                <span className="dot dot-red"></span>
                <span className="dot dot-yellow"></span>
                <span className="dot dot-green"></span>
              </div>
              <div className="code-window-title">
                <Terminal size={14} />
                <span>developer.profile.js</span>
              </div>
              <span className="code-window-tag">React + WSL</span>
            </div>

            <div className="code-card-body">
              <pre className="code-block">
                <code>
                  <span className="code-keyword">const</span> <span className="code-var">engineer</span> = &#123;<br />
                  &nbsp;&nbsp;<span className="code-prop">name</span>: <span className="code-string">"{personalInfo.name}"</span>,<br />
                  &nbsp;&nbsp;<span className="code-prop">degree</span>: <span className="code-string">"B.E. Computer Science"</span>,<br />
                  &nbsp;&nbsp;<span className="code-prop">focus</span>: [<span className="code-string">"React & 3D Web"</span>, <span className="code-string">"Python Vision"</span>],<br />
                  &nbsp;&nbsp;<span className="code-prop">stack</span>: [<span className="code-string">"WSL"</span>, <span className="code-string">"Cursor"</span>, <span className="code-string">"Copilot"</span>],<br />
                  &nbsp;&nbsp;<span className="code-prop">goal</span>: <span className="code-string">"Building a Tech Startup"</span><br />
                  &#125;;
                </code>
              </pre>
            </div>

            <div className="code-card-footer">
              <Sparkles size={14} className="sparkle-icon" />
              <span>Crafted with React, Vanilla CSS & Vite</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
