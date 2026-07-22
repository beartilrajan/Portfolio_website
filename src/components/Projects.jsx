import React, { useState } from 'react';
import { ExternalLink, Sparkles, Layers, Info, X, Check, ArrowRight } from 'lucide-react';
import { GithubIcon } from './SocialIcons';
import { projects } from '../data/portfolioData';
import './Projects.css';

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <section id="projects" className="section projects-section">
      <div className="container">
        {/* Section Header */}
        <div className="section-header reveal">
          <span className="section-tag">Featured Work</span>
          <h2 className="section-title">Projects Built with Intent & Precision</h2>
          <p className="section-subtitle">
            From computer vision desktop tools to responsive web applications. Built with clean code architecture and performance first.
          </p>
        </div>

        {/* Projects Cards Grid */}
        <div className="projects-grid">
          {projects.map((project, idx) => (
            <div
              key={project.id}
              className={`glass-card project-card reveal reveal-delay-${(idx % 3) + 1}`}
            >
              {/* Card Top / Category Pill */}
              <div className="project-card-header">
                <div className="project-category-badge">
                  <Layers size={13} />
                  <span>{project.category}</span>
                </div>
                {project.metrics && (
                  <div className="project-metric-pill">
                    {project.metrics}
                  </div>
                )}
              </div>

              {/* Main Content */}
              <div className="project-card-body">
                <h3 className="project-title">{project.title}</h3>
                <h4 className="project-subtitle">{project.subtitle}</h4>
                <p className="project-description">{project.description}</p>

                {/* Tech Stack Tags */}
                <div className="project-tags">
                  {project.tags.map((tag) => (
                    <span key={tag} className="tech-tag">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Card Footer Links & Detail Trigger */}
              <div className="project-card-footer">
                <button
                  onClick={() => setSelectedProject(project)}
                  className="btn btn-secondary project-detail-btn"
                >
                  <Info size={16} />
                  <span>Architecture Specs</span>
                </button>

                <div className="project-external-links">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-icon"
                    aria-label="View Source Code on GitHub"
                    title="View Source on GitHub"
                  >
                    <GithubIcon size={18} />
                  </a>

                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-icon"
                    aria-label="Visit Live Demo"
                    title="Live Demo"
                  >
                    <ExternalLink size={18} />
                  </a>
                </div>
              </div>
            </div>
          ))}

          {/* Open Slot Card for Future Builds */}
          <div className="glass-card project-card open-slot-card reveal">
            <div className="open-slot-content">
              <div className="open-slot-icon">
                <Sparkles size={28} />
              </div>
              <h3 className="open-slot-title">What's Next?</h3>
              <p className="open-slot-desc">
                Currently exploring WebAssembly-based audio processing engines and local LLM agent tool calling integrations.
              </p>
              <a href="#contact" className="btn btn-secondary open-slot-cta">
                <span>Suggest a Collaboration</span>
                <ArrowRight size={16} />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Expanded Project Architecture Modal */}
      {selectedProject && (
        <div className="modal-backdrop" onClick={() => setSelectedProject(null)}>
          <div className="glass-card modal-container" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div>
                <span className="modal-category">{selectedProject.category}</span>
                <h2 className="modal-title">{selectedProject.title}</h2>
              </div>
              <button
                className="btn-icon modal-close-btn"
                onClick={() => setSelectedProject(null)}
                aria-label="Close modal"
              >
                <X size={20} />
              </button>
            </div>

            <div className="modal-body">
              <p className="modal-detailed-desc">{selectedProject.detailedDescription}</p>

              <h4 className="modal-subheading">Key Technical Highlights</h4>
              <ul className="modal-highlights-list">
                {selectedProject.highlights.map((item, index) => (
                  <li key={index} className="highlight-item">
                    <Check size={16} className="highlight-check" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <h4 className="modal-subheading">Technologies Used</h4>
              <div className="project-tags modal-tags">
                {selectedProject.tags.map((tag) => (
                  <span key={tag} className="tech-tag">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="modal-footer">
              <a
                href={selectedProject.github}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary"
              >
                <GithubIcon size={18} />
                <span>GitHub Codebase</span>
              </a>

              <a
                href={selectedProject.live}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
              >
                <ExternalLink size={18} />
                <span>Launch Live App</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
