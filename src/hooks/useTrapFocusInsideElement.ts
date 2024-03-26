import { useEffect } from 'react';

export function useTrapFocusInsideElement(
  ref: React.RefObject<HTMLElement>,
  isVisible: boolean,
) {
  useEffect(() => {
    const dialog = ref.current;
    const focusableElements = dialog?.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
    );

    if (!focusableElements?.length) {
      return;
    }

    const firstElement = focusableElements[0] as HTMLElement;
    const lastElement = focusableElements[
      focusableElements.length - 1
    ] as HTMLElement;

    const handleTabKeyPress = (event: KeyboardEvent) => {
      if (event.key === 'Tab') {
        if (event.shiftKey && document.activeElement === firstElement) {
          event.preventDefault();
          lastElement.focus();
        } else if (!event.shiftKey && document.activeElement === lastElement) {
          event.preventDefault();
          firstElement.focus();
        }
      }
    };

    window.addEventListener('keydown', handleTabKeyPress);
    return () => window.removeEventListener('keydown', handleTabKeyPress);
  }, [ref, isVisible]);
}
