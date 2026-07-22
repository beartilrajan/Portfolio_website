import React from 'react';
import {
  FileCode, Code, Terminal, Layout, Cpu,
  Atom, Zap, Palette, Sparkles, Smartphone,
  Server, Eye, Globe, GitBranch, Cloud
} from 'lucide-react';
import { skills } from '../data/portfolioData';
import './Skills.css';

export default function Skills() {
  const getSkillIcon = (iconName) => {
    switch (iconName) {
      case 'FileCode': return <FileCode size={18} />;
      case 'Code': return <Code size={18} />;
      case 'Terminal': return <Terminal size={18} />;
      case 'Layout': return <Layout size={18} />;
      case 'Cpu': return <Cpu size={18} />;
      case 'Atom': return <Atom size={18} />;
      case 'Zap': return <Zap size={18} />;
      case 'Palette': return <Palette size={18} />;
      case 'Sparkles': return <Sparkles size={18} />;
      case 'Smartphone': return <Smartphone size={18} />;
      case 'Server': return <Server size={18} />;
      case 'Eye': return <Eye size={18} />;
      case 'Globe': return <Globe size={18} />;
      case 'GitBranch': return <GitBranch size={18} />;
      case 'Cloud': return <Cloud size={18} />;
      default: return <Code size={18} />;
    }
  };

  return (
    <section id="skills" className="section skills-section">
      <div className="container">
        {/* Section Header */}
        <div className="section-header reveal">
          <span className="section-tag">Capabilities</span>
          <h2 className="section-title">Technical Core & Stack</h2>
          <p className="section-subtitle">
            Languages, frameworks, and engineering tools I use to build scalable products.
          </p>
        </div>

        {/* Skills Categories Grid */}
        <div className="skills-grid">
          {skills.map((group, groupIdx) => (
            <div
              key={group.category}
              className={`glass-card skill-group-card reveal reveal-delay-${groupIdx + 1}`}
            >
              <h3 className="skill-group-title">{group.category}</h3>
              <div className="skill-items-list">
                {group.items.map((item) => (
                  <div key={item.name} className="skill-item">
                    <div className="skill-item-info">
                      <div className="skill-icon">
                        {getSkillIcon(item.icon)}
                      </div>
                      <span className="skill-name">{item.name}</span>
                    </div>

                    <span className={`skill-level-badge level-${item.level.toLowerCase().replace(/[^a-z]/g, '')}`}>
                      {item.level}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
