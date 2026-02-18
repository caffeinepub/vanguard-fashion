import { useState, useCallback, useRef, useEffect } from 'react';

type PanelType = 'home' | 'products' | null;

export function useMegaMenu() {
  const [activePanel, setActivePanel] = useState<PanelType>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const openPanel = useCallback((panel: PanelType) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setActivePanel(panel);
  }, []);

  const closePanel = useCallback(() => {
    timeoutRef.current = setTimeout(() => {
      setActivePanel(null);
    }, 150);
  }, []);

  const isOpen = activePanel !== null;

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return {
    activePanel,
    openPanel,
    closePanel,
    isOpen,
  };
}
