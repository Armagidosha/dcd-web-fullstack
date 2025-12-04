/** biome-ignore-all lint/suspicious/noExplicitAny: <> */
import { useCallback, useRef, useState } from "react";

//

interface UseAsyncResult<T> {
  isLoading: boolean;
  errors: string[];
  data: T | null;
  execute: (
    asyncFn: (...args: any[]) => Promise<T>,
    ...args: unknown[]
  ) => Promise<T | null>;
  reset: () => void;
  clearErrors: () => void;
}

export function useAsync<T = any>(): UseAsyncResult<T> {
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const [data, setData] = useState<T | null>(null);
  const requestIdRef = useRef(0);
  const activeCountRef = useRef(0);
  const execute = useCallback(
    async (
      asyncFn: (...args: any[]) => Promise<T>,
      ...args: any[]
    ): Promise<T | null> => {
      // mark this invocation
      const thisRequestId = ++requestIdRef.current;
      // increment active counter and reflect loading state
      activeCountRef.current += 1;
      setIsLoading(true);

      // provide an AbortController signal to cancellable asyncFns
      const controller = new AbortController();
      const signal = controller.signal;

      try {
        // pass the signal as the last argument; asyncFn may ignore it if not needed
        const result = await asyncFn(...args, signal);

        // ignore results from stale or aborted requests
        if (signal.aborted || thisRequestId !== requestIdRef.current) {
          return null;
        }

        setData(result);
        return result;
      } catch (error) {
        // if the call was aborted, ignore adding an error
        const isAbortError =
          error instanceof Error && error.name === "AbortError";
        if (!isAbortError) {
          const errorMessage =
            error instanceof Error
              ? error.message
              : "An unknown error occurred";
          setErrors((prev) => [...prev, errorMessage]);
        }
        return null;
      } finally {
        // decrement active counter and update loading state
        activeCountRef.current = Math.max(0, activeCountRef.current - 1);
        setIsLoading(activeCountRef.current > 0);
      }
    },
    [],
  );

  const reset = useCallback(() => {
    // increment requestId to mark any in-flight requests as stale
    requestIdRef.current += 1;
    activeCountRef.current = 0;
    setIsLoading(false);
    setErrors([]);
    setData(null);
  }, []);

  const clearErrors = useCallback(() => {
    setErrors([]);
  }, []);

  return {
    isLoading,
    errors,
    data,
    execute,
    reset,
    clearErrors,
  };
}
