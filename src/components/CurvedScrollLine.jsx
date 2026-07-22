import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './CurvedScrollLine.css';

gsap.registerPlugin(ScrollTrigger);

// Waypoints corresponding to sections
const SECTION_DEFS = [
  { id: 'hero', label: 'Hero', fallbackRatio: 0.08 },
  { id: 'about', label: 'About', fallbackRatio: 0.28 },
  { id: 'projects', label: 'Projects', fallbackRatio: 0.52 },
  { id: 'skills', label: 'Skills', fallbackRatio: 0.74 },
  { id: 'contact', label: 'Contact', fallbackRatio: 0.94 },
];

// Desktop wide curve spanning center viewport
const DESKTOP_PATHS = {
  bg: "M 50 0 C 94 130, 6 270, 50 410 C 94 550, 6 690, 50 830 C 94 920, 50 975, 50 1000",
  dash: "M 52.5 0 C 96.5 130, 8.5 270, 52.5 410 C 96.5 550, 8.5 690, 52.5 830 C 96.5 920, 52.5 975, 52.5 1000",
  core: "M 50 0 C 94 130, 6 270, 50 410 C 94 550, 6 690, 50 830 C 94 920, 50 975, 50 1000",
};

// Mobile refined conduit path along left margin (x: 8..16) so it never cuts across text or cards
const MOBILE_PATHS = {
  bg: "M 8 0 C 16 130, 3 270, 8 410 C 16 550, 3 690, 8 830 C 16 920, 8 975, 8 1000",
  dash: "M 10 0 C 18 130, 5 270, 10 410 C 18 550, 5 690, 10 830 C 18 920, 10 975, 10 1000",
  core: "M 8 0 C 16 130, 3 270, 8 410 C 16 550, 3 690, 8 830 C 16 920, 8 975, 8 1000",
};

