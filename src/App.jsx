import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Contact from './components/Contact';
import Footer from './components/Footer';
import FluidSimulation from './components/FluidSimulation';
import { useScrollReveal } from './hooks/useScrollReveal';
import './index.css';

export default function App() {
  // Initialize IntersectionObserver scroll reveals
  useScrollReveal();

  return (
    <div className="portfolio-app">
      {/* Background Subtle Grid Layer */}
      <div className="bg-grid-overlay"></div>

      {/* Main Navigation Header */}
      <Navbar />

      {/* Main Sections */}
      <main>
        {/* Hero & About sections with interactive fluid background layer */}
        <div className="fluid-hero-about-wrapper">
          <FluidSimulation />
          <Hero />
          <About />
        </div>
        <Projects />
        <Skills />
        <Contact />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
