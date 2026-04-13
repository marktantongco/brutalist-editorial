import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

// Register GSAP plugins once globally
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

  // CRITICAL: Safety net — refresh ScrollTrigger after page load
  // This catches elements that weren't in the DOM when animations first registered
  window.addEventListener('load', () => {
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);
  });

  // Safety net: periodic refresh for dynamically rendered content
  let refreshTimer: ReturnType<typeof setInterval>;
  const startRefreshCycle = () => {
    refreshTimer = setInterval(() => {
      ScrollTrigger.refresh();
    }, 3000);
    // Stop after 15 seconds (page is fully loaded by then)
    setTimeout(() => {
      clearInterval(refreshTimer);
    }, 15000);
  };

  // Only start refresh cycle if there are pending triggers
  if (document.readyState === 'complete') {
    startRefreshCycle();
  } else {
    window.addEventListener('load', startRefreshCycle, { once: true });
  }
}

export { gsap, ScrollTrigger };