export default function CurvedScrollLine() {
  const containerRef = useRef(null);
  const mainPathRef = useRef(null);
  const dashPathRef = useRef(null);
  const bgPathRef = useRef(null);
  const orbRef = useRef(null);

  const [activeWaypoints, setActiveWaypoints] = useState([]);
  const [waypointPositions, setWaypointPositions] = useState([]);
  const [isMobile, setIsMobile] = useState(typeof window !== 'undefined' ? window.innerWidth <= 768 : false);

  useEffect(() => {
    const mainPath = mainPathRef.current;
    const dashPath = dashPathRef.current;
    const orb = orbRef.current;
    const container = containerRef.current;
    if (!mainPath || !container) return;

    let pathLength = 0;
    let pointCache = [];
    const SAMPLES = 300;

    const setupPath = () => {
      const mobileCheck = window.innerWidth <= 768;
      setIsMobile(mobileCheck);

      const paths = mobileCheck ? MOBILE_PATHS : DESKTOP_PATHS;
      if (bgPathRef.current) bgPathRef.current.setAttribute('d', paths.bg);
      if (dashPathRef.current) dashPathRef.current.setAttribute('d', paths.dash);
      if (mainPathRef.current) mainPathRef.current.setAttribute('d', paths.core);

      pathLength = mainPath.getTotalLength();

      gsap.set([mainPath, dashPath], {
        strokeDasharray: pathLength,
        strokeDashoffset: pathLength,
      });

      pointCache = new Array(SAMPLES);
      for (let i = 0; i < SAMPLES; i++) {
        const p = i / (SAMPLES - 1);
        const point = mainPath.getPointAtLength(p * pathLength);
        pointCache[i] = {
          xPct: (point.x / 100) * 100,
          yPct: (point.y / 1000) * 100,
        };
      }
    };

    setupPath();

    const computeWaypoints = () => {
      const docHeight = document.documentElement.scrollHeight;
      return SECTION_DEFS.map((sec) => {
        let progress = sec.fallbackRatio;
        const el = document.getElementById(sec.id);
        if (el && docHeight > 0) {
          const top = el.offsetTop + 35;
          progress = Math.min(0.98, Math.max(0.02, top / docHeight));
        }
        const sampleIdx = Math.min(
          SAMPLES - 1,
          Math.max(0, Math.floor(progress * (SAMPLES - 1)))
        );
        return {
          ...sec,
          progress,
          pos: pointCache[sampleIdx] || pointCache[0] || { xPct: 50, yPct: 0 },
        };
      });
    };

    let calculatedWaypoints = computeWaypoints();
    setWaypointPositions(calculatedWaypoints);

    const updateOrb = (xPct, yPct) => {
      if (!orb || !container) return;
      const rect = container.getBoundingClientRect();
      const xPx = (xPct / 100) * rect.width;
      const yPx = (yPct / 100) * rect.height;
      orb.style.transform = `translate3d(${xPx}px, ${yPx}px, 0)`;
    };

    let ticking = false;
    let currentProgress = 0;

    const render = () => {
      ticking = false;
      const p = Math.max(0, Math.min(1, currentProgress));
      const drawOffset = pathLength * (1 - p);

      mainPath.style.strokeDashoffset = `${drawOffset}px`;
      if (dashPath) dashPath.style.strokeDashoffset = `${drawOffset}px`;

      const sampleIdx = Math.min(SAMPLES - 1, Math.floor(p * (SAMPLES - 1)));
      const point = pointCache[sampleIdx] || pointCache[0] || { xPct: 50, yPct: 0 };
      updateOrb(point.xPct, point.yPct);

      const activeList = [];
      calculatedWaypoints.forEach((wp, idx) => {
        if (p >= wp.progress - 0.02) {
          activeList.push(idx);
        }
      });
      setActiveWaypoints(activeList);
    };

    const trigger = ScrollTrigger.create({
      trigger: document.body,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 0.05,
      onUpdate: (self) => {
        currentProgress = self.progress;
        if (!ticking) {
          ticking = true;
          requestAnimationFrame(render);
        }
      },
    });

    const handleResize = () => {
      setupPath();
      calculatedWaypoints = computeWaypoints();
      setWaypointPositions(calculatedWaypoints);
      render();
    };

    window.addEventListener('resize', handleResize);
    ScrollTrigger.addEventListener('refresh', handleResize);

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      ScrollTrigger.removeEventListener('refresh', handleResize);
      trigger.kill();
    };
  }, []);

  return (
    <div ref={containerRef} className="curved-scroll-line-container">
      <svg
        className="curved-scroll-svg"
        viewBox="0 0 100 1000"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="cyber-line-grad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#b7e4c7" stopOpacity="1" />
            <stop offset="25%" stopColor="#74c69d" stopOpacity="0.9" />
            <stop offset="50%" stopColor="#52b788" stopOpacity="0.85" />
            <stop offset="75%" stopColor="#95d5b2" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#d8f3dc" stopOpacity="1" />
          </linearGradient>

          <filter id="cyber-line-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <path
          ref={bgPathRef}
          d={isMobile ? MOBILE_PATHS.bg : DESKTOP_PATHS.bg}
          className="scroll-path-bg"
        />

        <path
          ref={dashPathRef}
          d={isMobile ? MOBILE_PATHS.dash : DESKTOP_PATHS.dash}
          className="scroll-path-dashed"
        />

        <path
          ref={mainPathRef}
          d={isMobile ? MOBILE_PATHS.core : DESKTOP_PATHS.core}
          className="scroll-path-core"
        />
      </svg>

      {waypointPositions.map((wp, idx) => (
        <div
          key={wp.label}
          className={`waypoint-node ${activeWaypoints.includes(idx) ? 'active' : ''}`}
          style={{
            left: `${wp.pos.xPct}%`,
            top: `${wp.pos.yPct}%`,
          }}
        >
          <div className="waypoint-pulse-ring"></div>
          <div className="waypoint-core"></div>
          <span className="waypoint-label">{wp.label}</span>
        </div>
      ))}

      <div ref={orbRef} className="scroll-plasma-orb">
        <span className="orb-core"></span>
        <span className="orb-ring"></span>
      </div>
    </div>
  );
}

