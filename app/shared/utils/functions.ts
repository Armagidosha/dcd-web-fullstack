export const hasWindow = () => {
  return typeof window === "object";
};

export const checkRes = async (response: Response) => {
  if (!response.ok) {
    await response.json().then((error) => Promise.reject(error));
  }

  return response.json();
};

export function isErrorResponse(
  value: unknown,
): value is { error: string; details: Record<string, string[]> } {
  return (
    !!value &&
    typeof value === "object" &&
    "error" in value &&
    typeof (value as Record<string, unknown>).error === "string" &&
    "details" in value &&
    typeof (value as Record<string, unknown>).details === "object"
  );
}

export function debounce<F extends (...args: Parameters<F>) => ReturnType<F>>(
  func: F,
  waitFor: number = 1500,
) {
  let timeout: NodeJS.Timeout;

  const debounced = (...args: Parameters<F>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), waitFor);
  };

  return debounced;
}
