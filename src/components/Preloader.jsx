import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { personalInfo } from '../data/portfolioData';
import './Preloader.css';

gsap.registerPlugin(ScrollTrigger);

export default function Preloader({ onComplete }) {
  const overlayRef = useRef(null);
  const contentRef = useRef(null);
  const circleRef = useRef(null);
  const fillRef = useRef(null);
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    const ctx = gsap.context(() => {
      // Continuous rotation for background circular orbit ring
      gsap.to(circleRef.current, {
        rotation: 360,
        duration: 10,
        repeat: -1,
        ease: 'none',
        transformOrigin: '50% 50%',
      });

      // Overall entrance timeline
      const tl = gsap.timeline({
        onComplete: () => {
          gsap.timeline({
            onComplete: () => {
              document.body.style.overflow = '';
              ScrollTrigger.refresh();
              if (onComplete) onComplete();
            }
          })
          .to(contentRef.current, {
            scale: 0.94,
            opacity: 0,
            duration: 0.2,
            ease: 'power2.in'
          })
          .to(overlayRef.current, {
            yPercent: -100,
            duration: 0.45,
            ease: 'power3.inOut'
          });
        }
      });

      // Fade in center typography & circle
      tl.fromTo(
        contentRef.current,
        { scale: 0.9, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.4, ease: 'power3.out' }
      );

      // Smooth counter & progress line animation
      const counter = { val: 0 };
      tl.to(counter, {
        val: 100,
        duration: 0.8,
        ease: 'power2.inOut',
        onUpdate: () => {
          const current = Math.floor(counter.val);
          setPercent(current);

          if (fillRef.current) {
            fillRef.current.style.width = `${current}%`;
          }
        }
      });

      tl.to({}, { duration: 0.05 });
    }, overlayRef);

    return () => {
      ctx.revert();
      document.body.style.overflow = '';
    };
  }, [onComplete]);

  // Formatted bold name without spaces (e.g. "BeartilRajan") matching reference layout
  const formattedName = personalInfo.name.replace(/\s+/g, '');

  return (
    <div ref={overlayRef} className="style-preloader-overlay">
      {/* Background Radial Glow */}
      <div className="style-preloader-glow"></div>

      {/* Main Center Content */}
      <div ref={contentRef} className="style-preloader-content">
        {/* Background Circular Orbit SVG */}
        <div className="style-preloader-circle-wrapper">
          <svg
            ref={circleRef}
            className="style-preloader-circle-svg"
            viewBox="0 0 300 300"
          >
            <defs>
              <linearGradient id="preloader-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#95d5b2" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#23543e" stopOpacity="0.2" />
              </linearGradient>
            </defs>

            {/* Background ring track */}
            <circle
              cx="150"
              cy="150"
              r="135"
              className="style-circle-bg"
            />
            {/* Glowing gradient arc */}
            <circle
              cx="150"
              cy="150"
              r="135"
              className="style-circle-accent"
            />
            {/* Orbiting glowing dot */}
            <circle
              cx="150"
              cy="15"
              r="4.5"
              className="style-circle-dot"
            />
          </svg>
        </div>

        {/* Center Name Typography */}
        <h1 className="style-preloader-title">
          {formattedName}<span className="style-title-dot">.</span>
        </h1>

        {/* Progress Bar Line & Percentage Readout */}
        <div className="style-preloader-progress-wrapper">
          <div className="style-preloader-bar">
            <div ref={fillRef} className="style-preloader-fill"></div>
          </div>
          <span className="style-preloader-percent">{percent}%</span>
        </div>
      </div>
    </div>
  );
}
