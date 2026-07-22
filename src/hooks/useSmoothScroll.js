import { useEffect } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Ultra-smooth Lenis smooth scrolling integration optimized for 120 FPS performance.
 */
export function useSmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 0.9,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.5,
    });

    let reqId;

    function raf(time) {
      lenis.raf(time);
      reqId = requestAnimationFrame(raf);
    }

    reqId = requestAnimationFrame(raf);

    // Update ScrollTrigger on Lenis scroll
    lenis.on('scroll', ScrollTrigger.update);

    return () => {
      cancelAnimationFrame(reqId);
      lenis.destroy();
    };
  }, []);
}
