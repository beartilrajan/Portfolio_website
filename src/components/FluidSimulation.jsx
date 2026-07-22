import React, { useEffect, useRef } from 'react';
import WebGLFluid from 'webgl-fluid';

export default function FluidSimulation() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let fluidInstance = null;
    let resizeObserver = null;
    let removeListeners = null;

    const initFluid = () => {
      // Disable WebGL fluid simulation on mobile devices (<= 768px) to save CPU/GPU and battery
      if (window.innerWidth <= 768) {
        if (fluidInstance && typeof fluidInstance.destroy === 'function') {
          fluidInstance.destroy();
          fluidInstance = null;
        }
        return;
      }

      if (fluidInstance) return;

      // Check for WebGL support
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (!gl) {
        console.warn('WebGL not supported; fluid simulation disabled.');
        return;
      }

      try {
        fluidInstance = WebGLFluid(canvas, {
          IMMEDIATE: true,
          TRIGGER: 'hover',
          AUTO: false,
          SIM_RESOLUTION: 64,
          DYE_RESOLUTION: 512,
          CAPTURE_RESOLUTION: 256,
          DENSITY_DISSIPATION: 3.5,
          VELOCITY_DISSIPATION: 0.9,
          PRESSURE: 0.8,
          PRESSURE_ITERATIONS: 10,
          CURL: 20,
          SPLAT_RADIUS: 0.22,
          SPLAT_FORCE: 2500,
          SPLAT_COUNT: 2,
          SHADING: true,
          COLORFUL: true,
          COLOR_UPDATE_SPEED: 8,
          PAUSED: false,
          BACK_COLOR: { r: 0, g: 0, b: 0 },
          TRANSPARENT: true,
          BLOOM: true,
          BLOOM_ITERATIONS: 3,
          BLOOM_RESOLUTION: 128,
          BLOOM_INTENSITY: 0.15,
          BLOOM_THRESHOLD: 0.7,
          BLOOM_SOFT_KNEE: 0.7,
          SUNRAYS: false,
        });
      } catch (err) {
        console.error('Error initializing WebGL Fluid Simulation:', err);
      }

      const updateCanvasSize = () => {
        if (canvas && (canvas.width !== canvas.clientWidth || canvas.height !== canvas.clientHeight)) {
          canvas.width = canvas.clientWidth;
          canvas.height = canvas.clientHeight;
        }
      };
      updateCanvasSize();

      resizeObserver = new ResizeObserver(updateCanvasSize);
      resizeObserver.observe(canvas);

      const forwardPointerEvent = (type, clientX, clientY) => {
        if (!canvas) return;
        const rect = canvas.getBoundingClientRect();

        if (
          clientX < rect.left ||
          clientX > rect.right ||
          clientY < rect.top ||
          clientY > rect.bottom
        ) {
          return;
        }

        const offsetX = clientX - rect.left;
        const offsetY = clientY - rect.top;

        const evt = new MouseEvent(type, {
          clientX: offsetX,
          clientY: offsetY,
          bubbles: false,
          cancelable: true,
        });
        Object.defineProperty(evt, 'offsetX', { get: () => offsetX });
        Object.defineProperty(evt, 'offsetY', { get: () => offsetY });
        canvas.dispatchEvent(evt);
      };

      const handleWindowMouseMove = (e) => forwardPointerEvent('mousemove', e.clientX, e.clientY);
      const handleWindowMouseDown = (e) => forwardPointerEvent('mousedown', e.clientX, e.clientY);

      window.addEventListener('mousemove', handleWindowMouseMove, { passive: true });
      window.addEventListener('mousedown', handleWindowMouseDown, { passive: true });

      removeListeners = () => {
        window.removeEventListener('mousemove', handleWindowMouseMove);
        window.removeEventListener('mousedown', handleWindowMouseDown);
        if (resizeObserver) resizeObserver.disconnect();
      };
    };

    initFluid();

    const handleResize = () => {
      if (window.innerWidth <= 768) {
        if (removeListeners) removeListeners();
        if (fluidInstance && typeof fluidInstance.destroy === 'function') {
          fluidInstance.destroy();
          fluidInstance = null;
        }
      } else {
        initFluid();
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (removeListeners) removeListeners();
      if (fluidInstance && typeof fluidInstance.destroy === 'function') {
        fluidInstance.destroy();
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fluid-canvas"
      aria-hidden="true"
    />
  );
}

