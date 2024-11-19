'use client';

import { createContext, useContext, useEffect, useState } from 'react';

const ScreenSizeContext = createContext<{ isLargeScreen: boolean } | undefined>(
  undefined
);

export const useScreenSize = () => {
  const context = useContext(ScreenSizeContext);
  if (!context) {
    throw new Error('useScreenSize must be used within a ScreenSizeProvider');
  }
  return context;
};

export const ScreenSizeProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isLargeScreen, setIsLargeScreen] = useState<boolean | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const initialScreenSize = window.matchMedia('(min-width: 980px)').matches;
      setIsLargeScreen(initialScreenSize);

      const handleResize = (e: { matches: boolean }) => {
        setIsLargeScreen(e.matches);
      };

      const mediaQuery = window.matchMedia('(min-width: 980px)');
      mediaQuery.addEventListener('change', handleResize);

      return () => {
        mediaQuery.removeEventListener('change', handleResize);
      };
    }
  }, []);

  if (isLargeScreen === null) {
    return null;
  }

  return (
    <ScreenSizeContext.Provider value={{ isLargeScreen }}>
      {children}
    </ScreenSizeContext.Provider>
  );
};
