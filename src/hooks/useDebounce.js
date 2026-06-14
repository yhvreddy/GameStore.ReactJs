import { useEffect, useState } from 'react';

// Debounce waits until typing pauses before updating expensive filters or API calls.
export function useDebounce(value, delay = 300) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timerId = window.setTimeout(() => setDebouncedValue(value), delay);
    return () => window.clearTimeout(timerId);
  }, [delay, value]);

  return debouncedValue;
}
