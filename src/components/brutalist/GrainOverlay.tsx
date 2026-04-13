'use client';

import { useSyncExternalStore, useCallback } from 'react';

function useDesktopMediaQuery() {
  const query = '(min-width: 1024px) and (pointer: fine)';

  const subscribe = useCallback(
    (callback: () => void) => {
      const mq = window.matchMedia(query);
      mq.addEventListener('change', callback);
      return () => mq.removeEventListener('change', callback);
    },
    [query]
  );

  const getSnapshot = useCallback(() => window.matchMedia(query).matches, [query]);
  const getServerSnapshot = useCallback(() => false, []);

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

export function GrainOverlay() {
  const isDesktop = useDesktopMediaQuery();

  if (!isDesktop) return null;
  return (
    <div className="grain-overlay" aria-hidden="true">
      {/* CSS handles the overlay via ::before pseudo-element */}
    </div>
  );
}
