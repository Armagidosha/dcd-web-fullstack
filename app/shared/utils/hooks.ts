/** biome-ignore-all lint/suspicious/noExplicitAny: <> */

import { useCallback, useState } from "react";

interface UseAsyncResult<T> {
  isLoading: boolean;
  errors: Record<string, string[]>;
  data: T | null;
  execute: (
    asyncFn: (...args: any[]) => Promise<T>,
    ...args: unknown[]
  ) => Promise<T | null>;
  reset: () => void;
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

      try {
        const result = await asyncFn(...args);

        setData(result);
        return result;
      } catch (error) {
        if (
          error &&
          typeof error === "object" &&
          "error" in error &&
          (error as { error: string }).error === "Validation error"
        ) {
          setErrors(
            (error as unknown as { details: Record<string, string[]> }).details,
          );
        }

        return null;
      } finally {
        setIsLoading(false);
      }
    },
    [],
  );

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
    clearFieldError,
    clearErrors,
  };
}
