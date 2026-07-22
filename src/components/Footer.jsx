import React, { useState, useEffect } from 'react';
import { ArrowUp, Code2, Heart } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';
import './Footer.css';

export default function Footer() {
  const [timeString, setTimeString] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options = {
        timeZone: 'America/Los_Angeles',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
      };
      setTimeString(now.toLocaleTimeString('en-US', options) + ' PT');
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer-section">
      <div className="container footer-container">
        {/* Brand / Copyright */}
        <div className="footer-left">
          <div className="footer-brand">
            <Code2 size={18} className="footer-brand-icon" />
            <span>{personalInfo.name}</span>
          </div>
          <p className="footer-copy">
            &copy; {new Date().getFullYear()} {personalInfo.name}. Designed & built with deliberate craft.
          </p>
        </div>

        {/* Center: Live Time */}
        <div className="footer-center">
          <div className="time-badge">
            <span className="time-dot"></span>
            <span className="time-text">CS Engineer & Product Engineer • {timeString || 'Active Routine'}</span>
          </div>
        </div>

        {/* Right: Scroll to Top */}
        <div className="footer-right">
          <button
            onClick={handleScrollToTop}
            className="btn-icon back-to-top-btn"
            aria-label="Back to Top"
            title="Back to Top"
          >
            <ArrowUp size={18} />
          </button>
        </div>
      </div>
    </footer>
  );
}
