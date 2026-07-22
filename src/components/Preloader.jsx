import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { Code2 } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';
import './Preloader.css';

export default function Preloader({ onComplete }) {
  const overlayRef = useRef(null);
  const cardRef = useRef(null);
  const logoRef = useRef(null);
  const fillRef = useRef(null);
  const [percent, setPercent] = useState(0);
  const [statusText, setStatusText] = useState('Initializing Engine...');

  useEffect(() => {
    // Disable scrolling during preloader
    document.body.style.overflow = 'hidden';

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          // Outro Animation
          gsap.timeline({
            onComplete: () => {
              document.body.style.overflow = '';
              if (onComplete) onComplete();
            }
          })
          .to(cardRef.current, {
            scale: 0.9,
            opacity: 0,
            duration: 0.35,
            ease: 'power2.in'
          })
          .to(overlayRef.current, {
            yPercent: -100,
            duration: 0.75,
            ease: 'power4.inOut'
          });
        }
      });

      // Entrance of Card & Logo
      tl.fromTo(
        cardRef.current,
        { scale: 0.85, opacity: 0, y: 30 },
        { scale: 1, opacity: 1, y: 0, duration: 0.6, ease: 'back.out(1.4)' }
      )
      .fromTo(
        logoRef.current,
        { rotate: -20, scale: 0.8 },
        { rotate: 0, scale: 1, duration: 0.5, ease: 'elastic.out(1, 0.5)' },
        '-=0.3'
      );

      // Percentage Count Up
      const counter = { val: 0 };
      tl.to(counter, {
        val: 100,
        duration: 1.6,
        ease: 'power2.inOut',
        onUpdate: () => {
          const current = Math.floor(counter.val);
          setPercent(current);

          // Update status messages based on progress
          if (current < 30) {
            setStatusText('Initializing WebGL Fluid Engine...');
          } else if (current < 65) {
            setStatusText('Loading Selected Projects...');
          } else if (current < 90) {
            setStatusText('Compiling UI Components...');
          } else {
            setStatusText('System Ready!');
          }

          if (fillRef.current) {
            fillRef.current.style.width = `${current}%`;
          }
        }
      });

      // Short hold at 100%
      tl.to({}, { duration: 0.2 });
    }, overlayRef);

    return () => {
      ctx.revert();
      document.body.style.overflow = '';
    };
  }, [onComplete]);

  return (
    <div ref={overlayRef} className="preloader-overlay">
      <div className="preloader-bg-glow"></div>

      <div ref={cardRef} className="preloader-card">
        <div ref={logoRef} className="preloader-logo-box">
          <Code2 size={28} />
        </div>

        <h1 className="preloader-brand-title">
          {personalInfo.name} <span className="dot">.</span>
        </h1>

        <p className="preloader-subtitle">Software & Vision Engineer</p>

        <div className="preloader-track">
          <div ref={fillRef} className="preloader-fill"></div>
        </div>

        <div className="preloader-meta">
          <span className="preloader-status-text">{statusText}</span>
          <span className="preloader-percent">{percent}%</span>
        </div>
      </div>
    </div>
  );
}
