import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Custom hook to initialize GSAP ScrollTrigger animations for elements with the .reveal class.
 */
export function useScrollReveal() {
  useEffect(() => {
    const revealElements = document.querySelectorAll('.reveal');

    revealElements.forEach((el) => {
      let delay = 0;
      if (el.classList.contains('reveal-delay-1')) delay = 0.08;
      else if (el.classList.contains('reveal-delay-2')) delay = 0.16;
      else if (el.classList.contains('reveal-delay-3')) delay = 0.24;
      else if (el.classList.contains('reveal-delay-4')) delay = 0.32;

      gsap.fromTo(
        el,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          delay,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 90%',
            toggleActions: 'play none none none',
          },
        }
      );
    });

    ScrollTrigger.refresh();

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);
}
