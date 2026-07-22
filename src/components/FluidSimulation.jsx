import React, { useEffect, useRef } from 'react';
import WebGLFluid from 'webgl-fluid';

export default function FluidSimulation() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Check for WebGL support
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    if (!gl) {
      console.warn('WebGL not supported; fluid simulation disabled.');
      return;
    }

    let fluidInstance = null;

    try {
      fluidInstance = WebGLFluid(canvas, {
        IMMEDIATE: true,
        TRIGGER: 'hover',
        AUTO: false,
        SIM_RESOLUTION: 128,
        DYE_RESOLUTION: 1024,
        CAPTURE_RESOLUTION: 512,
        DENSITY_DISSIPATION: 3.5,
        VELOCITY_DISSIPATION: 0.9,
        PRESSURE: 0.8,
        PRESSURE_ITERATIONS: 20,
        CURL: 25,
        SPLAT_RADIUS: 0.25,
        SPLAT_FORCE: 3000,
        SPLAT_COUNT: 2,
        SHADING: true,
        COLORFUL: true,
        COLOR_UPDATE_SPEED: 8,
        PAUSED: false,
        BACK_COLOR: { r: 0, g: 0, b: 0 },
        TRANSPARENT: true,
        BLOOM: true,
        BLOOM_ITERATIONS: 6,
        BLOOM_RESOLUTION: 256,
        BLOOM_INTENSITY: 0.18,
        BLOOM_THRESHOLD: 0.65,
        BLOOM_SOFT_KNEE: 0.7,
        SUNRAYS: false,
      });
    } catch (err) {
      console.error('Error initializing WebGL Fluid Simulation:', err);
    }

    // Keep canvas pixel size matched with element layout
    const updateCanvasSize = () => {
      if (canvas && (canvas.width !== canvas.clientWidth || canvas.height !== canvas.clientHeight)) {
        canvas.width = canvas.clientWidth;
        canvas.height = canvas.clientHeight;
      }
    };
    updateCanvasSize();

    const resizeObserver = new ResizeObserver(updateCanvasSize);
    resizeObserver.observe(canvas);

    // Forward pointer events to canvas ONLY when cursor is within canvas bounding box
    const forwardPointerEvent = (type, clientX, clientY) => {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();

      // Stop tracking if cursor is outside canvas bounds (e.g. scrolled past About section)
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

    const handleWindowMouseMove = (e) => {
      forwardPointerEvent('mousemove', e.clientX, e.clientY);
    };

    const handleWindowMouseDown = (e) => {
      forwardPointerEvent('mousedown', e.clientX, e.clientY);
    };

    const handleWindowTouchMove = (e) => {
      if (e.touches && e.touches.length > 0) {
        const touch = e.touches[0];
        forwardPointerEvent('mousemove', touch.clientX, touch.clientY);
      }
    };

    const handleWindowTouchStart = (e) => {
      if (e.touches && e.touches.length > 0) {
        const touch = e.touches[0];
        forwardPointerEvent('mousedown', touch.clientX, touch.clientY);
      }
    };

    window.addEventListener('mousemove', handleWindowMouseMove, { passive: true });
    window.addEventListener('mousedown', handleWindowMouseDown, { passive: true });
    window.addEventListener('touchmove', handleWindowTouchMove, { passive: true });
    window.addEventListener('touchstart', handleWindowTouchStart, { passive: true });

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('mousemove', handleWindowMouseMove);
      window.removeEventListener('mousedown', handleWindowMouseDown);
      window.removeEventListener('touchmove', handleWindowTouchMove);
      window.removeEventListener('touchstart', handleWindowTouchStart);

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
