import { useState, useEffect, useCallback } from 'react';

interface FetchState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

interface UseFetchDataOptions {
  immediate?: boolean;
}

export function useFetchData<T>(
  fetcher: () => Promise<T>,
  options: UseFetchDataOptions = { immediate: true }
) {
  const [state, setState] = useState<FetchState<T>>({
    data: null,
    loading: options.immediate ?? true,
    error: null,
  });

  const fetchData = useCallback(async () => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    
    try {
      const data = await fetcher();
      setState({ data, loading: false, error: null });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      setState({ data: null, loading: false, error: errorMessage });
    }
  }, [fetcher]);

  const reload = useCallback(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    if (options.immediate) {
      fetchData();
    }
  }, [fetchData, options.immediate]);

  return {
    ...state,
    reload,
  };
}