import { useState, useEffect } from 'react';

const useMediaQuery = (query: string) => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mediaQueryList = window.matchMedia(query);
    const listener = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };
    mediaQueryList.addEventListener('change', listener);
    return () => {
      mediaQueryList.removeEventListener('change', listener);
    };
  }, [query]);

  return matches;
};

export const HideOnSmallScreens = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const isSmallScreen = useMediaQuery('(max-width: 768px)');
  return isSmallScreen ? null : children;
};

export const HideOnTablet = ({ children }: { children: React.ReactNode }) => {
  const isTablet = useMediaQuery('(max-width: 1024px) and (min-width: 768px)');
  return isTablet ? null : children;
};

export const HideOnTabletAndSmallScreens = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const isTablet = useMediaQuery('(max-width: 1024px) and (min-width: 768px)');
  const isSmallScreen = useMediaQuery('(max-width: 768px)');
  return isTablet || isSmallScreen ? null : children;
};

export const HideOnDesktop = ({ children }: { children: React.ReactNode }) => {
  const isDesktop = useMediaQuery('(min-width: 1024px)');
  return isDesktop ? null : children;
};
