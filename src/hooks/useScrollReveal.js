import { useEffect } from 'react';

/**
 * Custom hook to initialize IntersectionObserver for elements with the .reveal class.
 */
export function useScrollReveal() {
  useEffect(() => {
    const revealElements = document.querySelectorAll('.reveal');
    revealElements.forEach((el) => el.classList.add('active'));

    if (typeof window !== 'undefined' && 'IntersectionObserver' in window) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('active');
            }
          });
        },
        { threshold: 0.05 }
      );

      revealElements.forEach((el) => observer.observe(el));
      return () => observer.disconnect();
    }
  }, []);
}
