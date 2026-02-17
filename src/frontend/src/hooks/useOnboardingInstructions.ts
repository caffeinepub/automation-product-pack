import { useState, useEffect } from 'react';

const STORAGE_KEY = 'onboarding-instructions-seen';

export function useOnboardingInstructions() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasSeen, setHasSeen] = useState(false);
  const [isReady, setIsReady] = useState(false);

  // Initialize from localStorage
  useEffect(() => {
    const seen = localStorage.getItem(STORAGE_KEY) === 'true';
    setHasSeen(seen);
    setIsReady(true);
  }, []);

  // Mark as seen and persist to localStorage
  const markAsSeen = () => {
    localStorage.setItem(STORAGE_KEY, 'true');
    setHasSeen(true);
  };

  // Close modal and mark as seen
  const handleClose = () => {
    setIsOpen(false);
    markAsSeen();
  };

  // Open modal manually (does not reset the seen flag)
  const openManually = () => {
    setIsOpen(true);
  };

  // Auto-open if not seen and conditions are met
  const tryAutoOpen = (canAutoOpen: boolean) => {
    if (isReady && !hasSeen && canAutoOpen) {
      setIsOpen(true);
    }
  };

  return {
    isOpen,
    hasSeen,
    isReady,
    handleClose,
    openManually,
    tryAutoOpen,
  };
}
