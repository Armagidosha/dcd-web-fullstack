/** biome-ignore-all lint/suspicious/noExplicitAny: <idk how to provide normal types> */
export function debounce<F extends (...args: any[]) => any>(
  func: F,
  waitFor = 1500,
) {
  let timeout: NodeJS.Timeout;
  let pending: {
    resolve: (value: Awaited<ReturnType<F>>) => void;
    reject: (reason?: any) => void;
  } | null = null;

  return (...args: Parameters<F>): Promise<Awaited<ReturnType<F>>> => {
    clearTimeout(timeout);

    if (pending) {
      pending.reject("debounced");
    }

    return new Promise((resolve, reject) => {
      pending = { resolve, reject };

      timeout = setTimeout(async () => {
        try {
          const result = await func(...args);
          resolve(result);
        } catch (e) {
          reject(e);
        } finally {
          pending = null;
        }
      }, waitFor);
    });
  };
}
