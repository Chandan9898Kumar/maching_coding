import { useState, useEffect } from 'react';

export const useContentVisibility = () => {
  const [isContentVisibilitySupported, setIsContentVisibilitySupported] = useState(false);

  useEffect(() => {
    setIsContentVisibilitySupported(CSS.supports && CSS.supports("content-visibility", "auto"));
  }, []);

  return isContentVisibilitySupported;
};