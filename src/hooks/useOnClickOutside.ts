import { RefObject, useEffect } from 'react';

export function useOnClickOutside(
  ref: RefObject<HTMLElement>,
  handler: () => void,
) {
  useEffect(() => {
    const onClickOutsideHandler = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        handler();
      }
    };

    window.addEventListener('click', onClickOutsideHandler);

    return () => window.removeEventListener('click', onClickOutsideHandler);
  }, [ref, handler]);
}
