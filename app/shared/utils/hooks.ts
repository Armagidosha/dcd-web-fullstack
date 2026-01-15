/** biome-ignore-all lint/suspicious/noExplicitAny: <> */

import { useCallback, useState } from "react";
import { isErrorResponse } from "./functions";

interface UseAsyncResult<T> {
  isLoading: boolean;
  errors: Record<string, string[]>;
  data: T | null;
  execute: (
    asyncFn: (...args: any[]) => Promise<T>,
    ...args: unknown[]
  ) => Promise<T | null>;
  reset: () => void;
  setFieldError: (errors: Record<string, string[]>) => void;
  clearFieldError: (field: string) => void;
  clearErrors: () => void;
}

export function useAsync<T = any>(): UseAsyncResult<T> {
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string[]>>({});
  const [data, setData] = useState<T | null>(null);
  const execute = useCallback(
    async (
      asyncFn: (...args: any[]) => Promise<T>,
      ...args: any[]
    ): Promise<T | null> => {
      setIsLoading(true);
      setErrors({});

      try {
        const response = await asyncFn(...args);

        if (isErrorResponse(response)) {
          setErrors(response.details);
          setData(null);
          return null;
        }

        setData(response);
        return response;
      } catch (error) {
        if (isErrorResponse(error)) {
          setErrors(error.details);
        }
        setData(null);
        return null;
      } finally {
        setIsLoading(false);
      }
    },
    [],
  );

  const setFieldError = useCallback((errors: Record<string, string[]>) => {
    setErrors((prev) => ({
      ...prev,
      ...errors,
    }));
  }, []);

  const reset = useCallback(() => {
    setIsLoading(false);
    setErrors({});
    setData(null);
  }, []);

  const clearErrors = useCallback(() => {
    setErrors({});
  }, []);

  const clearFieldError = useCallback((field: string) => {
    setErrors((prev) => {
      if (!(field in prev)) return prev;
      const next = { ...prev };
      delete next[field];
      return next;
    });
  }, []);

  return {
    isLoading,
    errors,
    data,
    execute,
    reset,
    setFieldError,
    clearFieldError,
    clearErrors,
  };
}
