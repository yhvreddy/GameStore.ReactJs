import { useCallback, useEffect, useState } from 'react';

// Reusable hook for loading, error, and data state around async functions.
export function useAsync(asyncFunction, dependencies = [], runImmediately = true) {
  const [data, setData] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(runImmediately);

  const execute = useCallback(async (...args) => {
    setLoading(true);
    setError('');

    try {
      const result = await asyncFunction(...args);
      setData(result);
      return result;
    } catch (caughtError) {
      setError(caughtError.message);
      throw caughtError;
    } finally {
      setLoading(false);
    }
  }, dependencies);

  useEffect(() => {
    if (!runImmediately) return undefined;

    let active = true;

    execute().catch(() => {
      if (!active) return;
    });

    return () => {
      active = false;
    };
  }, [execute, runImmediately]);

  return { data, error, loading, execute, setData };
}
