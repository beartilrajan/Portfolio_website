import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Contact from './components/Contact';
import Footer from './components/Footer';
import FluidSimulation from './components/FluidSimulation';
import Preloader from './components/Preloader';
import CurvedScrollLine from './components/CurvedScrollLine';
import { useScrollReveal } from './hooks/useScrollReveal';
import { useSmoothScroll } from './hooks/useSmoothScroll';
import './index.css';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  // Initialize Lenis smooth scrolling & GSAP scroll reveals
  useSmoothScroll();
  useScrollReveal();

  return (
    <div className="portfolio-app">
      {/* Loading Scene */}
      {isLoading && <Preloader onComplete={() => setIsLoading(false)} />}

      {/* Background Subtle Grid Layer */}
      <div className="bg-grid-overlay"></div>

      {/* Animated Curved Scroll Line */}
      <CurvedScrollLine />

      {/* Main Navigation Header */}
      <Navbar />

      {/* Main Sections */}
      <main>
        {/* Hero section with interactive fluid background layer */}
        <div className="fluid-hero-wrapper">
          <FluidSimulation />
          <Hero />
        </div>
        <About />
        <Projects />
        <Skills />
        <Contact />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
