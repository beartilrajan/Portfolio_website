import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './CurvedScrollLine.css';

gsap.registerPlugin(ScrollTrigger);

// Waypoints corresponding to section scroll positions
const WAYPOINTS = [
  { progress: 0.08, label: 'Hero' },
  { progress: 0.30, label: 'About' },
  { progress: 0.55, label: 'Projects' },
  { progress: 0.76, label: 'Skills' },
  { progress: 0.95, label: 'Contact' },
];

export default function CurvedScrollLine() {
  const containerRef = useRef(null);
  const mainPathRef = useRef(null);
  const dashPathRef = useRef(null);
  const orbRef = useRef(null);
  const [activeWaypoints, setActiveWaypoints] = useState([]);
  const [waypointPositions, setWaypointPositions] = useState([]);

  useEffect(() => {
    const mainPath = mainPathRef.current;
    const dashPath = dashPathRef.current;
    const orb = orbRef.current;
    const container = containerRef.current;
    if (!mainPath || !container) return;

    const pathLength = mainPath.getTotalLength();

    // Set initial stroke dasharray and dashoffset
    gsap.set([mainPath, dashPath], {
      strokeDasharray: pathLength,
      strokeDashoffset: pathLength,
    });

    // Build cached lookup table of 300 points along path for O(1) instantaneous lookup
    const SAMPLES = 300;
    const pointCache = new Array(SAMPLES);
    for (let i = 0; i < SAMPLES; i++) {
      const p = i / (SAMPLES - 1);
      const point = mainPath.getPointAtLength(p * pathLength);
      pointCache[i] = {
        xPct: (point.x / 100) * 100,
        yPct: (point.y / 1000) * 100,
      };
    }

    // Precalculate waypoint locations along path
    const calculatedWaypoints = WAYPOINTS.map((wp) => {
      const sampleIdx = Math.min(
        SAMPLES - 1,
        Math.max(0, Math.floor(wp.progress * (SAMPLES - 1)))
      );
      return {
        ...wp,
        pos: pointCache[sampleIdx],
      };
    });
    setWaypointPositions(calculatedWaypoints);

    // Hardware accelerated GPU setter for leader orb
    const updateOrb = (xPct, yPct) => {
      if (!orb || !container) return;
      const rect = container.getBoundingClientRect();
      const xPx = (xPct / 100) * rect.width;
      const yPx = (yPct / 1000) * 1000 * (rect.height / 1000);
      orb.style.transform = `translate3d(${xPx}px, ${yPx}px, 0)`;
    };

    let ticking = false;
    let currentProgress = 0;

    const render = () => {
      ticking = false;
      const p = Math.max(0, Math.min(1, currentProgress));
      const drawOffset = pathLength * (1 - p);

      // Directly update CSS properties on frame
      mainPath.style.strokeDashoffset = `${drawOffset}px`;
      if (dashPath) dashPath.style.strokeDashoffset = `${drawOffset}px`;

      const sampleIdx = Math.min(SAMPLES - 1, Math.floor(p * (SAMPLES - 1)));
      const point = pointCache[sampleIdx] || pointCache[0];
      updateOrb(point.xPct, point.yPct);

      // Determine active waypoints passed
      const activeList = [];
      WAYPOINTS.forEach((wp, idx) => {
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

    // Initial render call
    render();

    return () => {
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
          {/* Cyberpunk Sage Energy Gradient */}
          <linearGradient id="cyber-line-grad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#b7e4c7" stopOpacity="1" />
            <stop offset="25%" stopColor="#74c69d" stopOpacity="0.9" />
            <stop offset="50%" stopColor="#52b788" stopOpacity="0.85" />
            <stop offset="75%" stopColor="#95d5b2" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#d8f3dc" stopOpacity="1" />
          </linearGradient>

          {/* Clean Robust SVG Glow Filter */}
          <filter id="cyber-line-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Faint Background Guide Track */}
        <path
          d="M 50 0 C 94 130, 6 270, 50 410 C 94 550, 6 690, 50 830 C 94 920, 50 975, 50 1000"
          className="scroll-path-bg"
        />

        {/* Parallel Tech-Dashed Companion Line */}
        <path
          ref={dashPathRef}
          d="M 52.5 0 C 96.5 130, 8.5 270, 52.5 410 C 96.5 550, 8.5 690, 52.5 830 C 96.5 920, 52.5 975, 52.5 1000"
          className="scroll-path-dashed"
        />

        {/* Main Glowing Energy Core Path */}
        <path
          ref={mainPathRef}
          d="M 50 0 C 94 130, 6 270, 50 410 C 94 550, 6 690, 50 830 C 94 920, 50 975, 50 1000"
          className="scroll-path-core"
        />
      </svg>

      {/* Section Milestone Waypoint Nodes */}
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

      {/* Hardware-Accelerated Plasma Leader Orb */}
      <div ref={orbRef} className="scroll-plasma-orb">
        <span className="orb-core"></span>
        <span className="orb-ring"></span>
      </div>
    </div>
  );
}
