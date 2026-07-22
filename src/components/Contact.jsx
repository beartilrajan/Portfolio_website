import React, { useState } from 'react';
import { Mail, Copy, Check, Send, Sparkles } from 'lucide-react';
import { GithubIcon, LinkedinIcon, YoutubeIcon, TwitterIcon } from './SocialIcons';
import { personalInfo } from '../data/portfolioData';
import './Contact.css';

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [formStatus, setFormStatus] = useState(null); // 'sending' | 'success' | 'error'

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personalInfo.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setFormStatus('sending');

    try {
      const response = await fetch(`https://formsubmit.co/ajax/${personalInfo.email}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
          _subject: `New Portfolio Message from ${formData.name}`,
          _template: 'table',
          _captcha: 'false'
        })
      });

      const data = await response.json().catch(() => ({}));

      if (response.ok && data.success !== 'false') {
        setFormStatus('success');
        setFormData({ name: '', email: '', message: '' });
      } else {
        triggerMailto();
      }
    } catch (err) {
      console.error('Email submission error:', err);
      triggerMailto();
    }
  };

  const triggerMailto = () => {
    const subject = encodeURIComponent(`New Portfolio Message from ${formData.name}`);
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    );
    window.location.href = `mailto:${personalInfo.email}?subject=${subject}&body=${body}`;
    setFormStatus('success');
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <section id="contact" className="section contact-section">
      <div className="container">
        {/* Section Header */}
        <div className="section-header reveal">
          <span className="section-tag">Get In Touch</span>
          <h2 className="section-title">Let's Build Something Sharp Together</h2>
          <p className="section-subtitle">
            I'm currently seeking Summer/Fall 2026 CS internships and open to select freelance software engineering opportunities.
          </p>
        </div>

        <div className="contact-grid">
          {/* Left Column: Direct Info Card & Copy Email */}
          <div className="glass-card contact-info-card reveal reveal-delay-1">
            <h3 className="contact-card-heading">Reach Out Directly</h3>
            <p className="contact-card-desc">
              Have an internship opening, freelance project, or technical question? Feel free to send a message or copy my email address below.
            </p>

            {/* Email Copy Card */}
            <div className="email-copy-box">
              <div className="email-info">
                <Mail size={20} className="email-icon" />
                <span className="email-text">{personalInfo.email}</span>
              </div>

              <button
                onClick={handleCopyEmail}
                className="btn btn-secondary copy-btn"
                aria-label="Copy Email to Clipboard"
                title="Copy Email"
              >
                {copied ? <Check size={16} className="check-icon" /> : <Copy size={16} />}
                <span>{copied ? 'Copied!' : 'Copy'}</span>
              </button>
            </div>

            {/* Toast Banner */}
            {copied && (
              <div className="toast-copied">
                <Sparkles size={14} />
                <span>Email address copied to clipboard!</span>
              </div>
            )}

            {/* Social Channels */}
            <div className="contact-social-section">
              <h4 className="social-heading">Connect & Follow My Work</h4>
              <div className="social-buttons-row">
                <a
                  href={personalInfo.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-pill-btn"
                >
                  <GithubIcon size={18} />
                  <span>GitHub</span>
                </a>

                <a
                  href={personalInfo.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-pill-btn"
                >
                  <LinkedinIcon size={18} />
                  <span>LinkedIn</span>
                </a>

                <a
                  href={personalInfo.youtubeMain}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-pill-btn"
                >
                  <YoutubeIcon size={18} />
                  <span>Raydth (YouTube)</span>
                </a>

                <a
                  href={personalInfo.youtubeBuilds}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-pill-btn"
                >
                  <YoutubeIcon size={18} />
                  <span>RaydthBuilds</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Contact Form */}
          <div className="glass-card contact-form-card reveal reveal-delay-2">
            <h3 className="contact-card-heading">Send a Direct Message</h3>

            {formStatus === 'success' ? (
              <div className="form-success-banner">
                <div className="success-icon">
                  <Check size={24} />
                </div>
                <h4>Message Sent Successfully!</h4>
                <p>Your message has been delivered directly to <strong>{personalInfo.email}</strong>. I'll reply within 24 hours.</p>
                <button
                  onClick={() => setFormStatus(null)}
                  className="btn btn-secondary"
                  style={{ marginTop: '1.25rem' }}
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="contact-form">
                <div className="form-group">
                  <label htmlFor="name" className="form-label">Your Name</label>
                  <input
                    type="text"
                    id="name"
                    required
                    placeholder="e.g. Sarah Jenkins"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email" className="form-label">Your Email</label>
                  <input
                    type="email"
                    id="email"
                    required
                    placeholder="sarah@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="message" className="form-label">Message</label>
                  <textarea
                    id="message"
                    required
                    rows={4}
                    placeholder="Tell me about your team, role, or project..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="form-input form-textarea"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={formStatus === 'sending'}
                  className="btn btn-primary form-submit-btn"
                >
                  {formStatus === 'sending' ? (
                    <span>Sending Message...</span>
                  ) : (
                    <>
                      <span>Send Message</span>
                      <Send size={16} />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
