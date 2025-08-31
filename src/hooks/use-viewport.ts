'use client';

import { useState, useEffect } from 'react';

export function useViewport() {
  const [viewport, setViewport] = useState({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const updateViewport = () => {
      setViewport({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    // Initial update
    updateViewport();

    window.addEventListener('resize', updateViewport);
    return () => window.removeEventListener('resize', updateViewport);
  }, []);

  const isDesktop = viewport.width >= 1024;
  const isTablet = viewport.width >= 768 && viewport.width < 1024;
  const isMobile = viewport.width < 768;
  const hasEnoughHeight = viewport.height >= 800;

  return {
    width: viewport.width,
    height: viewport.height,
    isDesktop,
    isTablet,
    isMobile,
    hasEnoughHeight,
    // Helper to determine if content should be scrollable
    shouldShowScrollbar: !isDesktop || !hasEnoughHeight,
  };
}