import React from 'react';
import { Code2, Eye, Zap, BookOpen, Award, CheckCircle2 } from 'lucide-react';
import { personalInfo, stats, focusAreas } from '../data/portfolioData';
import './About.css';

export default function About() {
  const getIcon = (iconName) => {
    switch (iconName) {
      case 'Code2': return <Code2 size={24} />;
      case 'Eye': return <Eye size={24} />;
      case 'Zap': return <Zap size={24} />;
      default: return <Code2 size={24} />;
    }
  };

  return (
    <section id="about" className="section about-section">
      <div className="container">
        {/* Section Header */}
        <div className="section-header reveal">
          <span className="section-tag">About Me</span>
          <h2 className="section-title">Bridging CS Theory & Production Engineering</h2>
          <p className="section-subtitle">
            A quick glimpse into my background, computational focus, and what drives my work.
          </p>
        </div>

        <div className="about-grid">
          {/* Left Column: Bio Card */}
          <div className="glass-card about-bio-card reveal reveal-delay-1">
            <h3 className="about-bio-heading">Background & Story</h3>
            <p className="about-bio-text">
              {personalInfo.bio}
            </p>
            <p className="about-bio-text">
              I balance daily computer science coursework with a disciplined coding routine—utilizing WSL, Cursor, GitHub Copilot Pro, Claude, and local Ollama models to build end-to-end web applications, 3D interactive canvases, and computer vision gesture tools.
            </p>

            {/* Quick Bullet Highlights */}
            <div className="about-bullets">
              <div className="about-bullet-item">
                <CheckCircle2 size={18} className="bullet-icon" />
                <span>CS Engineering Student</span>
              </div>
              <div className="about-bullet-item">
                <CheckCircle2 size={18} className="bullet-icon" />
                <span>Aspiring Tech Entrepreneur</span>
              </div>
              <div className="about-bullet-item">
                <CheckCircle2 size={18} className="bullet-icon" />
                <span>WSL & AI-Assisted Workflow</span>
              </div>
              <div className="about-bullet-item">
                <CheckCircle2 size={18} className="bullet-icon" />
                <span>Dev Vlog & Tech Content Creator</span>
              </div>
            </div>
          </div>

          {/* Right Column: Stats Grid */}
          <div className="about-stats-grid">
            {stats.map((stat, idx) => (
              <div
                key={stat.label}
                className={`glass-card stat-card reveal reveal-delay-${(idx % 4) + 1}`}
              >
                <div className="stat-value">{stat.value}</div>
                <div className="stat-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Focus Areas Sub-Grid */}
        <div className="about-focus-wrapper">
          <h3 className="focus-section-heading reveal">Core Focus Areas</h3>
          <div className="focus-cards-grid">
            {focusAreas.map((area, idx) => (
              <div
                key={area.title}
                className={`glass-card focus-card reveal reveal-delay-${idx + 1}`}
              >
                <div className="focus-icon-wrapper">
                  {getIcon(area.icon)}
                </div>
                <h4 className="focus-card-title">{area.title}</h4>
                <p className="focus-card-desc">{area.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
