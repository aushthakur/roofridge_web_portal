import { useState, useEffect } from 'react';

/**
 * Returns { isMobile, isTablet, isDesktop }
 * isMobile  : <= 768px
 * isTablet  : 769–1024px
 * isDesktop : > 1024px
 */
export function useResponsive() {
  const getBreakpoint = () => {
    if (typeof window === 'undefined') return { isMobile: false, isTablet: false, isDesktop: true };
    const w = window.innerWidth;
    return {
      isMobile:  w <= 768,
      isTablet:  w > 768 && w <= 1024,
      isDesktop: w > 1024,
    };
  };

  const [bp, setBp] = useState(getBreakpoint);

  useEffect(() => {
    const handler = () => setBp(getBreakpoint());
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, []);

  return bp;
}

/**
 * Shorthand: just isMobile boolean
 */
export function useIsMobile() {
  return useResponsive().isMobile;
}

/**
 * Returns the right CSS gridTemplateColumns string based on screen size.
 * Usage: cols({ desktop: 'repeat(4,1fr)', tablet: 'repeat(2,1fr)', mobile: '1fr' })
 */
export function useCols({ desktop, tablet, mobile }) {
  const { isMobile, isTablet } = useResponsive();
  if (isMobile) return mobile;
  if (isTablet) return tablet || desktop;
  return desktop;
}
